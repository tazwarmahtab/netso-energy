# RESCO Application Shell
**Status**: Live tracker — updated by RESCO-Navigator + Nexus/automation/resco_tracker.py
**Application Number**: [TBD — assigned by SREDA on submission]
**Last Updated**: 2026-04-13
**Current Gate**: EPC contract draft (SHIELD + energy lawyer) — once complete, R1 submission ready

---

## Company Registration

| Field | Value | Status | Source |
|-------|-------|--------|--------|
| Company Name | Netso | ✅ | RJSC Certificate |
| RJSC Registration | ✅ On file | ✅ | Filed with SHIELD |
| TIN | 729793567043 | ✅ | NBR certificate — `credentials/nbr_tin_certificate_729793567043.pdf` |
| Trade License | ✅ On file | ✅ | Filed with SHIELD |
| NID of Authorized Signatory | **On file** | ✅ | `credentials/Tazwar NID.pdf` |
| Registered Address | [Address] | ✅ | RJSC Certificate |

---

## Pilot Installation — Site Documents

| Field | Value | Status | Source |
|-------|-------|--------|--------|
| Site Address | Father's building, Dhaka | ✅ | Site records |
| Rooftop Ownership Proof | TBC | ✅ | Land deed |
| Panel: Jinko JKM720N-66HL5-BDV | 720Wp × N panels | ✅ 2026 Approved Crystalline | SREDA E-Service Portal |
| Inverter (Sungrow/Huawei) | [Model TBD] | ✅ Use sreda_validator.py | SREDA E-Service Portal |
| IEC 62109-1/2 (Inverter) | TBC — model-specific | REQUIRED | Supplier cert |
| IEC 61727 (Grid Interface) | TBC — model-specific | REQUIRED | Supplier cert |
| IEC 62116 (Anti-islanding) | TBC — model-specific | REQUIRED | Supplier cert |
| Panel SREDA Approval | ✅ Jinko Tiger Neo (720Wp) | REQUIRED | SREDA portal |
| Single-line diagram | TBC | REQUIRED | Licensed engineer |
| Structural cert (rooftop load) | TBC | REQUIRED | Licensed engineer |
| **Eligibility (2026)** | ✅ Single-Phase Allowed | PHASE 2 READY | Net Metering Guidelines 2025/26 |
| Estimated commissioning date | Taz to confirm | REQUIRED | — |

---

## Customer Contracts (Required Before Submission)

| Contract | Status | Owner | Location |
|----------|--------|-------|---------|
| Customer EPC Contract | ⏳ PENDING — draft from SHIELD | SHIELD | `Strategy/NETSO_EPC_CONTRACT_CLAUSES_DRAFT.md` |
| 25-year PPA (customer-facing) | ⏳ PENDING — draft from CANVAS | CANVAS (NETSO.ini) | Draft in CANVAS workspace |
| Subcontractor Agreement | ⏳ PENDING — draft from SHIELD | SHIELD | Draft in SHIELD workspace |
| 15-Point Rooftop Structural Inspection | ⏳ PENDING | Onsite-Commander | `Operations/sops/Onsite-SOP.md` |

---

## SREDA Submission Checklist

| Step | Status | Date Completed | Notes |
|------|--------|---------------|-------|
| Application form completed | ⏳ | — | — |
| Company registration cert attached | ✅ | — | Already have |
| TIN cert attached | ✅ | 2026-04-13 | `credentials/nbr_tin_certificate_729793567043.pdf` |
| NID attached | ✅ | 2026-04-13 | `credentials/Tazwar NID.pdf` |
| Site ownership doc attached | ⏳ | — | — |
| Single-line diagram attached | ⏳ | — | Requires engineer |
| Structural cert attached | ⏳ | — | Requires engineer |
| Panel SREDA cert attached | ⏳ | — | Must verify first |
| Inverter SREDA cert attached | ⏳ | — | Must verify model |
| EPC contract (draft) attached | ⏳ | — | SHIELD drafts |
| Application fee paid | ⏳ | — | ~৳5,000 |
| **Subitted to SREDA** | ❌ | — | **Requires Taz approval** |

---

## BPDB NEM Agreement

| Step | Status | Date | Notes |
|------|--------|------|-------|
| SREDA approval received | ❌ | — | Blocked on above |
| BPDB application submitted | ❌ | — | — |
| BPDB Inspector site visit | ❌ | — | Onsite-Commander coordinates |
| NEM Agreement issued | ❌ | — | **8-month clock starts (Nexus monitored)** |
| Commissioning completed | ❌ | — | Must execute before BPDB expiry |
| NEM Agreement expiry | TBC | — | Auto-alert configured in resco_tracker.py |

**⚠️ BPDB Clock Alert**: Commissioning must happen within 8 months of BPDB NEM Agreement issue date. **Action**: `python Nexus/automation/resco_tracker.py` to check current status.

---

## Notes

> RESCO-Navigator updates this file after every interaction with SREDA, BPDB, or Taz regarding the application.
> Last note: [add entry here]