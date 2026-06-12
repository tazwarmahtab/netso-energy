---
created: 2026-04-30
updated: 2026-04-30
type: context-pack
status: active
valid-for: 7 days
source-pack: 2026-04-30-ai-platform-source-manifest
confidence: mixed
---

# AI Platform Consolidated Context - Netso Energy

Use this as the first handoff context for Claude Code before continuing the Netso Energy vault build.

## Read Order

1. `CLAUDE.md`
2. `wiki-SCHEMA.md`
3. `wiki/pages/_index.md`
4. `graphify-out/GRAPH_REPORT.md`
5. `wiki/raw/transcripts/2026-04-30-ai-platform-source-manifest.md`
6. `wiki/pages/sources/2026-04-30-ai-platform-context-capture.md`
7. `wiki/pages/sources/2026-04-30-ai-conversation-url-captures.md`
8. This file

## Active Objective

Tazwar wants the Netso Energy vault to become the single source of truth for Netso intelligence and AI-working context. The immediate job was to capture and consolidate current context from Safari-open AI platforms, Claude/ChatGPT conversations, local AI transcripts, Firecrawl/OpenCLI state, and the current Codex session so Claude Code can keep filling the vault without re-deriving state.

## Capture Inventory

- Safari DOM snapshot captured after enabling Safari `Allow JavaScript from Apple Events`: `wiki/raw/transcripts/2026-04-30-safari-ai-platform-snapshot.md` (`1,422` lines).
- Safari link inventory captured: `wiki/raw/transcripts/2026-04-30-safari-ai-links.md` (`3,846` lines).
- Claude/ChatGPT conversation URL captures completed: `wiki/raw/transcripts/2026-04-30-ai-conversation-url-captures.md` (`8,978` lines, `29` conversations).
- Source manifest updated: `wiki/raw/transcripts/2026-04-30-ai-platform-source-manifest.md`.
- Source summaries created/updated under `wiki/pages/sources/`.
- Reusable capture scripts are in `tools/capture_safari_ai_tabs.applescript`, `tools/capture_safari_ai_links.applescript`, and `tools/capture_ai_conversation_urls.applescript`.
- `opencli codex export` remains blocked because the OpenCLI Browser Bridge extension is not connected in Chrome.
- `firecrawl` is installed and authenticated via stored credentials, but account-info fetch failed in this environment; it was not used for authenticated private AI pages.

## Source Reliability Rules

- Treat browser captures as raw evidence of visible DOM state, not complete account exports. Web apps may virtualize history, hide unloaded messages, omit attachments, or include UI boilerplate.
- Treat Claude/ChatGPT conversation content as AI-derived analysis unless it is backed by a primary source. Do not promote AI claims into investor/customer materials without official verification.
- Preserve contradictions. Do not silently normalize pilot size, IDCOL terms, SREDA/RESCO status, or deployment status.
- For high-stakes facts, prefer official SREDA, BERC, BPDB, IDCOL, Bangladesh Bank, Power Division, NBR, and signed internal documents.
- Use this pack to accelerate Claude Code, not as final due diligence.

## Current Vault State

- Vault root: `/Users/tazwarmahtab/Netso Energy`
- Current system: GTM Knowledge System Kit adapted into a Netso Energy intelligence vault.
- Current operating role: Netso Intelligence Processor; extract, compress, structure, maintain.
- Current wiki size: 26 pages after this capture, including 24 pre-existing compiled pages and 2 AI-platform source summaries.
- Raw source base: `wiki/raw/` contains 24+ copied/captured Netso files across contracts, sales ops, agents, business plans, market research, Atlanta/Atlas wiki exports, and AI/browser captures.
- Graph state: `graphify-out/GRAPH_REPORT.md` reports 62 nodes, 107 edges, 7 communities, and 100% extracted / 0% inferred / 0% ambiguous extraction.
- Git state: this folder is not currently a git repository.

