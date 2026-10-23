# Netso Energy — Approved Hero Visual Contract

Status: APPROVED VISUAL DIRECTION / IMPLEMENTATION PENDING
Source: user-provided 1536×864 screenshot, 2026-10-24.
Branch: feat/unified-netso-website-audit
This document supersedes conceptual skyline hero treatments in Figma and code. It does not imply that the screenshot's commercial claims are verified.

## Visual invariants
- Full-viewport, high-quality architectural scene: dusk/night Bangladesh cityscape, rooftop solar canopy with warm amber linear lighting and real depth. No placeholder silhouettes or generic abstract geometry.
- Dark navy/charcoal palette, soft warm highlights, yellow Netso accent, fine inset border, generous negative space.
- Top navigation: genuine Netso logo and wordmark left; Home, Solutions, Model, Projects, About, Contact center; contact/proposal affordances right. On mobile, compact accessible menu.
- Dominant typographic composition: huge uppercase POWER with elegant italic serif forward, layered with the canopy but never illegible.
- Left supporting copy, yellow rounded proposal CTA and secondary glass WhatsApp CTA.
- Lower-right translucent benefit panel with compact icons and three rows. Responsive placement must avoid headline and buttons.
- Editorial motion is progressive enhancement: immediate meaningful first paint, no blank splash, no forced scroll-to-reveal before content is accessible.
- Keep semantic h1, keyboard access, focus indicators, reduced-motion behavior, high-contrast text, localized Bangla layout and mobile safe areas.

## Copy/evidence controls
- Do not publish “up to 30% lower power cost,” “zero upfront CAPEX,” or savings as universal, verified offers without written commercial approval.
- Where evidence is missing, use conditional language: “Explore potential electricity-cost savings”; “BOO/PPA structures may reduce upfront equipment investment, subject to eligibility, financing and contract.”
- Calculator output is illustrative, not a quotation or guarantee.
- Never invent project numbers, certifications, partners, testimonials or client logos.

## Implementation mapping
- Source: src/components/home/Hero.tsx, src/pages/Index.tsx, src/lib/homepage-media.ts, shared header/navigation and commercial copy.
- Preserve React/Vite, existing CTA tracking, WhatsApp assessment flow, image/video fallbacks, language switching, lazy-loaded below-fold sections.
- Prefer optimized, properly licensed photographic hero assets. The user-provided screenshot is a visual reference; don't ship a screenshot with baked-in text as the background.
- Desktop 1440–1536: headline left, solar structure dominant on right, benefit card lower right.
- Tablet 768: maintain typography hierarchy, move benefit card below hero copy when necessary.
- Mobile 390: visible headline and proposal action in first viewport, hero image focal point maintained, card follows CTA without obstructing content.
- Extend same system to savings, model, industries, delivery, evidence, contact and footer.

## Acceptance gates
1. Screenshot comparisons at 390, 768, 1440 and 1536 widths against approved direction; no cropping of CTAs, overlaps, or blank initial state.
2. Keyboard and screen-reader navigation, reduced motion, responsive images and text contrast verified.
3. No unapproved commercial claims; copy reviewed against written evidence.
4. npm run build, npm run lint, npm run test, npm run test:e2e and release checks pass on feature branch.
5. Branch-specific private preview reviewed and approved before production promotion.

## Known blockers
- Figma's current editable conceptual hero is not photo-faithful; must be replaced with a properly layered photographic composition.
- GitHub-to-Vercel login connection for this repo was previously unavailable; deployment not confirmed.
- Figma and code have not yet passed visual regression or production tests.

## Responsive parity — explicit user approval (2026-10-24)
Desktop and mobile MUST be the same visual experience, not separate creative concepts. Reuse the identical hero asset/art direction, Netso brand marks, POWER / forward typographic identity, warm solar-canopy lighting, accent colors, CTAs, benefit-card visual language, and motion grammar. Only adapt scale, cropping/focal point, grid-to-stack order, navigation affordance and touch targets. Do not substitute mobile-only generic stock imagery or a different headline design. Compare 390px and 1440px screenshots side by side and reject stylistic divergence. Maintain equivalent content and functionality, including commercial qualifiers and WhatsApp/proposal actions.
