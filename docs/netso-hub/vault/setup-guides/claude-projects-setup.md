# Setup Guide: Claude Projects

Claude Projects gives you a persistent project context on claude.ai. You upload WIKI-SCHEMA.md once, and it stays loaded across every conversation in that project. Good if you want a web-based workflow without installing desktop tools.

## Prerequisites

- Access to Claude Projects on claude.ai (available on Pro and Team plans)

## Step 1: Create a new project

Go to claude.ai. Click Projects, then New Project. Name it "GTM Knowledge Wiki" or something specific to your use case (e.g., "Competitive Intel Wiki").

## Step 2: Create the folder structure locally

You'll manage the actual wiki files on your computer. Open Terminal and run:

```bash
mkdir -p ~/wiki-project/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p ~/wiki-project/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p ~/wiki-project/_archive
```

Or use folder-setup.sh from the Kit.

## Step 3: Upload WIKI-SCHEMA.md as project context

Copy WIKI-SCHEMA.md from the Kit into ~/wiki-project/. Then in Claude Projects:

- Click "Add Content" or "Upload" in the project settings
- Upload WIKI-SCHEMA.md
- If the project supports custom instructions, set WIKI-SCHEMA.md as the system context

This means every conversation in this project starts with Claude already understanding your wiki structure.

## Step 4: Create and upload initial files

Create _index.md and _log.md locally using the templates from the Kit. Upload them to the project.

## Step 5: Start working

In your project, start a conversation:

```
Using the uploaded WIKI-SCHEMA.md, help me set up my knowledge wiki.
I'm going to add raw sources and I need you to create wiki pages from them.
What should I do first?
```

Claude will respond with context from WIKI-SCHEMA and guide next steps.

## Step 6: Upload and process raw sources

Export your first sources to ~/wiki-project/raw/. Then upload them to the project (or paste their contents directly into the conversation):

```
I've uploaded these raw sources: [list files]
Using WIKI-SCHEMA.md, create initial wiki pages.
Structure each page correctly with frontmatter and [[wikilinks]].
Use [MISSING] and [NEEDS VERIFICATION] tags for gaps.
```

Claude will output wiki pages as formatted markdown blocks. Copy each one and save it to the corresponding path in your local ~/wiki-project/pages/ folder.

## Step 7: Iterate in the project

Use Claude Projects as your ongoing workspace for wiki work. The uploaded WIKI-SCHEMA gives Claude context for every conversation. For subsequent ingests:

```
Here's my current _index.md:
[paste index]

Here are my existing pages that might be affected:
[paste relevant pages]

Now process these new sources:
[paste or describe new sources]

Update existing pages and create new ones following WIKI-SCHEMA.
Output each page as a markdown block I can save locally.
```

## Step 8: Weekly maintenance

Start a new conversation in the project:

```
Here are all my current wiki pages:
[paste all pages]

Run a health check:
- What's outdated?
- What's thin (source-count: 1)?
- What contradicts something else?
- What's missing that would be most valuable?

Give me a prioritized action list for this week.
```

## Advantages of Claude Projects

- **Persistent context.** WIKI-SCHEMA.md stays loaded across all conversations in the project.
- **Web-based.** No desktop app or CLI install needed.
- **Clean interface.** Good for focused wiki work sessions.
- **File uploads.** Can upload raw sources directly.

## Limitations

- **Manual file management.** You copy-paste wiki pages between Claude and your local folder. Claude doesn't write files directly.
- **No automation.** No slash commands or scheduled tasks.
- **Context window limits.** As your wiki grows, you can't paste all pages into one conversation. You'll need to be selective about which pages to include.

For small to medium wikis (under 50 pages), Claude Projects works well. For larger wikis or if you want automation, consider Claude Code.


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
