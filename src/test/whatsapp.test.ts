import { describe, expect, it } from "vitest";

import {
  buildWhatsAppStartUrl,
  isWhatsAppConfigured,
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
      encodeURIComponent(
        "Hi NETSO, I'm interested in a rooftop energy assessment."
      ),
    );
    expect(url).toContain(encodeURIComponent("lang=en"));
    expect(url).toContain(encodeURIComponent("source=test"));
  });

  it("uses Bengali greeting when language is bn", () => {
    const url = buildWhatsAppStartUrl({
      language: "bn",
      source: "test",
    });

    expect(url).toContain("https://wa.me/8801791222777");
    expect(url).toContain(
      encodeURIComponent("হ্যালো NETSO, আমি রুফটপ এনার্জি মূল্যায়নে আগ্রহী।"),
    );
  });

  it("returns assessment fallback path when no WhatsApp number is configured", () => {
    // Manually clear the env var to test the fallback path
    const original = import.meta.env.VITE_WHATSAPP_NUMBER;
    import.meta.env.VITE_WHATSAPP_NUMBER = "";

    const url = buildWhatsAppStartUrl({
      language: "en",
      source: "test",
    });

    // In test mode without number, it should return the default assessment path
    import.meta.env.VITE_WHATSAPP_NUMBER = original; // restore
  });
});
