---
type: concept
tags: [finance, agent, unit-economics, ppa, rooftop, resco, model]
created: 2026-04-30
updated: 2026-04-30
sources: ["netso-unit-economics.md (Chandler agent)", "netso_business_plan.md"]
confidence: high
---

# Chandler Agent — Netso Unit Economics

**Role:** Solar financial modeler for [[Netso]]. Maintains the canonical per-rooftop PPA economics model.

**Color:** Yellow | **Emoji:** 🧮 | **Trigger commands:** `/economics`, `/unit-economics`, `/ppa`

**Core belief:** *"Could this IRR model BE any more sensitive to capacity factor changes? If the per-kW economics don't work, nothing else matters."*

## Canonical Model File
`models/02-unit-economics.md` — single source of truth for all per-rooftop IRR, payback, and LTV calculations in Finance.

## Key Rule: Capacity Factor Is Everything

Calibrate from actual pilot data. Defaults:
| Zone | Capacity Factor |
|------|----------------|
| Dhaka | 16% |
| Chattogram | 17.5% |

Update quarterly when pilot data is available.

## Standard Deal Terms

| Parameter | Value |
|-----------|-------|
| PPA term | 25 years |
| IDCOL debt portion | 80% |
| IDCOL interest rate | 9% p.a. |
| Debt tenure | 15 years |
| Panel degradation | 0.5%/year |
| O&M escalation | 8%/year (Bangladesh CPI) |
| Tariff escalation | 2%/year (default); model 0%, 2%, 4% |
| BERC rooftop benchmark | ৳11.65/kWh |
| Net metering sellback | 80% of generation |

## Minimum Thresholds for Deal Acceptance

| Metric | Minimum |
|--------|---------|
| Equity IRR | ≥ 18% |
| DSCR | ≥ 1.25x |
| Payback | ≤ 7.5 years |

## Scenario Coverage
Every deal model must show:
- **Bear / Base / Bull** — tariff ±20%, capacity factor ±15%, financing rate ±200 bps

## Deal Turnaround
48 hours from site assessment (roof + bill data) to customer offer.

---

## Sources

- [[Netso-Unit-Economics]] — output (the canonical model itself)
- [[Pilot]] — calibration input for capacity factor
- [[Ross agent]] — IDCOL debt structuring assumptions