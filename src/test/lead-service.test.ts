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
              monthlySavings: 8760,
              monthlySavingsRange: { low: 7020, midpoint: 8760, high: 10110 },
              paybackYears: 5.8,
              paybackYearsRange: { low: 5.1, midpoint: 5.8, high: 7.1 },
              twentyYearProfit: 1520000,
              twentyYearProfitRange: { low: 910000, midpoint: 1520000, high: 2140000 },
              co2Saved: 10240,
              annualGenerationKwh: 15280,
              confidenceLabel: "proof_first",
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
          monthlySavings: 8760,
          monthlySavingsRange: { low: 7020, midpoint: 8760, high: 10110 },
          paybackYears: 5.8,
          paybackYearsRange: { low: 5.1, midpoint: 5.8, high: 7.1 },
          twentyYearProfit: 1520000,
          twentyYearProfitRange: { low: 910000, midpoint: 1520000, high: 2140000 },
          co2Saved: 10240,
          annualGenerationKwh: 15280,
          confidenceLabel: "proof_first",
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
            monthlySavings: 8760,
            monthlySavingsRange: { low: 7020, midpoint: 8760, high: 10110 },
            paybackYears: 5.8,
            paybackYearsRange: { low: 5.1, midpoint: 5.8, high: 7.1 },
            twentyYearProfit: 1520000,
            twentyYearProfitRange: { low: 910000, midpoint: 1520000, high: 2140000 },
            co2Saved: 10240,
            annualGenerationKwh: 15280,
            confidenceLabel: "proof_first",
            assumptions: ["Uses conservative utilisation assumptions."],
            disclaimer: "Preliminary estimate only.",
          },
        },
      }),
    ).rejects.toBeInstanceOf(AssessmentBackendUnavailableError as new () => Error);
  });
});
