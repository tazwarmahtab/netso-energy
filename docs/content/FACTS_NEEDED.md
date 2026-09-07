# Netso Energy — Facts Needed (Owner Approval Ledger)

Generated 2026-09-08 to separate what an engineering agent can safely build from what only Tazwar (founder) can legally and commercially approve. Do not publish any `NEEDS_OWNER` or `BLOCKED` item below without explicit owner verification.

---

## 1. Identity & Legal Entity (High Priority)

- [ ] **Brand name resolution:**
  - **Issue:** GPT-6 benchmark noted the brief referred to "Net Energy" while the repo and live deployment use "NETSO ENERGY" / "Netso Energy".
  - **Repo baseline:** Every file in this codebase (`index.html`, `site-copy.ts`, `site-metadata.shared.js`, `docs/contract-covenants-and-guarantee-pack.md`) uniformly uses **NETSO ENERGY**.
  - **Owner action needed:** Confirm whether the legal entity and public trading name is officially **NETSO ENERGY** (or Netso Energy Ltd / Net Energy).
  - **Pages affected if changed:** All pages, sitemap, JSON-LD, SEO tags, WhatsApp templates.

- [ ] **Contact numbers & corporate address:**
  - **Issue:** `site-metadata.shared.js` falls back to `01791222777` in dev/test.
  - **Owner action needed:** Confirm canonical WhatsApp business number, operating phone number, official physical address in Dhaka, and corporate registration / trade license info for footer.

---

## 2. Customer Trust & Proof Posture (High Priority)

- [ ] **Trust cards on homepage (`src/components/home/TrustSection.tsx`):**
  - **Issue:** Currently displays 3 cards ("Residential rooftop, Gulshan", "Commercial rooftop, Mirpur", "Apartment rooftop, Dhanmondi") with project photos and system types, but no kW size, installation dates, or client names.
  - **Owner action needed:** Confirm whether these are:
    1. *Real commissioned projects:* Provide verifiable kW capacity, month/year of commissioning, and customer consent.
    2. *Reference architectural concepts / pilot pipeline:* Re-label as "Pilot Site 01 (Gulshan)" / "Engineering Study" to avoid false advertising under Bangladesh consumer protection laws.

- [ ] **Customer response SLA promise:**
  - **Issue:** CTA reassurance states: *"engineering team replies in English or বাংলা — usually within 2 hours."*
  - **Owner action needed:** Confirm the operating support window (e.g. 9am–8pm BST, 7 days/week) and realistic first-response SLA.

- [ ] **Free assessment posture:**
  - **Issue:** GPT-6 proposed copy: *"Free first review · No obligation."*
  - **Owner action needed:** Confirm whether preliminary rooftop desk-studies are 100% free and without obligation for both residential and C&I leads, before we add that exact string to the hero or CTAs.

---

## 3. Commercial & Regulatory Assumptions (Medium Priority)

- [ ] **SREDA Net Metering Export Credit rate:**
  - **Issue:** `solar-engine.ts` uses BDT 8.39/kWh (BERC June 2026 bulk benchmark). TAM analysis memo in `docs/` references BDT 6.4523/kWh (DESCO/BERC older rate).
  - **Owner action needed:** Confirm current applicable utility credit rate for DESCO / DPDC / BREB inter-connection under SREDA 2025 guidelines. (UI currently excludes this from monthly savings and displays an explicit exclusion notice, which is safe).

- [ ] **Demand-charge offset heuristic:**
  - **Issue:** The calculator models illustrative demand reduction as ~12% of peak demand based on solar generation curve.
  - **Owner action needed:** Confirm if this heuristic matches pilot data or should remain flagged purely as "illustrative planning estimate".

- [ ] **Battery Energy Storage System (BESS) product rollout:**
  - **Issue:** Contract packs define 20-year PPA covenants for LFP batteries with 98% uptime, but the public marketing site does not yet feature a dedicated battery product.
  - **Owner action needed:** Confirm whether battery storage is an active residential / commercial upsell today or reserved for Phase 2.

---

## 4. Technical & Operational Scope (Architectural Boundary)

- [ ] **Billing portal vs Marketing website:**
  - **Current status:** The website is strictly a marketing, education, and lead-generation portal. There is no customer login, no live metering stream, and no payment gateway.
  - **Boundary rule:** Keep all billing/portal code completely out of the marketing site. Any future customer portal must live behind an authenticated subdomain (e.g. `app.netsoenergy.com`) with separate RBAC, session isolation, and payment gateways (bKash/Nagad/SSLCommerz/Stripe tokenized checkouts).
