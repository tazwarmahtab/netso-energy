/**
 * Animation System - Centralized presets for consistent, buttery-smooth animations
 * Inspired by Apple-level polish and editorial magazine reveals
 */

// ============================================
// EASING CURVES - Physics-based motion
// ============================================
export const EASING = {
  /** Smooth deceleration for general reveals */
  smooth: "power3.out",
  /** Precision exponential curve for high-fidelity response */
  precision: "expo.out",
  /** Quick response for hover effects */
  magnetic: "power2.out",
  /** Dramatic reveal for text animations */
  reveal: "power4.out",
  /** Cinematic standard for transitions */
  cinematic: "custom.bezier(0.22, 1, 0.36, 1)",
  /** Balanced in-out for transitions */
  snap: "power2.inOut",
  /** Gentle ease for ambient animations */
  ambient: "sine.inOut",
} as const;

// ============================================
// DURATION SCALE - Consistent timing
// ============================================
export const DURATION = {
  /** 0.15s - Hover states, micro-interactions */
  micro: 0.15,
  /** 0.3s - Button clicks, small reveals */
  fast: 0.3,
  /** 0.6s - Section reveals, cards */
  standard: 0.6,
  /** 1.2s - Hero animations, page transitions */
  dramatic: 1.2,
  /** 2.4s - Large scale entrance sequences */
  epic: 2.4,
  /** 8s - Continuous background animations */
  ambient: 8,
} as const;

// ============================================
// STAGGER PATTERNS - Orchestrated reveals
// ============================================
export const STAGGER = {
  /** 0.08s - Per character/word in text */
  text: 0.08,
  /** 0.12s - Between card elements */
  cards: 0.12,
  /** 0.1s - Between text lines */
  lines: 0.1,
  /** 0.15s - Between major sections */
  sections: 0.15,
  /** 0.05s - Rapid character scramble */
  scramble: 0.05,
} as const;

// ============================================
// SCROLL TRIGGER DEFAULTS
// ============================================
export const SCROLL = {
  /** Standard reveal start point */
  revealStart: "top 85%",
  /** Earlier reveal for dramatic effect */
  earlyReveal: "top 90%",
  /** Pin start for immersive sections */
  pinStart: "top top",
  /** Smooth scrub value */
  scrubSmooth: 0.3,
  /** Quick scrub for responsiveness */
  scrubFast: 0.1,
  /** Toggle actions - play once */
  togglePlay: "play none none none",
  /** Toggle actions - play and reverse */
  togglePlayReverse: "play none none reverse",
} as const;

// ============================================
// ANIMATION PRESETS - Ready-to-use configs
// ============================================
export const PRESETS = {
  /** Fade up from below - most common reveal */
  fadeUp: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: DURATION.standard, ease: EASING.smooth },
  },
  /** Fade down from above */
  fadeDown: {
    from: { y: -60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: DURATION.standard, ease: EASING.smooth },
  },
  /** Scale up with fade */
  scaleUp: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: DURATION.standard, ease: EASING.reveal },
  },
  /** Slide in from left */
  slideLeft: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: DURATION.dramatic, ease: EASING.reveal },
  },
  /** Slide in from right */
  slideRight: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: DURATION.dramatic, ease: EASING.reveal },
  },
  /** Text line reveal - each line slides up */
  textReveal: {
    from: { y: "100%", opacity: 0 },
    to: { y: "0%", opacity: 1, duration: DURATION.dramatic, ease: EASING.reveal },
  },
  /** Character reveal */
  characterReveal: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1, duration: DURATION.fast, ease: EASING.magnetic },
  },
  /** Card hover lift */
  cardLift: {
    y: -8,
    scale: 1.02,
    duration: DURATION.micro,
    ease: EASING.magnetic,
  },
  /** Button magnetic pull */
  magneticPull: {
    duration: DURATION.micro,
    ease: EASING.magnetic,
  },
  /** Underline draw effect */
  underlineDraw: {
    from: { scaleX: 0 },
    to: { scaleX: 1, duration: DURATION.fast, ease: EASING.smooth },
  },
} as const;

// ============================================
// PAGE LOAD SEQUENCE
// ============================================
export const PAGE_LOAD_SEQUENCE = {
  /** Header fade in */
  header: { delay: 0, duration: DURATION.standard },
  /** Hero content reveal */
  hero: { delay: 0.3, duration: DURATION.dramatic },
  /** Hero media parallax start */
  heroMedia: { delay: 0.2, duration: DURATION.dramatic },
  /** Scroll indicator pulse */
  scrollIndicator: { delay: 1.5, duration: DURATION.standard },
  /** Total sequence duration */
  total: 2.5,
} as const;

// ============================================
// REDUCED MOTION FALLBACKS
// ============================================
export const REDUCED_MOTION = {
  /** Instant opacity change - no movement */
  instant: { duration: 0.01, opacity: 1 },
  /** Quick fade - minimal motion */
  quickFade: { duration: DURATION.fast, opacity: 1 },
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get GSAP tween config with reduced motion support
 */
export function getTweenConfig(
  preset: keyof typeof PRESETS,
  prefersReducedMotion: boolean,
): Record<string, unknown> {
  if (prefersReducedMotion) {
    return { duration: DURATION.fast, opacity: 1, ease: "none" };
  }
  const presetConfig = PRESETS[preset];
  // Handle presets with {from, to} structure vs direct properties
  if ("to" in presetConfig) {
    return presetConfig.to;
  }
  return presetConfig as Record<string, unknown>;
}

/**
 * Get stagger delay based on element type
 */
export function getStaggerDelay(type: keyof typeof STAGGER): number {
  return STAGGER[type];
}

/**
 * Calculate scroll-linked animation progress
 */
export function calculateScrollProgress(
  scrollY: number,
  elementTop: number,
  elementHeight: number,
  viewportHeight: number,
): number {
  const triggerPoint = viewportHeight * 0.85;
  const start = elementTop - triggerPoint;
  const end = start + elementHeight;
  const progress = (scrollY - start) / (end - start);
  return Math.max(0, Math.min(1, progress));
}

// ============================================
// CSS CUSTOM PROPERTIES FOR ANIMATIONS
// ============================================
export const ANIMATION_CSS = `
  :root {
    --anim-duration-micro: \${DURATION.micro}s;
    --anim-duration-fast: \${DURATION.fast}s;
    --anim-duration-standard: \${DURATION.standard}s;
    --anim-duration-dramatic: \${DURATION.dramatic}s;
    --anim-easing-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --anim-easing-precision: cubic-bezier(0.23, 1, 0.32, 1);
    --anim-easing-magnetic: cubic-bezier(0.33, 1, 0.68, 1);
    --anim-easing-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
