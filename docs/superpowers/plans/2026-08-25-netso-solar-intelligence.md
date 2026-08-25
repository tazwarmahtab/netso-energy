# Netso Solar Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hard-coded savings calculator with a simple mobile-first Netso Solar Intelligence assessment backed by a deterministic, versioned PPA pre-feasibility engine and existing assessment/lead infrastructure.

**Architecture:** Keep the existing React/Vite/Supabase assessment stack. Split calculation responsibilities into governed assumptions, deterministic solar/commercial engines, and lead qualification; keep the public UI thin and progressive. Reuse the existing assessment session and WhatsApp handoff instead of creating a parallel intake system.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Zod, Vitest, Playwright, Supabase Edge Functions/Postgres.

**Spec:** `docs/superpowers/specs/2026-08-25-netso-solar-intelligence-design.md`

## Global Constraints

- Mobile-first Quick Assessment target: 60–120 seconds.
- Public UI must remain simple; technical inputs are progressive disclosure.
- Core calculation mathematics must be deterministic and testable; no AI in core financial calculations.
- Business/regulatory assumptions must not be silently hard-coded in frontend components.
- Runtime calculations consume a validated, versioned assumption snapshot rather than querying Notion per request.
- Every assessment stores `assumptionsVersion`.
- PPA is the primary rooftop RESCO/OPEX pathway; NEM/export is secondary.
- Preliminary results must state that final feasibility requires site, structural, electrical, regulatory, and commercial validation.
- Reuse existing assessment-session, lead, Supabase, and WhatsApp infrastructure.
- Do not introduce a generic residential subsidy calculator.

---

## Task 1: Establish governed calculation assumptions and types

**Files:**
- Create: `src/lib/solar-assumptions.ts`
- Create: `src/lib/solar-assumptions.test.ts`
- Modify: `src/lib/solar-engine.ts`
- Modify: `src/lib/lead-types.ts`

**Interfaces:**
- Produces `SolarAssumptionSnapshot`, `SolarAssumptionBand`, and `getSolarAssumptionSnapshot()` for the deterministic engine.
- Produces versioned assumption metadata consumed by calculation results and assessment persistence.

- [ ] **Step 1: Write failing tests for assumption shape and versioning**

```ts
import { describe, expect, it } from "vitest";
import { getSolarAssumptionSnapshot } from "@/lib/solar-assumptions";

describe("solar assumptions", () => {
  it("returns a versioned snapshot with low/base/high values", () => {
    const snapshot = getSolarAssumptionSnapshot();
    expect(snapshot.version).toBeTruthy();
    expect(snapshot.specificAnnualYield.low).toBeLessThanOrEqual(snapshot.specificAnnualYield.base);
    expect(snapshot.specificAnnualYield.base).toBeLessThanOrEqual(snapshot.specificAnnualYield.high);
    expect(snapshot.sources.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the targeted test and verify it fails because the module does not exist**

Run: `npm test -- src/lib/solar-assumptions.test.ts --run`
Expected: FAIL with a module/import error for `@/lib/solar-assumptions`.

- [ ] **Step 3: Implement the assumption snapshot interface**

```ts
export type AssumptionBand = { low: number; base: number; high: number };

export type SolarAssumptionSnapshot = {
  version: string;
  effectiveDate: string;
  specificAnnualYield: AssumptionBand;
  selfConsumptionRatio: AssumptionBand;
  generationDegradationRate: number;
  ppaTermYears: number;
  co2KgPerKwh: number;
  sources: Array<{ key: string; sourceTier: string; confidence: string; reviewDate: string }>;
};

