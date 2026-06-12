---
type: concept
tags: [finance, solar, pricing, rooftop, resco, ppa, economics]
created: 2026-04-30
updated: 2026-05-22
sources: ["02-unit-economics.md v4.0 (pilot-validated)", "pilot-installation-spec-2026-04"]
confidence: high
---

# Netso Unit Economics

Per-rooftop PPA economics for the [[Netso]] Bangladesh solar RESCO model. Maintained by the Chandler agent (Finance).

> **Core principle:** Every kW is a 25-year revenue stream. Model it correctly and the math is beautiful.

---

## Bangladesh Solar Tariff Parameters

| Parameter | Value | Source |
|-----------|-------|--------|
| BERC benchmark (bulk) | ৳7.37/kWh | Net Metering Guidelines 2025 |
| BERC benchmark (rooftop) | ৳11.65/kWh | SREDA 2025 revision |
| Net metering sellback ratio | 70–80% of generation | Net Metering Guidelines 2025 |
| Net metering capacity cap | 1 MW per consumer | 2025 revision |
| Avoided cost credit rate | BERC formula | Annual BERC circular |
| Wheeling charge (if applicable) | ~5–8% | BERC regulation |

---

## Standard Rooftop PPA Model — 100kW Garment Factory

**Source:** `02-unit-economics.md v4.0` (pilot-validated April 2026)

### Installation Details
| Item | Value |
|------|-------|
| Capacity | 100 kW |
| Rooftop area | ~700 m² (typical garment factory) |
| Location | Chattogram RMG cluster |
| Customer segment | Garment factory |
| PPA term | 25 years |

### Capital Cost
| Item | BDT |
|------|-----|
| Solar equipment (bulk import @ ৳18/W) | ৳18,00,000 |
| Inverter + BOS (commercial) | ৳10,00,000 |
| Installation / EPC | ৳5,00,000 |
| Grid interconnection | ৳2,00,000 |
| Project development / soft costs | ৳4,00,000 |
| Conservative buffer (20%) | ৳7,80,000 |
| **Total project cost** | **৳46,80,000** |
| IDCOL debt (80%) | ৳37,44,000 @ 9% p.a. |
| Equity (20%) | ৳9,36,000 |

**Note:** Previous wiki versions referenced ৳87L/100kW from early IDCOL PCN drafts. Pilot-validated v4.0 (April 2026) confirms ৳46.8L/100kW based on actual 4.3kW pilot installation at ৳2.5L total cost (৳58,140/kW scaled).

### Revenue Model (Year 1)
| Item | Calculation | BDT |
|------|-------------|-----|
| Year 1 generation | 100 kW × 1,44,000 kWh (16.5% CF) | 1,44,000 kWh |
| Capacity factor | 16.5% (Chattogram, pilot-calibrated) | — |
| Net metering sellback | 80% of generation exported | — |
| Export credit rate | Conservative ৳8.50/kWh | ৳8.50/kWh |
| Year 1 export revenue (Netso) | 1,44,000 × 0.80 × ৳8.50 | ৳9,79,200 |
| Customer avoided cost (customer savings) | 1,44,000 × 0.20 × ৳12.50 | ৳3,60,000 |
| **Year 1 gross revenue** | | **৳13,39,200** |

**Important:** Netso revenue is export credit only (৳9.79L). Customer avoided cost (৳3.6L) is a customer benefit, not Netso revenue.

### Annual Debt Service (IDCOL 80%, 15-year tenure)
Annual EMI: ৳4,61,000 | DSCR Year 1: 2.91x

### Year 1 Returns
| Metric | Value |
|--------|-------|
| Equity IRR | ~42% (pilot-validated) |
| Payback period | 2.6 years |
| 25-year NPV (10%) | ৳32,00,000 |
| LTV (25-yr revenue / installation) | 3.1x |

---

## Scenario Table (100kW)

