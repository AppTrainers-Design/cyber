"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const compactLayout = window.matchMedia("(max-width: 1023px)");

function closeMenu(returnFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "افتح قائمة التنقل");
  if (returnFocus) menuButton.focus();
}

menuButton.hidden = !compactLayout.matches;
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "أغلق قائمة التنقل" : "افتح قائمة التنقل");
});
compactLayout.addEventListener("change", () => {
  closeMenu();
  menuButton.hidden = !compactLayout.matches;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header-inner")) closeMenu();
});
navigation.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!navigation.contains(document.activeElement) && document.activeElement !== menuButton) closeMenu();
  });
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    updateActiveNavigation(link.hash);
    const target = document.querySelector(link.hash);
    if (target && compactLayout.matches) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
});

function updateActiveNavigation(hash) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const active = link.hash === hash;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", () => updateActiveNavigation(location.hash || "#home"));
updateActiveNavigation(location.hash || "#home");

// Fit original SVG exports without changing their root width/height attributes.
function fitSvgArtwork(element) {
  const image = element.querySelector("img");
  const { width, height } = element.getBoundingClientRect();
  image.style.transform = `scale(${width / Number(element.dataset.width)}, ${height / Number(element.dataset.height)})`;
}
const artworkObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => fitSvgArtwork(target));
});
document.querySelectorAll(".svg-fit").forEach((element) => {
  artworkObserver.observe(element);
  fitSvgArtwork(element);
});

const form = document.querySelector("#registration-form");
const fullName = form.elements.full_name;
const email = form.elements.email;
const track = form.elements.track;
const statusMessage = document.querySelector("#form-status");
const submitButton = form.querySelector(".submit-button");
const submitLabel = form.querySelector(".submit-label");
let submitting = false;

function setFieldError(field, message = "") {
  const error = document.getElementById(field.getAttribute("aria-describedby"));
  error.textContent = message;
  error.hidden = !message;
  if (message) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
}

function setStatus(message, kind = "error") {
  statusMessage.textContent = message;
  statusMessage.dataset.kind = kind;
  statusMessage.hidden = !message;
}

document.querySelectorAll("[data-track]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    track.value = link.dataset.track;
    setFieldError(track);
    setStatus("");
    history.pushState(null, "", "#registration");
    document.querySelector("#registration").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    updateActiveNavigation("#registration");
    fullName.focus({ preventScroll: true });
  });
});

[fullName, email, track].forEach((field) => {
  field.addEventListener("input", () => {
    setFieldError(field);
    setStatus("");
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitting) return;
  setStatus("");
  const errors = new Map([
    [fullName, fullName.value.trim().length < 2 ? "اكتب اسمك الكامل، بحرفين على الأقل." : ""],
    [email, !email.value.trim() || email.validity.typeMismatch ? "اكتب بريدًا إلكترونيًا صحيحًا، مثل name@example.com." : ""],
    [track, !track.value ? "اختر المسار الذي ترغب في معرفة تفاصيله." : ""],
  ]);
  errors.forEach((message, field) => setFieldError(field, message));
  const firstInvalid = [...errors].find(([, message]) => message);
  if (firstInvalid) {
    setStatus("راجع الحقول الموضّحة لإكمال طلبك.");
    firstInvalid[0].focus();
    return;
  }

  const endpoint = form.dataset.endpoint.trim();
  if (!endpoint) {
    setStatus("التسجيل غير متاح حاليًا. لم يتم إرسال بياناتك؛ يُرجى المحاولة لاحقًا.");
    return;
  }

  submitting = true;
  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  submitLabel.textContent = "جارٍ إرسال طلبك…";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      signal: controller.signal,
      body: JSON.stringify({ full_name: fullName.value.trim(), email: email.value.trim(), track: track.value }),
    });
    if (!response.ok) throw new Error("registration-failed");
    if (response.headers.get("content-type")?.includes("application/json")) {
      const result = await response.json();
      if (result.success === false || result.status === false) throw new Error("registration-failed");
    }
    form.reset();
    setStatus("تم إرسال طلبك بنجاح. شكرًا لاهتمامك بمسارات الأمن السيبراني.", "success");
  } catch (error) {
    setStatus(error.name === "AbortError" ? "استغرق الإرسال وقتًا طويلًا. تحقق من اتصالك وحاول مرة أخرى." : "تعذّر إرسال طلبك. بياناتك ما زالت في النموذج؛ حاول مرة أخرى.");
  } finally {
    window.clearTimeout(timeout);
    submitting = false;
    submitButton.disabled = false;
    form.removeAttribute("aria-busy");
    submitLabel.textContent = "أرسل طلبك";
  }
});
