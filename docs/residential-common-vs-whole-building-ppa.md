# Residential Rooftop Solar PPA: Common-Service vs. Whole-Building Models

> **Status:** Modeled & Verified ✅ | **Date:** 2026-08-26 | **Context:** Netso Energy Residential Platform
>
> Evaluates the two architectural and financial pathways for deploying Netso Energy's **Solar Pergola**
> on multi-story residential apartment buildings in Bangladesh (e.g., standard 6-story building with 10–14 flats on a 5-katha plot).

---

## 1. Executive Summary

Deploying distributed rooftop solar on multi-tenant apartment buildings in Bangladesh faces a structural hurdle: individual flats have separate utility retail meters (DESCO/DPDC/BPDB), while common infrastructure (elevators, water pumps, stairwell lighting) runs on a dedicated **common-service meter**.

We analyze two commercial models and evaluate an innovative **Private Master-Metering / Behind-the-Meter (BTM) Aggregation** architecture that bypasses government bi-directional net meter waiting periods.

---

## 2. Structural Architecture & Metering Comparison

```
MODEL 1: COMMON-SERVICE METER (6 kWp)        MODEL 2: WHOLE-BUILDING PPA (20 kWp)

       ┌──────────────────┐                         ┌──────────────────┐
       │   Solar Pergola  │                         │   Solar Pergola  │
       │     (6.0 kWp)    │                         │    (20.0 kWp)    │
       └────────┬─────────┘                         └────────┬─────────┘
                │ Solar AC                                   │ Solar AC
                ▼                                            ▼
       ┌──────────────────┐                         ┌──────────────────┐
       │ Net-Metered Grid │                         │ Private BTM Sub- │
       │  Service Panel   │                         │ Meter Aggregator │
       └────────┬─────────┘                         └────────┬─────────┘
                │                                            │
                ▼                                   ┌────────┴─────────┐
     ┌──────────────────────┐                       ▼                  ▼
     │ Single Dedicated     │              ┌─────────────────┐ ┌────────────────┐
     │ Common-Service Meter │              │ Common Services │ │ Flat Submeters │
     │ (Lift, Water Pump,   │              │ (3–7 kW load)   │ │ (10–14 flats)  │
     │ Hallway, Intercom)   │              └─────────────────┘ └────────────────┘
     └──────────────────────┘               Single building HOA PPA billing engine
      Off-taker: Building HOA                Off-taker: Master HOA + Tenant Ledger
```

| Dimension | Model 1: Common-Service Meter | Model 2: Whole-Building Architecture |
|---|---|---|
| **System Sizing** | **6.0 kWp** (matches daytime pump/lift load) | **20.0 kWp** (covers full building daytime peak) |
| **Grid Metering** | **1 bi-directional meter** (Common utility meter) | **1 master meter** OR **Private Sub-Meter Ledger** |
| **Off-taker Decision** | Building Management Committee / HOA | Unanimous HOA + All Individual Owners |
| **Daytime Self-Consumption** | **~90%** (water pumping runs during peak sun) | **~75–80%** (intermittent apartment AC loads) |
| **Legal/Contractual Friction**| **Low** (1 single PPA contract with HOA) | **High** (multi-party sub-meter billing liability) |

---

## 3. Tariff Arbitrage & Savings Mechanics

In Bangladesh, residential multi-story buildings operate under two distinct tariff regimes:
1. **Common Service Meters:** Often billed at **Commercial LT-E** (BDT 10.30–15.36/kWh) or high-tier residential slabs for large pumping motors.
2. **Individual Flats (LT-A):** Progressive slabs (0–300 units = BDT 5.26–9.10/kWh; 401+ units = BDT 15.01–17.35/kWh).

| Metric | Model 1: Common Service (6 kWp) | Model 2A: Whole Building (20 kWp - Blended) | Model 2B: Whole Building (20 kWp - 400+ Units) |
|---|---|---|---|
| **Displaced Grid Tariff** | **BDT 14.50/kWh** (Common pump/lift rate) | **BDT 12.50/kWh** (Blended residential) | **BDT 15.01/kWh** (Upper tier slab) |
| **Netso PPA Base Rate** | **BDT 10.00/kWh** | **BDT 10.00/kWh** | **BDT 10.00/kWh** |
| **Net Metering Export Rate** | BDT 6.4523/kWh | BDT 6.4523/kWh | BDT 6.4523/kWh |
| **Export Share** | 10% | 25% | 20% |
| **Client Year 1 Savings** | **BDT 29,716/yr** | **BDT 26,486/yr** | **BDT 88,417/yr** |
| **Client Savings Margin** | **31.0%** vs displaced utility rate | **20.0%** vs displaced utility rate | **33.4%** vs displaced utility rate |

---

## 4. Financial & Unit Economic Comparison (IDCOL 80/20 at 6%, 10-Yr Tenor)

*Simulation parameters: Dhaka solar insolation ($1,445.4\text{ kWh/kWp/yr}$), $0.5\%\text{ p.a.}$ degradation, $3\%$ triennial PPA escalation, escalating OPEX ($\text{BDT } 1,200\text{/kWp}$ base).*

