// Netso Energy RESCO PPA Savings Engine
// Based on C&I (Commercial & Industrial) MT-2 tariff structure and PPA model.

const C_AND_I_CONSTANTS = {
  // From GROUND_TRUTH_CONSTANTS.md (CGS 12-Month Audit)
  gridVariableRateBdt: 12.98, // BDT/kWh
  netsoPpaRateBdt: 10.00, // BDT/kWh

  // From GROUND_TRUTH_CONSTANTS.md (Generation Physics)
  annualYieldPerKwp: {
    low: 1350,  // Conservative yield
    midpoint: 1445, // Baseline (80kW * 1445.4 = 115,632 kWh/yr)
    high: 1550, // Optimistic yield
  },

  // Engineering assumptions for calculator
  roofUtilisationFactor: 0.65, // Accommodates setbacks, shading, access paths
  sqftPerKwp: 100, // Standard for commercial rooftops
  capexBdtPerKwp: 55000, // For Netso's internal payback, not customer-facing

  // Other constants
  co2KgPerKwh: 0.58, // Bangladesh grid emission factor
  ppaEscalationRate: 0.03, // 3%
  ppaEscalationInterval: 3, // Every 3 years
  ppaTermYears: 20,
};

type EstimateBand = {
  low: number;
  midpoint: number;
  high: number;
};

export type RescoSavingsModel = {
  systemKwp: number;
  systemKwpRange: EstimateBand;
  monthlySavingsBdt: number;
  monthlySavingsBdtRange: EstimateBand;
  annualSavingsBdt: number;
  ppaTermSavingsBdt: number;
  ppaTermSavingsBdtRange: EstimateBand;
  co2SavedTonnes: number;
  annualGenerationKwh: number;
  confidenceLabel: "resco_ppa";
  assumptions: string[];
  disclaimer: string;
};

export const RESCO_PPA_ASSUMPTIONS = [
  "Zero upfront CAPEX for the customer under the PPA model.",
  "Savings are based on the difference between the BDT 12.98/kWh grid tariff and Netso's BDT 10.00/kWh PPA rate.",
  "System size is estimated based on available roof space and your electricity consumption.",
  "Annual generation is modeled on Dhaka's solar irradiance data for commercial rooftops.",
  "CO2 savings are calculated using the Bangladesh grid's carbon intensity factor.",
];

