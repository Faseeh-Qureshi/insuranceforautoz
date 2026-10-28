/**
 * Central site configuration for InsuranceforAutoz.com.
 * Reads build-time VITE_* variables from .env / .env.production or Cloudflare Pages.
 */

function cleanEnvValue(value: string | undefined, fallback: string): string {
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed.startsWith("MY_")) {
    return fallback;
  }
  return trimmed;
}

function normalizeUsE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  return raw.startsWith("+") ? `+${digits}` : raw;
}

function formatUsPhone(e164: string): { short: string; full: string } {
  const digits = e164.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    const area = digits.slice(1, 4);
    const prefix = digits.slice(4, 7);
    const line = digits.slice(7, 11);
    return {
      short: `(${area}) ${prefix}-${line}`,
      full: `+1 (${area}) ${prefix}-${line}`,
    };
  }
  return { short: e164, full: e164 };
}

function cleanOptionalPolicyUrl(value: string | undefined): string {
  const trimmed = (value || "").trim();
  if (
    !trimmed ||
    trimmed.startsWith("MY_") ||
    trimmed.includes("vite-co.com") ||
    trimmed.includes("github.com/vitejs/vite")
  ) {
    return "";
  }
  return trimmed;
}

const rawSiteUrl = cleanEnvValue(
  import.meta.env.VITE_SITE_URL,
  "https://insuranceforautoz.com"
).replace(/\/+$/, "");

export const CALL_PHONE_E164 = normalizeUsE164(
  cleanEnvValue(import.meta.env.VITE_CALL_PHONE_E164, "+18484671057")
);

const formattedPhone = formatUsPhone(CALL_PHONE_E164);

const addressLine1 = cleanEnvValue(
  import.meta.env.VITE_COMPANY_ADDRESS_LINE1,
  "7901 4th St N STE 300"
);

const addressLine2 = cleanEnvValue(
  import.meta.env.VITE_COMPANY_ADDRESS_LINE2,
  "St. Petersburg, FL 33702"
);

export const CALL_PHONE_HREF = `tel:${CALL_PHONE_E164}`;

export const SITE_CONFIG = {
  brandPrefix: "Insurancefor",
  brandHighlight: "Autoz",
  brandName: "InsuranceforAutoz",
  brandSubtitle: "Auto Insurance Quote Referral Service",
  heroEyebrow: "Free Auto Insurance Quote Service · Nationwide U.S.",
  siteOrigin: rawSiteUrl,
  domain: `${rawSiteUrl}/`,
  phone: {
    e164: CALL_PHONE_E164,
    href: CALL_PHONE_HREF,
    shortDisplay: formattedPhone.short,
    fullDisplay: formattedPhone.full,
  },
  address: {
    line1: addressLine1,
    line2: addressLine2,
    full: `${addressLine1}, ${addressLine2}`,
  },
  navItems: [
    { label: "Why Compare", href: "#why-compare" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Coverage", href: "#coverage" },
    { label: "FAQs", href: "#faq" },
  ],
  legalLinks: {
    privacyPolicyUrl: cleanOptionalPolicyUrl(
      import.meta.env.VITE_PRIVACY_POLICY_URL
    ),
    termsOfUseUrl: cleanOptionalPolicyUrl(
      import.meta.env.VITE_TERMS_OF_USE_URL
    ),
  },
  footerDisclosure:
    "InsuranceforAutoz is an independent marketing and referral service, not an insurance company, agency, or broker. We do not underwrite policies, bind coverage, or issue quotes directly. Calling connects you with participating third-party insurance agencies licensed in your state. Rates, discounts, coverage terms, and carrier availability vary by state, vehicle, driving record, and insurer underwriting rules.",
} as const;
