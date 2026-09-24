#!/usr/bin/env node
// Fails when npm audit reports advisories at or above the configured threshold,
// ignoring anything recorded in audit-allowlist.json (id, module, or advisory URL).
// Usage: node scripts/audit-gate.mjs [--level=high]
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const LEVELS = { low: 0, moderate: 1, high: 2, critical: 3 };

const levelArg = process.argv.find((arg) => arg.startsWith("--level="));
const threshold = LEVELS[(levelArg?.split("=")[1] ?? "high").toLowerCase()];
if (threshold === undefined) {
  console.error("Invalid --level. Use one of: low, moderate, high, critical.");
  process.exit(2);
}

let audit;
try {
  audit = JSON.parse(
    execFileSync("npm", ["audit", "--json"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }),
  );
} catch (error) {
  // npm audit exits non-zero when advisories exist; stdout still carries the JSON.
  if (!error.stdout) {
    console.error("npm audit failed to run:", error.message);
    process.exit(2);
  }
  audit = JSON.parse(error.stdout);
}

let allowlist = [];
const allowlistPath = path.join(process.cwd(), "audit-allowlist.json");
if (existsSync(allowlistPath)) {
  allowlist = JSON.parse(readFileSync(allowlistPath, "utf8"));
}
const isAllowed = (id, module, url) =>
  allowlist.some(
    (entry) =>
      entry.id === id ||
      (module && entry.module === module) ||
      (url && entry.url === url),
    );

const violations = [];
for (const [moduleName, advisory] of Object.entries(audit.vulnerabilities ?? {})) {
  const severity = advisory.severity?.toLowerCase();
  if (!severity || LEVELS[severity] < threshold) continue;
  const via = advisory.via ?? [];
  const direct = via.filter((v) => typeof v === "object");
  if (direct.length === 0) {
    // Vulnerable only through a dependency that is itself listed; skip to avoid
    // duplicate reports — the root advisory covers it.
    if (via.some((v) => audit.vulnerabilities[v])) continue;
    violations.push({ module: moduleName, severity, title: "transitive dependency" });
    continue;
  }
  for (const v of direct) {
    if (isAllowed(v.source, moduleName, v.url)) continue;
    violations.push({
      id: v.source,
      module: moduleName,
      severity,
      title: v.title,
      url: v.url,
    });
  }
}

if (violations.length === 0) {
  console.log(`Audit gate passed: no advisories at or above ${Object.keys(LEVELS)[threshold]}.`);
  process.exit(0);
}

console.error(`Audit gate FAILED: ${violations.length} advisory(ies) at or above ${Object.keys(LEVELS)[threshold]}:\n`);
for (const v of violations) {
  console.error(`  [${v.severity}] ${v.module}: ${v.title}${v.url ? `\n           ${v.url}` : ""}${v.id ? `\n           (allowlist by id: ${v.id})` : ""}`);
}
console.error("\nFix with `npm audit fix`, or add the advisory id/url to audit-allowlist.json if accepted.");
process.exit(1);
