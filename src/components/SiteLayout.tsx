import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { trackEvent } from "@/lib/analytics";
import { LanguageProvider } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const getHeaderOffset = () => {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const height = header?.offsetHeight ?? 80;
  return height + 20;
};

const focusWithoutScroll = (element: HTMLElement) => {
  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "-1");
  }

  element.focus({ preventScroll: true });
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      window.requestAnimationFrame(() => {
        const main = document.getElementById("main-content");
        if (main) {
          focusWithoutScroll(main);
        }
      });
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;

    const scrollToHash = () => {
      const element = document.getElementById(id);

      if (element) {
        const top = Math.max(
          element.getBoundingClientRect().top + window.scrollY - getHeaderOffset(),
          0,
        );

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        window.requestAnimationFrame(() => focusWithoutScroll(element));
        window.requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      attempts += 1;
      if (attempts < 60) {
        frame = window.requestAnimationFrame(scrollToHash);
      }
    };

    frame = window.requestAnimationFrame(scrollToHash);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash, prefersReducedMotion]);

  return null;
};

export const SiteLayout = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", { pathname: location.pathname, hash: location.hash || null });
  }, [location.hash, location.pathname]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ScrollToTop />
        <a
          href="#main-content"
          className="sr-only z-[70] rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
};
