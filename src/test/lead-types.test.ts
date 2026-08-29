import { describe, expect, it } from "vitest";
import {
  createCalculatorLeadPayload,
  createFeasibilityLeadPayload,
  createAssessmentSessionPayload,
} from "@/lib/lead-types";

describe("assessment session payload builders", () => {
  it("maps feasibility form answers into a session-start payload", () => {
    const payload = createFeasibilityLeadPayload({
      preferredLanguage: "en",
      name: "Amina Rahman",
      phone: "01712345678",
      address: "House 11, Road 4, Dhanmondi, Dhaka",
      district: "Dhaka",
      neighborhood: "Dhanmondi",
      propertyType: "Single-family home",
      ownershipStatus: "Owner",
      roofSize: "1,000–2,000 sq ft",
      roofAccessReadiness: "Ready now",
      shadingStatus: "Mostly clear",
      targetInstallTimeline: "Within 3 months",
      primaryGoal: "Lower daytime electricity cost",
      monthlyBillRange: "BDT 7,000–15,000",
      monthlyBillAmount: 12000,
      servicePhase: "three_phase",
    }) as Record<string, unknown>;

    expect(payload).toMatchObject({
      entryPoint: "web_feasibility",
      preferredLanguage: "en",
      contact: {
        name: "Amina Rahman",
        phone: "01712345678",
        preferredChannel: "whatsapp",
      },
      answers: {
        address: "House 11, Road 4, Dhanmondi, Dhaka",
        district: "Dhaka",
        neighborhood: "Dhanmondi",
        propertyType: "Single-family home",
        buildingType: "Single-family home",
        ownershipStatus: "Owner",
        roofSizeBand: "1,000–2,000 sq ft",
        roofAccessReadiness: "Ready now",
        shadingStatus: "Mostly clear",
        targetInstallTimeline: "Within 3 months",
        primaryGoal: "Lower daytime electricity cost",
        monthlyBillBand: "BDT 7,000–15,000",
        monthlyBillAmount: 12000,
        servicePhase: "three_phase",
      },
    });
    expect(payload).not.toHaveProperty("source");
  });

  it("builds a calculator handoff payload with proof-first estimate context", () => {
    const payload = createCalculatorLeadPayload(
      {
        preferredLanguage: "bn",
        name: "Farhan Kabir",
        phone: "01812345678",
        address: "Banani, Dhaka",
      },
      {
        calculatorBillEstimate: 12000,
        calculatorAreaEstimate: 1800,
        modelOutput: {
          systemKwp: 11.4,
          systemKwpRange: { low: 9.7, midpoint: 11.4, high: 13.1 },
          monthlySavingsBdt: 8760,
          monthlySavingsBdtRange: { low: 7020, midpoint: 8760, high: 10110 },
          annualSavingsBdt: 105120,
          ppaTermSavingsBdt: 2102400,
          ppaTermSavingsBdtRange: { low: 1800000, midpoint: 2102400, high: 2400000 },
          co2SavedTonnes: 10.2,
          annualGenerationKwh: 15280,
          effectiveDisplacedRateBdt: 12.98,
          savingsMarginPct: 23.0,
          confidenceLabel: "resco_ppa",
          assumptions: [
            "Zero upfront CAPEX under Netso PPA.",
            "Roof utilisation capped at 65%.",
          ],
          disclaimer: "Preliminary planning estimate. Subject to site review.",
        },
      },
    ) as Record<string, unknown>;

    expect(payload).toMatchObject({
      entryPoint: "calculator_handoff",
      preferredLanguage: "bn",
      contact: {
        name: "Farhan Kabir",
        phone: "01812345678",
      },
      answers: {
        address: "Banani, Dhaka",
      },
      calculatorContext: {
        estimatedMonthlyBillBdt: 12000,
        rooftopAreaSqft: 1800,
        estimate: {
          confidenceLabel: "resco_ppa",
        },
      },
    });
    expect(payload).not.toHaveProperty("modelOutput");
    expect(payload).not.toHaveProperty("source");
  });

  it("exposes assessment lifecycle enums for orchestration layers", async () => {
    const module = await import("@/lib/lead-types");
    const qualificationStatusSchema = (module as Record<string, unknown>).qualificationStatusSchema as
      | { parse: (value: string) => string }
      | undefined;
    const inspectionReviewStateSchema = (module as Record<string, unknown>).inspectionReviewStateSchema as
      | { parse: (value: string) => string }
      | undefined;

    expect(typeof qualificationStatusSchema?.parse).toBe("function");
    expect(typeof inspectionReviewStateSchema?.parse).toBe("function");
    expect(qualificationStatusSchema?.parse("awaiting_evidence")).toBe("awaiting_evidence");
    expect(inspectionReviewStateSchema?.parse("inspection_pending")).toBe("inspection_pending");
  });

  it("requires expanded fallback intake fields before a web assessment can be created", () => {
    expect(() =>
      createAssessmentSessionPayload({
        entryPoint: "web_feasibility",
        preferredLanguage: "en",
        contact: {
          name: "Amina Rahman",
          phone: "01712345678",
          preferredChannel: "whatsapp",
        },
        answers: {
          address: "Dhaka",
          propertyType: "Single-family home",
        },
        evidence: [],
      }),
    ).toThrow();
  });
});
