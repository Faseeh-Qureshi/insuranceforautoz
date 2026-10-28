import { useId } from "react";
import { SITE_CONFIG } from "../config/site";

interface BrandMarkProps {
  theme?: "light" | "dark";
  showSubtitle?: boolean;
  onClick?: () => void;
}

export function BrandMark({
  theme = "light",
  showSubtitle = false,
  onClick,
}: BrandMarkProps) {
  const uid = useId();
  const roofGradId = `car-roof-${uid}`;
  const beltGradId = `car-belt-${uid}`;
  const baseGradId = `car-base-${uid}`;
  const isDark = theme === "dark";

  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={SITE_CONFIG.brandName}
      className="group inline-flex items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B63DC] rounded-xs"
    >
      {/* Clean automotive coupe profile */}
      <svg
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-[34px] h-[14px] min-[380px]:w-[44px] min-[380px]:h-[18px] sm:w-[54px] sm:h-[22px] shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5"
      >
        <defs>
          <linearGradient
            id={roofGradId}
            x1="4"
            y1="16"
            x2="73"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#FAF8F4" : "#0A1B33"} />
            <stop offset="50%" stopColor={isDark ? "#FAF8F4" : "#0E294D"} />
            <stop offset="100%" stopColor={isDark ? "#60A5FA" : "#0B63DC"} />
          </linearGradient>
          <linearGradient
            id={beltGradId}
            x1="31"
            y1="15"
            x2="73"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#BAE6FD" : "#123A6D"} />
            <stop offset="100%" stopColor={isDark ? "#60A5FA" : "#1A73E8"} />
          </linearGradient>
          <linearGradient
            id={baseGradId}
            x1="14"
            y1="27"
            x2="73"
            y2="27"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={isDark ? "#93C5FD" : "#0E4CA4"} />
            <stop offset="100%" stopColor={isDark ? "#60A5FA" : "#1A73E8"} />
          </linearGradient>
        </defs>

        <path
          d="M10.8 27.5H4.2C4.7 19.6 12.2 15.6 24.4 14.8C30.8 9.2 38.6 5.8 47.8 5.8C57.2 5.8 65.4 9.1 72.5 13.8"
          stroke={`url(#${roofGradId})`}
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2 14.8H29"
          stroke={isDark ? "#FAF8F4" : "#0B2548"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M33.2 15.8C46.5 15.8 60.2 15.1 72.5 13.8"
          stroke={`url(#${beltGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M15.2 27.5A6.2 6.2 0 0 1 27.6 27.5"
          stroke={`url(#${baseGradId})`}
          strokeWidth="2.9"
          strokeLinecap="round"
        />
        <path
          d="M31.2 27.5H50.8"
          stroke={`url(#${baseGradId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M54.4 27.5A6.2 6.2 0 0 1 66.8 27.5H72.2"
          stroke={`url(#${baseGradId})`}
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none min-w-0">
        <span className="font-[family-name:var(--font-display)] text-[15.5px] min-[380px]:text-[17.5px] sm:text-[20.5px] font-extrabold tracking-[-0.03em] whitespace-nowrap truncate">
          <span className={isDark ? "text-[#FAF6EE]" : "text-[#0A1B33]"}>
            {SITE_CONFIG.brandPrefix}
          </span>
          <span className={isDark ? "text-[#60A5FA]" : "text-[#0A56C2]"}>
            {SITE_CONFIG.brandHighlight}
          </span>
        </span>
        {showSubtitle && (
          <span
            className={`mt-1.5 text-[11px] font-medium tracking-[0.01em] truncate ${
              isDark ? "text-white/62" : "text-[#4E6078]"
            }`}
          >
            {SITE_CONFIG.brandSubtitle}
          </span>
        )}
      </div>
    </a>
  );
}
