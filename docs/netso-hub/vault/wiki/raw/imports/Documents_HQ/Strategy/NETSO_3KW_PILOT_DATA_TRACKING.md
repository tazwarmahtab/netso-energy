# 3kW Pilot Program - Data Tracking Spreadsheet

## Overview
This spreadsheet tracks all performance metrics for Netso's 3kW pilot solar installation in Dhaka, Bangladesh.

**System Specifications:**
- **Capacity:** 3.0 kWp (4 × Jinko 720Wp panels = 2.88 kWp)
- **Location:** Dhaka, Bangladesh (23.8103° N, 90.4125° E)
- **Tilt:** 23° (optimal for Bangladesh)
- **Azimuth:** 180° (True South)
- **Inverter:** 3kW single-phase grid-tie
- **Commissioning Date:** [TO BE FILLED]
- **Customer:** [TO BE FILLED]

---

## Sheet 1: Daily Performance Log (Template)

| Date | Day | Generation (kWh) | Consumption (kWh) | Export to Grid (kWh) | Import from Grid (kWh) | Self-Consumption (kWh) | Self-Consumption Rate (%) | Solar Fraction (%) | Weather | Notes |
|------|-----|------------------|-------------------|---------------------|----------------------|----------------------|--------------------------|-------------------|---------|-------|
| [DATE] | [DAY] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [CALC] | [CALC] | [CALC] | [INPUT] | [INPUT] |

### Key Formulas:
- **Self-Consumption** = Generation - Export
- **Self-Consumption Rate** = (Self-Consumption / Generation) × 100
- **Solar Fraction** = Generation / (Generation + Import) × 100

---

## Sheet 2: Sample Data (First Week)

| Date | Day | Generation (kWh) | Consumption (kWh) | Export (kWh) | Import (kWh) | Self-Consumption (kWh) | Self-Consumption Rate | Solar Fraction | Weather |
|------|-----|------------------|-------------------|-------------|-------------|----------------------|--------------------|---------------|---------|
| 2026-03-17 | Tue | 12.5 | 18.2 | 8.1 | 13.8 | 4.4 | 35.2% | 68.1% | Sunny |
| 2026-03-18 | Wed | 13.1 | 17.8 | 8.9 | 13.6 | 4.2 | 32.1% | 73.6% | Sunny |
| 2026-03-19 | Thu | 11.8 | 19.5 | 6.2 | 13.9 | 5.6 | 47.5% | 60.5% | Partly Cloudy |
| 2026-03-20 | Fri | 12.9 | 18.0 | 8.5 | 13.6 | 4.4 | 34.1% | 71.7% | Sunny |
| 2026-03-21 | Sat | 10.2 | 22.5 | 3.1 | 15.4 | 7.1 | 69.6% | 45.3% | Rainy |
| 2026-03-22 | Sun | 13.4 | 16.8 | 9.2 | 12.6 | 4.2 | 31.3% | 79.8% | Sunny |
| 2026-03-23 | Mon | 12.7 | 19.0 | 7.8 | 14.1 | 4.9 | 38.6% | 66.8% | Sunny |
| **Weekly Avg** | | **12.4** | **18.8** | **7.5** | **13.9** | **5.0** | **40.0%** | **65.7%** | |

---

## Sheet 3: Hourly Profile (Sample Day - Clear Sky)

| Hour | Generation (kW) | Consumption (kW) | Export (kW) | Import (kW) | Cost Savings (৳) | Export Revenue (৳) |
|------|-----------------|-----------------|-------------|-------------|-----------------|------------------|
| 06:00 | 0.00 | 0.5 | 0.00 | 0.50 | 0.00 | 0.00 |
| 07:00 | 0.15 | 1.2 | 0.00 | 1.05 | 1.54 | 0.00 |
| 08:00 | 0.85 | 1.8 | 0.00 | 0.95 | 8.76 | 0.00 |
| 09:00 | 1.65 | 1.5 | 0.15 | 0.00 | 15.45 | 0.83 |
| 10:00 | 2.35 | 1.2 | 1.15 | 0.00 | 24.21 | 6.33 |
| 11:00 | 2.75 | 1.0 | 1.75 | 0.00 | 28.33 | 9.63 |
| 12:00 | 2.90 | 1.3 | 1.60 | 0.00 | 29.87 | 8.80 |
| 13:00 | 2.85 | 1.5 | 1.35 | 0.00 | 29.36 | 7.43 |
| 14:00 | 2.70 | 1.8 | 0.90 | 0.00 | 27.81 | 4.95 |
| 15:00 | 2.35 | 2.2 | 0.15 | 0.00 | 24.21 | 0.83 |
| 16:00 | 1.75 | 2.5 | 0.00 | 0.75 | 18.03 | 0.00 |
| 17:00 | 0.95 | 2.8 | 0.00 | 1.85 | 9.79 | 0.00 |
| 18:00 | 0.25 | 3.2 | 0.00 | 2.95 | 2.58 | 0.00 |
| **Daily Total** | **12.4** | **18.8** | **7.5** | **9.7** | **151.94** | **38.80** |

**Assumptions:**
- Grid Price: ৳10.30/kWh (LT-E commercial)
- Export Price: ৳5.50/kWh (DESCO bulk rate)

---

## Sheet 4: Monthly Summary

| Month | Generation (kWh) | Export (kWh) | Import (kWh) | Self-Consumption Rate | Cost Savings (৳) | Export Revenue (৳) | Net Savings (৳) | CO2 Offset (kg) |
|-------|-----------------|-------------|-------------|--------------------|--------------|------------------|---------------|---------------|
| March 2026 | 86.6 | 52.8 | 97.0 | 40.0% | 1,054 | 290 | 1,344 | 52.0 |
| April 2026 | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] |
| May 2026 | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] | [AUTO] |
| **Quarter Total** | **[SUM]** | **[SUM]** | **[SUM]** | **[AVG]** | **[SUM]** | **[SUM]** | **[SUM]** | **[SUM]** |

---

## CSV Export Format

```csv
date,generation_kwh,consumption_kwh,export_kwh,import_kwh,weather,temp_c,humidity
2026-03-17,12.5,18.2,8.1,13.8,Sunny,28.5,65
2026-03-18,13.1,17.8,8.9,13.6,Sunny,29.1,62
2026-03-19,11.8,19.5,6.2,13.9,Partly Cloudy,27.8,70
```

---

## Google Sheets Setup Instructions

1. **Create New Google Sheet**: https://sheets.new
2. **Name it**: "Netso 3kW Pilot - Data Tracking"
3. **Create 7 sheets**:
   - Daily_Log
   - Hourly_Profile
   - Monthly_Summary
   - Weather_Data
   - Alerts_Log
   - Financials
   - Maintenance

4. **Copy templates** from this document into respective sheets
5. **Set up formulas** as described
6. **Share** with pilot customer and Netso team

---

**Created**: 2026-03-16  
**Owner**: Netso Operations Team  
**Status**: Ready for deployment
