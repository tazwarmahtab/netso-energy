# NETSO Module Intelligence & Solar Physics Database

**Source**: Shared by Tazwar Mahtab (2026-03-16)
**Status**: ✅ Complete - Ready for Engine Integration
**Critical Rule**: DO NOT spec modules without SREDA lab certification. Utility will reject net metering application.

---

## 1. SREDA Approved Module List (Key Brands)

**Total Approved**: 171 modules (crystalline silicon only)
**Thin-Film Status**: ZERO approvals for net metering

### Primary Recommendations (High Wattage)

| SL# | Brand | Model | Power (Wp) | Type | BSTI Ref# | Date | Status |
|-----|-------|-------|------------|------|-----------|------|--------|
| 171 | **Jinko Solar** | **JKM720N-66HL5-BDV** | **720** | Bifacial Dual-Glass | 351336 | 2025-12-14 | ✅ PRIMARY |
| 170 | Jinko Solar | JKM710N-66HL5-BDV | 710 | Bifacial Dual-Glass | 728222 | 2025-12-14 | ✅ Approved |
| 168 | Hanersun | HN21H-66HT720W | 720 | Bifacial | 3291 | 2025-09-18 | ✅ Approved |
| 162 | RISEN | RSM132-8-710BNDG | 710 | Bifacial | 25 | 2025-09-02 | ✅ Approved |
| 158 | Jinko Solar | JKM715N-66HL5-BDV | 715 | Bifacial Dual-Glass | 3252 | 2025-09-07 | ✅ Approved |
| 154 | Jinko Solar | JKM705N-66HL5-BDV | 705 | Bifacial Dual-Glass | 3011 | 2025-07-22 | ✅ Approved |
| 153 | Astronergy | CHSM66N(DG)/F-BH-695 | 695 | Bifacial | 2959 | 2025-07-21 | ✅ Approved |
| 141 | Trina Solar | TSM-710NEG21C.20 | 710 | Bifacial | 2792 | 2025-04-15 | ✅ Approved |
| 109 | **Bluesun** | **BSM565M10-72HPH** | **565** | Monofacial PERC | 2140 | 2024-11-06 | ✅ Budget |
| 163 | LONGi | LR7-72HGD-620M | 620 | Bifacial | 6 | 2025-10-19 | ✅ Approved |
| 152 | LONGi | LR8-66HGD-615M | 615 | Bifacial | 2964 | 2025-06-02 | ✅ Approved |
| 169 | Canadian Solar | CS6.2-610 | 610 | Monofacial | Various | - | ✅ Approved |

### Local Brands (Procurement Relationships)
- **Rahimafrooz Solar**: RAS-300W (300Wp)
- **Sunpro**: Various wattages
- **Tech Wise Solar**: Various wattages
- **Ipvisola**: 250-500Wp (small residential)

### ⚠️ NOT APPROVED (Do Not Use)
| Brand | Model | Power | Reason |
|-------|-------|-------|--------|
| Bluesun | BSM720G12-66HNH (HJT) | 720Wp | NOT on SREDA list yet |
| Any thin-film | All models | All | Zero thin-film approvals |

---

## 2. Bluesun BSM565M10-72HPH — Detailed Catalog Intelligence

