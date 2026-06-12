# Netso Pilot Operations Standard Operating Procedure

## Purpose

Govern how the 3kW pilot system (and subsequent systems) are monitored, reported on, and used as a proof asset for customer proposals and investor conversations.

**Owner**: Pilot-Analyst (`/pilot` skill)
**Collaborates with**: Onsite-Commander (commissioning), Finance-Controller (savings validation)
**Frequency**: Monthly review minimum; quarterly proof pack update

---

## Pilot System Baseline

| Parameter | Value | Source |
|-----------|-------|--------|
| Location | Father's building, Dhaka | Taz to confirm exact address |
| System size | 3.0 kWp (verify: 3.5 kWp?) | Commissioning record |
| Panel | Jinko JKM720N-66HL5-BDV | Commissioning record |
| Inverter | Sungrow/Huawei (verify model) | Commissioning record |
| Commissioning date | Taz to provide | Commissioning certificate |
| Orientation | Taz to provide | Design drawing |
| Monthly generation target | ~420 kWh/month (3kWp × 140h Dhaka avg) | Theoretical |
| Annual generation target | ~5,040 kWh/year | Theoretical |
| System cost | BDT 240,000–345,000 (3kW × 80K–115K/kWp) | Finance-Controller |

---

## Monthly Data Collection

Pilot-Analyst collects the following from monitoring system (Tigo RSS-120 or equivalent) on the 1st of every month:

### Generation Data
- **Total monthly generation** (kWh) — from monitoring portal
- **Daily generation log** (optional: for weather correlation)
- **Peak generation day** and **lowest generation day** (month context)

### Performance Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **Capacity Factor** | (Monthly kWh) ÷ (kWp × 730h) | ≥18% |
| **Specific Yield** | Annual kWh ÷ kWp | ≥1,400 kWh/kWp/year |
| **Performance Ratio (PR)** | (Actual kWh ÷ theoretical kWh at plane-of-array) | ≥75% |
| **System Availability** | (Total hours − downtime) ÷ total hours | ≥99% |

### Financial Performance

- **Monthly savings (BDT)**: Actual kWh exported × BDT 10.30/kWh
- **vs. theoretical savings**: Compare actual to model's Year 1 projection
- **Year-to-date cumulative savings**: Running total in BDT

### Weather Context
- Average daytime temperature (Dhaka, monthly)
- Number of cloudy/rainy days (Bangladesh Meteorological Department)
- Any extreme weather event (heat wave, storm) affecting generation

---

## Quarterly Proof Pack Update

Every quarter (March, June, September, December), Pilot-Analyst produces an updated proof pack:

### Banker's Box — 5 Items (per commissioned system)

1. **System photo**: Aerial or rooftop photo — before/during/after installation
2. **Commissioning certificate**: Date, customer name (if applicable), kWp, location
3. **30-day generation summary**: Month-by-month data table, 3 key metrics highlighted
4. **Savings calculation**: Actual month 1 savings × 12 = Year 1 projection; extrapolate to 25 years (with BERC escalation assumptions clearly stated)
5. **Customer testimonial** (if obtainable): WhatsApp voice note, email, or written — even 3 sentences of endorsement is powerful

### Proof Pack Delivery
- File to: `Operations/tasks/Pilot-Bankers-Box.md`
- Available to: Outreach-Coordinator (proposal use), Finance-Controller (investor use), CANVAS (NETSO.ini — pitch deck)
- Not shared externally without ATLAS review

---

## Annual System Review

At the end of each year of operation:

### Performance Review
- [ ] Year 1 specific yield vs. target (≥1,400 kWh/kWp/year)
- [ ] Identify underperforming months — cause: weather, shading (new construction?), equipment fault?
- [ ] Degradation check: Year N generation vs. Year 1 (should be within 0.5% degradation per year; flag if >1%)
- [ ] Update 25-year financial model with actual Year 1 performance data

### Warranty Checkpoint
- [ ] All equipment under warranty (standard: panels 10–25 years, inverters 5–10 years)
- [ ] No warranty claims filed in Year 1 (if fault occurred, was it resolved?)
- [ ] Annual panel cleaning and inspection conducted (customer O&M responsibility — confirm done)

### System Diary
Pilot-Analyst maintains `Operations/tasks/Pilot-System-Diary.md` — a chronological log of:
- Every maintenance event (cleaning, repair, inverter restart)
- Every fault or alert from monitoring system
- Any complaints from customer
- Weather extremes and their impact

---

## Alert Protocol

Pilot-Analyst immediately notifies ATLAS + Onsite-Commander (and files to Execution-Tracker) when:

| Alert | Threshold | Action |
|-------|-----------|--------|
| **Generation drop** | >20% below theoretical for 2 consecutive months | Onsite-Commander dispatches contractor to inspect |
| **System offline** | No generation data for >48 hours | Onsite-Commander dispatches immediately |
| **Inverter fault** | Any fault code on monitoring system | Onsite-Commander + Procurement-Controller alerted (warranty check) |
| **Customer complaint** | Customer reports issue (no generation, billing discrepancy) | Onsite-Commander responds within 24 hours |
| **Performance degradation** | Annual generation below 97% of expected (Year N degradation) | Flag to Procurement-Controller — assess warranty claim |

---

## Pilot Data for Customer Proposals

When Outreach-Coordinator needs pilot data for an OPEX proposal, Pilot-Analyst provides:

- [ ] 1-paragraph system performance summary for the [current year] period
- [ ] 1 key metric: "Our 3kW pilot has operated at [X]% capacity factor, generating [Y] kWh/year — consistent with our Year 1 financial model"
- [ ] Photo (with caption) of the pilot system — for proposals only, not published online without customer consent
- [ ] Monthly generation trend chart — available from monitoring portal export (CSV)
- [ ] BERC savings translation: (pilot kWh exported) × BDT 10.30/kWh = monthly savings proof

**Important**: Pilot data is a credible proxy. All customer proposals should clearly state that the performance of the specific customer's system will vary based on location, roof orientation, and load profile. Pilot data demonstrates Netso's model accuracy — it is not a guarantee of identical performance.