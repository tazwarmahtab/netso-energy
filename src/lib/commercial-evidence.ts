/**
 * Governance primitives for public-facing engineering and commercial claims.
 *
 * Adapted as a clean implementation of the source-registry pattern evaluated
 * in netso-energy-website. No external repository assumptions or rates are copied.
 */
export type EvidenceStatus =
  | "verified"
  | "provisional"
  | "internal-assumption"
  | "rejected";

export interface EvidenceRecord {
  id: string;
  title: string;
  status: EvidenceStatus;
  sourceUrl?: string;
  sourceDocument?: string;
  effectiveDate?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes: string;
}

export interface CommercialAssumption {
  id: string;
  label: string;
  value: number;
  unit: string;
  evidenceId: string;
  effectiveDate?: string;
  approvedForPublication: boolean;
}

export type EvidenceLookup = ReadonlyMap<string, EvidenceRecord>;

/**
 * A numeric commercial assumption may be published only when its supporting
 * evidence is explicitly verified and the assumption itself is approved.
 * This is a safety gate, not a substitute for legal/financial sign-off.
 */
export function canPublishAssumption(
  assumption: CommercialAssumption,
  evidence: EvidenceLookup,
): boolean {
  if (!Number.isFinite(assumption.value) || !assumption.unit.trim()) return false;
  if (!assumption.approvedForPublication) return false;
  const record = evidence.get(assumption.evidenceId);
  return Boolean(
    record &&
      record.status === "verified" &&
      record.reviewedAt &&
      record.reviewedBy &&
      (record.sourceUrl || record.sourceDocument),
  );
}

export function assertPublishableAssumptions(
  assumptions: readonly CommercialAssumption[],
  evidence: EvidenceLookup,
): void {
  const rejected = assumptions.filter((item) => !canPublishAssumption(item, evidence));
  if (rejected.length) {
    throw new Error(
      `Unapproved commercial assumptions: ${rejected.map((item) => item.id).join(", ")}`,
    );
  }
}
