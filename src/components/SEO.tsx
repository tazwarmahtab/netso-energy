import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  path?: string;
  robots?: string;
}

interface ResolvedSEOState {
  canonicalUrl: string;
  description: string;
  imageAlt: string;
  imageUrl: string;
  ogType: string;
  robotsContent: string;
  titleText: string;
}

interface RouteMetadata {
  canonicalPath?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  indexable?: boolean;
  path: string;
  robots?: string;
  title: string;
}

const SITE_NAME = "NETSO ENERGY";
const DEFAULT_SITE_URL = "https://netsoenergy.com";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.jpg";
const DEFAULT_SOCIAL_IMAGE_ALT =
  "NETSO rooftop solar pergola overlooking the Dhaka skyline";
const DEFAULT_INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_NOINDEX_ROBOTS = "noindex, nofollow, noarchive";
const DEFAULT_TWITTER_CARD = "summary_large_image";

const ROUTE_METADATA: RouteMetadata[] = [
  {
    path: "/",
    title: "Infrastructure for a Solar Future",
    description:
      "NETSO Energy turns unused rooftops into energy-generating assets with high-performance solar pergolas built for Bangladesh.",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "A staged, engineering-led process for assessing, designing, and delivering rooftop solar projects in Dhaka.",
  },
  {
    path: "/projects",
    title: "Projects",
    description:
      "Selected residential and commercial rooftop contexts across Dhaka.",
  },
  {
    path: "/products",
    title: "Solar Pergola",
    description:
      "Solar pergola systems designed around shade, shelter, and energy generation for Dhaka rooftops.",
  },
  {
    path: "/about",
    title: "About",
    description:
      "Building Bangladesh's distributed energy backbone — one rooftop at a time. Learn about the NETSO mission and impact.",
  },
  {
    path: "/feasibility",
    title: "Check Feasibility",
    description:
      "Start a rooftop assessment and share the building, bill, and roof context NETSO needs to review fit.",
  },
  {
    path: "/404",
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    indexable: false,
  },
];

const normalizePathname = (pathname: string) => {
  const cleanedPath = pathname.split(/[?#]/u)[0] || "/";

  if (cleanedPath !== "/" && cleanedPath.endsWith("/")) {
    return cleanedPath.slice(0, -1);
  }

  return cleanedPath;
};

const resolveSiteUrl = (siteUrl: string = DEFAULT_SITE_URL) =>
  siteUrl.replace(/\/+$/u, "");

const createDocumentTitle = (title: string) => `${title} | ${SITE_NAME}`;

const toAbsoluteUrl = (siteUrl: string, pathname: string) => {
  if (/^https?:\/\//u.test(pathname)) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${resolveSiteUrl(siteUrl)}${normalizedPath}`;
};

const resolveRouteMetadata = (pathname: string, siteUrl: string) => {
  const normalizedPath = normalizePathname(pathname);
  const routeMetadata =
    ROUTE_METADATA.find((route) => route.path === normalizedPath) ||
    ROUTE_METADATA.find((route) => route.path === "/404");

  if (!routeMetadata) {
    throw new Error("Missing /404 SEO metadata configuration.");
  }

  const resolvedSiteUrl = resolveSiteUrl(siteUrl);
  const canonicalPath = routeMetadata.canonicalPath || routeMetadata.path;
  const imagePath = routeMetadata.image || DEFAULT_SOCIAL_IMAGE_PATH;
  const indexable = routeMetadata.indexable !== false;

  return {
    canonicalPath,
    description: routeMetadata.description,
    imageAlt: routeMetadata.imageAlt || DEFAULT_SOCIAL_IMAGE_ALT,
    imagePath,
    indexable,
    ogType: "website",
    robotsContent: routeMetadata.robots || (indexable ? DEFAULT_INDEX_ROBOTS : DEFAULT_NOINDEX_ROBOTS),
    siteUrl: resolvedSiteUrl,
    title: routeMetadata.title,
    twitterCard: DEFAULT_TWITTER_CARD,
  };
};

const upsertMetaTag = (
  selector: string,
  attributes: Record<string, string>,
) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([attribute, value]) => {
    element?.setAttribute(attribute, value);
  });
};

const upsertLinkTag = (
  selector: string,
  attributes: Record<string, string>,
) => {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([attribute, value]) => {
    element?.setAttribute(attribute, value);
  });
};

