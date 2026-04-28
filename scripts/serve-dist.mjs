import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const distDir = path.join(process.cwd(), "dist");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".avif", "image/avif"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".mp4", "video/mp4"],
]);

function setDefaultHeaders(response) {
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

function setCacheHeaders(response, pathname) {
  if (pathname.startsWith("/assets/") || pathname.startsWith("/fonts/")) {
    response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return;
  }

  response.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
}

function resolveFilePath(pathname) {
  if (pathname === "/" || pathname === "") {
    return { filePath: path.join(distDir, "index.html"), status: 200 };
  }

  const normalized = pathname.replace(/^\/+/u, "");
  const directPath = path.join(distDir, normalized);
  const routeIndexPath = path.join(distDir, normalized, "index.html");

  if (existsSync(routeIndexPath)) {
    return { filePath: routeIndexPath, status: 200 };
  }

  if (existsSync(directPath) && path.extname(directPath)) {
    return { filePath: directPath, status: 200 };
  }

  return { filePath: path.join(distDir, "404.html"), status: 404 };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `${host}:${port}`}`);
  const pathname = url.pathname;

  setDefaultHeaders(response);

  if (pathname === "/api/track") {
    response.setHeader("Cache-Control", "no-store");
    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    if (request.method === "POST") {
      response.writeHead(204);
      response.end();
      return;
    }

    response.writeHead(405, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  const { filePath, status } = resolveFilePath(pathname);
  const extension = path.extname(filePath).toLowerCase();

  try {
    const body = await readFile(filePath);
    setCacheHeaders(response, pathname);
    response.writeHead(status, {
      "content-type": mimeTypes.get(extension) || "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Unable to serve dist preview.");
  }
});

server.listen(port, host, () => {
  console.log(`dist server running at http://${host}:${port}`);
});
