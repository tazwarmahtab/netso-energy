---
name: NETSO ENERGY
description: Rooftop energy infrastructure for Bangladesh — Solar Pergola platform
colors:
  # Brand anchors
  accent: "#c8b2ff"               # Primary purple/lavender accent
  accent-glow: "#e0d4ff"          # Lighter purple glow
  accent-foreground: "#fcfcfc"    # Text on accent
  danger: "#f66f00"               # Orange for destructive actions
  warning: "#0a0804"              # Near-black for warnings
  info: "#321f61"                 # Deep purple for info

  # Light theme surfaces
  background: "#fcfcfc"           # Page ground (near-white, warm)
  surface: "#ffffff"              # Cards, panels, modals
  foreground: "#1a1a1a"           # Primary text
  text-muted: "#6b7280"           # Secondary text
  border: "rgba(0, 0, 0, 0.08)"   # Default borders
  input: "rgba(0, 0, 0, 0.04)"    # Input backgrounds
  ring: "#c8b2ff"                 # Focus rings

  # Navigation (light)
  nav-surface: "rgba(255, 255, 255, 0.66)"
  nav-surface-strong: "rgba(255, 255, 255, 0.86)"
  nav-expanded: "rgba(255, 255, 255, 0.9)"
  nav-border-strong: "rgba(0, 0, 0, 0.11)"
  nav-segment: "rgba(0, 0, 0, 0.04)"
  nav-brand: "rgba(0, 0, 0, 0.045)"
  nav-pill: "rgba(0, 0, 0, 0.05)"
  nav-pill-strong: "rgba(0, 0, 0, 0.08)"
  nav-dropdown: "rgba(255, 255, 255, 0.9)"
  nav-dropdown-muted: "rgba(0, 0, 0, 0.045)"
  nav-mobile: "rgba(255, 255, 255, 0.95)"
  nav-cta-bg: "#f1f1ee"              # Nav CTA button (intentional)
  warm-shadow-08: "rgba(38, 25, 15, 0.08)"  # Warm shadow tint
  warm-shadow-14: "rgba(38, 23, 8, 0.14)"   # Warm shadow tint
  tailwind-gray-100: "#f3f4f6"       # Tailwind neutrals (shadcn UI)
  tailwind-gray-200: "#e5e7eb"
  tailwind-gray-400: "#9ca3af"
  tailwind-red-600: "#dc2626"

  # Dark theme (available via .theme-dark, not default)
  dark-background: "#1c1c1c"
  dark-surface: "#111111"
  dark-foreground: "#ffffff"
  dark-border: "rgba(255, 255, 255, 0.08)"
  dark-text-muted: "#514e4a"

  # Chart colors
  chart-1: "#c8b2ff"
  chart-2: "#bed5ff"
  chart-3: "#8ed5ff"
  chart-4: "#fccc3c"
  chart-5: "#e8e8e4"

