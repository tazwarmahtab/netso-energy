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

export function trackEvent(name: string, properties?: AnalyticsEvent["properties"]) {
  if (typeof window === "undefined") return;

  const event = { event: name, ...properties };
  window.netsoAnalyticsQueue = window.netsoAnalyticsQueue ?? [];
  window.netsoAnalyticsQueue.push({ name, properties });
  window.dataLayer?.push(event);
}
