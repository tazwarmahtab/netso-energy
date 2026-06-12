# Prompt 03: Batch Ingest

**Purpose:** Process multiple new sources at once and integrate them into your existing wiki. This is the prompt you'll use most often. It handles creating new pages, updating existing ones, flagging contradictions, and keeping the index and log current.

**When to use:** Whenever you have 2-5 new sources to process. Run this weekly, or whenever you accumulate a batch of articles, call transcripts, or research docs.

---

## Thinking Logic (for AI assistants running this prompt)

Before processing this batch, silently work through these checks:

1. **WIKI MATURITY:** How many pages does the wiki currently have? Under 10 pages = growing stage (be generous creating new pages). 10-30 = consolidation (focus on enriching existing pages). 30+ = mature (focus on updates and pattern detection, create new pages only for genuinely new entities).

2. **BATCH COMPOSITION:** What mix of source types is in this batch? If multiple source types are present (e.g., a transcript + a spreadsheet + a regulatory doc), process each one using its correct source-type approach. Don't apply the same ingestion logic to all of them.

3. **TOPIC OVERLAP:** Do any sources in this batch cover the same entities or topics? If yes, process them in sequence and merge findings into existing pages rather than creating duplicate pages for the same entity from different sources.

4. **CONTRADICTION DETECTION:** Check for contradictions WITHIN the batch (two sources in the same batch disagreeing) AND between the batch and existing wiki pages. Classify each as temporal update, context variation, or actual contradiction.

5. **SCALE CHECK:** If the batch contains any source with more than 50 data points (long spreadsheets, large exports), trigger the structured data rule: summarize, don't page-per-row.

6. **AUTHORITY RANKING:** When two sources in the same batch cover the same topic, the higher-authority source takes precedence for current-state fields. The lower-authority source supplements with detail or context.

---

## The Prompt

