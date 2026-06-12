# Prompt 01: Knowledge Audit

**Purpose:** Diagnose where your organization re-derives answers from scratch instead of pulling from maintained sources. This prompt classifies your situation (solo vs. team, regulated vs. not, digital vs. non-digital), identifies the top 5 knowledge areas worth capturing, and ranks them by the cost metrics that matter most to your type of organization.

**When to use:** Before you ingest your first source. Run this once to decide what your wiki should cover first.

---

## Thinking Logic (for AI assistants running this prompt)

Before running the audit, silently work through these checks:

1. **TEAM SIZE CLASSIFICATION:** Is this a solo operator (1-2 people), small team (3-10), mid-size (11-50), or large organization (50+)? This changes what "knowledge re-derivation" looks like. Solo operators lose founder time. Large teams lose coordination time across departments.

2. **INDUSTRY CLASSIFICATION:** Is this a regulated industry (healthcare, fintech, legal, manufacturing quality)? If yes, add a risk/compliance cost dimension alongside time cost. Is this a fast-moving industry (SaaS, fintech, dev tools)? If yes, flag that knowledge staleness has higher cost.

3. **DIGITAL VS. NON-DIGITAL:** Does the user mention non-digital knowledge sources (verbal handoffs, WhatsApp groups, in-person observations, ERP systems)? If so, flag which knowledge areas have a "source readiness" problem where the knowledge exists but isn't in a format an AI can read.

4. **AMBIGUITY CHECK:** If the user's tools list is vague ("we use a few things") or their role description is generic, ask 1-2 clarifying questions before producing the audit. A bad input produces a generic audit that wastes the user's time.

5. **COST METRIC SELECTION:** Don't default to "hours wasted per week" for every knowledge area. Match the cost metric to the knowledge type: hours for operational knowledge, risk exposure for compliance, deal impact for competitive, opportunity cost for founder IP.

---

## The Prompt

Copy and paste this into Claude, ChatGPT, or any LLM. Replace every [FILL IN] with your context.

```
You are a knowledge management consultant who specializes in diagnosing how organizations store, retrieve, and lose information across every industry and company size.

I run a [YOUR ROLE] at a [COMPANY SIZE] company in [INDUSTRY]. My team currently stores knowledge across these tools: [LIST YOUR TOOLS: Slack, Notion, Google Drive, CRM, ERP, email, WhatsApp, shared drives, spreadsheets, etc.]

Your job: identify the top 5 knowledge areas where my organization most likely re-derives answers from scratch instead of pulling from a maintained source.

Before you start the audit, classify my situation by thinking through these questions silently:

- Am I a solo operator or small team (under 5 people) where knowledge is concentrated in one or two heads? Or a larger team where knowledge is scattered across people and tools?
- Is this a pre-revenue or early-stage company where knowledge value is strategic positioning, not time savings?
- Does my industry involve regulated or compliance-sensitive knowledge (healthcare, fintech, legal, manufacturing quality) where the cost of not having the answer isn't wasted time but financial/legal/safety risk?
- Does knowledge in my organization live in digital shared tools, or is some of it in non-digital formats (verbal handoffs, WhatsApp groups, physical processes, in-person observations, ERP systems that aren't easily queryable)?

Use your classification to adapt how you run the audit:

1. What questions does my organization answer repeatedly? Think beyond the obvious. Include questions answered across departments, questions asked during crises or audits, and questions that only one person can answer today.

2. Where does the answer currently live? Consider: maintained shared docs, individual heads, email threads, chat messages, non-digital formats (verbal, observational), locked inside systems like ERPs or databases that people can't query naturally, or scattered across multiple locations with no single source.

3. Who needs this knowledge and how often? For larger teams, don't just count total headcount. Identify whether the knowledge is evenly distributed or concentrated in a few people. If 4 out of 18 salespeople hold all the tribal knowledge and the other 14 are flying blind, the actual need is 14 people, not 18. For solo operators or small teams, estimate how often the founder/operator personally needs to recall or reconstruct this information during client work, sales conversations, or decision-making.

4. What is the real cost of not having this knowledge maintained?
   - For operational knowledge: estimate weekly hours spent re-deriving
   - For compliance/regulatory knowledge: estimate the financial or legal risk of getting it wrong or being slow to find it
   - For strategic/competitive knowledge: estimate impact on deal win rates, positioning accuracy, or decision quality
   - For solo operators: estimate the opportunity cost of the founder's time spent reconstructing instead of doing higher-value work

   Founder opportunity cost formula:
   Step 1: What is your effective hourly rate? (Annual revenue goal / working hours per year. Example: $200K goal / 2,000 hours = $100/hour)
   Step 2: How many hours per week does your team spend re-deriving this knowledge?
   Step 3: Weekly cost = hours x hourly rate. Annual cost = weekly cost x 50.
   Example: 4 hours/week re-researching competitors x $100/hour = $400/week = $20,000/year in re-derivation cost.
   Use this number to rank knowledge areas by real economic impact.

For each knowledge area, give me:
- What the knowledge area is (be specific to my role and industry, not generic)
- Where the answer currently lives (or doesn't), including non-digital locations
- Who holds this knowledge today (distributed across team, concentrated in specific people, or exists only in systems)
- The cost metric that fits: hours/week wasted, risk exposure level, decision quality impact, or founder opportunity cost
- How often this knowledge changes (daily, weekly, quarterly, event-driven)

Don't give me generic categories like "internal communications" or "best practices." Every knowledge area should be specific enough that I can point to a real situation in my company and say "yes, that happens to us."

If my inputs leave anything ambiguous (especially around what tools are actually used day-to-day, whether knowledge is digital or not, or whether there are regulatory requirements), ask me clarifying questions before answering.
```

---

## What You'll Get

A classified situation profile showing whether you're a solo founder, small team, or distributed organization, and whether you're operating under compliance constraints. Five industry-specific knowledge areas ranked by total impact using the cost metrics that matter to your type (hours wasted, financial/legal risk, deal win rate impact, or founder opportunity cost). Knowledge domain groupings that tell you where to start first.

**Next step:** Run Prompt 02 (First Ingest) with a source from your top-ranked domain.

**Pro tip:** Include non-digital knowledge sources when describing your tools (WhatsApp, verbal handoffs, in-person observations, ERP systems). Mention up front if you're in a regulated industry or if knowledge is concentrated in specific people. The more context about how knowledge actually flows in your org, the more targeted the audit.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