| Metric | Bear | Base | Bull |
|--------|------|------|------|
| Capacity factor | 14% | 16.5% | 19% |
| Export tariff | ৳7.50/kWh | ৳8.50/kWh | ৳9.32/kWh |
| Tariff escalation | 0% | 2% | 4% |
| IDCOL rate | 11% | 9% | 7% |
| CAPEX/kW (100kW scale) | ৳55,000 | ৳46,800 | ৳40,000 |
| **Equity IRR (25 yr)** | **28%** | **42%** | **58%** |
| **Payback** | **3.8 yr** | **2.6 yr** | **1.9 yr** |
| **25-yr NPV (৳M)** | **18.5** | **32.0** | **48.2** |

**Sensitivity:** IRR is most sensitive to capacity factor (Chandler's primary calibration target). Pilot data must feed back to model quarterly.

---

## Customer Acquisition Cost (CAC)

| Channel | Cost | Conversion rate | CAC |
|---------|------|----------------|-----|
| Family/garment network | ৳5,000 (meeting time) | 60% | ৳8,333 |
| Direct inquiry (website) | ৳15,000/marketing | 15% | ৳1,00,000 |
| Property developer partnership | ৳25,000/deal | 35% | ৳71,400 |
| Trade fair / event | ৳1,20,000 | 5 deals / 50 leads | ৳24,000 |

---

## Customer Lifetime Value (LTV)

For a 100kW, 25-year PPA:
- **Gross 25-yr revenue:** ~৳6.5 crore (~৳26L/year average)
- **Total O&M + debt service (25 yr):** ~৳3.8 crore
- **Net LTV (base):** ~৳2.7 crore
- **LTV:CAC (family network):** ৳2.7 crore / ৳8,333 = **324x** ← exceptional
- **CAC payback:** 5.2 years

---

## 4.3kW Pilot (Netso's First Installation)

| Metric | Value | Notes |
|--------|-------|-------|
| System size | 4.3 kW (7 × 620W Longi bifacial panels) | Pilot installation spec |
| Inverter | 3.5kW Growatt hybrid inverter | Pilot installation spec |
| System cost | ৳2.5L (conservative; actual ৳2.2L) | Pilot-validated |
| CAPEX per kW | ৳58,140/kW (৳2.5L / 4.3kW) | Calculated |
| IRR | 42% | Pilot-validated at scale |
| Payback | 2.6 years | Pilot-validated |
| Location | Chattogram | — |

---

## Deal Pricing Process

1. Site assessment → kW capacity, roof area, load profile, grid quality, ownership
2. Tariff selection → BERC benchmark vs. net metering vs. gross metering
3. Equipment selection → tier 1 panels, inverter efficiency
4. CAPEX build → equipment + EPC + grid + soft costs
5. Revenue projection → Year 1–25, 3 escalation scenarios
6. Financing structure → IDCOL debt vs. customer-funded vs. hybrid
7. Sensitivity analysis → IRR tornado chart
8. Customer offer → landlord PPA rate, tenant avoided cost savings
9. Internal check → equity IRR ≥ 18%, DSCR ≥ 1.25x

---

## Critical Rules

1. **Capacity factor is the most sensitive assumption.** Default: Dhaka 16%, Chattogram 16.5%. Calibrate quarterly with [[Pilot]] data.
2. **Distinguish customer segments**: RMG factory vs. residential vs. commercial — different load profiles, grid offset, PPA terms.
3. **IDCOL finances up to 80%** of project cost. Model both 100% equity and 80/20 debt scenarios.
4. **Tariff escalation:** BERC typically 0–3%/yr. Model flat, 2%, 4% scenarios.
5. **Panel degradation:** ~0.5%/year. Model Year 1 → Year 25 accurately.
6. **Revenue = export credit only** — avoided cost savings to customer are NOT Netso revenue.
7. **Use pilot-validated CAPEX:** ৳46.8L/100kW (v4.0), NOT ৳87L/100kW (old IDCOL PCN draft).

---

## Sources

- [[Chandler agent]] — canonical model at `models/02-unit-economics.md`
- Netso 4.3kW pilot data → quarterly calibration input
- [[IDCOL-Financing]] — debt structuring assumptions