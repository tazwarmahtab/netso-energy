import { Language } from "@/lib/i18n";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "@/lib/site-metadata";

const DEFAULT_ASSESSMENT_PATH = "/feasibility";

/**
 * Session-scoped channel for the live calculator summary.
 *
 * The funnel publishes a PII-free summary string (segment/region/bill/roof/
 * kwp/savings — never name/phone/address) so the mobile sticky CTA can attach
 * it to its WhatsApp handoff instead of opening a contextless chat. Transport
 * is sessionStorage (survives route changes within the tab) plus a CustomEvent
 * for same-page live updates.
 */
export const CALCULATOR_SUMMARY_KEY = "netso:calculator-summary";
export const CALCULATOR_SUMMARY_EVENT = "netso:calculator-summary";

export function publishCalculatorSummary(summary: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(CALCULATOR_SUMMARY_KEY, summary);
  } catch {
    // Private-browsing sessions may block storage; the live event below
    // still delivers the summary for the current page lifetime.
  }
  window.dispatchEvent(
    new CustomEvent<string>(CALCULATOR_SUMMARY_EVENT, { detail: summary }),
  );
}

export function readCalculatorSummary(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(CALCULATOR_SUMMARY_KEY);
  } catch {
    return null;
  }
}

type WhatsAppStartOptions = {
  language: Language;
  source: string;
  sessionId?: string;
  calculatorSummary?: string;
  details?: string[];
};

function getWhatsAppNumber() {
  const configuredNumber = sanitizePhoneNumber(import.meta.env.VITE_WHATSAPP_NUMBER);
  if (configuredNumber) {
    return configuredNumber;
  }

  if (import.meta.env.DEV || import.meta.env.MODE === "test") {
    return DEFAULT_WHATSAPP_NUMBER;
  }

  if (
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1)$/u.test(window.location.hostname)
  ) {
    return DEFAULT_WHATSAPP_NUMBER;
  }

  return "";
}

export function isWhatsAppConfigured() {
  return getWhatsAppNumber().length >= 10;
}

export function getAssessmentFallbackPath() {
  return DEFAULT_ASSESSMENT_PATH;
}

export function buildWhatsAppStartUrl(options: WhatsAppStartOptions) {
  const number = getWhatsAppNumber();
  if (!number) return DEFAULT_ASSESSMENT_PATH;

  const langTag = options.language === "bn" ? "BN" : "EN";
  const greeting =
    options.language === "bn"
      ? "হ্যালো NETSO! আমি ছাদের রিভিউ চাই।"
      : "Hello NETSO! I want a rooftop review.";

  const refParts = [langTag, options.source];
  if (options.sessionId) refParts.push(`session ${options.sessionId}`);
  if (options.calculatorSummary) refParts.push(`estimate ${options.calculatorSummary}`);

  // Ref tail stays on the last line, after the greeting, so it reads as
  // provenance metadata rather than a command a human has to decode.
  const lines = [greeting, `Ref: ${refParts.join(" · ")}`];
  if (options.details?.length) {
    lines.push(...options.details.filter((detail) => detail.trim().length > 0));
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
