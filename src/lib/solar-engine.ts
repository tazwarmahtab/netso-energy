import { getSolarAssumption, getSolarAssumptionSnapshot, type SolarAssumptionSnapshot } from "@/lib/solar-assumptions";

export type EstimateBand = { low: number; midpoint: number; high: number };
export type ConfidenceLevel = "high" | "medium" | "low";

export type SolarAssessmentInput = {
  facilityType: "factory" | "commercial" | "school" | "hospital" | "hotel" | "warehouse" | "other";
  location?: string;
  monthlyConsumptionKwh?: number;
  monthlyBillBdt?: number;
  sanctionedLoadKw?: number;
  usableRoofAreaM2?: number;
  ppaInterest?: boolean;
  existingSolarKwp?: number;
  generatorHoursPerMonth?: number;
};

export type SolarAssessmentResult = {
  assumptionsVersion: string;
  recommendedCapacityKwp: number;
  annualGenerationKwh: number;
  selfConsumptionKwh: number;
  exportKwh: number;
  annualPpaCostBdt?: number;
  annualAvoidedCostBdt?: number;
  annualSavingsBdt?: number;
  twentyYearSavingsBdt?: number;
  capexEstimateBdt?: number;
  co2AvoidedTonnes: number;
  confidence: ConfidenceLevel;
  flags: string[];
  disclaimer: string;
};

export type RescoSavingsModel = SolarAssessmentResult & {
  systemKwp: number;
  systemKwpRange: EstimateBand;
  monthlySavingsBdt: number;
  monthlySavingsBdtRange: EstimateBand;
  annualSavingsBdt: number;
  ppaTermSavingsBdt: number;
  ppaTermSavingsBdtRange: EstimateBand;
  annualGenerationKwh: number;
  co2SavedTonnes: number;
  confidenceLabel: "resco_ppa";
  assumptions: string[];
};

const DEFAULT_YIELD = 1350;
const CO2_KG_PER_KWH = 0.58;
const ROOF_M2_PER_KWP = 8;

function round(value: number, digits = 0): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** digits;
  return Number((Math.round(value * factor) / factor).toFixed(Math.max(digits, 0)));
}

export function annualConsumptionFromMonthlyKwh(monthlyKwh: number): number { return Math.max(0, monthlyKwh) * 12; }
export function calculateExport(generationKwh: number, selfConsumedKwh: number): number { return Math.max(0, generationKwh - selfConsumedKwh); }

function getYield(input: SolarAssessmentInput, assumptions: SolarAssumptionSnapshot): { value: number; confidence: ConfidenceLevel; flag?: string } {
  const isCgsChattogram = input.location?.toLowerCase().includes("chattogram") && input.facilityType === "school";
  if (isCgsChattogram) {
    const benchmark = getSolarAssumption("yield.cgs.chattogram.p90", assumptions);
    if (benchmark) return { value: benchmark.value, confidence: "high" };
  }
  return { value: DEFAULT_YIELD, confidence: "low", flag: "Site-specific solar yield requires engineering validation." };
}

function getPpaRate(input: SolarAssessmentInput, assumptions: SolarAssumptionSnapshot): number | undefined {
  if (!input.ppaInterest) return undefined;
  if (input.facilityType === "school" || input.facilityType === "hospital") return getSolarAssumption("ppa.educational.target", assumptions)?.value;
  return getSolarAssumption("ppa.commercial.target", assumptions)?.value;
}

