# Prompt 02: First Ingest

**Purpose:** Process your first source document and create the initial wiki pages. This prompt handles five source types (narrative text, structured data, behavioral/event data, regulatory/compliance, and incident/operational), adapts its structure for each one, and tracks confidence and authority metadata throughout. This is where your wiki goes from empty to useful.

**When to use:** After you've picked your first source to process. You use this prompt once for your very first source. After that, switch to Prompt 03 (Batch Ingest) for everything else.

---

## Thinking Logic (for AI assistants running this prompt)

Before processing this source, silently work through these checks:

1. **SCHEMA CHECK:** Did the user paste a schema? If no schema is provided, check if WIKI-SCHEMA.md exists in the folder. If neither exists, STOP and ask: "I need a schema to create properly structured pages. Either paste WIKI-SCHEMA.md from the Kit, or run Prompt 12 (Schema Builder) first to design one for your domain."

2. **SOURCE TYPE:** Classify the source before creating any pages. Narrative text, structured data, behavioral/event, regulatory/compliance, incident/operational, or semi-structured technical (API docs, clinical registries, patent databases)? If it doesn't fit cleanly into one category, note the hybrid nature and apply the closest two approaches.

3. **DOMAIN FIT:** Is this a standard GTM use case or something different (technical decisions, compliance, operations, research)? If non-GTM, check whether the schema has domain-specific page types. If it's using the default WIKI-SCHEMA.md for a non-GTM domain, warn: "Your schema uses GTM defaults. Some page types (market, brand) may not apply to your domain. Consider running Prompt 12 to build a custom schema."

4. **WIKI STATE:** Is this truly the first source (empty wiki) or does the wiki already have pages? If pages exist, suggest using Prompt 03 (Batch Ingest) instead, since it handles updates and contradiction checking.

5. **STUB CONTROL:** Before creating any stub pages, estimate how many the source would generate. If more than 5 stubs from a single source, tighten the criteria. Only stub entities that are highly likely to recur in future sources.

6. **CONFIDENCE CALIBRATION:** If the source is a single informal message, everything gets confidence: low. If it's an official record, everything gets confidence: high. Don't mix levels within the same page unless specific claims come from different authority tiers cited within the document.

## The Prompt

```
You are a knowledge base curator. Your job is to read a raw source and create structured wiki pages following a defined schema. Precision and cross-referencing matter more than speed.

Here is my wiki schema:

[PASTE YOUR SCHEMA, either from WIKI-SCHEMA.md (the default schema included in the Kit) or from a custom schema you built with Prompt 12 (Schema Builder)]

Here is the raw source to ingest:

[PASTE THE DOCUMENT OR DATA]

Read the full source before creating any pages. First, classify the source type, because different types need different ingestion approaches:

**If the source is narrative text** (transcript, article, email thread, meeting notes, blog post, report):
- Identify every entity (person, company, product, tool), concept, and pattern mentioned.
- Create wiki pages following the correct page type and frontmatter from the schema.

**If the source is structured data** (CSV export, spreadsheet, database table, ERP extract, POS data):
- Do NOT create one wiki page per row. Instead, extract the key dimensions (what are the column headers telling you?) and the key findings (what patterns, outliers, or summary metrics emerge from this data?).
- Create metric summary pages or pattern pages that describe what the data shows, with references to specific data points as evidence.
- Create entity pages only for the major entities represented in the data (top suppliers, top products, key customer segments), not for every row.

**If the source is behavioral/event data** (analytics exports, user activity logs, conversion funnels):
- Identify the key behavioral patterns, not individual events. What user actions correlate with outcomes? What sequences matter?
- Create pattern pages for behavioral findings and metric pages for key numbers.
- Link behavioral patterns to any entity pages they inform (products, features, customer segments).

**If the source is regulatory/compliance/legal** (statutes, agency guidance, audit reports, legal memos):
- Identify regulatory entities (agencies, statutes, jurisdictions) and create entity pages with fields for authority level, effective date, and jurisdiction.
- Track version history: if this regulation replaced or amended an earlier version, note that in the frontmatter.
- Set confidence based on source authority, not just source count. An official regulatory filing is high confidence from a single source. An internal interpretation memo is lower confidence even if it's detailed.

**If the source is incident/operational** (postmortems, incident logs, runbooks, outage reports):
- Identify system components, failure modes, causal chains, and timeline sequences, not just people and companies.
- Create entity pages for system components involved and pattern pages for failure modes.
- Preserve temporal sequence (what happened first, what triggered what) in the source summary page.

After classification, follow this process for all source types:

1. Create wiki pages following the correct page types and frontmatter from the schema. Apply domain-specific metadata fields if your schema includes them (regulatory authority, confidence level, version, jurisdiction, etc.).

2. Add [[wikilinks]] to connect pages. If a linked page doesn't exist yet, create a stub ONLY if that entity or concept is likely to appear in future sources. For one-off mentions that probably won't recur, note the reference in the current page without creating a stub. This prevents stub explosion in information-dense sources.

3. Create a source summary page with: key takeaways, action items (if any), entities and concepts identified, pages created, and links to every wiki page generated.

4. Set confidence levels based on source authority. Use two frontmatter fields: `confidence` (high/medium/low) for how reliable the information is, and `authority_source` (the specific source type) so downstream maintenance passes can compare authority levels when conflicts arise.
   - Official records, audited data, regulatory filings, system-of-record exports: confidence: high, authority_source: official
   - Meeting notes, call transcripts, internal memos from known experts: confidence: medium, authority_source: internal-expert
   - Informal messages, anecdotal reports, single-person observations, unverified claims: confidence: low, authority_source: informal
   - If a claim from a lower-authority source contradicts a higher-authority source, flag the contradiction explicitly and note the authority mismatch.

5. Produce an index update (page name, page type, status, confidence) and log this ingest operation with date, source name, source type, pages created, stubs created, and any contradictions or flags.

Quality check before delivering: Does every page have proper frontmatter including confidence? Are cross-references bidirectional? Are stubs limited to entities likely to recur? Is the source summary complete? For structured data sources, did you create summary/pattern pages instead of per-row pages?
```

---

## What You'll Get

Your first set of wiki pages tailored to your source type. Narrative sources produce entity, concept, topic, and pattern pages. Structured data produces summary and pattern pages plus entity pages for major categories. Behavioral data produces pattern and metric pages linked to affected entities. Regulatory sources produce entity pages with jurisdiction and version history. Incident sources produce system component entities plus failure mode patterns. Every page includes confidence and authority metadata, bidirectional cross-references, and the source summary pulls everything together.

**Index update:** Page name, page type, status, confidence level.

**Operation log:** Date, source name, source type, count of pages created, stubs created, flags or contradictions.

**Next step:** Add 2-3 more sources this week using Prompt 03 (Batch Ingest).

**Pro tip:** Paste your schema from WIKI-SCHEMA.md (default) or from a custom schema built with Prompt 12 (Schema Builder) into the prompt. The prompt auto-detects your source type and adjusts its approach. Stubs are only created for entities or concepts likely to recur in future sources, preventing wiki bloat from one-off mentions.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