export function getSolarAssumptionSnapshot(): SolarAssumptionSnapshot {
  return {
    version: "BD-NETSO-2026-08-25-1",
    effectiveDate: "2026-08-25",
    specificAnnualYield: { low: 0, base: 0, high: 0 },
    selfConsumptionRatio: { low: 0, base: 0, high: 0 },
    generationDegradationRate: 0,
    ppaTermYears: 20,
    co2KgPerKwh: 0,
    sources: [],
  };
}
```

Do not ship the placeholder numeric values above. Before implementation is merged, replace each value with the currently approved Notion assumption or deliberately leave the field unavailable and make the engine return an `assumption_unavailable` state. The plan intentionally forbids inventing values.

- [ ] **Step 4: Extend Zod types for versioned calculator context and confidence metadata**

Define explicit fields for `assumptionsVersion`, input confidence, usable roof area in square metres, and PPA/self-consumption/export outputs. Keep backward compatibility for existing lead records where feasible.

- [ ] **Step 5: Run the targeted tests and TypeScript checks**

Run: `npm test -- src/lib/solar-assumptions.test.ts --run`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit the governed assumptions/types change**

```bash
git add src/lib/solar-assumptions.ts src/lib/solar-assumptions.test.ts src/lib/solar-engine.ts src/lib/lead-types.ts
git commit -m "feat: govern solar calculation assumptions"
```

---

## Task 2: Replace the simplified solar engine with deterministic PPA pre-feasibility calculations

**Files:**
- Modify: `src/lib/solar-engine.ts`
- Create: `src/lib/solar-engine.test.ts`
- Create: `src/lib/solar-scenarios.test.ts`

**Interfaces:**
- Consumes `SolarAssumptionSnapshot`.
- Produces `SolarAssessmentInput`, `SolarAssessmentResult`, and `calculateSolarAssessment(input, assumptions)`.

- [ ] **Step 1: Write failing unit tests for core formulas**

```ts
import { describe, expect, it } from "vitest";
import { calculateSolarAssessment } from "@/lib/solar-engine";
import { getSolarAssumptionSnapshot } from "@/lib/solar-assumptions";

describe("calculateSolarAssessment", () => {
  it("calculates annual consumption from monthly kWh", () => {
    const result = calculateSolarAssessment(
      { monthlyConsumptionKwh: 100_000, usableRoofAreaM2: 5_000 },
      getSolarAssumptionSnapshot(),
    );
    expect(result.annualConsumptionKwh).toBe(1_200_000);
  });

  it("never produces negative export", () => {
    const result = calculateSolarAssessment(
      { monthlyConsumptionKwh: 100_000, usableRoofAreaM2: 5_000 },
      getSolarAssumptionSnapshot(),
    );
    expect(result.exportKwh).toBeGreaterThanOrEqual(0);
  });
});
```

- [ ] **Step 2: Run tests and verify they fail before implementation**

Run: `npm test -- src/lib/solar-engine.test.ts --run`
Expected: FAIL because the new API is not implemented.

- [ ] **Step 3: Implement the minimal deterministic engine**

The engine must expose explicit functions for:

```ts
annualConsumptionFromMonthlyKwh(monthlyKwh: number): number
annualConsumptionFromBill(monthlyBillBdt: number, tariffBdtPerKwh: number): number
calculateCapacityRange(input, assumptions): EstimateBand
calculateGeneration(capacityKwp: number, yieldKwhPerKwp: number): number
calculateSelfConsumption(generationKwh: number, ratio: number): number
calculateExport(generationKwh: number, selfConsumedKwh: number): number
calculatePpaCost(selfConsumedKwh: number, ppaRateBdtPerKwh: number): number
calculateAvoidedEnergyCost(selfConsumedKwh: number, avoidedRateBdtPerKwh: number): number
calculateCustomerSavings(avoidedCostBdt: number, ppaCostBdt: number): number
calculateSolarAssessment(input, assumptions): SolarAssessmentResult
```

The engine must never silently substitute a universal tariff, PPA price, export value, or financing assumption. Missing required commercial assumptions produce a clearly typed unavailable/indicative result rather than fabricated precision.

- [ ] **Step 4: Add scenario fixtures for industrial, school, commercial, high-surplus, bill-only, existing-solar, and generator cases**

Each fixture must assert qualitative invariants such as non-negative generation/export, ordered low/base/high ranges, and monotonic behavior where appropriate.

- [ ] **Step 5: Run calculation tests**

Run: `npm test -- src/lib/solar-engine.test.ts src/lib/solar-scenarios.test.ts --run`
Expected: PASS.

- [ ] **Step 6: Commit the calculation engine**

```bash
git add src/lib/solar-engine.ts src/lib/solar-engine.test.ts src/lib/solar-scenarios.test.ts
git commit -m "feat: add deterministic solar ppa assessment engine"
```

---

## Task 3: Extend assessment persistence and lead contracts

**Files:**
- Modify: `src/lib/lead-types.ts`
- Modify: `src/lib/lead-service.ts`
- Modify: `supabase/functions/_shared/assessment-session.ts`
- Modify: `supabase/functions/start-assessment-session/index.ts`
- Modify: `supabase/functions/submit-lead/index.ts`
- Create: `supabase/migrations/20260825_extend_solar_assessments.sql`
- Create: `supabase/functions/solar-assessment-sync/index.ts`
- Create: `supabase/functions/solar-assessment-sync/index.test.ts`

**Interfaces:**
- Consumes `SolarAssessmentResult` and `OpportunityScore`.
- Produces persisted assessment records containing answers, result, confidence, assumptions version, and score.

- [ ] **Step 1: Write the failing schema/contract test**

```ts
import { describe, expect, it } from "vitest";
import { createCalculatorAssessmentSessionInput } from "@/lib/lead-types";

