# Netso Energy — Claims Ledger

Generated 2026-09-08 from repository sources (`src/lib/site-copy.ts`, `src/lib/solar-engine.ts`, `docs/` packs, `src/test/*`). This is a working ledger, not legal advice. Status values: `VERIFIED_REPO`, `OFFICIAL_SOURCE`, `NEEDS_OWNER`, `WITHHELD`.

## Brand and identity

| Claim | Exact wording | Location | Source | Status | Notes |
|---|---|---|---|---|---|
| Public brand name | NETSO ENERGY | site-copy EN+BN `common.brand`, site-metadata `SITE_NAME`, index.html title/OG | Repo canonical | VERIFIED_REPO | GPT-6 flagged "Net Energy vs Netso Energy". Repo surfaces all say NETSO ENERGY. Owner must resolve legal vs trading name once; no code change until then. |
| Operating market | Rooftop energy infrastructure for Bangladesh / Dhaka | hero eyebrow, footer | Repo copy | VERIFIED_REPO | City-level "Dhaka" appears in hero eyebrow; broader BD copy lives in footer. |
| Language support | English + Bangla full parity | site-copy `en` + `bn` blocks | Repo | VERIFIED_REPO | 35 unit tests cover i18n render. |

## Engineering and tariff model (solar-engine v2.0)

| Claim | Exact wording | Source | Status | Notes |
|---|---|---|---|---|
| C&I displaced rate BDT 12.98/kWh (MT-2) | "Medium-tension commercial & industrial variable energy rate" | solar-engine `TARIFF_BENCHMARKS.c_and_i` | OFFICIAL_SOURCE (BERC June 2026 per code comment) | Cross-check against BERC schedule before any rate-sheet publication. |
| Common-service rate BDT 14.50/kWh | "Residential Common Services (LT-E / Pump & Lift)" | solar-engine | OFFICIAL_SOURCE (BERC June 2026 per code comment) | Same cross-check. |
| Residential high-tier BDT 15.01/kWh | "LT-A 401+ Units" | solar-engine | OFFICIAL_SOURCE (BERC June 2026 per code comment) | Same cross-check. |
| PPA base rate BDT 10.00/kWh, 3% triennial escalation, 20yr, 0.5% degradation | `SOLAR_ENGINE_CONSTANTS` + `ruhbayna-miss-100unit-pilot-pack` | Repo + docs pack | VERIFIED_REPO | Matches contract pack Term Sheet Template 2026-08-26. |
| Dhaka yield 1340.3 kWh/kWp/yr (15.3% CF) | solar-engine `annualYieldPerKwp.dhaka` | Repo | VERIFIED_REPO | Chattogram 1445.4 (16.5%), other 1320.0. Conservative 1300 / optimistic 1550 bound ranges. |
| Demand offset heuristic min(peakDemand*0.12, system*0.18)*rate | `getSavingsModel` demand block | Repo | VERIFIED_REPO | Labeled illustrative in UI; pending billing-demand and interval-load study. Never quote as guaranteed. |
| SREDA NEM export benchmark | Code constant BDT 8.39/kWh; TAM pack memo cites BDT 6.4523/kWh (BERC/DESCO) | Repo + docs | NEEDS_OWNER | Two figures exist in-tree. UI correctly excludes export credit from monthly savings and shows advisory notice. Owner: confirm current applicable credit before any export-savings claim. |
| Turnkey CAPEX benchmarks (Scenario A) | c_and_i 60000, residential_multi_story 60000, common_service 70000 BDT/kWp | solar-engine (merged `5ce6c15` canonical 60k) | VERIFIED_REPO | Planning benchmarks only; not published as price list on homepage. |
| Roof utilisation 0.65, 100 sqft/kWp, grid factor 0.58 kg/kWh | `SOLAR_ENGINE_CONSTANTS` | Repo | VERIFIED_REPO | Shown in assumptions panel. |

## Marketing copy and proof posture

| Claim | Exact wording | Location | Status | Notes |
|---|---|---|---|---|
| Hero headline "Shade, built to generate." | site-copy `hero.headline` | Repo | VERIFIED_REPO | Positioning claim, not a performance claim. |
| Problem thesis "The city already built the power plant..." | site-copy `problem.headline` | Repo | VERIFIED_REPO | Editorial thesis, hedged with "can/may/site-reviewed" voice discipline. |
| Trust eyebrow "Trusted on rooftops across Dhaka" + Gulshan/Mirpur/Dhanmondi cards | site-copy `trust.*` | Repo | NEEDS_OWNER | Cards carry no kW, photos, or dates and read as placeholders. Either attach verified project data + permission, or rewrite as capability/process proof. Do not publish as completed projects without evidence. |
| WhatsApp handoff "replies in English or বাংলা — usually within 2 hours" | site-copy `common.whatsappHandoffNote` | Repo | NEEDS_OWNER | Response-time promise. Owner must confirm staffing/SLA or soften to "we aim to reply". |
| "Free first review · No obligation" style supporting line | Proposed by GPT-6 Astra, NOT in repo | — | WITHHELD | Do not publish "free / no obligation" until owner confirms. |
| Savings percentages, payback periods, kW of installed base, testimonials, awards, certifications | None published on homepage | — | WITHHELD | Correctly absent. Keep withheld until MEASURED_PROJECT_DATA + permission. |
| Battery backup / outage operation | Not claimed on homepage | — | WITHHELD | Contract pack guarantees 98% hardware availability + 24h tech dispatch and LFP BESS specs, but homepage makes no backup claim. Keep it that way until a sized backup product ships with docs. |

## Sources checked 2026-09-08

- `src/lib/site-copy.ts` (EN + BN blocks), `src/lib/site-metadata.shared.js`, `index.html` SEO tags
- `src/lib/solar-engine.ts` v2.0 + `src/test/solar-engine.test.ts` (15 tests)
- `docs/contract-covenants-and-guarantee-pack.md` (Term Sheet Template 2026-08-26), `docs/tam-sam-som-analysis.md`, `docs/residential-dual-revenue-ppa-model.md`
- Detector scan `detect.mjs`: clean; Vitest 35/35; build clean.

## Review cadence

Re-verify tariff and NEM figures against BERC/SREDA publications quarterly or before any rate-sheet, proposal, or paid-traffic change. Expire this ledger 2026-12-08.