## Current Safari / Platform State

- a16z Speedrun was open on the homepage and application form. Visible public copy says Speedrun invests up to `$1M`, offers up to `$5M` in credits, supports international founders, and lists Bangladesh among eligible founder countries.
- The Speedrun application form asks for team/founder status, full-time commitment, FTE count, startup one-liner, product description, category, founded date, website, traction, pitch deck, funding, fundraising status, referral, and source.
- OpenAI Codex AGENTS.md docs were open. Captured docs state Codex reads `AGENTS.md` before work; merges global and project instruction files; closer files override; default project doc max is `32 KiB`; and fallback filenames can be configured.
- OpenAI API Projects page was open under `Netso Energy / Default project`, showing project ID `proj_3N9q0HOw2boTNpnMbD9Mkx2x`, geography `Global`, data retention `None`, created `Apr 29 2026`, and monthly spend `$0`.
- Azure VM create was open under `tazwar@netsoenergy.com`, subscription `Azure subscription 1`, tenant `TAZWARNETSOENERGY.ONMICROSOFT.COM`, with an Ubuntu Server 24.04 LTS VM draft in North Europe. The visible form showed zone/size/image validation warnings.
- Microsoft Foundry was open on project/workspace `tazwar-8724` with deployment/model `DeepSeek-V3.2` in the playground.
- Azure Developer CLI install docs were open for installing/updating `azd`.
- Claude was open on project `Netso`; sidebar recents expose many Netso strategy, funding, website, product, and validation conversations.
- ChatGPT was open with project `Netso`; sidebar recents expose Netso context, website, strategy, brand, competitor, and design conversations.

## Consolidated Strategic Context

- Best current company identity: Netso Energy is a Bangladesh rooftop solar RESCO/OPEX infrastructure company for commercial and industrial rooftops, especially RMG/garment factories. It finances, owns, installs, operates, and monetizes solar assets under long-term customer agreements.
- Funding/accelerator framing should lead with `Bangladesh tech-enabled RESCO for factory rooftops`, not with premium residential pergolas.
- Solar pergola / canopy remains strategically useful as a premium product differentiator, visual proof asset, and architectural wedge, but current AI consensus says it should not distract from the factory RESCO path.
- Core moat is the Farzana Group / family garment network and warm access to factory rooftops, not generic solar technology.
- North star remains fast deployment toward 1 MW because that shifts Netso from installer economics toward infrastructure-operator economics.
- Trust and contract enforceability are core risks. Customer skepticism, long-term contract enforcement, O&M credibility, and asset ownership on third-party roofs matter as much as panel performance.
- Strongest near-term move from the AI conversations: get a warm factory roof walk / signed OPEX customer, then use that asset to unlock IDCOL, investor credibility, and platform proof.

## Business Model / Finance Context

- AI conversations repeatedly frame the model as: Netso owns the asset, customer pays a discounted charge versus historical electricity bill, Netso services debt, and post-loan years become the wealth-creation phase.
- Revenue streams must model both customer OPEX/PPA payments and NEM surplus revenue.
- The `65% of old bill` charge appears as a model-derived threshold, not yet market-validated. It may need sensitivity against competitor offers and signing speed.
- Residential small-scale systems are repeatedly flagged as weak or non-viable for Netso's current path. A 20-unit / BDT 50k monthly bill building is too small; minimum viable targets in conversations are closer to BDT 2.5 lakh/month bills, hotels, hospitals, large complexes, or factories.
- Factory/RMG sites are superior because daytime loads match solar generation, bills are large, and one factory can equal many residential customers.
- Existing wiki finance pages use `IDCOL 80% debt @ 9%, 15-year tenor`. AI conversations claim `80% debt @ 6%, 10-year tenor, 1-year principal grace, quarterly repayments`. This is a critical contradiction requiring official IDCOL verification.
- CAPEX assumptions are unstable. AI conversations challenge BDT 90,000/kW pergola CAPEX as potentially low and suggest stress-testing BDT 1.1-1.52 lakh/kW depending standard rooftop versus pergola premium, duties, VAT, inverter, structure, and installation quality.
- Pilot size/status is contradictory across sources: `3kW`, `3.5kW`, and `4kW` appear. Do not use a single pilot claim until verified from primary internal documents and live inverter/install evidence.

