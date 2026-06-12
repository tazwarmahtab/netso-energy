# NETSO Energy — Website Goals

**Last Updated:** 2026-06-02
**Plan Reference:** `.claude/plans/linear-gathering-globe.md`
**Branch:** `codex/implement-netso-savings-calculator`

---

## Goal: Premium Website for Solar Lead Generation

Transform NETSO Energy's marketing site into a world-class lead-generation platform that communicates engineering excellence, inspires trust, and converts visitors into WhatsApp assessment starts.

**Why:** The website is NETSO's primary digital storefront. Every improvement to the calculator, project showcase, CTA design, and performance directly increases lead volume and customer confidence.

**How to apply:** All feature work should be measured against this goal: does it increase conversions, improve trust signals, or accelerate the lead path?

---

## Goal 1: Deploy Savings Calculator to Production

Deploy the current branch, fix the 1 test regression, and get the premium homepage sections (HeroCalculator, StatsShowcase, RecentProjects, WireTicker) live on `netsoenergy.com`.

| Metric | Target |
|--------|--------|
| Merge main | Fast-forward, zero conflicts |
| Build | Pass |
| Tests | 25/25 passing |
| E2E smoke | Desktop + mobile pass |

**Status:** Pending deploy. Blocked only by user go-ahead.

**PR:** Not yet created.

---

## Goal 2: Implement Full BPDB Tariff Schedule (Residential + Commercial + Industrial)

Add multi-customer-type tariff logic to `solar-engine.ts` and the calculator UI, covering:
- Residential (LT-A) — lifeline + 6 stepped slabs
- Commercial (LT-B) — flat rate with higher fixed charge
- Small Industrial (LT-C) — time-of-day rates and demand charges
- Large Industrial (HT) — 33kV/11kV with TOU metering

| Customer Type | Tariff Class | Status |
|---------------|-------------|--------|
| Residential | LT-A (BPDB) | DONE |
| Commercial | LT-B | NOT DONE |
| Small Industrial | LT-C | NOT DONE |
| Large Industrial | HT | NOT DONE |

**Why:** Commercial/industrial customers pay higher rates per kWh, so the savings case is stronger. Without this, the calculator under-represents value for NETSO's most lucrative customer segment.

**How to apply:** `solar-engine.ts` gets a `CustomerType` parameter; calculator UI gets a segmented control.

**Status:** Design phase (brainstorming). Spec pending.

---

## Goal 3: UI/UX Enhancement — Hydra Template Patterns

Apply selected UI/UX patterns inspired by the Hydra Framer template to refine specific areas of the NETSO site while preserving its existing strengths.

### Phase 1: Enhanced Project Showcase
- Better grid layout, hover lifts, skeleton loaders, active filter states
- Files: `src/pages/Projects.tsx`, `src/components/home/RecentProjects.tsx`

### Phase 2: Prominent Statistics Section
- Dedicated stat block with animated count-up on scroll, contrasting background
- Files: New `StatsHighlight.tsx` component, `src/pages/Index.tsx`, `src/lib/site-copy.ts`

### Phase 3: Refined CTA Design
- Dual-button pattern, hover lift effects, icon animations
- Files: `src/components/AssessmentCtas.tsx`, `src/components/ui/button.tsx`

### Phase 4: Enhanced Footer
- Regional serving list, distinct background
- Files: `src/components/SiteFooter.tsx`, `src/lib/site-copy.ts`

### Phase 5: Hero Polish
- Value proposition clarity, subtle animation enhancements
- Files: `src/components/home/Hero.tsx`

**Why:** Small, high-visibility refinements build user trust and improve conversion rate without a full redesign.

**How to apply:** Work through phases in order (highest impact first). Each phase is independently reviewable and deployable.

**Status:** Not started. Plan approved.

---

## Goal 4: Complete Full Release Pipeline

Maintain and strengthen the release verification gate so every deploy is safe.

| Check | Status |
|-------|--------|
| Production build (`npm run build`) | PASS |
| Lint (`npm run lint`) | PASS |
| Unit tests (`npm test`) | 25/25 PASS |
| E2E smoke (`npx playwright test`) | N/A |
| SEO verify (`npm run verify:seo`) | PASS |
| Config verify (`npm run verify:config`) | PASS |
| WhatsApp env var test | FIXED |

**Why:** The release gate catches regressions before they reach production. Keeping it green means deploy confidence.

**How to apply:** Before any deploy, run `npm run verify:release` and fix all failures. Add new tests for new features.

**Status:** 96% green (E2E needs initial run to confirm).

---

## Sprint Tracker

| Goal | Priority | Effort | Status | Target Date |
|------|----------|--------|--------|-------------|
| 1. Deploy calculator | P0 | 1h | Ready to deploy | This week |
| 2. Full BPDB tariff | P1 | 6-8h | Brainstorming | Next sprint |
| 3. UI/UX enhancements | P2 | 4-6h | Plan approved | This sprint |
| 4. Release pipeline | P0 | 0.5h | 96% green | Continuous |

---

## How This File Works

This file is consumed by Claude Code sessions as a project-level goal reference. It is checked into the codebase. Read it at the start of every complex task to align work with stated goals. Update status fields as work progresses. Add new goals when new priorities emerge.
