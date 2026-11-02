import { useEffect, useState } from "react";
import { SITE_CONFIG } from "./config/site";
import { getRouteMeta, normalizeRoutePath, type RouteSlug } from "./seo/routes";
import { SiteHeader } from "./components/SiteHeader";
import { HeroSection } from "./components/HeroSection";
import { CarrierStrip } from "./components/CarrierStrip";
import { BenefitsSection } from "./components/BenefitsSection";
import { HowItWorks } from "./components/HowItWorks";
import { CoverageCard } from "./components/CoverageCard";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { SiteFooter } from "./components/SiteFooter";
import { MobileCallBar } from "./components/MobileCallBar";
import {
  CoverageGuidePage,
  DiscountsGuidePage,
  HowItWorksPage,
  NotFoundPage,
  PrivacyPolicyPage,
  Sr22GuidePage,
  TermsOfUsePage,
} from "./pages/GuidePages";

interface AppProps {
  initialPath?: string;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <CarrierStrip />
      <BenefitsSection />
      <HowItWorks />

      <section
        id="coverage"
        aria-label="Coverage scope and frequently asked questions"
        className="w-full bg-[#E6DCCA] border-t border-[#CBBBA2] py-10 sm:py-14 lg:py-18"
      >
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-stretch">
            <div className="lg:col-span-6">
              <CoverageCard />
            </div>
            <div id="faq" className="lg:col-span-6">
              <FAQ />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

export default function App({ initialPath }: AppProps) {
  const [routePath, setRoutePath] = useState<RouteSlug>(() => {
    if (initialPath) {
      return normalizeRoutePath(initialPath);
    }
    if (typeof window !== "undefined") {
      return normalizeRoutePath(window.location.pathname);
    }
    return "/";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync document head metadata and GA4 virtual page views on client transitions
  useEffect(() => {
    const meta = getRouteMeta(routePath);
    const dynamicDescription = meta.description.replace(
      "+1 (848) 467-1057",
      SITE_CONFIG.phone.fullDisplay
    );
    const canonicalUrl =
      meta.path === "/"
        ? `${SITE_CONFIG.siteOrigin}/`
        : `${SITE_CONFIG.siteOrigin}${meta.path}`;

    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute("content", dynamicDescription);
    }

    const robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag) {
      robotsTag.setAttribute(
        "content",
        meta.indexable
          ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          : "noindex, follow"
      );
    }

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag && meta.indexable) {
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

    const handlePopState = () => {
      const next = normalizeRoutePath(window.location.pathname);
      setRoutePath(next);
      setMobileMenuOpen(false);
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
      window.history.pushState(null, "", nextHref);
      setRoutePath(nextSlug);

      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: nextSlug,
          page_location: `${window.location.origin}${nextHref}`,
        });
      }

      if (parsed.hash) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToHash(parsed.hash));
        });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  let pageContent: React.ReactNode;
  switch (routePath) {
    case "/":
      pageContent = <HomePage />;
      break;
    case "/auto-insurance-coverage/":
      pageContent = <CoverageGuidePage />;
      break;
    case "/car-insurance-discounts/":
      pageContent = <DiscountsGuidePage />;
      break;
    case "/sr22-high-risk-auto-insurance/":
      pageContent = <Sr22GuidePage />;
      break;
    case "/how-it-works/":
      pageContent = <HowItWorksPage />;
      break;
    case "/privacy-policy/":
      pageContent = <PrivacyPolicyPage />;
      break;
    case "/terms-of-use/":
      pageContent = <TermsOfUsePage />;
      break;
    default:
      pageContent = <NotFoundPage />;
      break;
  }

  return (
    <div className="min-h-[100svh] flex flex-col bg-[#F2EBDF] text-[#0A1B33]">
      <SiteHeader
        currentPath={routePath}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
      />

      <main className="flex-1">{pageContent}</main>

      <SiteFooter />

      <MobileCallBar suppressed={mobileMenuOpen} />
    </div>
  );
}
