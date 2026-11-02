import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrTempDir = path.join(rootDir, ".ssr-temp");

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function run() {
  const ssrEntryPath = path.join(ssrTempDir, "entry-server.js");
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`Missing SSR bundle at ${ssrEntryPath}`);
  }

  const templateHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(templateHtmlPath)) {
    throw new Error(`Missing client HTML template at ${templateHtmlPath}`);
  }

  let baseTemplate = fs.readFileSync(templateHtmlPath, "utf-8");

  // Inline compiled CSS directly into <head> to eliminate the render-blocking CSS request on Mobile 4G & Desktop
  const cssLinkMatch = baseTemplate.match(
    /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
  );
  if (cssLinkMatch) {
    const cssRelPath = cssLinkMatch[1].replace(/^\/+/, "");
    const cssFullPath = path.join(distDir, cssRelPath);
    if (fs.existsSync(cssFullPath)) {
      const cssContent = fs.readFileSync(cssFullPath, "utf-8");
      baseTemplate = baseTemplate.replace(
        cssLinkMatch[0],
        () => `<style>${cssContent}</style>`
      );
    }
  }

  const ssrModule = await import(pathToFileURL(ssrEntryPath).href);
  const renderedPages = ssrModule.renderAllStaticPages();

  if (!Array.isArray(renderedPages) || renderedPages.length === 0) {
    throw new Error("renderAllStaticPages() returned no routes.");
  }

  const siteOrigin = renderedPages[0].siteOrigin;
  const lastmodDate = "2026-11-02";

  for (const page of renderedPages) {
    const { route, appHtml, jsonLd, fullPhoneDisplay } = page;
    const pageUrl =
      route.path === "/" ? `${siteOrigin}/` : `${siteOrigin}${route.path}`;
    const ogImageUrl = `${siteOrigin}${route.ogImagePath}`;
    const dynamicDescription = route.description.replace(
      "+1 (848) 467-1057",
      fullPhoneDisplay
    );
    const robotsValue = route.indexable
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, follow";

    let html = baseTemplate;

    // 1. Title
    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtmlAttr(route.title)}</title>`
    );

    // 2. Meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtmlAttr(dynamicDescription)}" />`
    );

    // 3. Meta robots
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/,
      `<meta name="robots" content="${robotsValue}" />`
    );

    // 4. Canonical link
    if (route.indexable) {
      html = html.replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
        `<link rel="canonical" href="${escapeHtmlAttr(pageUrl)}" />`
      );
    } else {
      html = html.replace(/\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, "");
    }

    // 5. OpenGraph tags
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${escapeHtmlAttr(pageUrl)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeHtmlAttr(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtmlAttr(dynamicDescription)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image:alt" content="${escapeHtmlAttr(route.ogImageAlt)}" />`
    );

    // 6. Twitter tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeHtmlAttr(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeHtmlAttr(dynamicDescription)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`
    );

    // 7. Extract any React 19 SSR hoisted <link rel="preload" as="image" .../> from appHtml and place it cleanly in <head>
    let cleanedAppHtml = appHtml;
    const hoistedPreloadMatch = cleanedAppHtml.match(
      /<link\s+rel="preload"\s+as="image"[^>]*\/>/
    );
    if (hoistedPreloadMatch) {
      cleanedAppHtml = cleanedAppHtml.replace(hoistedPreloadMatch[0], "");
      if (route.path === "/") {
        html = html.replace(
          "</head>",
          `    ${hoistedPreloadMatch[0]}\n  </head>`
        );
      }
    }

    // 8. Inject route-specific Schema.org JSON-LD
    const formattedJsonLd = JSON.stringify(jsonLd, null, 2)
      .split("\n")
      .map((line, idx) => (idx === 0 ? line : `      ${line}`))
      .join("\n");

    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n      ${formattedJsonLd}\n    </script>`
    );

    // 9. Inject pre-rendered semantic React HTML into <div id="root">
    html = html.replace(
      /<div id="root"><\/div>/,
      () => `<div id="root">${cleanedAppHtml}</div>`
    );

    // 10. Write static output file
    if (route.path === "/") {
      fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8");
    } else if (route.path === "/404/") {
      fs.writeFileSync(path.join(distDir, "404.html"), html, "utf-8");
    } else {
      const slugDir = path.join(distDir, route.path.replace(/^\/+|\/+$/g, ""));
      fs.mkdirSync(slugDir, { recursive: true });
      fs.writeFileSync(path.join(slugDir, "index.html"), html, "utf-8");
    }
  }

  // Generate clean standard sitemaps.org 0.9 XML Sitemap
  const indexablePages = renderedPages.filter((p) => p.route.indexable);
  const urlEntriesXml = indexablePages
    .map(({ route }) => {
      const loc =
        route.path === "/" ? `${siteOrigin}/` : `${siteOrigin}${route.path}`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmodDate}</lastmod>
  </url>`;
    })
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntriesXml}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");

  // Generate crawl-friendly robots.txt pointing to active siteOrigin sitemap
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${siteOrigin}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf-8");

  // Remove temporary SSR bundle
  fs.rmSync(ssrTempDir, { recursive: true, force: true });

  console.log(
    `[prerender] Pre-rendered ${indexablePages.length} indexable static pages + 404.html and generated sitemap.xml (${siteOrigin})`
  );
}

run().catch((err) => {
  console.error("[prerender] Failed:", err);
  if (fs.existsSync(ssrTempDir)) {
    fs.rmSync(ssrTempDir, { recursive: true, force: true });
  }
  process.exit(1);
});
