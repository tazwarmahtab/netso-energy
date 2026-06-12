---
created: 2026-04-29
updated: 2026-04-30
type: wiki-log
---

# Wiki Operations Log

Append-only. The LLM adds one entry every time it performs an operation on the wiki.

Each entry format: `## [YYYY-MM-DD] operation | description | details`

Operations: `init`, `ingest`, `batch-ingest`, `query`, `lint`, `synthesis`, `deal-prep`

To see the last 10 entries:
```bash
grep "^## \[" wiki/pages/_log.md | tail -10
```

---

## [2026-04-29] init | Vault initialized | GTM Kit scaffolded, CLAUDE.md and WIKI-SCHEMA.md written, 5 initial intelligence pages seeded from Atlas wiki

---

## [2026-04-30] init | Netso overrides added to WIKI-SCHEMA.md | Section 9 added: staleness thresholds, domain fit, entity types, pattern types, ICP definition, canonical wikilinks

## [2026-04-30] deep-dive | Full vault ingest + organization | 120+ Netso files discovered across Mac (iCloud/Downloads/30-Atlas/10-Projects). 20+ markdown files copied to wiki/raw/ subdirectories. 15 new wiki pages created: netso (entity), solar-pergola, netso-unit-economics, factory-outreach, netso-nem-process, idcol-financing, netso-2026-strategy, tazwar-mahtab, chandler-agent, ross-agent, rachel-agent, netso-faq, jinko-solar (updated). Index updated 9→24 pages. .graphifyignore created. Ready for graphify + ultrareview.

## [2026-04-30] ingest | AI-platform context capture | Captured Safari AI/platform tab inventory, local Claude/Codex transcript paths, Firecrawl/OpenCLI status, and current Codex hooks context. Created `context_packs/ai-platform-consolidated-context-2026-04-30.md`, `wiki/raw/transcripts/2026-04-30-ai-platform-source-manifest.md`, and source summary `wiki/pages/sources/2026-04-30-ai-platform-context-capture.md`. Safari DOM capture blocked until "Allow JavaScript from Apple Events" is enabled.

## [2026-04-30] ingest | AI conversation and browser context consolidation | Enabled Safari Apple Events JavaScript, captured full Safari AI/platform DOM snapshot, captured Safari link inventory, and captured 29 Netso-relevant Claude/ChatGPT conversation URLs. Updated source manifest and Claude handoff pack, added `wiki/pages/sources/2026-04-30-ai-conversation-url-captures.md`, and updated index counts to 26 pages / 24+ raw sources. OpenCLI export remains blocked by missing Chrome Browser Bridge.

## [2026-05-22] maintenance | Contradiction resolution pass | 10 contradictions identified and resolved across wiki. Pilot specs corrected: 4.3kW (7×620W Longi bifacial, 3.5kW Growatt inverter, ৳2.5L cost). 100kW CAPEX standardized to ৳46.8L (pilot-validated v4.0), replacing old ৳87L IDCOL PCN draft. Financial metrics updated: IRR 42%, payback 2.6yr, DSCR 2.91x. Pages modified: netso.md, netso-unit-economics.md, pilot-unit-economics.md, idcol-financing.md, _index.md.

## [2026-05-22] research | Net metering guidelines verification | Verified official NEM portal (nem.powerdivision.gov.bd). Key confirmations: 1MW max capacity, 1kW min, all consumer categories eligible, CAPEX/OPEX models both supported. Updated net-metering-2025.md with official portal as source.

---

<!-- HOW THIS FILE WORKS

Every wiki operation gets logged here. One entry per operation. The LLM appends to this file after every ingest, query, lint, batch, or synthesis operation.

Entry examples:

## [2026-04-29] ingest | acme-rooftop-prospect.md | Created entity page for ACME Corp, updated bangladesh-solar-market, flagged 0 contradictions
## [2026-04-30] query | "What is our strongest positioning against competitor X?" | Referenced 3 pages, answer provided
## [2026-05-01] lint | Weekly health check | 2 stale pages, 1 contradiction, 0 orphans
## [2026-05-01] batch-ingest | 4 sources processed | 7 pages created, 3 updated, 1 contradiction flagged

The log serves two purposes:
1. Audit trail: you can see what changed and when
2. Health signal: if the log has no entry in 2+ weeks, the wiki is going stale

The Friday lint check reads this log to assess wiki activity for the week. -->

## [2026-05-26] synthesis | netso-swot.md | Created strategic SWOT analysis (synthesis page, page-type: synthesis). Connects 15+ wiki pages across entities, concepts, topics, and patterns. Identifies: 12 strengths (S1-S8), 8 weaknesses (W1-W8), 12 opportunities (O1-O12), 12 threats (T1-T12). Core insight: rooftop acquisition speed is the single strategic metric — finite 12-18 month window before competition consolidates. Exposed 5 knowledge gaps (BDT forex risk, competitor benchmarking, IDCOL details, political risk, optimal batch size). Index updated: syntheses from 0→1, total pages 26→27.
