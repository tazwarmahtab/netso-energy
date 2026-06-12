# Netso Financial Operations Standard Operating Procedure

## Purpose

Govern all financial tracking in Netso operations — from installation cost benchmarks through milestone billing, cash flow management, and OPEX pricing.

**Owner**: Finance-Controller (`/finance` skill)
**Aligns with**: LEDGER (NETSO.ini — investor and strategic P&L), Finance-Controller escalates to ATLAS for any expenditure >BDT 5,000

---

## Core Rule: Unit Economics Floor

> **Never use placeholder numbers. The source of truth is always the actual data in `~/Documents/30-Atlas/wiki/entities/Netso.md`.**

The benchmark cost floor: **BDT 80K–115K/kWp** for complete systems including AIT. If a supplier quote exceeds 115K/kWp, escalate to ATLAS before signing any PO.

---

## Step 1: Pre-Installation Financial Verification

**Owner**: Finance-Controller
**Before Procurement-Controller issues any PO**

For every potential installation:

### Cost Estimate (per system)

| Component | Cost/kWp (BDT) | Notes |
|-----------|---------------|-------|
| Solar panels (Jinko 720W N-type) | 30K–45K | Varies with volume and exchange rate |
| Inverter (Sungrow/Huawei, SREDA-approved) | 8K–15K | Single-phase cheaper; three-phase higher |
| Balance of system (mounting, cabling, fuses) | 12K–20K | Larger systems benefit from economies of scale |
| Electrical engineering (single-line diagram, structural cert) | 2K–5K | Fixed cost per site |
| Installation labor | 8K–15K | Depends on complexity |
| Monitoring system (Tigo or equivalent) | 3K–6K | Per-site cost |
| Logistics and staging | 2K–5K | |
| **TOTAL** | **80K–115K/kWp** | **Confirm AIT included** |

*Note: AIT (Advance Income Tax) on panel imports must be included in the above. If the supplier quote excludes AIT, immediately flag to Finance-Controller's supervisor (ATLAS) and recalculate.*

---

## Step 2: Milestone Billing Cycle

**Owner**: Finance-Controller
**Collaborates with**: Onsite-Commander (milestone certification), Outreach-Coordinator (customer invoice delivery)

Every customer installation follows this billing schedule:

| Milestone | % of Contract Value | Trigger | Invoice Issued By |
|-----------|--------------------|---------|-------------------|
| Mobilization advance | 30% | PO issued / contractor mobilization | Finance-Controller |
| Structural completion | 25% | Steel and panels installed, sign-off by Onsite-Commander | Finance-Controller |
| Commissioning | 25% | NEM system live, grid export confirmed | Finance-Controller |
| Final sign-off | 20% | Customer signs acceptance, PPA + O&M active | Finance-Controller |

**Rules**:
- Netso **never** starts work without a signed contract AND the 30% mobilization advance received
- Invoice issued within 2 business days of milestone completion
- Customer payment terms: 15 days from invoice date
- If customer delays payment beyond 30 days: escalate to ATLAS; pause next milestone until payment received

---

## Step 3: 13-Week Rolling Cash Flow Model

**Owner**: Finance-Controller
**Updated**: Weekly
**Delivered to**: ATLAS every Monday (as part of the Execution Digest)

### Cash Flow Inputs

| Item | Timing | Amount |
|------|--------|--------|
| Mobilization advance (per install) | Week 0 | 30% of contract value (customer pays Netso) |
| Procurement PO (Netso pays supplier) | Week 0–2 | 30% advance to supplier per PO |
| Supplier final payment | Week 8–12 | 70% before dispatch |
| Structural milestone billing | Week 4–6 | 25% invoiced to customer |
| Commissioning billing | Week 8–12 | 25% invoiced to customer |
| Final billing | Week 12–16 | 20% invoiced to customer |

### Working Capital Requirements

- **1 concurrent 50kW install**: ৳3–4M required at peak
- **3 concurrent 50kW installs**: ৳8–12M required at peak
- **1 MW (20 × 50kW, phased over 18 months)**: Working capital requirement grows to ৳8–12M at peak, decreases as early installs reach final billing

**Finance-Controller must maintain a live cash flow projection showing**:
- How much cash is needed at each point in the next 13 weeks
- When customer milestone payments arrive vs. when supplier payments are due
- That Netso never goes negative before milestone payments arrive

---

## Step 4: OPEX Pricing for Customer Proposals

**Owner**: Finance-Controller (calculates) + Outreach-Coordinator (delivers)

### OPEX Model Logic

All customer-facing OPEX pricing is calculated by Finance-Controller and delivered to Outreach-Coordinator via `/finance` skill. The logic:

```
Gross customer monthly savings = (Monthly kWh consumption × BDT 10.30/kWh)
Netso PPA charge = (Monthly kWh generated × Netso PPA rate)
Customer net monthly savings = Gross savings − Netso PPA charge

Note: Netso PPA rate is set so that customer always saves money.
Typical PPA rate: 5–11% below current grid tariff (BERC LT-E: BDT 10.30/kWh)
```

### OPEX Pricing Rules

1. **Always use BDT 10.30/kWh** (BERC LT-E commercial tariff) as the base grid rate. Never use other rates unless confirmed by BERC schedule.
2. **Customer must always save money** — Netso PPA rate must be set below the customer's effective grid rate
3. **PPA rate escalation**: Link to BERC-approved tariff increases. Standard: BERC tariff increases by X%, Netso PPA rate increases by the same X% (pass-through). This protects both parties.
4. **OPEX proposal must include**: base case (today's savings), BERC escalation scenarios (5%, 10% tariff increase scenarios — show 25-year cumulative savings)
5. **Verify with a Bangladesh Chartered Accountant** before issuing any OPEX model externally: clarify NBR Tax Holiday applicability to OPEX revenue

---

## Step 5: NBR Tax Holiday Verification

**Owner**: Finance-Controller + SHIELD (coordinate)
**Timeline**: Before OPEX model is shared externally
**Priority**: High — margin assumptions may be materially wrong if Tax Holiday doesn't apply

**What we know**:
- NBR Tax Holiday applies to **BOO (Build-Own-Operate) power plants**
- Tax Holiday does NOT apply to EPC service companies (unless structured as an IPP)
- As a RESCO (operates under SREDA NEM), Netso's OPEX/asset model may qualify as BOO
- A Bangladesh Chartered Accountant must confirm this before investor financial models are finalized

**Action**: Finance-Controller schedules a meeting with a qualified Bangladesh CA before the next investor update.

---

## Step 6: Monthly Operations Review

**Owner**: Finance-Controller
**Timing**: 1st business day of each month

### Monthly Financial Review Deliverables

1. **Installation Financial Summary** (per active installation):
   - Budget vs. actual cost (per line item)
   - Milestone billing received vs. expected
   - Cost overrun status (flag if >5% over budget)

2. **Cash Position Report**:
   - Current cash on hand
   - 13-week forward projection
   - Any financing needs identified

3. **Pipeline P&L View** (for ATLAS + LEDGER):
   - Signed contracts: annual revenue × number of contracted systems
   - Weighted pipeline: probability × estimated annual revenue for each stage

4. **Feed to `/investor-update`**:
   - Actual pilot system cost vs. budget (for 3kW system)
   - Pilot generation savings vs. OPEX model projections
   - Number of signed PPAs and total contracted MW

---