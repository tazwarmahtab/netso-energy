#!/usr/bin/env node
/**
 * netso-observer.js
 * Netso-specific weekly pattern extractor.
 *
 * Reads: ~/Documents/30-Atlas/Netso/ops-observations.log
 * Analyzes: tool calls, file edits, domain patterns, blocker types
 * Outputs: Wiki pages in ~/Documents/30-Atlas/wiki/concepts/
 *          Concept stubs for new patterns discovered
 *          Updates: ~/Documents/30-Atlas/wiki/log.md
 *
 * Run: Every Sunday 8pm via cron (or manually on /netso-observe)
 *
 * Pattern categories learned:
 *   - RESCO: what causes delays in SREDA/BPDB submissions
 *   - Procurement: which certifications actually block installations
 *   - Outreach: which factory objections come up most often
 *   - Legal: contract clauses that trip up customers
 *   - Finance: unit economics corrections made mid-session
 *   - Governance: fact corrections (wrong BDT numbers)
 *
 * Usage: node netso-observer.js [--dry-run]
 *
 * Author: ATLAS (Netso COO Agent)
 * Pattern: ECC continuous-learning-v2 instinct extraction adapted for BD solar
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');

const OBS_LOG = path.join(
  process.env.HOME,
  'Documents/30-Atlas/Netso/ops-observations.log'
);
const WIKI_CONCEPTS = path.join(
  process.env.HOME,
  'Documents/30-Atlas/wiki/concepts/'
);
const WIKI_LOG = path.join(
  process.env.HOME,
  'Documents/30-Atlas/wiki/log.md'
);
const PROGRESS_MD = path.join(
  process.env.HOME,
  'Documents/10-Projects/Netso_HQ/Operations/PROGRESS.md'
);

// ── Domain classification ──────────────────────────────────────────────────────
function classifyToolAction(tool, action) {
  const lower = `${tool}|${action}`.toLowerCase();
  if (/resco|sreda|berc|bpdb|nem|ppa|trademark/.test(lower)) return 'RESCO';
  if (/procurement|supplier|po|inverter|panel|sreda_cert/.test(lower)) return 'Procurement';
  if (/outreach|crm|factory|proposal|opex/.test(lower)) return 'Outreach';
  if (/onsite|installation|commissioning|inspection|structural/.test(lower)) return 'Onsite';
  if (/finance|cost|bdt|economics|irr|payback|cashflow/.test(lower)) return 'Finance';
  if (/legal|contract|epc|ppa|subcontractor/.test(lower)) return 'Legal';
  if (/shield|governance|escalation|taz|approval/.test(lower)) return 'Governance';
  if (/wiki|log\.md|index\.md|fil/.test(lower)) return 'Filing';
  return 'General';
}

// ── Parse observation log ────────────────────────────────────────────────────
function parseObservations(logPath) {
  if (!fs.existsSync(logPath)) return [];

  const raw = fs.readFileSync(logPath, 'utf8');
  const lines = raw.split('\n').filter(Boolean);
  const observations = [];

  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      observations.push(obj);
    } catch {
      // Non-JSON lines are raw notes — wrap them
      observations.push({ type: 'note', text: line });
    }
  }
  return observations;
}

// ── Group observations by domain ─────────────────────────────────────────────
function groupByDomain(observations) {
  const groups = {};
  for (const obs of observations) {
    const domain = obs.domain || classifyToolAction(obs.tool || '', obs.action || '');
    if (!groups[domain]) groups[domain] = [];
    groups[domain].push(obs);
  }
  return groups;
}

// ── Detect recurring patterns ─────────────────────────────────────────────────
// Heuristic: if the same file/tool appears >= 3 times, it's a pattern
function detectPatterns(observations) {
  const fileCounts = {};
  const factCorrections = [];
  const blocks = [];

  for (const obs of observations) {
    if (obs.file) {
      fileCounts[obs.file] = (fileCounts[obs.file] || 0) + 1;
    }
    if (obs.fact_corrected) {
      factCorrections.push(obs.fact_corrected);
    }
    if (obs.blocker) {
      blocks.push(obs.blocker);
    }
  }

  // Files touched 3+ times — high-friction files
  const highFrictionFiles = Object.entries(fileCounts)
    .filter(([, count]) => count >= 3)
    .map(([file, count]) => ({ file, count }));

  return { highFrictionFiles, factCorrections, blocks };
}

// ── Generate concept stub from domain ────────────────────────────────────────
function generateConceptStub(domain, patterns) {
  const stubs = generateDomainStubs();
  const stub = stubs[domain];
  if (!stub) return null;

  const now = new Date().toISOString().split('T')[0];
  const content = `---
name: ${stub.slug}
description: Netso ${domain} execution insight — accumulated from ops observations
origin: netso-observer
confidence: medium
tags: [${domain.toLowerCase()}, ops, netso]
created: ${now}
updated: ${now}
type: concept
---

# ${stub.title}

${stub.summary}

## Key Patterns Detected

${patterns.highFrictionFiles.length > 0 ? patterns.highFrictionFiles.map(p =>
  `- **High friction file** (\`${p.file}\` — touched ${p.count}x) — ${stub.highFriction}
`).join('\n') : '- _No high-friction files detected in this period._'}

${patterns.blocks.length > 0 ? `## Blockers Commonly Encountered
${patterns.blocks.slice(0, 5).map(b => `- ${b}`).join('\n')}` : ''}

## Actions Taken

- [[RESCO-Navigator]] / [[Procurement-Controller]] — handle ${domain.toLowerCase()} execution
- Review this page weekly as part of ATLAS ops session

## Connections

- [[Netso]] — parent entity
- [[Operations/PROGRESS.md]] — execution progress tracker
- [[concepts/RESCO-Model]] — regulatory framework
${patterns.factCorrections.length > 0 ? `- [fact-corrections] — ${patterns.factCorrections.length} BDT number corrections made` : ''}

## Sources

Generated by [[ops-observer]] on ${now} — review and promote to high confidence once pattern holds for 3+ weeks.
`;

  return content;
}

function generateDomainStubs() {
  return {
    RESCO: {
      slug: 'RESCO-Execution-Insights',
      title: 'RESCO Execution Insights',
      summary: 'Patterns from RESCO registration operations: SREDA application process, BPDB NEM agreement, energy lawyer coordination, and regulatory submission governance.',
      highFriction: 'requires ATLAS + Taz approval gate before action — consider pre-approval workflow'
    },
    Procurement: {
      slug: 'Procurement-Execution-Insights',
      title: 'Procurement Execution Insights',
      summary: 'Patterns from supplier engagement: SREDA certification verification, AIT handling, IEC compliance checks, and distributor relationship development.',
      highFriction: 'certification check is a hard blocker — automate SREDA portal verification'
    },
    Outreach: {
      slug: 'Outreach-Execution-Insights',
      title: 'Outreach Execution Insights',
      summary: 'Patterns from B2B factory sales: objection handling, OPEX proposal assembly, and factory kWp estimation.',
      highFriction: 'proposal assembly takes multiple sessions — pre-fill OPEX template in first session'
    },
    Onsite: {
      slug: 'Onsite-Execution-Insights',
      title: 'Onsite Execution Insights',
      summary: 'Patterns from installation operations: 15-point inspection completion, licensed engineer coordination, and commissioning within BPDB 8-month window.',
      highFriction: 'commissioning deadline is hard — monitor BPDB clock proactively'
    },
    Finance: {
      slug: 'Finance-Execution-Insights',
      title: 'Finance Execution Insights',
      summary: 'Patterns from financial operations: unit economics corrections, BDT number precision, cash flow tracking, and OPEX proposal pricing.',
      highFriction: 'BDT numbers must be sourced from Operations/CLAUDE.md — never from memory'
    },
    Legal: {
      slug: 'Legal-Execution-Insights',
      title: 'Legal Execution Insights',
      summary: 'Patterns from legal operations: EPC contract review, contract clause negotiation, and energy lawyer workflow.',
      highFriction: 'EPC contract must go to BD energy lawyer before any submission'
    },
    Governance: {
      slug: 'Governance-Execution-Insights',
      title: 'Governance Execution Insights',
      summary: 'Patterns from governance events: Taz approval routing, escalation thresholds, fact corrections, and compliance violations.',
      highFriction: 'Taz approval required for >BDT 50K spend and any public regulatory submission'
    },
  };
}

// ── Write concept page to wiki ────────────────────────────────────────────────
function writeConceptPage(domain, content) {
  const stubs = generateDomainStubs();
  const slug = stubs[domain]?.slug || domain;
  const filePath = path.join(WIKI_CONCEPTS, `${slug}.md`);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

// ── Append to wiki log ────────────────────────────────────────────────────────
function logToWiki(summary) {
  if (!fs.existsSync(WIKI_LOG)) return;
  const entry = `## [${new Date().toISOString().split('T')[0]}] auto | netso-observer: ${summary}`;
  fs.appendFileSync(WIKI_LOG, entry + '\n', 'utf8');
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log('[netso-observer] Starting weekly analysis...');

  if (DRY_RUN) {
    console.log('[netso-observer] DRY RUN — no files will be written');
  }

  const observations = parseObservations(OBS_LOG);
  const cutoffDays = 7;
  const cutoff = Date.now() - (cutoffDays * 24 * 60 * 60 * 1000);

  // Filter to last 7 days
  const recentObs = observations.filter(obs => {
    if (!obs.timestamp) return true;
    return new Date(obs.timestamp).getTime() > cutoff;
  });

  if (recentObs.length === 0) {
    console.log('[netso-observer] No observations in the last 7 days. Skipping.');
    return;
  }

  console.log(`[netso-observer] ${recentObs.length} observations in last ${cutoffDays} days`);

  const byDomain = groupByDomain(observations);
  const patterns = detectPatterns(recentObs);

  console.log('\nDomain distribution:');
  for (const [domain, obs] of Object.entries(byDomain)) {
    console.log(`  ${domain}: ${obs.length} observations`);
  }

  if (patterns.highFrictionFiles.length > 0) {
    console.log('\nHigh-friction files (touched 3+ times):');
    for (const { file, count } of patterns.highFrictionFiles) {
      console.log(`  [${count}x] ${file}`);
    }
  }

  // Generate + write concept stubs for domains with significant activity
  const writtenFiles = [];
  for (const [domain, obs] of Object.entries(byDomain)) {
    if (obs.length < 3) continue; // Minimum 3 obs before filing

    const content = generateConceptStub(domain, patterns);
    if (!content) continue;

    if (DRY_RUN) {
      console.log(`[dry-run] Would write: concepts/${generateDomainStubs()[domain]?.slug || domain}.md`);
    } else {
      const written = writeConceptPage(domain, content);
      writtenFiles.push(written);
      console.log(`[netso-observer] Wrote: ${path.basename(written)}`);
    }
  }

  // Log to wiki
  const totalObs = Object.values(byDomain).reduce((s, a) => s + a.length, 0);
  const summary = `${totalObs} obs analyzed, ${writtenFiles.length} concept pages updated, ${patterns.highFrictionFiles.length} high-friction files`;

  if (!DRY_RUN) {
    logToWiki(summary);
    // Archive old observations
    const archiveDir = path.join(path.dirname(OBS_LOG), 'archive');
    fs.mkdirSync(archiveDir, { recursive: true });
    const archiveFile = path.join(archiveDir, `obs-${Date.now()}.jsonl`);
    if (observations.length > 100) {
      fs.writeFileSync(archiveFile, observations.map(o => JSON.stringify(o)).join('\n'), 'utf8');
      // Truncate log to recent only
      const mostRecent = observations.slice(-50);
      fs.writeFileSync(OBS_LOG, mostRecent.map(o => JSON.stringify(o)).join('\n'), 'utf8');
      console.log(`[netso-observer] Archived ${observations.length - 50} observations to ${path.basename(archiveFile)}`);
    }
  }

  console.log(`\n[netso-observer] Complete. Summary: ${summary}`);
}

main();