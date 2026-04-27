'use client';

import { ReactNode, useEffect, useRef } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgComponent?: ReactNode;
  bgImageSrc?: string;
  title?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  onExpanded?: () => void;
  children?: ReactNode;
  renderOverlay?: (progress: MotionValue<number>) => ReactNode;
}

const NetsoScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgComponent,
  bgImageSrc,
  title,
  scrollToExpand,
  textBlend,
  onExpanded,
  children,
  renderOverlay,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const didFireExpanded = useRef(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(prefersReducedMotion ? 1 : scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.22,
  });

  const mediaWidth = useTransform(progress, [0, 1], isMobile ? ["92vw", "102vw"] : ["74vw", "104vw"]);
  const mediaHeight = useTransform(progress, [0, 1], isMobile ? ["82vh", "110vh"] : ["68vh", "116vh"]);
  const mediaRadius = useTransform(progress, [0, 1], ["40px", "0px"]);
  const mediaY = useTransform(progress, [0, 1], isMobile ? ["4vh", "1vh"] : ["10vh", "3vh"]);
  const backgroundOpacity = useTransform(progress, [0, 0.45, 1], [1, 0.42, 0.1]);
  const cueOpacity = useTransform(progress, [0, 0.18, 0.42], [0.92, 0.65, 0]);
  const overlayOpacity = useTransform(progress, [0, 0.88, 1], [1, 1, 0.98]);
  const introOpacity = useTransform(progress, [0, 0.2, 0.48], [1, 0.85, 0]);
  const introY = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const topVignetteOpacity = useTransform(progress, [0, 0.6, 1], [0.34, 0.2, 0.1]);
  const videoY = useTransform(progress, [0, 1], ["0%", "-6%"]);
  const videoScale = useTransform(progress, [0, 1], [1.08, 1]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (value) => {
      if (value >= 0.82 && !didFireExpanded.current) {
        didFireExpanded.current = true;
        window.dispatchEvent(new CustomEvent("netso:hero-revealed"));
        onExpanded?.();
      }

      if (value < 0.72 && didFireExpanded.current) {
        window.dispatchEvent(new CustomEvent("netso:hero-collapsed"));
      }
    });

    return unsubscribe;
  }, [onExpanded, progress]);

  const titleParts = title ? title.split(" ") : [];
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");

  return (
    <div ref={sectionRef} className="relative h-[190svh] overflow-clip">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: backgroundOpacity }}>
          {bgComponent ? (
            <div className="absolute inset-0 h-full w-full">{bgComponent}</div>
          ) : bgImageSrc ? (
            <img src={bgImageSrc} alt="Background" className="h-full w-full object-cover" />
          ) : null}
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 z-[1] bg-black" style={{ opacity: topVignetteOpacity }} />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <motion.div
            className="absolute inset-0 z-0 mx-auto overflow-hidden will-change-[width,height,border-radius]"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: mediaRadius,
              y: mediaY,
            }}
          >
            <motion.div className="h-full w-full" style={{ y: videoY, scale: videoScale }}>
              {mediaType === "video" ? (
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                  controls={false}
                  disablePictureInPicture
                />
              ) : (
                <img
                  src={mediaSrc || posterSrc}
                  alt={title || "Media content"}
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.18)_0%,rgba(8,10,14,0.34)_56%,rgba(8,10,14,0.72)_100%)]" />
          </motion.div>

          {scrollToExpand ? (
            <motion.div
              className="pointer-events-none absolute bottom-9 left-1/2 z-30 -translate-x-1/2"
              style={{ opacity: cueOpacity }}
            >
              <div className="rounded-full border border-white/10 bg-black/18 px-4 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/62 backdrop-blur-sm">
                {scrollToExpand}
              </div>
            </motion.div>
          ) : null}

          {title ? (
            <motion.div
              className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 ${
                textBlend ? "mix-blend-difference" : ""
              }`}
              style={{ opacity: introOpacity, y: introY }}
            >
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{firstWord}</h2>
              <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">{restOfTitle}</h2>
            </motion.div>
          ) : null}

          <motion.div className="absolute inset-0 z-30" style={{ opacity: overlayOpacity }}>
            <div className="h-full w-full">{renderOverlay ? renderOverlay(progress) : children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NetsoScrollExpandMedia;
