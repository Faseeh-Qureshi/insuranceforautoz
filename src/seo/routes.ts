export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface SitemapImageEntry {
  locPath: string;
  title: string;
  caption: string;
}

export type RouteSlug =
  | "/"
  | "/auto-insurance-coverage/"
  | "/car-insurance-discounts/"
  | "/sr22-high-risk-auto-insurance/"
  | "/how-it-works/"
  | "/privacy-policy/"
  | "/terms-of-use/"
  | "/404/";

export interface SeoRouteMeta {
  path: RouteSlug;
  title: string;
  description: string;
  breadcrumbLabel: string;
  ogImagePath: string;
  ogImageAlt: string;
  indexable: boolean;
  sitemapImages?: readonly SitemapImageEntry[];
  faqs?: readonly FaqEntry[];
}

export const HOME_FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: "faq-1",
    question: "Is there any fee to call and check rates?",
    answer:
      "No. InsuranceforAutoz is free for drivers. Participating agencies quote policies at no charge, and you pay a premium only if you choose to buy coverage from a provider.",
  },
  {
    id: "faq-2",
    question: "Why call instead of filling out online quote forms?",
    answer:
      "Online forms often collect pages of personal data before showing rough estimates. A short call lets a licensed agent match exact coverage limits, deductibles, and eligible discounts right away.",
  },
  {
    id: "faq-3",
    question: "Will every carrier shown offer me a quote?",
    answer:
      "Not always. Carrier availability depends on your state, vehicle, driving record, and the insurers represented by participating agencies in your area.",
  },
  {
    id: "faq-4",
    question: "Do I have to wait until my policy expires to switch?",
    answer:
      "No. Reviewing quotes carries zero obligation, and if you choose a better policy mid-term, a licensed agent can align your new start date with your cancellation date so coverage never lapses.",
  },
  {
    id: "faq-5",
    question: "What details help speed up the call?",
    answer:
      "Having your five-digit ZIP code, vehicle year, make, and model, and your current or preferred coverage level is enough to begin.",
  },
] as const;

export const COVERAGE_FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: "cov-faq-1",
    question: "What is the difference between liability and full coverage?",
    answer:
      "Liability coverage pays for injuries and property damage you cause to others up to your policy limits. Full coverage typically pairs liability with collision and comprehensive protection for damage to your own vehicle.",
  },
  {
    id: "cov-faq-2",
    question: "Are state minimum auto insurance limits enough?",
    answer:
      "State minimums satisfy legal driving requirements, yet repair bills and medical claims often exceed minimum thresholds. Many drivers compare 50/100/50 or 100/300/100 liability limits to protect personal savings.",
  },
  {
    id: "cov-faq-3",
    question: "How does raising a collision deductible affect my premium?",
    answer:
      "Moving from a $500 deductible to a $1,000 deductible generally lowers your recurring premium because you agree to pay more out of pocket if you file a physical damage claim.",
  },
] as const;

export const DISCOUNTS_FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: "disc-faq-1",
    question: "Can multiple car insurance discounts be stacked together?",
    answer:
      "Yes, most insurers allow eligible drivers to combine policy-level credits like multi-car or bundling with driver-level credits like clean-record or paid-in-full discounts, subject to state filing caps.",
  },
  {
    id: "disc-faq-2",
    question: "Why did my renewal rate increase without any new tickets?",
    answer:
      "Carriers periodically revise statewide base rates to reflect local repair costs, parts inflation, and weather claims in your ZIP code. Comparing other carriers before renewal checks whether another insurer prices your profile lower.",
  },
  {
    id: "disc-faq-3",
    question: "Do I lose continuous coverage credits if I switch insurers?",
    answer:
      "No, provided there is no lapse between your prior policy and your new policy effective date. Insurers recognize uninterrupted prior coverage from another carrier when calculating tenure tiers.",
  },
] as const;

export const SR22_FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: "sr22-faq-1",
    question: "Is an SR-22 a separate type of car insurance policy?",
    answer:
      "An SR-22 is not a standalone insurance policy. It is a state certificate of financial responsibility that an insurer files electronically with your DMV to verify your auto policy meets state liability requirements.",
  },
  {
    id: "sr22-faq-2",
    question: "Can I get an SR-22 filing if I do not own a car?",
    answer:
      "Yes. In states that use SR-22 certificates, participating agencies can quote a non-owner auto liability policy with an attached SR-22 filing to help reinstate driving privileges.",
  },
  {
    id: "sr22-faq-3",
    question: "What happens if an SR-22 policy lapses?",
    answer:
      "If coverage cancels or lapses before your required filing period ends, the insurer must notify the state via an SR-26 notice, which can suspend your license and restart the filing clock.",
  },
] as const;

