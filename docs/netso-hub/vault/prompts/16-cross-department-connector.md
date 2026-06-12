# Prompt 16: Cross-Department Connector

**Purpose:** Map knowledge gaps between departments and design wiki structure for cross-team knowledge sharing, focusing on revenue and churn impact. Sales knows things marketing doesn't have access to. Support learns things product never hears about. This prompt identifies where cross-team knowledge transfer is broken and builds the wiki structure to fix it.

**When to use:** When you have multiple departments that need to share knowledge but currently don't do it well. Also useful when the wiki is primarily serving one team and you want to expand it across the organization.

---

## Thinking Logic (for AI assistants running this prompt)

Before mapping cross-department knowledge gaps, silently work through these checks:

1. **DEPARTMENT COUNT:** How many departments are involved? With 2 departments, map one bidirectional gap. With 5+ departments, focus on the top 3-4 gaps by impact rather than mapping every possible combination (10 departments = 45 possible gap pairs, which is unmanageable).

2. **REVENUE PATH TRACING:** For each gap identified, trace how it connects to revenue. If you can't trace a gap to a revenue, churn, or efficiency outcome in 2 steps or fewer, it's probably not worth prioritizing. Example: "Support sees churn signals → marketing doesn't have this data → retention campaigns miss at-risk customers → churn increases." That's a clear revenue path.

3. **SHARED PAGE OWNERSHIP:** When a page needs to serve multiple departments, assign a primary owner (who updates it) and secondary consumers (who query it). Shared ownership with no primary owner means nobody updates it.

4. **COMMUNICATION PATTERN ANALYSIS:** How do these departments currently share information? If they use Slack channels, the wiki replaces slow async search. If they use meetings, the wiki reduces the need for knowledge-transfer meetings. If they don't share at all, the wiki creates a new bridge that didn't exist before.

5. **IMPLEMENTATION REALISM:** A 5-person startup doesn't need cross-department wiki governance. A 200-person company does. Scale the maintenance model to the org size. For small teams: one person maintains shared pages weekly. For large orgs: each department maintains its own pages, with a shared wiki council reviewing cross-department pages monthly.

6. **EXISTING GAPS vs. NEW CONNECTIONS:** Don't just map what's broken. Also identify what new connections the wiki could create that don't exist in any form today. These are often the highest-value opportunities.

---

## The Prompt

```
Our company has these departments that need to share knowledge but currently don't do it well:

[LIST: Sales, Marketing, Product, Engineering, Support, etc.]

Where are the biggest knowledge gaps BETWEEN teams? What does sales know that marketing doesn't have access to? What does support learn that product never hears about?

Design a wiki structure that connects cross-department knowledge. Show me which page types would be shared across teams and which would be department-specific. Focus on the connections that would directly improve revenue or reduce churn.

For each knowledge gap identified between teams, estimate the business impact:

- Revenue impact: How does this gap affect win rates, deal velocity, or expansion revenue? Estimate as: "Fixing this gap could improve [metric] by approximately [X%] because [reasoning from wiki data or team context]."
- Churn impact: Does this gap mean a team misses signals that predict churn or dissatisfaction? Estimate as: "This gap may cause the team to miss approximately [N] warning signals per quarter."
- Efficiency impact: How many hours per week does this gap cost through duplicated work, re-derivation, or meetings that exist solely to transfer knowledge that should already be accessible?

Rank the gaps by total business impact (revenue + churn + efficiency), not by how easy they are to fix. The hardest gap to close might be the most valuable.
```

---

## Supplementary Thinking Framework

Before mapping, work through these questions:

**Communication-Pattern Analysis**
- How do these departments actually communicate today? If they're in the same Slack workspace and sit near each other, the knowledge gaps might be about format and structure, not access. If they're in different tools and time zones, the gaps are about access and visibility.

**Revenue-Impact Filtering**
- Which knowledge transfers directly affect revenue? Start there. Don't map every possible connection. Focus on the 2-3 gaps that cost real money (lost deals, preventable churn, duplicated work).

**Shared-Page Ownership Assignment**
- Who should own shared pages? Cross-department pages die when nobody owns them. For each shared page type, recommend a specific role (not "both teams") as the primary maintainer.

---

## Design Output Framework

The design should address:

**Knowledge Gap Identification**
- For each pair of departments: what flows one way or not at all? What does Sales know that Marketing doesn't have access to? What does Support learn that Product never hears about? What does Marketing research that Sales never sees?

**Revenue and Churn Impact**
- Which missing knowledge transfers directly affect deals, retention, or product decisions?
- What customer feedback loops are broken?
- Where do departments duplicate work because they don't know what the other team already figured out?

**Wiki Structure**
- Which page types should be shared across all teams?
- Which should be department-specific?
- What cross-referencing rules would connect department-specific pages to shared ones?
- Which team owns which page types?

**Maintenance Model**
- Who feeds the wiki from each department, and what sources do they contribute?
- Who queries the wiki from each department, and what questions do they ask?
- How often should cross-department pages be reviewed?
- What's the minimum process to keep this working without becoming another meeting?

---

## What You'll Get

Cross-department gap analysis, shared vs department-specific page types, revenue/churn impact focus, and maintenance model for shared pages. A design that identifies the specific knowledge gaps costing you money and builds the page structure to close them.

**Next step:** Start with the highest-impact knowledge gap the prompt identifies. Build those shared pages first using Prompt 02 or 03 (Ingest). Then expand department by department.


---

*From the GTM Knowledge System Kit by [Ayush Poddar](https://startupgtm.pro) | [startupgtm.substack.com](https://startupgtm.substack.com)*
