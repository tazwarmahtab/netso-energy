# Prompt 10: Synthesis Generator

**Purpose:** Create cross-cutting insight pages that connect dots across multiple wiki pages. Syntheses are the highest-value pages in the wiki because they surface things no single source contains. This prompt looks across entities, topics, patterns, and concepts to find connections and produce actionable insights.

**When to use:** After you have 10+ wiki pages across at least 3 different page types. Also useful after a batch ingest when new data might create connections that didn't exist before. Run this whenever you suspect there's a pattern connecting multiple things you've been tracking.

---

## Thinking Logic (for AI assistants running this prompt)

Before generating synthesis, silently work through these checks:

1. **SYNTHESIS GOAL CLASSIFICATION:** What is the user looking for? Competitive intelligence insights (connecting competitor moves to market shifts), operational improvements (connecting process patterns to outcomes), market trend identification (connecting data points into a trajectory), or risk/threat detection (connecting warning signals across pages)? Each goal surfaces different types of connections.

2. **PAGE-TYPE DIVERSITY CHECK:** Good synthesis connects DIFFERENT page types (entity + pattern + concept). If all relevant pages are the same type (e.g., 5 entity pages about competitors), the synthesis will be shallow. Flag this: "For stronger synthesis, the wiki needs more [pattern/concept/performance] pages covering this topic."

3. **CONTRADICTION AS INSIGHT:** When two pages contradict each other, the contradiction might BE the insight. A competitor whose pricing differs across sources might be testing pricing segments. A process that works differently in two locations might reveal a best practice. Don't just flag contradictions for resolution. Check if the contradiction itself is informative.

4. **TEMPORAL GAP AWARENESS:** If the sources being synthesized span more than 6 months, note which parts of the synthesis depend on recent vs. older data. A synthesis combining Q1 competitive data with Q3 pricing patterns should flag that the Q1 data may no longer reflect current reality.

5. **NOVELTY VALIDATION:** Check whether this insight already exists as a synthesis page. If yes, suggest what new angle to explore. If the wiki has fewer than 3 synthesis pages, skip this check entirely.

6. **EVIDENCE CHAIN STRENGTH:** Every synthesis should have a clear chain from page A to page B to conclusion C. If any link in the chain is based on a single low-confidence page, flag the weak link. The synthesis is only as strong as its weakest evidence.

---

## The Prompt

