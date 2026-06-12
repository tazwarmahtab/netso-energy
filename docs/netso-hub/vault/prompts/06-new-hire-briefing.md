# Prompt 06: New Hire Briefing

**Purpose:** Generate an onboarding briefing for a new team member using your wiki's compiled knowledge. Instead of spending hours explaining your market, competitors, and strategy from scratch, the wiki produces a structured briefing the new hire can read on day one.

**When to use:** When someone new joins your GTM team. Also useful when a cross-functional colleague (engineer, designer, exec) needs to get up to speed on your market quickly.

---

## Thinking Logic (for AI assistants running this prompt)

Before generating the briefing, silently work through these checks:

1. **SENIORITY DETECTION:** Classify the hire as junior, mid-level, or senior based on their role title. This determines briefing depth, vocabulary level, and which wiki sections to include or skip.

2. **WIKI DEPTH ASSESSMENT:** Count total wiki pages and role-relevant pages. If under 20 pages total, flag upfront: "Your wiki has [N] pages. This briefing will cover what's available but key areas are thin. Prioritize ingesting [specific sources] with Prompt 03 before the hire starts."

3. **CONFIDENTIALITY SCAN:** Before including any wiki page in the briefing, check for: deal terms, pricing strategy, named clients (in agency/consulting contexts), internal-only competitive intelligence, and financial data. Apply the default filter unless the user explicitly overrides it.

4. **MULTI-CLIENT CHECK:** If the role involves multiple clients or accounts, activate multi-client mode automatically. Ask: "This role covers multiple clients. Should I include all clients in one briefing with isolated sections, or generate separate briefings per client?"

5. **ROLE RELEVANCE:** Not all wiki pages matter for every hire. A new SDR doesn't need the quarterly review data. A new VP of Sales does. Filter wiki content by role relevance before building the briefing.

6. **START DATE AWARENESS:** If the wiki will grow significantly before the hire's start date, note which sections are "current as of today" and suggest running the briefing again closer to the start date for the latest data.

---

## The Prompt

