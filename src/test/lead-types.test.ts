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

  it("attaches private bill extraction draft to calculator handoff payload", () => {
    const payload = createCalculatorLeadPayload(
      {
        preferredLanguage: "en",
        name: "Rashid Ali",
        phone: "01912345678",
      },
      {
        calculatorBillEstimate: 25000,
        calculatorAreaEstimate: 3000,
        propertySegment: "c_and_i",
        region: "chattogram",
        billExtraction: {
          publicId: "bill-cgs-2026-05",
          billingPeriod: "2026-04",
          billingDemandKva: 45,
          monthlyConsumptionKwh: 2200,
          confirmedByUser: true,
          netMeteringObserved: false,
          documentStoragePath: "private/bills/bill-cgs-2026-05.pdf",
        },
        modelOutput: {
          systemKwp: 19.5,
          systemKwpRange: { low: 16.5, midpoint: 19.5, high: 22.5 },
          monthlySavingsBdt: 14500,
          monthlySavingsBdtRange: { low: 12000, midpoint: 14500, high: 17000 },
          annualSavingsBdt: 174000,
          ppaTermSavingsBdt: 3480000,
          ppaTermSavingsBdtRange: { low: 3000000, midpoint: 3480000, high: 4000000 },
          co2SavedTonnes: 16.4,
          annualGenerationKwh: 28185,
          effectiveDisplacedRateBdt: 12.98,
          savingsMarginPct: 23.0,
          confidenceLabel: "resco_ppa",
          assumptions: ["Zero upfront CAPEX under Netso PPA."],
          disclaimer: "Preliminary planning estimate. Subject to site review.",
        },
      },
    );

    expect(payload.calculatorContext?.billExtraction).toBeDefined();
    expect(payload.calculatorContext?.billExtraction?.confirmedByUser).toBe(true);
    expect(payload.calculatorContext?.region).toBe("chattogram");
    expect(payload.evidence).toHaveLength(1);
    expect(payload.evidence[0].kind).toBe("electric_bill");
    expect(payload.evidence[0].storagePath).toBe("private/bills/bill-cgs-2026-05.pdf");
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
