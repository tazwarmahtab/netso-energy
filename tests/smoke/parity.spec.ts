import { expect, test } from "playwright/test";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "../../src/lib/site-metadata.shared.js";

const compareUrl = process.env.PLAYWRIGHT_COMPARE_URL;
const expectedNumber = sanitizePhoneNumber(
  process.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
);

test("preview and deployed homepage keep the same primary CTA contract", async ({ browser, baseURL }) => {
  test.skip(!compareUrl, "Set PLAYWRIGHT_COMPARE_URL to run live parity checks.");

  const previewPage = await browser.newPage({ baseURL });
  const livePage = await browser.newPage({ baseURL: compareUrl });

  await previewPage.goto("/");
  await livePage.goto("/");

  const previewHref = await previewPage
    .getByRole("link", { name: /WhatsApp/i })
    .first()
    .getAttribute("href");
  const liveHref = await livePage
    .getByRole("link", { name: /WhatsApp/i })
    .first()
    .getAttribute("href");

  expect(previewHref).toMatch(new RegExp(`wa\\.me\\/${expectedNumber}`));
  expect(liveHref).toBe(previewHref);

  await previewPage.close();
  await livePage.close();
});
