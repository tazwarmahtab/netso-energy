---
name: skll-verify
description: Netso operations verification loop — gate every deliverable before marking it done. Triggers on /verify after RESCO updates, proposal drafts, contract reviews, procurement decisions, and any significant execution step.
origin: ECC-pattern / Netso-ops
tools: Read, Glob, Grep, Bash
trigger_phrases: /verify, "verify this", "check if done", "gate", "is it ready"
---

# Verify — Netso Operations Quality Gate

Invoke this skill after every significant execution step. It cross-checks facts, completeness, and governance compliance before a deliverable is marked done.

**Invocations:**
- After drafting any legal contract or outreach email
- After updating RESCO-Application-Shell.md
- After a Procurement-Controller decision (supplier selected, PO placed)
- After Onsite-Commander completes any inspection milestone
- Before any regulatory submission or spend ≥BDT 5,000
- On `/verify` explicit call from Taz

---

## Phase 1 — Read the Session Context

Before doing anything, load the current state:

```bash
# Read session progress
cat ~/Documents/10-Projects/Netso_HQ/Operations/PROGRESS.md 2>/dev/null

# Read the relevant task tracker
cat ~/Documents/10-Projects/Netso_HQ/Operations/tasks/RESCO-Application-Shell.md 2>/dev/null || echo "NOT FOUND"
```

Identify which ops domain this verification belongs to:
- **RESCO / Legal** → RESCO-Application-Shell.md, Legal/contracts/
- **Outreach / CRM** → CRM-Factory-Pipeline.md, Outreach-Coordinator.md
- **Procurement** → Procurement-Tracker.md, Supplier-Registry.md
- **Onsite** → Installation-Tracker.md, Pilot-System-Diary.md
- **Finance** → Cashflow-13week.md, Finance/models/

---

## Phase 2 — Authoritative Fact Check

Cross-check every number, date, and regulatory claim against the **source of truth** in `Operations/CLAUDE.md`:

| Claim Being Made | Required Source | What to Flag |
|-----------------|-----------------|--------------|
| BERC tariff value | Operations/CLAUDE.md line 100 | Must be **BDT 10.30/kWh** |
| System cost per kWp | Operations/CLAUDE.md line 97 | Must be **BDT 80K–115K/kWp** |
| O&M annual revenue | Operations/CLAUDE.md line 103 | Must be **BDT 5K/system/year** |
| BPDB approval validity | Operations/CLAUDE.md line 107 | Must be **8 months** |
| Panel spec | Operations/CLAUDE.md line 111 | Jinko JKM720N-66HL5-BDV |
| SREDA-approved panel | Supplier-Registry.md | Must match current SREDA portal list |
| BDT spend amount | Operations/CLAUDE.md lines 135-145 | Escalation threshold varies |
| Commissioning date | RESCO-Application-Shell.md | Must be within 8 months of BPDB issue |
| TIN / NID filed | RESCO-Application-Shell.md lines 45-46 | Must match credentials/ |

**Rule:** If any number is stated but not sourced to the above, flag it as **UNVERIFIED FACT**.

---

## Phase 3 — Completeness Check

Check the deliverable against its task tracker:

### RESCO Domain
```
Path: Operations/tasks/RESCO-Application-Shell.md
Required: All 14 fields in every section have status (✅ / ⏳ / ❌)
Required: Every ⏳ field has Owner + Deadline
Required: Every ❌ field has escalation to ATLAS or Taz documented
Required: EPC contract draft flagged "Draft for Legal Review"
```

### Outreach Domain
```
Path: Operations/tasks/CRM-Factory-Pipeline.md
Required: Minimum 20 prospects, each with company + contact + email + sector + kWp estimate
Required: OPEX proposal uses OPEX-Proposal-Template.md structure
Required: Every prospect in sequence has current stage (cold/warm/hot/proposal/signed)
```

### Procurement Domain
```
Path: Operations/tasks/Supplier-Registry.md + Procurement-Tracker.md
Required: Supplier confirmed on current SREDA approved equipment list
Required: AIT on imports confirmed in quotation (not excluded)
Required: PO has delivery milestone with date
Required: IEC 62109-1/2 cert verified for inverter model
```

### Onsite Domain
```
Path: Operations/tasks/Installation-Tracker.md
Required: 15-point rooftop inspection completed before installation start
Required: Structural cert from licensed engineer obtained
Required: Commissioning date set and within 8-month BPDB window
```

