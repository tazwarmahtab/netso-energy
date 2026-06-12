# Prompt 04: Query Wiki

**Purpose:** Ask your wiki a question and get a sourced answer from your compiled knowledge. This is where the wiki pays off. Instead of re-reading raw sources or bugging your team, you query the compiled pages and get an answer in seconds with citations.

**When to use:** Anytime you need an answer from your wiki's knowledge. Before a sales call. During content planning. When a teammate asks about a competitor. When you need data to back up a strategic decision.

---

## Thinking Logic (for AI assistants running this prompt)

Before answering any query, silently work through these checks:

1. **DATA EXISTENCE:** Does the wiki actually contain pages relevant to this question? If the user is asking for win rates, financial benchmarks, or specific metrics, check if the wiki has performance or pattern pages covering this data. Do NOT fabricate data that doesn't exist in the wiki.

2. **COVERAGE COMPLETENESS:** If the query involves multiple instances (multiple stores, multiple competitors, multiple clients), count how many instances the wiki covers vs. how many likely exist. If coverage is below 50%, flag: "This answer covers [N] of approximately [M] known instances. Results may not be representative."

3. **STALENESS SENSITIVITY:** For financial data, competitive intelligence, and pricing queries, use a 45-day staleness threshold instead of the default 90 days. For regulatory and methodology queries, 90 days is fine.

4. **QUERY AMBIGUITY:** If the query is vague or could be interpreted multiple ways, ask the user to narrow it before producing a potentially misleading answer. It's better to ask one clarifying question than to answer the wrong question with wiki data.

5. **CONTRADICTION VALUE:** If two wiki pages contradict each other on this topic, consider whether the contradiction itself is informative. A competitor whose pricing differs across sources might be running different pricing for different segments. Flag it, but also interpret it if the data supports an interpretation.

6. **NEXT STEP ROUTING:** After answering, suggest the right follow-up prompt. If gaps are significant: Prompt 03 to ingest more sources. If the same question comes up often: Prompt 10 to create a synthesis page. If contradictions need resolving: Prompt 07 to run a maintenance pass.

## The Prompt

Copy and paste this into your LLM. Replace every [FILL IN] with your context.

```
You are a knowledge assistant querying a compiled wiki. Your only source of truth is the wiki pages provided below. Do not use outside knowledge.

STEP 1: CLASSIFY THE QUERY

Before answering, determine what type of question this is:

Query classification:
- Factual lookup: Find a specific answer from the wiki (e.g., "What's their pricing model?" or "When did they release this feature?")
- Analysis request: Connect dots across multiple pages to answer a deeper question (e.g., "How does their strategy compare to our approach?")
- Gap identification: Determine what the wiki doesn't know (e.g., "What do we know about their roadmap?")
- Decision support: Help choose between options using wiki data (e.g., "Should we position against them on price or features?")

Query type: [FILL IN: factual lookup / analysis request / gap identification / decision support]

STEP 2: ASSESS DATA SUFFICIENCY

Before I spend time answering:
- How many wiki pages are relevant to this question? If fewer than 2, this may not have enough data. I'll flag this upfront.
- How many sources back up the relevant pages? If a page has source-count: 1, that claim might change as more sources are added.
- Are the relevant pages recent, or are they getting stale? If key pages are older than 90 days, I'll note that.
- Does the wiki have obvious gaps for this question? If yes, I'll name them specifically.

Data sufficiency assessment:
- Relevant pages available: [number]
- Average source-count on those pages: [number]
- Staleness check (anything older than 90 days?): [YES/NO and which pages]
- Obvious gaps for this query: [name specific page types that would help]

STEP 3: ANSWER THE QUESTION

Here are the wiki pages for this query:

[PASTE relevant wiki pages from wiki/pages/. Check _index.md to find the right ones for your question.]

HARD STOP CHECK: Count the wiki pages relevant to this question.
- If 0 relevant pages: Do NOT attempt to answer. Respond: "The wiki does not have data on this topic. To answer this question, you would need to add [specific page types] from [specific source types]. Use Prompt 02 or 03 to ingest those sources first."
- If 1 relevant page with source-count of 1: Answer with a prominent warning: "This answer is based on a single page backed by one source. Treat it as preliminary, not definitive. Adding more sources with Prompt 03 would strengthen this answer."
- If 2+ relevant pages: Proceed with the answer.
NEVER fill gaps with outside knowledge, industry benchmarks, general patterns, or estimates. If the wiki doesn't contain the data, say so and name what's missing.

My question: [FILL IN: your actual question]

Answer using only the information in these wiki pages. Follow these rules:

1. Cite every claim using [[page-name]] wikilinks so I can trace it back
2. For each claim, indicate confidence level: high (multiple sources, recent), medium (1-2 sources, recent OR multiple older sources), low (single source, older than 90 days)
3. If two pages contradict each other, flag it: "[[page-a]] says X (dated [date]) but [[page-b]] says Y (dated [date]). These should be reconciled."
4. If any information you're citing is older than 90 days, note the date so I can decide if it's still reliable
5. Do not guess or fill gaps with assumptions

STEP 4: IDENTIFY GAPS AND NEXT STEPS

After answering, explicitly state:
- What the wiki answered well
- What the wiki couldn't answer fully
- What source documents would fill the biggest gaps: "To answer this more completely, the wiki needs [specific page type] covering [topic], ideally from [suggested source type like "recent earnings call", "analyst report", "customer interviews"]"
- If gaps are critical to your decision, recommend running Prompt 03 (Batch Ingest) with those source types before deciding
- For contradictions found, run Prompt 07 (Weekly Maintenance Pass) with both contradicting pages. It will classify the contradiction and determine resolution.

Format the answer for [FILL IN: my sales team / my product team / my exec team / my customer].
Keep it to [FILL IN: 1 paragraph / a few bullet points / 1 page / whatever length you need].

If my question is too vague to answer well, ask me to narrow it down before you start.

STEP 5: QUALITY SELF-CHECK

Before delivering the answer, verify:
- Every claim is cited to a wiki page
- Confidence levels are assigned to each claim
- Contradictions are flagged with both dates
- Staleness is noted for pages older than 90 days
- Gaps are named specifically, not vaguely
- No outside knowledge was used
- The answer stays within the requested format and length
```

---

## What You'll Get

A sourced answer that traces back to specific wiki pages. The citations make it verifiable. Confidence levels tell you which claims are solid vs. which might shift as you add more sources. Gap identification tells you what to research next.

**Next step:** If the same question comes up repeatedly, run Prompt 10 (Synthesis Generator) to turn the answer into a permanent wiki page.

**Pro tip:** After getting your answer, check if the question comes up often. If it does, create a synthesis page from the answer so you don't need to re-query. The best wikis turn frequent queries into permanent pages. Track which queries appear most often in your _log.md. Those are candidates for synthesis pages.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
