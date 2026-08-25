export type AssumptionStatus = "active" | "draft" | "deprecated";
export type Confidence = "high" | "medium" | "low";
export type SourceTier = "A" | "B" | "C";

export type SolarAssumptionValue = {
  key: string;
  name: string;
  value: number;
  unit: string;
  scope?: string;
  confidence: Confidence;
  sourceTier: SourceTier;
  evidence: string;
  sourceDate?: string;
  reviewDate?: string;
  status: AssumptionStatus;
};

export type SolarAssumptionSnapshot = {
  version: string;
  effectiveDate: string;
  values: SolarAssumptionValue[];
};

const SNAPSHOT: SolarAssumptionSnapshot = {
  version: "notion-netso-registry-2026-08-25-v1",
  effectiveDate: "2026-08-25",
  values: [
    {
      key: "ppa.cgs",
      name: "CGS PPA baseline",
      value: 10,
      unit: "BDT/kWh",
      scope: "CGS / education baseline",
      confidence: "high",
      sourceTier: "A",
      evidence: "Netso Assumptions Registry / CGS commercial baseline",
      reviewDate: "2026-09-30",
      status: "active",
    },
    {
      key: "ppa.commercial.target",
      name: "Commercial PPA target",
      value: 12,
      unit: "BDT/kWh",
      scope: "commercial customers; target, not universal tariff",
      confidence: "medium",
      sourceTier: "B",
      evidence: "Netso Assumptions Registry / commercial PPA target",
      reviewDate: "2026-09-30",
      status: "active",
    },
    {
      key: "ppa.educational.target",
      name: "Educational PPA target",
      value: 10,
      unit: "BDT/kWh",
      scope: "educational customers; target, not universal tariff",
      confidence: "high",
      sourceTier: "A",
      evidence: "Netso Assumptions Registry / educational PPA target",
      reviewDate: "2026-09-30",
      status: "active",
    },
    {
      key: "capex.underwriting",
      name: "CAPEX underwriting baseline",
      value: 60000,
      unit: "BDT/kWp",
      scope: "pre-feasibility only",
      confidence: "medium",
      sourceTier: "B",
      evidence: "Netso Assumptions Registry / CAPEX underwriting",
      reviewDate: "2026-09-30",
      status: "active",
    },
    {
      key: "nem.capacity.ceiling",
      name: "NEM preliminary capacity ceiling",
      value: 100,
      unit: "% of allocated/sanctioned load",
      scope: "preliminary regulatory constraint; project validation required",
      confidence: "high",
      sourceTier: "A",
      evidence: "Bangladesh Net Metering Guideline 2025 / official NEM materials",
      reviewDate: "2026-09-30",
      status: "active",
    },
    {
      key: "yield.cgs.chattogram.p90",
      name: "CGS Chattogram P90 specific yield",
      value: 1444.7,
      unit: "kWh/kWp/year",
      scope: "CGS / Chattogram P90 engineering benchmark only",
      confidence: "high",
      sourceTier: "A",
      evidence: "CGS engineering report: 80.04 kWp -> 115,632 kWh/year",
      reviewDate: "2026-09-30",
      status: "active",
    },
  ],
};

export function getSolarAssumptionSnapshot(): SolarAssumptionSnapshot {
  return {
    ...SNAPSHOT,
    values: SNAPSHOT.values.map((item) => ({ ...item })),
  };
}

export function getSolarAssumption(key: string, snapshot = getSolarAssumptionSnapshot()): SolarAssumptionValue | undefined {
  return snapshot.values.find((item) => item.key === key && item.status === "active");
}