```
ROLE: You are a strategic intelligence analyst looking for non-obvious connections across a compiled knowledge base.

I want to generate a new synthesis page for my wiki.

Here are the wiki pages to work with:

[PASTE 4-8 wiki pages from different types. Mix entities, topics, patterns, and concepts for the best results.]

---

SYNTHESIS GOAL CLASSIFICATION (think through first):

What type of synthesis are you aiming for? This shapes which connections matter:

1. COMPETITIVE INTELLIGENCE: Which patterns reveal market positioning shifts or strategy changes?
2. OPERATIONAL IMPROVEMENT: Which connections point to how we should change operations, workflows, or priorities?
3. MARKET TREND IDENTIFICATION: Which dots suggest where the market is moving (not where it is)?
4. RISK/THREAT DETECTION: Which contradictions or gaps signal danger or missed threats?

State your goal. I'll surface the connection types that matter most for that goal.

---

PAGE-TYPE DIVERSITY CHECK:

Good synthesis requires connecting DIFFERENT page types. Check:
- Entity pages (competitors, customers, vendors): What they are and do
- Pattern pages (trends, behaviors, recurring themes): How things move over time
- Concept pages (frameworks, definitions, ways of thinking): The abstractions
- Context pages (market conditions, timing, external factors): The stage

If all the pages you provided are the same type (e.g., all entities), flag this: "All provided pages are [type]. The synthesis will be shallow. To strengthen it, add pages of type [type] and [type]."

If pages are mixed well, proceed.

---

CONTRADICTION-AS-INSIGHT DETECTION:

Sometimes contradictions between pages ARE the insight. Before resolving contradictions, ask:
- Do two sources disagree about competitor pricing, positioning, or strategy? That might mean the competitor is testing approaches.
- Does one source say a market is shrinking while another says it's growing? That might signal market segmentation or category shift.
- Does data conflict about customer adoption? That might reveal different adoption rates across segments.

Don't just flag contradictions for resolution. Ask: Is the contradiction itself informative? If yes, put it at the center of the synthesis.

---

NOVELTY VALIDATION:

Before presenting a synthesis, check: Is this actually new? 

- If the insight already exists in an existing synthesis page or is obvious from any single source alone, don't force it.
- Instead, say: "This insight is already captured in [existing page]. What new angle would strengthen your knowledge? Consider synthesizing [different page types] to find [different angle]."
- Push for cross-cutting findings that no single page reveals.

SPARSE WIKI EXCEPTION: If the wiki has fewer than 3 synthesis pages, skip the novelty check. With so few synthesis pages, everything is effectively novel. Instead, focus on identifying the single most actionable cross-page connection. Note at the top of your output: "Novelty check skipped. Wiki has [N] synthesis pages, which is too few for meaningful comparison. This synthesis is treated as new by default."

---

TEMPORAL GAP AWARENESS:

If the sources span more than 6 months, flag it:

"Sources span from [date] to [date]. The older data may not reflect current reality. Parts of this synthesis depend on [old dates], which may be outdated."

Break out which claims depend on recent data (last 3 months) vs. older data (6+ months old). Recommend which older sources need updating.

---

FALLBACK FOR WEAK CONNECTIONS:

If the wiki doesn't have enough diverse pages to produce meaningful synthesis:

"These pages don't connect in a meaningful way. The wiki is missing [source types]. To make synthesis possible, ingest [page type] data about [topic]. Once you have [specific types], I can synthesize [the insight you're looking for]."

---

## SYNTHESIS CONSTRUCTION:

Look across the provided pages and find a cross-cutting insight. The synthesis must answer at least one of these:
- What pattern connects these entities, topics, or trends?
- What becomes visible when you look at these pages together that isn't visible in any single page?
- What strategic decision or action does this combined view point toward?

Create a synthesis page following WIKI-SCHEMA.md format:

```yaml
---
created: [TODAY'S DATE]
updated: [TODAY'S DATE]
type: wiki-page
page-type: synthesis
synthesis-goal: [competitive intelligence | operational improvement | trend identification | risk detection]
pages-connected: [list every page that contributed]
source-count: [total unique sources across connected pages]
source-recency: [date range of sources: oldest to newest]
sources: [list unique source summaries with dates]
related: []
---
```

Required sections:

1. INSIGHT
   One sentence. The cross-cutting finding that doesn't exist in any single page alone.

2. EVIDENCE CHAIN
   Walk through the reasoning step by step using [[wikilinks]]. Show how page A connects to page B connects to page C to produce the insight. Number each step. Make the logic explicit and checkable.

3. SUPPORTING DATA
   Specific facts with dates pulled from connected pages. Each fact must cite its source page. Flag any data older than 6 months: "[claim from old data] (date from page X, may be outdated)"

4. CONTRADICTIONS DETECTED (if any)
   If pages disagree about something, put it here. Don't hide it. Explain: "This may indicate [what the disagreement reveals]" rather than resolving it away.

5. IMPLICATIONS
   What does this mean for actual decisions? Be specific. Not "we should monitor this." Instead: "This means we should [specific action] by [date] because [specific reason backed by data]."

6. OPEN QUESTIONS
   What would strengthen or invalidate this synthesis? What data is missing? Prioritize by: which gaps affect decisions most? This section drives your next research cycle.

7. CONNECTED PAGES
   All wiki pages that contributed, with a note on each page's role: source entity / trend data / context / framework / contradiction point / risk signal.

Suggest a filename in kebab-case that captures the core insight.

---

## QUALITY GATE:

Before delivering the synthesis:
- Is the insight something you couldn't get from reading any single page? (If no, kill it.)
- Does the evidence chain hold? (Walk through it yourself.)
- Are implications actionable and specific? (If vague, tighten them.)
- Would a decision-maker use this? (If unsure, rewrite implications.)
```

---

## What You'll Get

A synthesis page that connects wiki pages into a single actionable insight. The evidence chain makes the reasoning transparent and verifiable. The temporal awareness flags when data has aged. The contradiction section surfaces insights hidden in disagreement. The implications section turns it into something your team can actually act on. The open questions drive your next research cycle.

**Pro tip:** The best syntheses combine pages that seem unrelated. An entity page plus a pattern page plus market context often surfaces something that three entity pages won't. Mix types, not categories. And when pages contradict, that's often where the real discovery lives.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
