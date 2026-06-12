# GTM Knowledge System - Wiki Schema

This file governs how the knowledge wiki operates. Paste it into your LLM session (Claude, ChatGPT, Gemini, or any other model) before performing any wiki operation. It defines the structure, page types, operations, and quality rules.

Everything the LLM needs to maintain your wiki is in this file.

---

## 1. Folder Structure

```
wiki/
  raw/                     <- Immutable source documents. LLM reads, never modifies.
    articles/              <- Blog posts, news articles, web content
    posts/                 <- Social media posts, LinkedIn posts, tweets
    research/              <- Market research, reports, surveys
    newsletters/           <- Email newsletters, industry updates
    transcripts/           <- Call recordings, meeting notes, podcast transcripts
    data/                  <- CSVs, spreadsheets, analytics exports
  pages/                   <- Compiled knowledge. LLM creates and maintains all content here.
    _index.md              <- Master catalog of every wiki page (LLM-maintained)
    _log.md                <- Chronological record of every wiki operation
    entities/              <- People, companies, products, tools
    concepts/              <- Frameworks, mental models, theories, principles
    topics/                <- Broad overviews (GTM strategy, AI agents, competitive landscape)
    sources/               <- One summary page per ingested source
    patterns/              <- Recurring patterns (pricing shifts, hook types, deal cycles)
    syntheses/             <- Cross-cutting insights connecting multiple pages
    performance/           <- What works and what doesn't, by channel, format, or tactic
    brands/                <- Per-brand or per-competitor knowledge profiles
    market/                <- ICP intelligence, buyer signals, market dynamics
  _archive/                <- Old page versions (manual backups)
```

---

## 2. Page Types

Nine page types. Each lives in its own subdirectory under wiki/pages/. Each has a specific purpose and frontmatter format.

### 2.1 Entity Page (wiki/pages/entities/)