export const SEO_ROUTES: readonly SeoRouteMeta[] = [
  {
    path: "/",
    title: "Compare Auto Insurance Rates by Phone | InsuranceforAutoz",
    description:
      "Compare auto insurance quotes, coverage limits, and eligible discounts in one free call through licensed U.S. agencies. Call +1 (848) 467-1057 today.",
    breadcrumbLabel: "Home",
    ogImagePath: "/images/hero-suv-road.webp",
    ogImageAlt: "Modern dark-blue SUV driving on a sunlit American highway",
    indexable: true,
    sitemapImages: [
      {
        locPath: "/images/hero-suv-road.webp",
        title: "Compare U.S. Auto Insurance Rates by Phone",
        caption:
          "Compare auto insurance rates and coverage options in one phone call through participating state-licensed U.S. agencies.",
      },
      {
        locPath: "/images/driver-savings.webp",
        title: "Auto Insurance Renewal Rate Comparison and Discounts",
        caption:
          "Review multi-car, safe-driver, and policy bundling auto insurance discounts before your policy renews.",
      },
      {
        locPath: "/images/mountain-road-coverage.webp",
        title: "Liability, Collision, Comprehensive, and SR-22 Coverage",
        caption:
          "Auto insurance coverage options matched to daily commuters, financed vehicles, and state SR-22 filings.",
      },
      {
        locPath: "/images/scenic-road-cta.webp",
        title: "Free Phone Rate Check Before Policy Renewal",
        caption:
          "Speak with a state-licensed insurance agency to benchmark your current auto insurance policy with no obligation.",
      },
    ],
    faqs: HOME_FAQ_ITEMS,
  },
  {
    path: "/auto-insurance-coverage/",
    title: "Auto Insurance Coverage Options & Limits | InsuranceforAutoz",
    description:
      "Compare liability, collision, comprehensive, uninsured motorist, and full coverage auto insurance quotes by phone. Free rate check at +1 (848) 467-1057.",
    breadcrumbLabel: "Auto Insurance Coverage",
    ogImagePath: "/images/mountain-road-coverage.webp",
    ogImageAlt: "Scenic American mountain highway representing auto coverage protection",
    indexable: true,
    sitemapImages: [
      {
        locPath: "/images/mountain-road-coverage.webp",
        title: "Auto Insurance Coverage Types and Liability Limits Guide",
        caption:
          "Side-by-side breakdown of liability, collision, comprehensive, uninsured motorist, and medical auto insurance coverages.",
      },
    ],
    faqs: COVERAGE_FAQ_ITEMS,
  },
  {
    path: "/car-insurance-discounts/",
    title: "Car Insurance Discounts & Rate Check | InsuranceforAutoz",
    description:
      "Review eligible auto insurance discounts for safe drivers, multi-car households, bundling, and low mileage in one call. Call +1 (848) 467-1057 for quotes.",
    breadcrumbLabel: "Car Insurance Discounts",
    ogImagePath: "/images/driver-savings.webp",
    ogImageAlt: "Smiling driver checking auto insurance discounts and renewal savings",
    indexable: true,
    sitemapImages: [
      {
        locPath: "/images/driver-savings.webp",
        title: "Car Insurance Discounts and Renewal Savings Checklist",
        caption:
          "Common U.S. auto insurance discount categories including safe driving, multi-vehicle, bundling, and paid-in-full credits.",
      },
    ],
    faqs: DISCOUNTS_FAQ_ITEMS,
  },
  {
    path: "/sr22-high-risk-auto-insurance/",
    title: "SR-22 & High-Risk Auto Insurance Quotes | InsuranceforAutoz",
    description:
      "Need an SR-22, FR-44, or auto insurance quote after tickets, an accident, or a lapse? Speak with a licensed U.S. agency at +1 (848) 467-1057 with no fee.",
    breadcrumbLabel: "SR-22 & High-Risk Coverage",
    ogImagePath: "/images/hero-suv-road.webp",
    ogImageAlt: "SUV on an American highway representing SR-22 and high-risk auto insurance options",
    indexable: true,
    faqs: SR22_FAQ_ITEMS,
  },
  {
    path: "/how-it-works/",
    title: "How Our Auto Insurance Referral Works | InsuranceforAutoz",
    description:
      "Learn how InsuranceforAutoz connects U.S. drivers by phone with state-licensed insurance agencies to compare real quotes for free with zero obligation.",
    breadcrumbLabel: "How It Works",
    ogImagePath: "/images/scenic-road-cta.webp",
    ogImageAlt: "Open American highway illustrating the InsuranceforAutoz three-step phone quote referral process",
    indexable: true,
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy & Consumer Notice | InsuranceforAutoz",
    description:
      "Read the InsuranceforAutoz Privacy Policy covering phone inquiries, website analytics, consumer privacy rights, and mailing contact information.",
    breadcrumbLabel: "Privacy Policy",
    ogImagePath: "/images/hero-suv-road.webp",
    ogImageAlt: "InsuranceforAutoz Privacy Policy",
    indexable: true,
  },
  {
    path: "/terms-of-use/",
    title: "Terms of Use & Service Disclosures | InsuranceforAutoz",
    description:
      "Review the Terms of Use, independent referral disclosures, carrier trademark notices, and consumer terms for using InsuranceforAutoz by phone or web.",
    breadcrumbLabel: "Terms of Use",
    ogImagePath: "/images/hero-suv-road.webp",
    ogImageAlt: "InsuranceforAutoz Terms of Use",
    indexable: true,
  },
  {
    path: "/404/",
    title: "Page Not Found | InsuranceforAutoz",
    description:
      "The requested page could not be found. Return to InsuranceforAutoz to compare auto insurance quotes by phone.",
    breadcrumbLabel: "Page Not Found",
    ogImagePath: "/images/hero-suv-road.webp",
    ogImageAlt: "InsuranceforAutoz",
    indexable: false,
  },
] as const;

