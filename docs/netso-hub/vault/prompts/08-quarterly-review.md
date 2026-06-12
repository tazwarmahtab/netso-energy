# Prompt 08: Quarterly Review

**Purpose:** Deep strategic review of your wiki every quarter. The weekly maintenance catches tactical issues. The quarterly review asks bigger questions: Is the wiki covering the right things? What changed in the market? What should the wiki look like next quarter?

**When to use:** Once per quarter. Block 60-90 minutes. This is where you reshape the wiki's focus based on what you've learned.

---

## Thinking Logic (for AI assistants running this prompt)

Before running the review, silently work through these checks:

1. **WIKI TYPE CLASSIFICATION:** Is this a single-domain or multi-domain wiki? Personal or team? Regulated or standard? Each type has different health criteria. A personal competitive intel wiki has different standards than a team-wide compliance wiki.

2. **INDUSTRY PACE:** How quickly does information in this domain change? Fintech, SaaS, and developer tools are fast-moving (30-day staleness thresholds). Legal, manufacturing, and pharma are slow-moving (90-day thresholds). Use the staleness table, not a single default.

3. **PRIOR REVIEW COMPARISON:** If the user provides data from a previous quarterly review, compare: did page count grow? Did staleness improve or worsen? Are the same issues recurring? Recurring issues indicate systemic problems (source pipeline broken, maintenance cadence too infrequent) not just individual page problems.

4. **MARKET CONTEXT:** Before reviewing internal wiki health, check if any wiki pages reference market conditions, competitive landscape, or regulatory changes. External changes may make existing pages stale faster than the normal cycle would suggest.

5. **REALISTIC SCORING:** Don't rate everything as "strong." If a 45-page wiki has 12 stale pages and 5 unresolved contradictions, that's a "needs attention" rating, not "adequate." Be direct.

6. **ACTIONABLE RECOMMENDATIONS:** Every issue flagged should have a specific fix action with effort estimate and suggested owner. "Update the Gong entity page" is actionable. "Improve wiki quality" is not.

---

## The Prompt

