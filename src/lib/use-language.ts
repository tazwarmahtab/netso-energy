import { useContext } from "react";

import { LanguageContext } from "@/lib/i18n-context";

/**
 * Access the active UI language. Must be used inside `LanguageProvider`.
 * Split out of `i18n.tsx` so each module exports either a component or a
 * hook — required for React Fast Refresh to work correctly.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}
