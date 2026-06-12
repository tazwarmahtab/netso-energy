# Prompt 12: Schema Builder

**Purpose:** Design a domain-adapted wiki schema with industry-specific page types, variant tracking, and structured data handling rules. Most teams need a schema tailored to their domain, not a generic one.

**When to use:** When you're ready to build your wiki and need a schema that fits your domain, your source types, and your governance requirements.

---

## Thinking Logic (for AI assistants running this prompt)

Before designing the schema, silently work through these checks:

1. **DOMAIN CLASSIFICATION:** Is this standard GTM knowledge, regulated knowledge, technical/engineering knowledge, operational knowledge, or research knowledge? Each type needs different page types and metadata fields.

2. **SOURCE TYPE MIX:** What sources will feed this wiki? If the user lists mostly narrative sources, keep the schema simple. If they mention structured data (spreadsheets, exports, databases), add structured data handling rules. If they mention regulated or legal sources, add authority tracking and version history from the start. Retrofitting these is harder than building them in.

3. **SCALE PREDICTION:** Will this wiki serve 1 person, a small team, or a large organization? Single-user wikis can skip governance rules. Team wikis need ownership and update responsibility. Org-wide wikis need access control guidance and clear update workflows.

4. **MINIMUM VIABLE SCHEMA:** Start tight. The user should be able to set this up in under 2 hours. Don't create 15 page types when 7 would cover 90% of use cases. They can always add page types later. But DO include domain-critical types from the start (regulatory pages for regulated industries, decision records for engineering teams, SOP pages for operations).

5. **CROSS-REFERENCE COMPLEXITY:** Don't just say "pages should link to each other." Specify which page types link to which, and what the link means. An entity page linking to a pattern page means "this entity is involved in this pattern." A concept page linking to an entity means "this concept applies to this entity." Clear semantics prevent a tangled web of meaningless links.

6. **DEFAULT SCHEMA COMPATIBILITY:** If the user says they want to modify (not replace) the default schema, ensure all additions are additive. Don't remove or rename existing page types from WIKI-SCHEMA.md. Add new ones alongside them.

---

## The Prompt

```
You are an information architect designing a structured knowledge system. You've built these for SaaS companies, consulting firms, healthcare organizations, manufacturing operations, franchise businesses, and regulated industries. You adapt the schema to the domain, not the other way around.

I want to build a compiled knowledge wiki for [DOMAIN: competitive intelligence / customer objections / deal intelligence / product knowledge / regulatory compliance / supplier intelligence / clinical evidence / operational playbooks / etc.]. In this system, an AI reads raw source documents and creates structured, interlinked wiki pages that it maintains over time, rather than searching raw docs from scratch each time.

My industry: [INDUSTRY]
My raw sources will include: [LIST YOUR SOURCES: call transcripts, competitor websites, G2 reviews, internal docs, ERP exports, regulatory filings, audit reports, POS data, WhatsApp messages, data exports, spreadsheets, etc.]

Before designing the schema, classify my situation:

- Source types: Are my sources mostly narrative text (transcripts, articles, emails)? Structured data (CSV exports, database tables, ERP data, POS logs)? A mix? This determines how ingestion rules should work.
- Domain type: Is this standard business knowledge (competitive intel, deal patterns, playbooks)? Regulated knowledge (compliance, clinical, legal) that needs source authority tracking and version history? Operational knowledge (SOPs, processes, location-specific variants) that needs variant tracking?
- Scale: Will this wiki be used by one person, a small team, or a large organization? This determines governance rules.

Design a complete wiki schema. Deliver these sections:

1. Folder structure: How to organize both raw sources (by type, including a separate path for structured data sources) and wiki pages (by page type). Use clear folder names.

2. Page types: Generate page types appropriate for MY domain and industry, not just the defaults. Start with the universal types (entity, concept, source summary, pattern, synthesis) and then add domain-specific types.
   - For regulated industries: add regulatory summary pages, interpretation history pages, and compliance status pages with fields for regulatory authority, effective date, and jurisdiction.
   - For product/engineering: add decision record pages with fields for decision criteria, alternatives considered, tradeoffs, and rejection rationale.
   - For consulting/agencies: add framework library pages and engagement retrospective pages.
   - For operations/franchises: add SOP pages with variant tracking. Variants can be location-based (different processes per site), time-based (seasonal playbooks), customer-segment-based (different approaches per segment), or product-line-based. The variant structure should support a baseline version plus any number of conditional overrides with clear labels for when each override applies.
   - For data-heavy domains: add metric summary pages and cohort analysis pages.
   For each page type: what it captures, when to create one, and a sample frontmatter template (YAML metadata). If my domain requires compliance, regulatory, or authority metadata, include those fields in the frontmatter.

3. Cross-referencing rules: Which page types should link to which. How to handle references to pages that don't exist yet. If my sources come from different systems with different levels of detail (e.g., CRM deal notes vs. call transcripts vs. product usage data), specify how pages from different source granularities should reference each other.

4. Quality rules: When the AI should update an existing page vs. create a new one. When to flag a genuine contradiction (two sources from the same period claiming different things) vs. a temporal update (information changed over time) vs. a context-dependent variation (different answers for different segments, locations, or use cases). What minimum information a page needs before it counts as complete.

5. Naming conventions: How to name files so they stay organized as the wiki grows past 50 pages. Include conventions for versioned content (regulations that change, pricing that updates, SOP revisions).

6. Structured data handling: If my sources include data exports, spreadsheets, or system extracts, specify how to ingest them. Should the AI create summary pages from tabular data? Should it extract key metrics into metric pages? How should it handle rows with many fields without creating a page per row?

7. Domain-specific metadata fields: Before designing frontmatter, identify the 5-10 fields your team would filter by when searching the wiki. These go into every page's YAML frontmatter alongside the defaults (page_type, created, last_updated, sources).

   Examples by domain:
   - Security: cvss_score, detection_method, coverage_status, affected_systems, remediation_status
   - Logistics/engineering: api_version, endpoint_path, deprecation_date, last_tested_date, integration_status
   - Pharma/clinical: trial_phase, mechanism_of_action, enrollment_status, primary_endpoint, regulatory_jurisdiction
   - Legal/compliance: jurisdiction, regulation_version, effective_date, authority_level, interpretation_status
   - Consulting: client_segment, engagement_type, project_stage, methodology_applied
   
   What fields would YOUR team filter by? List them and I'll build them into every frontmatter template so your wiki is queryable from day one.

COMPATIBILITY CHECK: If you're building a custom schema to replace the default WIKI-SCHEMA.md, make sure your schema preserves these required elements:
1. _index.md and _log.md files in wiki/pages/
2. YAML frontmatter with at minimum: page_type, created, last_updated, sources, and confidence fields
3. [[wikilinks]] for cross-references between pages
4. The four core operations (Ingest, Batch Ingest, Query, Lint/Maintenance)
If any of these are missing from your custom schema, add them back. They're the foundation the other prompts depend on.

Keep the schema tight enough that I can set it up in under 2 hours but detailed enough that an AI can follow it without asking me what to do every step.

Don't over-engineer. Start with the minimum viable schema that I can expand later. But don't under-engineer either. If my domain needs compliance, authority, or variant tracking, include those from the start because retrofitting them is harder than building them in.
```

---

## What You'll Get

Complete schema with folder structure, domain-specific page types with frontmatter templates, cross-referencing rules, quality rules (contradiction vs temporal update vs context variation), naming conventions, structured data handling rules.

**Next step:** Use your schema to run Prompt 13 (Source Prioritizer) to decide which documents to ingest first.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
