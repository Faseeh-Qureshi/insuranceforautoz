import { Phone } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

type CallButtonVariant =
  | "header"
  | "hero"
  | "darkSection"
  | "banner"
  | "footer"
  | "mobileBar";

interface CallNowButtonProps {
  variant?: CallButtonVariant;
  showNumber?: boolean;
  className?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const variantClasses: Record<CallButtonVariant, string> = {
  header:
    "bg-[#0A56C2] hover:bg-[#0D63DC] active:bg-[#0846A0] text-white text-[13px] min-[380px]:text-[13.5px] font-bold px-3 min-[380px]:px-4 sm:px-5 py-2 min-h-[40px] sm:min-h-[42px] rounded-full shadow-[0_2px_8px_rgba(10,86,194,0.24)]",
  hero:
    "bg-gradient-to-b from-[#1B74EC] to-[#0A56C2] hover:from-[#277FF3] hover:to-[#0849A8] text-white text-[15.5px] sm:text-[16.5px] font-extrabold px-6 sm:px-8 py-3.5 min-h-[50px] sm:min-h-[54px] rounded-full shadow-[0_10px_26px_-4px_rgba(10,86,194,0.5),inset_0_1px_0_rgba(255,255,255,0.26)] hover:-translate-y-[1px]",
  darkSection:
    "bg-gradient-to-b from-[#1B74EC] to-[#0A56C2] hover:from-[#277FF3] hover:to-[#0849A8] text-white text-[15px] sm:text-[15.5px] font-extrabold px-6 sm:px-7 py-3.5 min-h-[48px] sm:min-h-[50px] rounded-full shadow-[0_8px_22px_-4px_rgba(10,86,194,0.44),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-[1px]",
  banner:
    "bg-gradient-to-b from-[#1B74EC] to-[#0A56C2] hover:from-[#277FF3] hover:to-[#0849A8] text-white text-[15px] sm:text-[16px] font-extrabold px-6 sm:px-8 py-3.5 min-h-[48px] sm:min-h-[52px] rounded-full shadow-[0_10px_24px_-4px_rgba(10,86,194,0.46),inset_0_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-[1px]",
  footer:
    "bg-[#0A56C2] hover:bg-[#1666D8] active:bg-[#0846A0] text-white text-[14px] font-bold px-5 py-2.5 min-h-[44px] rounded-full shadow-[0_4px_14px_rgba(10,86,194,0.34)]",
  mobileBar:
    "bg-gradient-to-b from-[#1B74EC] to-[#0A56C2] active:from-[#0A56C2] active:to-[#0846A0] text-white text-[14px] font-extrabold px-5 py-2.5 min-h-[44px] rounded-full shadow-[0_4px_14px_rgba(10,86,194,0.38)]",
};

export function CallNowButton({
  variant = "hero",
  showNumber = true,
  className = "",
}: CallNowButtonProps) {
  const iconSize =
    variant === "header" || variant === "mobileBar" || variant === "footer"
      ? 14
      : 17;

  const handleTrackClick = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "call_cta_click", {
        cta_placement: variant,
        phone_destination: SITE_CONFIG.phone.e164,
      });
    }
  };

  return (
    <a
      href={SITE_CONFIG.phone.href}
      data-cta-placement={variant}
      onClick={handleTrackClick}
      aria-label={`Call InsuranceforAutoz at ${SITE_CONFIG.phone.fullDisplay}`}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 tabular-nums transition-all duration-150 active:translate-y-0 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${variantClasses[variant]} ${className}`}
    >
      <Phone
        size={iconSize}
        strokeWidth={2.3}
        aria-hidden="true"
        className="shrink-0 fill-white/95 transition-transform duration-150 group-hover:-rotate-6"
      />
      {variant === "header" ? (
        <>
          <span className="min-[360px]:hidden">Call</span>
          <span className="hidden min-[360px]:inline sm:hidden">Call Now</span>
          <span className="hidden sm:inline">
            Call {SITE_CONFIG.phone.shortDisplay}
          </span>
        </>
      ) : showNumber ? (
        <span>Call {SITE_CONFIG.phone.shortDisplay}</span>
      ) : (
        <span>Call Now</span>
      )}
    </a>
  );
}
