# Prompt 05: Deal Prep

**Purpose:** Build a one-page briefing before a sales call or deal conversation. This prompt pulls from your entity, brand, market, and pattern pages to give you a prospect-specific prep doc you can scan in 2 minutes before the call.

**When to use:** Before any sales call, demo, or deal discussion. Especially valuable when the prospect uses a competitor you've already profiled in the wiki.

---

## Thinking Logic (for AI assistants running this prompt)

Before generating the briefing, silently work through these checks:

1. **CALL TYPE CLASSIFICATION:** Is this a discovery, demo, RFP, negotiation, or executive review? Each type produces a structurally different briefing. If the user doesn't specify, infer from the deal stage field and confirm.

2. **DATA SUFFICIENCY:** Count wiki pages relevant to this prospect's industry, their current vendor, and the competitors in the deal. If fewer than 3 relevant entity pages exist, warn upfront: "This briefing is based on limited wiki data ([N] relevant pages). Key sections may be thin. Consider ingesting [specific sources] with Prompt 03 before the call."

3. **STAKEHOLDER DEPTH:** For each person on the call, check if the wiki has role-specific patterns or entity pages. If not, use the fallback inference approach but label it clearly.

4. **MULTI-COMPETITOR HANDLING:** If the deal involves comparisons against more than one competitor, structure the briefing with a per-competitor section rather than interleaving competitor data. This is especially important for RFP scenarios.

5. **DEAL SIZE CALIBRATION:** A $10K deal and a $2M deal need different briefing depth. If the user provides revenue or deal size, adjust how much detail to include. Larger deals warrant deeper competitive analysis and more thorough stakeholder mapping.

6. **RECENCY CHECK:** For competitive data, check last_updated dates on entity pages. If competitor data is more than 60 days old, flag it: "Competitor data may be outdated. Last updated: [date]."

---

## The Prompt

