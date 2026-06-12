# Prompt 13: Source Prioritizer

**Purpose:** Rank your sources by information density, authority, and cross-reference potential. Detects dependency chains so you ingest foundation sources first, flags source gaps and readiness issues, and helps you build the most useful initial wiki with the fewest sources.

**When to use:** Before your first major ingest session. You have sources available but aren't sure which to process first.

---

## Thinking Logic (for AI assistants running this prompt)

Before ranking sources, silently work through these checks:

1. **VOLUME ASSESSMENT:** Does the user have any source pools with 20+ similar documents? If yes, trigger the deduplication gate before ranking. Don't recommend ingesting 200 customer reviews individually.

2. **SOURCE TYPE COVERAGE:** Are all five source types represented in the user's list? If any type is completely absent (e.g., no authoritative sources in a regulated domain), flag the gap: "Your source list has no [type]. For your domain, you should consider adding [specific source examples]."

3. **DEPENDENCY DETECTION:** Do any sources reference or depend on other sources? Architecture Decision Records reference earlier ADRs. Compliance interpretations depend on the regulation being ingested first. Map these dependencies and ensure foundational sources land in the top 15 even if they rank lower on other criteria.

4. **DOMAIN-SPECIFIC AUTHORITY:** Authority ranking varies by domain. In pharma: published papers > internal data > conference abstracts. In legal: statute > guidance > interpretation > opinion. In engineering: system-of-record > design docs > Slack discussions. Apply the authority hierarchy that matches the user's domain.

5. **SOURCE READINESS:** Flag sources that require extraction work (locked in ERP, POS, databases, or exist only as verbal knowledge). These shouldn't be ranked alongside ready-to-paste documents. They should be listed in a separate "extraction needed" section with specific steps to make them ingestible.

6. **CROSS-REFERENCE POTENTIAL SCORING:** Sources that mention multiple entities or span multiple topics rank higher because they create more wiki connections per ingest. A quarterly business review that covers 5 competitors creates 5x the cross-reference value of a single competitor blog post.

---

## The Prompt

```
You are an information architect helping me decide which documents to feed into my knowledge wiki first. The goal is to build the most useful initial wiki with the fewest sources.

My wiki domain: [DOMAIN]
My industry: [INDUSTRY]
My wiki schema: [PASTE OR SUMMARIZE YOUR SCHEMA FROM PROMPT 3]

Here are the raw sources I have access to:
[LIST EVERYTHING: tools, document types, locations, approximate quantity of each. Include digital sources (docs, spreadsheets, exports), system-locked sources (ERP, CRM, POS data), and non-digital sources (verbal knowledge, WhatsApp messages, in-person observations) if relevant.]

Before ranking, classify each source type:

- Narrative sources (transcripts, articles, emails, meeting notes): Rich in context but require extraction.
- Structured data sources (CSV exports, database tables, spreadsheet reports, ERP/POS data): Dense in facts and metrics but lack narrative context.
- Authoritative sources (regulatory filings, official guidance, audited reports, board-approved docs): These carry more weight than informal sources regardless of other criteria. In regulated industries, an official agency document always outranks an internal interpretation memo.
- Informal/conversational sources (Slack threads, WhatsApp messages, verbal handoffs): Context-rich but unreliable as sole sources. Best used to supplement authoritative sources.
- Semi-structured technical/scientific sources (API documentation, clinical trial registries, patent databases, regulatory code compilations, technical changelogs): These combine structured metadata (fields, versions, status codes) with narrative content (descriptions, rationales, migration guides). Rich in both facts and context. Rank by: authority level of the source registry, coverage breadth across your domain, and version currency. These sources should be ingested in two passes: first the structured metadata as entity or metric pages, then the narrative sections as concept or pattern pages.

DEDUPLICATION CHECK: Before ranking individual sources, identify any source type where you have more than 20 instances of similar documents (e.g., 200 customer reviews, 50 competitor websites, 100 survey responses, 200+ clinical trial records).

For these high-volume pools:
- Do NOT rank or ingest every individual document. Recommend a representative sample.
- Suggest sample size: 15-20 documents selected for diversity (across ratings, topics, time periods, segments).
- Suggest sampling criteria: most recent, most detailed, most diverse in perspective, highest information density per document.
- Note: "Ingesting all [N] documents would create wiki bloat. A sample of [M] will capture the key patterns. You can always add more later if the wiki shows gaps."

Rank sources using four criteria:

1. Information density: How much unique, actionable knowledge does this source contain that doesn't exist in other sources? Note: density means learning per source, not text volume. A 20-person engagement retrospective may be denser than 50 individual email threads.

2. Cross-reference potential: Will this source create connections between multiple wiki pages (entities, concepts, patterns)? Sources that mention multiple entities or span multiple topics rank higher.

3. Source authority: How reliable and definitive is this source type? Official docs, audited reports, and system-of-record data rank above informal messages and anecdotal notes. In regulated domains, always rank regulatory/legal sources first.

4. Currency: How current is this information and how much does currency matter for this domain? For operational knowledge, recent data beats old data. For regulatory knowledge, the most authoritative version matters more than the most recent opinion. For historical decisions (architecture records, past engagement learnings), the source is valuable regardless of age.

Also check for dependency chains: Are any sources interdependent? (Example: Architecture decision records that reference earlier ADRs. Compliance interpretations that depend on specific regulatory statutes being ingested first.) If so, note the dependency order and ensure foundational sources (the ones others depend on) are included in the top 10-15 even if they individually rank lower on the other criteria. A lower-density source that 5 other sources reference is more important to ingest first than a high-density source that stands alone.

From your ranking, pick the top 10 to 15 individual documents I should ingest first. For each one, tell me:
- What it is and what source type it is (narrative, structured, authoritative, informal)
- Why it ranked high
- Which wiki page types it will likely generate
- Whether it depends on another source being ingested first

Flag source gaps: If a page type in my schema won't have sources feeding it from this initial batch, tell me exactly what kind of document I need to find or create. If my domain requires coverage of multiple variants (states, locations, customer segments, product lines), flag whether my top 15 sources cover enough variants or leave blind spots.

Flag source readiness issues: If any high-value sources are locked in systems that aren't easily exportable (ERP, POS, databases), or exist only as non-digital knowledge (verbal, observational), flag those separately and suggest how to extract or capture them before ingestion.
```

---

## What You'll Get

Source type classification, ranked top 10-15 sources with reasoning, dependency order, source gap analysis, readiness flags for system-locked or non-digital sources.

**Next step:** Take the top-ranked source and run it through Prompt 02 (First Ingest). Then work through the rest using Prompt 03 (Batch Ingest).


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
