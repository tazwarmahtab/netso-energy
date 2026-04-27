import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteCopy } from "@/lib/site-copy";
import heroPoster from "@/assets/hero-rooftop.jpg";
import heroBackground from "@/assets/custom/hero-background-reference-optimized.jpg";
import heroVideo from "@/assets/new/hero-loop-optimized.mp4";

type HeroOverlayProps = {
  scrollProgress: number;
  isMobile: boolean;
  contentVisible: boolean;
  prefersReducedMotion: boolean;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const HeroOverlay = ({
  scrollProgress,
  isMobile,
  contentVisible,
  prefersReducedMotion,
}: HeroOverlayProps) => {
  const copy = useSiteCopy();
  const revealProgress = prefersReducedMotion ? 1 : clamp((scrollProgress - 0.84) / 0.16);
  const overlayY = `${(1 - revealProgress) * 8}vh`;
  const leftScale = 0.96 + revealProgress * 0.04;
  const leftY = `${(1 - revealProgress) * 2.8}vh`;
  const cardScale = 0.97 + revealProgress * 0.03;
  const cardX = `${(1 - revealProgress) * 2.2}vw`;
  const cardY = `${(1 - revealProgress) * 2.4}vh`;
  const trustScale = 0.98 + revealProgress * 0.02;
  const trustY = `${(1 - revealProgress) * 2}vh`;
  const ambientLeftX = `${-7 + revealProgress * 4}vw`;
  const ambientLeftScale = 1.02 + revealProgress * 0.1;
  const ambientRightX = `${revealProgress * 2.4}vw`;
  const ambientRightScale = 1.03 + revealProgress * 0.1;
  const headlineSize = isMobile
    ? "clamp(2.5rem, 10.5vw, 4rem)"
    : "clamp(4rem, 6.6vw, 6rem)";
  const bodyWidth = isMobile ? "100%" : "31rem";
  const revealDuration = prefersReducedMotion ? 0 : 0.85;
  const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="pointer-events-none absolute -left-[10vw] top-[12vh] h-[46vh] w-[46vh] rounded-full bg-white/6 blur-[100px]"
        style={{ x: ambientLeftX, scale: ambientLeftScale }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: revealDuration * 0.7, ease: revealEase }}
      />
      <motion.div
        className="pointer-events-none absolute right-[3vw] top-[15vh] h-[28vh] w-[28vh] rounded-full bg-primary/12 blur-[88px]"
        style={{ x: ambientRightX, scale: ambientRightScale }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: revealDuration * 0.7, ease: revealEase, delay: prefersReducedMotion ? 0 : 0.08 }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-2 z-10 md:bottom-5"
        style={{ y: overlayY }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.7fr)] lg:gap-14">
          <motion.div
            className="readability-mask-dark relative max-w-[52rem] self-end pb-1 md:pb-3"
            style={{ scale: leftScale, y: leftY, transformOrigin: "left bottom" }}
            initial={false}
            animate={{ opacity: contentVisible ? 1 : 0 }}
            transition={{ duration: revealDuration, ease: revealEase }}
          >
            <motion.div
              className="eyebrow mb-5 flex items-center gap-4 text-white/72"
              initial={false}
              animate={{
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 22,
              }}
              transition={{ duration: revealDuration * 0.55, ease: revealEase }}
            >
              <div className="h-px w-10 bg-primary/30" />
              {copy.hero.eyebrow}
            </motion.div>

            <motion.h1
              className="text-shadow-soft max-w-[8.8ch] font-display leading-[0.89] tracking-[-0.055em] text-white"
              style={{ fontSize: headlineSize }}
              initial={false}
              animate={{
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 44,
              }}
              transition={{
                duration: revealDuration,
                ease: revealEase,
                delay: prefersReducedMotion ? 0 : 0.08,
              }}
            >
              {copy.hero.headline}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-[30rem] text-[0.9rem] leading-6 text-white/80 md:mt-5 md:text-[1rem] md:leading-7"
              style={{ maxWidth: bodyWidth }}
              initial={false}
              animate={{
                opacity: contentVisible ? 1 : 0,
                y: contentVisible ? 0 : 26,
              }}
              transition={{
                duration: revealDuration * 0.72,
                ease: revealEase,
                delay: prefersReducedMotion ? 0 : 0.18,
              }}
            >
              {copy.hero.body}
            </motion.p>
          </motion.div>

          <motion.div
            className="readability-panel-dark self-end rounded-[28px] p-4 md:p-6"
            style={{ scale: cardScale, x: cardX, y: cardY, transformOrigin: "right bottom" }}
            initial={false}
            animate={{
              opacity: contentVisible ? 1 : 0,
              y: contentVisible ? cardY : `calc(${cardY} + 48px)`,
            }}
            transition={{
              duration: revealDuration,
              ease: revealEase,
              delay: prefersReducedMotion ? 0 : 0.24,
            }}
          >
            <p className="eyebrow text-white/46">{copy.hero.cardEyebrow}</p>
            <h2 className="mt-3 max-w-[16ch] text-[1.18rem] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[1.45rem]">
              {copy.hero.cardTitle}
            </h2>
            <p className="mt-4 border-t border-white/10 pt-4 text-[0.88rem] leading-5 text-white/60 md:mt-5 md:pt-5 md:text-[0.92rem] md:leading-6">
              {copy.hero.cardBody}
            </p>

            <div className="mt-5 flex flex-col gap-3 md:mt-6">
              <StartAssessmentLink source="hero" className="w-full" />
              <EstimateLink
                source="hero"
                className="w-full border-white/14 bg-white/[0.04] text-white hover:bg-white/[0.08]"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="readability-panel-dark mt-6 rounded-[22px] p-3.5 md:mt-10 md:p-4"
          style={{ scale: trustScale, y: trustY, transformOrigin: "center bottom" }}
          initial={false}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? trustY : `calc(${trustY} + 28px)`,
          }}
          transition={{
            duration: revealDuration * 0.72,
            ease: revealEase,
            delay: prefersReducedMotion ? 0 : 0.34,
          }}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {copy.hero.trustNotes.map((note) => (
              <div key={note} className="flex items-center gap-3 rounded-full border border-white/8 bg-black/16 px-4 py-3">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary/55" />
                <span className="text-[0.66rem] uppercase tracking-[0.16em] text-white/76 md:text-[0.72rem] md:tracking-[0.18em]">
                  {note}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const copy = useSiteCopy();
  const prefersReducedMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setTimeout(() => setIntroVisible(false), 1350);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="theme-dark relative z-20 overflow-visible bg-background">
      <AnimatePresence>
        {introVisible ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-[70]"
          >
            <DitheringShader
              className="absolute inset-0"
              colorBack="#090806"
              colorFront="#c8b2ff"
              shape="warp"
              type="4x4"
              pxSize={5}
              speed={0.65}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={heroVideo}
        posterSrc={heroPoster}
        title="NETSO ENERGY"
        videoRevealStart={0}
        showPosterBeforeReveal={false}
        bgImageSrc={heroBackground}
        initialWidthDesktop={448}
        expandedWidthDesktop={1680}
        initialHeightDesktop={286}
        expandedHeightDesktop={930}
        initialWidthMobile={188}
        expandedWidthMobile={1040}
        initialHeightMobile={234}
        expandedHeightMobile={540}
        maxMediaWidth="100vw"
        maxMediaHeight="112vh"
        mediaOverlayOpacity={0.18}
        mediaObjectPosition="center 14%"
        textBlend
        renderOverlay={({ scrollProgress, isMobile, showContent }) => (
          <HeroOverlay
            scrollProgress={scrollProgress}
            isMobile={isMobile}
            contentVisible={showContent}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      />
    </section>
  );
};
