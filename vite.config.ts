import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type RouteMetadata = {
  changefreq?: ChangeFrequency;
  description: string;
  image?: string;
  imageAlt?: string;
  indexable?: boolean;
  path: string;
  prerender?: boolean;
  priority?: number;
  robots?: string;
  title: string;
};

const DEFAULT_SITE_URL = "https://netsoenergy.com";
const SITE_NAME = "NETSO ENERGY";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.jpg";
const DEFAULT_SOCIAL_IMAGE_ALT =
  "NETSO rooftop solar pergola overlooking the Dhaka skyline";
const DEFAULT_TWITTER_CARD = "summary_large_image";
const DEFAULT_INDEX_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_NOINDEX_ROBOTS = "noindex, nofollow, noarchive";

const routeMetadata: RouteMetadata[] = [
  {
    path: "/",
    title: "Infrastructure for a Solar Future",
    description:
      "NETSO Energy turns unused rooftops into energy-generating assets with high-performance solar pergolas built for Bangladesh.",
    priority: 1,
    changefreq: "weekly",
  },
  {
    path: "/how-it-works",
    title: "How It Works",
    description:
      "A staged, engineering-led process for assessing, designing, and delivering rooftop solar projects in Dhaka.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/projects",
    title: "Projects",
    description:
      "Selected residential and commercial rooftop contexts across Dhaka.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/products",
    title: "Solar Pergola",
    description:
      "Solar pergola systems designed around shade, shelter, and energy generation for Dhaka rooftops.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About",
    description:
      "Building Bangladesh's distributed energy backbone — one rooftop at a time. Learn about the NETSO mission and impact.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/feasibility",
    title: "Check Feasibility",
    description:
      "Start a rooftop assessment and share the building, bill, and roof context NETSO needs to review fit.",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/404",
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    indexable: false,
    prerender: true,
  },
];

const legacyRedirects: Array<{ from: string; to: string }> = [];

const normalizePathname = (pathname: string) => {
  if (!pathname) {
    return "/";
  }

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
  const route =
    routeMetadata.find((entry) => entry.path === normalizedPath) ||
    routeMetadata.find((entry) => entry.path === "/404");

  if (!route) {
    throw new Error("Missing /404 SEO metadata configuration.");
  }

  const resolvedSiteUrl = resolveSiteUrl(siteUrl);
  const imagePath = route.image || DEFAULT_SOCIAL_IMAGE_PATH;
  const indexable = route.indexable !== false;

  return {
    canonicalUrl: toAbsoluteUrl(resolvedSiteUrl, route.path),
    description: route.description,
    imageAlt: route.imageAlt || DEFAULT_SOCIAL_IMAGE_ALT,
    imageUrl: toAbsoluteUrl(resolvedSiteUrl, imagePath),
    indexable,
    ogType: "website",
    robotsContent: route.robots || (indexable ? DEFAULT_INDEX_ROBOTS : DEFAULT_NOINDEX_ROBOTS),
    titleText: createDocumentTitle(route.title),
    twitterCard: DEFAULT_TWITTER_CARD,
  };
};

const getPrerenderRoutes = () =>
  routeMetadata.filter((route) => route.prerender !== false);

const getSitemapRoutes = () =>
  routeMetadata.filter((route) => route.indexable !== false);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeAttribute = (value: string) =>
  escapeHtml(value).replaceAll('"', "&quot;");

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const replaceTitleTag = (html: string, title: string) =>
  html.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>/iu,
    `    <title data-seo="title">${escapeHtml(title)}</title>`,
  );

const replaceDataSeoTag = (html: string, key: string, markup: string) =>
  html.replace(
    new RegExp(`<[^>]+data-seo="${escapeRegex(key)}"[^>]*>`, "iu"),
    markup,
  );

