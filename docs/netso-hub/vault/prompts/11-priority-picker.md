# Prompt 11: Priority Picker

**Purpose:** After running the Knowledge Audit (Prompt 01), you'll have several knowledge domains ranked by impact. This prompt picks the single best domain to build first by classifying each one by type and applying type-specific scoring criteria. It also flags source readiness as a go-no-go gate, not just a nice-to-have.

**When to use:** Right after Prompt 01 (Knowledge Audit). You have your ranked domains but aren't sure which to tackle first.

---

## The Prompt

```
[PASTE YOUR KNOWLEDGE AUDIT OUTPUT HERE (from Prompt 01). If you're running this in a new session or a different tool, include the full list of knowledge areas with their current-location and cost-metric data. Without this, I can't score your domains accurately.]

You are a strategic operations advisor helping me decide where to invest effort first.

Based on the knowledge audit above, I need to pick one knowledge domain to build a compiled wiki for first. A compiled wiki is a structured, interlinked knowledge base that an AI maintains and updates, rather than raw document search.

Before scoring, classify each knowledge area by type. Different types need different scoring criteria:

Type A - Operational knowledge (team productivity): Score by weekly hours wasted re-deriving, number of people who'd query it, and how often the knowledge changes.

Type B - Revenue/growth knowledge (deals, pipeline, positioning): Score by direct impact on win rates, pipeline velocity, or churn. Also score on how many customer-facing team members would use it.

Type C - Risk/compliance knowledge (regulatory, legal, safety, quality): Score by cost of getting it wrong (fines, audit failures, legal exposure, safety incidents), how frequently regulations or requirements change, and how many compliance-dependent decisions happen per month.

Type D - Strategic/competitive knowledge (positioning, market intelligence): Score by how often strategic decisions depend on this information, how quickly the landscape changes, and how directly it shapes product or go-to-market direction.

Type E - Personal IP / founder knowledge (solo operators, small teams): Score by how often you need to recall this during client work or sales, how much of your competitive advantage depends on pattern recognition across past work, and how replaceable this knowledge is if you stopped being available.

For each knowledge area from the audit:
1. Assign a type (A through E)
2. Score it using the criteria that match its type (High / Medium / Low for each criterion)
3. Rate source readiness as a go/no-go gate, not just a factor: What percentage of raw sources already exist in a format an AI could read? If over 70% of the critical sources for a domain are locked in systems that can't be exported (ERP, POS, databases), or exist only as verbal/observational knowledge (WhatsApp groups, in-person handoffs), that domain is NOT buildable yet. Recommend the data consolidation work that needs to happen first, then pick the next-highest-priority domain where sources are actually accessible.

Then recommend the single highest-priority starting point. If my organization runs multiple distinct customer motions or business lines and no single domain covers all of them, recommend the domain that creates the most cross-domain learning (one that feeds into or informs the others).

For your recommendation, explain:
- Why this one wins
- What makes it the fastest to show results
- What source readiness work (if any) needs to happen before building can start
- Why the other areas should come later, not first

If any knowledge area scored as Type C (risk/compliance), flag it separately. Compliance knowledge may not be the highest-ROI starting point, but if the risk of not having it is severe enough, it might need to be prioritized on risk grounds regardless of efficiency scoring.

If you end up recommending a Type C (risk/compliance) domain over the highest-efficiency domain, explain why the risk justification overrides the efficiency ranking. Don't present two conflicting recommendations. Pick one, defend it, and explain the tradeoff.
```

---

## What You'll Get

Type classification for each knowledge area, type-specific scoring, source readiness assessment, single recommendation with defense, compliance risk flag if applicable.

**Next step:** Take your winning domain and use Prompt 12 (Schema Builder) to design the wiki structure for it. Or jump straight to Prompt 02 (First Ingest) if you're using the default WIKI-SCHEMA.md from the Kit.

---

## Thinking Logic (for AI assistants running this prompt)

Before scoring knowledge areas, silently work through these checks:

1. **AUDIT CONTEXT CHECK:** Did the user paste the knowledge audit output? If not, check if we're in the same conversation where Prompt 01 was run. If the audit data isn't available, ask for it before scoring. Scoring without audit data produces generic recommendations.

2. **TYPE CLASSIFICATION ACCURACY:** Each knowledge area should clearly fit one type (A through E). If an area spans two types (e.g., competitive intelligence that's both strategic AND revenue-connected), assign the type that drives the PRIMARY use case. Note the secondary type as additional context.

3. **SOURCE READINESS GATE:** This is a go/no-go check, not a soft factor. If more than 70% of the critical sources for a domain are locked in unexportable systems or exist only as verbal knowledge, that domain is NOT buildable yet. Don't recommend it. Recommend the data extraction work needed, then move to the next-highest-priority domain.

4. **CROSS-DOMAIN VALUE:** If two domains are close in score, prefer the one that feeds into other domains. Competitive intelligence feeds into deal prep, content strategy, and product positioning. Customer feedback feeds into product decisions and content. The domain with the most downstream connections wins ties.

5. **COMPLIANCE OVERRIDE:** If any Type C (risk/compliance) domain has severe consequences for failure (regulatory fines, legal exposure, safety incidents), it may override the highest-efficiency domain. If this happens, explain the tradeoff clearly. Don't present two conflicting recommendations.

6. **SINGLE RECOMMENDATION:** Output one recommendation with clear defense. Not "you could do A or B." Pick one and explain why.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
