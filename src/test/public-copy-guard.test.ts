import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const rootDir = path.resolve(__dirname, "../..");

function read(relativePath: string) {
  return readFileSync(path.join(rootDir, relativePath), "utf8");
}

describe("public copy guard", () => {
  it("keeps unsupported public claim phrases out of production-facing files", () => {
    const fileChecks: Array<{ file: string; banned: string[] }> = [
      {
        file: "src/lib/site-copy.ts",
        banned: [
          "5–8% higher resale value",
          "85%",
          "12+",
          "BDT 7,000+",
          "120+",
          "1.4 MW",
          "6,200 t",
          "fixed-price quote",
          "feasibility report",
          "under three weeks",
        ],
      },
      {
        file: "src/components/home/SolarCalculatorFunnel.tsx",
        banned: ["full report", "24 hours", "Send my report"],
      },
      {
        file: "src/components/home/ProductSection.tsx",
        banned: ["180 km/h", "25 years", "5–10 days", "5–15 kWp"],
      },
      {
        file: "src/components/SEO.tsx",
        banned: ["fixed-price quote", "180 km/h winds", "under three weeks"],
      },
      {
        file: "src/lib/site-metadata.ts",
        banned: ["fixed-price quote", "180 km/h winds", "under three weeks"],
      },
      {
        file: "vite.config.ts",
        banned: ["fixed-price quote", "180 km/h winds", "under three weeks"],
      },
      {
        file: "scripts/verify-seo-build.mjs",
        banned: ["fixed-price quote", "180 km/h winds", "under three weeks"],
      },
    ];

    for (const check of fileChecks) {
      const content = read(check.file);

      for (const phrase of check.banned) {
        expect(content).not.toContain(phrase);
      }
    }
  });

  it("aligns production URL defaults to the deployment domain", () => {
    const files = [
      "src/lib/site-metadata.shared.js",
      "index.html",
      ".env.example",
      "public/robots.txt",
    ];

    for (const file of files) {
      expect(read(file)).toContain("https://netsoenergy.com");
    }
  });
});
