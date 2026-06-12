---
name: PROGRESS
type: ops-bridge
description: Session-bridged progress file. Updated at every session end. Read at every session start. Do NOT delete — accumulates Netso's execution history.
updated: 2026-04-15
owner: ATLAS (Netso COO Agent)
update_rule: Append new entries (never delete history). Mark done items with [DONE]. Update "Next Action" at every session close.
---

# Netso Operations — Execution Progress

**Purpose:** This file bridges context between Claude Code sessions so ATLAS starts each session knowing exactly where execution stands — without having to read all the task trackers from scratch.

**Update Rule:** Every session end → update this file. Every session start → read this file first.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| `[DONE]` | Completed |
| `[IN PROGRESS]` | Working this session |
| `[BLOCKED]` | Waiting on external dependency (Taz, lawyer, supplier, BPDB) |
| `[OPEN]` | Not started, available for next session |
| `[TBD]` | Value still to be determined |

---

## P0: RESCO Registration (1 MW gate — no installation without this)

- [x] [DONE 2026-04-13] TIN filed — 729793567043 (NBR cert in credentials/)
- [x] [DONE 2026-04-13] NID filed — Tazwar NID in credentials/
- [x] [DONE 2026-04-13] Company registration confirmed (RJSC cert)
- [x] [DONE 2026-04-14] RESCO-Navigator agent deployed
- [x] [DONE 2026-04-14] SHIELD (Bangladeshi Legal Expert) agent deployed
- [ ] [IN PROGRESS] EPC Contract — draft from SHIELD (flagged for energy lawyer review)
- [ ] [IN PROGRESS] Subcontractor Agreement — draft from SHIELD
- [ ] [OPEN] Trademark filing — DPDT Class 37+40 (~BDT 5K, Taz to approve)
- [ ] [OPEN] SREDA R1 Application — Taz approval gate before submission
- [ ] [OPEN] Energy lawyer review of EPC drafts (~BDT 20–50K)
- [ ] [OPEN] Inverter SREDA certification verification (Sungrow specific model)
- [ ] [OPEN] Panel SREDA approval verification (Jinko JKM720N-66HL5-BDV on current portal)
- [ ] [OPEN] Licensed engineer: single-line diagram + structural cert
- [ ] [OPEN] 15-point rooftop inspection (Onsite-Commander)

**Dependency chain:** Legal drafts → Energy lawyer → Taz approval → SREDA R1 submission → BPDB NEM Agreement → Commissioning within 8 months

---

## P1: Procurement

- [ ] [OPEN] SREDA-approved panel verification: Jinko JKM720N-66HL5-BDV on current SREDA portal (not cached)
- [ ] [OPEN] SREDA-approved inverter verification: Sungrow specific model + IEC 62109-1/2 + IEC 61727 + IEC 62116
- [ ] [OPEN] Bluesun BSM565M10-72HPH (alternative) SREDA verification
- [ ] [OPEN] Jinko framework agreement / distributor relationship (Chand/Blue Star/Solartech BD)
- [ ] [OPEN] Sungrow/Huawei distributor inquiry — verify AIT included in quotation
- [ ] [OPEN] 3 supplier quotes for first 50kW project (minimum)
- [ ] [OPEN] Procurement-Tracker.md updated with active POs

---

## P2: Outreach / CRM

- [ ] [OPEN] 20 factory prospects entered in CRM-Factory-Pipeline.md
  - Required fields per prospect: company, contact name, title, email, sector, kWp estimate
- [ ] [OPEN] 5-touch B2B sequence launched for first batch (cold → warm → hot → proposal → close)
- [ ] [OPEN] First OPEX proposal sent to ≥3 qualified prospects
- [ ] [OPEN] OPEX-Proposal-Template.md used for all B2B factory proposals (verify BERC tariff BDT 10.30)

---

## P3: Onsite / Pilot

- [ ] [OPEN] 15-point rooftop structural inspection (Onsite-Commander, `Onsite-SOP.md`)
- [ ] [OPEN] Licensed engineer: rooftop structural certification
- [ ] [OPEN] Licensed engineer: single-line diagram
- [ ] [OPEN] Pilot system diary updated: monthly actual vs. theoretical generation
- [ ] [OPEN] Pilot proof pack: ROI data documented for first 3 months
- [ ] [OPEN] Installation-Tracker.md: all sites with stages from inquiry → commissioning

---

