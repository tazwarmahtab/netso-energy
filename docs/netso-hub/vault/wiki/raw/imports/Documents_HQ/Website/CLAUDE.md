# CLAUDE.md — Netso Website Project

This file provides guidance for Claude Code sessions working on the Netso website.

## Agent System

**Primary Agent**: `.claude/agents/NETSO_WEB_ARCHITECT.md`
- This agent is the creative and technical authority for all website decisions
- Read it before writing any code or making design choices
- It contains: design tokens, animation system, conversion architecture, component standards, bilingual patterns, and accessibility rules

## Session Logging & OS Protocol

This directory operates as an autonomous session. The SOLAR agent MUST follow these persistent memory rules:

### 1. Session Startup
- **Read `logs/LATEST.md`**: Inherit the state of the UI build, conversion tests, and design blockers.
- **Read `../Nexus/logs/handoffs/`**: Check for incoming content updates or technical requests from other departments.
- **Initialize Log**: Create a new daily log in `logs/` (or append to today's) with structured frontmatter.

### 2. Live Execution
- **Log Actions**: Record component builds, styling refactors, and performance optimizations with `[HH:MM]` timestamps.
- **Log Decisions**: Document the rationale behind specific UX/UI choices or animation parameters.
- **Handoffs**: If the website requires new operational data or financial marketing math, create a handoff file in `../Nexus/logs/handoffs/web-to-{dept}-{date}.md`.

### 3. Session End
- **Update LATEST**: Overwrite `logs/LATEST.md` with the finalized web session state.
- **Archive**: Ensure the daily log is saved as `logs/YYYY-MM-DD.md`.
- **Wiki Summarize**: One-line append to `~/Documents/30-Atlas/wiki/log.md`.

---

## Technical Stack

- **Framework**: React 19 + Vite 7 (rolldown-vite@7.2.5)
- **Styling**: Tailwind CSS with `clsx`/`tailwind-merge`
- **Animation**: Framer Motion (primary), ReactLenis (smooth scroll)
- **Icons**: Lucide React
- **Language**: TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`)

## Commands

```bash
cd Website/

npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript compile + Vite build → dist/
npm run lint         # ESLint
npm run preview      # Preview production build
```

## Key Files

- `src/App.tsx` — Section composition (Navbar + 13 sections)
- `src/components/` — 13 React components (SavingsCalculator, Hero, etc.)
- `src/index.css` — Tailwind directives + global styles
- `tailwind.config.js` — Theme configuration
- `.claude/agents/NETSO_WEB_ARCHITECT.md` — Primary design agent
- `dist/` — Production build output

## Reference Aesthetic

Study and draw inspiration from [fluid.glass](https://fluid.glass):
- Dark architectural palette (#0b1012, #f3f0ec, #d4cec6)
- `clip-path` scroll reveals, staggered entrances
- Glass morphism: `backdrop-filter: blur(2rem)`
- Custom cursor with magnetic lag

## Conversion Priority

1. **Savings Calculator** (BERC tariff math, BDT, Home/Commercial toggle)
2. **Hero CTA** (above fold on mobile too)
3. **WhatsApp CTA** (`wa.me/8801791222777`) — always accessible
4. **Contact/Lead form section**
5. **Trust badges** (SREDA registered, certifications)

## Design Tokens

All components use CSS variables from the NETSO_WEB_ARCHITECT agent:
- Solar gold: `--color-solar-gold: #F59E0B`
- Dark surface: `--color-night: #0A0D14`
- Light surface: `--color-fog: #F1F5F9`

Never use hardcoded colors. Never use Inter/Roboto/Arial. Never use linear easing.

## Animation Timing

| Duration | Use Case |
|----------|----------|
| 0–100ms | Instant feedback |
| 100–200ms | Micro-interactions (hover, toggle) |
| 300–500ms | Section reveals |
| 500–800ms | Hero entrance, scroll cinema |

## Bilingual

Bengali/English system using `data-i18n` or inline object translations.
Language toggle in navbar: `EN | বাং`
Numbers: `Intl.NumberFormat` with `bn-BD` locale.

## Performance Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance > 90

## Local Skills Library (`.resources/`)

All skills, animation references, and MCPS are organized locally in `.resources/`.
**Read `.resources/CLAUDE.md` first** for the full index. Key paths:

| Resource | Path | Purpose |
|----------|------|---------|
| Master index | `.resources/CLAUDE.md` | Directory map + usage guide |
| Full skill list | `.resources/SKILLS.md` | All 210 skills catalogued |
| GSAP suite | `.resources/skills/gsap/` | 8 GSAP skills (core, scroll, timeline, etc.) |
| 3D + immersive | `.resources/skills/izacenter/3d-web-experience/` | Three.js, R3F, Spline, WebGL |
| Design systems | `.resources/skills/izacenter/ui-ux-pro-max/` | 67 styles, 161 palettes, 161 rules |
| MCP servers | `.resources/mcp/config.json` | obsidian, github, filesystem, magic |
| Design reference | `.resources/reference-imagery/` | Arena screenshots |
| Awwwards todo | `.resources/awwwards-todo-system/` | Award-tier project tracking MCP |

### GSAP Activation (local, no network)
```bash
# Design system generator — already installed locally
python3 .resources/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py \
  "solar energy Bangladesh" --design-system -p "Netso"
```

### Active MCPs
- `obsidian` — wiki access
- `github` — GitHub API
- `filesystem` — file system (home dir)
- `magic` — 21st.dev design generation

## Cloned Reference Repos (for reading)

- `/tmp/agency-agents/` — Specialist agent markdown files (UX Architect, Brand Guardian, etc.)
- `/tmp/ruflo/` — Claude Code plugin (swarm commands, agent patterns)
- `/tmp/anthropics-skills/` — Anthropic skills: frontend-design, theme-factory, brand-guidelines