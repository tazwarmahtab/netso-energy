export type MarketingRoute = "/" | "/how-it-works" | "/products" | "/projects" | "/about" | "/feasibility";

export type RouteMetadata = {
  title: string;
  description: string;
  canonicalPath: MarketingRoute;
  ogImage: string;
  twitterImage: string;
  noindex?: boolean;
};

export const SITE_ORIGIN = "https://netsoenergy.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const marketingRouteEntries: [MarketingRoute, RouteMetadata][] = [
  [
    "/",
    {
      title: "Infrastructure for a Solar Future",
      description:
        "NETSO Energy turns unused rooftops into energy-generating assets with high-performance solar pergolas built for Bangladesh.",
      canonicalPath: "/",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
  [
    "/how-it-works",
    {
      title: "How It Works",
      description:
        "A staged, engineering-led process for assessing, designing, and delivering rooftop solar projects in Dhaka.",
      canonicalPath: "/how-it-works",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
  [
    "/products",
    {
      title: "Solar Pergola",
      description:
        "Solar pergola systems designed around shade, shelter, and energy generation for Dhaka rooftops.",
      canonicalPath: "/products",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
  [
    "/projects",
    {
      title: "Projects",
      description:
        "Selected residential and commercial rooftop contexts across Dhaka.",
      canonicalPath: "/projects",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
  [
    "/about",
    {
      title: "About",
      description:
        "Building Bangladesh's distributed energy backbone — one rooftop at a time. Learn about the NETSO mission and impact.",
      canonicalPath: "/about",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
  [
    "/feasibility",
    {
      title: "Check Feasibility",
      description:
        "Start a rooftop assessment and share the building, bill, and roof context NETSO needs to review fit.",
      canonicalPath: "/feasibility",
      ogImage: DEFAULT_OG_IMAGE,
      twitterImage: DEFAULT_OG_IMAGE,
    },
  ],
];

export const marketingRoutes = new Map(marketingRouteEntries);

export function getRouteMetadata(pathname: string): RouteMetadata {
  return marketingRoutes.get((pathname as MarketingRoute) || "/") ?? marketingRoutes.get("/")!;
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, SITE_ORIGIN).toString();
}
