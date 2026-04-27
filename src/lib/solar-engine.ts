// BPDB low-voltage residential billing logic:
// - 0-50 kWh can fall under the lifeline slab.
// - Above 50 kWh, the stepped residential slabs apply.
const LIFELINE_KWH_LIMIT = 50;
const LIFELINE_RATE = 4.63;
// The public BPDB schedule also shows a BDT 42 low-voltage fixed charge.
// We subtract it only when inferring kWh from a user-entered total bill because
// fixed charges are not reduced by solar generation in the same way energy charges are.
const LOW_VOLTAGE_FIXED_CHARGE_BDT = 42;

const TARIFF_SLABS = [
  { size: 75, rate: 5.26 },
  { size: 125, rate: 7.2 },
  { size: 100, rate: 7.59 },
  { size: 100, rate: 8.02 },
  { size: 200, rate: 12.67 },
  { size: Infinity, rate: 14.61 },
];

type EstimateBand = {
  low: number;
  midpoint: number;
  high: number;
};

export type ProofFirstSavingsModel = {
  systemKwp: number;
  systemKwpRange: EstimateBand;
  monthlySavings: number;
  monthlySavingsRange: EstimateBand;
  paybackYears: number;
  paybackYearsRange: EstimateBand;
  twentyYearProfit: number;
  twentyYearProfitRange: EstimateBand;
  co2Saved: number;
  annualGenerationKwh: number;
  confidenceLabel: "proof_first";
  assumptions: string[];
  disclaimer: string;
};

const PROOF_ASSUMPTIONS = {
  roofUtilisationFactor: 0.72,
  sqftPerKwp: 95,
  proofFirstCoverageRange: {
    low: 0.75,
    midpoint: 0.9,
    high: 1,
  },
  annualYieldPerKwp: {
    low: 1180,
    midpoint: 1300,
    high: 1410,
  },
  selfConsumptionCapture: {
    low: 0.7,
    midpoint: 0.82,
    high: 0.92,
  },
  installCostPerKwp: {
    low: 120000,
    midpoint: 135000,
    high: 155000,
  },
  twentyYearValueMultiplier: {
    low: 10.5,
    midpoint: 13.5,
    high: 16.5,
  },
  co2KgPerKwh: 0.62,
};

export const SOLAR_PROOF_ASSUMPTIONS = [
  "Uses a 72% roof utilisation factor to leave setbacks, shading, and access room.",
  "Caps recommended size to a proof-first self-consumption target instead of maxing the roof.",
  "Models yield between 1,180 and 1,410 kWh per kWp annually for Dhaka-style rooftop conditions.",
  "Uses a conservative self-consumption capture range before valuing bill savings.",
  "Applies installed-cost bands rather than a single best-case procurement number.",
  "Uses BPDB residential energy slabs and excludes unsupported blanket VAT assumptions from savings logic.",
];

function roundCurrency(value: number): number {
  return Math.round(value);
}

function roundOneDecimal(value: number): number {
  return Number(value.toFixed(1));
}

function sortAscending(values: [number, number, number]): [number, number, number] {
  const sorted = [...values].sort((left, right) => left - right);
  return [sorted[0], sorted[1], sorted[2]];
}

function buildBand(values: [number, number, number], precision: "integer" | "decimal"): EstimateBand {
  const [low, midpoint, high] = sortAscending(values);
  const round = precision === "decimal" ? roundOneDecimal : roundCurrency;

  return {
    low: round(low),
    midpoint: round(midpoint),
    high: round(high),
  };
}

export function calculateMonthlyBill(monthlyKwh: number): number {
  if (monthlyKwh <= LIFELINE_KWH_LIMIT) {
    return roundCurrency(monthlyKwh * LIFELINE_RATE);
  }

  let bill = 0;
  let remaining = monthlyKwh;

  for (const block of TARIFF_SLABS) {
    if (remaining <= 0) break;
    const consumedInBlock = Math.min(remaining, block.size);
    bill += consumedInBlock * block.rate;
    remaining -= consumedInBlock;
  }

  return roundCurrency(bill);
}

export function estimateMonthlyConsumptionFromBill(monthlyBillBdt: number): number {
  const targetEnergyCharge = Math.max(monthlyBillBdt - LOW_VOLTAGE_FIXED_CHARGE_BDT, 0);

  let low = 0;
  let high = 4000;

  for (let iteration = 0; iteration < 32; iteration += 1) {
    const midpoint = (low + high) / 2;
    const estimatedCharge = calculateMonthlyBill(midpoint);

    if (estimatedCharge < targetEnergyCharge) {
      low = midpoint;
    } else {
      high = midpoint;
    }
  }

  return roundOneDecimal((low + high) / 2);
}

