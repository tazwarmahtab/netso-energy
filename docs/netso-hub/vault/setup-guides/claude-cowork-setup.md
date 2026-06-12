# Setup Guide: Claude Cowork

Cowork is the Claude desktop app. It gives you a persistent session with file access, which makes it great for long-running wiki work on a large monitor. You can switch between wiki maintenance and other tasks without losing context.

## Prerequisites

- Claude desktop app (Cowork) installed

## Step 1: Create the folder structure on your computer

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
mkdir -p ~/wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p ~/wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p ~/wiki/_archive
```

Or use the folder-setup.sh script from the Kit:

```bash
cd ~/wiki
bash /path/to/GTM-Knowledge-System-Kit-v1/folder-setup.sh
```

## Step 2: Copy Kit files into your wiki folder

```bash
cp /path/to/GTM-Knowledge-System-Kit-v1/WIKI-SCHEMA.md ~/wiki/WIKI-SCHEMA.md
cp /path/to/GTM-Knowledge-System-Kit-v1/templates/index-template.md ~/wiki/pages/_index.md
cp /path/to/GTM-Knowledge-System-Kit-v1/templates/log-template.md ~/wiki/pages/_log.md
```

## Step 3: Add your wiki folder in Cowork

Open the Claude desktop app. Start a new conversation. When Cowork asks you to select a folder (or click the folder icon to add one), navigate to your ~/wiki/ folder and select it.

Once the folder is connected, Cowork can read and write files in your wiki directly. You should see your files accessible in the session.

Note: If you also downloaded the Kit to a separate folder, you can add that folder too so Cowork can read the prompt files and examples directly.

## Step 4: Brief Claude on the system

Start a new session. Type:

```
I've mounted my knowledge wiki at ~/wiki/.
Read WIKI-SCHEMA.md and understand the page types and structure.
Then tell me what to do first.
```

Claude will read the schema and confirm understanding.

## Step 5: Add raw sources

Export your first sources. Save them to ~/wiki/raw/ in the appropriate subfolder:
- Call transcripts go in ~/wiki/raw/transcripts/
- Articles go in ~/wiki/raw/articles/
- Research reports go in ~/wiki/raw/research/
- Your own notes or data go in ~/wiki/raw/data/

Then ask Claude:

```
I've added raw sources to raw/.
Process them and create wiki pages in pages/.
Follow WIKI-SCHEMA exactly.
Update _index.md and _log.md.
```

## Step 6: Use the persistent session

Cowork keeps the session open as you work. Throughout your day, you can:

- Ask Claude questions about your wiki between other work
- Drop new raw sources into ~/wiki/raw/ and ask Claude to ingest them
- Query the wiki for answers before calls or meetings
- Run maintenance (lint) when you have a few minutes

## Step 7: Weekly maintenance

Every week, type:

```
Run a health check on the wiki. Check all pages in pages/ for:
- Stale pages (not updated in 3+ weeks)
- Thin pages (source-count: 1)
- Contradictions between pages
- Unresolved [MISSING] or [NEEDS VERIFICATION] tags
- Dangling [[wikilinks]]

Give me a lint report and action list.
```

## Advantages of Cowork

- **Session persistence.** Your session stays open and remembers context throughout the day.
- **File explorer.** Visual view of your wiki structure on the left side. Easy to see what exists.
- **Low friction.** Ask questions about your wiki between other tasks without switching tools.
- **Good for maintenance.** Easy to spot-check pages, run lint, and make quick updates.
- **Large monitor friendly.** Wiki pages on the left, conversation on the right.

## Limitations

- Session context can be lost if you close the app or start a new conversation
- No scheduled automation (you run maintenance manually)
- Large wikis (50+ pages) may need selective page loading rather than full wiki reads

For automation and scheduled maintenance, consider Claude Code. For comfortable daily use, Cowork is excellent.

**Pro tip:** If you copied CLAUDE.md from the Kit into your wiki folder, Cowork reads it automatically and knows the full system without you having to brief it each time.


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