## Funding / Applications

- YC/accelerator framing: lead with Bangladesh RESCO infrastructure, factory rooftop access, and tech-enabled deployment pipeline. Avoid leading with lifestyle pergola.
- YC one-liner candidate captured from AI conversations: `Bangladesh RESCO: own solar on factory rooftops.`
- G-Force and earlier application drafts used a broader lifestyle/pergola framing. Keep this as optional grant-specific positioning, but note its tension with the current industrial RESCO strategy.
- a16z Speedrun appears relevant because public page emphasizes capital, credits, operators, global founders, visa/banking support, and Bangladesh eligibility. Application quality improves materially if Deal 1/LOI exists.
- Arch Grants analysis exists in captured conversations, but the 2026 deadline in the conversation was March 31. Treat it as historical unless a future cycle is being evaluated.
- BRAC Bank project finance is likely premature before signed customers, but BRAC/SME/corporate relationship channels and Bangladesh Bank green/startup financing may become relevant after Deal 1.
- EBL Startup Explorer and Bangladesh Bank startup financing were discussed, but claims need official verification before operational planning.

## Digital Platform / Agent Context

- Azure AI Foundry / custom Netso expert-agent work is conceptually valid but premature if it merely replaces Claude Projects. The durable asset should be a file-based Netso knowledge base plus embeddings/RAG and a living system prompt.
- The real problem is context fragmentation across Claude, ChatGPT, Codex, Gemini/Qwen, docs, and local vaults.
- Recommended AI architecture: persistent markdown source of truth, raw-source preservation, embeddings/RAG over Netso docs, callable API/tool access from different models, and maintenance discipline for facts that change.
- Platform MVP scope from captured AI work: public website (`Next.js`), mobile app (`React Native`), shared backend (`Supabase`), integration layer (`inverter data + Make.com automation`).
- Supabase Auth + RLS is non-negotiable if website and mobile share customer, internal, and investor data.
- MVP mobile app scope: acquisition/lead capture, live pilot monitoring as sales proof, field sales enablement. Operations management is excluded until the site count justifies it.
- Inverter monitoring is a priority integration; weather APIs and payment gateways can wait unless they unblock sales or investor proof.

## Website / Brand / Product Context

- Current design direction from Claude: cinematic luxury-industrial, near-black/amber palette, strong typography, film grain, scroll reveals, and premium architecture/energy storytelling.
- Website should include proof, economics, NEM export logic, calculator, technical specs, trust/warranty/O&M, and WhatsApp/quote CTA.
- ChatGPT design conversations emphasize realistic Dhaka rooftop visuals, imperfect concrete, black water tanks, humid haze, dense mid-rise context, and a premium but locally credible solar pergola.
- Website calculator assumptions captured from AI conversations include monthly bill sliders, commercial/industrial tariff bands, generation formula, onsite consumption split, performance ratio, and CO2 factor. These are useful implementation inputs but need official tariff/source validation.
- Modular framing questions remain open: structural engineer sign-off, rooftop load capacity, wind/cyclone/BNBC compliance, local mild steel versus imported aluminum, true modularity versus custom fabrication, and supplier/fabricator exclusivity.

## Contradictions To Resolve First