```
You are a knowledge base curator. Your job is to evaluate new sources, integrate them into an existing wiki without duplication, flag contradictions, and maintain a clean index.

STEP 1: CLASSIFY THE BATCH

Before processing, work through these assessments:

Wiki maturity check:
- How many pages are currently in the wiki? Fewer than 10 = growing stage (generous with new pages). 10-30 = consolidation stage (balance new pages with updates). 30+ = mature stage (prioritize updating, create pages only for new topics).

Source type inventory:
- What types of sources are in this batch? Categorize as: narrative (articles, blog posts, call transcripts), structured (tables, lists, data exports), regulatory (compliance docs, policy changes), incident (customer issues, support tickets), behavioral (usage patterns, feedback themes). Mixed batches need different handling than uniform batches.

STRUCTURED DATA RULE (same as First Ingest): Do NOT create one wiki page per row. For any CSV, database export, registry, or structured table with more than 20 rows, extract summary pages, pattern pages, and entity pages only for the top-level entities. This applies to clinical trial exports, supplier databases, product catalogs, transaction logs, and any tabular data. If you're about to create more than 15 entity pages from a single structured source, stop and summarize instead.

Non-text handling:
- Are any sources non-text (screenshots, analytics exports, PDFs)? If yes, assess: Can the user provide extracted text? Is the format lossy (will graphs become bullet points)? Note any sources that may be incomplete after conversion.

**If the source is visual/creative content described in text** (competitor ads described by a human, UX screenshots with annotations, brand imagery analysis, creative brief descriptions):
- Label all visual observations with [OBSERVED, NOT VERIFIED]. Visual descriptions are subjective.
- Create entity pages for brands/competitors if mentioned, with a "creative intelligence" section.
- Create pattern pages for creative strategy themes (e.g., "Brand X uses urgency-based CTAs consistently").
- Do not synthesize from visual observations alone. Pair with at least one authoritative source before creating synthesis pages.

Topic overlap check:
- Do multiple sources cover the same entity, concept, or pattern? If yes, group them for processing together to avoid duplicate page creation.

Wiki maturity: [STATE THE CURRENT MATURITY STAGE]
Source type distribution: [CATEGORIZE EACH SOURCE]
Non-text sources identified: [YES/NO AND WHICH ONES]
Topic overlap detected: [YES/NO AND WHERE]

STEP 2: PROCESS EACH SOURCE

I have an existing knowledge wiki. Here's the current state:

CURRENT INDEX (from wiki/pages/_index.md):
[PASTE your _index.md here]

RELEVANT WIKI PAGES (paste the ones most likely affected by these new sources):
[PASTE relevant existing wiki pages]

Here are my new sources. Process each one following the Batch Ingest operation in WIKI-SCHEMA.md:

SOURCE 1:
- File: wiki/raw/[FILL IN: subfolder]/[FILL IN: YYYY-MM-DD-slug].md
- Source type: [narrative / structured / regulatory / incident / behavioral]
- Content:
[PASTE source 1]

SOURCE 2:
- File: wiki/raw/[FILL IN: subfolder]/[FILL IN: YYYY-MM-DD-slug].md
- Source type: [narrative / structured / regulatory / incident / behavioral]
- Content:
[PASTE source 2]

[ADD MORE SOURCES AS NEEDED]

For each source:
1. Read it fully before extracting anything
2. Identify what entities, concepts, patterns, or topics it covers
3. Cross-check against existing pages to find overlaps
4. Flag any contradictions with existing data using [[CONTRADICTION: new claim vs existing claim, dated [date]]]
5. Create a source-summary page in wiki/pages/sources/ that captures the source's scope and reliability
6. Identify which existing pages need updates and what new information to add
7. Flag any sources that contradict each other in this batch using [[BATCH-CONTRADICTION: SOURCE-A vs SOURCE-B]]
8. Create new pages only for topics not already in the wiki, following the page type in WIKI-SCHEMA.md
9. Add [[wikilinks]] between all connected pages

Edge cases to handle:
- If sources in this batch contradict each other: flag both contradictions for the user to research and decide
- If a source contradicts existing wiki data by more than 90 days: escalate as "recent contradiction" and preserve both timestamps
- If a source is thin on evidence (single claim, no citations): note in the source-summary as "low evidence" and mark any claims from it as lower-confidence
- If the batch contains regulatory or incident data: mark those pages with [CONFIDENTIAL] in the frontmatter if sensitive, or ask the user before proceeding

STEP 3: BEFORE MAKING ANY CHANGES, SHOW A SUMMARY

Before you output any pages, show me:
- New pages to create (with page type, filename, and why it's needed)
- Existing pages to update (with what's changing and why)
- Contradictions found (flag all contradictions between new sources and existing pages, or between sources in this batch)
- Gaps that remain open (what topics are still missing after this batch)
- Confidence notes (which new claims come from low-evidence sources)

Then ask: "Does this plan look right? Any changes before I generate the pages?"

Wait for approval before proceeding.

(In manual mode with ChatGPT, Gemini, or other LLMs: the LLM will output the full change summary in one response. Review it, then send a follow-up message saying "proceed" or "revise [specific item]" to trigger the final pass.)

STEP 4: OUTPUT THE CHANGES

Once approved:
- Each new page as a separate markdown block with the full file path (wiki/pages/[type]/[filename])
- Each updated page showing ONLY the changed sections (mark with >>> NEW <<<)
- Updated wiki/pages/_index.md with new pages added
- New entry for wiki/pages/_log.md with timestamp, batch summary, and contradiction count
- Quality self-check: before delivering output, verify that:
  - No duplicate pages were created for the same entity
  - All internal [[wikilinks]] use existing page names or match the new pages being created
  - Contradictions are explicitly flagged with sources and dates
  - Pages follow the structure from WIKI-SCHEMA.md
  - Source-count in frontmatter matches actual sources cited
```

---

## What You'll Get

Updated wiki pages with new information integrated, new pages where needed, and a clear picture of what's complete vs. what still has gaps. The contradiction flags are especially valuable because they force you to decide which source is correct rather than letting stale data sit unchallenged.

### Handling Non-Text Sources

If you have screenshots, images, analytics exports, or PDFs to ingest:
- **Screenshots/images:** Describe what you see in text form and paste the description as the source content. Include all visible data, labels, and numbers.
- **Analytics exports:** Copy the key metrics and tables as text. Include column headers and date ranges.
- **PDFs:** Extract the text first (most PDF tools have a "copy all text" option). Paste the extracted text.

The wiki is text-based. Convert everything to text before ingesting.

**Pro tip:** Don't paste your entire wiki every time. Paste _index.md (so the LLM knows what exists) plus only the pages likely to be affected by your new sources. If you're ingesting a competitor article, paste the relevant entity and brand pages. If you're ingesting call transcripts, paste the relevant market and pattern pages. This saves tokens and keeps output focused.

**Token optimization:** When your wiki exceeds 30 pages, the LLM may hit token limits. In that case, be even more selective about which pages you paste. Focus on pages in the same category (all entity pages, all patterns, etc.) rather than pasting diverse page types. The LLM only needs context on pages that might be affected by these specific sources.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
