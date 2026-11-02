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

  // Capture Vite's compiled client entry module URL so pre-rendered pages can load React hydration off the critical LCP path
  let clientEntrySrc = "";
  const entryScriptMatch = baseTemplate.match(
    /<script\s+type="module"\s+crossorigin\s+src="(\/assets\/[^"]+\.js)"><\/script>/
  );
  if (entryScriptMatch) {
    clientEntrySrc = entryScriptMatch[1];
    baseTemplate = baseTemplate.replace(entryScriptMatch[0], "");
  }

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

    // 7. Extract React 19 SSR hoisted <link rel="preload" as="image" .../> from appHtml and place it at the very top of <head> right after viewport
    let cleanedAppHtml = appHtml;
    const hoistedPreloadMatch = cleanedAppHtml.match(
      /<link\s+rel="preload"\s+as="image"[^>]*\/>/
    );
    if (hoistedPreloadMatch) {
      cleanedAppHtml = cleanedAppHtml.replace(hoistedPreloadMatch[0], "");
      if (route.path === "/") {
        html = html.replace(
          /(<meta\s+name="viewport"[\s\S]*?\/>)/,
          `$1\n    ${hoistedPreloadMatch[0]}`
        );
      }
    }

    // 8. Move route-specific Schema.org JSON-LD out of <head> and inject at the end of <body> so above-the-fold HTML arrives in the earliest Slow 4G packets
    html = html.replace(
      /\s*(?:<!-- Schema\.org Structured Data -->\s*)?<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      ""
    );
    const compactJsonLd = JSON.stringify(jsonLd);

    // 9. Inject pre-rendered semantic React HTML into <div id="root">
    html = html.replace(
      /<div id="root"><\/div>/,
      () => `<div id="root">${cleanedAppHtml}</div>`
    );

    // 10. Append JSON-LD + non-blocking progressive hydration at end of <body>
    const jsonLdScript = `<script type="application/ld+json">${compactJsonLd}</script>`;
    if (clientEntrySrc) {
      const hydrationBootstrap = `<script>
(function(){
  var booted = false;
  var hydrated = false;
  var pendingButton = null;
  window.__markHydrated = function() {
    hydrated = true;
    if (pendingButton && document.contains(pendingButton)) {
      var btn = pendingButton;
      pendingButton = null;
      btn.click();
    }
  };
  function bootReact() {
    if (booted) return;
    booted = true;
    var s = document.createElement("script");
    s.type = "module";
    s.crossOrigin = "";
    s.src = ${JSON.stringify(clientEntrySrc)};
    document.head.appendChild(s);
  }
  ["pointerdown", "keydown", "touchstart", "focusin"].forEach(function(ev) {
    window.addEventListener(ev, bootReact, { once: true, passive: true });
  });
  window.addEventListener("scroll", bootReact, { once: true, passive: true });
  document.addEventListener("click", function(e) {
    if (hydrated) return;
    var t = e.target && e.target.closest ? e.target.closest("button") : null;
    if (t) {
      pendingButton = t;
      bootReact();
    }
  }, true);
})();
</script>`;
      html = html.replace(
        "</body>",
        `    ${jsonLdScript}\n    ${hydrationBootstrap}\n  </body>`
      );
    } else {
      html = html.replace("</body>", `    ${jsonLdScript}\n  </body>`);
    }

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
