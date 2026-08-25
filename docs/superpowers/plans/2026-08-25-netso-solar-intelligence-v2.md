# Netso Solar Intelligence Implementation Plan v2

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hard-coded savings calculator with a simple mobile-first Netso Solar Intelligence assessment backed by a deterministic, versioned PPA pre-feasibility engine and the existing Supabase assessment/lead workflow.

**Architecture:** Keep the existing React/Vite/Supabase stack. Evolve the existing `SolarCalculatorFunnel`, `solar-engine`, lead schemas, assessment session, and WhatsApp handoff rather than creating a parallel system. The public UI stays simple; all calculation logic lives in tested TypeScript modules and consumes a versioned assumption snapshot.

**Tech Stack:** React 18, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Zod, Vitest, Playwright, Supabase Edge Functions/Postgres.

**Spec:** `docs/superpowers/specs/2026-08-25-netso-solar-intelligence-design.md`

## Global Constraints

- Quick Assessment target: 60–120 seconds.
- Mobile-first; one primary question per screen.
- Contact capture occurs after the user sees the preliminary result.
- PPA/RESCO is the primary rooftop commercial pathway; NEM/export is secondary.
- Core mathematics is deterministic; AI is excluded from core financial calculations.
- No universal tariff, PPA price, export price, yield, financing term, or self-consumption ratio may be silently hard-coded.
- Notion's Netso Assumptions Registry is the governance source. Runtime uses a versioned snapshot, not a live Notion call per calculation.
- The current registry confirms: CGS PPA baseline BDT 10/kWh; commercial PPA target BDT 12/kWh with BDT 10–13/kWh range; educational PPA target BDT 10/kWh with BDT 8.5–10/kWh range; CAPEX underwriting base BDT 60,000/kW with BDT 55,000–65,000/kW range; NEM preliminary capacity ceiling 100% of sanctioned load; IDCOL 80% debt/20% equity is only a preliminary public baseline. These values remain product/context-specific and must carry source/confidence metadata.
- Verified CGS engineering evidence gives 115,632 kWh/year at 80.04 kWp, or 1,444.7 kWh/kWp/year, as a Chattogram P90 underwriting benchmark. This must not be promoted to a universal Bangladesh yield without further evidence.
- Final project feasibility requires site, structural, electrical, regulatory, and commercial validation.

---

## Task 1: Create the governed assumption snapshot

**Files:**
- Create: `src/lib/solar-assumptions.ts`
- Create: `src/lib/solar-assumptions.test.ts`
- Modify: `src/lib/lead-types.ts`

**Interfaces:** `SolarAssumptionSnapshot`, `SolarAssumptionValue`, `getSolarAssumptionSnapshot()`.

- [ ] **Step 1: Write the failing schema test**

```ts
import { describe, expect, it } from "vitest";
import { getSolarAssumptionSnapshot } from "@/lib/solar-assumptions";

describe("solar assumptions", () => {
  it("returns only approved, source-traceable assumptions", () => {
    const snapshot = getSolarAssumptionSnapshot();
    expect(snapshot.version).toBeTruthy();
    expect(snapshot.values.every((item) => item.status === "active")).toBe(true);
    expect(snapshot.values.every((item) => item.source)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/lib/solar-assumptions.test.ts --run`
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the snapshot from verified Notion values**

The snapshot must contain the current approved entries for CGS PPA, commercial PPA, educational PPA, CAPEX underwriting, and NEM capacity ceiling. Add the verified CGS P90 yield as a **Chattogram/CGS-specific** engineering input. Do not invent low/high ranges where Notion does not contain them; represent a single-value assumption explicitly.

Each entry must retain `name`, `value`, `unit`, `confidence`, `sourceTier`, `evidence`, `status`, and review/source dates. The registry schema is the authority for these fields.

- [ ] **Step 4: Extend lead schemas with `assumptionsVersion` and input/output confidence metadata**

- [ ] **Step 5: Run tests and build**

Run: `npm test -- src/lib/solar-assumptions.test.ts --run`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/solar-assumptions.ts src/lib/solar-assumptions.test.ts src/lib/lead-types.ts
git commit -m "feat: add governed solar assumption snapshot"
```

---

## Task 2: Replace `solar-engine.ts` with a deterministic PPA pre-feasibility engine

**Files:**
- Modify: `src/lib/solar-engine.ts`
- Create: `src/lib/solar-engine.test.ts`
- Create: `src/lib/solar-scenarios.test.ts`

**Interfaces:**
- `SolarAssessmentInput`
- `SolarAssessmentResult`
- `calculateSolarAssessment(input, assumptions)`
- Pure helper functions for consumption, capacity, generation, self-consumption, export, PPA cost, avoided cost, and savings.

- [ ] **Step 1: Write failing tests for the core formulas**

```ts
it("annualizes monthly consumption", () => {
  expect(annualConsumptionFromMonthlyKwh(100_000)).toBe(1_200_000);
});

