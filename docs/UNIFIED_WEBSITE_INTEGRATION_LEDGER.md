# Unified NETSO Website — Source Selection & Integration Ledger

Status: **Discovery / unverified**. This branch is an isolated workspace; production main is unchanged.

## Decision

Use `tazwarmahtab/netso-energy` as the **provisional integration baseline**, not because it is definitively the best-looking variant, but because its documented implementation already includes Vite/React/TypeScript, Supabase intake, route prerendering, a release verification command, Vitest, Playwright, SEO verification and server-function checks. **All checks still need to be executed and verified** before any release.

## Candidate inventory and extraction hypotheses

| Source repository | Candidate asset to evaluate | Adoption gate |
| --- | --- | --- |
| netso-energy | Existing intake, release scripts, SEO, Supabase functions, animation | Verify security, tests, deployment, business copy |
| netso-energy-website | Versioned commercial assumptions, sources registry, calculator governance | Review code and commercial approval before port |
| Netso.energy | Three.js, GSAP and Framer Motion storytelling | Only reuse if performant, accessible, relevant to C&I solar; README describes residential energy platform |
| netso-energy-3d | 3D experience and server/database structure | Avoid parallel backend without compelling case |
| Netso_website | Lightweight GSAP motion ideas | Review actual components, licensing and bundle cost |
| netso-mvp | Prisma/Express backend experiments | Do not import until integration/security design is approved |
| netso, rooftop-energy-vision | UI component and layout candidates | Compare screenshot quality and content integrity |
| Other owned Netso variants | Images, typography, section layouts, interaction patterns | Inspect each before marking reusable |

## Release gates (all must pass before calling the website complete)

- [ ] Inventory every Netso-related repository and record source commit SHAs.
- [ ] Screenshot and score candidates across desktop/tablet/mobile, performance, accessibility, conversion, and authenticity.
- [ ] Choose each imported component by evidence; track source, license, changes and tests.
- [ ] Verify brand logo, photography rights, actual contact information, legal pages and policy wording.
- [ ] Validate claims about no upfront capital, discounts, ownership, tariffs and projected savings against approved terms.
- [ ] Build complete responsive pages and accessible navigation; remove dead links and placeholder text.
- [ ] Confirm all lead-capture paths persist correctly, handle errors, prevent spam and protect personal information.
- [ ] Run lint, type checks, unit tests, Playwright desktop/mobile, SEO checks, security audit and function checks.
- [ ] Run visual regression checks on representative devices and reduced-motion mode.
- [ ] Confirm domain, hosting, secrets, DNS, analytics consent, observability, backups and rollback.
- [ ] Obtain explicit approval for financial/legal claims and production deployment.
- [ ] Validate production URLs, forms, metadata, error logs and monitoring after deployment.

## Guardrails

Keep production deployment unchanged until acceptance. Do not fabricate case studies, financing approvals, partner logos, generation data, discounts or regulatory endorsement. Prefer the smallest maintainable architecture over merging incompatible stacks. Report red/amber/green only with reproducible evidence.
