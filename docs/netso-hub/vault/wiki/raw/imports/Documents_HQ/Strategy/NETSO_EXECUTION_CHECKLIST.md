# NETSO — Execution Checklist (P0 Priorities)
**Last Updated**: 2026-03-16  
**Status**: Ready for Execution  
**Confidential**: For Internal Use Only

---

## 🚨 CRITICAL PATH: Before First Install

### 1. Legal & Compliance (Complete Before Any Site Work)

#### ✅ Trademark Filing — DPDT
- [ ] **Action**: File trademark "Netso" with Department of Patents, Designs and Trademarks
- [ ] **Classes**: Class 37 (Construction/Installation) + Class 40 (Energy Production)
- [ ] **Cost**: ~৳5,000
- [ ] **Time**: 2 hours to file
- [ ] **Status**: ⏳ PENDING
- [ ] **Location**: dpdt.gov.bd

#### ✅ Customer EPC Contract
- [ ] **Action**: Hire Bangladeshi energy lawyer (৳20,000–50,000)
- [ ] **Must Include**:
  - [ ] Utility approval as condition precedent to grid connection (Section 7)
  - [ ] Installation milestone sign-offs (Section 52 due diligence)
  - [ ] Liability cap at contract value
- [ ] **Status**: ⏳ PENDING

#### ✅ Subcontractor Agreement
- [ ] **Action**: Draft subcontractor agreement with safety provisions
- [ ] **Must Include**:
  - [ ] Section 43 abetment liability mitigation
  - [ ] Safety checklist sign-offs at each installation milestone
- [ ] **Status**: ⏳ PENDING

#### ✅ 15-Point Rooftop Structural Inspection Checklist
- [ ] **Action**: Standardize checklist before any site visit
- [ ] **Requirements**:
  - [ ] Load-bearing capacity verification
  - [ ] Waterproofing integrity check
  - [ ] Parapet wall condition
  - [ ] Access route safety
  - [ ] Wind load assessment
  - [ ] Drainage adequacy
  - [ ] Electrical room proximity
  - [ ] Shadow analysis (adjacent structures)
  - [ ] Module transport path
  - [ ] Emergency exit clearance
  - [ ] Fire safety compliance
  - [ ] Lightning protection compatibility
  - [ ] Roof age and material assessment
  - [ ] Previous repair history
  - [ ] Owner maintenance commitment
- [ ] **Status**: ⏳ PENDING

#### ✅ Inverter Certification Verification
- [ ] **Action**: Verify per-model SREDA lab certification
- [ ] **Required Certifications**:
  - [ ] IEC 62109-1/2 (Safety)
  - [ ] IEC 61727 (Grid Interface)
  - [ ] IEC 62116 (Anti-islanding)
- [ ] **Approved Brands**: Sungrow, Huawei (individual model verification required)
- [ ] **Warning**: Brand alone is NOT sufficient — must verify specific model
- [ ] **Status**: ⏳ PENDING

---

### 2. Supplier & Procurement Setup

