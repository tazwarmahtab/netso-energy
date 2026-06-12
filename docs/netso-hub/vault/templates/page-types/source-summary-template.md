<!-- GTM Knowledge System Kit | Created by Ayush Poddar | startupgtm.pro -->
# Source Summary Page Template

The LLM creates one of these automatically every time it ingests a raw source. You generally won't create these by hand, but the template shows the expected structure.

Source summaries are the bridge between raw input and compiled knowledge. They make the wiki auditable because you can always trace a claim back through the summary to the original source.

```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: source-summary
source-file: raw/articles/YYYY-MM-DD-filename.md
source-type: article | post | research | newsletter | transcript | data
source-url: https://...
pages-touched: []
---
```

## Source Metadata

- **Title:** 
- **Author:** 
- **Date published:** YYYY-MM-DD
- **URL:** 
- **Source type:** article | post | research | newsletter | transcript | data

## Key Takeaways

<!-- 3-5 bullet points. The most important things from this source. Each should be a complete, standalone fact. -->

- Takeaway 1
- Takeaway 2
- Takeaway 3

## Extracted Facts

<!-- Specific, date-stamped claims pulled from the source. These are the atomic units that get distributed across wiki pages during ingestion. -->

- As of YYYY-MM-DD: "Specific factual claim from the source." 
- As of YYYY-MM-DD: "Another specific claim."

## Contradictions

<!-- Anything in this source that conflicts with what's already in the wiki. If nothing contradicts, say so. -->

- Contradicts [[existing-page]]: This source says X, but the wiki currently says Y. Flagged for review.

<!-- If no contradictions: -->
<!-- No contradictions with existing wiki pages found. -->

## Pages Touched

<!-- List of every wiki page that was created or updated when this source was ingested. The LLM fills this in automatically. -->

- [[page-name]] - Created / Updated: what changed

<!--
NAMING CONVENTION: YYYY-MM-DD-source-slug.md (date-prefixed, matches the raw source filename)
Examples: 2026-04-08-acme-pricing-announcement.md, 2026-04-10-gong-call-prospect.md

WHERE IT GOES: wiki/pages/sources/
-->