export function normalizeRoutePath(rawPathname: string): RouteSlug {
  const clean = (rawPathname || "/").split("?")[0].split("#")[0].trim();
  if (!clean || clean === "/" || clean === "/index.html") {
    return "/";
  }
  const withoutHtml = clean.replace(/\/index\.html$/i, "").replace(/\.html$/i, "");
  const normalized = `/${withoutHtml.replace(/^\/+|\/+$/g, "")}/`;
  const match = SEO_ROUTES.find(
    (route) => route.path !== "/404/" && route.path === normalized
  );
  return match ? match.path : "/404/";
}

export function getRouteMeta(pathname: string): SeoRouteMeta {
  const slug = normalizeRoutePath(pathname);
  return (
    SEO_ROUTES.find((route) => route.path === slug) ||
    SEO_ROUTES[SEO_ROUTES.length - 1]
  );
}

export interface JsonLdSiteParams {
  siteOrigin: string;
  schemaTel: string;
  fullPhoneDisplay: string;
  streetAddress: string;
  cityStateZip: string;
}

export function buildRouteJsonLd(
  route: SeoRouteMeta,
  params: JsonLdSiteParams
): Record<string, unknown> {
  const origin = params.siteOrigin.replace(/\/+$/, "");
  const pageUrl = route.path === "/" ? `${origin}/` : `${origin}${route.path}`;

  const cityMatch = params.cityStateZip.match(
    /^([^,]+),\s*([A-Z]{2})\s+(\d{5})/
  );
  const addressLocality = cityMatch ? cityMatch[1] : "St. Petersburg";
  const addressRegion = cityMatch ? cityMatch[2] : "FL";
  const postalCode = cityMatch ? cityMatch[3] : "33702";

  const descriptionWithDynamicPhone = route.description.replace(
    "+1 (848) 467-1057",
    params.fullPhoneDisplay
  );

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "InsuranceforAutoz",
      url: `${origin}/`,
      logo: `${origin}/favicon.svg`,
      telephone: params.schemaTel,
      description:
        "Independent U.S. auto insurance quote referral service connecting drivers by phone with participating state-licensed insurance agencies.",
      address: {
        "@type": "PostalAddress",
        streetAddress: params.streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: params.schemaTel,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "Service",
      "@id": `${origin}/#service`,
      name: "Auto Insurance Rate and Coverage Referral",
      serviceType: "Auto Insurance Quote Comparison Referral",
      provider: {
        "@id": `${origin}/#organization`,
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      description:
        "Phone-based auto insurance quote comparison connecting U.S. drivers with participating state-licensed agencies for liability, collision, comprehensive, and SR-22 policy options.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Free referral service for consumers with no obligation to purchase.",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: `${origin}/`,
      name: "InsuranceforAutoz",
      inLanguage: "en-US",
      publisher: {
        "@id": `${origin}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: route.title,
      description: descriptionWithDynamicPhone,
      inLanguage: "en-US",
      isPartOf: {
        "@id": `${origin}/#website`,
      },
      about: {
        "@id": `${origin}/#service`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${origin}${route.ogImagePath}`,
      },
    },
  ];

  if (route.path !== "/" && route.path !== "/404/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${origin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: route.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    });
  }

  if (route.faqs && route.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: route.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
