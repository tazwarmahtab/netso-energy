# Netso HQ — Claude Code Context

Solar energy startup focus. Netso operates as a multi-department AI organization.

## Architecture
See @.claude/rules/architecture.md for tech stack and directory map.

## Guidelines
- **Rules**: Refer to @.claude/rules/ for modular conventions (Nexus protocol, coding standards).
- **Specialists**: Use the `/agents` command to invoke departmental specialists:
    - `atlas-ops`: Project management & NEM pipeline.
    - `ledger-finance`: Unit economics & pricing models.
    - `shield-legal`: Compliance & regulatory tracking.
    - `solar-web`: Frontend design & site development.
    - `nexus-core`: Executive coordination & inter-agent handoffs.

## Contextual Files
- Strategy: `Strategy/NETSO_NEXT_MOVES_FORWARD.md`
- Compliance: `Strategy/NETSO_RESCO_APPLICATION_DRAFT.md`
- Pilot Data: `Strategy/NETSO_3KW_PILOT_DATA_TRACKING.md`

## Development Commands
| Directory | Command | Purpose |
|:----------|:--------|:--------|
| website/ | `npm run dev` | Start dev server |
| website/ | `npm run build` | Build production bundle |
| project/ | `/resco-check` | Registration status check |
| project/ | `/nexus-sync` | Daily log aggregation (Nexus only) |

---
*Note: This file is optimized for context (≤200 lines). Detailed logic is in modular rules and subagents.*