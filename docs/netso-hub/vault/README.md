# The GTM Knowledge System Kit

A complete system for building an LLM-maintained knowledge wiki for your GTM team. Based on Andrej Karpathy's LLM Wiki pattern, adapted for B2B go-to-market.

## What's in the Kit

```
GTM-Knowledge-System-Kit-v1/
|
|-- WIKI-SCHEMA.md              <- THE core file. Defines everything.
|-- QUICKSTART.md               <- Zero to working wiki in 30 minutes.
|-- EVOLUTION-PLAN.md           <- Week-by-week buildout roadmap from first test to full team deployment
|-- CLAUDE.md                  <- One-click setup file for Claude Code and Cowork
|-- PROMPT-GUIDE.md            <- Which prompt to use for your situation
|-- folder-setup.sh             <- Run this first. Creates the wiki folder structure.
|
|-- templates/
|   |-- index-template.md       <- Starter for wiki/pages/_index.md
|   |-- log-template.md         <- Starter for wiki/pages/_log.md
|   |-- source-frontmatter-template.md  <- YAML frontmatter for raw sources
|   |-- page-types/             <- One template per page type (9 total)
|       |-- entity-template.md
|       |-- concept-template.md
|       |-- topic-template.md
|       |-- source-summary-template.md
|       |-- pattern-template.md
|       |-- synthesis-template.md
|       |-- performance-template.md
|       |-- brand-template.md
|       |-- market-template.md
|
|-- examples/                   <- What "done" looks like
|   |-- example-entity-page.md          (HubSpot competitor profile)
|   |-- example-concept-page.md         (Trust Architecture framework)
|   |-- example-topic-page.md           (AI Agents in GTM overview)
|   |-- example-pattern-page.md         (Pricing Model Shifts trend)
|   |-- example-synthesis-page.md       (Cross-cutting competitive insight)
|   |-- example-index.md                (24 pages across all types)
|   |-- example-log.md                  (10 operations over 7 weeks)
|
|-- prompts/                    <- Copy-paste-ready prompts (16 total)
|   |-- 01-knowledge-audit.md
|   |-- 02-first-ingest.md
|   |-- 03-batch-ingest.md
|   |-- 04-query-wiki.md
|   |-- 05-deal-prep.md
|   |-- 06-new-hire-briefing.md
|   |-- 07-weekly-maintenance-pass.md
|   |-- 08-quarterly-review.md
|   |-- 09-brainstorm-use-cases.md
|   |-- 10-synthesis-generator.md
|   |-- 11-priority-picker.md
|   |-- 12-schema-builder.md
|   |-- 13-source-prioritizer.md
|   |-- 14-team-specific-builder.md
|   |-- 15-stage-specific-roadmap.md
|   |-- 16-cross-department-connector.md
|
|-- scenarios/                  <- Walkthroughs for 5 team types
|   |-- scenario-saas-gtm-team.md
|   |-- scenario-consulting-firm.md
|   |-- scenario-solo-founder.md
|   |-- scenario-product-team.md
|   |-- scenario-agency.md
|
|-- setup-guides/               <- Platform-specific setup instructions
|   |-- claude-code-setup.md
|   |-- claude-cowork-setup.md
|   |-- claude-projects-setup.md
|   |-- manual-llm-setup.md
|
|-- agent-instructions/         <- Autonomous agent instruction files
|   |-- competitive-intel-agent.md
|   |-- objection-library-agent.md
|   |-- deal-intelligence-agent.md
|   |-- agent-building-guide.md
```

## Where to Start

**If you want to get going fast:**
Open QUICKSTART.md. You'll have a working wiki in 30 minutes.

**If you want to understand the system first:**
Read WIKI-SCHEMA.md. It defines the three-layer architecture, all 9 page types, the 4 operations (Ingest, Batch Ingest, Query, Lint), and every rule the system follows.

**If you want to see what a finished wiki looks like:**
Browse the examples/ folder. Start with example-index.md to see the full structure, then read any example page that matches your use case.

**If you're using Claude Code or Cowork:**
CLAUDE.md is auto-read by Claude when you open a session in this folder. Just say what you need and Claude knows the system. Check PROMPT-GUIDE.md if you want to see which prompt fits your situation.

**If you want a walkthrough for your specific team type:**

| Your situation | Start here |
|---|---|
| SaaS company, 10-50 people in GTM | scenarios/scenario-saas-gtm-team.md |
| Consulting or professional services firm | scenarios/scenario-consulting-firm.md |
| Solo founder or small operator | scenarios/scenario-solo-founder.md |
| Product or engineering team | scenarios/scenario-product-team.md |
| Marketing or creative agency | scenarios/scenario-agency.md |

**Not sure which prompt to use?**
Open PROMPT-GUIDE.md. It has four paths: getting started, preparing for meetings, customizing the system, and maintaining an existing wiki.

**If you want to set up on a specific platform:**

| Your platform | Start here |
|---|---|
| Claude Code (terminal, power users) | setup-guides/claude-code-setup.md |
| Claude Cowork (desktop app) | setup-guides/claude-cowork-setup.md |
| Claude Projects (web interface) | setup-guides/claude-projects-setup.md |
| ChatGPT, Gemini, Ollama, or any LLM | setup-guides/manual-llm-setup.md |

## How the System Works

Three layers:

1. **Raw Sources** (wiki/raw/) - Articles, transcripts, research, data. Immutable. You add new ones but never modify old ones.

2. **Wiki Pages** (wiki/pages/) - 9 page types across 9 folders. This is where compiled knowledge lives. The LLM creates and maintains these pages based on raw sources.

3. **The Schema** (WIKI-SCHEMA.md) - Defines page types, frontmatter specs, naming conventions, operations, and quality rules. One file that governs everything.

You feed raw sources in. The LLM processes them following the schema. Wiki pages get created, updated, and cross-referenced. Over time, the wiki compounds: each new source enriches existing pages and creates new connections.

## Questions

**Does this work with ChatGPT / Gemini / Ollama?**
Yes. See setup-guides/manual-llm-setup.md. You paste WIKI-SCHEMA.md at the start of each session.

**How long before the wiki is useful?**
After your first ingest (30 minutes), you'll have 5-10 pages. After a week of daily use, 20-30. By month 2, you'll wonder how you worked without it.

**Do I need to be technical?**
No. If you can copy-paste text and save files, you can use this system. The prompts/ folder has everything ready to go.

**What if I want to automate it?**
See agent-instructions/ for three pre-built agents and a guide to building your own. Start manual, then automate once you trust the system.


---

## About the Author

**Ayush Poddar** is a 4x Founder and CMO building at the intersection of GTM strategy and AI systems. He runs StartupGTM (GTM intelligence and systems for B2B founders and operators) and Prompts Daily (practical AI workflows for non-technical users). He built the AI-led Trust Funnel and 4C Framework used by B2B growth teams across SaaS, consulting, and services.

**Connect:**
- Website: [startupgtm.pro](https://startupgtm.pro)
- Email: ayush@startupgtm.pro
- LinkedIn: [Ayush Poddar](https://www.linkedin.com/in/ayush-poddar-62b7b35b/)
- X (Twitter): [@poddar_ayush](https://x.com/poddar_ayush)
- StartupGTM Newsletter: [startupgtm.substack.com](https://startupgtm.substack.com)
- Prompts Daily Newsletter: [promptsdaily.substack.com](https://promptsdaily.substack.com/)
- All Products: [poddarayush.gumroad.com](https://poddarayush.gumroad.com/)
