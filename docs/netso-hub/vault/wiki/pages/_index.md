---
created: 2026-04-29
updated: 2026-05-22
type: wiki-index
total-pages: 26
total-sources: 24+
---

# Wiki Index

Last updated: 2026-05-22
Total pages: 26 (9 initial + 15 added in deep dive + 2 AI-platform source summaries)
Sources ingested: 24+ files from iCloud, 30-Atlas, 10-Projects, local AI/browser capture

**Contradiction Resolution Pass (2026-05-22):** 10 contradictions identified and resolved. Pilot specs corrected to 4.3kW (7×620W Longi bifacial, 3.5kW Growatt inverter, ৳2.5L cost). 100kW CAPEX standardized to ৳46.8L (pilot-validated v4.0), replacing old ৳87L IDCOL PCN draft numbers. All financial metrics (IRR 42%, payback 2.6yr, DSCR 2.91x) now consistent across wiki.

---

## Entities (8)

- [[netso]] — Bangladesh rooftop solar startup (RESCO/BOO), founder Tazwar Mahtab, targeting 1 MW threshold. (4 sources, high confidence)
- [[tazwar-mahtab]] — Founder, MD Netso Energy. Unfair advantage: family garment network → 20-30 factory rooftops. (2 sources, high)
- [[jinko-solar]] — Tier-1 Chinese panel manufacturer, Netso primary vendor (JKM720N-66HL5-BDV 720W bifacial). (2 sources, high)
- [[bluesun-solar]] — Tier-2 Chinese manufacturer, secondary vendor option. (0 sources, low)
- [[chandler-agent]] — Unit economics specialist, maintains canonical PPA model (`models/02-unit-economics.md`). (1 source, high)
- [[ross-agent]] — RESCO finance, IDCOL debt, SREDA/BERC compliance, cap table. (1 source, high)
- [[rachel-agent]] — Investor communications, pitch deck, YC application, data room. (1 source, high)
- [[monica-agent]] — FP&A, MBR, rolling forecasts (defined in `netso-fpa.md`). (pending page)

## Concepts (8)

- [[solar-pergola]] — Netso flagship product: integrated PV canopy providing shade + electricity + architectural value. (3 sources, high)
- [[netso-unit-economics]] — 100kW base case: ৳87L CAPEX, 22% IRR, 5.2yr payback, DSCR 1.78x. (2 sources, high)
- [[netso-2026-strategy]] — 7-year roadmap: 1MW threshold, architectural amenity positioning, garment cluster first. (3 sources, high)
- [[idcol-financing]] — 80% debt @ 9%, 15yr tenure, DSCR ≥1.4x. Tranche structure for 100kW: 3 tranches. (2 sources, high)
- [[netso-nem-process]] — 6-step NEM registration: eligibility → DISCO app → review → meter → commission → billing. (1 source, high)
- [[resco-model]] — Build-Own-Operate: Netso owns, customer pays ৳7-9/kWh for 25yr, zero upfront. (2 sources, high)
- [[net-metering-2025]] — SREDA NEM 2.0: 100% load, single-phase, direct bank payout. (1 source, high)
- [[pilot-unit-economics]] — 4kW pilot: ৳4.68L, IRR 42%, 2.6yr payback. (2 sources, high)

## Topics (1)

- [[bangladesh-solar-market]] — <2.5% penetration, rising tariffs, mandatory rooftop rule, IDCOL financing. (2+ sources, medium)

## Patterns (4)

- [[factory-outreach]] — 2-min cold call script, objection matrix, 20-30 calls/day → 10-15% meeting rate. (1 source, high)
- [[netso-faq]] — Factory owner FAQ: business model (BOO), financials (zero upfront), technical (25yr warranty). (1 source, high)
- [[trust-blocker-pattern]] — High-bill customers hesitate due to installer distrust, not price. Primary blocker. (1 source, medium)

## Syntheses (0)

*None yet — run after 30+ pages for cross-cutting synthesis.*

## Performance (0)

*None yet — pending first sales results and installed capacity data.*

## Market Intelligence (0)

*None yet — pending ICP-segmented pages (residential Gulshan/Banani vs. Gazipur RMG).*

## Source Summaries (5)

