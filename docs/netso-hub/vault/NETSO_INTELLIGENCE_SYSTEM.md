# Netso Energy - Proactive Intelligence System

## System Overview

This system automatically maintains accurate, up-to-date knowledge about Netso Energy through:
- **Automated weekly audits** of wiki for contradictions
- **Automated monthly checks** of official regulatory sources
- **Session wrap-ups** to capture validated learnings
- **Memory protocol** to ensure canonical facts are always current

---

## Skills Created

### 1. `netso-memory-protocol`
**Purpose:** Defines what facts are "memory-worthy" and how to format them.

**Triggers:**
- Pilot system installed or specs changed
- Financial model version bump (e.g., v4.0)
- Regulatory change confirmed (SREDA/IDCOL/BERC)
- Contradiction resolution pass completed
- End of work session with new validated data

**What it captures:**
- **Tier 1 (Mandatory):** Pilot specs, 100kW CAPEX, financial metrics, capacity factors, tariff assumptions, revenue definition
- **Tier 2 (Regulatory):** Capacity limits, eligible consumers, approved models, official portals
- **Tier 3 (Contextual):** IDCOL terms, partnerships, pipeline status

**Usage:** Run manually or triggered by session-wrap skill.

---

### 2. `netso-wiki-audit`
**Purpose:** Weekly scan for contradictions, outdated numbers, drift from canonical sources.

**Schedule:** Every Monday at 9:00 AM (automated via cron)

**What it does:**
1. Reads canonical sources (02-unit-economics.md v4.0, pilot-unit-economics.md, net-metering-2025.md)
2. Scans all wiki pages for contradictions
3. Generates report with severity levels (CRITICAL/HIGH/MEDIUM)
4. Recommends actions and memory updates

**Output:** Audit report with table of issues, priority actions, memory update recommendation.

---

### 3. `netso-source-monitor`
**Purpose:** Monitor official Bangladesh energy regulatory sources for changes.

**Schedule:** Monthly on the 1st at 10:00 AM (automated via cron)

**Sources checked:**
- SREDA (sreda.gov.bd) - Net metering, RESCO registration
- IDCOL (idcol.org) - Financing terms, interest rates
- BERC (berc.org.bd) - Tariff approvals
- Power Division NEM Portal (nem.powerdivision.gov.bd) - FAQ, process changes

**Output:** Change report with impact classification (CRITICAL/HIGH/MEDIUM/LOW).

---

### 4. `netso-session-wrap`
**Purpose:** End-of-session protocol to capture learnings and propose memory updates.

**Triggers:**
- User says "wrap up", "session complete", "done for today"
- End of work session on Netso tasks
- Before switching to different project

**What it does:**
1. Reviews session activity
2. Identifies memory-worthy facts
3. Drafts memory update proposal
4. Asks for approval
5. Logs session to wiki
6. Lists carry-forward items

**Schedule:** Daily at 8:00 PM (automated via cron, but can be run manually anytime)

---

## Cron Jobs

| Job ID | Name | Schedule | Next Run | Status |
|--------|------|----------|----------|--------|
| `c60f39565a66` | netso-weekly-wiki-audit | Every Monday 9:00 AM | 2026-05-25 09:00 | Scheduled |
| `0137f2e6c842` | netso-monthly-source-check | 1st of month, 10:00 AM | 2026-06-01 10:00 | Scheduled |
| `9c531ddc206f` | netso-session-wrapup | Daily 8:00 PM | 2026-05-22 20:00 | Scheduled |

---

## How to Use

### Manual Triggers

**Run wiki audit on-demand:**
```
Run the netso-wiki-audit skill
```

**Check regulatory sources now:**
```
Run the netso-source-monitor skill
```

**Wrap up current session:**
```
Run the netso-session-wrap skill
```
Or just say: "wrap up", "session complete", "done for today"

**Update memory manually:**
```
Run the netso-memory-protocol skill
```

### Automated Flow

1. **Every Monday 9 AM:** Wiki audit runs automatically
   - If contradictions found → delivers report with [Resolve Now] option
   - If clean → logs "All clear" to wiki

2. **Monthly (1st at 10 AM):** Source monitor runs
   - If regulatory changes → delivers change report
   - If no changes → logs "No changes"

3. **Daily 8 PM:** Session wrap-up runs
   - Asks what you worked on
   - Proposes memory updates if needed
   - Logs session to wiki

---

## Canonical Facts (Current as of May 22, 2026)

**Pilot System:**
- Capacity: 4.3kW (7×620W Longi bifacial panels)
- Inverter: 3.5kW Growatt hybrid
- Cost: ৳2.5L (conservative, actual ৳2.2L)

**100kW System:**
- CAPEX: ৳46.8L (৳46,800/kW) - pilot-validated v4.0
- IRR: 42%
- Payback: 2.6 years
- DSCR: 2.91x (Year 1)

**Assumptions:**
- Capacity factors: Dhaka 16%, Chattogram 16.5%
- Export tariff: ৳8.50-9.32/kWh (base ৳8.50)
- Revenue: Export credit ONLY (80% gen × tariff)
- IDCOL: 80% debt @ 9%, 15yr tenure

**Regulatory:**
- Net Metering 2025: 1MW max, 1kW min
- OPEX/RESCO model: Explicitly supported
- Official portal: nem.powerdivision.gov.bd

**Source of Truth:** `02-unit-economics.md v4.0`

---

## Success Metrics

- ✅ Zero CRITICAL contradictions in wiki
- ✅ Memory always reflects pilot-validated data
- ✅ All regulatory changes detected within 30 days
- ✅ No surprise investor questions due to outdated numbers
- ✅ Session learnings captured before next session

---

## Maintenance

**To pause a job:**
```
cronjob action='pause' job_id='c60f39565a66'
```

**To resume:**
```
cronjob action='resume' job_id='c60f39565a66'
```

**To run a job immediately:**
```
cronjob action='run' job_id='c60f39565a66'
```

**To update schedule:**
```
cronjob action='update' job_id='c60f39565a66' schedule='0 10 * * 1'
```

---

## Files Modified

- `/Users/tazwarmahtab/.hermes/skills/netso-memory-protocol/SKILL.md`
- `/Users/tazwarmahtab/.hermes/skills/netso-wiki-audit/SKILL.md`
- `/Users/tazwarmahtab/.hermes/skills/netso-source-monitor/SKILL.md`
- `/Users/tazwarmahtab/.hermes/skills/netso-session-wrap/SKILL.md`
- Memory entry updated with canonical facts

---

## Next Steps

1. **First audit:** Monday May 25, 9 AM (automated)
2. **First source check:** June 1, 10 AM (automated)
3. **First wrap-up:** Today 8 PM (automated) or say "wrap up" anytime

**You're all set!** The system will now proactively maintain accurate knowledge.
