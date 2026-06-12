# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this directory.

## Project Overview

Netso HQ Finance is the financial operating system for Bangladesh's solar energy transition startup. The Finance directory is populated by specialized AI agents (in `agents/`) that own specific financial workflows — it is not a passive document folder. Each agent is a named persona with defined inputs, outputs, triggers, and success metrics.

The parent `Netso_HQ/CLAUDE.md` at `../CLAUDE.md` is the source of truth for broader context (team, regulatory partners, strategy). Conflict between the two → parent wins.

## Agent Stack

All agents live in `agents/` as self-contained `.md` files. The correct agent for a task:

| Agent | Handles |
|---|---|
| `netso-fpa.md` | Budgets, rolling forecasts, variance analysis, MBR |
| `netso-investor.md` | Fundraise materials, data room, investor updates |
| `netso-unit-economics.md` | Rooftop PPA IRR, NPV, payback, CAC, LTV |
| `netso-resco-finance.md` | IDCOL/ADB debt sizing, tariff modeling, cap table |
| `netso-data-pipeline.md` | Excel ingestion, pilot data normalization, reporting |

## Finance Agent Personas (Friends)

| Agent file | Character | Voice |
|:-----------|:----------|:------|
| `netso-fpa.md` | Monica | "Pivot! No — the variance. Work the variance." |
| `netso-unit-economics.md` | Chandler | "Could this IRR model BE any more sensitive?" |
| `netso-investor.md` | Rachel | "You know what? We should take this deck to the next level." |
| `netso-resco-finance.md` | Ross | "I studied the regulations. I know energy law." |
| `netso-data-pipeline.md` | Phoebe | "Smelly data, good data — it's all just data looking for home." |

Each agent defines its own **triggers** (when it activates), **inputs**, **workflow steps**, and **success metrics**.

## Directory Structure

```
Finance/
├── CLAUDE.md           ← You are here
├── agents/             ← Agent definitions (one file per agent)
├── models/             ← Live financial models and projections
│   ├── 01-model-framework.md    # Three-statement scaffold
│   ├── 02-unit-economics.md     # Per-rooftop PPA model outputs
│   └── 03-budget-tracker.md     # Operating budget with variance
├── reports/            ← Monthly/quarterly investor and operational reports
├── templates/          ← Reusable financial document templates
├── archive/            ← Completed models, old versions — read only
```

## Development Commands

No build step required — the Finance directory operates as a document-and-agent repository, not compiled code.

| Command | Purpose |
|:--------|:--------|
| `ls agents/ models/ reports/` | View available agents and active deliverables |

## Session Logging & OS Protocol

This directory operates as an autonomous session. The LEDGER agent MUST follow these persistent memory rules:

### 1. Session Startup
- **Read `logs/LATEST.md`**: Inherit financial state and blockers from previous sessions.
- **Read `../Nexus/logs/handoffs/`**: Check for incoming pricing requests or report tasks from other departments.
- **Initialize Log**: Create a new daily log in `logs/` (or append to today's) with structured frontmatter.

### 2. Live Execution
- **Log Actions**: Record modeling updates, budget shifts, and investor draft progress with `[HH:MM]` timestamps.
- **Log Decisions**: Document the rationale behind fiscal adjustments or pricing revisions.
- **Handoffs**: If financial data necessitates operational or legal action, create a handoff file in `../Nexus/logs/handoffs/finance-to-{dept}-{date}.md`.

### 3. Session End
- **Update LATEST**: Overwrite `logs/LATEST.md` with the finalized financial session state.
- **Archive**: Ensure the daily log is saved as `logs/YYYY-MM-DD.md`.
- **Wiki Summarize**: One-line append to `~/Documents/30-Atlas/wiki/log.md`.

---

## Agent Workflows

### `/pilot-report` (Finance)
1. Read `pilot/03kW_DATA_TRACKING.md` and `pilot/pilot-case-study.md`
2. Extract actual vs. BERC/SREDA tariff generation data
3. Calculate revenue at applicable net metering tariff
4. Output: one-page performance summary → `reports/pilot-performance-YYYY-MM.md`

### Investor Update (via `netso-investor.md`)
1. Aggregate `pilot/` performance data + `models/` latest outputs
2. Format as professional investor update
3. Save draft → `reports/investor-update-YYYY-QN.md`

## Financial Model Inputs

Always source from `[[wiki/entities/Netso.md]]` for unit facts. Never use placeholder numbers. Key source documents:

| Source | Contents |
|:-------|:---------|
| `Strategy/NETSO_RESCO_Application_Draft.md` | Current financial assumptions, tariff structure |
| `Strategy/NETSO_3KW_PILOT_DATA_TRACKING.md` | Pilot generation data |
| `Finance/models/02-unit-economics.md` | Live rooftop unit economics |
| `wiki/entities/Netso.md` | Business model, PPA terms, regulatory rate assumptions |

## Bangladesh-Specific Financial Parameters

| Parameter | Value | Source |
|:----------|:------|:-------|
| BERC benchmark rate | ৳7.37–10.57/kWh | Net Metering Guidelines 2025 |
| Net metering sellback | 70–80% of base tariff | [[Net Metering Guidelines 2025]] |
| IDCOL debt | Up to 80% of project cost | [[IDCOL]] |
| IDCOL interest rate | ~8–10% (~5% with GCF) | [[IDCOL]] |
| SREDA feed-in tariff | ৳11.65/kWh (rooftop) | 2025 revision |
| Corporate tax (RE company) | 27.5–35% | NBR |
| Capital gains (unlisted) | 15% | NBR |

## Data Conventions

- **Currency**: BDT (৳). Use `৳X.X` inline. Convert USD at `৳120/$` when needed.
- **Dates**: `YYYY-MM-DD` (ISO 8601).
- **Periods**: `YYYY-Q1`, `YYYY-Q2`, `FY2027`, `Month 1`, etc.
- **Naming**: `YYYY-MM-Description.md` for all reports and models.
- **Source everything**: Every number used in analysis must cite a source file or URL. No orphan figures.

## Wikifiling

After any non-trivial analysis, file findings to `~/Documents/30-Atlas/wiki/`:
- Unit economics outputs → `wiki/entities/Netso.md` (update financials section)
- Investment analysis → `wiki/sources/src-...` or `wiki/concepts/`
- Append summary to `wiki/log.md` with timestamp