| Financial Metric | Model 1: Common Service (6 kWp) | Model 2: Whole Building (20 kWp) | Delta / Rationale |
|---|---|---|---|
| **Turnkey CAPEX** | **BDT 420,000** (BDT 70k/kWp) | **BDT 1,200,000** (BDT 60k/kWp) | Scale economies on BOS/inverters |
| **Equity Required (20%)** | **BDT 84,000** (~$672) | **BDT 240,000** (~$1,920) | Low equity burden for developer |
| **IDCOL Debt (80%)** | BDT 336,000 | BDT 960,000 | 6.0% fixed interest |
| **Annual Debt Service** | BDT 45,652/yr | BDT 130,433/yr | 10-year levelized annuity |
| **Year 1 Gross Revenue** | BDT 80,417/yr | BDT 268,056/yr | Delivered generation × BDT 10.00 |
| **Year 1 EBITDA** | BDT 73,217/yr | BDT 244,056/yr | After BDT 1,200/kWp OPEX |
| **Year 1 FCFE** | **BDT 27,565/yr** | **BDT 113,623/yr** | EBITDA less debt service |
| **Year 1 DSCR** | **1.60×** | **1.87×** | Both exceed 1.25× bankability hurdle |
| **Equity Payback Period** | **3.1 years** | **2.1 years** | Rapid recovery of developer equity |
| **Project Payback Period** | **5.8 years** | **4.9 years** | Full asset cost recovery |
| **20-Year Equity IRR** | **35.2%** | **48.1%** | High leverage return profile |
| **20-Year Lifetime Revenue** | **BDT 1,669,020** (3.97× CAPEX) | **BDT 5,563,399** (4.64× CAPEX) | Compounding annuity asset |
| **10-Year Cumulative FCFE** | BDT 277,540 | BDT 1,142,523 | Strong decade-1 liquidity |

---

## 5. Private Metering & Behind-the-Meter (BTM) Aggregation

### The Concept
Can Netso install solar on an apartment building without waiting for a government bi-directional net meter?

**Yes, via Behind-the-Meter (BTM) Solar Sub-Metering.**

```
                               ┌─────────────────────────────┐
                               │  Utility Grid (DESCO/DPDC)  │
                               └──────────────┬──────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐
         │ Flat 1-10 Retail Meters │                     │  Common Service Meter   │
         │  (Utility Postpaid/Pre) │                     │ (Utility Postpaid/Pre)  │
         └────────────┬────────────┘                     └────────────┬────────────┘
                      │                                               │
══════════════════════╪═══════════════════════════════════════════════╪═══════════════════════
  NETSO BTM BOUNDARY  │                                               │
                      ▼                                               ▼
         ┌─────────────────────────┐                     ┌─────────────────────────┐
         │ Netso Smart Submeters   │                     │ Netso Dedicated Gen     │
         │ (Tracks flat-level draw)│                     │ & Load Bi-Dir Meter     │
         └────────────┬────────────┘                     └────────────┬────────────┘
                      │                                               │
                      └───────────────────────┬───────────────────────┘
                                              │
                                              ▼
                               ┌─────────────────────────────┐
                               │  Netso Solar Pergola Array  │
                               │  + Zero-Export Controller   │
                               └─────────────────────────────┘
```

### How It Works in Practice

1. **Dedicated Solar Generation Meter (Netso Owned):**
   * Installed at the inverter AC output. It measures 100% of the solar kWh generated by the Solar Pergola.
   * IoT-connected (GSM/WiFi) for real-time tamper-proof generation logging.

2. **Common Service Injection (Zero Grid Export):**
   * The solar power is fed directly into the building's **common service distribution panel** (powering water pumps, elevators, lobby lighting).
   * A **Smart Power Sensor / Reverse Power Relay (Zero-Export Controller)** ensures solar generation never feeds back into the utility grid if a bi-directional meter is not yet installed.
   * Solar generation offsets the building's most expensive utility units in real time.

3. **Virtual / Sub-Metered Billing to the HOA:**
   * **Generation Billing:** Netso bills the building HOA:
     $$\text{Monthly Netso Bill} = \text{Solar Meter kWh Generated} \times \text{BDT } 10.00$$
   * **HOA Savings:** The HOA sees its common utility bill drop by:
     $$\text{Utility Savings} = \text{Solar Meter kWh} \times \text{BDT } 14.50\text{ (Grid Rate)}$$
   * **Net Benefit to HOA:** BDT 4.50/kWh in immediate cash savings on common service charges, with zero government approvals required to begin operation.

### Legal and Technical Feasibility in Bangladesh

| Factor | Status | Assessment |
|---|---|---|
| **Grid Tamper Legality** | **Safe** | Operating behind the customer meter with a zero-export limiter does not violate BERC or distribution utility rules. |
| **Revenue Collection** | **Clean** | Netso bills one legal entity (the Building Management Committee) based on the dedicated solar meter reading. |
| **Fast Deployment** | **Immediate** | Eliminates the 2–6 month SREDA/utility net-metering inspection waiting period. System begins earning revenue from Day 1 of commissioning. |
| **Future Net-Metering Upgrade** | **Plug & Play** | When the utility eventually installs the bi-directional net meter, simply disable the zero-export limiter to monetize weekend/holiday surplus via SREDA net-metering credits. |

---

## 6. Strategic Recommendation

1. **Lead with Model 1 (Common Service Meter, 6 kWp) using Netso BTM Metering:**
   * Single decision-maker (HOA Committee).
   * Zero government approval dependency to start generating revenue.
   * 31% customer savings margin vs. common utility tariff.
   * Equity payback in **3.1 years**, Equity IRR of **35.2%**.

2. **Scale to Model 2 (Whole Building, 20 kWp) once HOA relationship is established:**
   * Upsell full rooftop coverage to offset individual flat consumption via virtual ledger or full utility net metering.
