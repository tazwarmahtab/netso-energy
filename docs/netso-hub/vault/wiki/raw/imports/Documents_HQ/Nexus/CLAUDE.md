# Netso Nexus — Coordination Layer

The Nexus session acts as the "CEO/COO" hub, orchestrating all 16 Paperclip agents across the 6 departmental sessions.

## 1. Governance Role
The NEXUS agent in this session is responsible for:
- **Synchronizing Memory**: Aggregate all `logs/LATEST.md` into a project-wide digest.
- **Routing Handoffs**: Review `Nexus/logs/handoffs/`, verify completion, and move to archives.
- **Strategic Alignment**: Ensuring department-level pivots align with the 2026 Policy Framework.
- **Reporting**: Generating the daily status update for the Omni-Vault Wiki.

## 2. Session Protocol (Agent OS)

### Startup Sequence
1. **Read `logs/LATEST.md`**: Inherit active strategic priorities.
2. **Collect State**: Read `../Operations/logs/LATEST.md`, `../Finance/logs/LATEST.md`, `../Legal/logs/LATEST.md`, `../Website/logs/LATEST.md`.
3. **Audit Handoffs**: List all active files in `logs/handoffs/`.

### Execution commands
| Command | Purpose |
|:--------|:--------|
| `/nexus-sync` | Process all logs and handoffs into a central summary |
| `/route-all` | Scan handoffs and notify respective department sessions |
| `/vision-check` | Verify current work against `Strategy/Strategy-2026.md` |

### Shutdown Sequence
1. Update `Nexus/logs/LATEST.md`.
2. Generate one-line summary for `~/Documents/30-Atlas/wiki/log.md`.

---

## Strategic Stack
- **Vision**: `Strategy/Strategy-2026.md`
- **Agent Org**: `Code/NETSO.ini`
- **Automation**: `Nexus/automation/` (Regulatory trackers)