export function getSavingsModel(monthlyKwh: number, rooftopSqft: number): ProofFirstSavingsModel {
  const safeMonthlyKwh = Math.max(monthlyKwh, 1);
  const safeRooftopSqft = Math.max(rooftopSqft, 50);
  const annualLoadKwh = safeMonthlyKwh * 12;
  const roofLimitKwp =
    (safeRooftopSqft * PROOF_ASSUMPTIONS.roofUtilisationFactor) / PROOF_ASSUMPTIONS.sqftPerKwp;

  const lowSystem = Math.min(
    roofLimitKwp * 0.9,
    (annualLoadKwh * PROOF_ASSUMPTIONS.proofFirstCoverageRange.low) /
      PROOF_ASSUMPTIONS.annualYieldPerKwp.high,
  );
  const midpointSystem = Math.min(
    roofLimitKwp,
    (annualLoadKwh * PROOF_ASSUMPTIONS.proofFirstCoverageRange.midpoint) /
      PROOF_ASSUMPTIONS.annualYieldPerKwp.midpoint,
  );
  const highSystem = Math.min(
    roofLimitKwp * 1.05,
    (annualLoadKwh * PROOF_ASSUMPTIONS.proofFirstCoverageRange.high) /
      PROOF_ASSUMPTIONS.annualYieldPerKwp.low,
  );

  const systemKwpRange = buildBand([lowSystem, midpointSystem, highSystem], "decimal");

  const lowAnnualGeneration = systemKwpRange.low * PROOF_ASSUMPTIONS.annualYieldPerKwp.low;
  const midpointAnnualGeneration =
    systemKwpRange.midpoint * PROOF_ASSUMPTIONS.annualYieldPerKwp.midpoint;
  const highAnnualGeneration = systemKwpRange.high * PROOF_ASSUMPTIONS.annualYieldPerKwp.high;

  const currentMonthlyBill = calculateMonthlyBill(safeMonthlyKwh);

  const lowNetMonthlyKwh = Math.max(
    0,
    (annualLoadKwh - lowAnnualGeneration * PROOF_ASSUMPTIONS.selfConsumptionCapture.low) / 12,
  );
  const midpointNetMonthlyKwh = Math.max(
    0,
    (annualLoadKwh -
      midpointAnnualGeneration * PROOF_ASSUMPTIONS.selfConsumptionCapture.midpoint) /
      12,
  );
  const highNetMonthlyKwh = Math.max(
    0,
    (annualLoadKwh - highAnnualGeneration * PROOF_ASSUMPTIONS.selfConsumptionCapture.high) / 12,
  );

  const lowMonthlySavings = currentMonthlyBill - calculateMonthlyBill(lowNetMonthlyKwh);
  const midpointMonthlySavings = currentMonthlyBill - calculateMonthlyBill(midpointNetMonthlyKwh);
  const highMonthlySavings = currentMonthlyBill - calculateMonthlyBill(highNetMonthlyKwh);
  const monthlySavingsRange = buildBand(
    [lowMonthlySavings, midpointMonthlySavings, highMonthlySavings],
    "integer",
  );

  const lowInstallCost = systemKwpRange.low * PROOF_ASSUMPTIONS.installCostPerKwp.high;
  const midpointInstallCost =
    systemKwpRange.midpoint * PROOF_ASSUMPTIONS.installCostPerKwp.midpoint;
  const highInstallCost = systemKwpRange.high * PROOF_ASSUMPTIONS.installCostPerKwp.low;

  const lowPayback = lowInstallCost / Math.max(monthlySavingsRange.high * 12, 1);
  const midpointPayback = midpointInstallCost / Math.max(monthlySavingsRange.midpoint * 12, 1);
  const highPayback = highInstallCost / Math.max(monthlySavingsRange.low * 12, 1);
  const paybackYearsRange = buildBand([lowPayback, midpointPayback, highPayback], "decimal");

  const lowTwentyYearProfit =
    monthlySavingsRange.low * 12 * PROOF_ASSUMPTIONS.twentyYearValueMultiplier.low - lowInstallCost;
  const midpointTwentyYearProfit =
    monthlySavingsRange.midpoint *
      12 *
      PROOF_ASSUMPTIONS.twentyYearValueMultiplier.midpoint -
    midpointInstallCost;
  const highTwentyYearProfit =
    monthlySavingsRange.high * 12 * PROOF_ASSUMPTIONS.twentyYearValueMultiplier.high -
    highInstallCost;
  const twentyYearProfitRange = buildBand(
    [lowTwentyYearProfit, midpointTwentyYearProfit, highTwentyYearProfit],
    "integer",
  );

  return {
    systemKwp: systemKwpRange.midpoint,
    systemKwpRange,
    monthlySavings: monthlySavingsRange.midpoint,
    monthlySavingsRange,
    paybackYears: paybackYearsRange.midpoint,
    paybackYearsRange,
    twentyYearProfit: twentyYearProfitRange.midpoint,
    twentyYearProfitRange,
    co2Saved: roundCurrency(midpointAnnualGeneration * PROOF_ASSUMPTIONS.co2KgPerKwh),
    annualGenerationKwh: roundCurrency(midpointAnnualGeneration),
    confidenceLabel: "proof_first",
    assumptions: SOLAR_PROOF_ASSUMPTIONS,
    disclaimer:
      "Preliminary estimate only. Roof photos, a recent bill, and shading checks can materially shift the result.",
  };
}
