import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import {
  DEFAULT_SITE_URL,
  DEFAULT_TWITTER_CARD,
  SITE_NAME,
  getIndexableRoutes,
  getPrerenderRoutes,
  resolveRouteMetadata,
  resolveSiteUrl,
} from "./src/lib/site-metadata.shared.js";

const legacyRedirects: Array<{ from: string; to: string }> = [];

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
  const entries = getIndexableRoutes()
    .map((routePath) => {
      const metadata = resolveRouteMetadata(routePath, siteUrl);

      return `  <url>
    <loc>${escapeHtml(metadata.canonicalUrl)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${metadata.changefreq}</changefreq>
    <priority>${metadata.priority.toFixed(1)}</priority>
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

const getNodeModulePackage = (id: string) => {
  const normalized = id.split("node_modules/")[1];
  if (!normalized) return null;

  const segments = normalized.split("/");
  if (segments[0]?.startsWith("@")) {
    return `${segments[0]}/${segments[1]}`;
  }

  return segments[0] ?? null;
};

const staticSeoPlugin = (siteUrl: string): Plugin => ({
  apply: "build",
  closeBundle: async () => {
    const outDir = path.resolve(__dirname, "dist");
    const rootHtmlPath = path.join(outDir, "index.html");
    const template = await readFile(rootHtmlPath, "utf8");

    for (const routePath of getPrerenderRoutes()) {
      const outputPath = routeOutputPath(outDir, routePath);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, renderRouteHtml(template, routePath, siteUrl), "utf8");
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
            if (!id.includes("node_modules")) return undefined;

            const pkg = getNodeModulePackage(id);
            if (!pkg) return "vendor";

            if (pkg === "framer-motion") return "motion-core";
            if (pkg === "gsap") return "gsap-core";

            if (
              pkg.startsWith("@supabase") ||
              pkg.startsWith("@tanstack")
            ) {
              return "data-clients";
            }

            if (pkg === "remotion" || pkg === "@remotion/player") {
              return "remotion";
            }

            if (pkg === "recharts" || pkg.startsWith("d3-")) {
              return "charts";
            }

            if (
              pkg.startsWith("@radix-ui") ||
              pkg === "sonner" ||
              pkg === "next-themes" ||
              pkg === "vaul" ||
              pkg === "cmdk" ||
              pkg === "embla-carousel-react" ||
              pkg === "react-day-picker" ||
              pkg === "input-otp" ||
              pkg === "react-resizable-panels"
            ) {
              return "ui-kit";
            }

            if (
              pkg === "react-hook-form" ||
              pkg === "@hookform/resolvers" ||
              pkg === "zod" ||
              pkg === "date-fns"
            ) {
              return "forms-data";
            }

            if (
              pkg === "lucide-react" ||
              pkg === "class-variance-authority" ||
              pkg === "clsx" ||
              pkg === "tailwind-merge"
            ) {
              return "ui-primitives";
            }

            return "vendor";
          },
        },
      },
    },
  };
});
