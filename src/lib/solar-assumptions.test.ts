import { describe, expect, it } from "vitest";
import { getSolarAssumptionSnapshot } from "@/lib/solar-assumptions";

describe("solar assumptions", () => {
  it("returns only active, source-traceable assumptions", () => {
    const snapshot = getSolarAssumptionSnapshot();
    expect(snapshot.version).toBeTruthy();
    expect(snapshot.values.length).toBeGreaterThan(0);
    expect(snapshot.values.every((item) => item.status === "active")).toBe(true);
    expect(snapshot.values.every((item) => item.evidence.length > 0)).toBe(true);
  });
});
