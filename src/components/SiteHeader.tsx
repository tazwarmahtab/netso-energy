import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { trackEvent } from "@/lib/analytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { headerLogoAvif, headerLogoPng, mobileHeaderLogoAvif } from "@/lib/homepage-media";
import { useLanguage } from "@/lib/i18n";
import { useSiteCopy } from "@/lib/site-copy";
import { buildWhatsAppStartUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const SiteHeader = () => {
  const brandWordmark = "NETSO ENERGY";
  const copy = useSiteCopy();
  const location = useLocation();
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(location.pathname !== "/");
  const leadHref = buildWhatsAppStartUrl({ language, source: "header" });
  const primaryItems = copy.nav.items.slice(0, 2);
  const secondaryItems = copy.nav.items.slice(2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setHeroRevealed(true);
      return;
    }

    setHeroRevealed(window.scrollY > 80 || Boolean(location.hash));

    const handleReveal = () => setHeroRevealed(true);
    const handleCollapse = () => setHeroRevealed(false);

    window.addEventListener("netso:hero-revealed", handleReveal);
    window.addEventListener("netso:hero-collapsed", handleCollapse);

    return () => {
      window.removeEventListener("netso:hero-revealed", handleReveal);
      window.removeEventListener("netso:hero-collapsed", handleCollapse);
    };
  }, [location.hash, location.pathname]);

  const surfaceClassName = scrolled
    ? "border-white/14 bg-black/66 shadow-[0_28px_70px_-38px_rgba(0,0,0,0.82)]"
    : "border-white/10 bg-black/42 shadow-[0_20px_56px_-36px_rgba(0,0,0,0.78)]";
  const shouldAnimate = !prefersReducedMotion;
  const isCompact = location.pathname === "/" ? heroRevealed : true;

  return (
    <header data-site-header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between lg:justify-center">
        <motion.div
          layout
          transition={{ layout: { duration: shouldAnimate ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] } }}
          className={cn(
            "hidden items-center justify-center lg:flex",
            isCompact ? "gap-2" : "gap-3",
          )}
        >
          <motion.div
            layout
            initial={shouldAnimate ? { opacity: 0, x: -48, scale: 0.92 } : false}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: shouldAnimate ? 0.8 : 0,
              ease: [0.22, 1, 0.36, 1],
              layout: { duration: shouldAnimate ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex items-center gap-2"
          >
            <Link
              to="/"
              className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border backdrop-blur-[18px] transition-[width,height,transform,box-shadow,background-color,border-color] duration-500 hover:scale-[1.03]",
                isCompact ? "h-12 w-12" : "h-14 w-14",
                surfaceClassName,
              )}
              aria-label={`${copy.common.brand} home`}
            >
              <img
                src={headerLogoAvif}
                alt=""
                decoding="async"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = headerLogoPng;
                }}
                className={cn(
                  "scale-[1.8] object-contain transition-[width,height] duration-500",
                  isCompact ? "size-[3.35rem]" : "size-[4rem]",
                )}
              />
            </Link>

            <motion.div
              initial={false}
              animate={{
                opacity: isCompact ? 0 : 1,
                width: isCompact ? 0 : 132,
                x: isCompact ? -10 : 0,
              }}
              transition={{
                duration: shouldAnimate ? 0.48 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
              aria-hidden={isCompact}
            >
              <div
                className={cn(
                  "flex h-14 items-center text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/74 whitespace-nowrap transition-[height,opacity] duration-500",
                )}
              >
                {brandWordmark}
              </div>
            </motion.div>
          </motion.div>

          <motion.nav
            layout
            aria-label="Primary"
            initial={shouldAnimate ? { opacity: 0, y: -14, scale: 0.96 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldAnimate ? 0.82 : 0,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldAnimate ? 0.04 : 0,
              layout: { duration: shouldAnimate ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] },
            }}
            className="min-w-0"
          >
            <motion.div
              layout
              className={cn(
                "grid max-w-[calc(100vw-12rem)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center rounded-full border backdrop-blur-[18px] transition-[width,padding,box-shadow,background-color,border-color] duration-500",
                isCompact ? "w-[44rem] px-1.5 py-1.5" : "w-[52rem] px-2 py-2",
                surfaceClassName,
              )}
            >
              <div
                className={cn(
                  "grid min-w-0 grid-cols-2 transition-[padding,gap] duration-500",
                  isCompact ? "gap-0.5 pr-2" : "gap-1 pr-3",
                )}
              >
                {primaryItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "w-full rounded-full text-center text-white/72 transition-[padding,font-size,background-color,color] duration-500 hover:bg-white/[0.06] hover:text-white",
                      isCompact ? "px-3 py-2 text-[0.8rem]" : "px-4 py-2.5 text-sm",
                      location.pathname === item.href && "bg-white/[0.08] text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div
                className={cn(
                  "flex items-center justify-center transition-[gap,padding,transform] duration-500",
                  isCompact ? "gap-1.5 px-1" : "gap-2 px-2",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-px bg-white/10 transition-[width] duration-500",
                    isCompact ? "w-4" : "w-6",
                  )}
                />
                <div
                  className={cn(
                    "transition-transform duration-500",
                    isCompact ? "scale-95" : "scale-100",
                  )}
                >
                  <LanguageToggle variant="inline" />
                </div>
                <span
                  aria-hidden
                  className={cn(
                    "h-px bg-white/10 transition-[width] duration-500",
                    isCompact ? "w-4" : "w-6",
                  )}
                />
              </div>

              <div
                className={cn(
                  "grid min-w-0 grid-cols-2 transition-[padding,gap] duration-500",
                  isCompact ? "gap-0.5 pl-2" : "gap-1 pl-3",
                )}
              >
                {secondaryItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "w-full rounded-full text-center text-white/72 transition-[padding,font-size,background-color,color] duration-500 hover:bg-white/[0.06] hover:text-white",
                      isCompact ? "px-3 py-2 text-[0.8rem]" : "px-4 py-2.5 text-sm",
                      location.pathname === item.href && "bg-white/[0.08] text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.nav>

          <motion.div
            layout
            initial={shouldAnimate ? { opacity: 0, x: 48, scale: 0.92 } : false}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: shouldAnimate ? 0.8 : 0,
              ease: [0.22, 1, 0.36, 1],
              delay: shouldAnimate ? 0.08 : 0,
              layout: { duration: shouldAnimate ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] },
            }}
            className="flex items-center gap-2"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: isCompact ? 0 : 0,
                width: isCompact ? 0 : 132,
                x: isCompact ? 10 : 0,
              }}
              transition={{
                duration: shouldAnimate ? 0.48 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className={cn(
                  "flex h-14 items-center text-[0.68rem] font-medium uppercase tracking-[0.24em] whitespace-nowrap opacity-0 transition-[height] duration-500",
                )}
              >
                {brandWordmark}
              </div>
            </motion.div>
            <a
              href={leadHref}
              onClick={() => trackEvent("cta_start_assessment", { source: "header", language })}
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sun transition-[width,height,transform,box-shadow,filter] duration-500 hover:scale-[1.03] hover:brightness-110",
                isCompact ? "h-12 w-12" : "h-14 w-14",
              )}
              aria-label={copy.common.startAssessment}
            >
              <ArrowUpRight
                className={cn(
                  "transition-[width,height] duration-500",
                  isCompact ? "h-[18px] w-[18px]" : "h-5 w-5",
                )}
                strokeWidth={2.3}
              />
            </a>
          </motion.div>
        </motion.div>

        <div className="flex w-full items-center justify-between lg:hidden">
          <Link
            to="/"
            className={cn(
              "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border backdrop-blur-[18px] transition-[width,height,transform,box-shadow,background-color,border-color] duration-500 hover:scale-[1.03]",
              isCompact ? "h-12 w-12" : "h-14 w-14",
              surfaceClassName,
            )}
            aria-label={`${copy.common.brand} home`}
          >
            <img
              src={mobileHeaderLogoAvif}
              alt=""
              decoding="async"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = headerLogoPng;
              }}
              className={cn(
                "scale-[1.8] object-contain transition-[width,height] duration-500",
                isCompact ? "size-[3.35rem]" : "size-[4rem]",
              )}
            />
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex items-center justify-center rounded-full border text-white backdrop-blur-[18px] transition-[width,height,transform,box-shadow,background-color,border-color] duration-500",
                isCompact ? "h-12 w-12" : "h-14 w-14",
                surfaceClassName,
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{copy.nav.menuLabel}</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[90vw] border-white/10 bg-[#0d0d0d] text-white sm:max-w-md"
            >
              <SheetHeader className="space-y-3 text-left">
                <SheetTitle className="text-white">{copy.common.brand}</SheetTitle>
                <SheetDescription className="text-white/58">{copy.nav.intro}</SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                <div className="grid gap-2">
                  {copy.nav.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-base transition-colors hover:bg-white/[0.06]",
                        location.pathname === item.href && "border-primary/30 bg-primary/10 text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/52">{copy.common.languageLabel}</p>
                  <LanguageToggle className="mt-4 border-white/10 bg-transparent text-white" />
                </div>

                <div className="grid gap-3">
                  <StartAssessmentLink source="mobile-menu" className="w-full" />
                  <EstimateLink
                    source="mobile-menu"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
