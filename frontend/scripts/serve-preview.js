#!/usr/bin/env node

/**
 * Static preview server for exported Expo web builds.
 *
 * Usage:
 *   1. Run `yarn export:web` (or `expo export --platform web`) to build dist/
 *   2. Run `yarn serve:preview` to serve dist/ locally
 *
 * Serves the `dist/` directory on http://localhost:5000
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;
const DIST_DIR = path.resolve(__dirname, "..", "dist");

if (!fs.existsSync(DIST_DIR)) {
  console.error(
    `[serve-preview] dist/ directory not found at "${DIST_DIR}".\n` +
      `  Run "yarn export:web" (or "expo export --platform web") first to generate the preview build.`
  );
  process.exit(1);
}

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".txt": "text/plain",
  ".map": "application/json",
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for SPAs (client-side routing)
      if (err.code === "ENOENT" && !ext) {
        fs.readFile(path.join(DIST_DIR, "index.html"), (err2, data2) => {
          if (err2) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data2);
        });
        return;
      }

      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const address = `http://localhost:${PORT}`;
  console.log(`[serve-preview] Serving preview build at ${address}`);
  console.log(`[serve-preview] Directory:  ${DIST_DIR}`);
  console.log(`[serve-preview] Press Ctrl+C to stop.`);
});
