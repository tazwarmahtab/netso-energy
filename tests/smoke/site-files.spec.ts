import { expect, test } from "playwright/test";
import {
  DEFAULT_SITE_URL,
  getIndexableRoutes,
  resolveRouteMetadata,
  resolveSiteUrl,
} from "../../src/lib/site-metadata.shared.js";

test("built site files and headers match the shared manifest", async ({ request }) => {
  const siteUrl = resolveSiteUrl(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const homeResponse = await request.get("/");
  expect(homeResponse.ok()).toBe(true);
  expect(homeResponse.headers()["x-frame-options"]).toBe("DENY");
  expect(homeResponse.headers()["x-content-type-options"]).toBe("nosniff");
  expect(homeResponse.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");

  const homeHtml = await homeResponse.text();
  const homeMetadata = resolveRouteMetadata("/", siteUrl);
  expect(homeHtml).toContain(homeMetadata.titleText);
  expect(homeHtml).toContain(homeMetadata.canonicalUrl);

  const assetMatch = homeHtml.match(/src="(\/assets\/[^"]+\.js)"/u);
  expect(assetMatch?.[1]).toBeTruthy();

  const assetResponse = await request.get(assetMatch[1]);
  expect(assetResponse.ok()).toBe(true);
  expect(assetResponse.headers()["cache-control"]).toContain("immutable");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  for (const routePath of getIndexableRoutes()) {
    expect(sitemap).toContain(resolveRouteMetadata(routePath, siteUrl).canonicalUrl);
  }
});

test("unknown routes serve the 404 experience instead of the home page", async ({ request }) => {
  const siteUrl = resolveSiteUrl(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const response = await request.get("/does-not-exist");
  expect(response.status()).toBe(404);

  const html = await response.text();
  const metadata = resolveRouteMetadata("/404", siteUrl);
  expect(html).toContain(metadata.titleText);
  expect(html).toContain(metadata.robotsContent);
  expect(html).not.toContain(resolveRouteMetadata("/", siteUrl).titleText);
});
