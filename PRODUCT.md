# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript + Tailwind CSS + Framer Motion + GSAP + Supabase

## Users

**Primary:** Building owners and decision-makers in Bangladesh (Dhaka, Chattogram, Gazipur, surrounding areas) who have flat concrete rooftops and face high daytime electricity bills or grid reliability issues. Two segments:
- **Commercial/Industrial:** Factory owners, RMG facilities, educational campuses, commercial building managers — motivated by zero-CAPEX PPA models, demand charge reduction, ESG compliance
- **Residential:** Homeowners, townhouse/apartment decision-makers — motivated by bill reduction, battery backup for outages, lifestyle upgrade (shaded pergola as usable space)

**Secondary:** Property developers integrating at design stage, financiers building rooftop-as-a-service portfolios, institutions deploying at scale across staff housing/commercial assets

**Situation:** User has a rooftop, sees it as idle/underutilized, faces rising electricity costs (especially upper tariff slabs), experiences load-shedding/outages. They want a credible, engineered solution — not a generic panel installer.

**Job:** "Assess my rooftop's potential → get an engineered proposal → install → operate as a long-term energy asset."

## Product Purpose

NETSO Energy turns unused rooftops in Bangladesh into distributed, citizen-owned energy infrastructure — the "rooftop layer" of the country's energy transition.

**Mechanism:** One hardware product (Solar Pergola — modular steel canopy with integrated PV) delivers three jobs: shade, shelter, and energy generation. Delivered as a platform: design, financing (zero-CAPEX PPA for commercial), installation, lifetime monitoring.

**Success metrics:**
- Commercial: MW deployed under PPA, project pipeline value, partner developer integrations
- Residential: Installations commissioned, battery attach rate, referral/organic acquisition
- Platform: Rooftops in review queue, assessment-to-install conversion, lifetime asset uptime

## Positioning

"Bangladesh doesn't have a land problem. It has a rooftop opportunity."

**Differentiated mechanism:** Not a panel installer — a platform built around a single engineered product (Solar Pergola) that makes the upgrade architectural, not industrial. Roof-first engineering (structure, shading, drainage, access dictate scope) vs. template sizing. Zero-CAPEX PPA for commercial removes the capital barrier that blocks most distributed solar in Bangladesh.

## Operating Context

**Workflows:**
1. Feasibility check (WhatsApp or web form) → 60-second intake
2. Engineering review (roof fit, load context, photos, bill profile)
3. Project confirmation (scope, commercial terms, timeline)
4. Installation (structure, panels, power electronics, commissioning)
5. Handover + monitoring (app access, operating guidance, ongoing support)

**Environments:** Bangladesh grid (daytime peak, outage risk, net metering evolving), monsoon climate (wind-rated structures, drainage), dense urban rooftops (water tanks, wiring, access constraints)

**Tools/Documents:** Site-copy (EN/BN), lead intake via Supabase, WhatsApp Business API, monitoring app (project-scoped)

## Capabilities and Constraints

**Confirmed functionality:**
- Bilingual (EN/BN) marketing site with 7 pages
- WhatsApp-integrated lead intake with fallback form
- Supabase-backed assessment sessions
- Project gallery with real installations
- Solar calculator/funnel (SolarCalculatorFunnel component)
- Live mode configured for visual iteration

**Technical constraints:**
- Single-page React app (Vite, no SSR)
- Tailwind CSS with CSS variables for theming
- Framer Motion + GSAP for animations
- Supabase for backend (assessment sessions, webhooks)
- Vercel deployment (prerendered routes)

**Terminology:** "Solar Pergola" (not "canopy" or "structure"), "Rooftop review" / "Feasibility check" (not "quote"), "Energy asset" (not "system"), "Zero-CAPEX PPA" (commercial), "Site-reviewed" (every project)

**Explicitly undecided:** Residential pricing model (per-W? fixed? subscription?), battery attach pricing, partner revenue share structures, international expansion timeline

## Brand Commitments

**Name:** NETSO ENERGY (all caps, spaced)
**Voice:** Engineering-led, roof-first, long-term. Direct, credible, quietly confident. Not hype. "Quietly building a city that powers itself."
**Personality:** Expert, deliberate, infrastructure-grade. Three-word: **expert, deliberate, infrastructural**
**Assets:** Real project photography (Dhaka rooftops), hero video loop, OG image (solar pergola over Dhaka skyline)
**Anti-references:** Generic solar marketing (blue skies, stock families, "save the planet" copy), panel-installer aesthetics (industrial, utilitarian), SaaS landing page clichés (hero-metric layouts, identical card grids, purple gradients)

## Evidence on Hand

**Real content:**
- 7 documented projects across Dhaka, Chattogram, Gazipur (Gulshan residential, Mirpur commercial, Dhanmondi apartment, Chattogram 80kW campus, EPZ 150kW factory, Banani townhouse, Gazipur 250kW apparel)
- Hero video + poster assets (`/assets/new/hero-loop-optimized.mp4`)
- Bilingual site copy (comprehensive, in `src/lib/site-copy.ts`)
- Engineering specs in product page (modular spans, Tier-1 mono PV, wind/monsoon rated, hybrid inverter, underlight, monitoring)

**Absences (do not fabricate):**
- Customer testimonials with names/quotes
- Specific $/W pricing or PPA rates
- Benchmark performance data (kWh/kWp actuals)
- Warranty terms (shown as "by scope" / "review-led")
- Installation timeline commitments (shown as "after survey")

## Product Principles

1. **Roof-first engineering.** Structure, shading, drainage, and access conditions dictate scope — not template sizing.
2. **Architecture over industry.** The Solar Pergola makes the upgrade beautiful and usable (shade, shelter, light), not just functional.
3. **Platform, not installer.** Design, financing, installation, monitoring — integrated around one product. Zero-CAPEX PPA removes the capital barrier.
4. **Long-term asset mindset.** Commissioning is the start, not the finish. Monitoring, support, and resilience matter more than handoff speed.
5. **Bangladesh context is the spec.** Grid behavior, monsoon wind, urban rooftop density, tariff structure — these are design inputs, not constraints to work around.

## Accessibility & Inclusion

Baseline: WCAG 2.1 AA. Bilingual (EN/BN) — all user-facing copy translated. Color contrast verified (purple accent `#c8b2ff` on light backgrounds meets 4.5:1). `prefers-reduced-motion` respected for all Framer Motion/GSAP animations. Semantic HTML, keyboard-navigable interactive elements. Copy readable at 8th-grade level; technical terms ("PPA", "inverter", "net metering") used precisely where needed.