## P4: Finance

- [x] [DONE 2026-04-13] Unit economics v4.0: 42% IRR, 2.6yr payback, BDT 46.8L/100kW CAPEX
- [x] [DONE 2026-04-13] YC application package (one-pager + Q&A draft)
- [x] [DONE 2026-04-14] Cash runway: Monica (verified ~10 months with YC funding)
- [ ] [OPEN] Cashflow-13week.md updated with real PO commitments
- [ ] [OPEN] Working capital target: ~BDT 32–48L for 2 concurrent 50kW installs
- [ ] [OPEN] Cost vs. budget: verify BDT 80K–115K/kWp floor (not estimate)

---

## Recent Session Log

| Date | Session Summary | Agent | Blockers |
|------|----------------|-------|---------|
| 2026-04-15 | ECC pattern analysis: 5 patterns identified for Netso (verify, passive learning, fact-force, eval-driven completion, SHARED_TASK_NOTES) | ATLAS | / |
| 2026-04-14 | RESCO-Navigator + SHIELD deployed; TIN/NID filed; EPC drafts initiated | ATLAS | Energy lawyer, Taz approval |
| 2026-04-14 | Finance v4.0: pilot-validated IRR 42%, 2.6yr payback, BDT 46.8L/100kW | Finance-Controller | / |
| 2026-04-13 | YC package: financial one-pager + Q&A draft | Finance-Controller+Rachel | / |
| 2026-04-13 | Bangladesh solar market validated (10 metrics, minor CAPEX -10%, CF -1%) | Finance-Controller | / |

---

## Key Numbers (Verified 2026-04-15)

These are the authoritative BDT values. **Any agent stating a different number must be corrected.**

| Number | Value | Source | Status |
|--------|-------|--------|--------|
| BERC commercial tariff (LT-E) | BDT 10.30/kWh | Operations/CLAUDE.md | ✅ VERIFIED |
| System cost floor (including AIT) | BDT 80K–115K/kWp | Operations/CLAUDE.md | ✅ VERIFIED |
| O&M annual contract revenue | BDT 5K/system/year | Operations/CLAUDE.md | ✅ VERIFIED |
| Working capital (2×50kW concurrent) | ~BDT 32–48L | Operations/CLAUDE.md | ✅ VERIFIED |
| BPDB NEM approval validity | 8 months from issue | Operations/CLAUDE.md | ✅ VERIFIED |
| PPA / system design life | 25 years | Operations/CLAUDE.md | ✅ VERIFIED |
| Panel degradation (linear warranty) | 0.5%/year → 84.8% at year 25 | Jinko warranty spec | ✅ VERIFIED |
| Pilot system validated CAPEX | BDT 1.93L for 4kW | Finance/models/02-unit-economics.md | ✅ VERIFIED |
| CAPEX per kWp (pilot-validated) | BDT 46.8L/100kW | Finance/models/02-unit-economics.md | ✅ VERIFIED |
| Pilot IRR | 42% | Finance/models/02-unit-economics.md | ✅ VERIFIED |
| Pilot payback period | 2.6 years | Finance/models/02-unit-economics.md | ✅ VERIFIED |
| TIN | 729793567043 | Operations/tasks/RESCO-Application-Shell.md | ✅ VERIFIED |

---

## Next Action (Priority Order)

1. **Taz approves energy lawyer** (~BDT 20–50K) → unblocks EPC contract review → unblocks RESCO submission
2. **Taz approves trademark filing** (~BDT 5K, ~2 hours) → Trademark-Filing-Pack.md ready in Operations/tasks/
3. **Taz approves RESCO R1 submission** → once legal docs are finalized
4. **Procurement-Controller: SREDA portal check** (Jinko + Sungrow on current approved list)
5. **Outreach-Coordinator: enter 20 factory prospects** into CRM-Factory-Pipeline.md
6. **Onsite-Commander: initiate 15-point inspection** checklist execution

---

## Escalation Log

| Date | Trigger | Escalated To | Resolution |
|------|---------|--------------|-----------|
| 2026-04-14 | TIN + NID needed for RESCO | Taz | ✅ Provided |
| 2026-04-14 | Energy lawyer budget | Taz | ⏳ Pending |
| 2026-04-15 | EPC/Subcontractor contract review | Taz | ⏳ Pending |

---

*This file is the ATLAS agent's primary startup artifact. Read it first, update it at every session end.*