1. Pilot size/status: `3kW`, `3.5kW`, and `4kW` all appear. Resolve with live system evidence, invoice, inverter data, or signed install document.
2. IDCOL terms: `80% @ 9%, 15 years` in existing wiki versus `80% @ 6%, 10 years, quarterly, 1-year grace` in AI conversations.
3. RESCO/SREDA status: conversations alternate between registered/approved, partnership/framework, and in-progress. Use certificate/status evidence only.
4. Primary customer segment: premium residential pergola versus RMG/factory RESCO. Current strategic consensus is factory RESCO first; pergola as differentiator.
5. Current traction: pilot live versus equipment purchased/awaiting installation versus customer signed/unsigned. Lock the factual timeline.
6. CAPEX: standard rooftop system cost versus premium pergola cost, and whether quotes include duties, VAT, structure, inverter, install, O&M reserve, and contingency.
7. NEM surplus: who receives surplus payout under customer/Netso/DISCO arrangements and how delays/defaults are handled.
8. Tax holiday: eligibility for rooftop RESCO projects versus utility-scale BOO plants.

## Immediate Priorities For Claude Code

1. Read the files in the read order above.
2. Treat `wiki/raw/transcripts/2026-04-30-ai-conversation-url-captures.md` as a rich but AI-derived source; create/update compiled pages only with confidence labels.
3. Resolve the pilot, IDCOL, SREDA/RESCO, and traction contradictions before producing investor/customer-facing materials.
4. Backfill source summaries for existing raw files already copied into `wiki/raw/`.
5. Create or strengthen missing pages: `monica-agent`, official `SREDA`, `BERC`, `BPDB`, `IDCOL`, `bangladesh-bank-startup-finance`, `netso-platform-architecture`, `netso-ai-agent-architecture`, `website-strategy`, and ICP segment pages.
6. Verify regulatory, financing, tariff, tax, and competitor claims against official/current sources.
7. Build at least one synthesis after source coverage is cleaner: `factory-resco-vs-residential-pergola`, `netso-90-day-execution-plan`, or `regulatory-finance-contradictions`.
8. If deeper live AI exports are needed, connect OpenCLI Browser Bridge in Chrome or perform official account exports from ChatGPT/Claude.

## Handoff Prompt

Paste this into Claude Code:

```text
You are continuing the Netso Energy Intelligence Vault in /Users/tazwarmahtab/Netso Energy.

First read CLAUDE.md, wiki-SCHEMA.md, wiki/pages/_index.md, graphify-out/GRAPH_REPORT.md, wiki/raw/transcripts/2026-04-30-ai-platform-source-manifest.md, wiki/pages/sources/2026-04-30-ai-platform-context-capture.md, wiki/pages/sources/2026-04-30-ai-conversation-url-captures.md, and context_packs/ai-platform-consolidated-context-2026-04-30.md.

Operate as Netso Intelligence Processor: extract, compress, structure, and maintain. Preserve raw sources, cite every claim, date every claim, flag contradictions, and update _index.md + _log.md after operations.

Important: AI-platform captures are raw browser DOM and prior LLM outputs. Do not treat AI claims as verified facts. Use them to guide the vault, then verify high-stakes finance/regulatory/traction claims against primary sources.

Priority order:
1. Resolve pilot size/status, IDCOL terms, SREDA/RESCO status, and current traction contradictions.
2. Backfill source summaries for copied raw sources.
3. Create missing Monica/source/market/entity/platform pages.
4. Verify SREDA, BERC, BPDB, IDCOL, Bangladesh Bank, tax, tariff, and competitor claims.
5. Generate synthesis pages only after source coverage is clean.
```

## Remaining Gaps / Accuracy Flags

- OpenCLI live Codex export failed because Browser Bridge is not connected.
- ChatGPT/Claude official exports were not used; captures are browser DOM snapshots of loaded conversation pages.
- Attachments inside Claude/ChatGPT conversations may not be fully captured unless rendered as visible text in the page.
- Firecrawl was not used on private authenticated AI pages.
- High-stakes regulatory and finance claims remain unverified unless already backed by official docs in the vault.
- There is no git repository, so there is no commit history or diff-based audit trail.