**What it tracks:** A single person, company, product, or tool.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: entity
entity-type: company | person | product | tool
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Overview (1-2 paragraphs: what this entity is and why it matters)
- Key Facts (structured: founded, HQ, size, funding, pricing tiers, leadership)
- Timeline (chronological: major events, launches, pricing changes, acquisitions)
- Strengths (from your team's perspective, with sources)
- Weaknesses (from your team's perspective, with sources)
- Related Pages (links to other entities, topics, patterns that connect)
- Sources (list of raw source files this page draws from)

**Naming:** `company-name.md` or `person-name.md` (kebab-case, lowercase)
Examples: `hubspot.md`, `salesforce.md`, `sarah-chen.md`, `gong.md`

---

### 2.2 Concept Page (wiki/pages/concepts/)

**What it tracks:** A framework, mental model, theory, or principle that your team uses.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: concept
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Thesis (one sentence: what this concept claims)
- Explanation (2-3 paragraphs: how it works, when it applies)
- Evidence For (sources and examples supporting the concept)
- Evidence Against (sources and examples challenging it, if any)
- How We Use It (specific applications in your GTM work)
- Related Concepts (links to other concept pages)
- Sources

**Naming:** `concept-name.md` (kebab-case, lowercase)
Examples: `trust-architecture.md`, `context-debt.md`, `jobs-to-be-done.md`

---

### 2.3 Topic Page (wiki/pages/topics/)

**What it tracks:** A broad subject area that spans multiple entities, concepts, and patterns.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: topic
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Overview (what this topic covers and why it matters for GTM)
- Subtopics (list of specific areas within this topic, linked to relevant pages)
- Key Players (entities involved, linked to entity pages)
- Current State (what's happening now, with dates)
- Published on This Topic (your team's content output: date, platform, title, link)
- Coverage Gaps (angles not yet explored, questions not yet answered)
- Related Topics
- Sources

**Naming:** `topic-name.md` (kebab-case, lowercase)
Examples: `competitive-landscape.md`, `ai-agents-in-gtm.md`, `content-strategy.md`

---

### 2.4 Source Summary Page (wiki/pages/sources/)

**What it tracks:** A condensed summary of one raw source document. Created automatically during ingestion.

**Frontmatter:**
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

**Required sections:**
- Source Metadata (title, author, date published, URL)
- Key Takeaways (3-5 bullet points: the most important things from this source)
- Extracted Facts (specific claims with dates: "As of March 2026, HubSpot charges...")
- Contradictions (anything that conflicts with existing wiki pages)
- Pages Touched (list of wiki pages that were created or updated from this source)

**Naming:** `YYYY-MM-DD-source-slug.md` (date-prefixed, matches the raw source filename)
Examples: `2026-04-08-acme-pricing-announcement.md`, `2026-04-10-gong-call-prospect.md`

---

### 2.5 Pattern Page (wiki/pages/patterns/)

**What it tracks:** A recurring trend, behavior, or structural pattern you've observed across multiple sources.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: pattern
frequency: 0
trend: rising | stable | falling | emerging
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Pattern Name and Description (what you're observing)
- Evidence (specific examples, each with date and source)
- Frequency (how often this appears: "4 of 7 tracked competitors", "seen in 12 of 47 calls")
- Trend (is this increasing, stable, or declining? Over what time period?)
- Implications (what this pattern means for your GTM strategy)
- Related Patterns
- Sources

**Naming:** `pattern-name.md` (kebab-case, lowercase)
Examples: `pricing-model-shifts.md`, `ai-washing-in-sales-tools.md`, `buyer-committee-expansion.md`

---

### 2.6 Synthesis Page (wiki/pages/syntheses/)

**What it tracks:** A cross-cutting insight that connects multiple wiki pages. Syntheses are the highest-value pages because they reveal things no single source contains.

**Frontmatter:**
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

**Required sections:**
- Insight (one sentence: the cross-cutting finding)
- Evidence Chain (which pages connect to form this insight, with [[wikilinks]])
- Supporting Data (specific facts from connected pages)
- Implications (what this means for decisions, strategy, positioning)
- Open Questions (what you still don't know)
- Connected Pages (all wiki pages that contributed to this synthesis)
- Sources

**Naming:** `synthesis-name.md` (kebab-case, lowercase)
Examples: `pricing-shifts-drive-switching.md`, `trust-beats-features-in-enterprise.md`

---

### 2.7 Performance Page (wiki/pages/performance/)

**What it tracks:** What's working and what isn't, by channel, format, tactic, or campaign type.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: performance
channel: linkedin | email | blog | ads | calls | all
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- What We're Measuring (the specific metric or outcome)
- What Works (tactics, formats, messages that perform well, with data)
- What Doesn't Work (tactics that underperform, with data)
- Trends Over Time (is performance improving, declining, or flat?)
- Recommendations (what to do more of, what to stop)
- Sources

**Naming:** `channel-or-tactic-performance.md` (kebab-case, lowercase)
Examples: `linkedin-post-performance.md`, `cold-email-response-rates.md`, `demo-conversion-patterns.md`

---

### 2.8 Brand Page (wiki/pages/brands/)

**What it tracks:** Comprehensive knowledge about a specific brand or competitor, including their positioning, voice, strategy, and market presence.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: brand
brand-name: Company Name
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Brand Overview (what they do, who they serve, their positioning)
- Voice and Messaging (how they talk, key phrases, tone)
- Product and Pricing (current offerings, pricing model, tiers)
- Competitive Position (where they sit in the market, who they compete with)
- Strengths and Weaknesses (from your perspective as a competitor or observer)
- Recent Activity (last 90 days of notable moves, launches, announcements)
- Sources

**Naming:** `brand-name.md` (kebab-case, lowercase)
Examples: `hubspot-brand.md`, `outreach-brand.md`, `apollo-brand.md`

Note: Brand pages overlap with entity pages. Use entity pages for factual profiles (pricing, features, timeline). Use brand pages for positioning, voice, and strategic analysis. Link them to each other.

---

### 2.9 Market Page (wiki/pages/market/)

**What it tracks:** Market-level intelligence: ICP profiles, buyer signals, competitive landscape views, and market dynamics.

**Frontmatter:**
```yaml
---
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: wiki-page
page-type: market
market-segment: all | enterprise | mid-market | smb | vertical-name
source-count: 0
sources: []
related: []
---
```

**Required sections:**
- Market Overview (what this segment looks like, size, growth)
- ICP Profile (ideal customer characteristics for this segment)
- Buyer Signals (what indicates a company is ready to buy)
- Competitive Landscape (who competes here, how they position)
- Pricing Expectations (what buyers expect to pay, common objections)
- Trends (what's changing in this market segment)
- Sources

**Naming:** `market-segment-name.md` (kebab-case, lowercase)
Examples: `icp-mid-market-saas.md`, `competitive-landscape-crm.md`, `buyer-signals-enterprise.md`

---

## 3. Operations

Four operations govern how the wiki grows and stays healthy.

### 3.1 Ingest (Single Source)

Use when you have one new source to process.

**Trigger:** You drop a source file into wiki/raw/{category}/ and ask the LLM to process it.

**Steps:**

1. Read WIKI-SCHEMA.md (this file) to understand page types and conventions.
2. Read wiki/pages/_index.md to know what pages already exist.
3. Read the source document completely.
4. Discuss key takeaways with the user (skip this if user says "just process it").
5. Create a source summary page in wiki/pages/sources/.
6. For each entity mentioned: check if an entity page exists. If yes, update it. If no, create it.
7. For each concept or framework mentioned: check if a concept page exists. Update or create.
8. For each broad topic covered: check if a topic page exists. Update or create.
9. Check for patterns (recurring themes across this source and existing pages). Update or create pattern pages.
10. Flag contradictions. If this source says something different from an existing page, add a contradiction marker: `[CONTRADICTION: Source A says X on date, but Source B says Y on date. Needs review.]`
11. Update wiki/pages/_index.md. Add new pages, update source counts for modified pages.
12. Append to wiki/pages/_log.md: `## [YYYY-MM-DD] ingest | source-filename | X pages created, Y updated, Z contradictions`
13. Update the source file's frontmatter: set `status: ingested`, fill `wiki-pages-touched`, set `ingested-date`.

**Expected output:** A summary listing pages created, pages updated, and contradictions flagged.

A single source typically touches 5 to 15 wiki pages. This is the compounding effect: every new source enriches the entire wiki, not just one page.

---

### 3.2 Batch Ingest

Use when you have multiple unprocessed sources to handle at once.

**Trigger:** Multiple source files with `status: pending-ingest` sitting in wiki/raw/.

**Steps:**

1. Read WIKI-SCHEMA.md and wiki/pages/_index.md.
2. Scan wiki/raw/ for all files with `status: pending-ingest` in their frontmatter.
3. Process each source using the same steps as single ingest (steps 3-13 above), but without the interactive discussion step.
4. After all sources are processed, update _index.md once (not after each source).
5. Append a single batch entry to _log.md: `## [YYYY-MM-DD] batch-ingest | N sources processed | X pages created, Y updated, Z contradictions`

**Expected output:** A batch summary with totals for all sources processed.

Run batch ingest weekly (Friday mornings) or whenever your raw/ folder has 3+ unprocessed sources.

---

### 3.3 Query

Use when you have a question and want an answer grounded in your wiki.

**Trigger:** You ask a question about your competitive landscape, market, customers, or any topic covered by the wiki.

**Steps:**

1. Read wiki/pages/_index.md to find relevant pages (search for keywords in page descriptions).
2. Read the relevant pages.
3. Synthesize an answer using only information from the wiki pages. Cite sources using [[page-name]] references.
4. If the answer reveals a gap (you can't answer fully), note what's missing and suggest which raw sources would fill it.
5. Ask the user: "Want to save this answer as a wiki page?" If yes, create the page in the appropriate subfolder, update the index, and log it.
6. Append to _log.md: `## [YYYY-MM-DD] query | "question summary" | Referenced N pages`

**Quality rule for queries:** If you can't answer from the wiki, say so. Never make up information to fill gaps. The gap itself is useful because it tells you what to ingest next.

---

### 3.4 Lint (Health Check)

Use weekly to keep the wiki accurate and well-connected.

**Trigger:** Run every Friday, or whenever you want to check wiki health.

**Steps:**

1. Read wiki/pages/_index.md and wiki/pages/_log.md.
2. Check for **orphan pages**: pages that exist but aren't linked from any other page. (Search for [[page-name]] across all wiki pages. If zero inbound links, it's an orphan.)
3. Check for **contradiction markers**: scan all pages for `[CONTRADICTION:` flags. List unresolved ones.
4. Check for **thin pages**: pages with source-count of 1. These need more evidence.
5. Check for **stale pages**: pages not updated in 60+ days. Flag for review.

**Configurable Staleness Thresholds:**

The default 60-day staleness threshold works for most GTM wikis. But different page types and domains go stale at different rates. Customize these thresholds for your wiki:

| Page Type | Default Threshold | Fast-Moving Domains (fintech, SaaS) | Slow-Moving Domains (legal, manufacturing) |
|-----------|------------------|--------------------------------------|-------------------------------------------|
| Entity | 60 days | 30 days | 90 days |
| Concept | 90 days | 60 days | 180 days |
| Topic | 60 days | 45 days | 90 days |
| Pattern | 45 days | 21 days | 60 days |
| Performance | 30 days | 14 days | 45 days |
| Brand | 60 days | 30 days | 90 days |
| Market | 45 days | 21 days | 60 days |
| Synthesis | 90 days | 60 days | 120 days |
| Source Summary | Never stale | Never stale | Never stale |

To customize: Copy the column that matches your domain speed. Or set your own thresholds. The lint operation (Prompt 07) will use these when checking for stale pages.
6. Check for **pending-ingest backlog**: count files in wiki/raw/ with `status: pending-ingest`. If more than 5, flag it.
7. Check for **missing pages**: concepts or entities mentioned frequently across pages but lacking their own dedicated page. Suggest creating them.
8. Check for **synthesis opportunities**: topics with 3+ related concept or pattern pages but no synthesis page. Flag as candidates.
9. Check the _log.md for last lint date. Warn if it's been more than 14 days.
10. Produce a lint report with recommended actions.
11. Append to _log.md: `## [YYYY-MM-DD] lint | N issues found, X fixed`

**Lint report format:**
```
WIKI HEALTH CHECK - YYYY-MM-DD

Orphan pages: [list or "none"]
Unresolved contradictions: [list or "none"]
Thin pages (1 source): [list or "none"]
Stale pages (60+ days): [list or "none"]
Pending-ingest backlog: N files
Missing pages (suggested): [list or "none"]
Synthesis opportunities: [list or "none"]

Priority actions this week:
1. [most important fix]
2. [second most important]
3. [third]
```

---

## 4. Cross-Referencing Rules

Wiki pages link to each other using [[wikilinks]]. This is how knowledge compounds.

**Format:** `[[page-name]]` where page-name matches the filename without the .md extension.

Examples:
- `[[hubspot]]` links to wiki/pages/entities/hubspot.md
- `[[trust-architecture]]` links to wiki/pages/concepts/trust-architecture.md
- `[[competitive-landscape]]` links to wiki/pages/topics/competitive-landscape.md

**When to add cross-references:**
- An entity page mentions another entity: link it. ("[[hubspot]] competes with [[salesforce]] in the CRM space.")
- A concept applies to a specific topic: link both. ("[[trust-architecture]] is relevant to [[content-strategy]].")
- A pattern affects multiple entities: link all of them.
- A synthesis draws from specific pages: list all connected pages.

**When NOT to add cross-references:**
- Don't link common words that happen to match a page name.
- Don't create circular-only references (A links to B, B links to A, nothing else).
- Don't link to pages that don't exist yet. Instead, note: "Candidate for new page: [topic]"

**The related field in frontmatter** should list the 3-5 most important cross-references for that page. This is separate from inline [[wikilinks]] in the body text.

---

## 5. Naming Conventions

**Wiki pages:** kebab-case, lowercase, no dates in the filename (unless it's a source summary).
- Good: `hubspot.md`, `trust-architecture.md`, `pricing-model-shifts.md`
- Bad: `HubSpot.md`, `Trust Architecture.md`, `2026-04-08-hubspot.md`

**Source summaries:** date-prefixed, then kebab-case slug.
- Good: `2026-04-08-acme-pricing-announcement.md`
- Bad: `acme-pricing.md` (no date)

**Raw sources:** date-prefixed, then kebab-case slug. Must match the source summary filename.
- Good: `2026-04-08-acme-pricing-announcement.md`

**Frontmatter dates:** Always YYYY-MM-DD format.

---

## 6. Quality Rules (Non-Negotiable)

These rules apply to every wiki operation.

1. **Never invent data.** Only write what's in the source. If you don't have information, write "Not covered in current sources" rather than guessing.

2. **Date-stamp every claim.** Write "As of April 2026, HubSpot offers..." not "HubSpot offers..." Claims without dates are useless because you can't tell if they're current.

3. **Mark unverified information.** If a claim comes from a secondhand source (a customer mentioned it, a blog speculated), mark it: `[UNVERIFIED: from customer conversation, not direct source]`

4. **Preserve contradictions.** When a new source disagrees with existing information, do NOT delete the old claim. Add the contradiction marker and let a human resolve it. Both claims stay visible until reviewed.

   **4b. Resolve contradictions within 7 days.** Flagging contradictions is step one. Resolving them is step two. When a contradiction is flagged:
   - The wiki maintainer (or page owner in multi-team wikis) reviews both claims
   - Decides which is correct based on source quality, recency, and direct evidence
   - Updates the page: keep the correct claim, mark the other as superseded with a date and reason
   - Logs the resolution in _log.md: `## [YYYY-MM-DD] resolution | [[page-name]] | Resolved contradiction: kept [claim A] from [source], superseded [claim B] because [reason]`
   - If both claims might be correct in different contexts, note this: "Claim A applies to [context]. Claim B applies to [different context]."
   Unresolved contradictions that sit for more than 7 days should be escalated in the next lint report.

5. **Link to sources.** Every wiki page ends with a Sources section listing the raw files it draws from. Every factual claim in the body should note its source.

6. **No editorializing.** Write facts, not opinions. Don't use words like "shockingly," "clearly," "obviously," or "importantly." If something matters, the facts should show why.

7. **Update the index and log.** After every operation, the _index.md and _log.md files must be updated. If they're out of date, the wiki loses its navigation.

8. **Keep frontmatter current.** source-count, updated date, and sources list must reflect the actual state of the page. Stale frontmatter makes lint checks unreliable.

---

## 7. Compounding Timeline

What to expect as your wiki grows:

**Week 1-2:** 15-20 pages. Mostly source summaries and thin topic pages. The wiki is useful for basic queries.

**Month 1:** 80-100 pages. Pattern pages have 2-3 weeks of data. Entity pages cover your top 10-15 competitors or contacts. The wiki starts answering questions faster than manual research.

**Month 3:** 200+ pages. Topic pages have editorial histories showing what angles have been covered. Synthesis pages start revealing cross-cutting insights. Performance pages show which tactics correlate with results. The wiki is now a genuine competitive advantage.

**Month 6:** The wiki knows things about your market, competitors, and customers that no fresh AI session could figure out on its own. Every new query draws from accumulated intelligence. Every new source makes the whole system smarter.

This is the compounding that the LLM Wiki pattern is built for. It doesn't happen on day one. It happens because every source you ingest makes the wiki richer for every future query.

---

## 8. Domain Fit

This schema is optimized for GTM teams: sales, marketing, competitive intelligence, market research. If your primary use case is one of these, the default page types work well.

If your use case is different, here's how to adapt:

| Your Domain | Page Types to Keep | Page Types to Skip | Consider Adding |
|-------------|-------------------|-------------------|----------------|
| Technical decisions / engineering | entities, concepts, sources | brands, market | architecture-decision, technology-choice, tradeoff-analysis |
| Compliance / regulatory | entities, concepts, topics, sources | brands, performance | regulation, jurisdiction, audit-version |
| User research / product | entities, patterns, sources, syntheses | brands, market | user-segment, feature, pain-point, research-session |
| Vendor evaluation | entities, sources, patterns | brands, market | vendor-profile, integration-map, test-result |
| Content / media | entities, topics, performance, sources | market | audience-segment, sponsor, content-calendar |

To build a custom schema, run Prompt 12 (Schema Builder). Keep the foundations: _index.md, _log.md, the 4 operations, frontmatter conventions, and [[wikilink]] cross-referencing. These are what the other 15 prompts depend on.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*

---

## 9. Netso Energy Overrides

These override the equivalent base-schema defaults for Bangladesh solar / Netso-specific context. All other rules from Sections 1-8 remain unchanged.

### 9.1 Staleness Thresholds (Netso-Calibrated)

Bangladesh solar is fast-moving on policy (SREDA/BERC updates quarterly) and slower on customer behavior.

| Page Type | Threshold | Rationale |
|-----------|-----------|-----------|
| Entity (Regulatory) | 21 days | SREDA/BERC guidelines shift rapidly |
| Entity (Vendor) | 45 days | Equipment pricing changes less often |
| Concept | 60 days | Core frameworks (RESCO) are structural |
| Topic | 45 days | Bangladesh solar market is dynamic |
| Pattern (Sales) | 21 days | Customer behavior evolves quickly |
| Pattern (Regulatory) | 30 days | Policy tracks law changes |
| Performance | 14 days | Pipeline/conversion data must stay fresh |
| Brand/Competitor | 30 days | Solar installer market shifts fast |
| Market | 30 days | ICP and buyer signals change with policy |
| Synthesis | 90 days | Cross-cutting insights are stable |
| Source Summary | Never | Raw sources are immutable |

### 9.2 Netso-Specific Domain Fit

| Domain | Keep | Skip | Add for Netso |
|--------|------|------|---------------|
| Bangladesh rooftop solar / RESCO | entities, concepts, topics, sources, patterns, syntheses, performance, market | brands (use competitor-entity instead) | solar-unit-economics, installer-comparison, icp-segment |
| Regulatory (SREDA/BERC) | entities (regulatory), concepts (legal), topics, sources | performance, market | regulation-tracker, timeline-sequence |
| Sales & GTM | entities (buildings, customers), patterns, performance, market, syntheses | — | trust-blocker-pattern, conversion-funnel |

### 9.3 Netso-Specific Entity Types

Use these `entity-type` values when creating entity pages:
- `company-vendor` — Solar equipment suppliers (Jinko Solar, Bluesun Solar)
- `company-utility` — BPDB, DESCO, DPDC, NESCO
- `company-prospect` — A building or customer Netso is targeting
- `company-customer` — An installed Netso customer
- `person-decision-maker` — Building owner, facility manager, or procurement head
- `regulation` — SREDA, BERC, NEM Guidelines

### 9.4 Netso-Specific Pattern Types

- `customer-objection` — Recurring resistance (trust, price, installer fear)
- `sales-conversion` — Deal stages and conversion points
- `regulatory-event` — SREDA/BERC policy developments
- `market-shift` — Bangladesh solar market changes
- `unit-economics` — CAPEX, IRR, payback shifts
- `installation-signal` — Rooftop-ready building indicators

### 9.5 Netso ICP Definition

Default ICP when building market pages:
- **Bill range:** ৳40,000-80,000/month (electricity)
- **Building type:** Residential rooftop (3-10 kW), Commercial rooftop (10-100 kW), Industrial rooftop (100+ kW)
- **Zones:** DESCO, DPDC, NESCO service areas
- **Trigger:** High electricity bills, frequent power cuts, ESG/mandate compliance (new build >=1,000 sq ft rooftop)
- **Deprioritize:** Households with bills <৳20k (insufficient IRR for RESCO model)

### 9.6 Canonical Wikilinks

Use these exact names for recurring cross-references:
- `[[netso]]` — The company itself
- `[[resco-model]]` — The RESCO lease model
- `[[net-metering-2025]]` — SREDA NEM 2.0 guidelines
- `[[bangladesh-solar-market]]` — Bangladesh rooftop market overview
- `[[trust-blocker-pattern]]` — Primary sales objection pattern
- `[[pilot-unit-economics]]` — Pilot-validated financials (IRR 42%, 2.6yr payback)
- `[[sreda]]` — Regulatory authority
- `[[jinko-solar]]`, `[[bluesun-solar]]` — Primary vendors
- `[[bpdb]]` — Bangladesh Power Development Board
- `[[berc]]` — Bangladesh Energy Regulatory Commission

---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems*
*Netso Energy overrides added 2026-04-30 | CLAUDE.md defines full operating manual*
