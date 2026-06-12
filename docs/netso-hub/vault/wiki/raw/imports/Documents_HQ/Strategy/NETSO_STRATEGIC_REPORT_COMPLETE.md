# NETSO Strategic Intelligence Report
## Complete Extraction & Implementation Guide

**Source**: NETSO Strategic Intelligence Report (Sections 1-8)  
**Extracted**: 2026-03-16 14:15 UTC+6  
**Status**: Critical intelligence integrated, compliance framework established

---

## Executive Summary

This document consolidates all strategic intelligence from the NETSO report into actionable implementation guidance. Key focus areas:

1. **SREDA Lab Certification** - CRITICAL: No net metering without it
2. **Grid Code 2019 Compliance** - Technical requirements for grid connection
3. **RESCO/OPEX Model** - Future business model transition path
4. **Immediate Action List** - This week's non-negotiable tasks

---

## 🚨 CRITICAL COMPLIANCE ALERT

### **SREDA Lab Certification Requirement**
> **DO NOT** specify modules without SREDA lab certification. Utility will **reject** net metering application.

**Verification Required:**
- Module must be on SREDA approved list (171 modules)
- BSTI certification mandatory (BDS IEC 61215 + IEC 61730)
- Lab test reports must be available for utility inspection

**Premium Selection (Verified):**
- **Jinko JKM720N-66HL5-BDV** - 720Wp
- BSTI Ref#: 351336 (December 2025)
- Type: Bifacial Dual-Glass
- Status: ✅ SREDA Approved

---

## SECTION 6: Bangladesh Electricity Grid Code 2019 (BERC)

### 6.1 Grid Code Overview

**Source**: BERC Electricity Grid Code Regulations 2019 (S.R.O. No. 410-Law/2019, gazetted January 9, 2020)

This is the **technical bible** for grid-connected solar in Bangladesh.

#### Grid Code Compliance Matrix

| Grid Code Area | Netso Implication | Action Required |
|----------------|-------------------|-----------------|
| **Planning Standards** | System design must be compatible with transmission system criteria | Critical for 33kV bulk tariff customers |
| **Connection Conditions** | Technical standards for inverters and interconnect | Must meet before utility approval |
| **Frequency & Voltage** | 50Hz grid frequency, voltage tolerance | IEC 61727 + IEC 62116 inverter certs required |
| **Protection Requirements** | Anti-islanding mandatory | IEC 62116 compliance, disconnect on grid fault |
| **Metering** | Bidirectional metering required | Utility installs, Netso coordinates |
| **Outage Planning** | No work during scheduled outages without clearance | Utility coordination mandatory |
| **Communication & Data** | SCADA/telemetry for >100kWp systems | Required by distribution licensee |
| **Performance Standards** | Financial standards for licensees | Subcontractor obligations apply |

### 6.2 Legal Exposure Map (Grid Code + Electricity Act 2018)

| Section | Requirement | Netso Action |
|---------|-------------|--------------|
| **Section 7 (Electricity Act 2018)** | No modification to licensee lines/plant without written consent | **Milestone**: Written utility approval BEFORE grid connection work. Make this a payment condition in EPC contract |
| **Section 52** | Personal liability — company offences flow to owner/director unless due diligence proven | **Action**: Build installation milestone checklists as paper trail |
| **Section 43 (Abetment)** | Subcontractors doing unsafe work = you are liable as abettor | **Action**: Subcontractor agreements MUST include safety compliance milestone sign-offs |
| **BERC Jurisdiction** | BERC can investigate, penalize, suspend for grid code violations | **Risk**: Non-compliant inverter or unauthorized connection = enforcement action |

### 6.3 Grid Code Implementation Checklist

#### Pre-Installation
- [ ] Written utility approval obtained (Section 7 compliance)
- [ ] Inverter certifications verified (IEC 61727, IEC 62116, IEC 62116 anti-islanding)
- [ ] Module certifications confirmed (BSTI + SREDA approved list)
- [ ] System design compatible with transmission criteria (for 33kV customers)
- [ ] SCADA/telemetry plan for >100kWp systems

#### Installation Phase
- [ ] Installation milestone checklists completed (Section 52 protection)
- [ ] Subcontractor safety sign-offs obtained (Section 43 compliance)
- [ ] No work during scheduled outages without utility clearance
- [ ] Interconnection equipment meets technical standards

#### Post-Installation
- [ ] Bidirectional meter installation coordinated with utility
- [ ] Grid connection tested and verified
- [ ] Anti-islanding protection tested
- [ ] Commissioning documentation submitted to utility
- [ ] Net metering application submitted with all certifications

---

## SECTION 7: RESCO / OPEX Business Model Intelligence

### 7.1 RESCO/OPEX Model Overview