```
You are a deal intelligence analyst preparing a pre-call briefing sourced from your wiki.

STEP 1: CLASSIFY THE CALL TYPE

I have a call coming up and need a prep briefing from my wiki.

Here's what I know about the prospect:
- Company: [FILL IN: name]
- Industry: [FILL IN]
- Company size: [FILL IN: employees, revenue if known]
- Current vendor/tools: [FILL IN: what they're using now]
- Key people on the call: [FILL IN: names, titles, roles]
- How they found us: [FILL IN: inbound, outbound, referral]
- Deal stage: [FILL IN: first call, demo, negotiation, RFP response, executive review, etc.]

Call-type classification (choose one):
- Discovery: Learning what they're trying to achieve and what's broken
- Demo: Showing your solution and positioning against their current vendor
- RFP Response: Mapping requirements to your capabilities
- Negotiation: Working through pricing, terms, or scope
- Executive Review: Board-level or c-suite visibility into the deal

Identified call type: [FILL IN]

OUTPUT FORMAT varies by call type. Adjust the briefing structure based on classification:

- Discovery: Lead with 8-10 discovery questions specific to the prospect's situation. Include qualifying criteria. Focus on what you need to learn, not what you need to say.
- Demo: Lead with positioning against their current vendor. Include a feature comparison grid using wiki data. Prepare objection responses for their likely pushback points.
- RFP: Lead with a requirement-to-capability mapping table. For each requirement, cite wiki data on your capability AND the competitor's capability. Include differentiation per requirement category.
- Negotiation: Lead with pricing intelligence from wiki (competitor pricing, historical deal terms, market benchmarks). Include BATNA data if available. Prepare concession framework.
- Executive Review: Lead with a business case summary. Include ROI data from wiki if available. Focus on executive-level differentiation, not feature comparison.

If the call type doesn't match any of these cleanly, describe the call and I'll adapt the output.

STEP 2: ASSESS WIKI DATA SUFFICIENCY

Before I build the briefing, I'll check what we have:
- Entity data on their current vendor: How many sources? When last updated?
- Competitive intel on vendors we should mention: Available?
- Industry/market patterns relevant to them: Any pattern pages on file?
- Stakeholder profiles: Do we have data on their role types?

If I have fewer than 3 sources on their current vendor, I'll flag this: "Your wiki data on [vendor] is thin. This briefing will have gaps. Consider running Prompt 03 with competitive sources before this call."

If key wiki pages are older than 90 days, I'll note them so you know whether to verify before the call.

Data assessment:
- Sources on their current vendor: [number]
- Last updated on vendor data: [date]
- Market/pattern pages relevant: [YES/NO]
- Stakeholder role data available: [YES/NO]

STEP 3: MAP STAKEHOLDERS AND CONCERNS

Identify all people on the call. For each, note:
- Their role and what they care about (use role patterns from the wiki if available)
- What their vendor likely does well (benefits they're getting)
- Where they're probably frustrated (based on competitive intelligence)
- Their likely objection or concern (e.g., CFO fears budget, CTO fears switching costs, User dreads retraining)

Do not guess. Use only wiki data to infer stakeholder concerns based on role patterns.

If no role pattern pages exist in your wiki yet, infer stakeholder concerns based on their job title, industry, and company context. Label all inferred concerns as [INFERRED, NOT SOURCED FROM WIKI] so the user can distinguish between wiki data and general inference. As the wiki grows, these inferred sections get replaced with sourced data.

STEP 4: HANDLE MULTIPLE COMPETITORS IF PRESENT

If the prospect is evaluating multiple vendors:
- Name each competitor
- For each, note: where we win, where we lose, and one key differentiator
- Avoid generic comparisons. Use specific data from the wiki.

If the wiki doesn't have comparative data on all vendors, note which competitor data gaps exist.

Here are the wiki pages relevant to this deal:
[PASTE relevant pages. At minimum include:
  - Entity page for their current vendor (wiki/pages/entities/)
  - Brand page if available (wiki/pages/brands/)
  - Relevant market or pattern page (wiki/pages/market/ or wiki/pages/patterns/)
  - Any concept pages about objections or positioning (wiki/pages/concepts/)]

STEP 5: BUILD THE BRIEFING

Now create the briefing. Format depends on call type:

IF DISCOVERY CALL:
1. THEIR WORLD
   - What their current vendor does well
   - What they're getting frustrated with (based on wiki data on vendor weaknesses)
   - Pain patterns others in their industry face

2. OUR OPENING APPROACH
   - Lead with a question, not a pitch (based on known frustrations)
   - What listening targets matter most

3. QUESTIONS TO ASK (in order)
   - Questions designed to surface pain with their current vendor
   - Questions that position our strengths

IF DEMO CALL:
1. THEIR CURRENT VENDOR (competitive context)
   - Top strengths they're getting
   - Specific gaps where we win
   - Recent changes at their vendor that might affect them

2. OUR POSITIONING FOR THIS CALL
   - What to lead with (your biggest advantage over their vendor, from wiki data)
   - What to mention second
   - What to hold for later (for negotiation phase)

3. DEMO FLOW
   - Show feature X first (because their vendor is weak here)
   - Emphasize capability Y (where we win)
   - Avoid showing Z (not relevant to their pain points)

4. HANDLING OBJECTIONS
   - Top 3 objections this prospect type raises
   - Your wiki-backed response for each

IF RFP/NEGOTIATION/EXECUTIVE REVIEW:
1. THEIR EVALUATION CRITERIA (if RFP)
   - Map their stated requirements to your capabilities
   - Note where requirements align with your strengths
   - Flag requirements that stretch your offering

2. PRICING AND TERMS CONTEXT
   - What their vendor likely charges
   - Pricing patterns for their company size
   - Budget signals from their RFP or feedback

3. NEGOTIATION STRATEGY
   - What to lead with
   - What to hold (for trade-offs later)
   - Red lines and flexibility zones

4. EXECUTIVE TALKING POINTS
   - Business case points (ROI, time to value, switching risk)
   - Strategic fit points (market trends, where they're headed)
   - Risk mitigation (what could go wrong if they don't move)

---

All briefing types:
- Cite wiki pages with [[wikilinks]] so I can verify before the call
- Keep it scannable: short paragraphs, bullets, bold the most important point
- Target length: 1-2 pages, readable in 2-3 minutes

STEP 6: QUALITY SELF-CHECK AND MINIMUM WIKI REQUIREMENTS

Before delivering the briefing, verify:
- Every competitive claim comes from a wiki page (not general knowledge)
- Stakeholder concerns are based on role patterns or actual wiki data, not guesses
- Objections are ones we've actually seen (from wiki incident or customer pages), not hypothetical
- Data on their vendor is less than 90 days old (or flagged if older)
- If the briefing feels thin (fewer than 3 sources on their vendor), say so upfront

Minimum wiki requirements for this briefing:
- For a good briefing: 1 entity page on their current vendor (source-count 3+), 1 market or pattern page
- For a basic briefing: 1 entity page (source-count 1-2), any market context
- For a weak briefing: No entity data on their vendor, will need to source from general knowledge

If I'm below "good" quality, I'll tell you what pages to ingest before the call.
```

---

## What You'll Get

A prospect-specific briefing sourced from your compiled competitive intelligence. Not generic advice, but data-backed positioning based on what your wiki knows about their vendor, their market segment, and relevant patterns.

**Next step:** After the call, capture what you learned in a new raw source file (wiki/raw/transcripts/ or wiki/raw/data/) and run Prompt 03 (Batch Ingest) to feed the new information back into the wiki. Every sales conversation makes the wiki smarter for the next one.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
