# Netso Energy – Client Dashboard (Retention Engine) – End‑to‑End Specification (SPEC-DASH-02)

## 1. Business Goal
Transform customer experience from paying a bill to managing a high-performing energy asset. The dashboard drives retention, transparency, and supports the Power-as-a-Service model.

## 2. High-Level Architecture
```text
[Client Browser] → HTTPS → [Next.js Frontend] → [API Gateway] →
   ├─ [Auth Service] (JWT/OAuth2)
   ├─ [Data Aggregator] (IoT Hub inverter/sensor data)
   ├─ [Financial Engine] (savings vs. grid)
   └─ [PostgreSQL] (profiles, history, savings)
```

## 3. Tech Stack
- Front-end: React 18 + Next.js 14 + TailwindCSS
- Data viz: Recharts or Chart.js
- Motion: GSAP
- Icons: Lucide React
- Back-end: Node.js/Express

## 4. Key Data Modules
- Real-time generation: current kW output + daily kWh yield.
- Savings counter: cumulative BDT saved and monthly savings vs. grid.
- Environmental impact: CO2 offset visualized with tree-equivalent indicators.
- System health: PR + status (Healthy/Warning/Error).

## 5. UI/UX Requirements
- Dark mode default.
- High-legibility typography.
- Mobile-first responsiveness.
- Smooth transitions across Daily/Weekly/Monthly views.

## 6. Key API Endpoints
- `GET /api/v1/user/profile`
- `GET /api/v1/metrics/live`
- `GET /api/v1/metrics/history?range=monthly`
- `GET /api/v1/alerts`

## 7. Acceptance Criteria
- Initial load < 1.5s on 4G.
- Live meter updates without refresh.
- Savings matches `Netso_Financial_Model_v6`.
- Charts remain responsive and legible on mobile.
- Health indicator correctly reflects simulated faults.
