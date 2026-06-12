# Setup Guide: Manual LLM Setup (ChatGPT, Gemini, Ollama, or Any LLM)

If you use ChatGPT, Gemini, Ollama, or any other LLM instead of Claude, the knowledge system works the same way. The only difference is how you get context into the session. With Claude Code or Cowork, the schema loads automatically. With other LLMs, you paste it in at the start of each session.

## Prerequisites

- Access to any LLM (ChatGPT, Gemini, Claude web, Ollama, etc.)
- A text editor and local file system

## Step 1: Create the folder structure on your computer

Open Terminal and run:

```bash
mkdir -p ~/wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p ~/wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p ~/wiki/_archive
```

Or use folder-setup.sh from the Kit.

## Step 2: Create WIKI-SCHEMA.md

Copy WIKI-SCHEMA.md from the Kit into your ~/wiki/ folder. Open it in a text editor and customize the top section with your team's context (see the scenario files for examples).

## Step 3: The "paste schema first" workflow

This is the key step. Every time you start a new LLM session for wiki work, paste WIKI-SCHEMA.md first:

```
I'm building a knowledge wiki using this schema:

[PASTE THE ENTIRE CONTENTS OF WIKI-SCHEMA.md HERE]

Confirm you understand the page types, folder structure, and operations.
Then I'll give you sources to process.
```

Wait for the LLM to confirm understanding. Then proceed with your task.

## Step 4: Process your first sources

Paste your raw sources after the schema:

```
Here are my first raw sources. Process each one following the Ingest operation from the schema.

SOURCE 1: [title]
[paste content]

SOURCE 2: [title]
[paste content]

For each source:
1. Create a source-summary page
2. Create or update wiki pages (entities, concepts, topics, patterns)
3. Use correct frontmatter for each page type
4. Add [[wikilinks]] between related pages
5. Mark gaps with [MISSING] and uncertain data with [NEEDS VERIFICATION]

Output each page as a complete markdown block with the file path as the header.
```

## Step 5: Save the output locally

The LLM will output wiki pages as formatted markdown blocks. For each one:

1. Copy the content
2. Create the file at the specified path in your ~/wiki/pages/ folder
3. Save it as a .md file

Example: if the LLM outputs a block headed "wiki/pages/entities/hubspot.md", save it to ~/wiki/pages/entities/hubspot.md.

Also update your _index.md and _log.md manually, or ask the LLM to generate updated versions.

## Step 6: Subsequent ingests

For every new session, you need to re-establish context. Paste:

1. WIKI-SCHEMA.md (always)
2. Your current _index.md (so the LLM knows what exists)
3. The wiki pages most likely to be affected by new sources
4. The new raw sources

```
Here's my wiki schema:
[PASTE WIKI-SCHEMA.md]

Here's my current index:
[PASTE _index.md]

Here are the existing pages that might need updating:
[PASTE relevant pages]

Now process these new sources:
[PASTE new sources]

Update existing pages and create new ones. Output everything as markdown blocks.
```

## Step 7: Weekly maintenance

Start a fresh session. Paste the schema, then all your wiki pages:

```
Here's my wiki schema:
[PASTE WIKI-SCHEMA.md]

Here are all my wiki pages:
[PASTE all pages from wiki/pages/]

Run a health check:
1. What's outdated (not updated in 3+ weeks)?
2. What's thin (source-count: 1)?
3. What contradicts something else?
4. What [MISSING] or [NEEDS VERIFICATION] tags are unresolved?
5. What's the biggest gap to close this week?

Give me a lint report and action list.
```

## Tips for Manual Workflow

**Save token budget.** Don't paste pages that aren't relevant to your current task. If you're ingesting a competitor article, paste entity and brand pages, not performance pages.

**Keep a "session starter" file.** Create a text file called `session-starter.txt` that contains WIKI-SCHEMA.md + your _index.md. Copy-paste it at the start of every session. Saves time.

**Use ChatGPT Custom Instructions or Gemini Gems.** If your LLM supports persistent instructions, put WIKI-SCHEMA.md there so you don't have to paste it every time. ChatGPT Custom Instructions is a persistent system prompt that loads into every conversation, so you don't re-paste WIKI-SCHEMA.md each time; find it under ChatGPT Settings > Personalization > Custom Instructions. Gemini Gems is a saved persona in Gemini that pre-loads your schema context; create one under Gems in the Gemini sidebar.

**Track changes manually.** Since the LLM can't edit your files directly, keep a simple changelog in _log.md. After each session, write what was created or updated.

## Advantages

- **Works with any LLM.** ChatGPT, Gemini, Ollama, Claude web, LLaMA, Mistral, anything.
- **No special setup.** Just a text editor and a folder.
- **Portable.** Your wiki is just markdown files. Move them anywhere.

## Disadvantages

- **More manual work.** You copy-paste between the LLM and your file system.
- **No persistent context.** You re-paste the schema every session (unless your LLM supports custom instructions).
- **File management is on you.** Saving, organizing, and updating files is manual.
- **Token limits.** As your wiki grows past 30-40 pages, you can't paste everything into one session. You'll need to be selective.

For the smoothest experience with the least manual work, Claude Code or Cowork is recommended. But the knowledge system works with any LLM that can process structured text and output markdown.


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
