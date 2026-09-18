# Netso Energy Web Platform — Development Guidelines

This repository is the official customer-facing web platform, solar calculator, and funnel for **Netso Energy Ltd**.

---

## 1. Stack & Tooling
* **Framework**: Vite + React 18 + TypeScript + Tailwind CSS
* **Animation**: Framer Motion + GSAP
* **Backend / Database**: Supabase
* **Package Manager**: `bun` (preferred) or `pnpm`
  * Dev: `bun run dev`
  * Test: `bun test`
  * Build: `bun run build`

---

## 2. Solar Engine & Economic Constants
All calculations in the funnel and assessment tools MUST align with canonical TAZ-OS constants:
* **Bulk Tariff Baseline**: **BDT 8.39/kWh** (BERC June 2026 bulk supply tariff).
* **CAPEX Basis**: **BDT 60,000 / kWp** installed turnkey.
* **Customer Upfront CAPEX**: **BDT 0** for Commercial & Industrial PPA models.
* **Dual Revenue Split (Beth Doctrine)**:
  * Behind-the-meter consumption: customer PPA rate.
  * Monthly Net Metering (NEM 2025): 90% crediting against applicable bulk supply tariff.
  * Annual residual settlement: 10% cash settlement at bulk rate.

---

## 3. Engineering Discipline
* Run `bun test` to ensure all calculator memory, analytics, and engine tests pass before committing.
* Format commits using Conventional Commits (`feat:`, `fix:`, `refactor:`).
* Never hardcode arbitrary tariff figures; import from `src/lib/constants` or calculator engine configs.
