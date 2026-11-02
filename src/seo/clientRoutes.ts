import type { FaqEntry, RouteSlug } from "./routes";

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

export interface ClientRouteMeta {
  path: RouteSlug;
  title: string;
  description: string;
  indexable: boolean;
}

export const CLIENT_ROUTES: readonly ClientRouteMeta[] = [
  {
    path: "/",
    title: "Compare Auto Insurance Rates by Phone | InsuranceforAutoz",
    description:
      "Compare auto insurance quotes, coverage limits, and eligible discounts in one free call through licensed U.S. agencies. Call +1 (848) 467-1057 today.",
    indexable: true,
  },
  {
    path: "/auto-insurance-coverage/",
    title: "Auto Insurance Coverage Options & Limits | InsuranceforAutoz",
    description:
      "Compare liability, collision, comprehensive, uninsured motorist, and full coverage auto insurance quotes by phone. Free rate check at +1 (848) 467-1057.",
    indexable: true,
  },
  {
    path: "/car-insurance-discounts/",
    title: "Car Insurance Discounts & Rate Check | InsuranceforAutoz",
    description:
      "Review eligible auto insurance discounts for safe drivers, multi-car households, bundling, and low mileage in one call. Call +1 (848) 467-1057 for quotes.",
    indexable: true,
  },
  {
    path: "/sr22-high-risk-auto-insurance/",
    title: "SR-22 & High-Risk Auto Insurance Quotes | InsuranceforAutoz",
    description:
      "Need an SR-22, FR-44, or auto insurance quote after tickets, an accident, or a lapse? Speak with a licensed U.S. agency at +1 (848) 467-1057 with no fee.",
    indexable: true,
  },
  {
    path: "/how-it-works/",
    title: "How Our Auto Insurance Referral Works | InsuranceforAutoz",
    description:
      "Learn how InsuranceforAutoz connects U.S. drivers by phone with state-licensed insurance agencies to compare real quotes for free with zero obligation.",
    indexable: true,
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy & Consumer Notice | InsuranceforAutoz",
    description:
      "Read the InsuranceforAutoz Privacy Policy covering phone inquiries, website analytics, consumer privacy rights, and mailing contact information.",
    indexable: true,
  },
  {
    path: "/terms-of-use/",
    title: "Terms of Use & Service Disclosures | InsuranceforAutoz",
    description:
      "Review the Terms of Use, independent referral disclosures, carrier trademark notices, and consumer terms for using InsuranceforAutoz by phone or web.",
    indexable: true,
  },
  {
    path: "/404/",
    title: "Page Not Found | InsuranceforAutoz",
    description:
      "The requested page could not be found. Return to InsuranceforAutoz to compare auto insurance quotes by phone.",
    indexable: false,
  },
] as const;

export function normalizeRoutePath(rawPathname: string): RouteSlug {
  const clean = (rawPathname || "/").split("?")[0].split("#")[0].trim();
  if (!clean || clean === "/" || clean === "/index.html") {
    return "/";
  }
  const withoutHtml = clean
    .replace(/\/index\.html$/i, "")
    .replace(/\.html$/i, "");
  const normalized = `/${withoutHtml.replace(/^\/+|\/+$/g, "")}/`;
  const match = CLIENT_ROUTES.find(
    (route) => route.path !== "/404/" && route.path === normalized
  );
  return match ? match.path : "/404/";
}

export function getClientRouteMeta(pathname: string): ClientRouteMeta {
  const slug = normalizeRoutePath(pathname);
  return (
    CLIENT_ROUTES.find((route) => route.path === slug) ||
    CLIENT_ROUTES[CLIENT_ROUTES.length - 1]
  );
}
