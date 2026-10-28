import { useEffect, useRef } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { BrandMark } from "./BrandMark";
import { CallNowButton } from "./CallNowButton";

interface SiteHeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: (open: boolean) => void;
}

export function SiteHeader({
  mobileMenuOpen,
  onToggleMobileMenu,
}: SiteHeaderProps) {
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        onToggleMobileMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen, onToggleMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggleMobileMenu(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, onToggleMobileMenu]);

  return (
    <>
      <header
        id="top"
        className="sticky top-0 z-50 w-full border-b border-[#CFC2AC] pt-[env(safe-area-inset-top,0px)]"
      >
        {/* Separate background layer so backdrop-filter never creates a clipping containing block for fixed drawers */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#F4EFE4]/96 backdrop-blur-md"
        />

        <div className="max-w-[1240px] mx-auto pl-[max(0.875rem,env(safe-area-inset-left,0px))] pr-[max(0.875rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 h-[58px] sm:h-[66px] flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          <BrandMark
            theme="light"
            showSubtitle={false}
            onClick={() => onToggleMobileMenu(false)}
          />

          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-[#34465D]"
          >
            {SITE_CONFIG.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#0A1B33] underline-offset-8 hover:underline decoration-[#0A56C2] decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A56C2] rounded-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 min-[380px]:gap-2 shrink-0">
            <CallNowButton variant="header" />

            <button
              ref={toggleBtnRef}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => onToggleMobileMenu(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6B79E] bg-[#EAE1D2] text-[#0A1B33] hover:bg-[#DFD4C1] transition-colors duration-150 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2]"
            >
              {mobileMenuOpen ? (
                <X size={19} strokeWidth={2.3} aria-hidden="true" />
              ) : (
                <Menu size={19} strokeWidth={2.3} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            aria-hidden="true"
            onClick={() => onToggleMobileMenu(false)}
            className="fixed inset-0 bg-[#05101E]/65 backdrop-blur-[2px]"
          />

          <nav
            id="mobile-navigation-panel"
            aria-label="Mobile navigation"
            className="fixed inset-x-0 top-[calc(58px+env(safe-area-inset-top,0px))] sm:top-[calc(66px+env(safe-area-inset-top,0px))] max-h-[calc(100dvh-58px-env(safe-area-inset-top,0px))] sm:max-h-[calc(100dvh-66px-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain bg-[#F4EFE4] border-b border-[#CFC2AC] shadow-[0_20px_40px_rgba(5,16,30,0.28)] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-2.5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
          >
            <div className="max-w-[640px] mx-auto">
              <ul className="divide-y divide-[#DDD2C0]">
                {SITE_CONFIG.navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => onToggleMobileMenu(false)}
                      className="flex items-center justify-between py-3.5 min-h-[48px] text-[16px] font-bold text-[#0A1B33] hover:text-[#0A56C2] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2] rounded-xs"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="text-[13px] font-semibold text-[#4E6078]"
                      >
                        Go
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl bg-[#071629] text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold text-[#93C5FD]">
                    Free Auto Insurance Quote Line
                  </p>
                  <p className="text-[16px] font-extrabold tabular-nums mt-0.5 text-[#FAF6EE]">
                    {SITE_CONFIG.phone.fullDisplay}
                  </p>
                </div>
                <a
                  href={SITE_CONFIG.phone.href}
                  onClick={() => onToggleMobileMenu(false)}
                  className="inline-flex items-center justify-center gap-2 bg-[#0A56C2] hover:bg-[#1666D8] text-white text-[14.5px] font-extrabold px-5 py-3 min-h-[46px] rounded-full tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <Phone
                    size={16}
                    strokeWidth={2.3}
                    aria-hidden="true"
                    className="fill-white"
                  />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
