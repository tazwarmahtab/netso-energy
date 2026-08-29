import { FunctionsHttpError } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockInvoke = vi.fn();

vi.mock("@/lib/supabase-client", () => ({
  getSupabaseClient: () => ({
    functions: {
      invoke: mockInvoke,
    },
  }),
}));

describe("assessment session service", () => {
  beforeEach(() => {
    vi.resetModules();
    mockInvoke.mockReset();
  });

  it("starts an assessment session through the new backend function and hides transport internals", async () => {
    mockInvoke.mockResolvedValue({
      data: {
        success: true,
        nextStep: "continue_on_whatsapp",
        whatsappStatus: "sent",
        session: {
          id: "e3d5979d-0b2f-47eb-a6e3-af20bf53971c",
          entryPoint: "calculator_handoff",
          preferredLanguage: "en",
          qualificationStatus: "in_progress",
          inspectionReviewState: "manual_review",
          qualificationScore: 44,
          humanReviewOutcome: "pending",
          contact: {
            name: "Farhan Kabir",
            phone: "01812345678",
            preferredChannel: "whatsapp",
          },
          answers: {
            address: "Banani, Dhaka",
          },
          calculatorContext: {
            estimatedMonthlyBillBdt: 12000,
            rooftopAreaSqft: 1800,
            estimate: {
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
              assumptions: ["Uses conservative utilisation assumptions."],
              disclaimer: "Preliminary estimate only.",
            },
          },
        },
      },
      error: null,
    });

    const serviceModule = await import("@/lib/lead-service");
    const startAssessmentSession = (serviceModule as Record<string, unknown>).startAssessmentSession as
      | ((payload: unknown) => Promise<Record<string, unknown>>)
      | undefined;

    expect(typeof startAssessmentSession).toBe("function");

    const result = await startAssessmentSession?.({
      entryPoint: "calculator_handoff",
      preferredLanguage: "en",
      contact: {
        name: "Farhan Kabir",
        phone: "01812345678",
        preferredChannel: "whatsapp",
      },
      answers: {
        address: "Banani, Dhaka",
      },
      calculatorContext: {
        estimatedMonthlyBillBdt: 12000,
        rooftopAreaSqft: 1800,
        estimate: {
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
          assumptions: ["Uses conservative utilisation assumptions."],
          disclaimer: "Preliminary estimate only.",
        },
      },
    });

    expect(mockInvoke).toHaveBeenCalledWith("start-assessment-session", {
      body: expect.objectContaining({
        entryPoint: "calculator_handoff",
      }),
    });
    expect(result).toMatchObject({
      success: true,
      nextStep: "continue_on_whatsapp",
      session: {
        id: "e3d5979d-0b2f-47eb-a6e3-af20bf53971c",
        qualificationStatus: "in_progress",
        inspectionReviewState: "manual_review",
      },
    });
    expect(result).not.toHaveProperty("whatsappStatus");
  });

  it("flags a missing backend function as a backend availability problem", async () => {
    mockInvoke.mockResolvedValue({
      data: null,
      error: new FunctionsHttpError(
        new Response(
          JSON.stringify({
            code: "NOT_FOUND",
            message: "Requested function was not found",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      ),
    });

    const serviceModule = await import("@/lib/lead-service");
    const startAssessmentSession = (serviceModule as Record<string, unknown>).startAssessmentSession as
      | ((payload: unknown) => Promise<Record<string, unknown>>)
      | undefined;
    const AssessmentBackendUnavailableError = (serviceModule as Record<string, unknown>)
      .AssessmentBackendUnavailableError as
      | (new (...args: never[]) => Error)
      | undefined;

    await expect(
      startAssessmentSession?.({
        entryPoint: "calculator_handoff",
        preferredLanguage: "en",
        contact: {
          name: "Farhan Kabir",
          phone: "01812345678",
          preferredChannel: "whatsapp",
        },
        answers: {
          address: "Banani, Dhaka",
        },
        calculatorContext: {
          estimatedMonthlyBillBdt: 12000,
          rooftopAreaSqft: 1800,
          estimate: {
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
            assumptions: ["Uses conservative utilisation assumptions."],
            disclaimer: "Preliminary estimate only.",
          },
        },
      }),
    ).rejects.toBeInstanceOf(AssessmentBackendUnavailableError as new () => Error);
  });
});
