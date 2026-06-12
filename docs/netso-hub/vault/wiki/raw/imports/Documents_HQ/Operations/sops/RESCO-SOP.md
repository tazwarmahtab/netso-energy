# Netso RESCO Registration — Standard Operating Procedure

## Purpose

This SOP governs every step of getting Netso legally registered as a RESCO (Renewable Energy Services Company) under SREDA, culminating in a signed Net Energy Metering (NEM) agreement with BPDB.

**Owner**: RESCO-Navigator (`/resco` skill)
**Reviewed by**: SHIELD (NETSO.ini Legal Agent), ATLAS (COO)
**Escalates to**: ATLAS for any spend >BDT 5,000 or any public submission

---

## Background

Netso operates as a RESCO under the SREDA NEM Guideline 2025. This means Netso **builds, owns, and operates** solar systems on customer rooftops, sells electricity to the customer under a 25-year PPA, and exports excess to the national grid for credit.

**Key regulatory facts (as of 2026)**:
- SREDA approved panels required (Jinko JKM720N-66HL5-BDV; verify SREDA SL#)
- SREDA approved inverters required — **model-specific** (Sungrow and Huawei are brands, not certifications; verify exact model)
- **NEM Guideline 2025 removed the single-phase restriction** — residential buildings now eligible
- BPDB NEM approval valid for **8 months** from issue date — system must be commissioned within this window
- Commercial tariff (BERC LT-E): **BDT 10.30/kWh**

---

## Step 1: Pre-Application Preparation

**Owner**: RESCO-Navigator + SHIELD
**Timeline**: Start immediately; complete before any site work

### 1.1 Company Registration Verification
- [ ] Certificate of Incorporation (RJSC) — on file
- [ ] TIN (Tax Identification Number) — **Taz to provide**
- [ ] Trade License — on file
- [ ] NID of authorized signatory — **Taz to provide**

### 1.2 Site-Specific Documents (per installation)
- [ ] Land/rooftop ownership proof (deed, utility bill, tax receipt)
- [ ] Site address exactly as it appears on utility bill
- [ ] System single-line diagram (by electrical engineer)
- [ ] Structural engineering certification for rooftop load
- [ ] Inverter make, model, and SREDA certification number
- [ ] Panel make, model, and SREDA approval number
- [ ] Estimated commissioning date

### 1.3 Contract Documents
- [ ] Signed Customer EPC Contract (SHIELD → energy lawyer draft)
- [ ] Signed 25-year PPA (customer-facing — CANVAS drafts from template)
- [ ] Signed Subcontractor Agreement (SHIELD drafts)

**Gate**: These documents must be complete and signed before the SREDA application is submitted. SREDA may request them during review. Applications without firm contracts are flagged for rejection.

---

## Step 2: SREDA Portal Submission

**Owner**: RESCO-Navigator
**Escalates**: Taz approval required before submission

### Submission Checklist (SREDA NEM Online Portal)
1. Company registration certificate
2. TIN certificate
3. Authorized person NID
4. Site ownership document
5. Single-line diagram (signed by licensed engineer)
6. Structural certification
7. Panel SREDA approval certificate
8. Inverter SREDA approval certificate
9. EPC contract (draft, pre-signing)
10. Application fee payment receipt

**After submission**: SREDA assigns an application number. Track this number in `RESCO-Application-Shell.md`.

**SREDA review timeline**: Typically 4–8 weeks. If no response in 8 weeks, follow up via Gmail (formal letter) and log with SREDA E-Service Desk.

---

## Step 3: BPDB Net Metering Agreement

**Owner**: RESCO-Navigator + GRID (NETSO.ini)
**Timeline**: After SREDA approval, before grid connection
**Trigger**: SREDA approval letter received

### BPDB Application Requirements
1. SREDA approval letter (copy)
2. NEM application form (BPDBForm-NEM-01)
3. Single-line diagram
4. System protection scheme (prepared by licensed electrical engineer)
5. Commissioning date (planned — update when actual date is known)
6. Customer consent letter
7. Application fee: ৳5,000 (verify current rate)

### After BPDB Submission
- BPDB sends an Inspector to the site for grid interconnection verification
- Coordinate with **Onsite-Commander** to ensure site is ready for inspection on the scheduled date
- BPDB issues NEM agreement (valid 8 months from issue date)
- Update `RESCO-Application-Shell.md` with the BPDB approval date

**Critical deadline**: 8-month clock starts on BPDB approval date. NEM agreement expires if the system is not commissioned within 8 months. Re-application required after expiration.

---

## Step 4: Monitoring & Compliance

**Owner**: RESCO-Navigator (ongoing)

After registration, Netso must:
- [ ] Maintain annual SREDA renewal (confirm current requirements)
- [ ] Report generation data to SREDA/BPDB as required
- [ ] Notify SREDA/BPDB within 30 days of any system capacity change
- [ ] Maintain all equipment SREDA certifications (renew if equipment is replaced)
- [ ] Track BERC tariff changes — any tariff revision affects customer OPEX savings calculations and must be communicated

---

## RESCO Registration Process Map

```
[INTERNAL PREPARATION]
  Company docs ✓ | Site docs ✓ | Contracts ✓ | Certifications ✓
        ↓
[SREDA APPLICATION SUBMITTED]  ← Taz approval required
  Application # assigned | 4-8 week review
        ↓
[SREDA APPROVED — NEM ELIGIBLE]
        ↓
[BPDB NEM APPLICATION SUBMITTED]
  Site inspection scheduled with Onsite-Commander
        ↓
[BPDB INSPECTION — GRID INTERCONNECTION VERIFIED]
        ↓
[NEM AGREEMENT ISSUED — VALID 8 MONTHS]
  Clock starts: commissioning deadline locked in
        ↓
[SYSTEM COMMISSIONED — NEM ACTIVE]
  Grid export enabled | 25-year PPA begins | Monthly billing cycle active
```

---

## Key Files

| File | Location | Used By |
|------|----------|---------|
| RESCO Application Shell (live tracker) | `Operations/tasks/RESCO-Application-Shell.md` | RESCO-Navigator |
| RESCO Registration Guide (reference) | `Strategy/NETSO_RESCO_REGISTRATION_GUIDE.md` | SHIELD, GRID |
| EPC Contract (draft) | `Strategy/NETSO_EPC_CONTRACT_CLAUSES_DRAFT.md` | SHIELD, CANVAS |
| NEM 2025 Guidelines (source) | `~/Documents/30-Atlas/wiki/concepts/Net-Metering-Guidelines-2025.md` | RESCO-Navigator, SHIELD |

---

## Escalation Matrix

| Situation | Escalate To | Action |
|-----------|------------|--------|
| TIN/NID unavailable | Taz directly | Cannot proceed without |
| SREDA review >10 weeks | ATLAS | Request formal status inquiry |
| BPDB inspection failed | ATLAS + Onsite-Commander | Delay in grid interconnection |
| Equipment not on SREDA list | Procurement-Controller | Cannot submit with unapproved equipment |
| BPDB approval within 6 months | ATLAS | Soft alert — not yet critical |
| BPDB approval within 2 months | ATLAS + Taz | Hard escalation — commission date at risk |
| NEM Guideline updated | ATLAS + SHIELD | Review impact on current applications |
| BPDB approval expired | ATLAS + Taz | Re-application required — escalate immediately |