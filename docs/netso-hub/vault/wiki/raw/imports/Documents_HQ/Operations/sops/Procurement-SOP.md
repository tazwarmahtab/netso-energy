# Netso Procurement Standard Operating Procedure

## Purpose

Govern how Netso sources equipment — from supplier identification through framework agreements, purchase orders, equipment staging, and warranty management. Every component that enters a Netso installation is covered here.

**Owner**: Procurement-Controller (`/procurement` skill)
**Aligns with**: SHIELD (contract review on framework agreements), Finance-Controller (budget approval for POs)

---

## Step 1: Approved Component Register

All equipment must come from this approved register before procurement. No substitutions without Procurement-Controller approval and ATLAS sign-off.

### Solar Panels

| Brand | Model | Capacity | SREDA Status | Preferred Use |
|-------|-------|----------|-------------|--------------|
| Jinko | JKM720N-66HL5-BDV | 720Wp | Verify on SREDA approved list (current SL# TBD) | Standard installations (primary) |
| Bluesun | BSM565M10-72HPH | 565Wp | SREDA SL#109 | Smaller systems, residential |
| *(Any other brand)* | — | — | Must be on SREDA approved list before use | Not authorized until verified |

**Panel notes**:
- N-type TOPCon panels (Jinko JKM720N) preferred over P-type PERC for lower degradation and better bifacial gain
- White rooftop coating (canopy systems): increases bifacial gain from 5% to 12–15% — include as upsell
- Minimum order quantity from Jinko distributor: confirm with supplier

### Inverters (CRITICAL: model-specific certification)

| Brand | Model | Capacity | SREDA Certification | Notes |
|-------|-------|----------|---------------------|-------|
| Sungrow | *(verify exact model)* | 3–100kW | IEC 62109-1/2, IEC 61727, IEC 62116 | Must verify specific model on SREDA list |
| Huawei | *(verify exact model)* | 3–100kW | Same as above | Must verify specific model on SREDA list |

**Critical rule**: SREDA approves **specific models**, not brands. A Sungrow inverter that is not on SREDA's approved list cannot be used in an NEM-registered installation. Procurement-Controller must verify the model number against the current SREDA E-Service Portal list every time.

### Balance of System (BOS)

| Component | Standard | Notes |
|-----------|---------|-------|
| Mounting | Hot-dip galvanized structural steel | Wind Zone II/III rated for Bangladesh |
| Cabling | PV1-F, UV-resistant, 4mm² or 6mm² | DC cable must be sunlight-resistant |
| Fuse/Combiner | DC fuse per string, MC4 connectors | Sized per inverter string current rating |
| Monitoring | Tigo RSS-120 or equivalent | Online monitoring portal, grid-tie approved |
| Earthing | TE DV/TN grounding system | Confirm with licensed electrical engineer |

---

## Step 2: Supplier Identification & Vetting

### Supplier Identification
- Jinko Bangladesh distributor: contact via Jinko Solar official website → authorized distributor list
- Bluesun: verify Bangladesh distributor or regional distributor
- Sungrow/Huawei: similar distributor verification
- For small orders (<10kW): check with local distributors in Elephant Road, Dhaka electronics market (verify trade license and SREDA certs)

### Supplier Vetting Checklist
Before any framework agreement is signed:

- [ ] Authorized distributor (not a grey market importer — require proof of authorization)
- [ ] Trade license verified (Bangladesh)
- [ ] SREDA certification copies for all equipment models supplied
- [ ] Minimum 2 years supplying solar equipment in Bangladesh
- [ ] At least 3 reference installations in Bangladesh
- [ ] Warranty support: minimum 10-year panel warranty, 5-year inverter warranty
- [ ] Lead time confirmed (Jinko: typically 4-8 weeks for full container; confirm)
- [ ] Stock availability for pilot batch (50kWp minimum)

---

## Step 3: Framework Agreement

**Owner**: SHIELD + Procurement-Controller
**Requires**: ATLAS sign-off for any agreement above BDT 50,000

### Framework Agreement Terms to Negotiate

| Term | Target | Why |
|------|--------|-----|
| Pricing lock period | 60–90 days from quote | Pricing expires — lock before committing |
| Minimum order quantity | 50kWp per batch | Volume discount, efficient shipping |
| Payment terms | 30% advance, 70% before dispatch | Protects against non-payment |
| Lead time guarantee | Maximum 8 weeks from PO | BPDB approval validity is 8 months |
| Warranty support | Direct from manufacturer (not via distributor) | Stronger claim process |
| Price adjustment clause | Fixed for 12 months, then CPI-linked | Protects both parties |

---

## Step 4: Purchase Order Issuance

**Trigger**: Onsite-Commander confirms installation date + RESCO-Navigator confirms NEM application is in progress + Finance-Controller confirms budget available
**Requires**: Finance-Controller budget verification (confirm within 5% of quote)

### PO Checklist
- [ ] System design finalized (kWp, panel count, inverter model)
- [ ] Budget confirmed by Finance-Controller
- [ ] Supplier framework agreement signed
- [ ] Latest supplier quote attached to PO
- [ ] AIT on panel imports verified as included in landed cost
- [ ] Lead time confirmed — schedule allows buffer before installation date
- [ ] Payment terms: 30% advance in PO terms, 70% before dispatch
- [ ] PO signed by ATLAS (any PO)
- [ ] PO signed by Taz (if >BDT 500,000)

---

## Step 5: Shipping, Customs & Delivery

**Owner**: Procurement-Controller (logistics)
**Collaborates with**: Finance-Controller (AIT payment)

### Import Process
1. Supplier dispatches — tracking number shared with Procurement-Controller
2. Air/sea freight booked (typically sea freight for full containers to Chattogram Port)
3. Customs clearance: C&F agent handles
4. **AIT (Advance Income Tax)**: Confirm with Finance-Controller — AIT on panel imports is applicable. This cost must have been included in the original budget quote. If not, escalate immediately.
5. Delivery to Netso warehouse or directly to site

**Delivery timeline to site**: 1 week after customs clearance

---

## Step 6: Equipment Staging & Handover

**Owner**: Procurement-Controller → Onsite-Commander (handover)
**Location**: Site or Netso warehouse

### Staging Checklist
- [ ] All panels inspected on delivery — no visible damage, correct wattage (720Wp / 565Wp)
- [ ] Inverter inspected — no shipping damage, correct model, accessories present
- [ ] BOS items complete: mounting hardware count, cable lengths verified, combiner box present
- [ ] Handover to Onsite-Commander: signed equipment checklist

---

## Step 7: Warranty Management

**Owner**: Procurement-Controller (ongoing)

- [ ] Register all equipment warranties on receipt (date, serial numbers, warranty period)
- [ ] 6-month proactive check: contact customer to confirm system is operating normally
- [ ] Annual review: flag any equipment showing degradation above 0.5%/year (potential warranty claim)
- [ ] O&M contract: customer signs annual O&M (৳5,000/system/year) — Procurement-Controller coordinates with SHIELD on contract terms
- [ ] Warranty claim process: customer contacts Netso → Procurement-Controller coordinates with supplier → claim filed within warranty period