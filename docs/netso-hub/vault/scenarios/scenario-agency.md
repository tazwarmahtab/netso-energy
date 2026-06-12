# Scenario: Marketing / Creative Agency

## Who You Are

Agency owner or account director managing 5-15 clients. Each client has competitive context, brand guidelines, performance data, and campaign history. When an account manager leaves, onboarding the replacement takes weeks.

## Your Pain

Client knowledge lives in client Slack channels, Google Drive folders, Asana tasks, and account manager memory. There's no easy way for a junior team member to come up to speed on a client. When you pitch new clients, you can't quickly reference relevant work you've done. When a client asks "what's working?" you dig through spreadsheets instead of having a ready answer.

The worst version of this: a client calls with a question, your account manager is out, and nobody else on the team knows the client's history, preferences, or competitive context.

## Start With This Schema

Copy WIKI-SCHEMA.md into your wiki folder. Agencies have a unique structure because you need per-client knowledge AND agency-wide knowledge. You'll use:

- **wiki/pages/entities/** for client profiles, key contacts, and your agency's own team
- **wiki/pages/brands/** for per-client brand voice, visual identity, and positioning
- **wiki/pages/market/** for per-client competitive landscape and buyer personas
- **wiki/pages/performance/** for per-client campaign performance and agency-wide channel metrics
- **wiki/pages/concepts/** for audience research, messaging frameworks, and campaign playbooks
- **wiki/pages/patterns/** for recurring successful tactics across clients
- **wiki/pages/topics/** for service area overviews and team processes

## Before You Start

**New in this version:** Agencies managing multiple clients should run Prompt 14 (Team-Specific Builder) to design a wiki structure that keeps client knowledge separate but team processes shared. Prompt 16 (Cross-Department Connector) maps knowledge flows between account management, creative, and strategy teams.

## Your First 10 Raw Sources

For your top 2-3 clients:
1. Client brief or onboarding document
2. Brand guidelines (colors, voice, positioning)
3. Their competitive landscape (main competitors, positioning)
4. Campaign performance summary (what worked, ROI, learnings)
5. Client feedback or satisfaction surveys

For the agency as a whole:
6. Your team's core competencies and case studies
7. Successful campaign templates or playbooks
8. Content calendar structure and best practices
9. Pricing and service offering documentation
10. Internal lessons learned across all client work

## Implementation Steps

### Step 1: Create the folder structure

```bash
mkdir -p wiki/raw/{articles,posts,research,newsletters,transcripts,data}
mkdir -p wiki/pages/{entities,concepts,topics,sources,patterns,syntheses,performance,brands,market}
mkdir -p wiki/_archive
```

### Step 2: Set up your schema

Create wiki/WIKI-SCHEMA.md with your agency context:

```markdown
# [Agency Name] Knowledge System

## Purpose
Capture client and campaign knowledge so anyone on the team can serve any client with full context. Eliminate the "only one person knows this client" problem.

## Per-client pages (create these for each client):
- wiki/pages/entities/client-[name].md (overview, goals, contacts)
- wiki/pages/brands/[client-name]-brand.md (tone, visual identity, positioning)
- wiki/pages/market/[client-name]-competitors.md (their competitors, positioning)
- wiki/pages/performance/[client-name]-campaigns.md (campaigns, tactics, ROI)

## Agency-wide pages:
- wiki/pages/patterns/successful-tactics.md (what works across clients)
- wiki/pages/performance/metrics-by-channel.md (channel performance data)
- wiki/pages/topics/agency-processes.md (team processes, best practices)
```

### Step 3: Build your first client's wiki

Pick your most important client. Use Prompt 02 (First Ingest) with their sources:

```
Create a complete knowledge wiki for [Client Name] using these sources:
[paste brand guidelines, briefs, campaign performance, research]

Build these pages:
1. wiki/pages/entities/client-[name].md (client overview, goals, contacts)
2. wiki/pages/brands/[client-name]-brand.md (tone, visual identity, positioning)
3. wiki/pages/market/[client-name]-competitors.md (their competitors, positioning)
4. wiki/pages/performance/[client-name]-campaigns.md (successful campaigns, tactics, ROI)
5. wiki/pages/sources/client-[name]-account-summary.md (budget, renewal dates, next opportunity)

Format this so an account manager or junior can onboard in 30 minutes.
Include all key contacts, budget, and performance data.
```

### Step 4: Test it for onboarding

When someone new joins the account (or to test the wiki, pretend they did):

```
A new account manager is taking over [Client Name].
Using wiki/pages/, create a 30-minute onboarding brief:

1. What is [Client]'s business and who is their customer?
2. What campaigns have we run and which were most successful?
3. How do they position vs their main competitors?
4. What's the next opportunity we need to prepare for?
5. What does [Client] care about most? (from feedback and preferences)

Cite wiki pages for everything.
```

### Step 5: Use it for campaign planning

Before each campaign:

```
We're planning [Campaign Type] for [Client].
Using wiki/pages/, pull together:

1. What campaigns have we done in this space for them?
2. What messaging or tactics have worked best with their audience?
3. How do competitors in their space approach this?
4. What's their current KPI target and budget for this channel?

Give me a one-page brief citing the wiki.
```

### Step 6: Replicate for remaining clients

Once Client 1's wiki works well, create the same 4-5 pages for your other top clients. Budget 30-45 minutes per client for the initial ingest.

## Next Steps to Expand

- Replicate the per-client page set for all active clients
- wiki/pages/concepts/audience-research.md (cross-client audience insights)
- wiki/pages/patterns/successful-tactics.md (what works across all clients)
- wiki/pages/performance/metrics-by-channel.md (channel performance benchmarks across the agency)
- wiki/pages/topics/agency-processes.md (team workflows, approval processes, best practices)
- wiki/pages/syntheses/cross-client-insights.md (patterns that appear across multiple client accounts)

By month 2, any team member should be able to onboard on any client in 30 minutes by reading their wiki pages. No more "only Sarah knows that client" situations.


---

*Built by [Ayush Poddar](https://startupgtm.pro) | GTM + AI Systems | [StartupGTM Newsletter](https://startupgtm.substack.com) | [All Products](https://poddarayush.gumroad.com/)*
