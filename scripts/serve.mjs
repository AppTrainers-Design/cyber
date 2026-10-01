import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const portArgument = process.argv.find((argument) => argument.startsWith("--port="));
const port = Number(portArgument?.split("=")[1] || process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2" };
const pages = new Set(["/index.html", "/styles.css", "/script.js"]);

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid preview port");

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }
  try {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/") pathname = "/index.html";
    const filename = path.resolve(root, "." + pathname);
    const assetRoot = path.join(root, "assets") + path.sep;
    if ((!pages.has(pathname) && !filename.startsWith(assetRoot)) || !types[path.extname(filename)]) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const body = await readFile(filename);
    response.writeHead(200, { "Content-Type": types[path.extname(filename)], "Content-Length": body.length, "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 400);
    response.end(error.code === "ENOENT" ? "Not found" : "Bad request");
  }
});
server.listen(port, "127.0.0.1", () => console.log(`Cybersecurity preview: http://localhost:${port}`));
