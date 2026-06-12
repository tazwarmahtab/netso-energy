---
type: convention
tags: [nexus, protocol, inter-agent]
created: 2026-04-14
---

# Nexus Inter-Agent Protocol

Netso operates as a multi-department AI organization.

## Daily Logging Rule
Each session MUST maintain persistent memory:
1. **Startup**: Read `logs/LATEST.md` to inherit context and blockers.
2. **Execution**: Log significant actions/decisions in the daily log.
3. **Shutdown**: Summarize, update `logs/LATEST.md`, append to `~/Documents/30-Atlas/wiki/log.md`.

## Handoffs
To request action from another department, create a file in:
`Nexus/logs/handoffs/{dept}-to-{dept}-{date}.md`

## Coordination
The **NEXUS** agent aggregates logs and routes handoffs during `/nexus-sync`.
