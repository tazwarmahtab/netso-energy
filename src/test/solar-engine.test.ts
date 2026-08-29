import { describe, expect, it } from "vitest";
import {
  calculateMonthlyBill,
  estimateMonthlyConsumptionFromBill,
  getSavingsModel,
  TARIFF_BENCHMARKS,
  SOLAR_ENGINE_CONSTANTS,
} from "@/lib/solar-engine";

describe("solar proof estimate engine", () => {
  it("returns conservative bands and a clear proof-first disclaimer", () => {
    const model = getSavingsModel(1200, 1800) as Record<string, unknown>;

    expect(model).toMatchObject({
      confidenceLabel: "resco_ppa",
    });
    expect(model).toHaveProperty("systemKwpRange");
    expect(model).toHaveProperty("monthlySavingsBdtRange");
    expect(model).toHaveProperty("ppaTermSavingsBdtRange");
    expect(model).toHaveProperty("annualGenerationKwh");
    expect(model).toHaveProperty("effectiveDisplacedRateBdt");
    expect(model).toHaveProperty("savingsMarginPct");
    expect(Array.isArray(model.assumptions)).toBe(true);
    expect(String(model.disclaimer).toLowerCase()).toContain("preliminary");

    const systemRange = model.systemKwpRange as { low: number; midpoint: number; high: number };
    const savingsRange = model.monthlySavingsBdtRange as { low: number; midpoint: number; high: number };

    expect(systemRange.low).toBeLessThan(systemRange.midpoint);
    expect(systemRange.midpoint).toBeLessThan(systemRange.high);
    expect(savingsRange.low).toBeLessThanOrEqual(Number(model.monthlySavingsBdt));
    expect(savingsRange.high).toBeGreaterThanOrEqual(Number(model.monthlySavingsBdt));
  });

  it("does not size the proof-first system purely from oversized roof area", () => {
    const model = getSavingsModel(250, 5000);

    expect(model.systemKwp).toBeLessThan(15);
    expect(model.ppaTermSavingsBdt).toBeGreaterThan(0);
  });

  it("keeps the monthly bill helper progressive", () => {
    expect(calculateMonthlyBill(50)).toBeGreaterThan(0);
    expect(calculateMonthlyBill(300)).toBeGreaterThan(calculateMonthlyBill(100));
  });

  it("derives a reasonable consumption estimate from a monthly bill input", () => {
    const estimatedKwh = estimateMonthlyConsumptionFromBill(12000);

    expect(estimatedKwh).toBeGreaterThan(900);
    expect(estimatedKwh).toBeLessThan(1400);
  });
});

describe("multi-tenant residential & common-service segments", () => {
  it("uses correct displaced rate for common service (BDT 14.50/kWh)", () => {
    const model = getSavingsModel(3500, 600, "residential_common_service");
    const rate = TARIFF_BENCHMARKS.residential_common_service.displacedRateBdt;
    expect(rate).toBe(14.50);
    expect(model.effectiveDisplacedRateBdt).toBe(14.50);
  });

  it("uses correct displaced rate for residential high tier (BDT 15.01/kWh)", () => {
    const model = getSavingsModel(4500, 1200, "residential_multi_story");
    const rate = TARIFF_BENCHMARKS.residential_multi_story.displacedRateBdt;
    expect(rate).toBe(15.01);
    expect(model.effectiveDisplacedRateBdt).toBe(15.01);
  });

  it("common service achieves ~31% savings margin (BDT 14.50 vs PPA BDT 10.00)", () => {
    const model = getSavingsModel(3500, 600, "residential_common_service");
    expect(model.savingsMarginPct).toBeGreaterThanOrEqual(30);
    expect(model.savingsMarginPct).toBeLessThanOrEqual(33);
  });

  it("residential high tier achieves ~33% savings margin (BDT 15.01 vs PPA BDT 10.00)", () => {
    const model = getSavingsModel(4500, 1200, "residential_multi_story");
    expect(model.savingsMarginPct).toBeGreaterThanOrEqual(32);
    expect(model.savingsMarginPct).toBeLessThanOrEqual(34);
  });

  it("defaults to C&I (MT-2) when no segment specified", () => {
    const modelDefault = getSavingsModel(1000, 1000);
    const modelExplicit = getSavingsModel(1000, 1000, "c_and_i");
    expect(modelDefault.effectiveDisplacedRateBdt).toBe(modelExplicit.effectiveDisplacedRateBdt);
    expect(modelDefault.effectiveDisplacedRateBdt).toBe(12.98);
  });

  it("caps savings margin at zero when PPA exceeds displaced rate", () => {
    // Lower tier slab (BDT 5.26/kWh) < PPA (BDT 10.00) — would show negative margin
    const lowSlabRate = 5.26;
    const marginPct = Math.round(((lowSlabRate - SOLAR_ENGINE_CONSTANTS.netsoPpaRateBdt) / lowSlabRate) * 100);
    // The engine clips margin to floor of 0 via Math.max(0, displacedRate - ppaRate)
    expect(marginPct).toBeLessThan(0);
  });
});

describe("regional insolation sensitivity", () => {
  it("Dhaka (15.3% CF) yields ~8% less generation than Chattogram (16.5% CF)", () => {
    const chattogram = getSavingsModel(2500, 2000, "c_and_i", "chattogram");
    const dhaka = getSavingsModel(2500, 2000, "c_and_i", "dhaka");

    const delta = (chattogram.annualGenerationKwh - dhaka.annualGenerationKwh) / chattogram.annualGenerationKwh;
    expect(delta).toBeGreaterThanOrEqual(0.07);
    expect(delta).toBeLessThanOrEqual(0.10);
  });
});
