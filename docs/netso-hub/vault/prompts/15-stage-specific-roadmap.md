# Prompt 15: Stage-Specific Roadmap

**Purpose:** Create a 6-month wiki buildout plan calibrated to your company stage and available hours. A 5-person startup doesn't need the same wiki as a 50-person company. You'll get a realistic roadmap that tells you what to build, what to skip, and when to expand.

**When to use:** During initial planning, or when your company hits a new stage (post-funding, post-hire, scaling) and you want to reassess what the wiki should look like.

---

## Thinking Logic (for AI assistants running this prompt)

Before building the roadmap, silently work through these checks:

1. **TECHNICAL VS. NON-TECHNICAL OWNER:** Is the person building this wiki technical (comfortable with markdown, file systems, automation) or non-technical (needs simpler tools and clearer step-by-step guidance)? This changes the roadmap's complexity and tool recommendations.

2. **HOURS REALITY CHECK:** If the user says "2-3 hours per week," build the roadmap for 2 hours, not 3. People overestimate available time. A plan that works at 2 hours stays on track. A plan designed for 3 hours falls behind by week 2.

3. **OVERKILL DETECTION:** For each feature or page type in the roadmap, ask: "Would this user get meaningful value from this in the next 30 days?" If not, push it to a later month or cut it entirely. A 5-person startup doesn't need a cross-department connector. A solo founder doesn't need team governance rules.

4. **NEAR-TERM USE CASE PRIORITY:** The first month should focus on the use case that will get the user their first "this is worth it" moment. That's usually the first query that returns a useful answer from compiled pages. Everything else follows from that initial value proof.

5. **STAGE-APPROPRIATE TOOLING:** Pre-revenue and solo operators should start with free tools (Logseq + ChatGPT free tier). Don't recommend Claude Code subscriptions in Month 1 for a founder watching burn rate. Recommend paid tools only when the roadmap hits a complexity that free tools can't handle.

6. **EXIT RAMP:** Every month should have a "you can stop here and still have value" note. Not every user needs to reach Month 6. If they get a useful 15-page wiki in Month 2, that might be exactly what they need.

---

## The Prompt

```
My company is at [STAGE: pre-revenue / early revenue / scaling / established] with [NUMBER] people on the team.

Given our stage, what's realistic to build right now vs. what should wait?

Map out a 6-month wiki buildout plan that matches our current resources:
- Month 1: what we can build with [HOURS PER WEEK] of effort
- Month 2-3: what to add once the foundation is working
- Month 4-6: what becomes possible as the wiki compounds

Be direct about what's too ambitious for our current stage and team size. I'd rather have a smaller, realistic plan we'll actually follow than a comprehensive plan that sits unread. If something is overkill for our stage, say so and explain what trigger would make it worth adding later.

For each month, tell me:
- What to build (specific page types and source counts)
- How many hours it will take
- What to explicitly skip at this stage
- What milestone signals readiness for the next phase
```

---

## Supplementary Thinking Framework

Before planning, work through these questions:

**Technical Capacity Assessment**
- Is the wiki owner technical or non-technical? A founder who lives in the terminal can use Claude Code and automate. A marketing lead who's never touched a command line needs the manual or Cowork setup. Tailor tool recommendations accordingly.

**Near-Term Use-Case Prioritization**
- At this company stage, what's the highest-value near-term use case for the wiki? Pre-revenue companies often get the most value from fundraising preparation and investor Q&A. Early-revenue companies get the most from competitive intelligence and sales enablement. Scaling companies get the most from onboarding and cross-team knowledge sharing.

**Overkill Prevention**
- Be honest about what's overkill. Don't recommend synthesis pages for a company with 5 wiki pages. Don't recommend quarterly reviews for a company that's existed for 2 months.

---

## Design Output Framework

The plan should cover:
- **Month 1 Foundation:** What you can build with available hours, realistic page count, which page types matter, what to skip entirely
- **Month 2-3 Depth:** What to add once the foundation works, when to start pattern and synthesis pages, maintenance without burnout
- **Month 4-6 Compounding:** What becomes possible as the wiki grows, when to consider automation (agents), signals the wiki is working vs. collecting dust
- **ROI Timeline:** When the wiki starts paying for itself in time saved, when maintenance cost drops below value produced

---

## What You'll Get

Stage-appropriate 6-month roadmap with monthly milestones, effort estimates, what to prioritize, and what to skip. A realistic plan that accounts for your actual resources, not an aspirational roadmap that assumes unlimited time.

**Next step:** Compare this against the EVOLUTION-PLAN.md included in the Kit. Use whichever timeline is more realistic for your situation, or blend them.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
