# Prompt 14: Team-Specific Builder

**Purpose:** Design a wiki architecture specifically for how your team works, with source creation mapping, query patterns, knowledge concentration analysis, and page ownership. Instead of adopting a generic structure, you'll get a system built around the specific knowledge problems your team faces.

**When to use:** During initial setup if you have a unique team structure, or when you want to customize the wiki for how your team collaborates. Especially useful for teams where knowledge flows between multiple roles.

---

## Thinking Logic (for AI assistants running this prompt)

Before designing the wiki architecture, silently work through these checks:

1. **TEAM TYPE DETECTION:** Is this a GTM team, a technical/engineering team, a community-led team, or a mixed team? This determines which source types dominate, who creates raw sources, and who queries the wiki. Don't assume every team is a SaaS sales org.

2. **KNOWLEDGE BOTTLENECK:** Who on the team holds knowledge that others depend on? This person is both the most valuable source and the biggest risk. The wiki should be designed to extract their knowledge into queryable pages, not add another tool to their workflow.

3. **MAINTENANCE CAPACITY:** How much time per week can this team realistically spend maintaining the wiki? Under 2 hours: keep the schema minimal and automate ingestion where possible. 2-5 hours: add synthesis and cross-referencing. 5+ hours: full maintenance cycle with weekly passes.

4. **SOURCE CREATOR vs. QUERY USER:** Separate who creates raw sources from who queries the wiki. Sales reps create call transcripts. Marketing queries competitive intelligence. Engineers create design docs. PMs query decision history. Design the wiki so source creation is low-friction for creators and query results are high-value for consumers.

5. **COMMUNITY-LED CHECK:** If the team mentions Discord, GitHub, Reddit, Twitter, or open-source community management, activate community source handling. These teams need a different wiki architecture than traditional B2B teams.

6. **EXISTING TOOLS INTEGRATION:** What does the team already use? If they're heavy Notion users, acknowledge that the wiki supplements Notion (as a compiled layer), it doesn't replace it. If they use Linear or Jira, show how issue tracker data feeds the wiki.

---

## The Prompt

```
My team structure is:

[DESCRIBE YOUR TEAM: roles, how they collaborate, what tools they use, what questions they ask most often]

Design a wiki architecture specifically for how my team works. Consider:
- Who creates the raw sources? (sales calls, research, support tickets, etc.)
- Who would query the wiki most often? What questions would they ask?
- What knowledge currently lives in one person's head that the team depends on?
- Where does knowledge break down when someone is on vacation or leaves?

COMMUNITY AND OPEN-SOURCE SOURCES: If your team operates in a community-led, open-source, or developer-focused context, identify these community signal sources separately from traditional business sources:

- Asynchronous platforms (Discord, Slack communities, Reddit, forums): High volume, low authority per individual post. Best ingested as pattern pages summarizing recurring themes across 20-50 posts, not as individual source summaries. Assign a community curator role (community manager, dev advocate) to aggregate before ingesting.
- Issue trackers (GitHub Issues, Linear, Jira public boards): Structured signal with clear entity connections. Create entity pages for product components and pattern pages for recurring issue types. These are higher authority than forum posts because they represent user intent, not just opinion.
- Social signals (Twitter/X mentions, HN comments, Product Hunt reviews, YouTube comments): Informal authority. Use as supplements to authoritative sources, never as sole sources. Sample the top 15-20 most substantive signals rather than ingesting everything.
- Conference talks and community presentations: Higher authority than social posts. Treat like articles for ingestion purposes.

Design the wiki so community signal flows through a curator role before entering the wiki. Direct ingestion of raw Discord threads creates noise.

Give me a wiki design that solves our specific knowledge bottlenecks, not a generic template.
```

---

## Supplementary Thinking Framework

Before designing, work through these questions:

**Team-Type Detection**
- Is this a GTM team, a product/engineering team, or something else entirely? The default Kit schema is optimized for GTM. If this is a non-GTM team, recommend starting with Prompt 12 (Schema Builder) to create a custom schema first, then return to this prompt for the team architecture.

**Maintenance Capacity**
- How many people will actually maintain the wiki? If it's one person, the design needs to be simple enough for solo maintenance. Don't create 8 page types if one person is doing all the work.

**Knowledge-Creator vs. Maintainer Separation**
- Are there team members who create knowledge but won't maintain the wiki? (Sales reps generate call transcripts but won't update wiki pages.) Design the ingest flow so their raw outputs go into wiki/raw/ without extra work on their part.

---

## Design Output Framework

The design should address:
- Which page types matter most for your team (and which to skip for now)
- What the folder structure should look like
- Who feeds the wiki and what sources they contribute
- Who queries the wiki and what they search for most
- What the weekly maintenance routine should look like for your team size

---

## Page Ownership Template

For multi-person wikis, assign each page type an owner:

| Page Type | Primary Owner | Backup | Update Frequency |
|-----------|--------------|--------|-----------------|
| [fill in] | [name/role] | [name/role] | [weekly/monthly] |

Shared pages need explicit owners. "Everyone owns it" means nobody updates it.

---

## What You'll Get

Team-specific wiki design with source creation mapping, query patterns, knowledge concentration analysis, and page ownership template. A system designed around the specific knowledge problems your team actually faces.

**Next step:** Compare the output against the default WIKI-SCHEMA.md. Use whichever structure serves your needs better, or merge the best elements of both.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
