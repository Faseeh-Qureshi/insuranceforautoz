import { Check } from "./Icons";
import { SITE_CONFIG } from "../config/site";
import { CallNowButton } from "./CallNowButton";

const TRUST_POINTS = ["Free service", "No web forms", "No obligation"] as const;

const HERO_SRCSET =
  "/images/hero-suv-road-480.webp 480w, /images/hero-suv-road-640.webp 640w, /images/hero-suv-road-960.webp 960w, /images/hero-suv-road.webp 1376w";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full bg-[#071526] text-white overflow-hidden"
    >
      {/* Subtle ambient depth on mobile */}
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(27,116,236,0.20),transparent_54%)]"
      />

      {/* Main Hero Copy & Primary Conversion CTA */}
      <div className="relative z-10 max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 pt-5.5 pb-4 md:pt-14 md:pb-12 lg:pt-[68px] lg:pb-14">
        <div className="max-w-[520px] md:w-[54%] lg:w-[48%]">
          <p className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.02em] text-[#93C5FD] mb-2">
            {SITE_CONFIG.heroEyebrow}
          </p>

          <h1
            id="hero-heading"
            className="text-[clamp(1.75rem,6.5vw,2.95rem)] font-extrabold text-[#FAF6EE] leading-[1.08] tracking-[-0.03em] text-balance"
          >
            Compare Auto Insurance Rates in One Call.
          </h1>

          <p className="mt-3 sm:mt-3.5 text-[14.5px] sm:text-[16px] leading-[1.56] text-white/86 max-w-[465px]">
            Insurers price the same driver and vehicle differently. Speak with a
            state-licensed participating agency to compare live quotes and
            eligible discounts.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-col items-stretch sm:items-start gap-3">
            <CallNowButton variant="hero" className="w-full sm:w-auto" />

            <ul className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] font-medium text-white/85">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Check
                    size={14}
                    strokeWidth={2.7}
                    aria-hidden="true"
                    className="text-[#60A5FA] shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Single Responsive Highway Visual: flows below copy on mobile (<768px) and spans full backdrop on desktop (>=768px) */}
      <div className="relative w-full h-[170px] min-[390px]:h-[190px] sm:h-[224px] md:absolute md:inset-0 md:h-full overflow-hidden">
        <img
          src="/images/hero-suv-road.webp"
          srcSet={HERO_SRCSET}
          sizes="100vw"
          alt="Modern dark-blue SUV driving on a sunlit American highway"
          width={1376}
          height={768}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[76%_54%] md:object-[76%_52%]"
        />
        {/* Desktop lateral & bottom contrast gradients */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,38,0.97)_0%,rgba(8,24,45,0.92)_38%,rgba(9,27,51,0.48)_58%,rgba(9,27,51,0.08)_82%)]"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071526] via-[#071526]/55 to-transparent"
        />
        {/* Mobile top & bottom blend gradients */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-x-0 top-0 h-11 bg-gradient-to-b from-[#071526] to-transparent"
        />
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-x-0 bottom-0 h-13 bg-gradient-to-t from-[#071526] via-[#071526]/70 to-transparent"
        />
      </div>

      {/* Compact Call-Prep Strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#05101E]/94">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[12px] sm:text-[13px]">
          <span className="font-semibold text-[#93C5FD]">
            Have ready on the call:
          </span>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-white/82 font-medium">
            <span>ZIP code</span>
            <span aria-hidden="true" className="text-white/30">
              &middot;
            </span>
            <span>Vehicle year &amp; model</span>
            <span aria-hidden="true" className="text-white/30">
              &middot;
            </span>
            <span>Current or desired coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
