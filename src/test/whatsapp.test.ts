import { describe, expect, it } from "vitest";

import { buildWhatsAppStartUrl, isWhatsAppConfigured } from "@/lib/whatsapp";

describe("whatsapp CTA configuration", () => {
  it("falls back to the public NETSO WhatsApp number when no env var is present", () => {
    expect(isWhatsAppConfigured()).toBe(true);

    const url = buildWhatsAppStartUrl({
      language: "en",
      source: "test",
    });

    expect(url).toContain("https://wa.me/8801791222777");
    expect(url).toContain(encodeURIComponent("START NETSO | lang=en | source=test"));
  });
});
