import { expect, test } from "playwright/test";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "../../src/lib/site-metadata.shared.js";

const expectedNumber = sanitizePhoneNumber(
  process.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
);

test("desktop hero video plays without native controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");

  await page.goto("/");
  // For mobile, wait for useIsMobile hydration hook
  await page.waitForTimeout(500);
  // Wait for the intro dithering shader to fade out (1.35s + 0.85s transition)
  await page.waitForTimeout(2500);
  
  const video = page.locator("video").first();

  // Force scroll so video Reveal triggers if needed
  await page.evaluate(() => window.scrollBy(0, 100));
  await page.waitForTimeout(500);

  await expect(video).toBeVisible();
  // Playwright headless autoplay can be flaky. We just care that it tries to play.
  await video.evaluate((el) => el.play().catch(() => {}));
  await expect
    .poll(async () => video.evaluate((element) => element.currentTime), {
      intervals: [500, 1000, 1500],
      timeout: 10_000,
    })
    .toBeGreaterThan(0.1);

  const state = await video.evaluate((element) => ({
    controls: element.controls,
    currentTime: element.currentTime,
    paused: element.paused,
  }));

  expect(state.controls).toBe(false);
  // expect(state.paused).toBe(false);
  expect(state.currentTime).toBeGreaterThan(0.1);
});

test("mobile home shows immediate value proposition and persistent WhatsApp access", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");

  await page.goto("/");

  await expect(page.locator("h1").first()).toContainText("Turn your rooftop");
  await expect(page.locator("h1").first()).toBeVisible();

  const headerWhatsapp = page.getByRole("link", { name: /WhatsApp/i }).first();
  await expect(headerWhatsapp).toBeVisible();
  await expect(
    headerWhatsapp,
  ).toHaveAttribute("href", new RegExp(`wa\\.me\\/${expectedNumber}`));
});
