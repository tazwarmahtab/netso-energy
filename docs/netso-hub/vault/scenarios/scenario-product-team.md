# Scenario: Product / Engineering Team

## Who You Are

Head of Product or PM lead at a growth-stage startup. You have a product org (PMs, designers, engineers) and you're building a complex product with lots of context. Decisions are scattered across Confluence, Linear, Slack, and meeting recordings.

## Your Pain

You need to make a decision about feature architecture, but you can't remember why you decided against this approach two quarters ago. Someone on the team has the context you need but they're in another meeting. Critical user research insights are buried in a Google Doc nobody can find. When engineers or new PMs onboard, there's no single place to learn how you got here and why things are built the way they are.

The cost isn't just time. It's repeated mistakes. Teams re-litigate decisions that were already made because the reasoning wasn't captured. Engineers build things that contradict research findings because the findings never made it out of a slide deck.

## Start With This Schema

Copy WIKI-SCHEMA.md into your wiki folder. You'll use:

- **wiki/pages/entities/** for user personas, customer segments, competitor profiles
- **wiki/pages/concepts/** for design frameworks, principles, research findings
- **wiki/pages/topics/** for feature area overviews, architectural domains
- **wiki/pages/patterns/** for recurring design decisions, lessons learned, past choices
- **wiki/pages/performance/** for metrics that matter, what's working, known issues
- **wiki/pages/market/** for customer ICP fit, buying criteria, competitive positioning
- **wiki/pages/syntheses/** for cross-cutting insights connecting features, users, and data

## Before You Start

**New in this version:** Product teams often need a different schema than the GTM default. Run Prompt 12 (Schema Builder) to design page types that match your workflow (user segments, features, research sessions instead of brands and market pages). Prompt 14 (Team-Specific Builder) helps design the wiki for how PMs, designers, and engineers actually collaborate.

## Your First 10 Raw Sources

1. Last 5 PRDs (Product Requirement Documents) or feature specs
2. Last 3 months of product team meeting notes
3. Architectural Decision Records (ADRs) or equivalent from your engineering team
4. Last 2 user research studies (synthesis documents or raw insights)
5. Linear/Jira tickets from your last sprint tagged "blocked", "rejected", or "high-context"
6. Customer feedback from the last quarter (from support, sales, or interviews)
7. Your latest product roadmap or quarterly planning document
8. Email threads where you've explained a product decision to someone
9. Competitive analysis or market research relevant to your product
10. A summary of your last 3 product launches (what worked, what didn't)

## Implementation Steps

### Step 1: Create the folder structure

```bash
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p wiki/_archive
```

### Step 2: Set up your schema

Create wiki/WIKI-SCHEMA.md with your product context:

```markdown
# [Product Name] Knowledge System

## Purpose
Capture product decisions, user insights, and architectural context so the team stops re-deriving what we already know.

## Quick lookup
- "Why did we build it this way?" -> wiki/pages/patterns/major-decisions.md
- "What do users actually want?" -> wiki/pages/concepts/user-research-insights.md
- "What's the competitive context?" -> wiki/pages/market/competitive-context.md
- "What's working in the product?" -> wiki/pages/performance/metrics-and-kpis.md
```

### Step 3: Run first ingest on sources 1-5

Use Prompt 02 (First Ingest). The LLM will create:

- wiki/pages/topics/product-overview.md (what you're building, for whom, why)
- wiki/pages/entities/user-personas.md (who uses your product, their jobs to be done)
- wiki/pages/concepts/key-design-frameworks.md (principles guiding your design)
- wiki/pages/topics/architecture-overview.md (system structure, key design choices)
- wiki/pages/patterns/major-decisions.md (biggest decisions in last 6 months, with reasoning)

For each decision, the page should capture: what was decided, what alternatives were considered, why you chose this path, who made the call, and when.

### Step 4: Process sources 6-10

Use Prompt 03 (Batch Ingest) to add:

- wiki/pages/concepts/user-research-insights.md (synthesized findings from research)
- wiki/pages/topics/feature-roadmap.md (what's planned and why)
- wiki/pages/patterns/design-patterns.md (solutions to recurring design problems)
- wiki/pages/performance/metrics-and-kpis.md (what you're measuring, what's working)
- wiki/pages/market/competitive-context.md (how competitors solve similar problems)

### Step 5: Validate before a product decision

Before your next big decision:

```
We're considering [new feature or architecture direction].
Using wiki/pages/, pull together:

1. Previous decisions that inform this (from patterns/)
2. Relevant user research (from concepts/)
3. How competitors are solving this (from market/)
4. Architectural constraints we need to consider (from topics/)
5. A one-page recommendation

Reference wiki pages explicitly using [[wikilinks]].
```

If the wiki answers the question with sourced data, it's working. If it can't, the gaps tell you what research to do before deciding.

### Step 6: Make it part of the product process

- After every user research study, ingest the synthesis doc
- After every product launch, write a retro summary and ingest it
- After every architectural decision, add it to wiki/pages/patterns/major-decisions.md
- Run Prompt 07 (Weekly Maintenance Pass) every other week

## Next Steps to Expand

- wiki/pages/performance/technical-debt-registry.md (tech debt, why it exists, when you'll fix it)
- wiki/pages/concepts/user-scenarios.md (detailed user journeys informing design)
- wiki/pages/patterns/what-didnt-work.md (failed experiments, lessons learned)
- wiki/pages/syntheses/feature-user-connection.md (which features map to which user needs)
- wiki/pages/entities/[competitor]-product.md (detailed competitor product profiles)

By month 2, new PMs should be able to read 10 wiki pages and understand the product's history, architecture, and design reasoning well enough to make informed decisions in their first week.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
