# NETSO Strategic Intelligence Report
## Complete Extraction & Implementation Guide (Sections 1-8)

**Source**: NETSO Strategic Intelligence Report (Complete)  
**Extracted**: 2026-03-16 14:30 UTC+6  
**Status**: ✅ Complete - All 8 sections extracted and documented

---

## Executive Summary

This document consolidates **all strategic intelligence** from the NETSO report into actionable implementation guidance. Coverage:

1. ✅ SREDA Regulatory Framework (Sections 1-3)
2. ✅ Grid Code 2019 Compliance (Section 6)
3. ✅ RESCO/OPEX Business Model (Section 7)
4. ✅ Master Action List (Section 8)
5. ✅ Trademark, Legal, Financial Intelligence
6. ✅ Canopy Product Decision Framework

---

## 🚨 CRITICAL COMPLIANCE ALERTS

### **Alert 1: SREDA Lab Certification**
> **DO NOT** specify modules without SREDA lab certification. Utility will **reject** net metering application.

**Verification Required:**
- Module must be on SREDA approved list (171 modules)
- BSTI certification mandatory (BDS IEC 61215 + IEC 61730)
- Lab test reports must be available for utility inspection

### **Alert 2: Inverter Certification**
> Brand alone is **not sufficient**. Each inverter model must have individual SREDA lab certification.

**Required Certifications per Model:**
- IEC 62109-1/2 (Safety)
- IEC 61727 (Grid frequency/voltage)
- IEC 62116 (Anti-islanding)

**Pre-qualified Brands (verify per model):**
- Sungrow (check model-specific certs)
- Huawei (check model-specific certs)

---

## SECTION 8: MASTER ACTION LIST (SYNTHESIZED)

### 8.1 This Week — Non-Negotiable

#### Action 1: SREDA RESCO Registration
- [ ] Get Stakeholder ID from https://stdb.sreda.gov.bd
- [ ] Complete SREDA Google Form: https://forms.gle/sreda-opex
- [ ] Email: ad.solar@sreda.gov.bd
- [ ] Timeline: 1 day
- [ ] Cost: Free
- [ ] Status: ⏳ PENDING

#### Action 2: Trademark Filing (DPDT)
- [ ] **Class 37** (Installation/maintenance services)
- [ ] **Class 40** (Energy generation services)
- [ ] File at: Department of Patents, Designs and Trademarks, Bangladesh
- [ ] Cost: ~৳5,000
- [ ] Time: 2 hours to file
- [ ] Status: ⏳ PENDING

#### Action 3: Update `constants.py` — SREDA Compliant Values
```python
# PANEL SPECIFICATIONS (SREDA Approved)
PANEL_WP = 720  # Jinko JKM720N-66HL5-BDV
PANEL_LENGTH = 2.278  # meters
PANEL_WIDTH = 1.134  # meters
PANEL_HEIGHT = 0.035  # meters (35mm frame)
PANEL_WEIGHT_KG = 38.5  # kg

# PERFORMANCE PARAMETERS
USABLE_RATIO = 0.52  # Dynamic formula: 1.0 / (1.0 + tan(15° * π/180))
BIFACIAL_GAIN = 1.05  # 5% gain from bifacial
PERFORMANCE_RATIO = 0.78  # System efficiency (losses)

# ORIENTATION
TILT_ANGLE = 23.0  # Bangladesh optimal
AZIMUTH = 180.0  # True south

# CERTIFICATION
PANEL_CERTIFICATION = "BSTI Ref# 351336"
PANEL_STANDARD = "BDS IEC 61215 + IEC 61730"
SREDA_APPROVED = True

# INVERTER REQUIREMENTS
INVERTER_CERTS_REQUIRED = [
    "IEC 62109-1",  # Safety
    "IEC 62109-2",  # Safety
    "IEC 61727",    # Grid compatibility
    "IEC 62116"     # Anti-islanding
]
```