describe("calculator assessment payload", () => {
  it("persists assumptions version and metric units", () => {
    const payload = createCalculatorAssessmentSessionInput(
      { name: "Test User", phone: "01712345678" },
      {
        assumptionsVersion: "test-v1",
        usableRoofAreaM2: 1000,
        monthlyConsumptionKwh: 10000,
        result: { recommendedCapacityKwp: 100, annualGenerationKwh: 130000 },
      },
    );
    expect(payload.calculatorContext?.assumptionsVersion).toBe("test-v1");
    expect(payload.calculatorContext?.usableRoofAreaM2).toBe(1000);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails because the payload shape is not yet supported**

Run: `npm test -- src/lib/lead-types.test.ts --run`
Expected: FAIL with missing calculator-context properties.

- [ ] **Step 3: Extend the assessment schema and migration**

Add nullable/typed fields for:
- facility type
- district/location
- monthly bill
- monthly kWh
- sanctioned load
- roof area m²
- objective
- existing solar
- generator data
- solar result
- commercial result
- confidence
- assumptions version
- opportunity score

Do not remove fields required by existing web-feasibility or WhatsApp flows.

- [ ] **Step 4: Implement the persistence handoff using the existing assessment-session flow**

The new calculator must call the existing session endpoint and store the calculation snapshot. Do not create a second lead database.

- [ ] **Step 5: Run schema/type tests**

Run: `npm test -- src/lib/lead-types.test.ts src/lib/solar-assessment-sync.test.ts --run`
Expected: PASS.

- [ ] **Step 6: Commit the persistence changes**

```bash
git add src/lib/lead-types.ts src/lib/lead-service.ts supabase/functions/_shared/assessment-session.ts supabase/functions/start-assessment-session/index.ts supabase/functions/submit-lead/index.ts supabase/functions/solar-assessment-sync/index.ts supabase/functions/solar-assessment-sync/index.test.ts supabase/migrations/20260825_extend_solar_assessments.sql
git commit -m "feat: persist solar intelligence assessments"
```

---

## Task 4: Implement opportunity scoring as a pure, testable module

**Files:**
- Create: `src/lib/opportunity-score.ts`
- Create: `src/lib/opportunity-score.test.ts`
- Modify: `src/lib/lead-types.ts`

**Interfaces:**
- Consumes a normalized assessment.
- Produces `{ score: number; band: "hot" | "warm" | "nurture"; factors: string[] }`.

- [ ] **Step 1: Write failing score tests**

```ts
import { describe, expect, it } from "vitest";
import { scoreSolarOpportunity } from "@/lib/opportunity-score";

describe("scoreSolarOpportunity", () => {
  it("prioritizes large industrial PPA candidates", () => {
    const result = scoreSolarOpportunity({
      facilityType: "factory",
      estimatedCapacityKwp: 500,
      ppaInterest: true,
      daytimeLoadConfidence: "high",
      dataCompleteness: 0.9,
    });
    expect(result.band).toBe("hot");
  });
});
```

- [ ] **Step 2: Run the targeted test and verify failure**

Run: `npm test -- src/lib/opportunity-score.test.ts --run`
Expected: FAIL because the module is not implemented.

- [ ] **Step 3: Implement deterministic scoring**

Use bounded contributions for facility fit, project size, PPA intent, data completeness, daytime load, generator use, and location/project fit. Clamp score to 0–100. Keep the factors human-readable for internal sales review.

- [ ] **Step 4: Run scoring tests**

Run: `npm test -- src/lib/opportunity-score.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit scoring**

```bash
git add src/lib/opportunity-score.ts src/lib/opportunity-score.test.ts src/lib/lead-types.ts
git commit -m "feat: score solar ppa opportunities"
```

---

## Task 5: Replace the current calculator UI with the simple progressive flow

**Files:**
- Modify: `src/components/home/SolarCalculatorFunnel.tsx`
- Modify: `src/components/AssessmentCtas.tsx`
- Modify: `src/pages/Index.tsx` only if route/anchor integration requires it
- Create: `src/components/home/solar-intelligence/AssessmentProgress.tsx`
- Create: `src/components/home/solar-intelligence/FacilityStep.tsx`
- Create: `src/components/home/solar-intelligence/LocationStep.tsx`
- Create: `src/components/home/solar-intelligence/EnergyStep.tsx`
- Create: `src/components/home/solar-intelligence/RoofStep.tsx`
- Create: `src/components/home/solar-intelligence/ObjectiveStep.tsx`
- Create: `src/components/home/solar-intelligence/ResultsStep.tsx`
- Create: `src/components/home/solar-intelligence/ContactStep.tsx`
- Create: `src/components/home/solar-intelligence/assessment-copy.ts`

**Interfaces:**
- Consumes the typed assessment state and `calculateSolarAssessment()`.
- Produces a result state and submits through the existing assessment session service.

- [ ] **Step 1: Write component tests for navigation and progressive disclosure**

```tsx
it("starts with facility selection and does not ask for contact data", async () => {
  render(<SolarCalculatorFunnel />);
  expect(screen.getByText(/what type of facility/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
});

it("allows unknown roof area without blocking the assessment", async () => {
  // select facility, location, energy, choose "I don't know" for roof,
  // then verify the objective step remains reachable.
});
```

- [ ] **Step 2: Run UI tests and verify failure**

Run: `npm test -- src/components/home/SolarCalculatorFunnel.test.tsx --run`
Expected: FAIL because the current calculator is still the old bill/roof slider flow.

- [ ] **Step 3: Implement the multi-step state machine**

Use a single assessment state object. Steps are `facility → location → energy → roof → objective → results → contact`. Back navigation preserves all answers. Unknown optional inputs remain nullable.

- [ ] **Step 4: Implement mobile-first visual hierarchy**

Use the existing Tailwind/theme tokens. Keep one primary question per screen, a compact progress indicator, large touch targets, and a single primary action. Do not introduce a dashboard, dense table, or technical jargon.

- [ ] **Step 5: Implement results display**

Show only capacity, annual generation, potential annual savings, and Netso PPA proposition. Use ranges when uncertainty is material. Display the mandatory preliminary-estimate disclaimer.

- [ ] **Step 6: Run component tests**

Run: `npm test -- src/components/home/SolarCalculatorFunnel.test.tsx --run`
Expected: PASS.

- [ ] **Step 7: Commit the public UI**

```bash
git add src/components/home/SolarCalculatorFunnel.tsx src/components/AssessmentCtas.tsx src/pages/Index.tsx src/components/home/solar-intelligence
git commit -m "feat: launch simple netso solar intelligence funnel"
```

---

## Task 6: Connect results to assessment session and WhatsApp handoff

**Files:**
- Modify: `src/components/home/SolarCalculatorFunnel.tsx`
- Modify: `src/lib/lead-types.ts`
- Modify: `src/lib/lead-service.ts`
- Modify: `src/lib/whatsapp.ts` only if the new calculator summary fields require it
- Modify: `supabase/functions/start-assessment-session/index.ts`

**Interfaces:**
- Consumes completed `SolarAssessmentResult` and contact details.
- Produces a persisted assessment session and existing WhatsApp continuation behavior.

- [ ] **Step 1: Write failing integration tests**

Test that a completed assessment:
1. submits the calculation snapshot,
2. stores assumptions version,
3. receives a session id,
4. redirects to the existing WhatsApp continuation when configured.

- [ ] **Step 2: Run integration tests and verify failure**

Run: `npm test -- src/lib/lead-service.test.ts --run`
Expected: FAIL until the new calculator context is wired.

- [ ] **Step 3: Implement the handoff**

Use `startAssessmentSession()` and the existing `buildWhatsAppStartUrl()` path. Include only the customer-relevant calculation summary in the handoff; never include private assumptions metadata or opportunity score in the customer-facing URL.

- [ ] **Step 4: Run integration tests**

Run: `npm test -- src/lib/lead-service.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit the integration**

```bash
git add src/components/home/SolarCalculatorFunnel.tsx src/lib/lead-types.ts src/lib/lead-service.ts src/lib/whatsapp.ts supabase/functions/start-assessment-session/index.ts
git commit -m "feat: connect solar assessment lead handoff"
```

---

## Task 7: Add release-level validation and regression coverage

**Files:**
- Create: `tests/e2e/solar-intelligence.spec.ts`
- Modify: `package.json` only if a dedicated test script is required
- Modify: `docs/superpowers/specs/2026-08-25-netso-solar-intelligence-design.md` only if implementation reveals an approved requirement correction

**Interfaces:**
- Consumes the production assessment route and produces browser-level verification evidence.

- [ ] **Step 1: Write the end-to-end test**

Cover:
- landing into assessment
- facility selection
- location selection
- bill/kWh selection
- unknown roof path
- results rendering
- contact validation
- successful assessment handoff
- no exposure of opportunity score/private assumptions

- [ ] **Step 2: Run the E2E test and fix test harness issues only as required**

Run: `npm run test:e2e -- tests/e2e/solar-intelligence.spec.ts`
Expected: PASS against the local production build.

- [ ] **Step 3: Run the full release verification**

Run: `npm run verify:release`
Expected: PASS with no TypeScript, lint, unit-test, SEO, or E2E regressions.

- [ ] **Step 4: Review the final diff for scope discipline**

Confirm that no unrelated homepage sections, brand copy, CRM flows, or existing WhatsApp flows were unnecessarily changed.

- [ ] **Step 5: Commit verification updates**

```bash
git add tests/e2e/solar-intelligence.spec.ts package.json docs/superpowers/specs/2026-08-25-netso-solar-intelligence-design.md
git commit -m "test: verify solar intelligence release"
```

---

## Self-review checklist

- **Spec coverage:** all product, UX, calculation, governance, persistence, scoring, security, testing, and KPI requirements map to Tasks 1–7.
- **Placeholder scan:** no implementation task is permitted to ship invented regulatory/commercial numbers; the plan explicitly blocks that behavior.
- **Type consistency:** `SolarAssumptionSnapshot` feeds `calculateSolarAssessment`; its result feeds calculator context; calculator context feeds assessment session persistence; opportunity scoring consumes normalized assessment data.
- **Existing-system reuse:** current `SolarCalculatorFunnel`, `solar-engine`, lead schemas, Supabase assessment session, and WhatsApp handoff are evolved rather than duplicated.
- **Scope discipline:** AI OCR, satellite mapping, battery, private wheeling, IDCOL underwriting, and NEOS integration remain deferred.
