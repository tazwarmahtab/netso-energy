export const SITE_NAME = "NETSO ENERGY";
export const DEFAULT_SITE_URL = "https://netsoenergy.com";
export const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.jpg";
export const DEFAULT_SOCIAL_IMAGE_ALT =
  "NETSO rooftop solar pergola overlooking the Dhaka skyline";
export const DEFAULT_INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const DEFAULT_NOINDEX_ROBOTS = "noindex, nofollow, noarchive";
export const DEFAULT_TWITTER_CARD = "summary_large_image";
export const DEFAULT_WHATSAPP_NUMBER = "8801791222777";
export const DEFAULT_ANALYTICS_ENDPOINT = "/api/track";

export const marketingRouteEntries = [
  [
    "/",
    {
      title: "Infrastructure for a Solar Future",
      description:
        "NETSO Energy turns unused rooftops into energy-generating assets with high-performance solar pergolas built for Bangladesh.",
      canonicalPath: "/",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 1,
      changefreq: "weekly",
    },
  ],
  [
    "/how-it-works",
    {
      title: "How It Works",
      description:
        "A staged, engineering-led process for assessing, designing, and delivering rooftop solar projects in Dhaka.",
      canonicalPath: "/how-it-works",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 0.8,
      changefreq: "monthly",
    },
  ],
  [
    "/products",
    {
      title: "Solar Pergola",
      description:
        "Solar pergola systems designed around shade, shelter, and energy generation for Dhaka rooftops.",
      canonicalPath: "/products",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 0.9,
      changefreq: "monthly",
    },
  ],
  [
    "/projects",
    {
      title: "Projects",
      description:
        "Selected residential and commercial rooftop contexts across Dhaka.",
      canonicalPath: "/projects",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 0.8,
      changefreq: "monthly",
    },
  ],
  [
    "/about",
    {
      title: "About",
      description:
        "Building Bangladesh's distributed energy backbone — one rooftop at a time. Learn about the NETSO mission and impact.",
      canonicalPath: "/about",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 0.7,
      changefreq: "monthly",
    },
  ],
  [
    "/feasibility",
    {
      title: "Check Feasibility",
      description:
        "Start a rooftop assessment and share the building, bill, and roof context NETSO needs to review fit.",
      canonicalPath: "/feasibility",
      ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
      twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
      priority: 0.9,
      changefreq: "weekly",
    },
  ],
];

export const notFoundRouteMetadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
  canonicalPath: "/404",
  ogImage: DEFAULT_SOCIAL_IMAGE_PATH,
  twitterImage: DEFAULT_SOCIAL_IMAGE_PATH,
  noindex: true,
  priority: 0,
  changefreq: "never",
};

export const marketingRoutes = new Map(marketingRouteEntries);

export function sanitizePhoneNumber(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function normalizePathname(pathname) {
  if (!pathname) {
    return "/";
  }

  const cleanedPath = pathname.split(/[?#]/u)[0] || "/";

  if (cleanedPath !== "/" && cleanedPath.endsWith("/")) {
    return cleanedPath.slice(0, -1);
  }

  return cleanedPath;
}

export function resolveSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return String(siteUrl || DEFAULT_SITE_URL).replace(/\/+$/u, "");
}

export function createDocumentTitle(title) {
  return `${title} | ${SITE_NAME}`;
}

export function toAbsoluteUrl(pathOrUrl, siteUrl = DEFAULT_SITE_URL) {
  if (/^https?:\/\//u.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${resolveSiteUrl(siteUrl)}${normalizedPath}`;
}

export function getRouteMetadata(pathname) {
  const normalizedPath = normalizePathname(pathname);
  return marketingRoutes.get(normalizedPath) ?? notFoundRouteMetadata;
}

export function resolveRouteMetadata(pathname, siteUrl = DEFAULT_SITE_URL) {
  const route = getRouteMetadata(pathname);
  const resolvedSiteUrl = resolveSiteUrl(siteUrl);
  const indexable = route.noindex !== true;

  return {
    canonicalPath: route.canonicalPath,
    canonicalUrl: toAbsoluteUrl(route.canonicalPath, resolvedSiteUrl),
    changefreq: route.changefreq || "monthly",
    description: route.description,
    imageAlt: route.imageAlt || DEFAULT_SOCIAL_IMAGE_ALT,
    imageUrl: toAbsoluteUrl(route.ogImage || DEFAULT_SOCIAL_IMAGE_PATH, resolvedSiteUrl),
    indexable,
    ogType: "website",
    priority: route.priority || 0.5,
    robotsContent: route.robots || (indexable ? DEFAULT_INDEX_ROBOTS : DEFAULT_NOINDEX_ROBOTS),
    title: route.title,
    titleText: createDocumentTitle(route.title),
    twitterCard: DEFAULT_TWITTER_CARD,
  };
}

export function getPrerenderRoutes() {
  return [...marketingRouteEntries.map(([, route]) => route.canonicalPath), "/404"];
}

export function getIndexableRoutes() {
  return marketingRouteEntries.map(([, route]) => route.canonicalPath);
}
