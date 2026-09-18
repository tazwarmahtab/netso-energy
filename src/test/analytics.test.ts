import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";

describe("analytics", () => {
  const originalSendBeacon = navigator.sendBeacon;
  const originalFetch = window.fetch;

  beforeEach(() => {
    window.netsoAnalyticsQueue = [];
    window.dataLayer = [];
    vi.stubEnv("VITE_ANALYTICS_ENDPOINT", "https://collector.example.com/track");
  });

  afterEach(() => {
    navigator.sendBeacon = originalSendBeacon;
    window.fetch = originalFetch;
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("sends events through Beacon when available", () => {
    const sendBeacon = vi.fn(() => true);
    navigator.sendBeacon = sendBeacon;

    trackEvent("cta_start_assessment", { source: "hero" });

    expect(window.netsoAnalyticsQueue).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(1);
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon.mock.calls[0]?.[0]).toBe("https://collector.example.com/track");
  });

  it("falls back to fetch keepalive when Beacon is unavailable", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response(null, { status: 204 })),
    ) as unknown as typeof fetch;

    navigator.sendBeacon = vi.fn(() => false);
    window.fetch = fetchMock;

    trackEvent("page_view", { pathname: "/" });
    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://collector.example.com/track",
      expect.objectContaining({
        keepalive: true,
        method: "POST",
      }),
    );
  });

  it("queues locally without network when no endpoint is configured", () => {
    vi.stubEnv("VITE_ANALYTICS_ENDPOINT", "");
    const sendBeacon = vi.fn(() => true);
    navigator.sendBeacon = sendBeacon;

    trackEvent("cta_start_assessment", { source: "hero" });

    expect(window.netsoAnalyticsQueue).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(1);
    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
