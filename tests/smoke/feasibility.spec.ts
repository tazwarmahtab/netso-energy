import { expect, test } from "playwright/test";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "../../src/lib/site-metadata.shared.js";

const expectedNumber = sanitizePhoneNumber(
  process.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
);

test("feasibility routes users into the WhatsApp intake path", async ({ page }) => {
  await page.goto("/feasibility");

  const topCta = page.getByRole("link", { name: /Check rooftop potential/i }).first();
  await expect(topCta).toBeVisible();
  await expect(topCta).toHaveAttribute("href", new RegExp(`wa\\.me\\/${expectedNumber}`));

  const fallbackHeading = page.getByRole("heading", { name: /Continue on WhatsApp/i });
  if (await fallbackHeading.count()) {
    await expect(fallbackHeading).toBeVisible();
    const fallbackCta = page.getByRole("link", { name: /Check rooftop potential/i }).nth(1);
    await expect(
      fallbackCta,
    ).toHaveAttribute("href", new RegExp(`wa\\.me\\/${expectedNumber}`));
    return;
  }

  await expect(page.locator("form")).toBeVisible();
});
