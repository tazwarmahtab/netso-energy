#!/usr/bin/env bash
# netso-observe.sh
# Lightweight observation hook for Netso operations sessions.
#
# Appends a compact JSON observation to ops-observations.log on every tool call.
# Designed to be extremely fast (runs on every PreToolUse + PostToolUse).
#
# Reads:
#   - Tool name + arguments via stdin (Claude Code hook passes full context)
#   - $CLAUDE_PROJECT_DIR → identifies this as Netso_HQ
#
# Output: ~/Documents/30-Atlas/Netso/ops-observations.log
#
# Install via Netso_HQ/.claude/settings.json PreToolUse + PostToolUse hooks.
# The actual analysis + wiki filing is done by netso-observer.js (weekly cron).

set -euo pipefail

OBS_DIR="$HOME/Documents/30-Atlas/Netso"
OBS_LOG="$OBS_DIR/ops-observations.log"
NETSO_ROOT="$HOME/Documents/10-Projects/Netso_HQ"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$OBS_DIR"

# ── Fast-path: only observe if inside Netso project ───────────────────────────
if [[ -z "${CLAUDE_PROJECT_DIR:-}" ]]; then
  exit 0
fi

PROJECT_PATH=$(realpath "$CLAUDE_PROJECT_DIR" 2>/dev/null || echo "$CLAUDE_PROJECT_DIR")
NETSO_PATH=$(realpath "$NETSO_ROOT" 2>/dev/null || echo "$NETSO_ROOT")

if [[ ! "$PROJECT_PATH" == "$NETSO_PATH"* ]]; then
  exit 0
fi

# ── Read full stdin (tool call context from Claude Code hook) ─────────────────
INPUT=$(cat 2>/dev/null || echo '{}')

# ── Extract tool + file from Claude Code hook input ───────────────────────────
# Claude Code v1: passes a JSON object on stdin. Parse key fields.
TOOL=$(echo "$INPUT" | node -e "
  const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
  // Claude Code hook format varies; try common shapes
  const tool = data.tool || data.name || data.Use?.tool || '';
  const args = data.arguments || data.args || data.Use?.arguments || {};
  const file = args.file_path || args.file || args.path || args.notebook_path || '';
  process.stdout.write(JSON.stringify({ tool, file }));
" 2>/dev/null || echo '{"tool":"","file":""}')

TOOL_NAME=$(echo "$TOOL" | node -e "process.stdout.write(JSON.parse(require('fs').readFileSync(0,'utf8')).tool)")
FILE=$(echo "$TOOL" | node -e "process.stdout.write(JSON.parse(require('fs').readFileSync(0,'utf8')).file || '')") || FILE=""

# ── Classify domain quickly ───────────────────────────────────────────────────
DOMAIN=""
if echo "$FILE" | grep -qiE "resco|sreda|berc|bpdb"; then DOMAIN="RESCO"; fi
if echo "$FILE" | grep -qiE "procurement|supplier|inverter|panel"; then DOMAIN="Procurement"; fi
if echo "$FILE" | grep -qiE "outreach|crm|factory|proposal|opex"; then DOMAIN="Outreach"; fi
if echo "$FILE" | grep -qiE "onsite|installation|commissioning|structural"; then DOMAIN="Onsite"; fi
if echo "$FILE" | grep -qiE "finance|economics|cost|bdt|irr|cashflow"; then DOMAIN="Finance"; fi
if echo "$FILE" | grep -qiE "legal|contract|epc|ppa|subcontractor"; then DOMAIN="Legal"; fi
if echo "$FILE" | grep -qiE "shield|governance|escalation|taz"; then DOMAIN="Governance"; fi
if [[ -z "$DOMAIN" ]]; then DOMAIN="General"; fi

# ── Compact observation record ─────────────────────────────────────────────────
OBS=$(cat <<EOF
{"ts":"$TIMESTAMP","tool":"$TOOL_NAME","file":"$(echo "$FILE" | sed 's/"/\\"/g')","domain":"$DOMAIN"}
EOF
)

# ── Append to log (atomic if small) ───────────────────────────────────────────
echo "$OBS" >> "$OBS_LOG"

# Trim log if > 5000 lines (keep recent)
LINES=$(wc -l < "$OBS_LOG" 2>/dev/null || echo 0)
if [[ "$LINES" -gt 5000 ]]; then
  tail -n 3000 "$OBS_LOG" > "$OBS_LOG.tmp" && mv "$OBS_LOG.tmp" "$OBS_LOG"
fi

exit 0