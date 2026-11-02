import { MapPin, Phone } from "./Icons";
import { SITE_CONFIG } from "../config/site";
import { BrandMark } from "./BrandMark";
import { CallNowButton } from "./CallNowButton";

const GUIDE_LINKS = [
  { label: "Auto Coverage", href: "/auto-insurance-coverage/" },
  { label: "Policy Discounts", href: "/car-insurance-discounts/" },
  { label: "SR-22 & High-Risk", href: "/sr22-high-risk-auto-insurance/" },
  { label: "How It Works", href: "/how-it-works/" },
] as const;

export function SiteFooter() {
  const { privacyPolicyUrl, termsOfUseUrl } = SITE_CONFIG.legalLinks;
  const currentYear = 2026;

  return (
    <footer className="cv-auto w-full bg-[#05101F] text-white border-t border-white/10">
      {/* Tier 1: Corporate Identity, Direct Quote Line & Crawlable Site Directory */}
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-10 sm:py-13">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Brand Identity, Concise Description & Call CTA */}
          <div className="md:col-span-5">
            <BrandMark theme="dark" showSubtitle={true} />
            <p className="mt-3.5 text-[13.5px] text-white/75 leading-[1.6] max-w-[365px]">
              Independent U.S. auto insurance quote referral service connecting
              drivers by phone with participating state-licensed agencies.
            </p>
            <div className="mt-4.5 flex flex-wrap items-center gap-3">
              <CallNowButton variant="footer" />
              <span className="text-[12px] text-white/62">
                Free service &middot; Nationwide routing
              </span>
            </div>
          </div>

          {/* Column 2: Direct Telephone & Mailing Address */}
          <div className="md:col-span-4 space-y-3.5">
            <h2 className="text-[12px] font-bold tracking-[0.03em] text-[#93C5FD]">
              Phone &amp; Mailing Address
            </h2>

            <div className="flex items-start gap-2.5">
              <Phone
                size={15}
                strokeWidth={2.2}
                aria-hidden="true"
                className="text-[#60A5FA] mt-1 shrink-0"
              />
              <div>
                <a
                  href={SITE_CONFIG.phone.href}
                  className="inline-flex items-center min-h-[28px] text-[15px] font-extrabold text-[#FAF6EE] hover:text-[#93C5FD] transition-colors duration-150 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                >
                  {SITE_CONFIG.phone.fullDisplay}
                </a>
                <p className="text-[12px] text-white/60 mt-0.5">
                  Consumer quote &amp; referral line
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-[13.5px] text-white/80">
              <MapPin
                size={15}
                strokeWidth={2.1}
                aria-hidden="true"
                className="text-[#60A5FA] mt-1 shrink-0"
              />
              <address className="not-italic leading-[1.55]">
                <span className="block text-[#FAF6EE] font-medium">
                  {SITE_CONFIG.address.line1}
                </span>
                <span className="block text-white/68">
                  {SITE_CONFIG.address.line2}
                </span>
              </address>
            </div>
          </div>

          {/* Column 3: Crawlable Guides & Legal Directory */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <nav aria-label="Auto insurance guides">
              <h2 className="text-[12px] font-bold tracking-[0.03em] text-[#93C5FD] mb-2">
                Guides
              </h2>
              <ul className="space-y-0.5 text-[13px] text-white/78">
                {GUIDE_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex items-center min-h-[36px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company and legal">
              <h2 className="text-[12px] font-bold tracking-[0.03em] text-[#93C5FD] mb-2">
                Company
              </h2>
              <ul className="space-y-0.5 text-[13px] text-white/78">
                <li>
                  <a
                    href="/"
                    className="inline-flex items-center min-h-[36px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    className="inline-flex items-center min-h-[36px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href={privacyPolicyUrl}
                    className="inline-flex items-center min-h-[36px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href={termsOfUseUrl}
                    className="inline-flex items-center min-h-[36px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Tier 2: Dedicated Regulatory & Referral Disclosure Band */}
      <div className="border-t border-white/10 bg-[#040C18]">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-4.5 sm:py-5">
          <p className="text-[11px] font-semibold tracking-[0.03em] text-white/50 mb-1">
            Regulatory &amp; Service Disclosure
          </p>
          <p className="text-[12px] text-white/60 leading-[1.62] max-w-[1040px]">
            {SITE_CONFIG.footerDisclosure}
          </p>
        </div>
      </div>

      {/* Tier 3: Dedicated Ownership & Copyright Sub-Footer */}
      <div className="border-t border-white/10 bg-[#030913] pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px]">
          <p className="font-medium text-white/75 tracking-[0.01em] tabular-nums">
            &copy; {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60">
            <span>St. Petersburg, FL</span>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <a
              href={privacyPolicyUrl}
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
            >
              Privacy
            </a>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <a
              href={termsOfUseUrl}
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
            >
              Terms
            </a>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <a
              href="/sitemap.xml"
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
