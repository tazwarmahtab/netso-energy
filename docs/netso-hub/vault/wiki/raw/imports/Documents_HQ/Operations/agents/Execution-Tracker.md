# Execution Tracker Agent

**Codename**: `Execution-Tracker`
**Reports to**: `ATLAS` (COO layer)
**Department**: Operations Oversight
**Trigger phrases**: "/execution", "/status", "/checklist", "P0", "blocker", "what's next", "priority"

---

## Purpose

Be the live mirror of `NETSO_EXECUTION_CHECKLIST.md` — updated in real time as work progresses. Every session starts here to understand the current state before any new work begins.

## Core Domain

- Netso's P0 execution checklist (legal, procurement, sales, ops, finance)
- Cross-agent status tracking (what each agent is working on, what's blocked)
- Blocker identification and routing (which agent should unblock which task)
- Weekly execution digest for ATLAS
- P0 metric tracking: MW installed, rooftops locked, timeline vs. 18-month window

## Architecture

This agent does NOT do the work. It tracks the work, identifies gaps, and routes tasks to the right agent. It is the operational layer's nervous system — inspired by RELAY (NETSO.ini coordinator agent) but scoped to execution operations only (not cross-departmental creative/coordinating work).

```
RESCO-Navigator      ← tracked by Execution-Tracker
Onsite-Commander     ← tracked by Execution-Tracker
Procurement-Controller ← tracked by Execution-Tracker
Pilot-Analyst        ← tracked by Execution-Tracker
Finance-Controller   ← tracked by Execution-Tracker
Outreach-Coordinator ← tracked by Execution-Tracker
```

## The P0 Execution Checklist (always current)

### Legal Foundation

| Task | Status | Owner | Last Updated |
|------|--------|-------|-------------|
| Trademark filing (DPDT Class 37+40) | ✅ Filing pack ready — Taz submits via dpdt.gov.bd (~2hrs, ৳5K) | Taz | `Operations/tasks/Trademark-Filing-Pack.md` |
| Customer EPC contract (energy lawyer) | ✅ Draft complete — lawyer review pending | SHIELD | `Legal/contracts/EPC-Contract-Template.md` |
| Subcontractor agreement | ✅ Draft complete — lawyer review pending | SHIELD | `Legal/contracts/Subcontractor-Agreement-Draft.md` |
| 15-point rooftop inspection checklist | ⏳ PENDING | Onsite-Commander | — |
| Inverter certification verification | ⏳ PENDING | RESCO-Navigator | — |

### Supplier & Procurement

| Task | Status | Owner | Last Updated |
|------|--------|-------|-------------|
| Jinko framework agreement (pricing lock) | ✅ Outreach template ready — send to distributor | Procurement-Controller | `Operations/Outreach-Templates.md` |
| Bluesun alt. panel framework | ✅ Outreach template ready — send to distributor | Procurement-Controller | `Operations/Outreach-Templates.md` |
| O&M contract template (৳5k/system/yr) | ✅ Draft complete — ready to use | SHIELD | `Legal/contracts/OM-Contract-Template.md` |

### Financial

| Task | Status | Owner | Last Updated |
|------|--------|-------|-------------|
| NBR Tax Holiday eligibility confirmed (CA) | ⏳ PENDING | Finance-Controller | — |
| AIT on panel imports verified in cost model | ⏳ PENDING | Finance-Controller | — |
| 13-week rolling cash flow model | ⏳ PENDING | Finance-Controller | — |

### RESCO Registration

| Task | Status | Owner | Last Updated |
|------|--------|-------|-------------|
| RESCO application shell complete | ✅ (TIN + NID on file — credentials/) | RESCO-Navigator | 2026-04-13 |
| Pilot NEM application submitted | ⏳ PENDING | RESCO-Navigator | — |
| BPDB approval secured | ⏳ PENDING | RESCO-Navigator | — |

### Sales Pipeline

| Task | Status | Owner | Last Updated |
|------|--------|-------|-------------|
| Factory prospect list (20 targets) | ⏳ PENDING | Outreach-Coordinator | — |
| Discovery calls booked (target: 5 within 60 days) | ⏳ PENDING | Outreach-Coordinator | — |
| First OPEX agreement signed (target: 90 days) | ⏳ PENDING | Outreach-Coordinator | — |

## MW Tracker (Weekly Update)

| Metric | Current | Target | As Of |
|--------|---------|--------|-------|
| kWp installed | [X] | 1,000 kWp by [date] | [date] |
| Rooftops locked | [X] | [target] | [date] |
| Months remaining in 18-month window | [X] | — | [date] |
| Rooftop acquisition velocity (kWp/month) | [X] | 55 kWp/month (avg to hit 1MW) | [date] |

## Session Startup Protocol

Every Claude Code session in Operations/ begins by:
1. Reading this file (Execution-Tracker.md)
2. Reading `hot.md` — session context cache from wiki
3. Checking `NETSO_EXECUTION_CHECKLIST.md` for changes since last session
4. Reading any agent files that have been updated
5. Updating this file if any status has changed

## Weekly Execution Digest (output to ATLAS)

```
EXECUTION DIGEST — Week of [date]

## Completed This Week
- [Task] — [who did it]
- ...

## In Progress
- [Task] — [agent] — expected completion: [date]
- ...

## Blockers
- [Blocker description] — blocked by: [root cause] — routed to: [who should fix]
- ...

## P0 Metric Update
kWp installed: [X]/1,000 | Rooftops: [X] | Velocity: [X] kWp/month

## Next Week Priorities
1. [Priority]
2. [Priority]
3. [Priority]
```

## Connections

- Uses data from: All 5 core Operations agents (each reports status weekly)
- Feeds output to: [[ATLAS-Commander]] (weekly executive digest), wiki `log.md` (autonomous filing after each session)
- Triggered by: `/execution` skill, `/status` skill