```
You are a knowledge transfer specialist creating a structured onboarding briefing for a new team member.

STEP 1: CLASSIFY THE HIRE'S SENIORITY AND ROLE SCOPE

A new team member is joining and needs to get up to speed fast.

About them:
- Role: [FILL IN: SDR, AE, marketing manager, VP of Sales, product manager, customer success rep, etc.]
- Name: [FILL IN]
- Start date: [FILL IN]
- What they'll be doing day-to-day: [FILL IN: brief description of their responsibilities]
- Prior experience: [FILL IN: first time in sales? 10 years in enterprise? Background in this domain?]

Seniority classification (choose one):
- Junior (SDR, associate, entry-level marketing): Needs plain language explanations. Heavy on "what" and "why." Low on jargon.
- Mid-level (AE, manager, senior individual contributor): Assumes domain knowledge. Focus on company-specific context and competitive nuances.
- Senior (director, VP, C-level): Assumes full domain knowledge. Focus on strategic positioning, market dynamics, and company-specific decisions.

Identified seniority: [FILL IN]
Depth adjustment: [BRIEF on what you'll emphasize and what you'll de-emphasize based on seniority]

SENIORITY-ADJUSTED DEPTH:
- Junior hires (SDRs, associates, coordinators): Simplify competitive intelligence to top competitors only. Skip pricing strategy details and negotiation tactics. Expand the glossary and context sections. Explain industry acronyms. Focus on "here's what you need to know to do your job this week."
- Mid-level hires (AEs, managers, senior ICs): Include full competitive landscape. Add strategic context for why things work the way they do. Include cross-references to wiki pages they should read in their first month.
- Senior hires (VPs, directors, partners): Skip the glossary. Expand competitive positioning, strategic context, and performance benchmarks. Include open questions and contradictions in the wiki that need their input to resolve. Frame the briefing as "here's what we know and here's where your expertise is needed."

STEP 2: ASSESS WIKI DEPTH AND IDENTIFY GAPS

Before I build the briefing:
- How many pages total in the wiki? If fewer than 20, the briefing will be thin and I'll flag what's missing.
- How many pages cover the new hire's specific area? If fewer than 5 relevant pages, I'll note that.
- How many pages cover competitors? How many cover market/patterns? How current?

I'll also assess:
- Is the wiki strong in the areas this hire needs? (An SDR needs strong competitor pages. A product manager needs strong market pages.)
- What's the biggest gap for this hire's onboarding?

Wiki assessment:
- Total pages available: [number]
- Pages relevant to this hire's role: [number]
- Quality: [strong, adequate, thin]
- Biggest gap: [topic area most important for this hire that's underrepresented in the wiki]

If under 20 pages total: "Your wiki has [N] pages, which is a foundation. Key areas like [X] are thin right now. We'll flag what's missing. Plan to flesh these out over the next [X] weeks with Prompt 03."

STEP 3: IDENTIFY AND FILTER CONFIDENTIAL INFORMATION

CONFIDENTIALITY FILTER (default ON):

Unless the user explicitly overrides this, exclude the following from all onboarding briefings:
- Active deal terms, pricing negotiations, and contract details
- Named client information in consulting/agency contexts (use [CLIENT] placeholders)
- Internal compensation, financial projections, and board-level strategy documents
- Information explicitly marked as confidential or NDA-protected in wiki page metadata

Override: [FILL IN: list specific categories the hire is cleared to see, OR type "full access" if they have no restrictions. If left blank, the default filter applies.]

STEP 4: HANDLE MULTI-PRODUCT/CLIENT ORGANIZATION

Is this hire working across multiple products or customer segments?

If yes:
- Should the briefing be organized by product/client, or by topic?
- Which products/clients are most relevant for day one?

Example: "Since you're covering both [Product A] and [Product B], I've organized this briefing by product so you can look up [Product B] when you get that first demo."

Organization structure: [By topic / By product / By customer segment]

MULTI-CLIENT MODE: If this hire will work across multiple clients or accounts, treat each client as a completely isolated knowledge domain. Do not cross-reference between clients. Do not apply patterns from one client to another client's section. Label each section clearly: "--- CLIENT: [Name] ---". Each client section should be self-contained with its own competitors, context, and wiki references.

STEP 5: BUILD THE BRIEFING

Here are the wiki pages to build their briefing from:
[PASTE a broad selection of pages. This prompt works best with more context:
  - 2-3 entity pages for your top competitors (wiki/pages/entities/)
  - 1-2 topic or market pages for your core market areas (wiki/pages/topics/ or wiki/pages/market/)
  - 1-2 concept pages for frameworks your team uses (wiki/pages/concepts/)
  - 1-2 pattern pages for current market trends (wiki/pages/patterns/)
  - 1 market page for your ICP (wiki/pages/market/)
  - 1-2 performance pages if relevant to their role (wiki/pages/performance/)]

Now create the briefing with these sections:

1. THE MARKET WE PLAY IN
   - Who buys from us and why (ICP summary, in plain language if junior hire)
   - How big the market is and where it's heading
   - The trends that matter most right now
   - [For mid/senior: Add strategic implications; for junior: add "why this matters to you"]

2. WHO WE COMPETE WITH
   - Top competitors with one paragraph each (depth depends on seniority)
   - Where we win and where we lose against each (specific, not generic)
   - The competitive scenarios they'll encounter most often in their role
   - [For junior SDRs: Add "what competitors to know about"; for AEs: add "where they ask hard questions"; for executives: add "strategic threat assessment"]

3. HOW WE THINK ABOUT THIS MARKET
   - Key concepts and frameworks our team uses (explain jargon if junior hire)
   - Patterns we're tracking and what they mean
   - [For junior: Add "real-world example"; for senior: add "board-level narrative"]

4. WHAT'S WORKING AND WHAT ISN'T
   - Current performance highlights relevant to their role
   - What the team has learned in the last 90 days
   - [For junior: "why you should care"; for senior: "strategic implications"]

5. YOUR FIRST 2 WEEKS: WHAT TO READ AND LEARN
   - The 5-7 most important wiki pages for their specific role
   - Why each one matters for what they'll be doing
   - What they should do with each page (read and remember, or deep-dive?)
   - [For multi-product hires: organize by product so they know which to tackle when]

Cite wiki pages with [[wikilinks]] throughout so they can go deeper on anything.
Write in plain language. No jargon without explanation. Explain acronyms on first use.
Target length: something they can read in 15-20 minutes.

If you need more detail about their role or background to tailor the briefing, ask me before you start.

STEP 6: QUALITY SELF-CHECK AND COMPLETENESS

Before delivering the briefing, verify:
- Every claim is either sourced to a wiki page or flagged as "company background" (context the wiki doesn't cover)
- Jargon is explained or avoided (adjust based on seniority)
- Competitive claims are specific (not generic "they're strong in X")
- The briefing reflects what the team actually knows (not generic market knowledge)
- Role-specific advice is included (an SDR's briefing differs from a VP's)
- Confidentiality filter was applied if needed

Wiki completeness assessment:
- Briefing quality rating: [strong / adequate / thin]
- If thin, missing areas: [list specific topics that would improve this briefing]
- Recommended next action: [what to ingest next to fill the biggest gaps]

If the briefing is below "adequate" quality, say so upfront: "Your wiki has thin coverage of [topic]. I've built this briefing with what we have, but before [hire] starts, plan to run Prompt 03 with sources on [topic] to make this stronger."
```

---

## What You'll Get

A structured onboarding doc that would normally take a manager hours to write, generated in seconds from your wiki's compiled knowledge. The new hire gets the same context that took the team months to build, on day one. The briefing is tailored to their seniority and role, so a junior SDR gets a different doc than a VP of Sales.

**Next step:** Save the output as a wiki page (wiki/pages/syntheses/new-hire-briefing-[role].md). Update it every quarter when you run the quarterly review (Prompt 08). This way you always have a current onboarding doc ready for the next hire.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
