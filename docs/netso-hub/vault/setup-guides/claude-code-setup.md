# Setup Guide: Claude Code (Recommended for Power Users)

Claude Code gives you a persistent, intelligent file system and CLI commands. It reads your folder structure, understands WIKI-SCHEMA.md as context, and creates/edits wiki pages directly. This is the most powerful setup because Claude Code can manage files, run scripts, and maintain the wiki autonomously.

## Prerequisites

- Claude Code installed and working
- A terminal you're comfortable using

## Step 1: Create the folder structure

Open your terminal. Navigate to where you want your wiki to live, then run the folder setup script from the Kit:

```bash
cd ~/Documents  # or wherever you want the wiki
mkdir wiki
cd wiki
bash /path/to/GTM-Knowledge-System-Kit-v1/folder-setup.sh
```

Or create manually:

```bash
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p wiki/_archive
```

## Step 2: Save WIKI-SCHEMA.md as your system context

Copy WIKI-SCHEMA.md from the Kit into your wiki folder:

```bash
cp /path/to/GTM-Knowledge-System-Kit-v1/WIKI-SCHEMA.md wiki/WIKI-SCHEMA.md
```

This is your source of truth for how the system works. Claude Code reads it automatically when you open a session in the wiki directory.

## Step 3: Initialize index and log

Copy the templates from the Kit:

```bash
cp /path/to/GTM-Knowledge-System-Kit-v1/templates/index-template.md wiki/pages/_index.md
cp /path/to/GTM-Knowledge-System-Kit-v1/templates/log-template.md wiki/pages/_log.md
```

## Step 4: Launch Claude Code

```bash
cd wiki
claude
```

Claude Code will read your folder structure and WIKI-SCHEMA.md automatically.

## Step 5: Initialize with a greeting

In Claude Code, type:

```
Read WIKI-SCHEMA.md and confirm you understand the system.
Then tell me:
1. What page types do I have?
2. What should I ingest first?
3. What's the first wiki page I should create?
```

Claude will confirm understanding and guide next steps.

## Step 6: Your first ingest

Export your first 5 raw sources to wiki/raw/. Put call transcripts in wiki/raw/transcripts/, articles in wiki/raw/articles/, research in wiki/raw/research/.

Then in Claude Code:

```
I've added 5 raw sources to wiki/raw/.
Process them following WIKI-SCHEMA exactly.

Create initial wiki pages in wiki/pages/.
Each page should have correct frontmatter, structure, and [[wikilinks]].
Use [MISSING] and [NEEDS VERIFICATION] tags for gaps.
Update wiki/pages/_index.md and wiki/pages/_log.md.
```

Claude Code will process the sources and create files directly in your wiki folder.

## Step 7: Query the wiki

Once you have pages created:

```
Using wiki/pages/, answer this question: [your question]
Cite pages using [[wikilinks]].
```

Claude loads the relevant files and answers from them.

## Step 8: Set up a slash command for weekly maintenance

Create a custom command file. In your wiki directory:

```bash
mkdir -p .claude/commands
```

Create `.claude/commands/weekly-lint.md`:

```markdown
Read all pages in wiki/pages/ and run the Lint operation from WIKI-SCHEMA.md.

Check for:
1. Pages not updated in 3+ weeks
2. Pages with source-count: 1
3. Unresolved [MISSING] or [NEEDS VERIFICATION] tags
4. Contradictions between pages
5. Dangling [[wikilinks]] pointing to pages that don't exist
6. Source summaries that no page references

Output a lint report and a prioritized action list.
Update wiki/pages/_log.md with the lint results.
```

Now you can run `/weekly-lint` in Claude Code every week.

## Step 9: Set up a slash command for ingestion

Create `.claude/commands/ingest.md`:

```markdown
Check wiki/raw/ for any files with status: pending-ingest in their frontmatter.

For each pending source, run the Ingest operation from WIKI-SCHEMA.md:
1. Create a source-summary page
2. Create or update wiki pages with new information
3. Add [[wikilinks]] between connected pages
4. Update wiki/pages/_index.md
5. Append to wiki/pages/_log.md
6. Change the source's status to ingested

After processing, report: what was created, what was updated, what contradictions were found.
```

Now you can drop raw sources into wiki/raw/, add `status: pending-ingest` to their frontmatter, and run `/ingest` to process them all.

## What Makes Claude Code the Best Setup

- **Direct file access.** Claude creates and edits wiki pages as actual files. No copy-pasting.
- **Slash commands.** Custom commands for common operations (lint, ingest, query).
- **Persistent context.** WIKI-SCHEMA.md stays loaded as long as you're in the wiki directory.
- **Automation potential.** You can schedule slash commands to run on a timer (see the agent-instructions/ folder in the Kit).
- **Git integration.** Track wiki changes over time with version control.


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