const resolveSEOState = (
  pathname: string,
  {
    title,
    description,
    canonicalPath,
    image,
    imageAlt,
    noindex,
    robots,
  }: SEOProps,
): ResolvedSEOState => {
  const routeMetadata = resolveRouteMetadata(
    pathname,
    import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL,
  );
  const resolvedTitle = title || routeMetadata.title;
  const resolvedDescription = description || routeMetadata.description;
  const resolvedCanonicalPath = canonicalPath || routeMetadata.canonicalPath;
  const resolvedImagePath = image || routeMetadata.imagePath;

  return {
    canonicalUrl: toAbsoluteUrl(routeMetadata.siteUrl, resolvedCanonicalPath),
    description: resolvedDescription,
    imageAlt: imageAlt || routeMetadata.imageAlt,
    imageUrl: toAbsoluteUrl(routeMetadata.siteUrl, resolvedImagePath),
    ogType: routeMetadata.ogType,
    robotsContent: noindex
      ? DEFAULT_NOINDEX_ROBOTS
      : robots || routeMetadata.robotsContent,
    titleText: createDocumentTitle(resolvedTitle),
  };
};

const applySEOState = ({
  canonicalUrl,
  description,
  imageAlt,
  imageUrl,
  ogType,
  robotsContent,
  titleText,
}: ResolvedSEOState) => {
  document.title = titleText;

  upsertMetaTag('meta[name="description"]', {
    content: description,
    "data-seo": "description",
    name: "description",
  });
  upsertMetaTag('meta[name="robots"]', {
    content: robotsContent,
    "data-seo": "robots",
    name: "robots",
  });
  upsertLinkTag('link[rel="canonical"]', {
    "data-seo": "canonical",
    href: canonicalUrl,
    rel: "canonical",
  });

  upsertMetaTag('meta[property="og:title"]', {
    content: titleText,
    "data-seo": "og:title",
    property: "og:title",
  });
  upsertMetaTag('meta[property="og:description"]', {
    content: description,
    "data-seo": "og:description",
    property: "og:description",
  });
  upsertMetaTag('meta[property="og:type"]', {
    content: ogType,
    "data-seo": "og:type",
    property: "og:type",
  });
  upsertMetaTag('meta[property="og:url"]', {
    content: canonicalUrl,
    "data-seo": "og:url",
    property: "og:url",
  });
  upsertMetaTag('meta[property="og:image"]', {
    content: imageUrl,
    "data-seo": "og:image",
    property: "og:image",
  });
  upsertMetaTag('meta[property="og:image:alt"]', {
    content: imageAlt,
    "data-seo": "og:image:alt",
    property: "og:image:alt",
  });
  upsertMetaTag('meta[property="og:site_name"]', {
    content: SITE_NAME,
    "data-seo": "og:site_name",
    property: "og:site_name",
  });

  upsertMetaTag('meta[name="twitter:card"]', {
    content: "summary_large_image",
    "data-seo": "twitter:card",
    name: "twitter:card",
  });
  upsertMetaTag('meta[name="twitter:title"]', {
    content: titleText,
    "data-seo": "twitter:title",
    name: "twitter:title",
  });
  upsertMetaTag('meta[name="twitter:description"]', {
    content: description,
    "data-seo": "twitter:description",
    name: "twitter:description",
  });
  upsertMetaTag('meta[name="twitter:image"]', {
    content: imageUrl,
    "data-seo": "twitter:image",
    name: "twitter:image",
  });
  upsertMetaTag('meta[name="twitter:image:alt"]', {
    content: imageAlt,
    "data-seo": "twitter:image:alt",
    name: "twitter:image:alt",
  });
};

export const SEO = ({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  noindex,
  path,
  robots,
}: SEOProps) => {
  useEffect(() => {
    const pathname =
      path || (typeof window !== "undefined" ? window.location.pathname : "/");

    applySEOState(
      resolveSEOState(pathname, {
        title,
        description,
        canonicalPath,
        image,
        imageAlt,
        noindex,
        robots,
      }),
    );
  }, [
    canonicalPath,
    description,
    image,
    imageAlt,
    noindex,
    robots,
    title,
    path,
  ]);

  return null;
};

export const RouteSEO = () => {
  const location = useLocation();

  return <SEO path={location.pathname} />;
};
