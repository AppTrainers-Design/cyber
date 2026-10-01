---
name: "الأمن السيبراني"
description: "Arabic RTL cybersecurity landing page, faithful to the supplied Figma."
colors:
  background: "#08090b"
  raised: "#1b1c20"
  text: "#f8f8fa"
  secondary: "#b3b3ba"
  accent: "#ff2035"
  accent-dark: "#64101c"
  border: "#34363c"
  accent-hover: "#dc182c"
  secondary-hover: "#210b10"
  error: "#ff929c"
typography:
  display:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "56px"
    fontWeight: 800
    lineHeight: "72px"
  headline:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "48px"
  title:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "32px"
  body:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body-small:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: "24px"
  caption:
    fontFamily: "Tajawal, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
rounded:
  radius: "16px"
  control-radius: "12px"
  navigation: "8px"
  pill: "999px"
  circle: "50%"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "24": "24px"
  "32": "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control-radius}"
    padding: "11px 19px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control-radius}"
    padding: "11px 19px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  field:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    typography: "{typography.body-small}"
    rounded: "{rounded.control-radius}"
    padding: "0 15px"
    height: "48px"
  badge:
    textColor: "{colors.accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "4px 16px"
    height: "32px"
  course-card:
    textColor: "{colors.text}"
    rounded: "{rounded.radius}"
    padding: "23px"
  course-card-hover:
    textColor: "{colors.text}"
    rounded: "{rounded.radius}"
    padding: "23px"
  navigation:
    textColor: "{colors.secondary}"
    typography: "{typography.body-small}"
    padding: "0 8px"
  faq:
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control-radius}"
---

# Design System: الأمن السيبراني

## Overview

**Creative North Star: "The supplied Figma cybersecurity identity"**

A near-black canvas, vivid red accents and original red illustrations support a clear Arabic hierarchy. Tajawal, rounded panels and fine borders reproduce the supplied design. The implementation in `index.html`, `styles.css` and `script.js` is the recorded source of truth; the route's composition remains in `.impeccable/surfaces/landing.md`.

**Key Characteristics:**

- Arabic RTL reading order and start-aligned text.
- Original illustrations and outline icons.
- Dark tonal gradients with restrained red glows.
- Rounded controls and pill-shaped section badges.

## Colors

### Primary

The `accent` color identifies actions, selected navigation, highlighted words, icons and outlined badges. `accent-dark` supports quiet dividers and secondary borders. Hover colors preserve the same red family; `error` is the lighter feedback color.

### Neutral

`background` owns the page canvas; `raised` owns field surfaces. `text` carries main content, `secondary` carries supporting copy and `border` defines panels and dividers. The token named `secondary` is muted text, not a second brand accent.

**The Reference Palette Rule.** Preserve the supplied palette; tonal-ramp previews in the sidecar are documentation aids, not additional implemented colors.

The primary CTA uses the pinned accent/text pairing at (16px, weight 700), with inherited contrast of approximately (3.59:1). This records the supplied design and does not claim full contrast compliance.

## Typography

**Display Font:** Tajawal, with sans-serif fallback.
**Body Font:** Tajawal, with sans-serif fallback.

The same family serves headings, copy and controls. Arabic and Latin font files are self-hosted at weights (400, 500, 700, 800).

Desktop roles are normative in the frontmatter. The display changes to (48px/64px) at desktop widths (1024–1100px), (44px/56px) on tablet, (40px/52px) on mobile and (36px/48px) below (360px). Section headlines become (32px/44px) on tablet and (28px/38px) on mobile. Benefit and journey titles use (20px/28px). Supporting copy commonly uses the body-small role; mobile hero copy uses (16px/26px).

## Layout

The centered container is `min(1200px, calc(100% - 80px))`. At widths up to (1023px), gutters become (32px) per side; up to (639px), they become (16px). The page supports a minimum width of (320px).

Desktop hero and applied-learning sections pair copy with imagery. Tablet retains the two-column hero while applied learning and registration stack. Mobile places the hero art below its copy, stacks actions, reduces the course grid from two columns to one, and stacks journey steps without the horizontal connector. Mobile benefits appear in the approved order: flask, layers, laptop.

Recurring gaps are (8, 12, 16, 24, 32px); larger section spacing uses (40, 48, 64px). Panels retain generous internal padding while gutters and gaps reduce on smaller screens.

## Elevation & Depth

Depth comes mainly from subtle dark gradients, fine borders and the original artwork. Only primary buttons and hovered course cards use red glows: (0 0 12px #ff203538) and (0 0 16px #ff203524), respectively. Other panels remain flat. Course, icon-tile and FAQ gradients appear in the sidecar snippets; source CSS preserves every responsive gradient angle.

## Shapes

Panels and icon tiles use `radius`; controls, fields and FAQ rows use `control-radius`. Badges are pills, and check/step markers are circles. Original SVG root dimensions remain unchanged; wrapper transforms fit icons and decorative exports to their rendered bounds.

## Components

### Buttons and badges

Primary buttons have a red fill, fine matching border and minimum height (48px); secondary buttons use the page background and a dark red border. Hover changes color without moving the control. Section badges retain the supplied red outline and compact caption text.

### Cards / Containers

Course cards use dark diagonal gradients and a fine border. Every card gains a red border, tinted gradient and subtle glow only during mouse hover, then returns to its neutral style when the pointer leaves. Border width and padding stay constant to avoid movement, and touch devices keep the neutral card style. Course actions have a minimum target height (24px); selecting one fills the matching form option and focuses the name field.

### Course catalogue

Pill tabs (minimum height (44px)) follow the ARIA tabs pattern; the selected tab takes the accent border, the `secondary-hover` fill and an accent count pill. Panels reuse the two-column course grid and course card: the course code sits in the number slot, the English title and tags use muted caption text, and a level/hours/labs row uses `accent-dark` dividers. Below (360px) the level takes its own line.

### Inputs / Fields

Fields are dark raised surfaces with leading icons and a fine border. Focus adds a red border and outline; errors add text beneath the field and `aria-invalid`. Email entry uses LTR characters with right alignment. With the endpoint empty, valid submission shows honest unavailable feedback and performs no POST or persistence.

### Navigation

The header and footer use the user-supplied Vision 3020 logo with its navy lettering changed to white, its red artwork retained and a transparent background. The image retains its intrinsic aspect ratio at (112px) wide, reducing to (96px) on mobile. Logo links return to the page top and retain the visible keyboard focus outline.

Desktop links are muted, with red hover/current states. Tablet and mobile use a compact menu with a (44px) toggle, expanded-state labeling and Escape dismissal. A visible keyboard outline uses the text color at (2px) with a (5px) offset; a skip link leads to main content.

### FAQ

Native `details`/`summary` retain keyboard behavior. The plus icon rotates (45deg) when open. Answers use muted text and a maximum measure of (75ch).

Color and icon transitions use (180ms) with `cubic-bezier(.16, 1, .3, 1)`. Reduced-motion preference disables transitions and smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied Tajawal family, palette and original assets.
- **Do** use RTL layout and logical alignment while preserving readable email entry.
- **Do** keep focus, field errors and unavailable submission feedback visible and accurate.

### Don't:

- **Don't** substitute generic illustrations or modify original SVG root dimensions to fit a wrapper.
- **Don't** introduce new accent families or broad card shadows.
- **Don't** present registration as sent when no endpoint is configured.
