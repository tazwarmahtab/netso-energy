<!-- GTM Knowledge System Kit | Created by Ayush Poddar | startupgtm.pro -->
# Synthesis Page Template

Syntheses are the highest-value pages in the wiki. They connect dots across multiple pages to reveal insights that no single source contains.

A good synthesis takes a pattern, connects it to an entity's behavior, ties it to a concept, and produces a strategic insight. If patterns are "what's happening," syntheses are "what it means."

Don't force these. They emerge naturally as the wiki grows. The LLM creates synthesis pages during ingestion when it spots cross-cutting connections. You can also create them manually when you see something the LLM missed.

```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: synthesis
pages-connected: []
source-count: 0
sources: []
related: []
---
```

## Insight

<!-- One sentence. The cross-cutting finding. This should be something you couldn't know from reading any single source. -->

## Evidence Chain

<!-- Which wiki pages connect to form this insight? Show the chain of reasoning using [[wikilinks]]. -->

1. [[page-one]] shows that...
2. [[page-two]] reveals...
3. Combined with [[page-three]], this means...

## Supporting Data

<!-- Specific facts from the connected pages that support this synthesis. Pull the key data points. -->

- From [[page-name]]: Specific fact with date
- From [[page-name]]: Specific fact with date

## Implications

<!-- What does this insight mean for your decisions? How should it affect strategy, positioning, content, or resource allocation? Be specific. -->

## Open Questions

<!-- What do you still not know? What would strengthen or invalidate this synthesis? This drives future research. -->

- Question 1
- Question 2

## Connected Pages

<!-- All wiki pages that contributed to this synthesis. Broader than the evidence chain since some pages provide context without being part of the core argument. -->

- [[page-name]] - Role in this synthesis

## Sources

- [[YYYY-MM-DD-source-slug]] - What this source contributed

<!--
NAMING CONVENTION: synthesis-name.md (kebab-case, lowercase)
Examples: pricing-shifts-drive-switching.md, trust-beats-features-in-enterprise.md

WHERE IT GOES: wiki/pages/syntheses/
-->
