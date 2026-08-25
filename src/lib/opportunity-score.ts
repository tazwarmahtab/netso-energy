export type OpportunityInput = {
  facilityType: string;
  estimatedCapacityKwp: number;
  ppaInterest: boolean;
  dataCompleteness: number;
  daytimeLoad?: boolean;
  generatorUse?: boolean;
};

export type OpportunityScore = {
  score: number;
  band: "hot" | "warm" | "low";
  factors: string[];
};

export function scoreSolarOpportunity(input: OpportunityInput): OpportunityScore {
  let score = 0;
  const factors: string[] = [];
  if (["factory", "commercial", "warehouse"].includes(input.facilityType)) { score += 20; factors.push("Strong C&I facility fit"); }
  else if (input.facilityType === "school") { score += 12; factors.push("Institutional facility fit"); }
  if (input.estimatedCapacityKwp >= 500) { score += 25; factors.push("Large project opportunity"); }
  else if (input.estimatedCapacityKwp >= 250) { score += 18; factors.push("Material project opportunity"); }
  else if (input.estimatedCapacityKwp >= 100) { score += 10; factors.push("Qualified project scale"); }
  if (input.ppaInterest) { score += 20; factors.push("PPA intent"); }
  if (input.dataCompleteness >= 0.8) { score += 15; factors.push("High data completeness"); }
  else if (input.dataCompleteness >= 0.5) score += 8;
  if (input.daytimeLoad) { score += 10; factors.push("Daytime load supports self-consumption"); }
  if (input.generatorUse) { score += 10; factors.push("Generator use may increase energy-value opportunity"); }
  score = Math.max(0, Math.min(100, score));
  return { score, band: score >= 70 ? "hot" : score >= 45 ? "warm" : "low", factors };
}