Sources already processed from 30-Atlas wiki:
- [[src-netso-summary]] — Phase 1 summary, policy (NEM 2025: 100% load, single-phase).
- [[src-netso-vc-verdict]] — Investor readiness assessment (1MW threshold, solo founder risk).
- [[src-netso-roadmap]] — 7-year growth plan to 30 MW.
- [[2026-04-30-ai-platform-context-capture]] — Current AI-platform/Safari capture manifest, raw browser capture inventory, and Claude Code handoff pack.
- [[2026-04-30-ai-conversation-url-captures]] — 29 captured Claude/ChatGPT Netso conversations, strategic takeaways, contradictions, and follow-up page recommendations.

---

## Vault Statistics

| Metric | Before Deep Dive | Current |
|--------|-----------------|-----------------|
| Total wiki pages | 9 | 26 |
| Entities | 2 | 8 |
| Concepts | 3 | 8 |
| Topics | 1 | 1 |
| Patterns | 1 | 4 |
| Syntheses | 0 | 0 |
| Performance | 0 | 0 |
| Ingested sources (raw/) | 0 | 24+ files |

---

## Files Copied to wiki/raw/ (by category)

| Category | Files | Status |
|----------|-------|--------|
| `atlanta-wiki/` | 8 files (src-netso-*.md, Netso.md, Netso-Operations-Hub.md, Netso-2026-Strategy.md) | ✅ Done |
| `business-plans/` | 1 file (netso_business_plan.md from iCloud) | ✅ Done |
| `market-research/` | 2 files (business_model_analysis, bangladesh_market_entry) | ✅ Done |
| `contracts/` | 6 files (FAQ, RESCO checklist, outreach script, NEM SOP, IDCOL PCN, company letter) | ✅ Done |
| `sales-ops/` | 1 file (Building_Screening_Checklist.txt) | ✅ Done |
| `agents/` | 7 files (5 finance agents + netso-observer.js + netso-observe.sh) | ✅ Done |
| `manual-review/` | 3 DOCX files (Master Intelligence Brief, AI-Org, Financial Model) | ✅ Copied (not ingestable) |

---

## Next Actions

1. **Resolve contradictions**: pilot size/status, IDCOL terms, SREDA/RESCO status, current traction, CAPEX basis
2. **Backfill stubs**: [[bluesun-solar]] (0 sources), add Monica agent page
3. **Backfill source summaries**: summarize copied raw files before deeper synthesis
4. **Official verification pass**: SREDA, BERC, BPDB, IDCOL, Bangladesh Bank, tax, tariffs, and competitor claims
5. **Create platform/strategy pages**: Netso AI agent architecture, platform architecture, website strategy, factory RESCO vs residential pergola
6. **OpenCLI export follow-up**: connect Browser Bridge in Chrome if live Codex/ChatGPT exports are required

---

## How to Use This File

Read first when querying wiki. Pages with **0-1 sources** are thin evidence. Pages with **2+ sources** are well-evidenced for deal decisions.

---

## Syntheses (1)

- [[netso-swot]] — Strategic SWOT analysis: pilot-validated economics (42% IRR, 2.6yr payback), regulatory tailwind window, rooftop acquisition speed as the single strategic metric. First synthesis page. (10 sources, high confidence)

---

## Vault Statistics (Updated 2026-05-26)

| Metric | Before Deep Dive | Post-Audit | Current (Post-SWOT) |
|--------|-----------------|------------|---------------------|
| Total wiki pages | 9 | 26 | **27** |
| Entities | 2 | 8 | 8 |
| Concepts | 3 | 8 | 8 |
| Topics | 1 | 1 | 1 |
| Patterns | 1 | 4 | 4 |
| Syntheses | 0 | 0 | **1** |
| Performance | 0 | 0 | 0 |

---

## What Changed (2026-05-26)

- **Added: [[netso-swot]]** — Cross-cutting synthesis connecting 15+ pages into a structured SWOT. Identifies rooftop acquisition speed as the governing metric, the trust-leveraging flywheel, and 5 priority risks with mitigations. Exposes 5 knowledge gaps (BDT forex risk, competitor benchmarking, IDCOL details, political risk assessment, optimal batch size).
