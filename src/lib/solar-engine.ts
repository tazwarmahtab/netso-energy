// Netso Energy Solar Savings Engine (v2.0 - Multi-Tenant & Multi-Segment Architecture)
// Reconciled against BERC June 2026 Tariff Schedules & SREDA Net Metering Guidelines 2025

export type PropertySegment = "c_and_i" | "residential_multi_story" | "residential_common_service";

export interface TariffStructure {
  segment: PropertySegment;
  name: string;
  displacedRateBdt: number;
  description: string;
}

export const TARIFF_BENCHMARKS: Record<PropertySegment, TariffStructure> = {
  c_and_i: {
    segment: "c_and_i",
    name: "Commercial & Industrial (MT-2)",
    displacedRateBdt: 12.98, // Verified CGS 12-Month Audit true variable rate
    description: "Medium-tension commercial & industrial variable energy rate excluding fixed demand charges.",
  },
  residential_common_service: {
    segment: "residential_common_service",
    name: "Residential Common Services (LT-E / Pump & Lift)",
    displacedRateBdt: 14.50, // Blended commercial/high-slab rate for common lift/pumps
    description: "Dedicated common-service meter powering elevators, deep water pumps, and stairwell lighting.",
  },
  residential_multi_story: {
    segment: "residential_multi_story",
    name: "Residential Apartment High Tier (LT-A 401+ Units)",
    displacedRateBdt: 15.01, // BERC June 2026 Tier-5 rate (401-600 slab is 15.01, 600+ is 17.35)
    description: "Daytime flat consumption offsetting progressive upper residential tariff slabs.",
  },
};

export const SOLAR_ENGINE_CONSTANTS = {
  // PPA commercial constants
  netsoPpaRateBdt: 10.00, // BDT/kWh base rate
  ppaEscalationRate: 0.03, // 3% triennial escalation
  ppaEscalationInterval: 3, // Every 3 years
  ppaTermYears: 20,
  annualDegradation: 0.005, // 0.5% p.a. Tier-1 PV degradation

  // Solar insolation by region
  annualYieldPerKwp: {
    chattogram: 1445.4, // 16.5% Capacity Factor (Chattogram reference)
    dhaka: 1340.3,      // 15.3% Capacity Factor (Dhaka urban baseline)
    conservative: 1300.0,
    optimistic: 1550.0,
  },

  // Turnkey CAPEX benchmarks (Scenario A)
  capexBdtPerKwp: {
    c_and_i: 60000,                  // 80 kWp CGS reference baseline (pilot-validated)
    residential_multi_story: 60000,  // 20-50 kWp whole building
    residential_common_service: 70000, // 5-10 kWp small common-service
  },

  // Engineering & environmental
  roofUtilisationFactor: 0.65, // Net usable roof after setbacks/water tanks
  sqftPerKwp: 100,             // 100 sqft per 1 kWp DC
  co2KgPerKwh: 0.58,           // Bangladesh grid emission factor
  sredaNemExportRateBdt: 6.4523, // BERC bulk generation avoided cost
};

export interface EstimateBand {
  low: number;
  midpoint: number;
  high: number;
}

export interface RescoSavingsModel {
  systemKwp: number;
  systemKwpRange: EstimateBand;
  monthlySavingsBdt: number;
  monthlySavingsBdtRange: EstimateBand;
  annualSavingsBdt: number;
  ppaTermSavingsBdt: number;
  ppaTermSavingsBdtRange: EstimateBand;
  co2SavedTonnes: number;
  annualGenerationKwh: number;
  effectiveDisplacedRateBdt: number;
  savingsMarginPct: number;
  confidenceLabel: "resco_ppa";
  assumptions: string[];
  disclaimer: string;
}

