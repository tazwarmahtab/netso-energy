# Netso Solar Intelligence — Product & Technical Design

**Date:** 2026-08-25  
**Status:** Approved design  
**Repository:** `tazwarmahtab/netso-energy`

## 1. Purpose

Build a simple, mobile-first B2B solar pre-feasibility experience for Netso Energy that converts qualified industrial/commercial website visitors into actionable rooftop RESCO/PPA opportunities.

The product is **not** a generic solar calculator. The calculator is the front door to a deterministic **PPA pre-feasibility and lead-qualification engine**.

The public experience must feel as simple as the reference calculator supplied by the product owner, while the backend must be auditable, configurable, and suitable for Netso's commercial workflow.

## 2. Canonical business context

Netso is treated as a distributed renewable-energy developer / RESCO / asset owner. The core commercial pathway is rooftop RESCO/OPEX with a long-term corporate PPA: Netso or a project SPV finances, owns, and operates the renewable asset and the host purchases the generated electricity.

NEM/export is a secondary economic layer, not the primary product proposition.

The architecture must leave room for later project lanes including merchant/corporate PPA/private wheeling, utility/government-offtake IPP, and CAPEX/EPC, but MVP focuses on rooftop RESCO/OPEX.

## 3. Product principles

1. **Simple UI, serious engine.** A first-time facility owner should complete the Quick Assessment in roughly 60–120 seconds.
2. **One question per screen.** Use large cards, clear inputs, visible progress, and progressive disclosure.
3. **Do not require technical knowledge.** Unknown roof area, sanctioned load, or kWh should not unnecessarily block a preliminary result.
4. **Show value before asking for contact data.** Contact capture occurs after the user sees the estimate.
5. **Never present estimates as engineering guarantees.** All preliminary results must clearly state that site, structural, electrical, regulatory, and commercial validation are required.
6. **No critical assumptions in frontend code.** Business/regulatory assumptions are versioned configuration.
7. **No AI in core financial mathematics.** AI may support bill extraction, explanations, and sales intelligence in later phases, but deterministic functions own calculation correctness.
8. **Notion is the governance source for approved assumptions.** The runtime should consume a validated, versioned assumption snapshot rather than querying Notion for every calculation.

## 4. MVP customer journey

### Screen 0 — Landing

Headline: **Discover your solar potential**

Supporting copy: **See how much your facility could save with Netso.**

Primary CTA: `Start assessment →`

Supporting text: `Takes about 2 minutes · No commitment`

### Screen 1 — Facility

Question: **What type of facility do you have?**

Choices:
- Factory
- Commercial building
- School / institution
- Hotel
- Hospital
- Other

### Screen 2 — Location

Question: **Where is your facility?**

Use a searchable Bangladesh district/city selector. Location informs solar/resource and project context but must not imply engineering feasibility.

### Screen 3 — Electricity

Question: **What do you know about your electricity use?**

Choices:
- My monthly electricity bill
- My monthly electricity consumption
- I have my electricity bill

MVP bill upload may be captured for manual follow-up but does not claim automated OCR. AI bill extraction is V2.

### Screen 4 — Roof

Question: **How much usable roof space do you have?**

Input in square metres, with an explicit option: `I don't know`.

If unknown, the engine may produce a consumption-based preliminary estimate and mark roof feasibility as requiring site assessment.

### Screen 5 — Objective

Question: **What matters most to you?**

Choices:
- Reduce electricity costs
- Reduce grid dependence
- Increase renewable energy
- Go solar with zero upfront investment

The zero-upfront choice is an internal PPA-intent signal, not a guarantee of financing terms.

### Screen 6 — Results

Display only the highest-value outputs:
- Estimated solar capacity
- Estimated annual generation
- Potential annual electricity-cost reduction
- Potential Netso PPA structure / customer upfront CAPEX where commercially applicable

Primary CTA: `Get my Netso assessment →`

Required disclaimer: `Preliminary estimate — final capacity, generation, savings and project feasibility require site, structural, electrical, regulatory and commercial validation.`

### Advanced assessment

Progressive disclosure may collect:
- sanctioned/allocated load
- customer/tariff context
- maximum demand / contract demand when known
- operating hours / daytime load profile
- generator capacity and usage
- existing solar
- roof type and shading
- transformer information
- 12-month electricity data

Advanced mode is not required for Quick Assessment completion.

## 5. Calculation model

### 5.1 Input confidence

Every input is classified as one of:
- `user_estimate`
- `document_derived`
- `verified`

The final assessment stores an overall confidence level and the assumptions snapshot used.

### 5.2 Annual consumption

If monthly kWh is supplied:

