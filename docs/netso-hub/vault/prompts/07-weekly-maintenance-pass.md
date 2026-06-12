# Prompt 07: Weekly Maintenance Pass

**Purpose:** Integrate new sources into your wiki without breaking cross-references, creating duplicates, or confusing temporal updates with actual contradictions. This separates real conflicts from normal business changes like price updates or improved metrics.

**When to use:** Run weekly, or whenever you have new sources to integrate. Also works for monthly or bi-weekly cadences.

---

## The Prompt

```
You are a knowledge base curator running a maintenance pass. Your job is to integrate new sources into an existing wiki without breaking cross-references, creating duplicates, or confusing temporal updates with actual contradictions.

Here are the new raw sources from this period:

[PASTE OR DESCRIBE NEW SOURCES]

Here is the current state of my wiki (existing pages):

[PASTE YOUR INDEX OR PAGE LIST]

For each new source, follow this process:

1. Read fully and classify the source type (narrative, structured data, regulatory, incident, behavioral) before making any changes. Use the same source type classifications from the First Ingest prompt.

2. Map to existing pages. Which existing wiki pages contain information that this source adds to, updates, or contradicts?

3. Before making any changes, classify each piece of new information into one of three categories:

   **Temporal update:** The real-world fact changed over time. A supplier's price went from $15 to $18. A conversion rate improved from 9% to 12% in a new quarter. A competitor released a new feature. A regulation was amended.
   Action: Update the current-state fields on the page (current_price, latest_version, current_status). Move the old value to a changelog or history section with the date it was valid. Do NOT flag as contradiction.

   **Context-dependent variation:** The information differs because it applies to a different context. A sales playbook for manufacturers recommends different messaging than the playbook for distributors. An SOP varies by location. Messaging that works for one customer segment doesn't work for another.
   Action: Add the variation as a conditional section on the page (e.g., "For manufacturers: ..." / "For distributors: ...") or create a linked variant page if the differences are substantial. Do NOT flag as contradiction.

   **Actual contradiction:** Two sources from the same time period, about the same context, claim different things. One call transcript says the prospect's budget is $50K, another says $30K. One team member documented a process one way, another documented it differently.
   Action: Flag as a genuine contradiction. Add both versions with their sources. Hold for human resolution.

4. Apply the classified changes:
   - For temporal updates: overwrite current-state fields, preserve history with dates.
   - For context-dependent variations: add conditional sections or variant pages.
   - For contradictions: flag and hold.
   - For genuinely new information that adds detail to an existing page: append. Add the new source as a reference. Update the "last updated" date.
   - For high-frequency data sources (weekly analytics, daily call transcripts, regular data exports): maintain a rolling window. Keep detailed data from the last 8 weeks. Summarize older data into trend pages rather than appending indefinitely.

5. Create new pages only if the source covers entities, concepts, or patterns not yet in the wiki. Follow the schema for page type, frontmatter, and domain-specific metadata. Apply the same stub rules from the First Ingest: only create stubs for entities likely to recur.

6. Update cross-references. New pages should link to relevant existing pages, and existing pages should link back.

7. Check for synthesis opportunities. If this maintenance pass touched multiple related pages AND the pattern spans 3 or more independent sources AND the pattern is actionable for the business, note it in a "Synthesis opportunities" section of the log. Example: two competitors both made pricing changes in the same direction, or the same objection appeared in calls with 3 different customer segments. Don't flag loose correlations. Only flag patterns a human should consider turning into a synthesis page.

8. Check for causal or precedent chains. Two specific situations to watch for:
   - Incident/operational: If the root cause of a new incident matches or resembles the root cause of a previous incident (even if they occurred in different systems or components), flag the causal connection. Look for shared failure modes, shared infrastructure dependencies, or shared environmental conditions, not just surface-level similarity.
   - Regulatory/compliance: If a regulatory change in one jurisdiction is likely to affect interpretations in other jurisdictions, flag it only if those jurisdictions have harmonization clauses, explicitly reference each other's laws, or share a common regulatory framework. Don't flag every state change as relevant to every other state.

9. Log the operation: Date, sources ingested (with source type), pages created, pages updated, temporal updates applied, context variations added, contradictions flagged, synthesis opportunities noted, precedent/causal chain flags.

MULTI-WIKI MODE: If you maintain separate wikis for multiple clients, products, or business units, run this maintenance pass once per wiki. Keep each run completely isolated. Do not combine wikis into a single maintenance pass. For efficiency, run the same prompt sequentially with different page indexes pasted each time. Label each run: "Client/Unit: [Name] | Maintenance Pass: [Date]"

Before delivering, show me a change summary grouped as:
- Pages to create (with page type)
- Pages to update (grouped by: temporal updates, new detail appended, context variations added)
- Contradictions found (with both versions and sources)
- Synthesis opportunities (cross-page patterns worth investigating)
- Precedent/causal flags (if any)

Wait for my confirmation before finalizing.

(In manual mode: the LLM outputs the full change summary in one response. Review it, then reply "proceed" or "revise [specific item]" to trigger the final pass.)
```

---

## What You'll Get

A change summary with temporal updates, context variations, contradictions flagged for resolution, synthesis opportunities, precedent/causal flags, and a full operation log. You'll see exactly what changed and why, with room for human judgment before finalizing.

**Next step:** Review the change summary, confirm or adjust any classifications, and log the operation in your _log.md so you have a history of integration patterns.

**Pro tip:** The prompt distinguishes between real contradictions and information that simply changed over time. It won't falsely flag price changes or updated metrics as contradictions.

---

## Thinking Logic (for AI assistants running this prompt)

Before running the maintenance pass, silently work through these checks:

1. **MAINTENANCE GAP:** How long since the last maintenance pass? If more than 14 days, flag this upfront and recommend catching up in priority order: contradictions first, then stale pages, then new content integration.

2. **SOURCE TYPES IN BATCH:** Classify each new source before processing. The same source type classifications from Prompt 02 apply here: narrative, structured data, behavioral, regulatory, incident, semi-structured technical, or visual/creative.

3. **TEMPORAL VS. CONTRADICTION:** Before flagging any difference between new and existing data, determine: did the real-world fact change over time (temporal update), does it apply to a different context (context variation), or do two sources genuinely disagree about the same thing at the same time (actual contradiction)? Getting this wrong creates noise in the wiki.

4. **SYNTHESIS OPPORTUNITY THRESHOLD:** Only flag a synthesis opportunity when a pattern spans 3+ independent sources AND is actionable. Don't flag loose correlations or coincidental mentions.

5. **WIKI SCALE:** If the wiki has 50+ pages, prioritize updates to high-traffic pages (the ones most frequently referenced by other pages) over low-traffic pages.

6. **MULTI-CLIENT AWARENESS:** If the wiki index shows content for multiple clients or business units, ensure zero cross-contamination. A temporal update for Client A should never appear in Client B's maintenance log.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
