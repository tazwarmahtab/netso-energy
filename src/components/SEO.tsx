import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_NOINDEX_ROBOTS,
  DEFAULT_SITE_URL,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  createDocumentTitle,
  resolveRouteMetadata,
  resolveSiteUrl,
  toAbsoluteUrl,
} from "@/lib/site-metadata.shared.js";

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
  const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const routeMetadata = resolveRouteMetadata(pathname, siteUrl);
  const resolvedTitle = title || routeMetadata.title;
  const resolvedDescription = description || routeMetadata.description;
  const resolvedCanonicalPath = canonicalPath || routeMetadata.canonicalPath;
  const resolvedImageUrl = image
    ? toAbsoluteUrl(image, siteUrl)
    : routeMetadata.imageUrl;

  return {
    canonicalUrl: toAbsoluteUrl(resolvedCanonicalPath, siteUrl),
    description: resolvedDescription,
    imageAlt: imageAlt || routeMetadata.imageAlt,
    imageUrl: resolvedImageUrl,
    ogType: routeMetadata.ogType,
    robotsContent: noindex
      ? DEFAULT_NOINDEX_ROBOTS
      : robots || routeMetadata.robotsContent,
    titleText:
      resolvedTitle === routeMetadata.title
        ? routeMetadata.titleText
        : createDocumentTitle(resolvedTitle),
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
    content: DEFAULT_TWITTER_CARD,
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
    path,
    robots,
    title,
  ]);

  return null;
};

export const RouteSEO = () => {
  const location = useLocation();

  return <SEO path={location.pathname} />;
};
