import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useLanguage } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSiteCopy } from "@/lib/site-copy";
import { buildWhatsAppStartUrl, isWhatsAppConfigured } from "@/lib/whatsapp";

const DISMISS_KEY = "netso:sticky-cta-dismissed";

/**
 * Mobile sticky WhatsApp action bar.
 *
 * Appears only on mobile viewports, only after the visitor has scrolled past
 * the hero (uses the header's hero-reveal state via the same custom events),
 * and never on the feasibility route where a form already owns the moment.
 * Dismissal persists for the session so it never nags.
 */
export const MobileStickyCta = () => {
  const copy = useSiteCopy();
  const { language } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");

    const handleReveal = () => setHeroRevealed(true);
    const handleCollapse = () => setHeroRevealed(false);
    const handleScroll = () => setScrolled(window.scrollY > 600);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("netso:hero-revealed", handleReveal);
    window.addEventListener("netso:hero-collapsed", handleCollapse);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("netso:hero-revealed", handleReveal);
      window.removeEventListener("netso:hero-collapsed", handleCollapse);
    };
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
      trackEvent("sticky_cta_dismissed", { language });
    } catch {
      // Private-browsing sessions may block storage; dismissal still applies
      // for this render lifetime.
    }
  };

  // Non-home routes have no pinned hero, so the bar may show once scrolled.
  const isHomePage = location.pathname === "/";
  const scrolledEnough = isHomePage
    ? heroRevealed || scrolled
    : scrolled;

  const visible = isMobile && !dismissed && scrolledEnough && isWhatsAppConfigured();

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-[60] md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-2xl border border-white/12 bg-[#0d0d0d]/95 p-2 pl-3 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md">
          <a
            href={buildWhatsAppStartUrl({ language, source: "sticky-mobile" })}
            onClick={() =>
              trackEvent("cta_start_assessment", { source: "sticky-mobile", language })
            }
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[0.9rem] font-semibold text-primary-foreground active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {copy.common.startOnWhatsApp}
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/55 transition-colors hover:text-white active:scale-95"
          >
            <X className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