#### ✅ Supplier Framework Agreements
- [ ] **Primary Panel**: Jinko JKM720N-66HL5-BDV (SREDA SL# TBD — verify on approved list)
  - [ ] Lock pricing 60–90 days from quote
  - [ ] Confirm availability for 50kWp pilot batch
- [ ] **Alternative Panel**: Bluesun BSM565M10-72HPH (SREDA SL#109)
  - [ ] Use for smaller systems where 720W panels are oversized
- [ ] **Status**: ⏳ PENDING

#### ✅ O&M Contract Template
- [ ] **Action**: Draft Operations & Maintenance contract
- [ ] **Revenue**: ৳5,000/yr per system (only materializes with signed contract)
- [ ] **Must Include**:
  - [ ] 2 visits/year minimum
  - [ ] 48-hour emergency SLA
  - [ ] Auto-renewal clause
  - [ ] CPI-based escalation
- [ ] **Status**: ⏳ PENDING

---

### 3. Financial & Tax Compliance

#### ✅ NBR Tax Holiday Eligibility
- [ ] **Action**: Confirm with Bangladesh Chartered Accountant
- [ ] **Applies to**: BOO (Build-Own-Operate) power plants
- [ ] **Does NOT Apply**: EPC service companies (unless structured as IPP)
- [ ] **Deadline**: Before Month 2
- [ ] **Status**: ⏳ PENDING

#### ✅ AIT (Advance Income Tax) Verification
- [ ] **Action**: Confirm AIT on panel imports is included in cost model
- [ ] **Current Model**: ৳80K–115K/kWp
- [ ] **Risk**: If AIT not included, margins are overstated
- [ ] **Deadline**: Before Month 2
- [ ] **Status**: ⏳ PENDING

#### ✅ 13-Week Rolling Cash Flow Model
- [ ] **Action**: Build cash flow model with milestone tracking
- [ ] **Requirement**: 3 concurrent 50kWp installs need ৳8–12M working capital
- [ ] **Assumption**: 30% advance milestone payment
- [ ] **Deadline**: Before Month 2
- [ ] **Status**: ⏳ PENDING

---

### 4. Project Management & Tracking

#### ✅ Net Metering Deadline Tracker
- [ ] **Action**: Wire 8-month installation deadline into ClickUp
- [ ] **Alerts**:
  - [ ] Auto-alert at 6 months (soft warning)
  - [ ] Hard stop at 7.5 months (escalation)
- [ ] **Rationale**: BPDB approval valid for 8 months; re-application required after
- [ ] **Status**: ⏳ PENDING

---

## 📦 PRODUCT DECISIONS (Finalized)

### Canopy Product Line — Decision Matrix
| Decision | Status | Rationale |
|----------|--------|-----------|
| **Use SREDA-approved crystalline panels (Jinko 720W)** | ✅ CONFIRMED | Net metering eligible |
| **BIPV glass (Onyx Solar)** | ❌ REJECTED | Not SREDA approved, not net metering eligible |
| **Thin-film panels** | ❌ REJECTED | Zero SREDA-approved thin-film modules exist |
| **White rooftop coating upsell** | ✅ CONFIRMED | Increases bifacial gain 5% → 12-15%, ROI <2 years |
| **Canopy revenue premium** | ✅ CONFIRMED | +20-40% over rack installs |

### Canopy Upsell Strategy
- **White Rooftop Coating**:
  - Cost: ৳50–100/sqft
  - Benefit: Increases bifacial gain from 5% to 12–15%
  - Pitch: ROI-positive add-on (payback <2 years)
- **Status**: Include in all premium proposals

---

## 📁 DOCUMENT UPLOAD PRIORITY

### Google Drive Folder Structure (Create Before Upload)
```\
Netso/
├── 01_Strategic_Intelligence/
│   ├── NETSO_STRATEGIC_REPORT_PART1_SREDA_GRIDCODE.md
│   ├── NETSO_STRATEGIC_REPORT_PART2_ALBEDO_BIFACIAL.md
│   ├── NETSO_STRATEGIC_REPORT_PART3_BIPV_CANOPY.md
│   ├── NETSO_STRATEGIC_REPORT_PART4_PRODUCT_STRATEGY.md
│   ├── NETSO_STRATEGIC_REPORT_PART5_FINANCIALS.md
│   ├── NETSO_STRATEGIC_REPORT_PART6_APPENDIX.md
│   ├── NETSO_STRATEGIC_REPORT_PART7_PLATFORM.md
│   ├── NETSO_STRATEGIC_REPORT_PART8_EXPANDED.md
│   ├── NETSO_STRATEGIC_REPORT_PART9_MOAT_VC.md
│   ├── NETSO_STRATEGIC_REPORT_PART10_VC_VERDICT.md
│   ├── NETSO_STRATEGIC_REPORT_PART11_FINAL_ADDENDUM.md
│   └── NETSO_STRATEGIC_REPORT_PART12_MASTER_ROADMAP.md
├── 02_Legal_Compliance/
│   ├── EPC_Contract_Template.md
│   ├── Subcontractor_Agreement.md
│   ├── Rooftop_Inspection_Checklist.md
│   ├── O&M_Contract_Template.md
│   └── Trademark_Filing_Receipt.pdf
├── 03_Financial_Models/
│   ├── Unit_Economics_3kW_Residential.xlsx
│   ├── Unit_Economics_500kW_Industrial.xlsx
│   ├── Cashflow_13Week_Rolling.xlsx
│   └── Tax_Holiday_Analysis.md
├── 04_Supplier_Agreements/
│   ├── Jinko_Framework_Agreement.pdf
│   ├── Bluesun_Framework_Agreement.pdf
│   └── Inverter_Certification_Verification.pdf
├── 05_Pilot_Projects/
│   ├── 3kW_Pilot_Data/
│   ├── Chattogram_Cluster_Plan.md
│   └── BPDB_Application_Tracker.xlsx
└── 06_Pitch_Deck/
    ├── Netso_Investor_Deck_v1.pdf
    └── Financial_Projections_Summary.xlsx
```

### Upload Checklist
- [ ] Create folder structure above
- [ ] Upload all 12 strategic report parts
- [ ] Upload legal templates (once drafted)
- [ ] Upload financial models
- [ ] Upload supplier agreements
- [ ] Share with legal counsel, accountant, potential investors
- [ ] **Status**: ⏳ PENDING

---

## 🎯 IMMEDIATE ACTIONS (This Week)

### Priority 1: Legal Foundation (2-3 days)
- [ ] File trademark (DPDT, ৳5,000, 2 hours)
- [ ] Engage energy lawyer for EPC contract (৳20K-50K)
- [ ] Draft subcontractor agreement
- [ ] Create 15-point rooftop inspection checklist

### Priority 2: Supplier Setup (2-3 days)
- [ ] Contact Jinko distributor for framework agreement
- [ ] Verify inverter model certifications (Sungrow/Huawei)
- [ ] Get quotes for white rooftop coating (৳50-100/sqft)
- [ ] Draft O&M contract template

### Priority 3: Financial Compliance (3-5 days)
- [ ] Meet with Bangladesh CA for tax holiday confirmation
- [ ] Verify AIT inclusion in cost model
- [ ] Build 13-week rolling cash flow model
- [ ] Set up ClickUp deadline tracker

### Priority 4: Document Upload (1 day)
- [ ] Create Google Drive folder structure
- [ ] Upload all 20 strategic documents
- [ ] Organize by category
- [ ] Share with stakeholders

---

## 📊 STRATEGIC CONTEXT

### The Unfair Advantage
- **Garment Industry Connections**: Access to 20-30 factory rooftops (500kW–2MW each)
- **Scale Math**: 1 factory (500kW) = 167 residential homes (3kW each)
- **First-Mover Lock-in**: 20-25 year rooftop leases prevent competition

### The P0 Metric
> **Install 1 MW as fast as humanly possible.**
> - At 1 MW: Infrastructure operator (10-15x revenue valuation)
> - Below 1 MW: Solar installer (1-2x revenue valuation)

### The Risk
> **Rooftop acquisition speed determines winner.**
> If Netso doesn't lock rooftops in 12-18 months, competitors will replicate the model.

---

## ✅ COMPLETION STATUS

| Category | Status | % Complete |
|----------|--------|------------|
| Strategic Intelligence | ✅ Complete | 100% |
| Trademark Filing | ⏳ Pending | 0% |
| Legal Contracts | ⏳ Pending | 0% |
| Supplier Agreements | ⏳ Pending | 0% |
| Financial Models | ⏳ Pending | 0% |
| Google Drive Upload | ⏳ Pending | 0% |
| First Install (50kWp) | ⏳ Pending | 0% |

**Overall Execution Readiness**: 100% strategic clarity, 0% operational execution

---

**Next Step**: Begin Priority 1 (Legal Foundation) immediately.

**Sources**: SREDA E-Service Desk · BERC Electricity Grid Code 2019 · Power Division Net Metering Calculator · Onyx Solar BIPV · Bluesun 2024 Catalog · RatedPower Albedo Research · EnergySage / Korvus / ScienceDirect
