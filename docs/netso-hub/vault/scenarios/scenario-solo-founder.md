# Scenario: Solo Founder / Operator

## Who You Are

Running a bootstrapped or early-stage startup solo (or with 1-2 people). You do sales, support, marketing, and product. Your brain is full. You learn from podcasts, newsletters, competitors, customer calls, and your own experiments. Nothing is organized.

## Your Pain

You know something's important (a customer insight, a feature idea, something a competitor did) but by tomorrow you've forgotten where you learned it. You repeat the same research. You make the same mistakes twice because you didn't document what you learned the first time. When you sit down to write content or make a product decision, you start from scratch every time instead of building on what you already know.

## Start With This Schema

Copy WIKI-SCHEMA.md into your wiki folder. Keep it minimal. You'll use:

- **wiki/pages/entities/** for customers, competitors, your own company
- **wiki/pages/concepts/** for customer pain points, positioning, feature ideas
- **wiki/pages/topics/** for customer segment overviews, competitor landscape
- **wiki/pages/patterns/** for recurring customer needs, competitor moves, market trends
- **wiki/pages/market/** for ICP profile, customer signals, metrics

You probably won't use brands/ or syntheses/ until month 2. That's fine. Start small.

## Before You Start

**New in this version:** Run Prompt 15 (Stage-Specific Roadmap) to get a buildout plan calibrated to your hours and stage. For a solo founder, this prevents over-building. Also use Prompt 13 (Source Prioritizer) to figure out which of your scattered sources to ingest first.

## Your First 10 Raw Sources

1. Last 10 customer conversation notes (from Slack, email, Notion, wherever they are)
2. Your top 5 completed customer support tickets
3. Last month of your own Twitter or LinkedIn posts (what you've been thinking about)
4. 3 podcasts or newsletters you consumed recently (transcript or detailed notes)
5. Competitor pricing pages for your top 3 competitors
6. Last 5 feature requests or ideas you've written down
7. Your last monthly or quarterly metrics review
8. Notes from your last 3 sales conversations with prospects
9. Any customer feedback or survey responses you have
10. A list of everything you've shipped in the last 3 months

## Implementation Steps

### Step 1: Create the folder structure and schema

```bash
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
```

Create wiki/WIKI-SCHEMA.md. Copy the schema from the Kit, then add your context at the top:

```markdown
# My GTM Knowledge System

## I'm using this to:
- Remember customer insights I keep forgetting
- Make informed product decisions without re-researching
- Respond to support faster by knowing what's been asked before
- Track what my competitors are doing
- Turn what I learn into content instead of letting it disappear
```

### Step 2: Dump everything into wiki/raw/

Don't overthink the organization. Customer conversations go in wiki/raw/transcripts/. Articles and competitor pages go in wiki/raw/articles/. Your own notes go in wiki/raw/data/. Just get them in there.

### Step 3: Run your first ingest

Use Prompt 02 (First Ingest). Since you're solo, you can process all 10 sources at once:

```
I'm a solo founder. Process all 10 sources (everything I've learned in the last month
about customers, competitors, ideas, and metrics):

[paste all 10 sources]

Create exactly these pages:
1. wiki/pages/entities/customer-profile.md (who my customers are)
2. wiki/pages/concepts/customer-insights.md (what they need, problems I solve)
3. wiki/pages/entities/competitor-overview.md (each competitor, pricing, positioning)
4. wiki/pages/concepts/feature-ideas.md (things I've thought about building)
5. wiki/pages/market/my-metrics.md (current numbers, trends, targets)

For each page: extract direct quotes from sources, date everything, highlight contradictions.
Make each page scannable. I'll read this when I wake up or before customer calls.
```

### Step 4: Use it daily

Every morning, quick briefing:

```
Quick briefing from wiki/pages/:
- One insight from customer-insights.md that should affect what I work on today
- One competitor move from entities/
- Status of metrics from market/my-metrics.md
- One feature idea from concepts/feature-ideas.md worth reconsidering
```

After every customer call, new insight, or discovery:

```
I just learned [what they said / what I noticed].
Which wiki page does this update? Show me the updated version.
```

### Step 5: Weekly review (15 minutes)

Every Sunday or Monday, run Prompt 07 (Weekly Maintenance Pass) on your pages. It takes 15 minutes and catches things you'd otherwise forget. Then ingest any new sources from the past week.

### Step 6: Turn wiki knowledge into content

This is where solo founders get the most leverage. Your wiki is a content engine:

```
Using wiki/pages/concepts/customer-insights.md and wiki/pages/patterns/,
what are 5 content ideas I could write about this week?
For each, cite the wiki page and specific insight it's based on.
```

Every post you write comes from something real in the wiki, not from staring at a blank page.

## Next Steps to Expand

- wiki/pages/concepts/decision-log.md (what you decided and why, so you stop re-debating)
- wiki/pages/patterns/experiment-results.md (what you tried, what happened)
- wiki/pages/market/revenue-patterns.md (which customers are most valuable, why)
- wiki/pages/concepts/content-ideas.md (things you could write about, sourced from the wiki)
- wiki/pages/performance/what-works.md (which channels, messages, and tactics work)

By month 2, you should have 20-30 pages. The wiki becomes your second brain: everything you learn goes in, and it comes back out when you need it.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
