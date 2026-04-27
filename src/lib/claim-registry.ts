export type ClaimStatus = "verified" | "internal-proof-only" | "rewrite" | "remove";

export type ClaimRegistryEntry = {
  id: string;
  area: string;
  claim: string;
  status: ClaimStatus;
  sources: string[];
  notes?: string;
};

export const claimRegistry: ClaimRegistryEntry[] = [
  {
    id: "bpdb-residential-slabs-2024",
    area: "calculator",
    claim:
      "BPDB residential low-voltage slab rates effective February 2024 include lifeline 0-50 at 4.63 BDT/kWh and stepped rates through 14.61 BDT/kWh.",
    status: "verified",
    sources: [
      "https://bpdb.gov.bd/site/page/cc5bf734-95d2-44a1-b617-693de2127020/",
      "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-bpdb/2024/12/80314de9884b4d84b4d98f15baa82bd5.pdf",
    ],
  },
  {
    id: "bpdb-low-voltage-fixed-charge-2024",
    area: "calculator",
    claim:
      "The BPDB low-voltage residential schedule also lists a BDT 42 fixed charge, which should not be treated as solar-offsettable energy savings.",
    status: "verified",
    sources: [
      "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-bpdb/2024/12/80314de9884b4d84b4d98f15baa82bd5.pdf",
    ],
  },
  {
    id: "nshd-three-phase-eligibility",
    area: "funnel",
    claim: "Any three-phase consumer is eligible to apply for net metering in Bangladesh.",
    status: "verified",
    sources: ["https://www.nshd.sreda.gov.bd/page?pid=8"],
  },
  {
    id: "nshd-70-percent-load-cap",
    area: "funnel",
    claim: "The renewable energy converter output can be a maximum of 70% of the consumer's sanctioned load.",
    status: "verified",
    sources: ["https://www.nshd.sreda.gov.bd/page?pid=8"],
  },
  {
    id: "nshd-rooftop-programme-scale",
    area: "about-market-context",
    claim: "NSHD states that 2,190 net-metering rooftop solar systems had reached 100 MWp at the time of publication.",
    status: "verified",
    sources: ["https://www.nshd.sreda.gov.bd/about"],
  },
  {
    id: "net-metering-guideline-2025",
    area: "policy",
    claim: "Power Division hosts the Net Metering Guideline - 2025 file set.",
    status: "verified",
    sources: ["https://powerdivision.gov.bd/pages/files/6948fac3559d93a15090eea0"],
  },
  {
    id: "supplier-brand-claims",
    area: "trust",
    claim: "Named supplier and partner logos should only appear after NETSO provides current agreements or approved supply documents.",
    status: "internal-proof-only",
    sources: [],
    notes: "Keep out of public copy until NETSO confirms exact current supply relationships.",
  },
  {
    id: "project-portfolio-metrics",
    area: "projects",
    claim: "Exact project names, capacities, years, and locations require internal project records before publication.",
    status: "internal-proof-only",
    sources: [],
  },
  {
    id: "wind-rating-and-warranty",
    area: "product",
    claim: "Wind ratings, warranty lengths, and structural claims must be backed by manufacturer and engineering documents.",
    status: "internal-proof-only",
    sources: [],
  },
  {
    id: "urban-footprint-stats",
    area: "problem-section",
    claim: "The old 85%, 12h+, and 0.02% macro rooftop/grid stats are not publishable without primary sourcing.",
    status: "remove",
    sources: [],
  },
  {
    id: "property-value-uplift",
    area: "value-stack",
    claim: "The old 5-8% property value uplift claim is unsupported and should not appear publicly.",
    status: "remove",
    sources: [],
  },
  {
    id: "precise-report-and-quote-promises",
    area: "funnel",
    claim: "Customer-facing report, fixed-price quote, and precise turnaround promises should be softened unless the workflow actually delivers them.",
    status: "rewrite",
    sources: [],
  },
  {
    id: "calculator-roi-precision",
    area: "calculator",
    claim: "Payback and long-horizon profit claims must be softened to indicative planning outputs with clearly stated assumptions.",
    status: "rewrite",
    sources: [],
  },
];
