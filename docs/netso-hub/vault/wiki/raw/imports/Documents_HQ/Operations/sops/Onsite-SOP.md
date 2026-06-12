# Netso Installation Standard Operating Procedure

## Purpose

This SOP governs the complete installation lifecycle — from first site visit through commissioning and handover. No installation proceeds to mobilization without this process being followed.

**Owner**: Onsite-Commander (`/onsite` skill)
**Escalates to**: ATLAS for any safety concern, budget overrun >5%, or schedule slip >3 days

---

## Pre-Installation Prerequisites (All Required)

Before any crew mobilizes to a site, all of the following must be confirmed:

1. **RESCO Registration** — NEM approval from BPDB secured or confirmed in progress
2. **Customer EPC Contract** — Signed by all parties
3. **25-year PPA** — Signed by all parties
4. **Structural Inspection** — 15-point checklist completed and passed (see below)
5. **Procurement Clearance** — All equipment confirmed, certified, and staged at site or en route
6. **Subcontractor Vetting** — Contractor passes every vetting checklist item
7. **Grid Interconnection Point** — Confirmed with BPDB/local DESCO/DPDC office

**Gate**: If any prerequisite is not confirmed, Onsite-Commander must escalate to ATLAS. No exceptions.

---

## Step 1: Site Qualification Visit

**When**: Before a prospect becomes a Pipeline site
**Owner**: RESCO-Navigator + Outreach-Coordinator

Initial feasibility assessment (not the full 15-point inspection — this is a quick pass/fail):

- [ ] Roof area measured (minimum 800 sqm for 50kW+ system)
- [ ] Shadow analysis at solar noon (no significant shading from adjacent buildings, cranes, water tanks)
- [ ] Electrical room visible from roof — grid entry point identified
- [ ] Structural age and type confirmed ( RCC, metal deck, or asbestos — asbestos requires special handling)
- [ ] Owner confirmed as rooftop owner (not a tenant or shared ownership)
- [ ] Access route confirmed (can panels be transported to roof without crane?)

**Output**: Site qualification memo (half page) — GO or NO-GO. NO-GO sites are removed from pipeline; GO sites enter the Installation Tracker.

---

## Step 2: 15-Point Rooftop Structural Inspection

**When**: After site qualifies, before design finalization
**Owner**: Onsite-Commander (with licensed structural engineer for items 1, 5)
**Output**: Completed inspection report with photo evidence for each point

### Inspection Checklist

For each point below: examine, photograph (minimum 2 angles), write PASS/FAIL with notes.

| # | Checkpoint | What to Look For | Bangladesh Context |
|---|-----------|-----------------|-------------------|
| 1 | Load-bearing capacity | RCC slab thickness, reinforcement visible at edge | Old Dhaka buildings: verify no carbonation cracking |
| 2 | Waterproofing integrity | Cracks, ponding areas, previous repair patches | Monsoon drainage — every low spot will pond |
| 3 | Parapet wall condition | Height (min 1.1m), cracks, integrity | Cyclone risk — parapet must be structurally sound |
| 4 | Safe access route | Ladder or stair condition, clearance, handrails | Ladder must be fixed or secured, min 600mm wide |
| 5 | Wind load assessment | Building height, exposure, wind zone | Dhaka is Wind Zone II–III — confirm structural calc |
| 6 | Roof drainage adequacy | Gulley locations, fall direction, blocked drains | Monsoon: drainage must handle 200mm+ rain events |
| 7 | Electrical room proximity | Distance from roof, cable route, switchgear space | Panel must be within 10m of grid interconnection point |
| 8 | Shadow analysis | Adjacent buildings, cranes, water tanks, future construction | Use a solar pathfinder or Sunseeker app at solar noon |
| 9 | Module transport path | Width of doorways/stairs, turning radii | 2m × 2m panels require planning every turn |
| 10 | Emergency exit clearance | Clear path from roof to building exit | BREB requirement — cannot be blocked by panels |
| 11 | Fire safety compliance | Fire extinguisher access, no combustible materials stored | Solar panels are Class A fire rated — confirm no Class C nearby |
| 12 | Lightning protection compatibility | Existing LPS or need for new installation | Add to BOM if not present — SREDA requirement |
| 13 | Roof age and material | Year built, last inspection, material (RCC, metal deck) | Buildings >25 years: require structural load test |
| 14 | Previous repair history | Leak records, structural repairs, water ingress | Check with building superintendent or owner |
| 15 | Owner maintenance commitment | Signed acknowledgment of annual inspection duty | Owner must commit to panel cleaning and annual check |