it("keeps export non-negative", () => {
  expect(calculateExport(100_000, 120_000)).toBe(0);
});
```

- [ ] **Step 2: Run targeted tests and verify failure**

Run: `npm test -- src/lib/solar-engine.test.ts --run`
Expected: FAIL because the new functions are not implemented.

- [ ] **Step 3: Implement deterministic calculations**

Use monthly kWh when supplied. If only bill is supplied, require an applicable tariff context; otherwise return an indicative result that explicitly lacks reliable consumption conversion. Size solar using consumption, usable roof area, and applicable load constraints. Use the approved yield only when its geographic/evidence scope matches the assessment; otherwise mark yield as requiring validation.

Self-consumption and export must remain separate. PPA savings must compare avoided self-consumed energy cost against the project-specific PPA rate. Export must never be valued as avoided retail consumption.

- [ ] **Step 4: Add scenario fixtures**

Cover industrial/RMG, school, commercial building, high-surplus, bill-only, existing-solar, generator, and missing-roof-data cases. Assert non-negative outputs, ordered ranges where ranges exist, and explicit lower-confidence states when key evidence is absent.

- [ ] **Step 5: Run calculation tests**

Run: `npm test -- src/lib/solar-engine.test.ts src/lib/solar-scenarios.test.ts --run`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/solar-engine.ts src/lib/solar-engine.test.ts src/lib/solar-scenarios.test.ts
git commit -m "feat: replace solar savings model with ppa assessment engine"
```

---

## Task 3: Extend existing assessment persistence

**Files:**
- Modify: `src/lib/lead-types.ts`
- Modify: `src/lib/lead-service.ts`
- Modify: `supabase/functions/_shared/assessment-session.ts`
- Modify: `supabase/functions/start-assessment-session/index.ts`
- Modify: `supabase/functions/submit-lead/index.ts`
- Create: `supabase/migrations/20260825_extend_solar_assessments.sql`

**Interfaces:** Existing assessment-session API remains the entry point. Calculator context gains normalized inputs, `SolarAssessmentResult`, confidence, assumptions version, and opportunity score.

- [ ] **Step 1: Write the failing contract test**

```ts
it("includes the assumptions version in calculator context", () => {
  const payload = createCalculatorAssessmentSessionInput(testValues);
  expect(payload.calculatorContext?.assumptionsVersion).toBe("test-v1");
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/lib/lead-types.test.ts --run`
Expected: FAIL until the new calculator context exists.

- [ ] **Step 3: Add nullable fields and migration**

Persist facility type, location, energy inputs, roof area m², objective, existing solar/generator data where supplied, calculation outputs, confidence, assumptions version, and score. Preserve compatibility with existing web-feasibility and WhatsApp intake.

- [ ] **Step 4: Wire the existing session endpoint**

Do not create a second lead database or second assessment lifecycle.

- [ ] **Step 5: Run type and persistence tests**

