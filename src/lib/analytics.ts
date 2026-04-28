import { DEFAULT_ANALYTICS_ENDPOINT } from "@/lib/site-metadata.shared.js";

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    netsoAnalyticsQueue?: AnalyticsEvent[];
  }
}

function getAnalyticsEndpoint() {
  if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
    return import.meta.env.VITE_ANALYTICS_ENDPOINT;
  }

  if (
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1)$/u.test(window.location.hostname)
  ) {
    return DEFAULT_ANALYTICS_ENDPOINT;
  }

  return "";
}

function queueEvent(name: string, properties?: AnalyticsEvent["properties"]) {
  window.netsoAnalyticsQueue = window.netsoAnalyticsQueue ?? [];
  window.netsoAnalyticsQueue.push({ name, properties });
  window.dataLayer?.push({ event: name, ...properties });
}

function dispatchEvent(name: string, properties?: AnalyticsEvent["properties"]) {
  const analyticsEndpoint = getAnalyticsEndpoint();
  if (!analyticsEndpoint) return;

  const payload = JSON.stringify({
    name,
    properties,
    pathname: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      const sent = navigator.sendBeacon(analyticsEndpoint, blob);
      if (sent) return;
    }
  } catch {
    // Fall through to fetch when Beacon dispatch fails.
  }

  void fetch(analyticsEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    // Analytics failures should never block the user flow.
  });
}

export function trackEvent(name: string, properties?: AnalyticsEvent["properties"]) {
  if (typeof window === "undefined") return;

  queueEvent(name, properties);
  dispatchEvent(name, properties);
}