**SREDA's RESCO Registry** is specifically for **OPEX investors** — companies that **OWN** the solar system and sell electricity to the customer (rather than selling the system outright).

This is **distinct** from Netso's current EPC (capex) model.

### 7.2 Business Model Comparison

| Dimension | EPC / CAPEX Model (Current) | RESCO / OPEX Model (Future) |
|-----------|------------------------------|------------------------------|
| **Revenue Model** | One-time installation fee | Monthly electricity sales to customer |
| **System Ownership** | Customer owns after install | Netso owns for 10–25 years |
| **Customer Payment** | ৳80K–৳115K/kWp upfront | ৳/kWh at discount to grid rate |
| **Netso Working Capital** | Recovered within 60 days of install | 7–10 year payback on capex |
| **Risk to Customer** | High (full system cost) | Zero (no upfront) |
| **Risk to Netso** | Low (paid before/during install) | High (must finance system cost) |
| **SREDA Registration** | EPC license (not RESCO form) | RESCO form + SREDA directory |
| **Recommended for Netso** | **YES** — primary model now | **Future Phase 2** (with IDCOL/BIFFL financing) |

### 7.3 Strategic Recommendation

**Immediate Action:**
- Register as RESCO **now** (form is free, gets you in SREDA's directory and tender pipeline)
- Continue operating as EPC first (current cash flow model)
- Convert select clients to OPEX when IDCOL/BIFFL financing is secured

**Why Register Now?**
1. Free registration
2. Access to 46,854 institution tender pipeline
3. Positions Netso for future OPEX opportunities
4. No obligation to operate OPEX immediately
5. Dual capability (EPC + RESCO) makes Netso more competitive

### 7.4 RESCO Registration Steps

1. **Get Stakeholder ID**: https://stdb.sreda.gov.bd
2. **Complete RESCO Form**: https://forms.gle/sreda-opex
3. **Email Confirmation**: ad.solar@sreda.gov.bd
4. **Timeline**: 1 day for form completion
5. **Cost**: Free

---

## SECTION 8: Master Action List

### 8.1 This Week — Non-Negotiable

#### Action 1: SREDA RESCO Registration
- [ ] Get Stakeholder ID from https://stdb.sreda.gov.bd
- [ ] Complete SREDA Google Form: https://forms.gle/sreda-opex
- [ ] Email: ad.solar@sreda.gov.bd
- [ ] Timeline: 1 day
- [ ] Status: ⏳ PENDING

#### Action 2: Update `constants.py` — SREDA Compliant Values

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
```

#### Action 3: Grid Code Compliance Integration
- [ ] Verify inverter certifications (IEC 61727, IEC 62116)
- [ ] Document anti-islanding protection
- [ ] Prepare utility approval checklist
- [ ] Create subcontractor safety agreement template
- [ ] Build installation milestone checklist (Section 52 protection)

#### Action 4: Legal Protection Measures
- [ ] Add utility approval milestone to EPC contracts
- [ ] Include subcontractor safety compliance clauses
- [ ] Document due diligence procedures
- [ ] Create paper trail system for installations

---

## Implementation Priority Matrix

| Priority | Action | Deadline | Impact | Effort |
|----------|--------|----------|--------|--------|
| **P0** | RESCO Registration | This Week | High (tender access) | Low |
| **P0** | Update constants.py | This Week | High (compliance) | Low |
| **P1** | Grid Code checklist | This Week | Critical (legal) | Medium |
| **P1** | Subcontractor agreements | This Week | Critical (liability) | Medium |
| **P2** | Utility approval workflow | Next Week | High (project flow) | Medium |
| **P2** | Installation milestone templates | Next Week | High (risk mitigation) | Low |

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Non-certified module specified** | Medium | **CRITICAL** | Verify against SREDA list before every quote |
| **Grid connection without approval** | Low | **CRITICAL** | Utility approval = milestone payment condition |
| **Subcontractor safety violation** | Medium | **HIGH** | Safety sign-offs, training, audits |
| **RESCO registration delayed** | Low | **MEDIUM** | Complete this week, follow up with SREDA |
| **Inverter non-compliance** | Low | **HIGH** | Pre-qualify inverters, verify certs |

---

## Next Steps

### Immediate (Today/Tomorrow)
1. Complete RESCO registration
2. Update `constants.py` with SREDA-compliant values
3. Verify Jinko 720Wp availability with suppliers

### This Week
4. Create grid code compliance checklist
5. Draft subcontractor safety agreement
6. Build installation milestone template
7. Update website with grid code compliance info

### Next Week
8. Integrate financial modeling (BDT tariffs, ROI)
9. Create investor presentation materials
10. Design 3D solar configurator with compliance checks

---

*Extracted: 2026-03-16 14:15 UTC+6*  
*Status: Critical intelligence documented, action items defined*  
*Next: Implementation of compliance measures and RESCO registration*