Run: `npm test -- src/lib/lead-types.test.ts --run`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/lead-types.ts src/lib/lead-service.ts supabase/functions/_shared/assessment-session.ts supabase/functions/start-assessment-session/index.ts supabase/functions/submit-lead/index.ts supabase/migrations/20260825_extend_solar_assessments.sql
git commit -m "feat: persist solar intelligence assessment context"
```

---

## Task 4: Add internal opportunity scoring

**Files:**
- Create: `src/lib/opportunity-score.ts`
- Create: `src/lib/opportunity-score.test.ts`
- Modify: `src/lib/lead-types.ts`

**Interfaces:** `scoreSolarOpportunity(input) -> { score, band, factors }`.

- [ ] **Step 1: Write a failing test for a strong factory/PPA lead**

```ts
it("classifies a large factory with strong PPA intent as hot", () => {
  const result = scoreSolarOpportunity({ facilityType: "factory", estimatedCapacityKwp: 500, ppaInterest: true, dataCompleteness: 0.9 });
  expect(result.band).toBe("hot");
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/lib/opportunity-score.test.ts --run`
Expected: FAIL because the scorer does not exist.

- [ ] **Step 3: Implement bounded scoring**

Score facility fit, project size, PPA intent, data completeness, daytime load, generator use, and project fit. Clamp to 0–100. Store human-readable factors internally. Never expose the numeric score publicly.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/lib/opportunity-score.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/opportunity-score.ts src/lib/opportunity-score.test.ts src/lib/lead-types.ts
git commit -m "feat: score netso solar opportunities"
```

---

## Task 5: Replace the existing public calculator UI

**Files:**
- Modify: `src/components/home/SolarCalculatorFunnel.tsx`
- Create: `src/components/home/solar-intelligence/AssessmentProgress.tsx`
- Create: `src/components/home/solar-intelligence/FacilityStep.tsx`
- Create: `src/components/home/solar-intelligence/LocationStep.tsx`
- Create: `src/components/home/solar-intelligence/EnergyStep.tsx`
- Create: `src/components/home/solar-intelligence/RoofStep.tsx`
- Create: `src/components/home/solar-intelligence/ObjectiveStep.tsx`
- Create: `src/components/home/solar-intelligence/ResultsStep.tsx`
- Create: `src/components/home/solar-intelligence/ContactStep.tsx`
- Create: `src/components/home/solar-intelligence/assessment-copy.ts`

**Interfaces:** UI consumes the typed assessment state and deterministic engine; contact submission uses the existing assessment service.

- [ ] **Step 1: Write failing UI tests**

```tsx
it("starts with facility selection and no contact form", () => {
  render(<SolarCalculatorFunnel />);
  expect(screen.getByText(/what type of facility/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/phone/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/home/SolarCalculatorFunnel.test.tsx --run`
Expected: FAIL because the current component starts with bill/roof sliders.

- [ ] **Step 3: Implement the seven-screen flow**

`facility → location → energy → roof → objective → results → contact`.

Use large touch targets, a compact progress indicator, one primary question per screen, back navigation, and nullable unknown inputs. Do not show technical model parameters.

- [ ] **Step 4: Implement results**

Show estimated capacity, annual generation, potential annual savings, and the Netso PPA proposition. Use a range only when the underlying assumption has an approved range. Show the mandatory preliminary-estimate disclaimer.

- [ ] **Step 5: Run component tests**

Run: `npm test -- src/components/home/SolarCalculatorFunnel.test.tsx --run`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/SolarCalculatorFunnel.tsx src/components/home/solar-intelligence
git commit -m "feat: rebuild netso solar intelligence ui"
```

---

## Task 6: Connect lead capture and WhatsApp handoff

**Files:**
- Modify: `src/components/home/SolarCalculatorFunnel.tsx`
- Modify: `src/lib/lead-types.ts`
- Modify: `src/lib/lead-service.ts`
- Modify: `src/lib/whatsapp.ts` only if new customer-safe summary fields are needed

**Interfaces:** Completed assessment → existing `startAssessmentSession()` → existing WhatsApp continuation.

- [ ] **Step 1: Write failing handoff test**

```ts
it("submits the completed calculation snapshot before WhatsApp handoff", async () => {
  const session = await submitCompletedAssessment(testAssessment);
  expect(session.id).toBeTruthy();
  expect(session.calculatorContext?.assumptionsVersion).toBe(testAssessment.assumptionsVersion);
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/lib/lead-service.test.ts --run`
Expected: FAIL until the new context is wired.

- [ ] **Step 3: Implement the existing session/WhatsApp path**

Pass the assessment snapshot and customer-safe summary. Never put private assumptions metadata or opportunity score in a public URL.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/lib/lead-service.test.ts --run`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/SolarCalculatorFunnel.tsx src/lib/lead-types.ts src/lib/lead-service.ts src/lib/whatsapp.ts
git commit -m "feat: connect solar intelligence lead handoff"
```

---

## Task 7: End-to-end and release verification

**Files:**
- Create: `tests/e2e/solar-intelligence.spec.ts`

- [ ] **Step 1: Write the E2E flow**

Verify facility → location → energy → unknown roof → objective → result → contact validation → assessment submission. Verify the public UI does not expose opportunity score or private assumption metadata.

- [ ] **Step 2: Run E2E**

Run: `npm run test:e2e -- tests/e2e/solar-intelligence.spec.ts`
Expected: PASS against the production build.

- [ ] **Step 3: Run release verification**

Run: `npm run verify:release`
Expected: PASS for build, lint, unit tests, SEO verification, and E2E.

- [ ] **Step 4: Review scope**

Confirm no unrelated Netso homepage, CRM, WhatsApp, brand, or SEO behavior changed.

- [ ] **Step 5: Commit verification coverage**

```bash
git add tests/e2e/solar-intelligence.spec.ts
git commit -m "test: verify solar intelligence end to end"
```

---

## Self-review

- **Spec coverage:** Tasks 1–7 cover product flow, deterministic calculation, assumptions governance, persistence, scoring, UI, handoff, security, and release validation.
- **No invented engineering values:** the only concrete yield used by the plan is the verified CGS Chattogram P90 benchmark, and it is explicitly scoped to that evidence rather than generalized.
- **No invented commercial values:** the plan uses the current Notion registry values and preserves their confidence/context rather than turning them into universal customer pricing.
- **Type flow:** assumption snapshot → calculation engine → assessment result → calculator context → persisted assessment → opportunity score → sales handoff.
- **Scope:** AI OCR, satellite mapping, battery optimization, private wheeling simulation, IDCOL automation, and full NEOS integration remain deferred.
