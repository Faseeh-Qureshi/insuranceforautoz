import { useEffect, useState } from "react";
import { MapPin, Phone, X } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { BrandMark } from "./BrandMark";
import { CallNowButton } from "./CallNowButton";

type NoticeType = "privacy" | "terms" | "contact" | null;

interface SiteFooterProps {
  onModalOpenChange?: (open: boolean) => void;
}

export function SiteFooter({ onModalOpenChange }: SiteFooterProps) {
  const [activeNotice, setActiveNotice] = useState<NoticeType>(null);

  const updateNotice = (next: NoticeType) => {
    setActiveNotice(next);
    onModalOpenChange?.(next !== null);
  };

  useEffect(() => {
    if (!activeNotice) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNotice(null);
        onModalOpenChange?.(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeNotice, onModalOpenChange]);

  const { privacyPolicyUrl, termsOfUseUrl } = SITE_CONFIG.legalLinks;
  const currentYear = new Date().getFullYear();

  const dialogTitle =
    activeNotice === "privacy"
      ? "Privacy Policy"
      : activeNotice === "terms"
        ? "Terms of Use"
        : "Contact Information";

  return (
    <footer className="w-full bg-[#05101F] text-white border-t border-white/10">
      {/* Tier 1: Corporate Identity, Direct Quote Line & Structured Directory */}
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

          {/* Column 3: Page Sections & Legal / Company Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.03em] text-[#93C5FD] mb-2">
                Sections
              </h2>
              <ul className="space-y-0.5 text-[13px] text-white/78">
                {SITE_CONFIG.navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-bold tracking-[0.03em] text-[#93C5FD] mb-2">
                Company
              </h2>
              <ul className="space-y-0.5 text-[13px] text-white/78">
                <li>
                  {privacyPolicyUrl ? (
                    <a
                      href={privacyPolicyUrl}
                      className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                    >
                      Privacy Policy
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => updateNotice("privacy")}
                      className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs cursor-pointer text-left"
                    >
                      Privacy Policy
                    </button>
                  )}
                </li>
                <li>
                  {termsOfUseUrl ? (
                    <a
                      href={termsOfUseUrl}
                      className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
                    >
                      Terms of Use
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => updateNotice("terms")}
                      className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs cursor-pointer text-left"
                    >
                      Terms of Use
                    </button>
                  )}
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => updateNotice("contact")}
                    className="inline-flex items-center min-h-[38px] hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs cursor-pointer text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
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
            {privacyPolicyUrl ? (
              <a
                href={privacyPolicyUrl}
                className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
              >
                Privacy
              </a>
            ) : (
              <button
                type="button"
                onClick={() => updateNotice("privacy")}
                className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
              >
                Privacy
              </button>
            )}
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            {termsOfUseUrl ? (
              <a
                href={termsOfUseUrl}
                className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
              >
                Terms
              </a>
            ) : (
              <button
                type="button"
                onClick={() => updateNotice("terms")}
                className="hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
              >
                Terms
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Landscape-safe, scrollable Company & Policy Dialog */}
      {activeNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030913]/80 backdrop-blur-[2px]"
          onClick={() => updateNotice(null)}
        >
          <div
            className="w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-xl bg-[#FAF6EE] text-[#0A1B33] p-5 sm:p-6 border border-[#CBBBA2] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#D8CBB7]">
              <h2
                id="footer-dialog-title"
                className="text-[17px] sm:text-[18px] font-extrabold text-[#0A1B33]"
              >
                {dialogTitle}
              </h2>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => updateNotice(null)}
                className="w-10 h-10 inline-flex items-center justify-center rounded-full text-[#34465D] hover:text-[#0A1B33] hover:bg-[#EAE1D2] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0A56C2]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[13.5px] text-[#34465D] leading-[1.58]">
              <p>{SITE_CONFIG.footerDisclosure}</p>
              <div className="rounded-lg bg-[#EFE8DC] border border-[#CBBBA2] p-3.5 text-[13px] text-[#0A1B33] space-y-1">
                <p className="font-extrabold text-[#0A1B33]">
                  {SITE_CONFIG.brandName}
                </p>
                <p>{SITE_CONFIG.address.line1}</p>
                <p>{SITE_CONFIG.address.line2}</p>
                <p className="pt-1 font-bold tabular-nums">
                  <a
                    href={SITE_CONFIG.phone.href}
                    className="text-[#0A56C2] hover:underline"
                  >
                    {SITE_CONFIG.phone.fullDisplay}
                  </a>
                </p>
              </div>
              {activeNotice !== "contact" && (
                <p className="text-[12.5px]">
                  For written policy documentation or service inquiries, mail
                  our St. Petersburg office above or call{" "}
                  <span className="tabular-nums font-semibold text-[#0A1B33]">
                    {SITE_CONFIG.phone.fullDisplay}
                  </span>
                  .
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <CallNowButton variant="mobileBar" showNumber={false} />
              <button
                type="button"
                onClick={() => updateNotice(null)}
                className="px-4 py-2.5 min-h-[44px] rounded-full border border-[#CBBBA2] bg-[#FAF6EE] text-[#0A1B33] text-[13px] font-bold hover:bg-[#EAE1D2] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
