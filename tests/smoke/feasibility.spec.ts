import { expect, test } from "playwright/test";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "../../src/lib/site-metadata.shared.js";

const expectedNumber = sanitizePhoneNumber(
  process.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER,
);

test("feasibility routes users into the WhatsApp intake path", async ({ page, isMobile }) => {
  await page.goto("/feasibility", { waitUntil: "networkidle" });

  // Feasibility page provides direct WhatsApp route
  // In mobile view the header button is visible, in desktop both header & CTA are available
  const whatsappLinks = page.locator(`a[href*="wa.me/${expectedNumber}"]`);
  const count = await whatsappLinks.count();
  expect(count).toBeGreaterThan(0);

  // Web feasibility form is rendered
  await expect(page.locator("form")).toBeVisible();
});
