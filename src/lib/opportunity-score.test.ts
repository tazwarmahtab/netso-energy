import { describe, expect, it } from "vitest";
import { scoreSolarOpportunity } from "@/lib/opportunity-score";

describe("solar opportunity score", () => {
  it("classifies a large factory with strong PPA intent as hot", () => {
    const result = scoreSolarOpportunity({ facilityType: "factory", estimatedCapacityKwp: 500, ppaInterest: true, dataCompleteness: 0.9, daytimeLoad: true });
    expect(result.band).toBe("hot");
    expect(result.score).toBeGreaterThanOrEqual(70);
  });
  it("clamps scores to 100", () => {
    const result = scoreSolarOpportunity({ facilityType: "factory", estimatedCapacityKwp: 1000, ppaInterest: true, dataCompleteness: 1, daytimeLoad: true, generatorUse: true });
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
