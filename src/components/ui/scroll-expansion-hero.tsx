'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type HeroPhase = 'intro' | 'expand' | 'settle' | 'content-reveal';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  mediaAlt?: string;
  playVideo?: boolean;
  videoPreload?: "auto" | "metadata" | "none";
  videoRevealStart?: number;
  scrubVideoToScroll?: boolean;
  showPosterBeforeReveal?: boolean;
  bgImageSrc?: string;
  bgComponent?: ReactNode;
  initialWidthDesktop?: number;
  expandedWidthDesktop?: number;
  initialHeightDesktop?: number;
  expandedHeightDesktop?: number;
  initialWidthMobile?: number;
  expandedWidthMobile?: number;
  initialHeightMobile?: number;
  expandedHeightMobile?: number;
  maxMediaWidth?: string;
  maxMediaHeight?: string;
  mediaOverlayOpacity?: number;
  mediaObjectPosition?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  cuePosition?: 'media-bottom' | 'viewport-bottom' | 'below-media';
  mobileSectionHeight?: string;
  desktopSectionHeight?: string;
  renderOverlay?: (state: {
    scrollProgress: number;
    mediaFullyExpanded: boolean;
    showContent: boolean;
    isMobile: boolean;
    phase: HeroPhase;
  }) => ReactNode;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  mediaAlt,
  playVideo = true,
  videoPreload = "metadata",
  videoRevealStart = 0,
  scrubVideoToScroll = false,
  showPosterBeforeReveal = true,
  bgImageSrc,
  bgComponent,
  initialWidthDesktop = 300,
  expandedWidthDesktop = 1550,
  initialHeightDesktop = 400,
  expandedHeightDesktop = 800,
  initialWidthMobile = 300,
  expandedWidthMobile = 950,
  initialHeightMobile = 400,
  expandedHeightMobile = 600,
  maxMediaWidth = '95vw',
  maxMediaHeight = '85vh',
  mediaOverlayOpacity = 0.3,
  mediaObjectPosition = 'center center',
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  cuePosition = 'media-bottom',
  mobileSectionHeight = "210svh",
  desktopSectionHeight = "220svh",
  renderOverlay,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const progressRef = useRef(prefersReducedMotion ? 1 : 0);
  const [scrollProgress, setScrollProgress] = useState<number>(
    prefersReducedMotion ? 1 : 0,
  );
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const reset = () => {
      const nextProgress = prefersReducedMotion ? 1 : 0;
      progressRef.current = nextProgress;
      setScrollProgress(nextProgress);
      ScrollTrigger.refresh();
    };

    reset();
    window.addEventListener('resetSection', reset);

    return () => window.removeEventListener('resetSection', reset);
  }, [mediaType, prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return;

    if (prefersReducedMotion) {
      progressRef.current = 1;
      setScrollProgress(1);
      return;
    }

    // Unified 3-act windows shared with the render math below:
    // Act 1 expansion (0-0.38) → Act 2 video scrub + text settle (0.35-0.82)
    // → Act 3 locked hold (0.82-1.0). Trigger must emit on the same curve
    // the scrub and overlay math consume, or frames drift and jump.
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: isMobileState ? 0.34 : 0.2,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextProgress = Number(self.progress.toFixed(2));
        if (nextProgress !== progressRef.current) {
          progressRef.current = nextProgress;
          setScrollProgress(nextProgress);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobileState, mediaType, prefersReducedMotion]);

  // Unified 3-act windows — the single source of truth consumed by the
  // ScrollTrigger onUpdate above, the video scrub seek, and the overlay math.
  // Expansion (0-0.38) → video scrub + text settle (0.35-0.82) → locked hold.
  const actBreak1 = 0.38;
  const actScrubEnd = 0.82;

  const introEnd = 0;
  const expandEnd = actBreak1;
  const revealStart = 0.38;
  const revealSpan = 0.44;

  const phase = useMemo<HeroPhase>(() => {
    if (prefersReducedMotion || scrollProgress >= 0.82) return 'content-reveal';
    if (scrollProgress >= expandEnd) return 'settle';
    if (scrollProgress >= introEnd) return 'expand';
    return 'intro';
  }, [expandEnd, introEnd, prefersReducedMotion]);

  const expandProgress = easeOutCubic(clamp(scrollProgress / actBreak1));
  const scrubProgress = easeOutCubic(clamp((scrollProgress - 0.35) / (actScrubEnd - 0.35)));
  const settleProgress = scrubProgress;
  const revealProgress = easeOutCubic(clamp((scrollProgress - revealStart) / revealSpan));
  const composedExpand = expandProgress;

  const expandedWidth = isMobileState ? expandedWidthMobile : expandedWidthDesktop;
  const expandedHeight = isMobileState ? expandedHeightMobile : expandedHeightDesktop;
  const initialWidth = isMobileState ? initialWidthMobile : initialWidthDesktop;
  const initialHeight = isMobileState ? initialHeightMobile : initialHeightDesktop;

  const scaleX = mix(initialWidth / expandedWidth, 1, composedExpand);
  const scaleY = mix(initialHeight / expandedHeight, 1, composedExpand);
  const mediaScale = mix(1.02, 1, settleProgress);
  // Terminal Y-offset must be 0 so the expanded viewport sits flush with the sticky frame.
  const mediaY = mix(isMobileState ? 4 : 6, 0, composedExpand);
  const videoY = mix(0, isMobileState ? -2 : -5, composedExpand);
  const backgroundOpacity = mix(1, 0.24, clamp((scrollProgress - 0.08) / 0.68));
  const backgroundScale = mix(1, 1.03, clamp(scrollProgress / 0.78));
  const cueOpacity = prefersReducedMotion
    ? 0
    : 1 - clamp((scrollProgress - (isMobileState ? 0.12 : 0.18)) / (isMobileState ? 0.14 : 0.16));
  const cueY = mix(0, 18, clamp((scrollProgress - (isMobileState ? 0.1 : 0.16)) / (isMobileState ? 0.16 : 0.18)));
  const videoRevealProgress = prefersReducedMotion
    ? 1
    : videoRevealStart <= 0
      ? 1
      : clamp((scrollProgress - videoRevealStart) / (isMobileState ? 0.16 : 0.12));
  const mediaEntryProgress = prefersReducedMotion
    ? 1
    : videoRevealStart <= 0
      ? 1
      : easeOutCubic(clamp((scrollProgress - videoRevealStart) / (isMobileState ? 0.22 : 0.16)));
  // Act 1 (0-0.35): NETSO ENERGY wordmark drifts apart while video expands.
  const titleRevealProgress = easeOutCubic(clamp(scrollProgress / actBreak1));
  const titleOpacity = prefersReducedMotion
    ? 0
    : 1 - clamp((scrollProgress - 0.26) / 0.09);
  const titleScale = mix(1, 0.94, titleRevealProgress);
  const titleY = mix(0, isMobileState ? -4 : -2, titleRevealProgress);
  const titleDrift = mix(0, isMobileState ? 18 : 40, titleRevealProgress);
  const titleGap = mix(0.35, isMobileState ? 0.7 : 1.15, titleRevealProgress);
  const mediaLabel = mediaAlt ?? title ?? '';
  const textTranslateX = mix(0, isMobileState ? 16 : 24, composedExpand);
  const cueTop = `calc(50% + ${expandedHeight * scaleY * 0.5}px + ${
    isMobileState ? 18 : 22
  }px + ${cueY}px)`;
  const sectionHeight = prefersReducedMotion
    ? '100svh'
    : isMobileState
      ? mobileSectionHeight
      : desktopSectionHeight;
  const mediaFullyExpanded = prefersReducedMotion || scrollProgress >= expandEnd;
  // Text participates from 0.38 and is fully settled by 0.82 — the final
  // 18% of the pin is a locked hold, never a reveal window.
  const showContent = prefersReducedMotion || scrollProgress >= 0.38;
  const renderStaticPoster =
    mediaType === 'video' &&
    Boolean(posterSrc) &&
    ((showPosterBeforeReveal && videoRevealProgress < 1) || !playVideo);
  const renderVideoLayer =
    mediaType === 'video' &&
    !mediaSrc.includes('youtube.com') &&
    playVideo &&
    (prefersReducedMotion || videoRevealStart <= 0 || videoRevealProgress > 0);
  const mediaOpacity = prefersReducedMotion ? 1 : mediaEntryProgress;
  const mediaEntryLift = videoRevealStart <= 0 ? 0 : mix(isMobileState ? 20 : 26, 0, mediaEntryProgress);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(
      new CustomEvent(showContent ? 'netso:hero-revealed' : 'netso:hero-collapsed'),
    );
  }, [showContent]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !renderVideoLayer || !playVideo) return;

    let cancelled = false;

    const attemptPlay = () => {
      if (cancelled) return;
      video.defaultMuted = true;
      video.muted = true;

      if (scrubVideoToScroll && !prefersReducedMotion) {
        video.pause();
        // Expansion holds frame 0; scrub runs 0.35-0.82 while text settles
        // in parallel; final 18% of scroll is a locked hold on the last frame.
        const videoScrub = clamp((scrollProgress - 0.35) / 0.47);
        if (Number.isFinite(video.duration) && video.duration > 0) {
          try {
            video.currentTime = Math.min(
              Math.max(videoScrub * video.duration, 0),
              Math.max(video.duration - 0.05, 0),
            );
          } catch {
            // Ignore seek errors while metadata is still settling.
          }
        }
        return;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          /* Ignore autoplay rejections; interaction handlers can retry later. */
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
      return () => {
        cancelled = true;
      };
    }

    video.addEventListener('loadedmetadata', attemptPlay);
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);
    video.addEventListener('canplaythrough', attemptPlay);

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', attemptPlay);
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      video.removeEventListener('canplaythrough', attemptPlay);
    };
  }, [playVideo, prefersReducedMotion, renderVideoLayer, mediaSrc, scrubVideoToScroll, scrollProgress]);

  const titleWords = title?.trim().split(/\s+/).filter(Boolean) ?? [];
  const firstWord = titleWords[0] ?? '';
  const restOfTitle = titleWords.slice(1).join(' ');
  // Exit choreography: in the final 8% of scroll, the full-bleed video lifts
  // and scales gently while the next section slides over it, creating a
  // continuous cinematic handoff instead of a hard seam cut.
  const exitProgress = easeOutCubic(clamp((scrollProgress - 0.92) / 0.08));
  const exitLift = exitProgress * -6;
  const exitScale = 1 + exitProgress * 0.04;
  const exitDim = 1 - exitProgress * 0.28;

  return (
    <div
      ref={sectionRef}
      className="relative overflow-clip bg-[#0a0906] transition-colors duration-700 ease-in-out"
      style={{ height: sectionHeight }}
    >
      <section className="sticky top-0 flex h-[100svh] flex-col items-center justify-start overflow-clip bg-[#0a0906]">
        <div className="relative flex h-full w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: backgroundOpacity }}
            transition={{ duration: 0.18 }}
            style={{ scale: backgroundScale }}
          >
            {bgComponent ? (
              <div className="h-full w-full">{bgComponent}</div>
            ) : bgImageSrc ? (
              <img
                src={bgImageSrc}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center"
              />
            ) : null}
          </motion.div>

          <div className="container relative z-10 mx-auto h-full">
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.26)]"
                style={{
                  width: `${expandedWidth}px`,
                  height: `${expandedHeight}px`,
                  maxWidth: maxMediaWidth,
                  maxHeight: maxMediaHeight,
                  opacity: mediaOpacity * exitDim,
                  borderRadius: `${26 * (1 - composedExpand)}px`,
                  transform: `translate(-50%, -50%) translate3d(0, calc(${mediaY + exitLift}vh + ${mediaEntryLift}vh), 0) scale(${scaleX * exitScale}, ${scaleY * exitScale})`,
                  transformOrigin: 'center center',
                  willChange: 'transform, border-radius',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className="pointer-events-none relative h-full w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? `${mediaSrc}${
                                mediaSrc.includes('?') ? '&' : '?'
                              }autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1`
                            : `${mediaSrc.replace(
                                'watch?v=',
                                'embed/',
                              )}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${
                                mediaSrc.split('v=')[1]
                              }`
                        }
                        className="h-full w-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="pointer-events-none absolute inset-0 z-10" />
                    </div>
                  ) : (
                    <div className="pointer-events-none relative h-full w-full">
                      {prefersReducedMotion && posterSrc ? (
                        <img
                          src={posterSrc}
                          alt={mediaLabel}
                          aria-hidden={mediaLabel ? undefined : 'true'}
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition: mediaObjectPosition,
                            transform: `translate3d(0, ${videoY}%, 0) scale(${mediaScale})`,
                            transformOrigin: 'center top',
                          }}
                        />
                      ) : (
                        <>
                          {renderStaticPoster ? (
                            <img
                              src={posterSrc}
                              alt={mediaLabel}
                              aria-hidden={mediaLabel ? undefined : 'true'}
                              className="absolute inset-0 h-full w-full object-cover"
                              style={{
                                objectPosition: mediaObjectPosition,
                                transform: `translate3d(0, ${videoY}%, 0) scale(${mediaScale})`,
                                transformOrigin: 'center top',
                                opacity: 1 - videoRevealProgress * 0.92,
                              }}
                            />
                          ) : null}
                          {renderVideoLayer ? (
                            <video
                              ref={videoRef}
                              src={mediaSrc}
                              poster={posterSrc}
                              autoPlay={playVideo}
                              muted
                              loop
                              playsInline
                              preload={videoPreload}
                              className="absolute inset-0 h-full w-full object-cover [&::-webkit-media-controls]:!hidden"
                              aria-hidden={mediaLabel ? undefined : "true"}
                              onClick={(event) => {
                                event.preventDefault();
                                event.currentTarget.play().catch(() => {});
                              }}
                              style={{
                                objectPosition: mediaObjectPosition,
                                transform: `translate3d(0, ${videoY}%, 0) scale(${mediaScale})`,
                                transformOrigin: 'center top',
                                opacity: posterSrc ? videoRevealProgress : 1,
                              }}
                              controls={false}
                              controlsList="nodownload noplaybackrate noremoteplayback"
                              disablePictureInPicture
                              disableRemotePlayback
                              x-webkit-airplay="deny"
                            />
                          ) : null}
                        </>
                      )}
                      <div className="pointer-events-none absolute inset-0 z-10" />
                    </div>
                  )
                ) : (
                  <img
                    src={mediaSrc}
                    alt={mediaLabel || 'Media content'}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: mediaObjectPosition,
                      transform: `translate3d(0, ${videoY}%, 0) scale(${mediaScale})`,
                      transformOrigin: 'center top',
                    }}
                  />
                )}

                {mediaOverlayOpacity > 0 ? (
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ opacity: mediaOverlayOpacity }}
                    animate={{
                      opacity: mix(
                        mediaOverlayOpacity,
                        mediaOverlayOpacity * 0.12,
                        composedExpand,
                      ),
                    }}
                    transition={{ duration: 0.18 }}
                  />
                ) : null}
              </div>

              {(date || scrollToExpand) && cuePosition === 'below-media' ? (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 z-20 flex justify-center"
                  style={{ top: cueTop }}
                  initial={false}
                  animate={{
                    opacity: cueOpacity,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col items-center text-center">
                    {date ? (
                      <p
                        className="text-2xl text-blue-200"
                        style={{ transform: `translateX(-${textTranslateX}vw)` }}
                      >
                        {date}
                      </p>
                    ) : null}
                    {scrollToExpand ? (
                      <p className="rounded-full border border-white/10 bg-black/18 px-4 py-3 text-center text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/62 backdrop-blur-sm">
                        {scrollToExpand}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}

              {(date || scrollToExpand) && cuePosition !== 'below-media' ? (
                <motion.div
                  className={`relative z-10 flex flex-col items-center text-center transition-none ${
                    cuePosition === 'viewport-bottom'
                      ? 'pointer-events-none fixed bottom-10 left-1/2 mt-0 -translate-x-1/2'
                      : 'mt-4'
                  }`}
                  initial={false}
                  animate={{
                    opacity: cueOpacity,
                    y: cuePosition === 'viewport-bottom' ? cueY : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {date ? (
                    <p
                      className="text-2xl text-blue-200"
                      style={{
                        transform:
                          cuePosition === 'viewport-bottom'
                            ? undefined
                            : `translateX(-${textTranslateX}vw)`,
                      }}
                    >
                      {date}
                    </p>
                  ) : null}
                  {scrollToExpand ? (
                    <p
                      className={`text-center font-medium text-blue-200 ${
                        cuePosition === 'viewport-bottom'
                          ? 'rounded-full border border-white/10 bg-black/18 px-4 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/62 backdrop-blur-sm'
                          : ''
                      }`}
                      style={{
                        transform:
                          cuePosition === 'viewport-bottom'
                            ? undefined
                            : `translateX(${textTranslateX}vw)`,
                      }}
                    >
                      {scrollToExpand}
                    </p>
                  ) : null}
                </motion.div>
              ) : null}

              {title ? (
                <motion.div
                  className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 ${
                    textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
                  initial={false}
                  animate={{ opacity: titleOpacity }}
                  transition={{ duration: 0.2 }}
                  style={{
                    transform: `translate3d(0, ${titleY}vh, 0) scale(${titleScale})`,
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="flex items-center justify-center whitespace-nowrap font-display leading-[0.88] tracking-[-0.08em] text-white drop-shadow-[0_14px_32px_rgba(0,0,0,0.34)]"
                    style={{
                      gap: `${titleGap}rem`,
                      fontSize: isMobileState
                        ? 'clamp(2.45rem, 12vw, 4rem)'
                        : 'clamp(4.2rem, 9vw, 8.25rem)',
                    }}
                  >
                    <span
                      style={{
                        transform: `translate3d(-${titleDrift}vw, 0, 0)`,
                      }}
                    >
                      {firstWord}
                    </span>
                    {restOfTitle ? (
                      <span
                        style={{
                          transform: `translate3d(${titleDrift}vw, 0, 0)`,
                        }}
                      >
                        {restOfTitle}
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}

              {renderOverlay ? (
                <motion.div
                  className="absolute inset-0 z-10 h-full w-full"
                  initial={false}
                  animate={{
                    opacity: 1 - exitProgress * 0.85,
                    y: `${exitProgress * -4}vh`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {renderOverlay({
                    scrollProgress,
                    mediaFullyExpanded,
                    showContent,
                    isMobile: isMobileState,
                    phase,
                  })}
                </motion.div>
              ) : null}

              {/* Cinematic bottom veil: bridges the dark hero into the light section
                  so the handoff reads as a gradient dissolve, not a seam cut. */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22vh]"
                aria-hidden="true"
                initial={false}
                animate={{ opacity: exitProgress }}
                transition={{ duration: 0.2 }}
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(10,9,6,0.55) 45%, var(--background) 100%)",
                }}
              />

              {/* First-viewport scroll invitation: visible only before the
                  expansion begins, so users never meet a wordmark-only frame. */}
              <motion.button
                type="button"
                aria-label={scrollToExpand || "Scroll to reveal"}
                onClick={() => {
                  const node = sectionRef.current;
                  if (!node || typeof window === "undefined") return;
                  const target = node.offsetTop + window.innerHeight * 0.6;
                  window.scrollTo({
                    top: target,
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                  });
                }}
                className="absolute bottom-6 left-1/2 z-30 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
                initial={false}
                animate={{
                  opacity: prefersReducedMotion ? 0 : 1 - clamp(scrollProgress / 0.12),
                  y: prefersReducedMotion ? 8 : clamp(scrollProgress / 0.12) * 12,
                }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: scrollProgress > 0.12 ? "none" : "auto" }}
              >
                <span className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] backdrop-blur-md">
                  {scrollToExpand || "Scroll to reveal"}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </div>

            {!renderOverlay ? (
              <motion.section
                className="flex w-full flex-col px-8 py-10 md:px-16 lg:py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
