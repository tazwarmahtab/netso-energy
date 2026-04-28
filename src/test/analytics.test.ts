import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";

describe("analytics", () => {
  const originalSendBeacon = navigator.sendBeacon;
  const originalFetch = window.fetch;

  beforeEach(() => {
    window.netsoAnalyticsQueue = [];
    window.dataLayer = [];
  });

  afterEach(() => {
    navigator.sendBeacon = originalSendBeacon;
    window.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("sends events through Beacon when available", () => {
    const sendBeacon = vi.fn(() => true);
    navigator.sendBeacon = sendBeacon;

    trackEvent("cta_start_assessment", { source: "hero" });

    expect(window.netsoAnalyticsQueue).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(1);
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon.mock.calls[0]?.[0]).toBe("/api/track");
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
      "/api/track",
      expect.objectContaining({
        keepalive: true,
        method: "POST",
      }),
    );
  });
});
