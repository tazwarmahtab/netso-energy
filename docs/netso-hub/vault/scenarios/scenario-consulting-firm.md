# Scenario: Consulting / Professional Services Firm

## Who You Are

Managing partner or practice lead at a 5-50 person consulting firm. Your knowledge lives in project deliverables, partner memories, client emails, and proposals. When a partner leaves, years of client context walk out the door.

## Your Pain

You win deals because of deep relationships and demonstrated expertise. But that expertise isn't written down. It's in your head and the heads of 2-3 senior people. New consultants ask the same discovery questions on every engagement. You can't easily tell a prospect what you've done in their industry, what methodologies you'd apply, or what outcomes to expect. Every proposal gets written from scratch because nobody can find the last one that was similar.

## Start With This Schema

Copy WIKI-SCHEMA.md into your wiki folder. You'll use these page types:

- **wiki/pages/entities/** for clients, partners, industry bodies, key contacts
- **wiki/pages/concepts/** for methodologies, frameworks, and engagement models
- **wiki/pages/topics/** for industry expertise and service area overviews
- **wiki/pages/patterns/** for recurring engagement patterns (success factors, risk signals, typical timelines)
- **wiki/pages/performance/** for what works (successful approaches, client outcomes, ROI data)
- **wiki/pages/brands/** for per-client knowledge (brand voice, preferences, key contacts)
- **wiki/pages/syntheses/** for cross-industry insights

## Before You Start

**New in this version:** Prompt 14 (Team-Specific Builder) is designed for teams with specific knowledge flows between roles. For consulting firms, it helps design a wiki where consultants feed engagement data and everyone queries it. Prompt 12 (Schema Builder) can customize the schema for professional services domains.

## Your First 10 Raw Sources

1. Last 5 project proposals (the most recent year)
2. 3 client case studies or testimonials (including your approach, their outcomes)
3. Top 3 partner email threads about client strategy or patterns
4. A summary of your last 5 engagements (scope, industry, client type, outcome)
5. Any process documentation or methodology guides you have
6. Feedback from your last 3 clients (surveys, testimonials, feedback emails)
7. 2 RFP responses where you explained your approach
8. Internal notes from your last partner meeting (strategic context)
9. A list of all clients from the last 3 years with one-line descriptions
10. Any thought leadership content you've published (blog posts, articles, guides)

## Implementation Steps

### Step 1: Create the folder structure

```bash
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p wiki/_archive
```

### Step 2: Set up your schema

Create wiki/WIKI-SCHEMA.md by copying the schema from the Kit. Add your firm's context at the top:

```markdown
# [Firm Name] Knowledge System

## Purpose
Capture client and engagement knowledge so it compounds across the firm instead of living in individual partners' heads.

## Quick lookup
- "What have we done in financial services?" -> wiki/pages/topics/financial-services.md
- "What's our approach to process improvement?" -> wiki/pages/concepts/process-improvement.md
- "Who knows this industry best?" -> wiki/pages/entities/partner-expertise.md
- "What worked on similar engagements?" -> wiki/pages/performance/what-works.md
```

### Step 3: Run first ingest on sources 1-5

Use Prompt 02 (First Ingest). The LLM will create:

- wiki/pages/topics/our-expertise-overview.md (what this firm knows how to do)
- wiki/pages/concepts/methodologies.md (your approaches to different engagement types)
- wiki/pages/entities/[client-name].md (for each major client mentioned)
- wiki/pages/sources/[source-summary].md (one per raw source)
- wiki/pages/performance/what-works.md (successful approaches, outcomes, ROI)

For each engagement, the pages should capture: what was decided, what approach was used, what alternatives were considered, what the outcome was, and who led it.

### Step 4: Process sources 6-10

Use Prompt 03 (Batch Ingest) to add:

- wiki/pages/concepts/industry-patterns.md (industries you serve, what each needs)
- wiki/pages/entities/partner-expertise.md (who knows what, partner profiles)
- wiki/pages/topics/[industry]-deep-dive.md (for each major industry served)
- wiki/pages/patterns/engagement-patterns.md (typical timelines, success factors, risk signals)

### Step 5: Validate with a real scenario

Before your next pitch:

```
I'm about to pitch a [INDUSTRY] firm on a [TYPE] engagement.
Using wiki/pages/, build a one-page pre-call brief:

1. What [INDUSTRY] clients have we worked with?
2. What's our approach to [TYPE] engagements?
3. Do we have case studies I can reference?
4. Which partner knows this industry best?
5. What's worked in similar engagements before?

Cite every answer back to wiki pages.
```

### Step 6: Build the maintenance habit

Run Prompt 07 (Weekly Maintenance Pass) every week. After every completed engagement, write a brief summary and ingest it as a new source. This is how the wiki compounds: every client interaction feeds the next proposal.

## Next Steps to Expand

- wiki/pages/concepts/decision-frameworks.md (how you scope, price, and staff engagements)
- wiki/pages/patterns/risk-patterns.md (what goes wrong and how you prevent it)
- wiki/pages/syntheses/[industry]-insights.md (cross-client patterns within an industry)
- wiki/pages/market/[industry]-landscape.md (market dynamics in your focus industries)
- wiki/pages/concepts/pricing-model.md (how you price, what works, common objections)

By month 2, new consultants should be able to read 8-10 wiki pages and show up to their first client meeting with context that used to take 3-4 months to develop.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
