import { useEffect, useMemo, useState, type ReactNode } from "react";

import { LanguageContext, type LanguageContextValue } from "@/lib/i18n-context";

export type Language = "en" | "bn";

const STORAGE_KEY = "netso-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bn") {
      setLanguageState(stored);
      document.documentElement.lang = stored === "bn" ? "bn" : "en";
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage === "bn" ? "bn" : "en";
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "bn" : "en"),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
