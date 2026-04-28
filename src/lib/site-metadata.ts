import {
  DEFAULT_SITE_URL,
  DEFAULT_SOCIAL_IMAGE_PATH,
  DEFAULT_WHATSAPP_NUMBER,
  SITE_NAME,
  createDocumentTitle,
  getIndexableRoutes,
  getPrerenderRoutes,
  getRouteMetadata as getSharedRouteMetadata,
  marketingRouteEntries,
  marketingRoutes,
  normalizePathname,
  notFoundRouteMetadata,
  resolveRouteMetadata,
  resolveSiteUrl,
  sanitizePhoneNumber,
  toAbsoluteUrl,
} from "./site-metadata.shared.js";

export type MarketingRoute =
  | "/"
  | "/how-it-works"
  | "/products"
  | "/projects"
  | "/about"
  | "/feasibility";

export type RouteMetadata = (typeof marketingRouteEntries)[number][1];

export {
  createDocumentTitle,
  DEFAULT_SITE_URL,
  DEFAULT_SOCIAL_IMAGE_PATH,
  DEFAULT_WHATSAPP_NUMBER,
  getIndexableRoutes,
  getPrerenderRoutes,
  marketingRouteEntries,
  marketingRoutes,
  normalizePathname,
  notFoundRouteMetadata,
  resolveRouteMetadata,
  resolveSiteUrl,
  sanitizePhoneNumber,
  SITE_NAME,
  toAbsoluteUrl,
};

export function getRouteMetadata(pathname: string) {
  return getSharedRouteMetadata(pathname);
}
