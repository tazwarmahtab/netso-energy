# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this directory. For the full Netso project context, see `../.claude/CLAUDE.md`.

---

## What This Directory Is

`Operations/` is Netso's execution layer — the specialist agents, processes, SOPs, and live trackers that actually ship solar installations. It sits below the 16-agent Paperclip org (`../Code/NETSO.ini`) in the structure, but above it in execution reality.

The hierarchy is:
- **`NETSO.ini`**: Strategic coordination — what gets built, who owns it, when to escalate
- **`Operations/`**: Execution — how it gets built, tracked, and delivered
- **`Strategy/`**: Source documents and context that feed both layers

---

## Directory Structure

```
Operations/
├── CLAUDE.md                    ← You are here (agent guidance)
├── playbook.md                  ← Master index — start here for any task
├── agents/                      ← 6 execution-layer agent specs
│   ├── RESCO-Navigator.md       ← SREDA/BERC/NEM/compliance
│   ├── Onsite-Commander.md      ← Installation + structural inspection
│   ├── Procurement-Controller.md← Supplier + equipment procurement
│   ├── Pilot-Analyst.md         ← System performance + proof pack
│   ├── Finance-Controller.md    ← Cost tracking + OPEX + cash flow
│   ├── Outreach-Coordinator.md  ← Factory CRM + B2B sequence + proposals
│   └── Execution-Tracker.md     ← P0 checklist + MW tracker + digest
├── sops/                        ← 6 operational SOPs
│   ├── RESCO-SOP.md             ← Full registration process map
│   ├── Onsite-SOP.md            ← Site inspection → commissioning
│   ├── Procurement-SOP.md       ← Supplier vetting → delivery
│   ├── Outreach-SOP.md          ← 5-touch B2B factory sequence + proposal
│   ├── Financial-Ops-SOP.md     ← Milestone billing + cash flow + OPEX
│   └── Pilot-Ops-SOP.md         ← Monthly monitoring + proof pack
├── tasks/                       ← Live tracked documents
│   ├── RESCO-Application-Shell.md      ← RESCO registration field tracker
│   ├── Installation-Tracker.md          ← All sites, all stages
│   ├── CRM-Factory-Pipeline.md          ← Prospect CRM (factory targets)
│   ├── Pilot-System-Diary.md            ← Commissioning log + monthly data
│   ├── Cashflow-13week.md               ← Rolling 13-week cash projection
│   ├── Supplier-Registry.md             ← Approved suppliers + certifications
│   └── Procurement-Tracker.md          ← Active POs + staging status
└── templates/
    └── OPEX-Proposal-Template.md       ← B2B factory rooftop OPEX proposal
```

---

## Session Logging & OS Protocol

This directory operates as an autonomous session. The ATLAS agent MUST follow these persistent memory rules:

### 1. Session Startup
- **Read `logs/LATEST.md`**: Inherit the state of the previous session (blockers, open items, active agents).
- **Read `../Nexus/logs/handoffs/`**: Check for incoming tasks from other departments (Finance, Legal, etc.).
- **Initialize Log**: Create a new daily log in `logs/` (or append to today's) with structured frontmatter.

### 2. Live Execution
- **Log Actions**: Record significant steps, script runs, and CRM updates with `[HH:MM]` timestamps.
- **Log Decisions**: Document the "why" behind operational pivots or priority shifts.
- **Handoffs**: If you need a financial model or a legal contract, create a handoff file in `../Nexus/logs/handoffs/ops-to-{dept}-{date}.md`.

### 3. Session End
- **Update LATEST**: Overwrite `logs/LATEST.md` with the finalized session state.
- **Archive**: Ensure the daily log is saved as `logs/YYYY-MM-DD.md`.
- **Wiki Summarize**: One-line append to `~/Documents/30-Atlas/wiki/log.md`.

---

## Skills (Available Slash Commands)

| Skill | What It Triggers | Primary Agent |
|-------|-----------------|--------------|
| `/resco` | Full RESCO check: application shell status, missing fields, SREDA certs | RESCO-Navigator |
| `/onsite` | 15-point rooftop inspection, installation milestones, commissioning | Onsite-Commander |
| `/pilot` | Monthly pilot report: actual vs. theoretical generation, savings, proof pack | Pilot-Analyst |
| `/execution` | P0 checklist audit, MW tracker, blocker report, weekly digest | Execution-Tracker |
| `/procurement` | Supplier framework status, PO tracking, SREDA cert verification | Procurement-Controller |
| `/outreach` | Factory CRM, B2B 5-touch sequence, OPEX proposal assembly | Outreach-Coordinator |
| `/finance` | Cost vs. budget, 13-week cashflow, OPEX pricing template | Finance-Controller |

---

## Critical Context (Always in Memory)

### The P0 Metric
> **Install 1 MW as fast as humanly possible.**
> At 1 MW: infrastructure operator (10–15× revenue valuation). Below 1 MW: solar installer (1–2× revenue valuation).

18-month window. Target: **55 kWp/month average**. No strategy discussion that doesn't serve this.

### Unit Economics Floor
**BDT 80K–115K/kWp** total system cost including AIT. Source of truth: `~/Documents/30-Atlas/wiki/entities/Netso.md`. Never use placeholder numbers.

### 7 BDT Numbers to Never Forget
| Number | Source |
|--------|--------|
| BDT 10.30/kWh | BERC LT-E commercial tariff (used in all OPEX savings calculations) |
| BDT 80K–115K/kWp | Total system cost floor (includes AIT on panel imports) |
| BDT 5K/system/year | O&M annual contract revenue |
| ৳8–12M | Working capital for 3 concurrent 50kW installs |
| 8 months | BPDB NEM approval validity — system must commission within this window |
| 25 years | PPA / system design life |
| 0.5%/year | Panel degradation assumption (Jinko linear warranty to 84.8%) |

### Equipment Rules
- **Panels**: Jinko JKM720N-66HL5-BDV (primary) or Bluesun BSM565M10-72HPH (alternative). Both must be verified on current SREDA approved list.
- **Inverters**: Sungrow or Huawei — brand is not sufficient, must verify **specific model** against SREDA list and check IEC 62109-1/2, IEC 61727, IEC 62116 certifications.
- **AIT on imports**: Always confirm included in supplier quotation. If excluded, margins are overstated.

---

## Wiki Integration

Following the global instruction: **wiki first**.

- File all execution findings, meeting notes, and decisions to `~/Documents/30-Atlas/wiki/`
- Key wiki pages for this directory:
  - `entities/Netso.md` — Unit economics, business model
  - `entities/Tazwar_Mahtab.md` — Founder profile
  - `concepts/RESCO-Model.md` — RESCO framework
  - `concepts/Net-Metering-Guidelines-2025.md` — NEM 2025 rules
  - `log.md` — Append every significant operation to this log
- Every session that makes a meaningful decision or discovery: file it to the wiki before closing.

---

## Escalation Matrix

| Trigger | Escalate To | Why |
|---------|------------|-----|
| RESCO submission needed | Taz | Required approval before public submission |
| New customer PPA signing | Taz | Required approval before signing |
| Spend >BDT 50,000 | Taz | Gate in governance protocol |
| New customer contract signing | Taz | Material commitment |
| Legal document submission | Taz | Required approval |
| Spend BDT 5K–50K | ATLAS | COO approval level |
| Any safety incident at site | ATLAS immediately | Safety stop |
| BPDB approval within 2 months | ATLAS + Taz | Hard escalation — commissioning at risk |
| Equipment not on SREDA list | Procurement-Controller → ATLAS | Blocking all progress |
| TIN/NID not provided | Taz | Blocks the entire RESCO application |

---

## Current Execution State

**Overall**: 100% strategic clarity, 0% operational execution.

Priority blockers — in execution order:
1. **Taz provides TIN + NID** — unblocks RESCO application
2. **Trademark filing** — DPDT, Class 37 + 40, ~৳5,000
3. **Energy lawyer for EPC contract** — ৳20–50K
4. **RESCO registration** — Current gate. All installation activity is gated behind this.
5. **15-point rooftop inspection checklist** — Must complete before first site work
6. **Jinko framework agreement** — Procurement-Controller's first action on supplier side
7. **20 factory prospects in CRM** — Outreach-Coordinator's first action on sales side