# Netso Energy – Secure Data‑Room Portal (Deal Closer) – End‑to‑End Specification (SPEC‑DR‑01)

## 1. Business Goal
Provide VCs, banks, and large‑client CFOs a single, password‑protected, white‑label portal where they can browse the full Netso data‑room (financial models, legal contracts, technical specs) without downloading files. This replaces ad‑hoc email attachments and adds usage analytics for the sales team.

## 2. High‑Level Architecture
```text
[User] → HTTPS → [Load Balancer (NGINX)] → [Auth Service (Node.js/Express)] →
   ├─ JWT Token (15‑min) → [Portal Front‑End (React/Next.js)]
   │                                 │
   │                                 └─ API Gateway (Node.js) →
   │                                           ├─ /files   (Serves files from S3/MinIO)
   │                                           └─ /analytics (records view events)
   └─ DB (PostgreSQL) – stores user accounts, token revocation, audit logs
```

## 3. Tech Stack
- Front-end: React 18 + Next.js 14 (SSR) + TailwindCSS
- Back-end: Node.js 20 + Express (REST) + JWT
- Auth: OAuth2 + bcrypt hashed passwords
- File store: Amazon S3 (or MinIO self-hosted)
- Database: PostgreSQL
- CI/CD: GitHub Actions → Docker → AWS ECS Fargate (or GCP Cloud Run)
- Monitoring: Prometheus + Grafana, Sentry
- Logging: Elastic Stack

## 4. API Design
- `POST /auth/login` obtain short-lived JWT.
- `GET /files` list folder hierarchy.
- `GET /files/{fileId}` stream specific file.
- `POST /analytics/view` record file view event.

All endpoints validate JWT and enforce role-based access (Investor, Bank, Internal).

## 5. Security & Compliance
- Data at rest encrypted (S3 SSE-AES-256, PostgreSQL managed encryption).
- Data in transit over TLS 1.3, HSTS, restrictive CSP.
- Short-lived JWT (15 min) + refresh tokens (7 days) with revocation list in Redis.
- Rate limiting: 30 req/min/IP.
- Audit logging: user, endpoint, IP, timestamp.
- Quarterly pen-test and OWASP Top 10 alignment.

## 6. UI/UX Flow
1. Login page.
2. Landing dashboard (folder cards).
3. Folder view with breadcrumb.
4. Inline file viewer (PDF/CSV).
5. Internal analytics bar.
6. Persistent “Contact Founder” CTA.

## 7. Deployment & Ops
- Multi-stage Dockerfile (node:20-alpine).
- `/healthz` endpoint with `200 OK`.
- Blue-green/rolling deployments with zero downtime.

## 8. Testing Strategy
- Unit: Jest + supertest.
- Integration: Postman/Newman.
- UI: Cypress.
- Security: OWASP ZAP.
- Load: k6 with 100 concurrent users.

## 9. Acceptance Criteria
- Documented API contracts and passing tests.
- JWT + refresh flow works.
- ACL enforces folder visibility by role.
- Responsive accessible UI (WCAG 2.1 AA).
- Audit logs queryable.
- CI E2E checks on each PR.
- Deployable Docker target with zero downtime.

## 10. Future Enhancements
- Per-viewer PDF watermarking.
- Embedded video walkthroughs.
- SSO via Okta/Azure AD.
- Dynamic expiring links.
