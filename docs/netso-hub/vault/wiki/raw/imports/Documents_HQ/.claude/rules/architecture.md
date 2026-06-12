---
type: concept
tags: [architecture, netso-hq, solar]
created: 2026-04-14
---

# Netso HQ Architecture

## Core Components
1. **Code** (`apps/`)
    - `website/`: Marketing site (React + Vite + Tailwind). Entry: `src/main.tsx`.
    - `app/`: Mobile app (STUB).
2. **Business** (`Strategy/`, `Finance/`, `Legal/`, `Operations/`, `content/`)
    - Documents, templates, brand content.

## Website Details
- **Smooth Scroll**: ReactLenis.
- **Animations**: Framer Motion.
- **Styles**: Tailwind CSS + `clsx`/`tailwind-merge`.
- **Icons**: Lucide React.
- **ROI Calculator**: `SavingsCalculator.tsx` (BERC/SREDA tariff-based).

Vite uses `rolldown-vite@7.2.5`. TypeScript strict mode enforced.
