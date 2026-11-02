import { type ComponentType, useEffect, useState } from "react";
import { SITE_CONFIG } from "./config/site";
import { getClientRouteMeta, normalizeRoutePath } from "./seo/clientRoutes";
import type { RouteSlug } from "./seo/routes";
import { HomePage } from "./components/HomePage";
import { MobileCallBar } from "./components/MobileCallBar";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export interface GuideSwitchProps {
  routePath: string;
}

interface AppProps {
  initialPath?: string;
  initialGuideSwitch?: ComponentType<GuideSwitchProps> | null;
}

let cachedGuideSwitch: ComponentType<GuideSwitchProps> | null = null;
let pendingGuidePromise: Promise<ComponentType<GuideSwitchProps>> | null = null;

export function loadGuideSwitch(): Promise<ComponentType<GuideSwitchProps>> {
  if (cachedGuideSwitch) {
    return Promise.resolve(cachedGuideSwitch);
  }
  if (!pendingGuidePromise) {
    pendingGuidePromise = import("./pages/GuidePages").then((mod) => {
      cachedGuideSwitch = mod.GuideRouteSwitch;
      return mod.GuideRouteSwitch;
    });
  }
  return pendingGuidePromise;
}

export default function App({
  initialPath,
  initialGuideSwitch = null,
}: AppProps) {
  const [routePath, setRoutePath] = useState<RouteSlug>(() => {
    if (initialPath) {
      return normalizeRoutePath(initialPath);
    }
    if (typeof window !== "undefined") {
      return normalizeRoutePath(window.location.pathname);
    }
    return "/";
  });
  const [GuideSwitch, setGuideSwitch] = useState<ComponentType<GuideSwitchProps> | null>(
    () => initialGuideSwitch || cachedGuideSwitch
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync document head metadata on client route transitions
  useEffect(() => {
    const meta = getClientRouteMeta(routePath);
    const dynamicDescription = meta.description.replace(
      "+1 (848) 467-1057",
      SITE_CONFIG.phone.fullDisplay
    );
    const canonicalUrl =
      meta.path === "/"
        ? `${SITE_CONFIG.siteOrigin}/`
        : `${SITE_CONFIG.siteOrigin}${meta.path}`;

    if (document.title !== meta.title) {
      document.title = meta.title;
    }

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && descTag.getAttribute("content") !== dynamicDescription) {
      descTag.setAttribute("content", dynamicDescription);
    }

    const robotsValue = meta.indexable
      ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      : "noindex, follow";
    const robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag && robotsTag.getAttribute("content") !== robotsValue) {
      robotsTag.setAttribute("content", robotsValue);
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag && meta.indexable && canonicalTag.getAttribute("href") !== canonicalUrl) {
      canonicalTag.setAttribute("href", canonicalUrl);
    }
  }, [routePath]);

  // Intercept same-origin internal anchor clicks for instant transitions while keeping real <a href> HTML for crawlers
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      const targetId = hash.replace(/^#/, "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    };

    const navigateToSlug = (nextSlug: RouteSlug, hash: string, pushHistoryHref?: string) => {
      const applyTransition = () => {
        if (pushHistoryHref !== undefined) {
          window.history.pushState(null, "", pushHistoryHref);
          if (typeof window.gtag === "function") {
            window.gtag("event", "page_view", {
              page_path: nextSlug,
              page_location: `${window.location.origin}${pushHistoryHref}`,
            });
          }
        }
        setRoutePath(nextSlug);
        if (hash) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToHash(hash));
          });
        } else if (pushHistoryHref !== undefined) {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      };

      if (nextSlug !== "/" && !cachedGuideSwitch) {
        void loadGuideSwitch().then((Loaded) => {
          setGuideSwitch(() => Loaded);
          applyTransition();
        });
      } else {
        if (cachedGuideSwitch && !GuideSwitch) {
          setGuideSwitch(() => cachedGuideSwitch);
        }
        applyTransition();
      }
    };

    const handlePopState = () => {
      const next = normalizeRoutePath(window.location.pathname);
      setMobileMenuOpen(false);
      navigateToSlug(next, window.location.hash);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("mailto:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      // Bypass static XML/asset files so browser opens /sitemap.xml directly
      if (/\.(xml|txt|pdf|svg|webp|png|jpg)$/i.test(rawHref)) {
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(rawHref, window.location.origin);
      } catch {
        return;
      }

      if (parsed.origin !== window.location.origin) {
        return;
      }

      const nextSlug = normalizeRoutePath(parsed.pathname);
      const currentSlug = normalizeRoutePath(window.location.pathname);

      event.preventDefault();
      setMobileMenuOpen(false);

      if (nextSlug === currentSlug) {
        if (parsed.hash) {
          window.history.replaceState(null, "", `${nextSlug}${parsed.hash}`);
          scrollToHash(parsed.hash);
        } else {
          window.history.replaceState(null, "", nextSlug);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const nextHref = `${nextSlug === "/404/" ? parsed.pathname : nextSlug}${parsed.hash}`;
      navigateToSlug(nextSlug, parsed.hash, nextHref);
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [GuideSwitch]);

  const ActiveGuideSwitch = GuideSwitch || initialGuideSwitch || cachedGuideSwitch;

  return (
    <div className="min-h-[100svh] flex flex-col bg-[#F2EBDF] text-[#0A1B33]">
      <SiteHeader
        currentPath={routePath}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
      />

      <main className="flex-1">
        {routePath === "/" || !ActiveGuideSwitch ? (
          <HomePage />
        ) : (
          <ActiveGuideSwitch routePath={routePath} />
        )}
      </main>

      <SiteFooter />

      <MobileCallBar suppressed={mobileMenuOpen} />
    </div>
  );
}
