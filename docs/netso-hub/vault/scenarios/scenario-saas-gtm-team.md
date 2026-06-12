# Scenario: SaaS GTM Team (10-50 people)

## Who You Are

VP of Sales or Head of GTM at a B2B SaaS company with 10-50 people across sales, marketing, and customer success. You use Gong for call recording, HubSpot or Salesforce for CRM, Notion or Confluence for docs, and Slack for communication.

## Your Pain

Competitive intel lives in three places that never talk to each other. There's a Notion page someone updated four months ago. There's a Slack channel where people paste links but nobody scrolls back. Sales reps repeat the same questions ("What does Competitor X charge for enterprise?") and get different answers because nobody knows where the current truth is.

When a new AE joins, it takes 6-8 weeks before they can confidently discuss competitors on a call. When pricing changes, it takes days for the whole team to find out. When you lose a deal, the context of why gets buried in a CRM note that nobody reads.

## Start With This Schema

Copy WIKI-SCHEMA.md into your wiki folder. You'll use these page types heavily:

- **wiki/pages/entities/** for competitor profiles (HubSpot, Salesforce, Outreach, etc.)
- **wiki/pages/topics/** for competitive landscape overview and industry trends
- **wiki/pages/market/** for pricing comparison and buyer signals
- **wiki/pages/patterns/** for trends you spot across competitors and deals
- **wiki/pages/brands/** for competitor positioning and messaging analysis
- **wiki/pages/performance/** for what's working in your outbound and content

## Before You Start

**New in this version:** Before jumping into ingestion, consider running Prompt 11 (Priority Picker) to confirm which knowledge domain to build first. If your team has more than one department using the wiki, Prompt 16 (Cross-Department Connector) helps design the shared structure.

## Your First 10 Raw Sources

1. Last 5 sales call transcripts from Gong (export as .txt or paste the transcript)
2. Top 3 lost deal analyses from your CRM (copy the notes into a single document)
3. Last 2 quarterly competitive reviews (from Notion, Confluence, or wherever they live)
4. Pricing pages for your top 5 competitors (save as .txt from their websites)
5. Last month of Slack posts from #competitive-intel or #deals
6. Your latest pitch deck (the slides where you position against competitors)
7. RFP responses from your last 3 deals (the sections comparing you to alternatives)
8. Email threads from the last quarter where someone explained competitor differences
9. A summary of features you've lost deals over (from your sales manager's notes)
10. Any gated reports or market research you have access to (Gartner, Forrester, G2)

## Implementation Steps

### Step 1: Create the folder structure

```bash
# Run folder-setup.sh from the Kit, or manually:
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p wiki/_archive
```

Put all 10 sources into wiki/raw/. Call transcripts go in wiki/raw/transcripts/. Articles and pricing pages go in wiki/raw/articles/. Research goes in wiki/raw/research/.

### Step 2: Set up your schema

Create wiki/WIKI-SCHEMA.md by copying the schema from the Kit. At the top, add your team's context:

```markdown
# GTM Knowledge System - [Your Company] Competitive Intel

## Purpose
Answer sales and product questions about our competitive landscape in under 60 seconds.

## Scope
- Coverage: [list your top 5 competitors]
- Time period: Last 12 months
- Update frequency: Weekly (pick a day)
- Owner: [Your name, title]

## Quick lookup
- "What does [Competitor] charge?" -> wiki/pages/entities/[competitor].md
- "Where do we lose to [Competitor]?" -> wiki/pages/brands/[competitor]-brand.md
- "What's happening in our market?" -> wiki/pages/topics/competitive-landscape.md
```

### Step 3: Run your first ingest

Use Prompt 02 (First Ingest) from the prompts/ folder. Paste WIKI-SCHEMA.md and your first 5 sources. The LLM will create:

- Entity pages for each competitor mentioned
- A topic page for competitive landscape overview
- A market page for pricing comparison
- Source summary pages for each raw source
- Cross-references between all pages using [[wikilinks]]

After the first ingest, you should have 5-8 wiki pages with real data and [MISSING] tags where gaps exist.

### Step 4: Run your second ingest

Use Prompt 03 (Batch Ingest) with sources 6-10. Paste your _index.md (so the LLM knows what exists) plus the pages most likely to be affected. The LLM will:

- Update existing entity pages with new information
- Create new pages for entities or patterns not yet covered
- Flag contradictions between sources
- Update _index.md and _log.md

### Step 5: Validate it works

Ask your wiki real questions your sales team actually asks:

```
Using only the wiki pages, answer:
1. "What is [Competitor]'s cheapest tier and how does it compare to our base plan?"
2. "We're losing deals to [Competitor]. What's our best response?"
3. "What changed in [Competitor]'s pricing since last quarter?"
4. "Build a comparison table for a prospect currently using [Competitor]"

Cite which wiki pages you're pulling from using [[wikilinks]].
If you can't answer, note what's missing from the wiki.
```

If you get good answers with sources, the wiki is working. If you see gaps, those become your next ingest targets.

### Step 6: Set a weekly cadence

Every week, run Prompt 07 (Weekly Maintenance Pass) to check for stale data, thin pages, and contradictions. After the lint, spend 30 minutes ingesting 2-3 new sources to close the biggest gap.

Suggested schedule:
- **Monday:** Scan Slack #competitive-intel for new intel, save to wiki/raw/
- **Wednesday:** Check top 3 competitors' pricing pages for changes
- **Friday:** Run the weekly maintenance and ingest any new sources

## Next Steps to Expand

Once your competitive intel is solid (usually 3-4 weeks), expand into:

- wiki/pages/concepts/objection-responses.md (map competitor strengths to your responses)
- wiki/pages/patterns/pricing-trends.md (track pricing model changes across competitors)
- wiki/pages/brands/[competitor]-brand.md (analyze how each competitor positions themselves)
- wiki/pages/syntheses/competitive-cross-analysis.md (cross-cutting insights connecting multiple competitors)
- wiki/pages/performance/win-loss-analysis.md (what's working in competitive deals)

By month 2, your wiki should have 40-60 pages. New reps can onboard by reading 5-10 key pages instead of asking the same questions for 6 weeks.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
