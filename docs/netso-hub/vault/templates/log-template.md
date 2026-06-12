<!-- GTM Knowledge System Kit | Created by Ayush Poddar | startupgtm.pro -->
# Wiki Operations Log

Append-only. The LLM adds one entry every time it performs an operation on the wiki.

Each entry format: ## [YYYY-MM-DD] operation | description

Operations: ingest, batch-ingest, query, lint, init

To see the last 10 entries:
```bash
grep "^## \[" wiki/pages/_log.md | tail -10
```

---

## [YYYY-MM-DD] init | Wiki system initialized

<!--
HOW THIS FILE WORKS

Every wiki operation gets logged here. One entry per operation. The LLM appends to this file after every ingest, query, lint, or batch process.

Entry examples:

## [2026-04-08] ingest | acme-corp-pricing-blog.md | Created entity page for ACME Corp, updated pricing-comparison, flagged 0 contradictions
## [2026-04-08] query | "What is our strongest positioning against HubSpot?" | Referenced 3 pages, answer provided
## [2026-04-11] lint | Weekly health check | 2 stale pages, 1 contradiction, 0 orphans
## [2026-04-11] batch-ingest | 5 sources processed | 3 pages created, 7 updated, 1 contradiction flagged

The log serves two purposes:
1. Audit trail: you can see what changed and when
2. Health signal: if the log hasn't had an entry in 2+ weeks, the wiki is going stale

The Friday lint check reads this log to assess wiki activity for the week.
-->
