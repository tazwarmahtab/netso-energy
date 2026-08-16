import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { ResponsiveImage } from "@/components/ui/responsive-image";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { useDataSaver } from "@/hooks/useDataSaver";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  heroBackgroundAvifSources,
  heroBackgroundFallback,
  heroBackgroundJpegSources,
  heroPosterFallback,
  heroPosterJpegSources,
  heroPosterMobileFallback,
} from "@/lib/homepage-media";
import { useSiteCopy } from "@/lib/site-copy";
import heroVideo from "@/assets/new/hero-loop-optimized.mp4";

type HeroOverlayProps = {
  scrollProgress: number;
  isMobile: boolean;
  contentVisible: boolean;
  prefersReducedMotion: boolean;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const renderHeadline = (headline: string) => {
  const highlight =
    headline.includes("energy-generating")
      ? "energy-generating"
      : headline.includes("বিদ্যুৎ-উৎপাদনকারী")
        ? "বিদ্যুৎ-উৎপাদনকারী"
        : null;

  if (!highlight) return headline;

  const [before, after] = headline.split(highlight);

  return (
    <>
      {before}
      <span className="text-primary">{highlight}</span>
      {after}
    </>
  );
};

const HeroOverlay = ({
  scrollProgress,
  isMobile,
  contentVisible,
  prefersReducedMotion,
}: HeroOverlayProps) => {
  const copy = useSiteCopy();
  const revealProgress =
    prefersReducedMotion || isMobile ? 1 : clamp((scrollProgress - 0.84) / 0.16);
  const overlayY = `${(1 - revealProgress) * 8}vh`;
  const leftScale = 0.96 + revealProgress * 0.04;
  const leftY = `${(1 - revealProgress) * 2.8}vh`;
  const cardScale = 0.97 + revealProgress * 0.03;
  const cardX = `${(1 - revealProgress) * 2.2}vw`;
  const cardY = `${(1 - revealProgress) * 2.4}vh`;
  const ambientLeftX = `${-7 + revealProgress * 4}vw`;
  const ambientLeftScale = 1.02 + revealProgress * 0.1;
  const ambientRightX = `${revealProgress * 2.4}vw`;
  const ambientRightScale = 1.03 + revealProgress * 0.1;
  const headlineSize = "clamp(4rem, 6.6vw, 6rem)";
  const revealDuration = prefersReducedMotion ? 0 : 0.85;
  const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="pointer-events-none absolute -left-[10vw] top-[12vh] h-[46vh] w-[46vh] rounded-full bg-white/6 blur-[100px]"
        style={{ x: ambientLeftX, scale: ambientLeftScale }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: revealDuration * 0.7, ease: revealEase }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[3vw] top-[15vh] h-[28vh] w-[28vh] rounded-full bg-primary/12 blur-[88px]"
        style={{ x: ambientRightX, scale: ambientRightScale }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{
          duration: revealDuration * 0.7,
          ease: revealEase,
          delay: prefersReducedMotion ? 0 : 0.08,
        }}
        aria-hidden="true"
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
                className="text-shadow-hero max-w-[8.8ch] font-editorial leading-[0.89] tracking-[-0.055em] text-white"
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
                {renderHeadline(copy.hero.headline)}
              </motion.h1>

              <motion.p
                className="mt-4 max-w-[30rem] text-[0.9rem] leading-6 text-white/80 md:mt-5 md:text-[1rem] md:leading-7"
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
              style={{
                scale: cardScale,
                x: cardX,
                y: cardY,
                transformOrigin: "right bottom",
              }}
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MobileHero = ({
  mobileVideoArmed,
  prefersReducedMotion,
}: {
  mobileVideoArmed: boolean;
  prefersReducedMotion: boolean;
}) => {
  const copy = useSiteCopy();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mobileVideoArmed || prefersReducedMotion) return;

    const attemptPlay = () => {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Ignore mobile autoplay rejections and keep the poster fallback visible.
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
      return;
    }

    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
    };
  }, [mobileVideoArmed, prefersReducedMotion]);

  return (
    <section className="theme-dark relative overflow-hidden bg-background pt-4 sm:pt-5 h-[calc(100svh-4.6rem)]">
      {/* Full-screen Background Video / Image */}
      <div className="absolute inset-0 -z-10 bg-black">
        {mobileVideoArmed && !prefersReducedMotion ? (
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroPosterMobileFallback}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            className="h-full w-full object-cover object-[center_30%]"
          />
        ) : (
          <ResponsiveImage
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[center_30%]"
            decoding="async"
            width={1920}
            height={1080}
            fallbackSrc={heroPosterFallback}
            fallbackSources={heroPosterJpegSources}
            loading="eager"
            sizes="100vw"
            modernType="image/jpeg"
            sources={heroPosterJpegSources}
          />
        )}
        
        {/* Deep gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.25)_40%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      <div className="container-tight relative z-10 flex h-full flex-col justify-between pb-8 pt-4">
        <div className="max-w-[21rem]">
          <p className="eyebrow mb-4 text-white/80">{copy.hero.eyebrow}</p>
          <h1 className="max-w-[10ch] font-editorial text-[clamp(2.75rem,11vw,4.3rem)] leading-[0.92] tracking-[-0.04em] text-white text-shadow-hero">
            {renderHeadline(copy.hero.headline)}
          </h1>
        </div>

        <div className="w-full">
          <div className="readability-panel-dark rounded-[1.45rem] p-5 border border-white/10 backdrop-blur-md bg-black/40">
            <p className="eyebrow text-white/70">{copy.hero.cardEyebrow}</p>
            <p className="mt-2 max-w-[18ch] text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-white">
              {copy.hero.cardTitle}
            </p>
            <p className="mt-2 max-w-[32ch] text-[0.92rem] leading-6 text-white/80">
              {copy.hero.cardBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const saveData = useDataSaver();
  const [introVisible, setIntroVisible] = useState(!prefersReducedMotion && !isMobile);
  const [mobileVideoArmed, setMobileVideoArmed] = useState(
    !isMobile && !prefersReducedMotion,
  );

  useEffect(() => {
    if (prefersReducedMotion || isMobile) {
      setIntroVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setIntroVisible(false), 1350);
    return () => window.clearTimeout(timer);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!isMobile) {
      setMobileVideoArmed(true);
      return;
    }

    if (prefersReducedMotion || saveData) {
      setMobileVideoArmed(false);
      return;
    }

    setMobileVideoArmed(false);

    const enableVideo = () => setMobileVideoArmed(true);
    window.addEventListener("touchstart", enableVideo, { once: true, passive: true });
    window.addEventListener("wheel", enableVideo, { once: true, passive: true });
    window.addEventListener("keydown", enableVideo, { once: true });

    return () => {
      window.removeEventListener("touchstart", enableVideo);
      window.removeEventListener("wheel", enableVideo);
      window.removeEventListener("keydown", enableVideo);
    };
  }, [isMobile, prefersReducedMotion, saveData]);

  if (isMobile) {
    return (
      <section className="theme-dark relative z-20 overflow-visible bg-background">
        <MobileHero
          mobileVideoArmed={mobileVideoArmed}
          prefersReducedMotion={prefersReducedMotion}
        />
      </section>
    );
  }

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
        posterSrc={heroPosterFallback}
        mediaAlt=""
        title="NETSO ENERGY"
        showPosterBeforeReveal={false}
        playVideo
        videoPreload="metadata"
        bgComponent={
          <ResponsiveImage
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
            decoding="async"
            fetchpriority="high"
            width={1920}
            height={1080}
            fallbackSrc={heroBackgroundFallback}
            fallbackSources={heroBackgroundJpegSources}
            loading="eager"
            sizes="100vw"
            sources={heroBackgroundAvifSources}
          />
        }
        initialWidthDesktop={448}
        expandedWidthDesktop={1680}
        initialHeightDesktop={286}
        expandedHeightDesktop={930}
        maxMediaWidth="100vw"
        maxMediaHeight="112vh"
        mediaOverlayOpacity={0.18}
        mediaObjectPosition="center 14%"
        textBlend
        renderOverlay={({ scrollProgress, isMobile: desktopIsMobile, showContent }) => (
          <HeroOverlay
            scrollProgress={scrollProgress}
            isMobile={desktopIsMobile}
            contentVisible={showContent}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      />
    </section>
  );
};
