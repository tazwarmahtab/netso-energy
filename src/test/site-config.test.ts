import { describe, expect, it } from "vitest";

import { claimRegistry } from "@/lib/claim-registry";
import { marketingRouteEntries } from "@/lib/site-metadata";

describe("site config", () => {
  it("defines metadata for every public marketing route", () => {
    expect(marketingRouteEntries.map(([route]) => route)).toEqual([
      "/",
      "/how-it-works",
      "/products",
      "/projects",
      "/about",
      "/feasibility",
    ]);
  });

  it("requires a source for every verified claim", () => {
    const verifiedClaimsWithoutSource = claimRegistry.filter(
      (claim) => claim.status === "verified" && claim.sources.length === 0,
    );

    expect(verifiedClaimsWithoutSource).toHaveLength(0);
  });

  it("tracks only publishable claim states", () => {
    const validStatuses = new Set(["verified", "internal-proof-only", "rewrite", "remove"]);

    expect(claimRegistry.every((claim) => validStatuses.has(claim.status))).toBe(true);
  });
});
