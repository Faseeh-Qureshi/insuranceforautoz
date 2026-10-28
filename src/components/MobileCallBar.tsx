import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config/site";
import { CallNowButton } from "./CallNowButton";

interface MobileCallBarProps {
  suppressed?: boolean;
}

export function MobileCallBar({ suppressed = false }: MobileCallBarProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 360);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = scrolledPastHero && !suppressed;

  return (
    <div
      role="region"
      aria-label="Quick phone call bar"
      className={`md:hidden [@media(max-height:500px)]:hidden fixed bottom-0 inset-x-0 z-30 bg-[#05101F]/96 backdrop-blur-md border-t border-white/15 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(5,16,31,0.34)] transition-[transform,opacity] duration-200 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0">
          <p className="text-[13px] font-extrabold text-[#FAF8F4] truncate tabular-nums">
            {SITE_CONFIG.phone.shortDisplay}
          </p>
          <p className="text-[11px] text-white/75 truncate">
            Free quote check &middot; No obligation
          </p>
        </div>
        <CallNowButton variant="mobileBar" showNumber={false} />
      </div>
    </div>
  );
}
