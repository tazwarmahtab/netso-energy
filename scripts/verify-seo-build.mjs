import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SITE_URL = "https://netsoenergy.com";
const SITE_NAME = "NETSO ENERGY";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.jpg";
const DEFAULT_SOCIAL_IMAGE_ALT =
  "NETSO rooftop solar pergola overlooking the Dhaka skyline";
const DEFAULT_INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_NOINDEX_ROBOTS = "noindex, nofollow, noarchive";
const DEFAULT_TWITTER_CARD = "summary_large_image";

const routeMetadata = [
  {
    path: "/",
    title: "Infrastructure for a Solar Future",
    description:
      "NETSO Energy turns unused rooftops into energy-generating assets with high-performance solar pergolas built for Bangladesh.",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "A staged, engineering-led process for assessing, designing, and delivering rooftop solar projects in Dhaka.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/projects",
    title: "Projects",
    description:
      "Selected residential and commercial rooftop contexts across Dhaka.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/products",
    title: "Solar Pergola",
    description:
      "Solar pergola systems designed around shade, shelter, and energy generation for Dhaka rooftops.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About",
    description:
      "Building Bangladesh's distributed energy backbone — one rooftop at a time. Learn about the NETSO mission and impact.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/feasibility",
    title: "Check Feasibility",
    description:
      "Start a rooftop assessment and share the building, bill, and roof context NETSO needs to review fit.",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/404",
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    indexable: false,
    prerender: true,
  },
];

const legacyRedirects = [];

function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  const cleanedPath = pathname.split(/[?#]/u)[0] || "/";

  if (cleanedPath !== "/" && cleanedPath.endsWith("/")) {
    return cleanedPath.slice(0, -1);
  }

  return cleanedPath;
}

function resolveSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return siteUrl.replace(/\/+$/u, "");
}

function createDocumentTitle(title) {
  return `${title} | ${SITE_NAME}`;
}

function toAbsoluteUrl(siteUrl, pathname) {
  if (/^https?:\/\//u.test(pathname)) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${resolveSiteUrl(siteUrl)}${normalizedPath}`;
}

function resolveRouteMetadata(pathname, siteUrl) {
  const normalizedPath = normalizePathname(pathname);
  const route =
    routeMetadata.find((entry) => entry.path === normalizedPath) ||
    routeMetadata.find((entry) => entry.path === "/404");

  if (!route) {
    throw new Error("Missing /404 SEO metadata configuration.");
  }

  const resolvedSiteUrl = resolveSiteUrl(siteUrl);
  const imagePath = route.image || DEFAULT_SOCIAL_IMAGE_PATH;
  const indexable = route.indexable !== false;

  return {
    canonicalUrl: toAbsoluteUrl(resolvedSiteUrl, route.path),
    description: route.description,
    imageAlt: route.imageAlt || DEFAULT_SOCIAL_IMAGE_ALT,
    imageUrl: toAbsoluteUrl(resolvedSiteUrl, imagePath),
    indexable,
    robotsContent: route.robots || (indexable ? DEFAULT_INDEX_ROBOTS : DEFAULT_NOINDEX_ROBOTS),
    titleText: createDocumentTitle(route.title),
    twitterCard: DEFAULT_TWITTER_CARD,
  };
}

function getPrerenderRoutes() {
  return routeMetadata.filter((route) => route.prerender !== false);
}

function getSitemapRoutes() {
  return routeMetadata.filter((route) => route.indexable !== false);
}

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

async function verifyRedirect(fromPath, toPath) {
  const htmlFile = routeHtmlPath(fromPath);
  const html = await readFile(htmlFile, "utf8");
  contains(html, `url=${toPath}`, `${fromPath} redirect`);
  contains(html, 'content="noindex, nofollow, noarchive"', `${fromPath} redirect robots`);
}

async function main() {
  await stat(path.join(distDir, "og-image.jpg"));

  await Promise.all(
    getPrerenderRoutes().map((route) => verifyHtml(route.path)),
  );

  await Promise.all(
    legacyRedirects.map((redirect) => verifyRedirect(redirect.from, redirect.to)),
  );

  const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");

  for (const route of getSitemapRoutes()) {
    const url = resolveRouteMetadata(route.path, configuredSiteUrl).canonicalUrl;
    contains(sitemap, `<loc>${url}</loc>`, "sitemap");
  }

  for (const route of getPrerenderRoutes().filter((entry) => entry.indexable === false)) {
    const url = resolveRouteMetadata(route.path, configuredSiteUrl).canonicalUrl;
    assert.ok(
      !sitemap.includes(`<loc>${url}</loc>`),
      `Did not expect ${url} in sitemap`,
    );
  }

  const robots = await readFile(path.join(distDir, "robots.txt"), "utf8");
  contains(robots, `Sitemap: ${configuredSiteUrl}/sitemap.xml`, "robots.txt");
}

await main();
console.log("SEO build verification passed.");
