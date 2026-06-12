import { Language } from "@/lib/i18n";
import {
  DEFAULT_WHATSAPP_NUMBER,
  sanitizePhoneNumber,
} from "@/lib/site-metadata";

const DEFAULT_ASSESSMENT_PATH = "/feasibility";

type WhatsAppStartOptions = {
  language: Language;
  source: string;
  sessionId?: string;
  calculatorSummary?: string;
  details?: string[];
};

function getWhatsAppNumber() {
  const configuredNumber = sanitizePhoneNumber(import.meta.env.VITE_WHATSAPP_NUMBER);
  // At least 10 digits (BDD phone numbers are 10+ digits)
  if (configuredNumber && configuredNumber.length >= 10) {
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

  const greeting =
    options.language === "bn"
      ? "হ্যালো NETSO, আমি রুফটপ এনার্জি মূল্যায়নে আগ্রহী।"
      : "Hi NETSO, I'm interested in a rooftop energy assessment.";

  const starter = [greeting, `lang=${options.language}`, `source=${options.source}`];

  if (options.sessionId) starter.push(`session=${options.sessionId}`);
  if (options.calculatorSummary) starter.push(`estimate=${options.calculatorSummary}`);
  if (options.details?.length) {
    starter.push(...options.details.filter((detail) => detail.trim().length > 0));
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(starter.join(" | "))}`;
}