#### Action 4: Populate Google Drive Folders
- [ ] Create folder structure:
  - `/Legal/` (contracts, agreements)
  - `/Compliance/` (SREDA certs, BSTI reports)
  - `/Technical/` (system designs, specs)
  - `/Financial/` (cash flow models, tax docs)
  - `/Marketing/` (presentations, product sheets)
- [ ] Upload all documents from this session
- [ ] Status: ⏳ PENDING (Drive currently empty)

---

### 8.2 Before First Install — Legal & Safety

#### Customer EPC Contract
**Cost**: ৳20,000–50,000 (Bangladeshi energy lawyer)  
**Must Include**:
- [ ] **Utility approval as condition precedent** to grid connection (Section 7, Electricity Act 2018)
- [ ] **Installation milestone sign-offs** (Section 52 due diligence protection)
- [ ] **Liability cap** at contract value
- [ ] Payment schedule tied to milestones (30% advance, 40% delivery, 30% commissioning)

#### Subcontractor Agreement
**Purpose**: Section 43 abetment liability mitigation  
**Must Include**:
- [ ] Safety checklist sign-offs at each installation milestone
- [ ] Personal protective equipment (PPE) requirements
- [ ] Incident reporting protocol
- [ ] Indemnification clause
- [ ] Termination for safety violations

#### 15-Point Rooftop Structural Inspection Checklist
**Standardize before any site visit**:
1. [ ] Roof type (concrete, tin, tile)
2. [ ] Roof age and condition
3. [ ] Load-bearing capacity (kg/sqft)
4. [ ] Waterproofing status
5. [ ] Drainage adequacy
6. [ ] Access path safety
7. [ ] Parapet wall height/strength
8. [ ] Shading analysis (360°)
9. [ ] Electrical room proximity
10. [ ] Grid connection point location
11. [ ] Wind load assessment
12. [ ] Seismic zone compliance
13. [ ] Fire escape route clearance
14. [ ] Equipment lift access
15. [ ] Photo documentation (all angles)

#### Inverter Verification (Per Model)
- [ ] Sungrow: Verify model-specific IEC 62109-1/2, 61727, 62116
- [ ] Huawei: Verify model-specific IEC 62109-1/2, 61727, 62116
- [ ] Document cert numbers in proposal
- [ ] Keep copies for utility submission

---

### 8.3 Before Proposal Stage

#### O&M Contract Template
**Revenue**: ৳5,000/yr (materializes only with signed contract)  
**Must Include**:
- [ ] 2 visits/year preventive maintenance
- [ ] 48-hour emergency SLA
- [ ] Auto-renewal clause
- [ ] CPI escalation (5-7% annually)
- [ ] Performance monitoring requirements
- [ ] Warranty claim support