export function calculateSolarAssessment(input: SolarAssessmentInput, assumptions = getSolarAssumptionSnapshot()): SolarAssessmentResult {
  const flags: string[] = [];
  const monthlyKwh = input.monthlyConsumptionKwh;
  if (!monthlyKwh) flags.push("Reliable consumption data is required for a higher-confidence estimate.");
  const annualLoad = monthlyKwh ? annualConsumptionFromMonthlyKwh(monthlyKwh) : 0;
  const { value: yieldKwhPerKwp, confidence: yieldConfidence, flag } = getYield(input, assumptions);
  if (flag) flags.push(flag);

  const roofLimit = input.usableRoofAreaM2 ? input.usableRoofAreaM2 / ROOF_M2_PER_KWP : Number.POSITIVE_INFINITY;
  const loadLimit = input.sanctionedLoadKw ? input.sanctionedLoadKw : Number.POSITIVE_INFINITY;
  const energyLimit = annualLoad ? annualLoad / yieldKwhPerKwp : Number.POSITIVE_INFINITY;
  const existing = input.existingSolarKwp ?? 0;
  const rawCapacity = Math.min(roofLimit, loadLimit, energyLimit);
  const capacity = Math.max(0, Number.isFinite(rawCapacity) ? rawCapacity - existing : 0);
  const generation = capacity * yieldKwhPerKwp;
  const selfConsumed = annualLoad > 0 ? Math.min(generation, generation * 0.75) : 0;
  const export = calculateExport(generation, selfConsumed);
  const ppaRate = getPpaRate(input, assumptions);

  let annualPpaCost: number | undefined;
  let annualAvoidedCost: number | undefined;
  let annualSavings: number | undefined;
  let twentyYearSavings: number | undefined;
  if (ppaRate !== undefined) {
    annualPpaCost = selfConsumed * ppaRate;
    if (input.monthlyBillBdt && monthlyKwh) {
      const effectiveRetail = input.monthlyBillBdt / monthlyKwh;
      annualAvoidedCost = selfConsumed * effectiveRetail;
      annualSavings = Math.max(0, annualAvoidedCost - annualPpaCost);
      twentyYearSavings = annualSavings * 20;
    } else flags.push("PPA savings require a validated retail tariff or bill-plus-consumption profile.");
  }

  const capex = getSolarAssumption("capex.underwriting", assumptions)?.value;
  return {
    assumptionsVersion: assumptions.version,
    recommendedCapacityKwp: round(capacity, 1), annualGenerationKwh: round(generation), selfConsumptionKwh: round(selfConsumed), exportKwh: round(export),
    annualPpaCostBdt: annualPpaCost !== undefined ? round(annualPpaCost) : undefined,
    annualAvoidedCostBdt: annualAvoidedCost !== undefined ? round(annualAvoidedCost) : undefined,
    annualSavingsBdt: annualSavings !== undefined ? round(annualSavings) : undefined,
    twentyYearSavingsBdt: twentyYearSavings !== undefined ? round(twentyYearSavings) : undefined,
    capexEstimateBdt: capex ? round(capacity * capex) : undefined,
    co2AvoidedTonnes: round((selfConsumed * CO2_KG_PER_KWH) / 1000, 1),
    confidence: yieldConfidence === "high" && !!monthlyKwh ? "high" : monthlyKwh ? "medium" : "low",
    flags,
    disclaimer: "Preliminary estimate only. Final capacity, generation, savings, tariff, export treatment and project feasibility require site, structural, electrical, regulatory and commercial validation.",
  };
}

/** Legacy bridge for the old calculator. New UI should collect kWh directly instead of inferring it from bill alone. */
export function estimateMonthlyConsumptionFromBill(monthlyBillBdt: number): number { return Math.max(0, monthlyBillBdt) / 12.98; }

export function getSavingsModel(monthlyKwh: number, rooftopSqft: number): RescoSavingsModel {
  const result = calculateSolarAssessment({ facilityType: "factory", monthlyConsumptionKwh: monthlyKwh, usableRoofAreaM2: Math.max(0, rooftopSqft) * 0.092903, ppaInterest: true });
  const system = result.recommendedCapacityKwp;
  const generation = result.annualGenerationKwh;
  const annualSavings = result.annualSavingsBdt ?? 0;
  const monthly = annualSavings / 12;
  const lifetime = annualSavings * 20;
  const band = { low: round(system * 0.9, 1), midpoint: system, high: round(system * 1.1, 1) };
  const savingsBand = { low: Math.max(0, round(monthly * 0.9, -2)), midpoint: Math.max(0, round(monthly, -2)), high: Math.max(0, round(monthly * 1.1, -2)) };
  return { ...result, systemKwp: system, systemKwpRange: band, monthlySavingsBdt: round(monthly, -2), monthlySavingsBdtRange: savingsBand, annualSavingsBdt: annualSavings, ppaTermSavingsBdt: round(lifetime), ppaTermSavingsBdtRange: { low: round(lifetime * 0.9), midpoint: round(lifetime), high: round(lifetime * 1.1) }, annualGenerationKwh: generation, co2SavedTonnes: result.co2AvoidedTonnes, confidenceLabel: "resco_ppa", assumptions: result.flags.length ? result.flags : ["PPA economics are preliminary and use the governed Netso assumption snapshot."] };
}

export function calculateMonthlyBill(monthlyKwh: number): number { return round(monthlyKwh * 12.98, -2); }