typography:
  scale:
    # 4px base grid, Satoshi as primary
    "display-2xl": "clamp(3.5rem, 9vw, 8.5rem)"
    "display-xl": "clamp(2.75rem, 7vw, 6.5rem)"
    "display-lg": "clamp(2.25rem, 5.5vw, 4.5rem)"
    "display-md": "clamp(1.75rem, 3.5vw, 2.75rem)"
    "display-text": "clamp(2.75rem, 6vw, 6rem)"
    "title": "1.18rem"
    "body": "1rem"
    "eyebrow": "0.72rem"
    "mono-label": "0.72rem"
    # Intentional one-offs used in components
    "nav-pill": "0.78rem"
    "nav-trigger": "0.8rem"
    "mobile-card-body": "0.92rem"
    "mobile-hero-card": "0.92rem"
    "hero-body-desktop": "0.9rem"
    "hero-card-title-desktop": "1.45rem"
    "hero-card-body-desktop": "0.88rem"
    "hero-card-body-mobile": "0.92rem"
    "problem-image-body": "2rem"
    "product-card-title": "1.4rem"
    "product-card-label": "0.8rem"
    "product-card-meta": "0.68rem"
    "feature-spotlight": "10px"
    "calendar": "0.8rem"
    "motion-footer": "10px"
    # Fluid display endpoints
    "display-2xl-min": "3.5rem"
    "display-2xl-max": "8.5rem"
    "display-xl-min": "2.75rem"
    "display-xl-max": "6.5rem"
    "display-lg-min": "2.25rem"
    "display-lg-max": "4.5rem"
    "display-md-min": "1.75rem"
    "display-md-max": "2.75rem"
    "display-text-min": "2.75rem"
    "display-text-max": "6rem"
    "display-mobile-min": "2.75rem"
    "display-mobile-max": "4.3rem"
    "headline": "1.125rem"
    "subhead": "1.25rem"
    "section-head": "1.5rem"
    "section-head-fluid-min": "1.55rem"
    "section-head-fluid-max": "2.05rem"
    "display-fluid-min": "1.75rem"
    "display-fluid-max": "2.75rem"
    "display-lg-fluid-min": "3.75rem"
    "display-lg-fluid-max": "4.5rem"
    "display-xl-fluid-min": "4.5rem"
    "display-xl-fluid-max": "6rem"
    # Additional one-offs from components
    "feasibility-success-title": "1.35rem"
    "hero-title-mobile": "1.875rem"
    "hero-title-desktop": "3rem"
  fontFamilies:
    sans: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    display: "Satoshi, Georgia, serif"
    editorial: "Playfair Display, Georgia, serif"
    mono: "Satoshi Mono, ui-monospace, monospace"
  weights:
    display: 700
    headline: 700
    title: 500
    body: 400
    eyebrow: 500
    mono: 500
  letterSpacing:
    display: "-0.05em"
    headline: "-0.045em"
    title: "-0.035em"
    eyebrow: "0.18em"
    mono: "0.22em"
  lineHeights:
    display: 0.9
    headline: 0.92
    title: 1.08
    body: 1.8
    eyebrow: 1

rounded:
  none: "0"
  xs: "2px"
  sm: "4px"
  control-sm: "5px"
  md: "6px"
  control-md: "7px"
  lg: "8px"
  xl: "10px"
  "2xl": "12px"
  "3xl": "14px"
  "4xl": "16px"
  pill: "9999px"
  # Intentional one-offs for signature components
  "readability-panel-mobile": "1.2rem"
  "readability-panel-desktop": "1.45rem"
  "readability-panel-lg": "1.5rem"
  "transformation-card": "1.6rem"
  "product-card": "1.7rem"
  "problem-card": "1.75rem"
  "trust-card": "1.8rem"
  "mission-card": "1.9rem"
  "dropdown-panel": "22px"
  "modal-card": "24px"
  "hero-overlay-card": "26px"
  "hero-card-desktop": "28px"
  "large-modal": "2rem"
  "fullscreen-sheet": "32px"

spacing:
  # 4px base grid
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  9: "36px"
  10: "40px"
  15: "60px"
  16: "64px"
  25: "100px"
  31: "124px"
  45: "180px"

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    typography: "{typography.title}"
    rounded: "{rounded.xs}"
    padding: "0 38px"
  button-primary-hover:
    backgroundColor: "{colors.accent-glow}"
    textColor: "{colors.accent-foreground}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    borderColor: "{colors.accent}"
    rounded: "{rounded.xs}"
    padding: "0 38px"
  input-text:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    padding: "24px"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.accent}"
  nav-shell:
    backgroundColor: "{colors.nav-surface}"
    borderColor: "{colors.nav-border-strong}"
  nav-pill:
    backgroundColor: "{colors.nav-pill}"
    borderColor: "rgba(0, 0, 0, 0.07)"
---

# Design System: NETSO ENERGY

## Overview

**Creative North Star: "The Rooftop Layer"**

NETSO Energy's design system embodies the quiet confidence of infrastructure that becomes architecture. It is light, spacious, and engineered — reflecting a product that turns idle concrete into productive energy assets. The palette is warm near-white grounds with a precise purple/lavender accent that signals energy without screaming "solar." Typography leads with Satoshi (geometric, technical, human) and reserves Playfair Display for editorial hero moments only. Motion is purposeful: scroll-driven reveals, magnetic easing, respect for reduced motion. Every element earns its place; nothing decorative without function.