**SREDA Status**: ✅ Approved (SL#109, BSTI Ref# 2140, 2024-11-06)

### Mechanical Specifications
| Parameter | Value |
|-----------|-------|
| **Model** | BSM565M10-72HPH |
| **Power** | 565Wp PERC Monofacial Half-Cell |
| **Dimensions** | 2278 × 1134 × 35 mm |
| **Cell Type** | Monocrystalline 182mm, 144 cells (6×24) |
| **Weight** | 28.6 kg (monofacial) / 31.8 kg (bifacial) |
| **Efficiency** | Up to 22.26% (BSM575M10-72HPH variant) |

### Performance Parameters
| Parameter | Value |
|-----------|-------|
| **Temperature Coeff (Pmax)** | -0.34%/°C (PERC) / -0.26%/°C (HJT better) |
| **Max System Voltage** | 1500V DC (IEC) |
| **Warranty** | 12-yr product, 25-yr performance (30-yr for Topcon Bifacial) |
| **Certifications** | ISO 9001, ISO 14001, ISO 45001, IEC TS 62941, IEC 61215, IEC 61730, UL 61730 |

### Bifacial Gain (Dhaka Context)
| Surface | Albedo | Expected Gain |
|---------|--------|---------------|
| Bare concrete (typical Dhaka rooftop) | 20-22% | 5-8% |
| White coated roof | 60-70% | 12-15% |

**Note**: Bluesun's 720W HJT (BSM720G12-66HNH) is **NOT** yet on SREDA list. Use Jinko 720W instead.

---

## 3. SREDA Inter-Row Spacing Calculator — Official Parameters

**Source**: SREDA E-Service Desk (prajukti.com.bd/sreda/inter-row)
**Counter**: #14530 | **Last Use**: 2025-12-22

### Official SREDA Defaults for Dhaka, Bangladesh
| Parameter | Value |
|-----------|-------|
| **Tilt Angle of Array** | 23° (optimal annual for Dhaka latitude ~23.7°N) |
| **Minimum Sun Elevation Angle** | 25.39° (worst-case, winter solstice, 9AM-3PM) |
| **Azimuth at Min Elevation** | 133.59° (NE-SE azimuth) |
| **Shade-Free Window** | 9:00 AM to 3:00 PM (6-hour generation window) |
| **Example Panel (default)** | 1740 × 1030 × 32mm, 360Wp (NOT our spec) |

### Inter-Row Spacing Formula (SREDA Methodology)
**For Jinko JKM720N-66HL5-BDV (2278mm × 1134mm at 23° tilt):**

| Step | Formula | Calculation | Result |
|------|---------|-------------|--------|
| **Shadow height (h)** | h = 0.032 + L × sin(tilt) | 0.032 + 2.278 × sin(23°) | **0.921 m** |
| **Min row spacing** | spacing = h / tan(min_elevation) | 0.921 / tan(25.39°) | **1.944 m** |
| **Panel footprint** | footprint = L × cos(tilt) | 2.278 × cos(23°) | **2.097 m** |
| **Row pitch** | pitch = footprint + spacing | 2.097 + 1.944 | **4.041 m** |
| **Usable area ratio** | ratio = footprint / pitch | 2.097 / 4.041 | **0.519 ≈ 52%** |

### ⚠️ CRITICAL CODE CORRECTION
**constants.py currently uses:**
- `USABLE_RATIO = 0.60` ❌ (flat assumption)
- `PANEL_WP = 400` ❌ (outdated)

**Must be updated to:**
- `USABLE_RATIO = 0.52` ✅ (dynamic SREDA formula)
- `PANEL_WP = 720` ✅ (Jinko JKM720N-66HL5-BDV)

---

## 4. Solar Radiation & Dhaka-Specific Data

### Solar Constants
| Metric | Value | Notes |
|--------|-------|-------|
| **Solar Constant** | 1367 W/m² | Extraterrestrial Solar Radiation |
| **Annual Variation** | ±3.3% | Negligible for production modeling |
| **Formula** | Ion = Isc × {1 + 0.033 × cos(360×d/365)} | - |

### Dhaka Solar Resource
| Metric | Value | Source |
|--------|-------|--------|
| **PVOUT (Peak Sun Hours)** | 4.5 kWh/kWp/day | Annual average |
| **SREDA Reference (Barguda)** | 3.808 kWh/kWp/day | SHS calculator |
| **Optimal Tilt** | 23° south-facing | Near-max annual yield |
| **Latitude** | ~23.7°N | Dhaka |

**Key Insight**: Optimal tilt does NOT uniquely depend on latitude — also influenced by GHI, DHI, DNI, microclimate, mounting azimuth, and horizon profile (per pvPlanner).

---

## 5. Albedo Intelligence for Bifacial Panels (Dhaka Rooftop)

**Source**: RatedPower Albedo Research (Sept 2025)

### Surface Albedo Values
| Surface Type | Albedo | Relevance for Netso |
|--------------|--------|---------------------|
| **Bare concrete** | 20-22% | PRIMARY: Most Netso prospects |
| White painted roof | 60-70% | Upsell opportunity |
| Gravel | 25-30% | Some commercial rooftops |
| Green roof | 25-30% | Rare in BD |
| Sand | 30-40% | Not applicable |

### Bifacial Gain Calculation (Dhaka Context)
| Scenario | Albedo | Bifacial Gain | Recommendation |
|----------|--------|---------------|----------------|
| Standard concrete roof | 20-22% | 5-8% | Default assumption |
| White coated roof | 60-70% | 12-15% | Premium upsell (৳15-20K, <4yr payback) |

### Upsell Opportunity: White Coating
| Metric | Standard (Gray) | White Coating | Gain |
|--------|-----------------|---------------|------|
| **Albedo** | 20-22% | 60-70% | +250% |
| **Bifacial Gain** | 5-8% | 12-15% | +7-10% absolute |
| **ROI Payback** | N/A | 3.5 years | <4 years |
| **Upsell Price** | - | ৳15-20K | High margin |

**Strategic Recommendation**: Offer white coating as premium upsell. Customer pays ৳15-20K, gains 12-15% production increase, <4 year payback. High-margin add-on with strong value proposition.

---

## 6. Engine Integration Checklist

### Required Updates to `constants.py`
```python
# PANEL SPECIFICATIONS (SREDA Approved)
PANEL_WP = 720  # Jinko JKM720N-66HL5-BDV (was 400)
PANEL_LENGTH = 2.278  # meters
PANEL_WIDTH = 1.134  # meters
PANEL_HEIGHT = 0.035  # meters (35mm frame)
PANEL_WEIGHT_KG = 38.5  # kg

# PERFORMANCE PARAMETERS
USABLE_RATIO = 0.52  # Dynamic SREDA formula (was 0.60)
BIFACIAL_GAIN = 1.05  # 5% gain on concrete (default)
PERFORMANCE_RATIO = 0.78  # System efficiency (losses)

# ORIENTATION
TILT_ANGLE = 23.0  # Bangladesh optimal (SREDA default)
AZIMUTH = 180.0  # True south

# CERTIFICATION
PANEL_CERTIFICATION = "BSTI Ref# 351336"
PANEL_STANDARD = "BDS IEC 61215 + IEC 61730"
SREDA_APPROVED = True

# SOLAR RESOURCE
DHAKA_PVOUT = 4.5  # kWh/kWp/day
DHAKA_ALBEDO_CONCRETE = 0.22  # 22% for bare concrete
```

### Functions to Implement
1. **SREDA spacing calculator**: `calculate_row_spacing(panel_length, tilt_angle, min_elevation)`
2. **Bifacial gain calculator**: `calculate_bifacial_gain(albedo, panel_bifaciality)`
3. **Module verifier**: `verify_module_sreda(brand, model, wattage)` → returns BSTI ref# if approved
4. **White coating ROI calculator**: `calculate_white_coating_roi(system_size_kw, albedo_before, albedo_after)`

---

## 7. Module Selection Guide

### When to Use Jinko 720Wp (Primary)
- ✅ Premium residential pergolas
- ✅ Commercial/industrial rooftops
- ✅ Maximum power density required
- ✅ Customer wants best-in-class
- ✅ Budget allows ৳110-120K/kWp

### When to Use Bluesun 565Wp (Budget)
- ✅ Price-sensitive residential
- ✅ Smaller rooftops (<10 kWp)
- ✅ Customer prioritizes cost over max output
- ✅ Budget segment ৳80-90K/kWp

### When to Use Local Brands (Rahimafrooz, etc.)
- ✅ Very small systems (<3 kWp)
- ✅ Customer insists on local procurement
- ✅ Replacement/maintenance scenarios
- ✅ Relationship-driven sales

---

## 8. Risk Mitigation

### Before Every Quote
- [ ] Verify module is on SREDA 171 approved list
- [ ] Confirm BSTI certification is current
- [ ] Check supplier has stock of approved model
- [ ] Document module choice in proposal with BSTI ref#

### Before Installation
- [ ] Re-verify module batch matches approved spec
- [ ] Collect BSTI certificate copies from supplier
- [ ] Photograph module nameplates (serial numbers)
- [ ] Archive all certification documents

### For Net Metering Application
- [ ] Include BSTI ref# in application
- [ ] Attach module certification copies
- [ ] Confirm inverter certifications (IEC 61727, IEC 62116)
- [ ] Double-check all docs before submission

---

**Last Updated**: 2026-03-16
**Next Review**: Before each supplier contract renewal
**Owner**: Tazwar Mahtab (Netso Founder)
