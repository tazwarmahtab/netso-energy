import { describe, expect, it } from "vitest";
import { annualConsumptionFromMonthlyKwh, calculateExport, calculateSolarAssessment } from "@/lib/solar-engine";

describe("solar intelligence engine", () => {
  it("annualizes monthly consumption", () => expect(annualConsumptionFromMonthlyKwh(100_000)).toBe(1_200_000));
  it("never returns negative export", () => expect(calculateExport(100_000, 120_000)).toBe(0));
  it("separates self-consumption from export", () => {
    const result = calculateSolarAssessment({ facilityType: "factory", location: "Gazipur", monthlyConsumptionKwh: 100_000, monthlyBillBdt: 1_200_000, usableRoofAreaM2: 4000, ppaInterest: true });
    expect(result.selfConsumptionKwh).toBeGreaterThanOrEqual(0);
    expect(result.exportKwh).toBeGreaterThanOrEqual(0);
    expect(result.annualGenerationKwh).toBeGreaterThanOrEqual(result.selfConsumptionKwh);
  });
  it("marks generic yield as lower confidence", () => {
    const result = calculateSolarAssessment({ facilityType: "factory", location: "Gazipur", monthlyConsumptionKwh: 100_000, usableRoofAreaM2: 4000 });
    expect(result.confidence).not.toBe("high");
    expect(result.flags.length).toBeGreaterThan(0);
  });
  it("uses the Chattogram CGS yield only in its intended scope", () => {
    const result = calculateSolarAssessment({ facilityType: "school", location: "Chattogram", monthlyConsumptionKwh: 100_000, usableRoofAreaM2: 4000 });
    expect(result.confidence).toBe("high");
  });
});