`annualConsumptionKwh = monthlyConsumptionKwh × 12`

If only monthly bill is supplied, the engine estimates consumption using the applicable tariff context when sufficient information exists. If tariff context is incomplete, use an approved preliminary assumption from the assumption registry and label the result as indicative.

Never use one universal Bangladesh tariff as an invisible shortcut.

### 5.3 Preliminary PV sizing

Base sizing:

`preliminaryCapacityKwp = requiredAnnualSolarEnergyKwh ÷ specificAnnualYieldKwhPerKwp`

The result is constrained by known:
- usable roof area
- customer load / allocated or sanctioned load
- electrical constraints
- selected project pathway

The engine returns low/base/high capacity where uncertainty is material.

### 5.4 Generation

`annualGenerationKwh = capacityKwp × specificAnnualYieldKwhPerKwp`

Specific yield must come from the controlled assumptions registry and support low/base/high values. Do not hard-code a single yield in the UI.

### 5.5 Self-consumption

`selfConsumedSolarKwh = generationKwh × selfConsumptionRatio`

`exportKwh = generationKwh − selfConsumedSolarKwh`

A universal self-consumption ratio must not be treated as verified project truth. Without interval/load data, use an approved preliminary assumption and lower confidence accordingly. Actual load-profile data supersedes the assumption in detailed assessment.

### 5.6 Netso PPA economics

For the core rooftop RESCO/OPEX pathway:

`solarPpaCost = selfConsumedSolarKwh × applicablePpaRate`

`avoidedEnergyCost = selfConsumedSolarKwh × applicableAvoidedEnergyRate`

`customerSavings = avoidedEnergyCost − solarPpaCost`

PPA price is project-specific/configurable. Do not hard-code a universal customer-facing PPA price.

### 5.7 Export/NEM

Export is modeled separately from avoided retail consumption. If eligibility or settlement rules cannot be established confidently from the supplied information, the result must say that export economics require utility/NEM validation.

NEM is not the default driver of Netso's rooftop RESCO proposition.

### 5.8 CAPEX comparison

Where sufficient approved assumptions exist, compare:
- customer-funded CAPEX pathway
- Netso RESCO/PPA pathway

The internal model may calculate CAPEX, O&M, financing, NPV, IRR, DSCR, payback, degradation, and project cash flow. These are separate from customer-facing headline savings.

Do not publicly hard-code universal debt percentage, interest rate, tenor, or equity requirement unless the assumption is currently approved for that exact product/project context.

### 5.9 20-year project view

Support a configurable project horizon for the long-term PPA model. Generation degradation, PPA escalation, O&M, financing, and other project assumptions must be controlled configuration rather than unexplained constants.

## 6. Assumption governance

The Notion Netso Assumptions Registry is the governance model. Each runtime assumption must retain:
- name
- value
- unit
- low
- high
- confidence
- evidence/source
- source tier
- source date
- status
- review date
- owner

Runtime architecture:

`Notion → validated assumption snapshot → application configuration → deterministic calculation engine`

Every assessment stores `assumptionsVersion` so historical results remain reproducible after assumptions change.

## 7. Data model

```text
Assessment
├── id
├── createdAt
├── assumptionsVersion
├── facility
│   ├── type
│   ├── location
│   └── operatingProfile
├── energy
│   ├── monthlyConsumptionKwh
│   ├── monthlyBillBdt
│   ├── tariffContext
│   ├── sanctionedLoadKw
│   ├── demandKw
│   └── generator
├── roof
│   └── usableAreaM2
├── objective
│   └── priority
├── solar
│   ├── recommendedCapacityKwp
│   ├── annualGenerationKwh
│   ├── selfConsumptionKwh
│   └── exportKwh
├── commercial
│   ├── ppa
│   ├── capex
│   └── savings
├── confidence
└── opportunityScore
```

Unknown optional values must be nullable and represented explicitly, not replaced with fabricated defaults.

## 8. Lead qualification

Generate an internal `OpportunityScore` using factors such as:
- estimated system size
- industrial/commercial fit
- energy spend
- roof availability
- daytime load
- generator dependence
- PPA interest
- data completeness
- geographical/project fit

Do not expose the numeric score to the customer.

The score should help route leads toward:
- immediate sales review
- site assessment
- nurture / low-priority follow-up

## 9. UX and visual direction

The UI should preserve the reference tool's simplicity without copying its branding, text, implementation, or India-specific assumptions.

Target feel:
- clean
- premium
- industrial/infrastructure
- mobile-first
- large numerical hierarchy
- generous whitespace
- restrained animation
- cards and simple sliders where useful
- minimal technical jargon

