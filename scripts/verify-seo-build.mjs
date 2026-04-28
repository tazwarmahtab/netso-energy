import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_SITE_URL,
  getIndexableRoutes,
  getPrerenderRoutes,
  resolveRouteMetadata,
  resolveSiteUrl,
} from "../src/lib/site-metadata.shared.js";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const configuredSiteUrl = resolveSiteUrl(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);

function routeHtmlPath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  if (routePath === "/404") {
    return path.join(distDir, "404.html");
  }

  return path.join(distDir, routePath.replace(/^\/+/u, ""), "index.html");
}

function contains(haystack, needle, context) {
  assert.ok(
    haystack.includes(needle),
    `Expected ${context} to contain ${needle}`,
  );
}

async function verifyHtml(routePath) {
  const metadata = resolveRouteMetadata(routePath, configuredSiteUrl);
  const htmlFile = routeHtmlPath(routePath);
  const html = await readFile(htmlFile, "utf8");

  contains(html, metadata.titleText, `${routePath} title`);
  contains(html, metadata.description, `${routePath} description`);
  contains(html, metadata.canonicalUrl, `${routePath} canonical`);
  contains(html, metadata.imageUrl, `${routePath} social image`);
  contains(html, metadata.robotsContent, `${routePath} robots`);
}

async function main() {
  await stat(path.join(distDir, "og-image.jpg"));
  await stat(path.join(distDir, "favicon.ico"));
  await stat(path.join(distDir, "favicon.png"));
  await stat(path.join(distDir, "apple-touch-icon.png"));

  await Promise.all(getPrerenderRoutes().map((routePath) => verifyHtml(routePath)));

  const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");

  for (const routePath of getIndexableRoutes()) {
    const url = resolveRouteMetadata(routePath, configuredSiteUrl).canonicalUrl;
    contains(sitemap, `<loc>${url}</loc>`, "sitemap");
  }

  const notFoundUrl = resolveRouteMetadata("/404", configuredSiteUrl).canonicalUrl;
  assert.ok(
    !sitemap.includes(`<loc>${notFoundUrl}</loc>`),
    `Did not expect ${notFoundUrl} in sitemap`,
  );

  const robots = await readFile(path.join(distDir, "robots.txt"), "utf8");
  contains(robots, `Sitemap: ${configuredSiteUrl}/sitemap.xml`, "robots.txt");
}

await main();
console.log("SEO build verification passed.");
