# NETSO // ENERGY SIGNAL

**Version:** 1.1  
**Status:** Canonical visual foundation  
**Date:** 2026-09-13

## Thesis

**Physical infrastructure rendered through a computational lens.**

Netso imagery and interface should make a physical energy system legible as an engineered network.

## Hierarchy

`BLACK → IMAGE → GRID → DITHER → YELLOW SIGNAL`

## Five primitives

| Primitive | Meaning | Production use |
|---|---|---|
| SIGNAL | Energy, data, transformation | Ordered dither, signal lines, restrained scanlines |
| GRID | Infrastructure and topology | Module geometry, electrical topology, architectural plans |
| FIELD | Real physical environment | Bangladesh C&I photography or credible 3D |
| MARK | Brand identity | Canonical Netso logo and Netso yellow |
| VOID | Authority and hierarchy | Absolute black negative space |

## Energy Dither

Dither is semantic. It must communicate **transformation, information or energy**.

Approved modes:

1. **Surface Dither**: subtle controlled texture on photography.
2. **Transition Dither**: physical imagery progressively resolves into ordered dots or pixels.
3. **Signal Dither**: dither becomes an information field, map or energy visualization.

Preferred narrative:

`PHYSICAL WORLD → DITHER → INFORMATION`

Never use dither as decoration.

## Color tokens

- `netso-black`: `#050505`
- `netso-yellow`: `#f5c400`
- `netso-off-white`: `#f2f1ec`
- `netso-industrial-900`: `#111111`
- `netso-industrial-700`: `#2a2a28`
- `netso-industrial-500`: `#666660`
- `netso-industrial-300`: `#a8a8a1`
- `netso-industrial-100`: `#deddd7`

The existing application palette remains backward-compatible. New Energy Signal work should use the `netso-*` tokens.

## Bangladesh authenticity

**If the Netso logo disappears, the environment should still read as Bangladesh.**

Preferred context is Chattogram and comparable Bangladeshi C&I environments. Use dense industrial rooftop architecture, concrete and corrugated factory structures, tropical humid atmosphere, Bangladesh-style utility infrastructure and realistic RMG/commercial details.

Do not introduce Dubai, Singapore, California, European or generic futuristic-city cues.

## Logo rule

AI generation must never be trusted to reproduce the Netso logo or proprietary typography. Generate the environment first, then apply the canonical logo from the approved Cloudinary asset library.

Canonical logo public ID: `netso_logo_yellow_on_black_or5srk`

## Motion

Motion explains the asset. It should reveal relationships between place, system, energy and information.

Use the canonical easing token:

`cubic-bezier(0.22, 1, 0.36, 1)`

Respect `prefers-reduced-motion`.

## Red-team gates

Reject an asset if:

- Dither reads as retro or AI decoration.
- Yellow overwhelms the composition.
- Glitch makes the system feel cyberpunk.
- Nostalgia weakens infrastructure credibility.
- Architecture could be anywhere except Bangladesh.
- The logo is AI-generated or distorted.
- Visual effects do not communicate a system relationship.

## Implementation map

- `src/design-system/tokens.css`: CSS tokens and primitive utilities.
- `tailwind.config.ts`: Tailwind `netso.*` color tokens.
- Notion `Netso Design System Master Specification v1.0`: detailed operating specification and governance.
- Cloudinary: approved production visual assets.
- Figma: component and prototype source.

## Hero reference

Finalized Canva hero: https://www.canva.com/d/ihCk2deODtBvpyU

The hero is V1 foundation. Do not endlessly optimize it. Extend the language across the website, sales materials, launch film and future Netso OS.
