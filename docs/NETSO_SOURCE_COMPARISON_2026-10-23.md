# Netso source-code comparison — first verified pass

Date: 2026-10-23. Evidence: default-branch source files fetched from the repositories listed below. This is source inspection, **not** a visual/browser audit.

| Source | File inspected | Verified observation | Decision |
| --- | --- | --- | --- |
| netso-energy | src/pages/Index.tsx | Homepage uses lazy-loaded modular sections, SEO component, staged preloads and an assessment calculator | **Keep as integration base**, inspect actual conversion and UX before modifications |
| netso-energy-website | src/app/page.tsx | Accessible main landmark and sectioned composition with BusinessModel, SavingsCalculator, proof and FAQ | Borrow information architecture patterns, not framework |
| netso-energy-website | src/lib/calculator/config.ts | Centralized versioned assumptions with source IDs, explicitly labeled placeholders | **Adopt governance pattern**, do not copy placeholder numbers as verified facts |
| Netso.energy | app/page.tsx | 3D hero, simple marketing copy, waitlist form with no visible submit handler in inspected file | Motion inspiration only; do not import nonfunctional lead forms |
| Netso_website | src/App.tsx | Navbar, Hero, SolarCycle, Dashboard, Financing, Installation, Footer; artificial two-second loading screen | Evaluate components, **reject artificial preloader** as a performance/accessibility default |

## Immediate integration principles

1. Keep existing Vite/React/Supabase foundation and working assessment flow unless tests demonstrate a superior replacement.
2. Port source-linked calculator assumption governance as a design principle. A source ID ending in `placeholder` must never be treated as an approved tariff, solar resource, regulatory eligibility or performance guarantee.
3. Do not import entire Next.js, Express or Prisma architectures merely to borrow visual components.
4. All CTAs must have a verified destination or tested submission handler; visible buttons alone do not constitute functionality.
5. Motion must be progressively enhanced, respect reduced-motion preferences and never impose an artificial loading delay.
6. Validate original Netso logos, imagery and finance/legal copy before publishing.

## Outstanding evidence

- Full component implementations and screenshot comparisons.
- Existing deployment's exact source branch and environment.
- Test execution on the proposed branch.
- Lead database policies, consent, spam controls and failure paths.
- Regulatory/financial approval for every quantitative claim.
- Accessibility, Core Web Vitals and responsive QA.

**Status:** Architectural choice supported by inspected source; implementation and production readiness **not yet verified**.