**Key Characteristics:**
- Warm light ground (`#fcfcfc`), never sterile white
- Single purple accent (`#c8b2ff`) — energy signal, not decoration
- Satoshi as the voice: technical but human, geometric but warm
- Playfair Display only for hero headlines — editorial, high-contrast
- Glass/backdrop-filter navigation — precise, layered, functional
- Generous spacing on a 4px grid — breathing room as default
- Scroll-triggered reveals with cubic-bezier(0.22, 1, 0.36, 1) — cinematic ease
- `prefers-reduced-motion` respected everywhere — accessibility as invariant

## Colors

A restrained palette: one brand accent, a full neutral ramp, semantic state colors. The accent carries the brand; neutrals carry the content.

### Primary
- **Purple Accent** (`#c8b2ff`): CTAs, active states, focus rings, key highlights, hero card eyebrow. The single brand color — used deliberately, never as decoration.
- **Accent Glow** (`#e0d4ff`): Hover lift on primary buttons, subtle fills.

### State
- **Danger Orange** (`#f66f00`): Destructive actions, errors, critical warnings.
- **Warning Near-Black** (`#0a0804`): High-emphasis warnings (rare).
- **Info Deep Purple** (`#321f61`): Informational states, secondary emphasis.

### Neutral Ramp (Light Theme)
- **Background** (`#fcfcfc`): Page ground — warm near-white, tinted not neutral.
- **Surface** (`#ffffff`): Cards, panels, modals — pure white for contrast.
- **Foreground** (`#1a1a1a`): Primary text — near-black, warm.
- **Text Muted** (`#6b7280`): Secondary text, captions, metadata.
- **Border** (`rgba(0, 0, 0, 0.08)`): Default dividers, card strokes.
- **Input** (`rgba(0, 0, 0, 0.04)`): Form field backgrounds.
- **Ring** (`#c8b2ff`): Focus indicators — always the accent.

### Navigation Layer (Light)
Glassmorphism with purpose: backdrop blur, subtle borders, layered opacity steps.
- Surface: `rgba(255,255,255,0.66)` → Strong: `rgba(255,255,255,0.86)` → Expanded: `rgba(255,255,255,0.9)`
- Borders: `rgba(0,0,0,0.11)` (strong), `rgba(0,0,0,0.04)` (segment), `rgba(0,0,0,0.045)` (brand)
- Pills: `rgba(0,0,0,0.05)` → Strong: `rgba(0,0,0,0.08)`
- Dropdowns: `rgba(255,255,255,0.9)` with `rgba(0,0,0,0.09)` border, 22px blur

### Dark Theme (Available, Not Default)
- **Background** (`#1c1c1c`), **Surface** (`#111111`), **Foreground** (`#ffffff`)
- Borders: `rgba(255,255,255,0.08)`, Text Muted: `#514e4a`
- Activated via `.theme-dark` class; not the default experience.

### Named Rules
**The One Voice Rule.** The purple accent (`#c8b2ff`) is the only brand color. It appears on ≤10% of any screen. Its rarity is the signal.

**The Accent-on-Light Rule.** Purple only works on light/neutral grounds. On dark surfaces, it shifts to a lighter tint or is replaced by a dedicated dark-mode accent (not yet defined — dark theme is secondary).

**The Semantic State Rule.** Orange (`#f66f00`) = destructive/error only. Deep purple (`#321f61`) = info only. Near-black (`#0a0804`) = critical warning only. No color carries double duty.

## Typography

**Display Font:** Satoshi (weights 900–300), Georgia fallback — geometric, technical, warm. Used for all headings and display text.
**Editorial Font:** Playfair Display (weights 400–900), Georgia fallback — high-contrast serif. **Only for hero h1.** Never for UI, body, or section titles.
**Body/UI Font:** Satoshi (400/500) — same family as display, different weight role.
**Mono Font:** Satoshi Mono (500) — tight, technical labels, data.