### Finance Domain
```
Path: Operations/tasks/Cashflow-13week.md, Finance/models/
Required: All BDT numbers use floor from Operations/CLAUDE.md (never placeholders)
Required: OPEX proposal uses correct BERC tariff (BDT 10.30/kWh)
Required: Cash runway covers 2 concurrent 50kW installs (~BDT 32–48L)
```

---

## Phase 4 — Governance Gate

Check if this deliverable requires Taz approval. If yes, confirm approval is documented:

| Action | Approval Required | Where to Confirm |
|--------|-------------------|-----------------|
| Any public regulatory submission | Taz | RESCO-Application-Shell.md submission row |
| Spend ≥BDT 50,000 | Taz | Operations/logs/LATEST.md entry |
| New customer PPA signing | Taz | Legal/contracts/ sign-off note |
| Spend BDT 5K–50K | ATLAS | Operations/logs/LATEST.md entry |
| Legal document first draft | SHIELD review | Legal/contracts/ header flag |
| Equipment PO (new supplier) | Procurement-Controller → ATLAS | Procurement-Tracker.md |

If governance gate is not met: **FAIL with specific escalation requirement.**

---

## Phase 5 — Output Verification Report

After all checks, produce this structured output:

```
═══════════════════════════════════════════════════
  NETSO OPS VERIFICATION REPORT
  Domain: [RESCO|Outreach|Procurement|Onsite|Finance]
  File: [path to deliverable]
  Time: [YYYY-MM-DD HH:MM]
═══════════════════════════════════════════════════

  AUTHORITATIVE FACTS ........... [PASS | FAIL] (N issues)
  COMPLETENESS .................. [PASS | FAIL] (N issues)
  GOVERNANCE GATE ............... [PASS | FAIL] (N issues)

  ─────────────────────────────────────────────────
  STATUS: [READY FOR NEXT STEP | BLOCKED — N issues]
  ─────────────────────────────────────────────────

  Issues:
  1. [FAIL] [Domain] — description of what is wrong
  2. [FAIL] [Domain] — description

  Priority Actions:
  1. [Action description] → Owner: [agent/Taz/ATLAS] → Deadline: [date]

  Next Step (verified):
  → [What to do next, gated by resolution of above issues]
═══════════════════════════════════════════════════
```

---

## Contextual Notes for the Verifier

### What RESCO-Navigator Must Always Check (before SREDA submission)
- [ ] TIN: 729793567043 ✓ in credentials/
- [ ] NID ✓ in credentials/
- [ ] EPC contract: drafted, flagged for legal review
- [ ] Subcontractor agreement: drafted
- [ ] Inverter model: SREDA-approved + IEC certs verified
- [ ] Panel: Jinko on SREDA list (verify current portal, not memory)
- [ ] Single-line diagram: licensed engineer
- [ ] Structural cert: licensed engineer
- [ ] 15-point inspection: Onsite-Commander complete
- [ ] Taz approval: documented before any public submission

### What Procurement-Controller Must Always Check (before PO sign)
- [ ] Supplier on SREDA approved list (current portal, not cached)
- [ ] AIT included in quotation
- [ ] IEC 62109-1/2 for inverter
- [ ] IEC 61727, IEC 62116 for inverter
- [ ] Payment terms: ≤30% deposit, balance on delivery
- [ ] Delivery timeline within 8-month BPDB window

### What Finance-Controller Must Always Check (before OPEX proposal)
- [ ] BERC tariff: BDT 10.30/kWh from Operations/CLAUDE.md
- [ ] System cost: BDT 80K–115K/kWp from Operations/CLAUDE.md
- [ ] O&M revenue: BDT 5K/system/year from Operations/CLAUDE.md
- [ ] All numbers are real (no placeholders like "TBD" or "~")
- [ ] IRR/payback from validated model (not rough estimate)

### What Outreach-Coordinator Must Always Check (before B2B proposal)
- [ ] Proposal uses OPEX-Proposal-Template.md
- [ ] BERC tariff BDT 10.30/kWh used in savings calculation
- [ ] System cost uses verified floor (not placeholder)
- [ ] Customer kWp estimate documented in CRM
- [ ] Factory contact name + title included

---

*Builds on ECC's verification-loop pattern (eval-harness SKILL.md), adapted for Bangladesh solar operations governance and BDT-number precision.*