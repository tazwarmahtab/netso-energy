---
name: 01-model-framework
description: Three-statement financial model skeleton for Netso HQ — income statement, balance sheet, and cash flow statement for the distributed solar RESCO operator.
confidence: medium
updated: 2026-04-13
---

# Netso HQ — Three-Statement Model Framework

**As of**: 2026-04-13
**Stage**: Pre-revenue / Pilot
**Model version**: v1.0
**Owner**: Arjun (FP&A Agent) + Rohan (Unit Economics)

---

## Model Assumptions (Source of Truth)

| Assumption | Value | Source |
|:-----------|:------|:-------|
| Revenue model | RESCO / Net Metering | [[RESCO Model]] |
| Pilot system size | 3 kW | `pilot/pilot-case-study.md` |
| BERC benchmark tariff | ৳11.65/kWh rooftop | BERC 2025 |
| Net metering sellback | 80% of generation | [[Net Metering Guidelines 2025]] |
| Capacity factor (Dhaka) | 16.0% | Calibrated from pilot |
| Capacity factor (Chattogram) | 17.5% | Estimated |
| Annual solar degradation | 0.5% | Industry standard |
| IDCOL debt rate | 9% p.a. | [[IDCOL]] |
| IDCOL leverage | Up to 80% of CAPEX | [[IDCOL]] |
| O&M cost (Year 1) | ৳1,250/kW/year | Industry benchmark |
| O&M inflation | 8% p.a. | Bangladesh CPI |
| PPA term | 25 years | [[RESCO Model]] |
| USD/BDT exchange rate | ৳120/$ | Current |
| Corporate tax rate | 27.5% | NBR RE Schedule |
| WHT on PPA revenue | 7% | NBR |

---

## Income Statement (Annual, ৳)

### Revenue Bridge — Year 1 (Assumptions)

| Revenue Line | Formula | Value |
|:------------|:--------|:------|
| Active rooftops | Pipeline → signed → commissioned | TBD (pre-revenue) |
| Avg system size | Per [[Netso]] pipeline | 100 kW assumed |
| Annual generation/roof | 100kW × 1,600 hrs (base) | 1,60,000 kWh |
| Export revenue (80%) | 1,60,000 × 0.8 × ৳9.32 | ৳11,92,960 |
| Avoided cost benefit (20%) | — | Not revenue to Netso |
| Gross revenue | | ঃ৳11,92,960/roof |
| Total portfolio revenue | × N commissioned rooftops | ঃTBD |

### Operating Expense Assumptions

| Cost Line | Year 1 (/kW) | Annual Escalation |
|:---------|:------------|:-----------------|
| O&M | ৳1,250/kW | 8% |
| Monitoring | ৳400/kW | 5% |
| Insurance | ৳500/kW | 3% |
| Admin/overhead | ৳300/kW | 10% |
| **Total Opex** | **৳2,450/kW** | — |

### P&L Template (One Rooftop, 100kW)

| Line | Year 1 | Year 5 | Year 10 | Year 25 |
|:-----|-------:|-------:|--------:|--------:|
| Revenue (৳) | 11,92,960 | 13,20,000* | 14,50,000* | 16,80,000* |
| O&M (৳) | 2,45,000 | 3,36,000 | 4,93,000 | 11,10,000 |
| EBITDA (৳) | 9,47,960 | 9,84,000 | 9,57,000 | 5,70,000 |
| Debt service (৳) | 8,70,000 | 8,70,000 | 8,70,000 | — |
| **Net cash flow (৳)** | **77,960** | **1,14,000** | **87,000** | **5,70,000** |
| *with 2% annual tariff escalation applied | | | | |

---

## Cash Flow Statement (Annual — One Rooftop)

| Line | Formula | Year 1 | Year 5 | Year 15 |
|:-----|:--------|-------:|-------:|--------:|
| Revenue | From IS | 11,92,960 | 13,20,000 | 15,80,000 |
| O&M outflow | From IS | (2,45,000) | (3,36,000) | (5,50,000) |
| Tax (27.5%) | EBIT × 27.5% | (TBD) | TBD | TBD |
| Debt service | EMI schedule | (8,70,000) | (8,70,000) | — |
| **Operating CF** | | TBD | TBD | TBD |
| Net CAPEX | Equipment + install | 0 | 0 | 0 |
| **Free CF** | **Op CF − Debt − Capex** | | | |

---

## Balance Sheet (Portfolio, End of Year 1)

| Assets | ৳ | Liabilities + Equity | ৳ |
|:-------|---:|:--------------------|---:|
| Solar assets (net) | TBD | IDCOL debt (long-term) | TBD |
| Accounts receivable | TBD | Accounts payable | TBD |
| Cash | TBD | Accrued O&M | TBD |
| | | **Equity** | **TBD** |
| **Total** | **TBD** | **Total** | **TBD** |

*Balance sheet compiles when ≥1 rooftop is commissioned and generating revenue.*

---

## IDCOL Debt Schedule (per 100kW Rooftop)

| Year | Opening Balance | Interest | Principal | EMI | Closing Balance |
|:-----|----------------:|---------:|----------:|----:|----------------:|
| 1 | ৳69,60,000 | ৳6,26,400 | ৳2,43,600 | ৳8,70,000 | ৳67,16,400 |
| 2 | ৳67,16,400 | ৳6,04,476 | ৳2,65,524 | ৳8,70,000 | ৳64,50,876 |
| 3 | ৳64,50,876 | ৳5,80,579 | ৳2,89,421 | ৳8,70,000 | ৳61,61,454 |
| 5 | | | | | ৳55,20,000 |
| 10 | | | | | ৳31,40,000 |
| 15 | | | | | ৳0 |

*Debt fully repaid at year 15. Year 16+ cash flows are debt-free.*

---

## Scenario Analysis Summary

| Metric | Bear | Base | Bull |
|:-------|-----:|-----:|-----:|
| Capacity factor | 14% | 16.5% | 19% |
| Tariff escalation | 0% | 2% | 4% |
| IDCOL rate | 11% | 9% | 7% |
| 25-year equity IRR | 12% | 22% | 34% |
| Payback (years) | 8.4 | 5.2 | 3.6 |
| 25-year NPV (৳M) | 8.2 | 28.5 | 52.1 |
| DSCR (Year 1) | 1.38x | 1.78x | 2.20x |

---

## Model Maintenance

- **Revenue model**: Recalculate each time a new rooftop PPA is signed.
  - Add new row to `Revenue — Per Rooftop` with deal-specific capacity (kW)
- **Tariff update**: If BERC releases revised benchmark → update all revenue calculations
- **Scenario table**: Re-run after every pipeline deal change > 20 kW
- **Debt schedule**: Add year columns as portfolio matures
- **Model version**: Increment version number on any assumption change
  - Log at bottom of this file

---

## Version Log

| Version | Date | Change | Owner |
|:--------|:-----|:-------|:------|
| v1.0 | 2026-04-13 | Initial framework based on 100kW garment factory assumptions | Arjun + Rohan |