### Hierarchy
- **Display 2XL** (700, `clamp(3.5rem, 9vw, 8.5rem)`, 0.9, -0.05em): Hero h1 — the page's thesis.
- **Display XL** (700, `clamp(2.75rem, 7vw, 6.5rem)`, 0.92, -0.045em): Major section headlines.
- **Display LG** (700, `clamp(2.25rem, 5.5vw, 4.5rem)`, 0.95, -0.04em): Section headlines.
- **Display MD** (700, `clamp(1.75rem, 3.5vw, 2.75rem)`, 1.0, -0.035em): Subsection headlines.
- **Title** (500, 1.18rem, 1.35, -0.035em): Component titles, card headings, panel labels.
- **Body** (400, 1rem, 1.8): Long-form copy — max 65–75ch, generous leading.
- **Eyebrow** (500, 0.72rem, 1.0, 0.18em, uppercase): Section/category markers above headlines.
- **Mono Label** (500, 0.72rem, 0.22em): Data labels, specs, technical metadata.

### Named Rules
**The Two-Face Rule.** Satoshi carries everything except the hero h1, which gets Playfair Display. The serif is an editorial moment — one per page, maximum. Do not use Playfair for section titles, cards, or UI.

**The Weight-Inversion Rule.** Display sizes use weight 700 (bold) — not the thin weights common in AI-generated UIs. The hero is bold so the page can breathe; thin display cuts read as timid, not elegant.

**Tracked Labels Are Short Rule.** Uppercase tracked eyebrows and mono labels are for short system markers (≤3 words). Never write sentences in tracked caps.

**Dark Type Needs Air Rule.** Body text on light ground uses 1.8 line-height and 65–75ch measure. On dark ground (if used), line-height relaxes to 1.65.

## Layout

**Grid:** 12-column implicit grid via CSS Grid (`lg:grid-cols-12`, `lg:gap-24` / `gap-8`). Container max-width: 1180px (`container-tight`: `min(100% - 2rem, 1180px)`).
**Spacing Rhythm:** 4px base unit. Scale: 4, 8, 12, 16, 24, 32, 36, 40, 60, 64, 100, 124, 180px. Section vertical padding: `py-20 md:py-56` (80px → 224px).
**Density:** Generous by default. Cards use `p-6 md:p-8` (24px → 32px). Form fields: `py-3 px-4` (12px/16px).
**Responsive:** Mobile-first Tailwind breakpoints (`sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1400px`). Hero and calculator sections have custom min-heights per breakpoint via `LazySection` component.
**Scroll Behavior:** Lenis smooth scroll (opt-in via `html.lenis`). `scroll-margin-top: 8rem` on all `[id]` anchors for sticky header offset.

### Named Rules
**The Container Rule.** All page content lives in `container-tight` (1180px max, 2rem side padding). No full-bleed content except hero media and explicit full-width bands.

**The Section Rhythm Rule.** Sections alternate: light band → dark band (via `SectionFadeTransition`) → light band. Dark bands use `.theme-dark` with `bg-background` (`#1c1c1c`). Transitions are 1px hairline borders (`border-y border-border/60`).

**The Lazy-Load Rule.** Heavy sections (Problem, System, Calculator, etc.) are lazy-loaded via `LazySection` with `eagerOnIdle`, explicit `minHeight`/`mobileMinHeight` to prevent layout shift, and `preload` of the next section.

## Elevation & Depth

**Philosophy:** Flat by default. Depth comes from material contrast (surface vs. background), hairline borders, subtle inset shadows, and glassmorphism — not large drop shadows.

### Shadow Vocabulary
- **Panel Setback** (`0 24px 80px rgba(38, 25, 15, 0.08)`): Large framed modules only (readability panels, hero cards).
- **Card Lift** (`0 20px 60px rgba(38, 25, 15, 0.05)`): `.ivory-surface` — subtle, warm-tinted elevation.
- **Nav Shadow** (`inset 0 1px 0 rgba(0,0,0,0.06)` + `0 18px 42px rgba(0,0,0,0.08)`): Backdrop-blur navigation — inset highlight + diffuse drop.
- **Dropdown Shadow** (`0 18px 42px rgba(0,0,0,0.08)` + inset): Menus, mobile panels.
- **Accent Glow** (`0 14px 34px rgba(200, 178, 255, 0.18)`): `.shadow-sun` — only on primary CTAs and accent elements.
- **No Default Card Shadow.** Cards rest on borders (`1px solid var(--border)`) and background shifts.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as response to state (hover, elevation, focus) or on explicit branded modules (hero card, readability panel).