const renderRouteHtml = (template: string, routePath: string, siteUrl: string) => {
  const metadata = resolveRouteMetadata(routePath, siteUrl);

  let html = replaceTitleTag(template, metadata.titleText);

  html = replaceDataSeoTag(
    html,
    "description",
    `    <meta name="description" content="${escapeAttribute(metadata.description)}" data-seo="description" />`,
  );
  html = replaceDataSeoTag(
    html,
    "robots",
    `    <meta name="robots" content="${escapeAttribute(metadata.robotsContent)}" data-seo="robots" />`,
  );
  html = replaceDataSeoTag(
    html,
    "canonical",
    `    <link rel="canonical" href="${escapeAttribute(metadata.canonicalUrl)}" data-seo="canonical" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:title",
    `    <meta property="og:title" content="${escapeAttribute(metadata.titleText)}" data-seo="og:title" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:description",
    `    <meta property="og:description" content="${escapeAttribute(metadata.description)}" data-seo="og:description" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:type",
    `    <meta property="og:type" content="${escapeAttribute(metadata.ogType)}" data-seo="og:type" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:url",
    `    <meta property="og:url" content="${escapeAttribute(metadata.canonicalUrl)}" data-seo="og:url" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:site_name",
    `    <meta property="og:site_name" content="${SITE_NAME}" data-seo="og:site_name" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:image",
    `    <meta property="og:image" content="${escapeAttribute(metadata.imageUrl)}" data-seo="og:image" />`,
  );
  html = replaceDataSeoTag(
    html,
    "og:image:alt",
    `    <meta property="og:image:alt" content="${escapeAttribute(metadata.imageAlt)}" data-seo="og:image:alt" />`,
  );
  html = replaceDataSeoTag(
    html,
    "twitter:card",
    `    <meta name="twitter:card" content="${escapeAttribute(metadata.twitterCard)}" data-seo="twitter:card" />`,
  );
  html = replaceDataSeoTag(
    html,
    "twitter:title",
    `    <meta name="twitter:title" content="${escapeAttribute(metadata.titleText)}" data-seo="twitter:title" />`,
  );
  html = replaceDataSeoTag(
    html,
    "twitter:description",
    `    <meta name="twitter:description" content="${escapeAttribute(metadata.description)}" data-seo="twitter:description" />`,
  );
  html = replaceDataSeoTag(
    html,
    "twitter:image",
    `    <meta name="twitter:image" content="${escapeAttribute(metadata.imageUrl)}" data-seo="twitter:image" />`,
  );
  html = replaceDataSeoTag(
    html,
    "twitter:image:alt",
    `    <meta name="twitter:image:alt" content="${escapeAttribute(metadata.imageAlt)}" data-seo="twitter:image:alt" />`,
  );

  return html;
};

const routeOutputPath = (outDir: string, routePath: string) => {
  if (routePath === "/") {
    return path.join(outDir, "index.html");
  }

  if (routePath === "/404") {
    return path.join(outDir, "404.html");
  }

  return path.join(outDir, routePath.replace(/^\/+/u, ""), "index.html");
};

const renderRedirectHtml = ({
  from,
  siteUrl,
  to,
}: {
  from: string;
  siteUrl: string;
  to: string;
}) => {
  const targetUrl = `${resolveSiteUrl(siteUrl)}${to}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta http-equiv="refresh" content="0; url=${escapeAttribute(to)}" />
    <link rel="canonical" href="${escapeAttribute(targetUrl)}" />
    <title>Redirecting | ${SITE_NAME}</title>
  </head>
  <body>
    <p>Redirecting from ${escapeHtml(from)} to <a href="${escapeAttribute(to)}">${escapeHtml(to)}</a>.</p>
  </body>
</html>
`;
};

const renderSitemap = (siteUrl: string) => {
  const lastModified = new Date().toISOString();
  const entries = getSitemapRoutes()
    .map((route) => {
      const metadata = resolveRouteMetadata(route.path, siteUrl);

      return `  <url>
    <loc>${escapeHtml(metadata.canonicalUrl)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changefreq || "monthly"}</changefreq>
    <priority>${(route.priority || 0.5).toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
};

const renderRobots = (siteUrl: string) => `User-agent: *
Allow: /

Sitemap: ${resolveSiteUrl(siteUrl)}/sitemap.xml
`;

const staticSeoPlugin = (siteUrl: string): Plugin => ({
  apply: "build",
  closeBundle: async () => {
    const outDir = path.resolve(__dirname, "dist");
    const rootHtmlPath = path.join(outDir, "index.html");
    const template = await readFile(rootHtmlPath, "utf8");

    for (const route of getPrerenderRoutes()) {
      const outputPath = routeOutputPath(outDir, route.path);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, renderRouteHtml(template, route.path, siteUrl), "utf8");
    }

    for (const redirect of legacyRedirects) {
      const outputPath = routeOutputPath(outDir, redirect.from);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(
        outputPath,
        renderRedirectHtml({
          from: redirect.from,
          siteUrl,
          to: redirect.to,
        }),
        "utf8",
      );
    }

    await writeFile(path.join(outDir, "robots.txt"), renderRobots(siteUrl), "utf8");
    await writeFile(path.join(outDir, "sitemap.xml"), renderSitemap(siteUrl), "utf8");
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL || DEFAULT_SITE_URL);

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    assetsInclude: ["**/*.mp4", "**/*.MP4", "**/*.PNG", "**/*.JPG"],
    plugins: [
      react(),
      staticSeoPlugin(siteUrl),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }

            if (
              id.includes("/react/") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }

            if (
              id.includes("framer-motion") ||
              id.includes("/gsap/") ||
              id.includes("lenis")
            ) {
              return "motion-vendor";
            }

            if (
              id.includes("@supabase/") ||
              id.includes("@tanstack/") ||
              id.includes("react-hook-form") ||
              id.includes("@hookform/") ||
              id.includes("/zod/")
            ) {
              return "data-vendor";
            }

            if (
              id.includes("@radix-ui/") ||
              id.includes("lucide-react") ||
              id.includes("cmdk") ||
              id.includes("vaul") ||
              id.includes("embla-carousel-react") ||
              id.includes("sonner")
            ) {
              return "ui-vendor";
            }

            return "vendor";
          },
        },
      },
    },
  };
});
