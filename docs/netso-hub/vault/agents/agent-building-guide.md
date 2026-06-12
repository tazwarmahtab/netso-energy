# Build Your Own Agent: A Step-by-Step Guide

This guide walks you through creating a custom wiki agent for any use case. The three agents included in this Kit (Competitive Intelligence, Objection Library, Deal Intelligence) follow the same pattern. Once you understand the pattern, you can build agents for anything.

## What Is a Wiki Agent?

An agent is a markdown instruction file that tells an LLM how to process inputs and maintain wiki pages. It's not code. It's structured instructions that any LLM can follow.

An agent has five parts:
1. **Frontmatter:** Metadata about what triggers the agent and what it produces
2. **Identity and Role:** What the agent is and what it does (the persona)
3. **Context Loading:** Which wiki files the agent reads before doing anything
4. **Operation Steps:** The numbered workflow the agent follows
5. **Quality Rules:** Standards the agent must follow

## Step 1: Define the Agent's Purpose

Answer these questions:

- What knowledge does this agent maintain? (competitor data, customer feedback, content performance, etc.)
- What triggers it? (new files arriving, a schedule, a manual request)
- What wiki pages does it create or update?
- Who benefits from its output? (sales team, product team, executives)

Write one sentence: "This agent [does what] by [processing what] and [producing what]."

Example: "This agent maintains competitive intelligence by processing new articles, transcripts, and research docs and producing updated entity, market, and pattern pages."

## Step 2: Choose Inputs and Outputs

**Inputs:** What raw sources does this agent process?

Map them to wiki/raw/ subfolders:
- wiki/raw/articles/ (blog posts, news articles, pricing pages)
- wiki/raw/transcripts/ (call recordings, meeting notes)
- wiki/raw/research/ (reports, studies, surveys)
- wiki/raw/newsletters/ (industry newsletters, email content)
- wiki/raw/data/ (spreadsheets, metrics, CRM exports)

**Outputs:** What wiki pages does this agent create or update?

