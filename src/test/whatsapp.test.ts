import { describe, expect, it } from "vitest";

import {
  CALCULATOR_SUMMARY_KEY,
  buildWhatsAppStartUrl,
  isWhatsAppConfigured,
  publishCalculatorSummary,
  readCalculatorSummary,
} from "@/lib/whatsapp";

describe("whatsapp CTA configuration", () => {
  it("falls back to the public NETSO WhatsApp number when no env var is present", () => {
    expect(isWhatsAppConfigured()).toBe(true);

    const url = buildWhatsAppStartUrl({
      language: "en",
      source: "test",
    });

    expect(url).toContain("https://wa.me/8801791222777");
    expect(url).toContain(
      encodeURIComponent("Hello NETSO! I want a rooftop review."),
    );
    expect(url).toContain(encodeURIComponent("Ref: EN · test"));
  });

  it("publishes and reads calculator summary across session channel", () => {
    const testSummary = "type=c_and_i,region=dhaka,bill=12000,roof=1200,kwp=7.8,savings=1400-2400";
    publishCalculatorSummary(testSummary);
    expect(readCalculatorSummary()).toBe(testSummary);

    const urlWithEstimate = buildWhatsAppStartUrl({
      language: "en",
      source: "sticky-mobile-estimate",
      calculatorSummary: testSummary,
    });
    expect(urlWithEstimate).toContain(encodeURIComponent(`estimate ${testSummary}`));
  });
});
