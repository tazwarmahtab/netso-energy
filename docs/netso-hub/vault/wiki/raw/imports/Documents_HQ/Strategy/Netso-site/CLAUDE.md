# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Netso is a static HTML/CSS/JS website for a solar energy business (Netso Solar), deployed on Netlify. There is no build system, no package manager, and no framework — pages are self-contained HTML files with inline styles and scripts.

## Development

- **No build step**: `netlify.toml` publishes the root directory as-is
- **Local dev**: Open HTML files directly in a browser, or use any static server (`npx serve .`, `python3 -m http.server`)
- **No tests, no linter** — none are configured
- **Deploy**: Netlify static hosting from the repository root

## Architecture

### Single-File Pages

Each page is a monolithic HTML file containing all CSS (in `<style>`) and JS (in `<script>`) inline. There are no external stylesheets or script files.

- **`index.html`** — Production page. Netso Solar energy business site with: hero, cinematic scroll story, capabilities, industries, solar ROI calculator, and footer. Supports English/Bengali bilingual UI.
- **`netso.html`** — Alternate/older page positioning Netso as a digital agency. English only.

**Known issue**: `index.html` has the full content of `netso.html` appended after its closing `</html>` tag (line ~1422+). This is a copy-paste artifact — browsers ignore it but it inflates file size.

### Internationalization (`index.html`)

Custom bilingual system using `data-i18n` attributes on HTML elements. A JS `I18N` object holds translation dictionaries for `en` and `bn` locales. Language is toggled via `#langEN` / `#langBN` buttons. Bengali text uses `Noto Sans Bengali` font and `Intl.NumberFormat` with `bn-BD` locale.

### Solar Calculator (`index.html`)

Vanilla JS calculator implementing real Bangladesh electricity tariff structures (BERC/SREDA):
- Residential slab-based pricing (LT-A)
- Commercial/Industrial TOU pricing (LT-E, LT-C1)
- Industrial MT/HT average tariff
- Net metering vs power offtake models
- WhatsApp sharing integration (`wa.me/8801791222777`)

### Animation Pattern

Elements with class `.reveal` start hidden (`opacity:0; transform:translateY(14px)`) and are batch-animated into view by GSAP ScrollTrigger. The cinematic story section uses `data-step`, `data-shot`, and `data-img` attributes for pinned scroll transitions.

### Styling Conventions

- CSS Custom Properties at `:root` for theming (colors, spacing, typography, effects)
- `index.html` dark theme: `--bg:#070a0e`, `--gold:#ffb000`, `--green:#46f5b5`, `--blue:#76a7ff`
- `netso.html` dark theme: `--bg-primary:#0a0a0a`, `--accent:#e85d04`
- Fluid typography via `clamp()`
- Responsive breakpoints at 560px, 620px, 768px, 900px, 920px, 940px, 980px, 1024px
- `prefers-reduced-motion` respected — animations are disabled for users who prefer reduced motion

### Data Attribute Conventions

- `data-i18n="key"` — bilingual text content
- `data-step="N"` — cinema scroll sequence steps
- `data-shot="N"` / `data-img="N"` — paired panel/image transitions
- `data-count="N"` — counter animation targets
- `data-v="N"` — GSAP tween state tracking on calculator results

## External Dependencies (CDN)

`index.html`: GSAP 3.12.5 + ScrollTrigger, Google Fonts (Inter, Noto Sans Bengali)

`netso.html`: GSAP 3.12.2 + ScrollTrigger + ScrollToPlugin, Lenis 1.0.42 (smooth scroll), Lucide icons, Google Fonts (Inter, Space Grotesk)

## Assets

The `assets/` directory is empty in the repo. `index.html` references local image paths (e.g., `assets/hero-rooftop-night.jpg`, `assets/netso-logo.png`) that must be added separately. `netso.html` uses Unsplash URLs for placeholder images.
