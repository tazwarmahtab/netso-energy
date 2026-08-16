# Netso World-Class Homepage Design

## Goal
Replace the current homepage composition on a review branch with a premium, interaction-led Netso Energy experience that positions the company as distributed energy infrastructure for Bangladesh rather than as a generic solar installer.

## Visual direction
Near-white surfaces, deep black panels, muted graphite text and the Netso burnt-orange accent. The hero uses industrial rooftop solar photography with a cursor-driven liquid reveal inspired by the supplied Lumora interaction specification. Motion uses Framer Motion for spring-like section reveals and count-up statistics.

## Information architecture
Home hero → Why Netso → Platform/Solutions → Projects → About → transition band → Stats → Start a project → Footer. A full-screen navigation overlay and request modal are available from every viewport.

## Interaction requirements
- Intro loader counts 000–100, locks page scroll and exits upward before the homepage becomes interactive.
- Hero canvas shows the supplied after.jpg as the base image and reveals before.jpg through a soft, decaying pointer brush.
- Section content reveals once on intersection.
- Services and project cards respond to hover.
- Stats animate toward their target values when scrolled into view.
- Menu closes with the Close button or Escape and locks page scroll.
- Project request modal closes on backdrop click or Escape, locks page scroll, validates required fields, then shows a stub success state.
- Reduced-motion users receive the static hero image without the cursor canvas animation.

## Business messaging
The site emphasizes:
- BOO / RESCO / PPA structures.
- Zero-upfront customer CAPEX positioning.
- Industrial and commercial rooftop focus.
- Project development, solar canopies, project finance and lifecycle operations.
- Bangladesh deployment focus, including Chattogram, Gazipur and Narayanganj.

## Verification
The branch adds a GitHub Actions quality workflow for lint, unit tests, build and SEO verification. Existing homepage E2E smoke tests are replaced with tests for the new proposition, request modal and navigation overlay.