**Overall verdict**: A single FAIL on items 1, 2, 5, or 8 (structural, waterproofing, wind, shadow) is a **hard stop**. Other items require mitigation plan.

---

## Step 3: Installation Design

**Owner**: Procurement-Controller coordinates with Onsite-Commander

Based on the structural inspection:
- [ ] Panel layout finalized (avoid shadow-critical zones identified in #8)
- [ ] Mounting type selected (ground-fixed, ballasted, penetrating — penetrating requires waterproofing plan)
- [ ] Inverter location confirmed (shaded, ventilated, within cable length)
- [ ] Cable route quantified (add to BOM if >50m from array to inverter)
- [ ] Monitoring system specified and ordered (Tigo RSS-120 or equivalent)
- [ ] Structural engineering sign-off obtained for mounting design

---

## Step 4: Mobilization & Installation

**Owner**: Onsite-Commander (site presence check-ins)
**Contractor**: Pre-vetted subcontractor

### Mobilization Checklist
- [ ] Subcontractor received site induction (this SOP is the basis)
- [ ] Equipment delivered and inventoried on site (panels, inverters, mounting, BOS)
- [ ] Site security confirmed (no access to public)
- [ ] Safety equipment on site (harnesses, hard hats, fire extinguisher)
- [ ] Toolbox talk completed (record: date, crew, topics covered)

### Milestone Sign-offs

Each milestone requires a photo + sign-off by Onsite-Commander:

| Milestone | Sign-off | What to Verify |
|-----------|---------|---------------|
| Structural steel complete | Photo + completion cert | Alignment, wind zone calculation, bolting |
| Panels mounted | Photo | Panel orientation, tilt, no shading, no damage |
| Electrical complete | Licensed electrician cert | String voltages, earth resistance, isolation |
| System inspection | Inspection report | All checklist items re-verified post-installation |

---

## Step 5: Commissioning

**Owner**: Onsite-Commander + licensed electrical engineer
**Requirement**: BPDB-approved grid interconnection has been confirmed

### Commissioning Tests
1. Inverter turn-on sequence (per manufacturer procedure)
2. Grid synchronization (no islanding — IEC 62116 test result)
3. Production test: 30-minute generation log (minimum 3kW for 3kWp system)
4. Monitoring system live (online portal shows generation in real time)
5. Export metering reading confirmed (Net Metering credits flowing)
6. Customer walkthrough of monitoring system and maintenance basics

### Commissioning Handover Pack

Onsite-Commander delivers to Outreach-Coordinator + Finance-Controller:
- [ ] Commissioning certificate (date, system size, customer, location)
- [ ] Equipment serial numbers logged
- [ ] As-built drawings (panel layout, cable routes, inverter location)
- [ ] Monitoring system credentials (delivered to customer)
- [ ] O&M contact card (emergency contact, warranty period, annual service date)
- [ ] System photo (aerial or rooftop — for proof pack)

---

## Post-Commissioning

- [ ] Onsite-Commander notifies **Pilot-Analyst** — system enters performance monitoring
- [ ] Finance-Controller issues invoice for final 20% milestone (upon commissioning sign-off)
- [ ] Outreach-Coordinator sends customer thank-you and requests testimonial for proof pack
- [ ] RESCO-Navigator updates NEM registration status (system commissioned — NEM agreement active)
- [ ] Execution-Tracker updates Installation-Tracker: COMMISSIONED → OPERATIONAL