function roundCurrency(value: number): number {
  // Round to nearest 100 for display
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

export function estimateMonthlyConsumptionFromBill(monthlyBillBdt: number): number {
  // Simplified for C&I - using the true variable rate from ground truth
  const estimatedKwh = monthlyBillBdt / C_AND_I_CONSTANTS.gridVariableRateBdt;
  return roundOneDecimal(estimatedKwh);
}


export function getSavingsModel(monthlyKwh: number, rooftopSqft: number): RescoSavingsModel {
  const safeMonthlyKwh = Math.max(monthlyKwh, 100); // Min 100 kWh for C&I
  const safeRooftopSqft = Math.max(rooftopSqft, 500); // Min 500 sqft
  const annualLoadKwh = safeMonthlyKwh * 12;

  // Max system size based on available roof space
  const roofLimitKwp =
    (safeRooftopSqft * C_AND_I_CONSTANTS.roofUtilisationFactor) / C_AND_I_CONSTANTS.sqftPerKwp;

  // Recommended system size is capped by either roof space or annual consumption
  const lowSystem = Math.min(
    roofLimitKwp * 0.8, // Conservative roof use
    annualLoadKwh / C_AND_I_CONSTANTS.annualYieldPerKwp.high, // Optimistic yield to meet load
  );
  const midpointSystem = Math.min(
    roofLimitKwp,
    annualLoadKwh / C_AND_I_CONSTANTS.annualYieldPerKwp.midpoint,
  );
  const highSystem = Math.min(
    roofLimitKwp * 1.1, // Slight over-provisioning potential
    annualLoadKwh / C_AND_I_CONSTANTS.annualYieldPerKwp.low, // Conservative yield
  );

  const systemKwpRange = buildBand([lowSystem, midpointSystem, highSystem], "decimal");

  const lowAnnualGeneration = systemKwpRange.low * C_AND_I_CONSTANTS.annualYieldPerKwp.low;
  const midpointAnnualGeneration =
    systemKwpRange.midpoint * C_AND_I_CONSTANTS.annualYieldPerKwp.midpoint;
  const highAnnualGeneration = systemKwpRange.high * C_AND_I_CONSTANTS.annualYieldPerKwp.high;

  const savingsMargin = C_AND_I_CONSTANTS.gridVariableRateBdt - C_AND_I_CONSTANTS.netsoPpaRateBdt;

  const lowAnnualSavings = lowAnnualGeneration * savingsMargin;
  const midpointAnnualSavings = midpointAnnualGeneration * savingsMargin;
  const highAnnualSavings = highAnnualGeneration * savingsMargin;

  const monthlySavingsBdtRange = buildBand(
    [lowAnnualSavings / 12, midpointAnnualSavings / 12, highAnnualSavings / 12],
    "integer",
  );

  // Calculate 20-year savings with 3% triennial PPA escalation
  const calculateLifetimeSavings = (annualGen: number) => {
    let totalSavings = 0;
    let currentPpaRate = C_AND_I_CONSTANTS.netsoPpaRateBdt;
    
    for (let year = 1; year <= C_AND_I_CONSTANTS.ppaTermYears; year++) {
      // Degrade generation by 0.5% each year (from GROUND TRUTH)
      const degradedGen = annualGen * Math.pow(1 - 0.005, year - 1);
      
      // Escalate PPA rate by 3% every 3 years
      if (year > 1 && (year - 1) % C_AND_I_CONSTANTS.ppaEscalationInterval === 0) {
        currentPpaRate = currentPpaRate * (1 + C_AND_I_CONSTANTS.ppaEscalationRate);
      }
      
      // Assume grid rate stays constant at 12.98 (conservative)
      const yearSavings = degradedGen * (C_AND_I_CONSTANTS.gridVariableRateBdt - currentPpaRate);
      totalSavings += yearSavings;
    }
    return totalSavings;
  };

  const ppaTermSavingsBdtRange = buildBand(
    [
      calculateLifetimeSavings(lowAnnualGeneration),
      calculateLifetimeSavings(midpointAnnualGeneration),
      calculateLifetimeSavings(highAnnualGeneration)
    ],
    "integer",
  );


  return {
    systemKwp: systemKwpRange.midpoint,
    systemKwpRange,
    monthlySavingsBdt: monthlySavingsBdtRange.midpoint,
    monthlySavingsBdtRange,
    annualSavingsBdt: roundCurrency(midpointAnnualSavings),
    ppaTermSavingsBdt: ppaTermSavingsBdtRange.midpoint,
    ppaTermSavingsBdtRange,
    co2SavedTonnes: roundOneDecimal((midpointAnnualGeneration * C_AND_I_CONSTANTS.co2KgPerKwh) / 1000),
    annualGenerationKwh: roundCurrency(midpointAnnualGeneration),
    confidenceLabel: "resco_ppa",
    assumptions: RESCO_PPA_ASSUMPTIONS,
    disclaimer:
      "Preliminary estimate for a Commercial & Industrial PPA model. Actual savings depend on final system design, consumption patterns, and grid tariffs.",
  };
}

// BPDB bill calculation is no longer needed for a PPA model, as savings are a direct rate arbitrage.
// The functions calculateMonthlyBill and the TARIFF_SLABS can be removed.
export function calculateMonthlyBill(monthlyKwh: number): number {
  const bill = monthlyKwh * C_AND_I_CONSTANTS.gridVariableRateBdt;
  return roundCurrency(bill);
}
