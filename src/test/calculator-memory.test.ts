import { beforeEach, describe, expect, it } from "vitest";

import {
  clearSavedEstimate,
  loadSavedEstimate,
  persistEstimate,
} from "@/components/home/SolarCalculatorFunnel";

describe("calculator memory (localStorage)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when nothing is saved", () => {
    expect(loadSavedEstimate()).toBeNull();
  });

  it("round-trips bill, area, region and segment", () => {
    persistEstimate({ bill: 12000, area: 1200, region: "chattogram", segment: "c_and_i" });
    const saved = loadSavedEstimate();
    expect(saved).toMatchObject({ bill: 12000, area: 1200, region: "chattogram", segment: "c_and_i" });
    expect(typeof saved?.savedAt).toBe("number");
  });

  it("rejects corrupt payloads", () => {
    localStorage.setItem("netso-calc-v1", "{not-json");
    expect(loadSavedEstimate()).toBeNull();
  });

  it("clears on demand", () => {
    persistEstimate({ bill: 8000, area: 900, region: "dhaka", segment: "c_and_i" });
    clearSavedEstimate();
    expect(loadSavedEstimate()).toBeNull();
  });
});
