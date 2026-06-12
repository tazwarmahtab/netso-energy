import { useState } from "react";

const sections = [
  {
    id: "overview",
    label: "01 — Overview",
    title: "The Rooftop Prospecting Engine",
    subtitle: "What it is and why it's a moat",
    content: [
      {
        type: "prose",
        text: "Most solar companies in Bangladesh prospect the same way: word of mouth, referrals, and cold-knocking. Netso's prospecting engine flips this by programmatically identifying, scoring, and prioritizing every viable rooftop in a city before competitors even know those buildings exist."
      },
      {
        type: "prose",
        text: "The result is a self-updating, ranked pipeline of thousands of prospects — each enriched with estimated system size, revenue potential, and owner contact data — generated with near-zero human labor."
      },
      {
        type: "callout",
        label: "The Moat",
        text: "Once you've scored and initiated contact with the highest-value rooftops in Dhaka, no competitor can dislodge you from those relationships. First-mover at the rooftop level is a durable advantage in a market where switching costs are high and trust is slow to build."
      },
      {
        type: "metrics",
        items: [
          { label: "Rooftops scoreable in Dhaka", value: "200K+", note: "Commercial + residential" },
          { label: "Manual hours replaced", value: "~500h/yr", note: "At 5min per prospect" },
          { label: "Pipeline generated", value: "Unlimited", note: "Auto-refreshed monthly" },
          { label: "Cost to build MVP", value: "$0–$200", note: "Using free API tiers" },
        ]
      }
    ]
  },
  {
    id: "architecture",
    label: "02 — Architecture",
    title: "System Architecture",
    subtitle: "How the engine works end to end",
    content: [
      {
        type: "prose",
        text: "The engine runs as a pipeline with five stages: Geo Discovery → Building Classification → Solar Scoring → Owner Enrichment → CRM Injection. Each stage feeds the next automatically."
      },
      {
        type: "pipeline",
        stages: [
          {
            num: "01",
            name: "Geo Discovery",
            desc: "Define target zones (Gulshan, Dhanmondi, Motijheel, EPZs). Use Google Maps Geocoding API + OpenStreetMap Overpass API to pull all building footprints within each zone.",
            tools: ["Google Maps API", "OpenStreetMap Overpass", "Nominatim Geocoder"],
            output: "List of (lat, lng, building_id) for every structure in zone"
          },
          {
            num: "02",
            name: "Building Classification",
            desc: "For each building, determine: type (commercial/industrial/residential), footprint area (sq ft of rooftop), number of floors, and construction material. Uses Google Solar API + OSM tags + optional satellite ML model.",
            tools: ["Google Solar API", "OSM Building Tags", "Google Maps Places API"],
            output: "Building type, roof area (m²), floor count, usable roof %"
          },
          {
            num: "03",
            name: "Solar Scoring",
            desc: "Feed each building into the Google Solar API to pull: annual sunlight hours, shading estimate, max array size, estimated annual kWh output, and CO₂ offset. Score each building on a 0–100 Solar Viability Score (SVS).",
            tools: ["Google Solar API", "Custom scoring formula"],
            output: "SVS score, estimated system size (kWp), projected annual revenue for Netso"
          },
          {
            num: "04",
            name: "Owner Enrichment",
            desc: "Cross-reference building address with RAJUK property registry data, business directory scraping, Facebook Business pages, Bangladesh Trade Registry, and LinkedIn. Identify the decision-maker (building owner, not tenant).",
            tools: ["Clay.com", "Apollo.io", "Custom scraper", "Google Places API"],
            output: "Owner name, phone, email, company, decision-maker confidence score"
          },
          {
            num: "05",
            name: "CRM Injection",
            desc: "Every enriched prospect auto-pushed to HubSpot/Attio with: address, SVS score, system size estimate, projected Netso revenue, owner contact, and priority tier (A/B/C). Triggers outreach sequences for Tier A automatically.",
            tools: ["Make.com", "HubSpot API", "Attio API"],
            output: "Live prospect record in CRM, ready for outreach"
          }
        ]
      }
    ]
  },
  {
    id: "scoring",
    label: "03 — Scoring Model",
    title: "Solar Viability Score (SVS)",
    subtitle: "How every rooftop gets ranked",
    content: [
      {
        type: "prose",
        text: "The SVS is a composite 0–100 score that determines outreach priority. It's calculated from five weighted dimensions."
      },
      {
        type: "scoring",
        factors: [
          {
            name: "Usable Roof Area",
            weight: 30,
            desc: "Raw physical capacity. Min viable: 50m². Sweet spot: 200m²+. Industrial rooftops (RMG factories, warehouses) score maximum.",
            signals: ["Footprint from satellite", "Floor count (rooftop = top floor area)", "OSM building tags"]
          },
          {
            name: "Solar Irradiance",
            weight: 25,
            desc: "Annual peak sun hours at the specific location. Bangladesh averages 4.5–5.5 peak hours/day. South-facing, unshaded rooftops score highest.",
            signals: ["Google Solar API annual kWh/m²", "Shading factor", "Roof pitch estimate"]
          },
          {
            name: "Building Type / Owner Profile",
            weight: 20,
            desc: "Commercial and industrial owners have higher willingness to pay, clearer ROI logic, and faster decision cycles. RMG factories and hospitals are priority.",
            signals: ["OSM amenity tags", "Google Places type", "Business registry"]
          },
          {
            name: "Grid Electricity Bill Proxy",
            weight: 15,
            desc: "Higher bill = higher motivation to switch. Estimated from building type, size, and operating hours. Factories and hospitals score maximum.",
            signals: ["Building type", "Operating hours", "Industrial vs residential tariff"]
          },
          {
            name: "Owner Reachability",
            weight: 10,
            desc: "Can we find and reach the actual decision-maker? Businesses with LinkedIn, registered entities, and verifiable phone numbers score higher.",
            signals: ["Contact data found (Y/N)", "Decision-maker confidence", "Business registration"]
          }
        ]
      },
      {
        type: "tiers",
        items: [
          { tier: "A", range: "75–100", action: "Auto-trigger WhatsApp + email outreach sequence within 24hr", color: "#22c55e" },
          { tier: "B", range: "50–74", action: "Add to monthly outreach batch. Human reviews before contact.", color: "#f59e0b" },
          { tier: "C", range: "25–49", action: "Hold in database. Revisit quarterly or when A/B lists are exhausted.", color: "#6b7280" },
          { tier: "D", range: "0–24", action: "Archive. Not viable — small roof, too shaded, or no owner data.", color: "#ef4444" }
        ]
      }
    ]
  },
  {
    id: "techstack",
    label: "04 — Tech Stack",
    title: "Build Stack",
    subtitle: "What to build it with, cost at each stage",
    content: [
      {
        type: "prose",
        text: "The MVP can be built with free API tiers and no infrastructure cost. The production system scales on cheap serverless infrastructure."
      },
      {
        type: "stack",
        phases: [
          {
            phase: "MVP (Week 1–2)",
            cost: "$0/mo",
            items: [
              { component: "Geo Discovery", tool: "OpenStreetMap Overpass API", note: "Free, unlimited" },
              { component: "Solar Data", tool: "Google Solar API", note: "Free: 10K requests/mo" },
              { component: "Scoring Engine", tool: "Python script", note: "Local execution" },
              { component: "Owner Enrichment", tool: "Manual + Google search", note: "Manual for first 100 leads" },
              { component: "CRM", tool: "HubSpot Free", note: "Up to 1M contacts" },
              { component: "Orchestration", tool: "Python + cron job", note: "Runs locally or on free Render.com" }
            ]
          },
          {
            phase: "Production (Month 2–3)",
            cost: "$50–150/mo",
            items: [
              { component: "Geo Discovery", tool: "Google Maps Places API", note: "$2/1K requests" },
              { component: "Solar Data", tool: "Google Solar API paid tier", note: "$5/1K requests" },
              { component: "Owner Enrichment", tool: "Clay.com", note: "$149/mo, 1000 enrichments" },
              { component: "Orchestration", tool: "Make.com", note: "$29/mo" },
              { component: "Database", tool: "Supabase", note: "Free tier: 500MB" },
              { component: "Dashboard", tool: "Retool or custom React", note: "Free tier available" }
            ]
          },
          {
            phase: "Scale (Month 6+)",
            cost: "$300–500/mo",
            items: [
              { component: "ML Roof Classifier", tool: "Custom model on HuggingFace", note: "Fine-tuned on BD satellite imagery" },
              { component: "Enrichment", tool: "Apollo.io + Clay pipeline", note: "Higher volume" },
              { component: "Outreach", tool: "360dialog WABA", note: "WhatsApp Business API" },
              { component: "Monitoring", tool: "Custom dashboard", note: "Real-time pipeline view" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "build",
    label: "05 — Build Plan",
    title: "Week-by-Week Build Plan",
    subtitle: "How to get from zero to running in 30 days",
    content: [
      {
        type: "prose",
        text: "This is a solo-founder-executable build. Each week has a clear deliverable. You can build this in parallel with everything else — it only needs a few focused hours per week."
      },
      {
        type: "roadmap",
        weeks: [
          {
            week: "Week 1",
            goal: "Geo data pipeline",
            tasks: [
              "Write Python script to pull all buildings in Gulshan-1 from OSM Overpass API",
              "Filter for commercial + residential with footprint >50m²",
              "Store results in CSV / Supabase table",
              "Validate: manually spot-check 20 results on Google Maps"
            ],
            deliverable: "Raw list of 500–2000 buildings with (lat, lng, area, type)"
          },
          {
            week: "Week 2",
            goal: "Solar scoring",
            tasks: [
              "Integrate Google Solar API — pass each building's (lat, lng) and get solar data",
              "Build SVS formula in Python using the 5 weighted factors",
              "Assign A/B/C/D tiers to all buildings",
              "Export top 50 Tier A prospects as first target list"
            ],
            deliverable: "Scored, tiered building database for Gulshan-1"
          },
          {
            week: "Week 3",
            goal: "Owner enrichment",
            tasks: [
              "For top 50 Tier A buildings: manual owner research (RJSC, Google, Facebook)",
              "Set up Clay.com trial — automate enrichment for business addresses",
              "Build owner record: name, phone, email, company, decision-maker Y/N",
              "Load all records into HubSpot with tags: SVS score, tier, system size estimate"
            ],
            deliverable: "50 fully enriched Tier A prospects in CRM, ready for outreach"
          },
          {
            week: "Week 4",
            goal: "Outreach automation + expansion",
            tasks: [
              "Build Make.com flow: new Tier A prospect added to HubSpot → triggers WhatsApp message via 360dialog",
              "Write 3-step outreach sequence (Day 1 intro, Day 4 value prop, Day 8 case study)",
              "Run first outreach batch to 50 prospects",
              "Expand geo discovery to Dhanmondi, Motijheel — add 1000+ more buildings"
            ],
            deliverable: "First live outreach campaign running. 1000+ buildings in pipeline."
          }
        ]
      }
    ]
  },
  {
    id: "risks",
    label: "06 — Risks & Mitigations",
    title: "Risks & Mitigations",
    subtitle: "What can break and how to handle it",
    content: [
      {
        type: "risks",
        items: [
          {
            risk: "Owner data is wrong / unreachable",
            severity: "High",
            mitigation: "Build a 'data quality' flag in CRM. After 2 failed contact attempts, mark as 'unverified owner' and queue for manual research. Accept 30–40% unreach rate as normal."
          },
          {
            risk: "Google Solar API doesn't work well for dense Dhaka rooftops",
            severity: "Medium",
            mitigation: "Validate API output against 10 known buildings manually. If accuracy is poor, fall back to: roof area × Bangladesh avg irradiance (5.0 kWh/m²/day) as the scoring input."
          },
          {
            risk: "Tenants answer, not owners",
            severity: "High",
            mitigation: "Train WhatsApp bot to detect 'I rent this space' response and re-route to owner identification flow. Ask: 'Who owns the building? Can you share their contact?'"
          },
          {
            risk: "API costs spike unexpectedly",
            severity: "Low",
            mitigation: "Cache all API responses in Supabase. Each building is scored once, not repeatedly. Set hard API budget caps in Google Cloud console."
          },
          {
            risk: "Competitors copy the approach",
            severity: "Medium",
            mitigation: "Speed is the moat, not secrecy. Get to Tier A buildings first. First contact + first proposal = first relationship. Even if competitors build the same system 6 months later, you own those conversations."
          },
          {
            risk: "WhatsApp outreach gets flagged as spam",
            severity: "Medium",
            mitigation: "Use official WhatsApp Business API (not unofficial tools). Keep message templates approved. Start with low daily volume (20–30 messages/day) and scale as quality score builds."
          }
        ]
      }
    ]
  }
];

const PipelineStage = ({ stage, isLast }) => (
  <div style={{ display: "flex", gap: "0", marginBottom: isLast ? 0 : "2px" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "48px", flexShrink: 0 }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "50%",
        background: "linear-gradient(135deg, #16a34a, #4ade80)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: "700", color: "#fff", fontFamily: "monospace", flexShrink: 0
      }}>{stage.num}</div>
      {!isLast && <div style={{ width: "2px", flex: 1, background: "linear-gradient(#16a34a, #052e16)", minHeight: "32px" }} />}
    </div>
    <div style={{
      flex: 1, background: "#0a1a0e", border: "1px solid #16532d",
      borderRadius: "8px", padding: "16px 20px", marginLeft: "12px", marginBottom: "8px"
    }}>
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#4ade80", marginBottom: "6px", letterSpacing: "0.05em" }}>{stage.name}</div>
      <div style={{ fontSize: "13px", color: "#a3b8a8", lineHeight: "1.6", marginBottom: "12px" }}>{stage.desc}</div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
        {stage.tools.map(t => (
          <span key={t} style={{
            fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
            background: "#052e16", color: "#86efac", border: "1px solid #16532d", fontFamily: "monospace"
          }}>{t}</span>
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>
        <span style={{ color: "#4ade80", marginRight: "6px" }}>→</span>
        {stage.output}
      </div>
    </div>
  </div>
);

const ScoringFactor = ({ factor }) => (
  <div style={{
    background: "#0a1a0e", border: "1px solid #16532d", borderRadius: "8px",
    padding: "16px 20px", marginBottom: "8px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#f0fdf4" }}>{factor.name}</div>
      <div style={{ fontSize: "20px", fontWeight: "900", color: "#4ade80", fontFamily: "monospace" }}>{factor.weight}%</div>
    </div>
    <div style={{ background: "#052e16", borderRadius: "4px", height: "4px", marginBottom: "10px" }}>
      <div style={{ width: `${factor.weight * 3}%`, height: "100%", background: "linear-gradient(90deg, #16a34a, #4ade80)", borderRadius: "4px" }} />
    </div>
    <div style={{ fontSize: "13px", color: "#a3b8a8", lineHeight: "1.6", marginBottom: "10px" }}>{factor.desc}</div>
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
      {factor.signals.map(s => (
        <span key={s} style={{
          fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
          background: "#052e16", color: "#86efac", border: "1px solid #16532d"
        }}>{s}</span>
      ))}
    </div>
  </div>
);

const StackPhase = ({ phase }) => (
  <div style={{ marginBottom: "24px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
      <div style={{ fontSize: "14px", fontWeight: "700", color: "#4ade80" }}>{phase.phase}</div>
      <div style={{ fontSize: "13px", fontFamily: "monospace", color: "#86efac", background: "#052e16", padding: "2px 12px", borderRadius: "20px", border: "1px solid #16532d" }}>{phase.cost}</div>
    </div>
    <div style={{ border: "1px solid #16532d", borderRadius: "8px", overflow: "hidden" }}>
      {phase.items.map((item, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          padding: "10px 16px", fontSize: "12px",
          borderBottom: i < phase.items.length - 1 ? "1px solid #052e16" : "none",
          background: i % 2 === 0 ? "#0a1a0e" : "#071209"
        }}>
          <span style={{ color: "#6b7280" }}>{item.component}</span>
          <span style={{ color: "#f0fdf4", fontWeight: "600" }}>{item.tool}</span>
          <span style={{ color: "#4ade80", fontFamily: "monospace", fontSize: "11px" }}>{item.note}</span>
        </div>
      ))}
    </div>
  </div>
);

const WeekCard = ({ week, isLast }) => (
  <div style={{ display: "flex", gap: "0", marginBottom: isLast ? 0 : "4px" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0 }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "6px",
        background: "#052e16", border: "2px solid #16a34a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "9px", fontWeight: "700", color: "#4ade80", flexShrink: 0, textAlign: "center", lineHeight: "1.2"
      }}>{week.week.replace("Week ", "W")}</div>
      {!isLast && <div style={{ width: "2px", flex: 1, background: "#16532d", minHeight: "24px" }} />}
    </div>
    <div style={{
      flex: 1, background: "#0a1a0e", border: "1px solid #16532d",
      borderRadius: "8px", padding: "14px 18px", marginLeft: "12px", marginBottom: "8px"
    }}>
      <div style={{ fontSize: "12px", fontWeight: "700", color: "#4ade80", marginBottom: "10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{week.goal}</div>
      <ul style={{ margin: 0, paddingLeft: "16px" }}>
        {week.tasks.map((t, i) => (
          <li key={i} style={{ fontSize: "12px", color: "#a3b8a8", marginBottom: "4px", lineHeight: "1.5" }}>{t}</li>
        ))}
      </ul>
      <div style={{ marginTop: "12px", padding: "8px 12px", background: "#052e16", borderRadius: "6px", borderLeft: "3px solid #16a34a" }}>
        <span style={{ fontSize: "11px", color: "#6b7280" }}>Deliverable: </span>
        <span style={{ fontSize: "11px", color: "#86efac", fontWeight: "600" }}>{week.deliverable}</span>
      </div>
    </div>
  </div>
);

const RiskCard = ({ item }) => (
  <div style={{
    background: "#0a1a0e", border: "1px solid #16532d", borderRadius: "8px",
    padding: "16px 20px", marginBottom: "8px"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#f0fdf4", flex: 1, paddingRight: "12px" }}>{item.risk}</div>
      <span style={{
        fontSize: "10px", padding: "2px 10px", borderRadius: "20px", flexShrink: 0,
        background: item.severity === "High" ? "#450a0a" : item.severity === "Medium" ? "#431407" : "#052e16",
        color: item.severity === "High" ? "#fca5a5" : item.severity === "Medium" ? "#fdba74" : "#86efac",
        border: `1px solid ${item.severity === "High" ? "#7f1d1d" : item.severity === "Medium" ? "#7c2d12" : "#166534"}`,
        fontWeight: "600"
      }}>{item.severity}</span>
    </div>
    <div style={{ fontSize: "13px", color: "#a3b8a8", lineHeight: "1.6" }}>
      <span style={{ color: "#4ade80" }}>Fix: </span>{item.mitigation}
    </div>
  </div>
);

export default function NetsoProspectingEngine() {
  const [active, setActive] = useState("overview");
  const section = sections.find(s => s.id === active);

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#030a04",
      minHeight: "100vh",
      color: "#f0fdf4",
      display: "flex"
    }}>
      {/* Sidebar */}
      <div style={{
        width: "220px", flexShrink: 0,
        background: "#040d05",
        borderRight: "1px solid #16532d",
        padding: "28px 0",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #052e16" }}>
          <div style={{ fontSize: "11px", color: "#16a34a", letterSpacing: "0.15em", fontWeight: "700", marginBottom: "4px" }}>NETSO</div>
          <div style={{ fontSize: "13px", color: "#4ade80", fontWeight: "700", lineHeight: "1.3" }}>Rooftop Prospecting Engine</div>
          <div style={{ fontSize: "10px", color: "#374151", marginTop: "4px" }}>Technical Spec v1.0</div>
        </div>
        <nav style={{ padding: "16px 0", flex: 1 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "10px 20px", border: "none", cursor: "pointer",
              background: active === s.id ? "#0a1a0e" : "transparent",
              borderLeft: active === s.id ? "3px solid #16a34a" : "3px solid transparent",
              color: active === s.id ? "#4ade80" : "#4b5563",
              fontSize: "11px", fontFamily: "inherit", fontWeight: active === s.id ? "700" : "400",
              letterSpacing: "0.03em", transition: "all 0.15s"
            }}>{s.label}</button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #052e16" }}>
          <div style={{ fontSize: "10px", color: "#1f2937", lineHeight: "1.5" }}>
            Built for Netso<br />Solo-founder executable<br />30-day build plan
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ maxWidth: "760px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", color: "#16a34a", letterSpacing: "0.15em", fontWeight: "700", marginBottom: "8px" }}>{section.label}</div>
            <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#f0fdf4", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{section.title}</h1>
            <p style={{ fontSize: "14px", color: "#4b5563", margin: 0 }}>{section.subtitle}</p>
          </div>

          {section.content.map((block, i) => {
            if (block.type === "prose") return (
              <p key={i} style={{ fontSize: "14px", color: "#a3b8a8", lineHeight: "1.7", marginBottom: "20px" }}>{block.text}</p>
            );

            if (block.type === "callout") return (
              <div key={i} style={{
                background: "#0a1a0e", border: "1px solid #16a34a", borderLeft: "4px solid #16a34a",
                borderRadius: "8px", padding: "16px 20px", marginBottom: "24px"
              }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#16a34a", marginBottom: "8px", letterSpacing: "0.1em" }}>{block.label}</div>
                <div style={{ fontSize: "13px", color: "#86efac", lineHeight: "1.6" }}>{block.text}</div>
              </div>
            );

            if (block.type === "metrics") return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
                {block.items.map((m, j) => (
                  <div key={j} style={{ background: "#0a1a0e", border: "1px solid #16532d", borderRadius: "8px", padding: "16px 20px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "900", color: "#4ade80", fontFamily: "monospace", letterSpacing: "-0.02em" }}>{m.value}</div>
                    <div style={{ fontSize: "12px", color: "#f0fdf4", fontWeight: "600", marginTop: "4px" }}>{m.label}</div>
                    <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "2px" }}>{m.note}</div>
                  </div>
                ))}
              </div>
            );

            if (block.type === "pipeline") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                {block.stages.map((stage, j) => (
                  <PipelineStage key={j} stage={stage} isLast={j === block.stages.length - 1} />
                ))}
              </div>
            );

            if (block.type === "scoring") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                {block.factors.map((f, j) => <ScoringFactor key={j} factor={f} />)}
              </div>
            );

            if (block.type === "tiers") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#4b5563", marginBottom: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Priority Tiers</div>
                {block.items.map((t, j) => (
                  <div key={j} style={{
                    display: "grid", gridTemplateColumns: "40px 80px 1fr",
                    gap: "16px", alignItems: "center",
                    padding: "12px 16px", borderRadius: "8px",
                    background: "#0a1a0e", border: "1px solid #16532d", marginBottom: "6px"
                  }}>
                    <div style={{ fontSize: "20px", fontWeight: "900", color: t.color, fontFamily: "monospace" }}>Tier {t.tier}</div>
                    <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#6b7280" }}>{t.range}</div>
                    <div style={{ fontSize: "12px", color: "#a3b8a8" }}>{t.action}</div>
                  </div>
                ))}
              </div>
            );

            if (block.type === "stack") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                {block.phases.map((p, j) => <StackPhase key={j} phase={p} />)}
              </div>
            );

            if (block.type === "roadmap") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                {block.weeks.map((w, j) => <WeekCard key={j} week={w} isLast={j === block.weeks.length - 1} />)}
              </div>
            );

            if (block.type === "risks") return (
              <div key={i} style={{ marginBottom: "28px" }}>
                {block.items.map((r, j) => <RiskCard key={j} item={r} />)}
              </div>
            );

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
