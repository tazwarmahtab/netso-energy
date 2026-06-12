---
owner: Tazwar Mahtab
project: Netso HQ Website
purpose: Master skill index for web/3D/animation/GSAP resources
updated: 2026-04-14
---

# `.resources/` — Skill & MCP Reference Library

This directory is the **local skills cache** for the Netso HQ website project. All skills and
MCPs relevant to building a top-tier solar marketing site live here — organized, not scattered.

---

## Directory Map

```
.resources/
├── CLAUDE.md              ← You are here
├── SKILLS.md              ← Master index of all skills inside
├── mcp/
│   └── config.json        ← Active MCP servers (obsidian, github, filesystem, magic)
├── skills/
│   ├── graphify/          ← Knowledge graph builder (/graphify)
│   ├── gsap/              ← GSAP animation suite (8 skills)
│   │   ├── gsap-core/SKILL.md
│   │   ├── gsap-plugins/
│   │   ├── gsap-react/
│   │   ├── gsap-scrolltrigger/
│   │   ├── gsap-timeline/
│   │   ├── gsap-utils/
│   │   ├── gsap-frameworks/
│   │   ├── gsap-performance/
│   │   └── examples/
│   ├── izacenter/         ← 200+ skills from claudiodearaujo/izacenter (key Web subset)
│   │   ├── 3d-web-experience/   ← Three.js, R3F, Spline, WebGL
│   │   ├── frontend-design/     ← Anthropic official: anti-AI-slop design
│   │   ├── scroll-experience/   ← Scroll-driven storytelling
│   │   ├── interactive-portfolio/
│   │   ├── tailwind-patterns/
│   │   ├── web-performance-optimization/
│   │   ├── brand-guidelines/
│   │   ├── seo-fundamentals/
│   │   ├── ui-ux-pro-max/       ← 67 styles, 161 reasons, 161 palettes
│   │   │   ├── SKILL.md
│   │   │   ├── design/
│   │   │   ├── brand/
│   │   │   ├── banner-design/
│   │   │   ├── ui-styling/
│   │   │   ├── slides/
│   │   │   └── design-system/
│   │   └── copywriting/
│   └── frontend-design/   ← Top-level Anthropic frontend-design skill
├── awwwards-todo-system/  ← MCP server for award-tier todo/project tracking
│   ├── mcp-server.js
│   ├── AwwwardsTodoSystem.js
│   ├── package.json
│   ├── install.sh
│   ├── README.md
│   └── examples/
└── reference-imagery/     ← Visuals from reference URLs / Arena sites
    ├── arena-site-1.png
    └── arena-site-2.png
```

---

## When to Use Which Skill

### Website/UI Work
| Situation | Skill |
|-----------|-------|
| Build a component/page from scratch | `skills/izacenter/frontend-design/` |
| Need 67 UI styles + design system | `skills/izacenter/ui-ux-pro-max/` |
| Top-level Anthropic design guidance | `skills/frontend-design/` |
| Copywriting / marketing text | `skills/izacenter/copywriting/` |

### Animations & 3D
| Situation | Skill |
|-----------|-------|
| GSAP scroll animation (Framer Motion fallback) | `skills/gsap/gsap-scrolltrigger/` |
| GSAP timeline sequencing | `skills/gsap/gsap-timeline/` |
| GSAP React integration | `skills/gsap/gsap-react/` |
| Any GSAP core question | `skills/gsap/gsap-core/` |
| Three.js / React Three Fiber / Spline | `skills/izacenter/3d-web-experience/` |
| Scroll-driven cinematic effects | `skills/izacenter/scroll-experience/` |

### Performance & SEO
| Situation | Skill |
|-----------|-------|
| Lighthouse / Core Web Vitals | `skills/gsap/gsap-performance/` |
| SEO audit + fundamentals | `skills/izacenter/seo-fundamentals/` |
| Tailwind component patterns | `skills/izacenter/tailwind-patterns/` |

### Project Management / MCPs
| Situation | Tool |
|-----------|------|
| Todo system with award-tier styling | `.resources/awwwards-todo-system/` + magic MCP |
| Obsidian wiki access | `obsidian` MCP |
| GitHub API | `github` MCP |
| File system operations | `filesystem` MCP |
| Build knowledge graphs | `graphify` skill + `/graphify` |

---

## Activation Patterns

```bash
# GSAP design system (direct CLI)
python3 skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py \
  "solar energy Bangladesh" --design-system -p "Netso"

# Graphify the wiki
cd ~/Documents/30-Atlas/wiki && /graphify . --mode deep

# Activate magic MCP for design generation
# (magic MCP server registered globally — Claude Code auto-activates)
```

---

## Key URLs Referenced
- Arena site 1: `https://019d8807-39ba-7e9b-8535-5a239703a858.arena.site`
- Arena site 2: `https://019d8906-2095-78f2-bf13-29be214d8482.arena.site`
- GSAP CDN: `https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js`
- GSAP React: `https://www.npmjs.com/package/@gsap/react`
- GSAP Skills Repo: `https://github.com/greensock/gsap-skills.git`
- IZACenter: `https://github.com/claudiodearaujo/izacenter`
- UI/UX Pro Max: `https://uupm.cc`
- 3D Web Exp source: `vibeship-spawner-skills` (Apache 2.0)

---

## Session Rules

1. **Read CLAUDE.md** — at the start of every web/UI design session, read this file
2. **Follow SKILLS.md index** — for the full list of all 200+ available skills
3. **Prefer local skills** — `.resources/skills/` is the source of truth for animation/GSAP skills (authoritative copy, no network dependency)
4. **MCPs are live** — the 4 MCPs in `mcp/config.json` are registered globally; this file is the bookmark
5. **Reference imagery** — `.resources/reference-imagery/` is for the 2 Arena screenshots + any inspiration images for the current build

---

*Maintained as part of the Netso HQ Claude Code workspace.*