Do not create a dashboard-like interface for the public assessment.

## 10. Current repository integration

The existing repository already contains:
- `src/components/home/SolarCalculatorFunnel.tsx`
- `src/lib/solar-engine.ts`
- assessment-session backend functions under `supabase/functions/`
- lead submission and WhatsApp handoff infrastructure
- an existing homepage section with `id="savings-estimate"`

The implementation should evolve the existing assessment infrastructure rather than create a parallel lead/assessment system.

The current `solar-engine.ts` contains hard-coded C&I constants and a simplified bill-to-kWh/savings model. These assumptions must be migrated into governed configuration as part of implementation; the existing model must not be treated as canonical merely because it is already in code.

## 11. MVP scope

### Build
- mobile-first Quick Assessment
- facility type
- location
- bill or kWh input
- optional roof area
- solar objective
- deterministic PV sizing/generation
- preliminary self-consumption/export model
- configurable PPA economics
- customer result screen
- lead capture after result
- assessment session persistence
- opportunity score
- assumptions version snapshot
- preliminary assessment report data

### Defer
- AI bill OCR
- automated satellite roof mapping
- automated structural analysis
- battery optimization
- merchant/private-wheeling scenario simulator
- automated IDCOL underwriting
- full NEOS operating-system integration

## 12. Testing strategy

### Unit tests

Cover independent functions for:
- annual consumption
- PV generation
- capacity sizing
- self-consumption
- export
- PPA cost
- avoided cost
- customer savings
- project cash flow
- opportunity scoring

### Scenario fixtures

At minimum:
1. Large industrial/RMG facility with daytime-heavy consumption.
2. School/institution with daytime operation.
3. Commercial building with mixed operating profile.
4. High-surplus system where generation exceeds daytime load.
5. User with bill only and missing roof/load data.
6. Existing-solar customer.
7. Generator-using customer.

### Regression rule

Any change to governed assumptions must run the calculation suite and preserve reproducibility of historical assessments through the stored assumptions version.

## 13. Acceptance criteria

### UX
- First-time user can complete Quick Assessment without instructions.
- Typical completion target is 60–120 seconds.
- Mobile layout is first-class.
- User can move backward without losing inputs.
- Unknown non-critical data does not unnecessarily block completion.

### Calculation
- Every displayed value has a deterministic calculation path.
- No business-critical tariff/PPA/export assumption is silently hard-coded.
- Estimates and verified values are clearly distinguished.
- CAPEX and PPA economics remain separate models.
- Export value is never silently treated as avoided retail value.

### Commercial
- Results can be converted into a qualified lead.
- Assessment is persisted.
- Sales can retrieve the assessment inputs and outputs.
- Opportunity score is stored internally.
- Preliminary assessment output can be used for site-assessment follow-up.

### Governance
- Assumption version is stored with each assessment.
- Assumption changes can be audited.
- Regulatory/commercial assumptions can be changed without rewriting frontend components.

## 14. Product KPI

Primary KPI:

**Qualified PPA opportunities generated per 1,000 calculator sessions.**

Secondary KPIs:
- assessment completion rate
- result-view rate
- lead conversion
- qualified-lead rate
- average estimated kWp per lead
- estimated pipeline value
- site-assessment conversion
- LOI conversion
- PPA conversion

## 15. Explicit non-goals

This product is not:
- an engineering design tool
- a structural certification tool
- a legal/regulatory opinion
- a guaranteed project quotation
- a substitute for utility approval
- a universal Bangladesh tariff database
- a generic residential solar subsidy calculator

## 16. Security and data handling

Lead and assessment data must use the existing Supabase assessment-session/lead infrastructure where possible. Public users must not receive internal opportunity scores, private assumptions metadata, financing model internals, or CRM credentials.

## 17. Implementation sequencing

1. Preserve/extend existing assessment persistence and lead infrastructure.
2. Replace hard-coded calculation constants with a versioned assumption snapshot interface.
3. Build deterministic calculation modules with unit/scenario tests first.
4. Replace the current homepage calculator UI with the simple progressive multi-step flow.
5. Connect result submission to the existing assessment session and WhatsApp handoff.
6. Add opportunity scoring and sales-facing assessment fields.
7. Add regression/acceptance tests and release verification.

## 18. Final product definition

**NETSO SOLAR INTELLIGENCE**

**Discover your facility's solar potential in 60 seconds.**

The public calculator is intentionally simple. The underlying system is a governed, deterministic PPA pre-feasibility and lead-qualification engine designed to become the acquisition front door for Netso's RESCO business and, later, a component of NEOS.
