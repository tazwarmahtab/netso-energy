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
  const video = page.locator("video").first();

  await expect(video).toBeVisible();
  await expect
    .poll(async () => video.evaluate((element) => element.paused), {
      intervals: [500, 1000, 1500],
      timeout: 7_000,
    })
    .toBe(false);
  await expect
    .poll(async () => video.evaluate((element) => element.currentTime), {
      intervals: [500, 1000, 1500],
      timeout: 7_000,
    })
    .toBeGreaterThan(0.1);

  const state = await video.evaluate((element) => ({
    controls: element.controls,
    currentTime: element.currentTime,
    paused: element.paused,
  }));

  expect(state.controls).toBe(false);
  expect(state.paused).toBe(false);
  expect(state.currentTime).toBeGreaterThan(0.1);
});

test("mobile home shows immediate value proposition and persistent WhatsApp access", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");

  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Turn your rooftop into an energy-generating asset\./i,
    }),
  ).toBeVisible();

  const headerWhatsapp = page.getByRole("link", { name: /WhatsApp/i }).first();
  await expect(headerWhatsapp).toBeVisible();
  await expect(
    headerWhatsapp,
  ).toHaveAttribute("href", new RegExp(`wa\\.me\\/${expectedNumber}`));
});
