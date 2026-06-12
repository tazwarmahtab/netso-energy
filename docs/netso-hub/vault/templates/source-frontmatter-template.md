<!-- GTM Knowledge System Kit | Created by Ayush Poddar | startupgtm.pro -->
# Source Frontmatter Template

Add this YAML frontmatter block to every raw source file you drop into wiki/raw/.

```yaml
---
created: YYYY-MM-DD
type: wiki-source
source-type: article | post | research | newsletter | transcript | data
status: pending-ingest
source-url: https://example.com/article-title
wiki-pages-touched: []
ingested-date:
---
```

## Field Definitions

**created**: The date you added this source to the wiki. Use YYYY-MM-DD format.

**type**: Always `wiki-source`. This tells the LLM this file is a raw source, not a wiki page.

**source-type**: What kind of source this is. Matches the raw/ subfolder:
- `article` - Blog posts, news articles, web content (goes in raw/articles/)
- `post` - Social media posts, LinkedIn posts, tweets (goes in raw/posts/)
- `research` - Market research, reports, surveys, data exports (goes in raw/research/)
- `newsletter` - Email newsletters, industry updates (goes in raw/newsletters/)
- `transcript` - Call recordings, meeting notes, podcast transcripts (goes in raw/transcripts/)
- `data` - CSVs, spreadsheets, analytics exports (goes in raw/data/)

**status**: Tracks processing state.
- `pending-ingest` - Not yet processed. The LLM will pick this up during batch-ingest.
- `ingested` - Processed. The LLM has extracted information and created/updated wiki pages.

**source-url**: Where this content came from. Leave blank for internal documents.

**wiki-pages-touched**: After ingestion, the LLM fills this with a list of every wiki page that was created or updated from this source. Stays empty until processed.

**ingested-date**: The LLM fills this after processing. Shows when the source was ingested.

## File Naming Convention

Name your source files: `YYYY-MM-DD-short-description.md`

Examples:
- `2026-04-08-acme-corp-pricing-announcement.md`
- `2026-04-10-gong-transcript-prospect-call.md`
- `2026-04-12-hubspot-feature-comparison-q2.md`
- `2026-04-15-market-research-ai-sales-tools.md`

The date prefix keeps sources sorted chronologically. The slug after the date should be short and descriptive enough that you can find it later.