#### Supplier Framework Agreements
- [ ] **Panels**: SREDA approved list ONLY
  - Primary: Jinko JKM720N-66HL5-BDV (720Wp)
  - Alternative: Jinko JKM710N-66HL5-BDV (710Wp)
  - Compact option: Bluesun BSM565M10-72HPH (565Wp, SL#109)
- [ ] **Pricing lock**: 60-90 days from quote
- [ ] **Delivery timeline**: 2-4 weeks
- [ ] **Warranty terms**: 25yr linear performance, 12yr product

#### Bluesun Procurement Option
- **Model**: BSM565M10-72HPH
- **SREDA SL#**: 109
- **Use case**: Smaller systems where 720W panels are oversized
- **Advantage**: Lower capex, easier handling, SREDA-approved

---

### 8.4 Before Month 2 — Financial & Tax

#### NBR Tax Holiday Eligibility
- [ ] Confirm with Bangladesh CA
- [ ] Applies to: **BOO power plants** (Build-Own-Operate)
- [ ] Does NOT automatically apply to: EPC service companies
- [ ] Action: Structure RESCO projects as BOO for tax holiday eligibility

#### AIT (Advance Income Tax) on Panel Imports
- [ ] Confirm AIT is included in ৳80K–115K/kWp cost model
- [ ] If NOT included: Margins are overstated
- [ ] Current duty structure: ~12-15% on solar imports
- [ ] Action: Get written confirmation from customs broker

#### 13-Week Rolling Cash Flow Model
**Requirement**: 3 concurrent 50kWp installs  
**Working Capital Needed**: ৳8–12M (at 30% advance milestone)

**Model Structure**:
- Week 1-4: 30% advance from 3 clients = ৳3.6M (on ৳4M/project)
- Week 5-8: 40% delivery payment = ৳4.8M
- Week 9-13: 30% commissioning = ৳3.6M
- **Gap**: ৳8-12M needed for deposits, labor, logistics before payments

**Action**: Build Excel/Google Sheets model with:
- Milestone payment tracking
- Supplier payment terms
- Labor cost scheduling
- Contingency reserve (10%)

#### 8-Month Net Metering Deadline Tracking
- [ ] Wire into ClickUp (or project management tool)
- [ ] Auto-alert at 6 months (2 months remaining)
- [ ] Hard stop at 7.5 months (0.5 months buffer)
- [ ] Status field: Application → Approval → Installation → Commissioning → Net Metering Approved

---

### 8.5 Strategic Intelligence — Canopy Product Decision

#### Canopy/Pergola Concept
**Viability**: ✅ Premium product line  
**Revenue Premium**: +20–40% over rack installs  
**Use case**: Rooftop lounge areas, carports, shaded terraces

**Design Requirements**:
- [ ] Use SREDA-approved crystalline panels (Jinko 720W)
- [ ] Structure: Aluminum or galvanized steel
- [ ] Height: 2.5-3.5m clearance
- [ ] Tilt: Fixed or adjustable (15-25°)
- [ ] **NOT BIPV glass** (not SREDA approved, not net-metering eligible)

#### White-Painted Rooftop Coating (Upsell)
- **Purpose**: Increase bifacial rear-side gain
- **Standard gain**: 5% (unpainted)
- **With coating**: 12-15% gain
- **Cost**: ~৳50–100/sqft
- **ROI**: Positive (payback <2 years with 720Wp bifacial)
- **Presentation**: ROI-positive add-on in proposals

#### BIPV Glass (Onyx Solar) — Phase 3
- **Status**: NOT actionable for net metering now
- **Reason**: No SREDA BIPV-specific approval pathway
- **When to revisit**: After SREDA creates BIPV category
- **Use case**: Aesthetic facades, skylights (off-grid only for now)

#### Thin-Film Panels
- **SREDA Status**: ZERO thin-film modules approved
- **Relevance**: NOT relevant for Netso's net metering business
- **Potential use cases**: Off-grid, decorative, low-light applications
- **Recommendation**: Do not pursue until SREDA approves thin-film

---

## SECTION 7: RESCO / OPEX Business Model (Complete)

### 7.1 Business Model Comparison

| Dimension | EPC / CAPEX (Current) | RESCO / OPEX (Future) |
|-----------|----------------------|----------------------|
| **Revenue Model** | One-time installation fee | Monthly electricity sales |
| **System Ownership** | Customer owns after install | Netso owns 10-25 years |
| **Customer Payment** | ৳80K-115K/kWp upfront | ৳/kWh at discount to grid |
| **Working Capital** | Recovered in 60 days | 7-10 year payback |
| **Customer Risk** | High (full cost upfront) | Zero (no upfront) |
| **Netso Risk** | Low | High (must finance) |
| **SREDA Registration** | EPC license | RESCO form required |
| **Recommendation** | **Primary now** | **Phase 2 with IDCOL/BIFFL** |

### 7.2 Strategic Recommendation
1. Register as RESCO **now** (free, gets you in directory)
2. Continue operating as EPC (current cash flow model)
3. Convert select clients to OPEX when IDCOL/BIFFL financing secured

---

## SECTION 6: Grid Code 2019 Compliance (Complete)

### 6.1 Mandatory Requirements
- ✅ 3-Phase connection only (single-phase excluded)
- ✅ System size ≤70% of sanctioned load
- ✅ Installation within 8 months of approval (HARD deadline)
- ✅ Modules from SREDA approved list (171 options)
- ✅ BSTI certification (BDS IEC 61215 + IEC 61730)
- ✅ Inverter certifications (IEC 62109, 61727, 62116)

### 6.2 Legal Exposure Map
| Section | Requirement | Netso Action |
|---------|-------------|--------------|
| **Section 7** | Written utility approval before connection | Milestone payment condition |
| **Section 52** | Due diligence protection | Installation milestone checklists |
| **Section 43** | Subcontractor safety = your liability | Safety sign-offs required |
| **BERC Jurisdiction** | Penalties for violations | Pre-qualify all equipment |

---

## Implementation Priority Matrix

| Priority | Action | Deadline | Impact | Effort |
|----------|--------|----------|--------|--------|
| **P0** | RESCO Registration | This Week | High | Low |
| **P0** | Trademark Filing | This Week | High | Low |
| **P0** | Update constants.py | This Week | High | Low |
| **P1** | Customer EPC Contract | Before First Install | Critical | Medium |
| **P1** | Subcontractor Agreement | Before First Install | Critical | Medium |
| **P1** | 15-Point Inspection Checklist | Before First Install | Critical | Low |
| **P2** | O&M Contract Template | Before Proposal | High | Low |
| **P2** | Supplier Framework Agreements | Before Proposal | High | Medium |
| **P2** | Populate Google Drive | This Week | Medium | Low |
| **P3** | 13-Week Cash Flow Model | Before Month 2 | High | Medium |
| **P3** | NBR Tax Holiday Confirmation | Before Month 2 | Medium | Low |
| **P3** | AIT Import Duty Confirmation | Before Month 2 | Medium | Low |

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Non-certified module specified | Medium | **CRITICAL** | Verify against SREDA list before every quote |
| Grid connection without approval | Low | **CRITICAL** | Utility approval = milestone payment condition |
| Subcontractor safety violation | Medium | **HIGH** | Safety sign-offs, training, audits |
| Working capital shortfall | High | **HIGH** | 13-week rolling cash flow model |
| 8-month deadline missed | Medium | **CRITICAL** | ClickUp tracking with auto-alert |
| AIT not in cost model | Medium | **MEDIUM** | Confirm with customs broker |
| BIPV pursued prematurely | Low | **MEDIUM** | Wait for SREDA BIPV pathway |

---

## Files Created/Updated

1. ✅ `primer.md` - Project context & single source of truth
2. ✅ `MEMORY.md` - Learning & evolution tracking
3. ✅ `feedback.md` - Feedback loops & iterations
4. ✅ `START.md` - Quick reference guide
5. ✅ `NETSO_STRATEGIC_REPORT_COMPLETE.md` - Sections 1-5 extraction
6. ✅ `NETSO_STRATEGIC_REPORT_FINAL.md` - **This file** (Sections 6-8 + complete synthesis)
7. ✅ `netso-website-final.html` - Strategic intelligence integrated
8. ⏳ Google Drive folders - PENDING (populate this week)

---

## Next Steps

### Immediate (Today/Tomorrow)
1. [ ] Complete RESCO registration
2. [ ] File trademark (DPDT Class 37 + 40)
3. [ ] Update `constants.py` with SREDA-compliant values
4. [ ] Create Google Drive folder structure
5. [ ] Upload all session documents to Drive

### This Week
6. [ ] Draft customer EPC contract (engage energy lawyer)
7. [ ] Draft subcontractor agreement
8. [ ] Standardize 