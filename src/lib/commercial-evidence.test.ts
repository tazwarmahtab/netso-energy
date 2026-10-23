import { describe, expect, it } from "vitest";

import {
  assertPublishableAssumptions,
  canPublishAssumption,
  type CommercialAssumption,
  type EvidenceRecord,
} from "./commercial-evidence";

const assumption: CommercialAssumption = {
  id: "proposed-ppa",
  label: "Illustrative PPA rate",
  value: 14,
  unit: "BDT/kWh",
  evidenceId: "rate-approval",
  approvedForPublication: true,
};

const verified: EvidenceRecord = {
  id: "rate-approval",
  title: "Approved rate evidence",
  status: "verified",
  sourceDocument: "Internal signed commercial approval",
  reviewedAt: "2026-10-23",
  reviewedBy: "Commercial approver",
  notes: "Test fixture only, not an actual approval",
};

describe("commercial evidence publication gate", () => {
  it("rejects an assumption with no evidence", () => {
    expect(canPublishAssumption(assumption, new Map())).toBe(false);
  });

  it("rejects provisional evidence even if assumption is flagged approved", () => {
    expect(
      canPublishAssumption(assumption, new Map([["rate-approval", { ...verified, status: "provisional" }]])),
    ).toBe(false);
  });

  it("rejects unapproved values and invalid numbers", () => {
    const sources = new Map([["rate-approval", verified]]);
    expect(canPublishAssumption({ ...assumption, approvedForPublication: false }, sources)).toBe(false);
    expect(canPublishAssumption({ ...assumption, value: Number.NaN }, sources)).toBe(false);
  });

  it("permits a documented, reviewed, approved assumption", () => {
    const sources = new Map([["rate-approval", verified]]);
    expect(canPublishAssumption(assumption, sources)).toBe(true);
    expect(() => assertPublishableAssumptions([assumption], sources)).not.toThrow();
  });

  it("fails closed when any assumption lacks approval", () => {
    expect(() => assertPublishableAssumptions([assumption], new Map())).toThrow(
      /proposed-ppa/,
    );
  });
});
