import { describe, expect, it } from "vitest";
import {
  calculateMonthlyBill,
  estimateMonthlyConsumptionFromBill,
  getSavingsModel,
} from "@/lib/solar-engine";

describe("solar proof estimate engine", () => {
  it("returns conservative bands and a clear proof-first disclaimer", () => {
    const model = getSavingsModel(1200, 1800) as Record<string, unknown>;

    expect(model).toMatchObject({
      confidenceLabel: "proof_first",
    });
    expect(model).toHaveProperty("systemKwpRange");
    expect(model).toHaveProperty("monthlySavingsRange");
    expect(model).toHaveProperty("paybackYearsRange");
    expect(model).toHaveProperty("annualGenerationKwh");
    expect(Array.isArray(model.assumptions)).toBe(true);
    expect(String(model.disclaimer).toLowerCase()).toContain("preliminary");

    const systemRange = model.systemKwpRange as { low: number; midpoint: number; high: number };
    const savingsRange = model.monthlySavingsRange as { low: number; midpoint: number; high: number };

    expect(systemRange.low).toBeLessThan(systemRange.midpoint);
    expect(systemRange.midpoint).toBeLessThan(systemRange.high);
    expect(savingsRange.low).toBeLessThanOrEqual(Number(model.monthlySavings));
    expect(savingsRange.high).toBeGreaterThanOrEqual(Number(model.monthlySavings));
  });

  it("does not size the proof-first system purely from oversized roof area", () => {
    const model = getSavingsModel(250, 5000);

    expect(model.systemKwp).toBeLessThan(15);
    expect(model.paybackYears).toBeGreaterThan(0);
  });

  it("keeps the monthly bill helper progressive", () => {
    expect(calculateMonthlyBill(50)).toBeGreaterThan(0);
    expect(calculateMonthlyBill(300)).toBeGreaterThan(calculateMonthlyBill(100));
  });

  it("derives a reasonable consumption estimate from a monthly bill input", () => {
    const estimatedKwh = estimateMonthlyConsumptionFromBill(12000);

    expect(estimatedKwh).toBeGreaterThan(900);
    expect(estimatedKwh).toBeLessThan(1200);
  });
});
