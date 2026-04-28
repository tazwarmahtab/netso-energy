import assert from "node:assert/strict";
import { access, stat } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_SITE_URL,
  DEFAULT_WHATSAPP_NUMBER,
  marketingRouteEntries,
  resolveRouteMetadata,
  resolveSiteUrl,
  sanitizePhoneNumber,
} from "../src/lib/site-metadata.shared.js";

const projectRoot = process.cwd();

async function assertExists(relativePath) {
  await access(path.join(projectRoot, relativePath));
}

async function assertMissing(relativePath) {
  try {
    await stat(path.join(projectRoot, relativePath));
    throw new Error(`Expected ${relativePath} to be removed.`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Expected")) {
      throw error;
    }
  }
}

async function main() {
  const strictRelease = process.env.VERIFY_RELEASE_STRICT === "1";
  const configuredSiteUrl = process.env.VITE_SITE_URL;
  const configuredWhatsAppNumber = process.env.VITE_WHATSAPP_NUMBER;

  if (strictRelease) {
    assert.ok(configuredSiteUrl, "Expected VITE_SITE_URL to be set for release verification.");
    assert.ok(
      configuredWhatsAppNumber,
      "Expected VITE_WHATSAPP_NUMBER to be set for release verification.",
    );
  }

  const siteUrl = resolveSiteUrl(configuredSiteUrl || DEFAULT_SITE_URL);
  const whatsAppNumber = sanitizePhoneNumber(
    configuredWhatsAppNumber || DEFAULT_WHATSAPP_NUMBER,
  );

  assert.match(siteUrl, /^https:\/\/.+/u, "Expected an https site URL.");
  assert.ok(
    whatsAppNumber.length >= 10,
    "Expected a valid WhatsApp number in config.",
  );

  for (const [route] of marketingRouteEntries) {
    const metadata = resolveRouteMetadata(route, siteUrl);
    assert.ok(metadata.titleText.includes("| NETSO ENERGY"));
    assert.ok(metadata.canonicalUrl.startsWith(siteUrl));
  }

  await Promise.all([
    assertExists("public/favicon.ico"),
    assertExists("public/favicon.png"),
    assertExists("public/apple-touch-icon.png"),
    assertExists("public/og-image.jpg"),
    assertExists("public/fonts/aeonikPro-400.woff2"),
    assertExists("public/fonts/featureDeck-700.woff2"),
    assertExists("public/fonts/socialMono-400.woff2"),
    assertMissing("netlify.toml"),
  ]);
}

await main();
console.log("Public config verification passed.");