function roundCurrency(value: number): number {
  return Math.round(value / 100) * 100;
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

export function estimateMonthlyConsumptionFromBill(
  monthlyBillBdt: number,
  segment: PropertySegment = "c_and_i",
): number {
  const rate = TARIFF_BENCHMARKS[segment]?.displacedRateBdt ?? TARIFF_BENCHMARKS.c_and_i.displacedRateBdt;
  const estimatedKwh = monthlyBillBdt / rate;
  return roundOneDecimal(estimatedKwh);
}

export function getSavingsModel(
  monthlyKwh: number,
  rooftopSqft: number,
  segment: PropertySegment = "c_and_i",
  region: "chattogram" | "dhaka" = "dhaka",
): RescoSavingsModel {
  const safeMonthlyKwh = Math.max(monthlyKwh, 100);
  const safeRooftopSqft = Math.max(rooftopSqft, 500);
  const annualLoadKwh = safeMonthlyKwh * 12;

  const yieldConstant = SOLAR_ENGINE_CONSTANTS.annualYieldPerKwp[region] ?? SOLAR_ENGINE_CONSTANTS.annualYieldPerKwp.dhaka;
  const lowYield = SOLAR_ENGINE_CONSTANTS.annualYieldPerKwp.conservative;
  const highYield = SOLAR_ENGINE_CONSTANTS.annualYieldPerKwp.optimistic;

  const roofLimitKwp =
    (safeRooftopSqft * SOLAR_ENGINE_CONSTANTS.roofUtilisationFactor) / SOLAR_ENGINE_CONSTANTS.sqftPerKwp;

  const lowSystem = Math.min(roofLimitKwp * 0.8, annualLoadKwh / highYield);
  const midpointSystem = Math.min(roofLimitKwp, annualLoadKwh / yieldConstant);
  const highSystem = Math.min(roofLimitKwp * 1.1, annualLoadKwh / lowYield);

  const systemKwpRange = buildBand([lowSystem, midpointSystem, highSystem], "decimal");

  const lowAnnualGen = systemKwpRange.low * lowYield;
  const midpointAnnualGen = systemKwpRange.midpoint * yieldConstant;
  const highAnnualGen = systemKwpRange.high * highYield;

  const displacedRate = TARIFF_BENCHMARKS[segment]?.displacedRateBdt ?? TARIFF_BENCHMARKS.c_and_i.displacedRateBdt;
  const ppaRate = SOLAR_ENGINE_CONSTANTS.netsoPpaRateBdt;
  const savingsMargin = Math.max(0, displacedRate - ppaRate);
  const savingsMarginPct = roundOneDecimal(((displacedRate - ppaRate) / displacedRate) * 100);

  const lowAnnualSavings = lowAnnualGen * savingsMargin;
  const midpointAnnualSavings = midpointAnnualGen * savingsMargin;
  const highAnnualSavings = highAnnualGen * savingsMargin;

  const monthlySavingsBdtRange = buildBand(
    [lowAnnualSavings / 12, midpointAnnualSavings / 12, highAnnualSavings / 12],
    "integer",
  );

  // 20-Year Lifetime Savings with 3% triennial PPA escalation & 0.5% degradation
  const calculateLifetimeSavings = (annualGen: number): number => {
    let totalSavings = 0;
    let currentPpa = ppaRate;

    for (let year = 1; year <= SOLAR_ENGINE_CONSTANTS.ppaTermYears; year++) {
      const degradedGen = annualGen * Math.pow(1 - SOLAR_ENGINE_CONSTANTS.annualDegradation, year - 1);

      if (year > 1 && (year - 1) % SOLAR_ENGINE_CONSTANTS.ppaEscalationInterval === 0) {
        currentPpa *= (1 + SOLAR_ENGINE_CONSTANTS.ppaEscalationRate);
      }

      const yearSavings = degradedGen * Math.max(0, displacedRate - currentPpa);
      totalSavings += yearSavings;
    }
    return totalSavings;
  };

  const ppaTermSavingsBdtRange = buildBand(
    [
      calculateLifetimeSavings(lowAnnualGen),
      calculateLifetimeSavings(midpointAnnualGen),
      calculateLifetimeSavings(highAnnualGen),
    ],
    "integer",
  );

  const assumptions = [
    "Zero upfront CAPEX for the property owner under the Netso PPA model.",
    `Savings calculated against ${TARIFF_BENCHMARKS[segment].name} (BDT ${displacedRate.toFixed(2)}/kWh) vs. Netso PPA (BDT ${ppaRate.toFixed(2)}/kWh).`,
    `System sized using ${region === "chattogram" ? "Chattogram (16.5% CF)" : "Dhaka (15.3% CF)"} empirical irradiance profiles.`,
    "Includes 20-year asset performance monitoring, cleaning, and maintenance.",
    "CO2 emissions offset based on Bangladesh national grid emission factor (0.58 kg/kWh).",
  ];

  return {
    systemKwp: systemKwpRange.midpoint,
    systemKwpRange,
    monthlySavingsBdt: monthlySavingsBdtRange.midpoint,
    monthlySavingsBdtRange,
    annualSavingsBdt: roundCurrency(midpointAnnualSavings),
    ppaTermSavingsBdt: ppaTermSavingsBdtRange.midpoint,
    ppaTermSavingsBdtRange,
    co2SavedTonnes: roundOneDecimal((midpointAnnualGen * SOLAR_ENGINE_CONSTANTS.co2KgPerKwh) / 1000),
    annualGenerationKwh: roundCurrency(midpointAnnualGen),
    effectiveDisplacedRateBdt: displacedRate,
    savingsMarginPct,
    confidenceLabel: "resco_ppa",
    assumptions,
    disclaimer:
      "Preliminary engineering estimate for a Netso RESCO PPA deployment. Final scope and savings confirmed upon physical roof survey and utility billing audit.",
  };
}

export function calculateMonthlyBill(monthlyKwh: number, segment: PropertySegment = "c_and_i"): number {
  const rate = TARIFF_BENCHMARKS[segment]?.displacedRateBdt ?? TARIFF_BENCHMARKS.c_and_i.displacedRateBdt;
  const bill = monthlyKwh * rate;
  return roundCurrency(bill);
}
