import type { PropertySegment, RegionCode } from "@/lib/solar-engine";

const CALC_STORAGE_KEY = "netso-calc-v1";

export type SavedEstimate = {
  bill: number;
  area: number;
  region: RegionCode;
  segment: PropertySegment;
  savedAt: number;
};

export function loadSavedEstimate(): SavedEstimate | null {
  try {
    const raw = localStorage.getItem(CALC_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedEstimate>;
    if (
      typeof parsed.bill !== "number" ||
      typeof parsed.area !== "number" ||
      typeof parsed.savedAt !== "number"
    ) {
      return null;
    }
    return {
      bill: parsed.bill,
      area: parsed.area,
      region: parsed.region === "chattogram" || parsed.region === "other" ? parsed.region : "dhaka",
      segment:
        parsed.segment === "residential_common_service" ||
        parsed.segment === "residential_multi_story"
          ? parsed.segment
          : "c_and_i",
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function persistEstimate(input: Omit<SavedEstimate, "savedAt">): void {
  try {
    localStorage.setItem(CALC_STORAGE_KEY, JSON.stringify({ ...input, savedAt: Date.now() }));
  } catch {
    // Private mode / disabled storage — calculator still works, memory just doesn't stick.
  }
}

export function clearSavedEstimate(): void {
  try {
    localStorage.removeItem(CALC_STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}