Map them to wiki/pages/ subfolders:
- wiki/pages/entities/ (company, person, product, tool profiles)
- wiki/pages/concepts/ (frameworks, objections, methodologies)
- wiki/pages/topics/ (overview pages connecting multiple entities)
- wiki/pages/patterns/ (recurring trends and behaviors)
- wiki/pages/performance/ (what's working, metrics, outcomes)
- wiki/pages/market/ (ICP, buyer signals, competitive landscape)
- wiki/pages/brands/ (positioning, voice, messaging analysis)
- wiki/pages/syntheses/ (cross-cutting insights)
- wiki/pages/sources/ (source summaries, always created)
- wiki/pages/_index.md (always updated)
- wiki/pages/_log.md (always updated)

## Step 3: Write the Context Loading Section

Every agent must read these files before doing anything:

1. wiki/WIKI-SCHEMA.md (non-negotiable, always first)
2. wiki/pages/_index.md (know what exists)
3. The specific page folders relevant to this agent's domain

Write it as a numbered list. The LLM follows it in order.

## Step 4: Write the Operation Steps

This is the core of the agent. Write numbered steps that describe exactly what the agent does. Good operation steps are:

- **Specific.** "Check wiki/raw/transcripts/ for files with status: pending-ingest" not "Look for new files."
- **Ordered.** Steps depend on previous steps. Read before extract. Extract before update.
- **Complete.** Include index and log updates. Include marking sources as processed.

Typical flow for most agents:

1. Identify new inputs (check for pending-ingest files)
2. Read and extract information from each input
3. Match extracted data to existing wiki pages
4. Update existing pages or create new ones
5. Flag contradictions
6. Create source summary pages
7. Update wiki/pages/_index.md
8. Append to wiki/pages/_log.md
9. Mark sources as processed (status: ingested)

## Step 5: Write Quality Rules

Every agent must include these baseline rules:

- Never invent data. If you don't know, mark [MISSING].
- Date-stamp every claim.
- Always link to sources using [[wikilinks]].
- Preserve contradictions. Flag them for human review.
- Use [NEEDS VERIFICATION] for uncertain claims.
- Update existing pages. Don't rewrite them.

Add domain-specific rules for your agent. Examples:
- Objection agent: "Use exact quotes. Don't paraphrase."
- Performance agent: "Recalculate metrics on every run."
- Content agent: "Include engagement data with dates."

## Step 6: Set the Schedule

Options:
- **Daily at a specific time:** Good for agents that process accumulating sources.
- **Triggered by new files:** Good for real-time processing.
- **Weekly:** Good for maintenance and review agents.
- **On-demand:** Good for agents humans trigger before specific events.

## Step 7: Test It

Before scheduling, run the agent manually:

1. Add 2-3 test sources to wiki/raw/ with `status: pending-ingest`
2. Paste the agent's full instruction file to your LLM
3. Tell the LLM: "Run this agent now. Process the pending sources."
4. Check the output: Did it create correct pages? Did it update _index.md and _log.md? Are [[wikilinks]] correct?
5. Fix any issues in the instruction file and run again

Once it works manually, schedule it.

## Blank Agent Template

Copy this template and fill in the brackets:

```markdown
---
agent-name: [Your Agent Name]
trigger: [new-files-in-raw | manual-on-demand | schedule | crm-event]
inputs: [list wiki/raw/ subfolders and any other inputs]
outputs: [list wiki/pages/ subfolders this agent writes to]
schedule: [when it runs: daily-9pm, twice-weekly, on-demand, real-time]
---

# [Your Agent Name]

## Identity and Role

You are [what you do for the team].
Your job: [specific purpose and outcomes].
You [key behavior traits: cite sources, flag contradictions, etc.].

## Context Loading

1. Read wiki/WIKI-SCHEMA.md
2. Read wiki/pages/_index.md
3. Scan wiki/pages/[relevant-folder]/ for existing pages
4. [Any additional context files]

## Operation Steps

1. [First step: identify inputs]
2. [Second step: read and extract]
3. [Third step: match to existing pages]
4. [Fourth step: update or create pages]
5. [Fifth step: flag contradictions]
6. [Sixth step: create source summaries]
7. Update wiki/pages/_index.md
8. Append to wiki/pages/_log.md
9. Mark sources as processed

## Quality Rules

- Never invent data. Mark gaps with [MISSING].
- Date-stamp every claim.
- Link to sources using [[wikilinks]].
- Preserve contradictions for human review.
- [Domain-specific rule 1]
- [Domain-specific rule 2]

## Schedule

- Primary: [when and how often]
- Secondary: [manual trigger conditions]
- Log all runs in wiki/pages/_log.md
```

## Agent Ideas You Might Build

- **Content Performance Agent:** Scans published content and updates wiki/pages/performance/ with engagement data.
- **Customer Feedback Agent:** Processes support tickets and surveys, updates wiki/pages/market/ with emerging patterns.
- **Roadmap Alignment Agent:** Compares wiki (features, gaps) against product roadmap, flags misalignments.
- **New Hire Briefing Agent:** Generates onboarding docs from wiki pages when someone joins the team.
- **Weekly Digest Agent:** Creates a summary of all wiki changes from the past week.

## The Nightly Pipeline Concept

As you build multiple agents, chain them into a nightly pipeline:

- **9:00 PM:** Competitive Intelligence Agent processes new sources
- **9:45 PM:** Objection Library Agent processes new call transcripts
- **10:15 PM:** Synthesis Agent creates new cross-cutting insights (if implemented)
- **10:45 PM:** Index and log finalization
- **11:00 PM:** Morning briefing generation (optional)

By 7 AM, your wiki is fresh, indexed, and ready to use.

Start with one agent running manually once a week. Once you trust it, schedule it. Then add a second agent. Build up gradually.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