**The Hairline-First Rule.** Use 1px borders (`var(--border)`) before adding shadow. Borders define structure; shadows emphasize.

**The Warm Shadow Rule.** All elevation shadows use a warm tint (`rgba(38, 25, 15, ...)` — derived from the brand's amber undertone), never neutral gray or blue.

## Shapes

**Corner Language:** Small, precise radii. Default `--radius: 0.5rem` (8px). Scale: 2px → 4px → 5px → 6px → 7px → 8px → 10px → 12px → 14px → 16px → pill (9999px).
- **Buttons/Inputs:** 2px (`rounded-xs`) — crisp, technical.
- **Cards/Panels:** 4px (`rounded-sm`) / 6px (`rounded-md`) — approachable but not soft.
- **Hero Cards/Readability Panels:** 28px (`rounded-[28px]`) / 1.45rem (`rounded-[1.45rem]`) — architectural, distinctive.
- **Pills:** 9999px — tags, badges, toggle tracks.

**Borders:** 1px default (`var(--border)`). Strong borders: `var(--nav-border-strong)` (rgba 0.11). No thick accent borders (the "side-tab" anti-pattern is explicitly banned).

**Glass/Backdrop:** Navigation and dropdowns use `backdrop-filter: blur(18px–22px)` with semi-transparent white. Not decorative — functional for legibility over varied backgrounds.

### Named Rules
**The Crisp-Corner Rule.** Radii ≤8px for UI chrome. Large radii (≥24px) reserved for signature architectural moments (hero card, readability panel) that echo the Solar Pergola's structural geometry.

**The No-Side-Tab Rule.** Thick colored borders on one side of a card are banned. Use a subtle accent line, a hairline rule, or remove entirely.

## Components

### Buttons
- **Primary:** Accent fill (`#c8b2ff`), dark text, 2px radius, min-height 58px, horizontal padding 38px. Hover → accent glow (`#e0d4ff`). Focus → accent ring (2px, 2px offset).
- **Secondary:** Transparent, accent text, accent border (strong), 2px radius, 38px padding. Hover → pill background (`var(--nav-pill-strong)`).
- **Ghost:** Text-only, accent color. Hover → pill background.
- **Nav CTA:** Light gray (`#f1f1ee`), dark text — distinct from primary/secondary.
- **Ripple:** Active press shows expanding circle animation (`.animate-ripple`).

### Inputs / Fields
- **Text/Select:** Input background (`rgba(0,0,0,0.04)`), 4px radius, 14px/16px padding, border `var(--border)`.
- **Focus:** 2px accent ring, 2px offset, background → input color.
- **Error:** Destructive orange border (`#f66f00`).
- **Range Slider (Calculator):** Custom styled — 4.5px track, 1.1rem thumb, accent fill with progress gradient, accent border on thumb.

### Cards / Containers
- **Default Card (`.glass-card`):** White surface, 8px radius, `var(--border)` stroke.
- **Ivory Panel (`.ivory-panel`):** 96% surface opacity, warm shadow (`rgba(38,25,15,0.08)`), 32px radius — content-heavy sections.
- **Ivory Surface (`.ivory-surface`):** 92% secondary opacity, lighter warm shadow, 24px radius — lighter panels.
- **Readability Panel Dark (`.readability-panel-dark`):** Radial gradient (accent 12% at top) + linear gradient (white 74%→42%), 2.5rem radius, strong shadow — hero overlay cards.
- **Readability Panel Light (`.readability-panel-light`):** Same gradients, lighter shadow — light-band cards.

### Navigation
- **Desktop:** Glass shell (`nav-shell`), pill triggers (`nav-pill`), dropdown panels (22px blur, `rgba(0,0,0,0.09)` border).
- **Mobile:** Sheet panel (`nav-mobile`), row triggers, same glass treatment.
- **Brand Lockup:** `nav-brand` background, subtle border.
- **Active State:** `nav-pill-strong` background, foreground text color.
- **CTA in Nav:** Gray fill (`#f1f1ee`), dark text — visually distinct from primary actions.

### Signature Components
- **LazySection:** Wrapper for lazy-loaded sections with `minHeight`/`mobileMinHeight` placeholders, `eagerOnIdle` preload, `preload` of next section. Prevents layout shift.
- **SectionFadeTransition:** 1px hairline divider (`border-y border-border/60`) with optional `darkTop` variant for light→dark band transitions.
- **ScrollExpandMedia (Hero):** Video/image that expands on scroll (448px → 1680px width, 286px → 930px height), with overlay content reveal choreographed to scroll progress.
- **DitheringShader:** WebGL dither transition on hero intro (4x4 warp, 5px pixel size, 0.65 speed, accent colors).
- **ResponsiveImage:** AVIF/JPEG sources with `sizes`, eager/lazy loading, decoding async, fallback chains.

### Named Rules
**The Kit-Consumption Rule.** When building new UI, reach for the primitives above before inventing. Button variants, card types, input styles, nav patterns — use the documented component tokens. Invent only when the kit truly doesn't cover the shape; then contribute it back.

**The Signature-Component Rule.** Hero, LazySection, SectionFadeTransition, ScrollExpandMedia, DitheringShader, ResponsiveImage are NETSO-specific primitives. They carry the brand's motion and media grammar. Do not replicate their behavior with generic code — use the component.

## Do's and Don'ts

### Do:
- **Do** use the 4px spacing grid exclusively. All padding, margin, gaps, heights land on the scale.
- **Do** use Satoshi for all UI text. Reserve Playfair Display for exactly one hero h1 per page.
- **Do** use the purple accent (`#c8b2ff`) for: primary CTAs, focus rings, active nav, hero card eyebrow, key data highlights. Nothing else.
- **Do** use warm-tinted shadows (`rgba(38,25,15,...)`) for all elevation.
- **Do** use `backdrop-filter: blur(18px–22px)` on navigation, dropdowns, mobile sheets, and overlay cards.
- **Do** respect `prefers-reduced-motion` — all Framer Motion/GSAP animations disable instantly.
- **Do** use `container-tight` (1180px max, 2rem side padding) for all page content.
- **Do** lazy-load heavy sections with `LazySection` + explicit `minHeight`/`mobileMinHeight` + `preload`.
- **Do** write bilingual copy (EN/BN) in `site-copy.ts` — no hardcoded strings in components.
- **Do** use semantic HTML: `<section>`, `<header>`, `<main>`, `<footer>`, proper heading hierarchy.
- **Do** use the `eyebrow` component for section/category markers — uppercase, tracked, 0.72rem, 500 weight.

### Don't:
- **Don't** use Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, or Space Grotesk. Satoshi is the voice.
- **Don't** use Playfair Display for anything except the hero h1. Not section titles, not cards, not UI.
- **Don't** use purple gradient text (`background-clip: text + gradient`). Solid accent only.
- **Don't** use bounce/elastic easing (`animate-bounce`, `cubic-bezier(0.68, -0.55, 0.27, 1.55)`). Use `cubic-bezier(0.22, 1, 0.36, 1)` (cinematic) or `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth).
- **Don't** use dark glow shadows (`box-shadow: 0 0 20px rgba(139,92,246,0.5)`). Warm shadows only.
- **Don't** use side-tab borders (thick colored border on one card edge). Hairline rules or nothing.
- **Don't** use decorative grid backgrounds (`.bg-structural-grid`, `.bg-grid-subtle`) on non-measurement surfaces. The homepage grid is a deliberate structural metaphor — not a default.
- **Don't** hardcode colors, font-sizes, or radii in components. Use CSS variables (`var(--accent)`, `var(--radius)`, etc.) or Tailwind tokens (`bg-primary`, `rounded-lg`).
- **Don't** nest cards inside cards. Use `ivory-panel` / `ivory-surface` / `glass-card` as flat containers.
- **Don't** use pure white (`#fff`) or pure black (`#000`) as design tokens. Warm near-white (`#fcfcfc`) and warm near-black (`#1a1a1a` / `#1c1c1c`) are the grounds.
- **Don't** skip `prefers-reduced-motion` handling. Every animation has a 0.01ms fallback.
- **Don't** write English-only copy. All user-facing text lives in `site-copy.ts` with BN translation.