```
ROLE: You are a knowledge systems analyst conducting a quarterly health review of a wiki-based knowledge base.

It's [FILL IN: Q1/Q2/Q3/Q4 YYYY] and I'm doing a quarterly knowledge review.

Here's my complete wiki:

WIKI INDEX:
[PASTE your _index.md]

ALL WIKI PAGES:
[PASTE all wiki pages]

OPERATIONS LOG:
[PASTE your _log.md]

---

CONTEXT CLASSIFICATION (think through before reviewing):

First, classify your wiki type. This changes what health means:

1. WIKI TYPE: Is this single-domain (fintech, healthcare, one industry) or multi-domain (mixed sectors)? Is it personal knowledge (individual contributor) or team knowledge (distributed)?

2. INDUSTRY PACE: What's your industry's change velocity?
   - FAST (SaaS, fintech, AI): Quarterly reviews may need to shift to monthly. Expect 20-30% of pages to touch market-moving changes per quarter.
   - STANDARD (manufacturing, B2B services): Quarterly is right. Expect 10-15% page refresh per quarter.
   - SLOW (legal, compliance, academic): Semi-annual reviews work. Expect 5-10% page updates per quarter.
   Adjust your recommendations based on this pace.

3. SOURCE TYPES: Does this wiki track competitive entities? Market trends? Regulations? Each source type ages differently. Regulatory pages hold longer. Competitive pricing pages expire quickly.

---

STALENESS THRESHOLDS (adjusted by page type and domain pace):

| Page type | Standard domains | Fast-moving (fintech, SaaS, retail, dev tools) | Slow-moving (legal, manufacturing, pharma) |
|-----------|-----------------|------------------------------------------------|---------------------------------------------|
| Performance / financial / metrics pages | 30 days | 14 days | 60 days |
| Entity pages (competitors, vendors, products) | 60 days | 30 days | 90 days |
| Pattern pages | 60 days | 45 days | 90 days |
| Concept / methodology / framework pages | 90 days | 60 days | 180 days |
| Synthesis pages | 90 days | 60 days | 120 days |

Apply the column that matches your domain. If unsure, use "Standard."

---

MARKET CONTEXT GATHERING:

Before reviewing internal wiki health, I need market context:

If you have market event data: "Before I review, tell me the 2-3 biggest things that happened in your market this quarter. New competitors? Pricing changes? Regulatory shifts? Product launches? Customer behavior changes? This frames where pages should have stale or new information."

Previous Quarters: If you have synthesis pages or reviews from prior quarters, share those. I'll compare Q-over-Q growth, page health trends, and pattern evolution.

---

PRIOR QUARTER COMPARISON (if data exists):

If you provided last quarter's review:
- Growth rate: Total pages. Source count. Coverage of new topics.
- Page health delta: Which pages improved? Which degraded?
- Pattern shifts: Themes that were rising then are now falling (or vice versa).
- Recommendation follow-through: Of the actions you said you'd take, which actually happened?

---

## Five-Area Deep Review:

1. MARKET CHANGES & STALENESS
   - What shifted in your competitive landscape, pricing, or product landscape since last quarter?
   - Which entity pages need major updates (new pricing, new products, leadership changes)?
   - New market entrants that need entity pages?
   - Pattern pages: Are trends rising, falling, or inverted from last quarter?
   - Rate each page for staleness: current / slightly dated / outdated / dangerous if relied on

2. CONTRADICTIONS AND INSIGHT DETECTION
   - What did you learn this quarter that contradicts wiki claims?
   - Flag outdated claims that need correction, but also ask: Is the contradiction itself the insight? Sometimes two sources disagreeing about pricing or positioning means the competitor is testing approaches.
   - What competitors did this quarter that reshapes your assessment?

3. USAGE AND GAPS
   - From your operations log, what queries arrived that the wiki couldn't answer?
   - What gaps showed up most? Missing pages? Thin pages? Pages with no connections?
   - High-value pages (referenced frequently): Keep these current. They're working.
   - Ghost pages (never referenced): Consider removal, consolidation, or repurposing.

4. QUALITY AND SOURCE ASSESSMENT
   - Pages with 5+ sources: Source-rich and reliable.
   - Pages with 1-2 sources: Thin. Risky to depend on. Flag for reinforcement.
   - Synthesis pages: Still accurate with new data? Do they need updating?
   - Rate each page: strong (5+ sources, current data, high-value usage) / needs update (mostly sound but stale) / needs more sources (thin, risky) / consider removing (not used, not connected)

5. NEXT QUARTER ROADMAP
   - Top 5 knowledge gaps to close
   - New page types or topic areas to add
   - Pages to consolidate or remove and why
   - Sources to prioritize ingesting (by expected impact on decisions)
   - Target page count and source count for next quarter

---

## REQUIRED OUTPUT FORMAT:

Executive Summary (5 sentences max)
- State the wiki's health in one sentence
- List the top 2 page updates needed
- Name the biggest gap
- Identify your biggest risk (thin page relied on? outdated synthesis?)
- State the one thing to fix first

RECOMMENDED REVIEW CYCLE:
Based on your domain classification, I recommend a [monthly / quarterly / semi-annual] review cycle. Rationale: [fast-moving domains need more frequent reviews because competitive and financial data shifts quickly; slow-moving domains can review less often because regulatory and methodological data changes on longer cycles].

Health Metrics Table
| Metric | This Quarter | Last Quarter | Delta | Status |
| --- | --- | --- | --- | --- |
| Total pages | | | | |
| Pages rated "strong" | | | | |
| Pages with 5+ sources | | | | |
| Pages never referenced | | | | |
| Pages marked outdated | | | | |

Top Issues Ranked by Impact
1. [Issue] | Impact: [what breaks if unfixed] | Fix effort: [hours] | Owner: [role]
2. [Issue] | Impact: [what breaks if unfixed] | Fix effort: [hours] | Owner: [role]
(Order by: impact × likelihood of causing bad decisions, not just frequency)

Recommended Actions with Priority
- URGENT (next 2 weeks): [action with specific page or gap]
- HIGH (this month): [action]
- MEDIUM (next quarter): [action]

One Paragraph Summary
"State of the wiki entering [next quarter]: [industry pace context] [main wins] [main risks] [one growth direction]"
```

---

## What You'll Get

A strategic overhaul plan for the next quarter. This is where the wiki evolves from a collection of pages into a system that matches your actual business needs. The quarterly review also surfaces which pages are unexpectedly stale (risk) and which are anchoring good decisions (keep fresh).

**Next step:** Keep every quarterly review output in a dedicated file (wiki/pages/syntheses/quarterly-review-[YYYY-QX].md). Over time, these become a historical record of how your market knowledge has evolved and where your foresight succeeded or failed.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
