import { Language } from "@/lib/i18n";

const DEFAULT_ASSESSMENT_PATH = "/feasibility";
const DEFAULT_WHATSAPP_NUMBER = "8801791222777";

type WhatsAppStartOptions = {
  language: Language;
  source: string;
  sessionId?: string;
  calculatorSummary?: string;
  details?: string[];
};

function getWhatsAppNumber() {
  const configuredNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  return configuredNumber || DEFAULT_WHATSAPP_NUMBER;
}

export function isWhatsAppConfigured() {
  return getWhatsAppNumber().length >= 10;
}

export function buildWhatsAppStartUrl(options: WhatsAppStartOptions) {
  const number = getWhatsAppNumber();
  if (!number) return DEFAULT_ASSESSMENT_PATH;

  const starter =
    options.language === "bn"
      ? ["START NETSO", "lang=bn", `source=${options.source}`]
      : ["START NETSO", "lang=en", `source=${options.source}`];

  if (options.sessionId) starter.push(`session=${options.sessionId}`);
  if (options.calculatorSummary) starter.push(`estimate=${options.calculatorSummary}`);
  if (options.details?.length) {
    starter.push(...options.details.filter((detail) => detail.trim().length > 0));
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(starter.join(" | "))}`;
}
