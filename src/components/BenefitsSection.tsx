import { BadgePercent, CalendarCheck2, Scale, SlidersHorizontal } from "lucide-react";
import { BenefitCard } from "./BenefitCard";

const BENEFITS = [
  {
    title: "One Call, Multiple Quotes",
    description:
      "Benchmark rates across participating state-licensed agencies without filling out separate forms.",
    icon: <Scale size={19} strokeWidth={2} />,
  },
  {
    title: "Unclaimed Policy Discounts",
    description:
      "Check multi-car, safe-driver, homeowner, low-mileage, paperless, and paid-in-full savings.",
    icon: <BadgePercent size={19} strokeWidth={2} />,
  },
  {
    title: "Matched Limits & Deductibles",
    description:
      "Compare identical bodily injury limits and collision deductibles so price differences are real.",
    icon: <SlidersHorizontal size={19} strokeWidth={2} />,
  },
  {
    title: "No Gap When Switching",
    description:
      "Changing insurers mid-policy? Agents align start and cancel dates so coverage stays continuous.",
    icon: <CalendarCheck2 size={19} strokeWidth={2} />,
  },
] as const;

export function BenefitsSection() {
  return (
    <section
      id="why-compare"
      aria-labelledby="why-compare-heading"
      className="w-full bg-[#F2EBDF] py-10 sm:py-14 lg:py-18"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-11 items-start">
          {/* Left Concise Intro + Lifestyle Photography */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
              Why Rates Differ
            </p>
            <h2
              id="why-compare-heading"
              className="text-[24px] sm:text-[29px] lg:text-[32px] font-extrabold text-[#0A1B33] leading-[1.14] tracking-[-0.025em] text-balance"
            >
              Same Driver. Very Different Renewal Rates.
            </h2>
            <p className="mt-2.5 text-[14.5px] sm:text-[15.5px] text-[#34465D] leading-[1.56]">
              Carriers weigh ZIP codes, repair costs, mileage, and driving
              history differently. A brief call shows how your current policy
              compares.
            </p>

            <figure className="mt-5 rounded-xl overflow-hidden border border-[#CBBBA2] bg-[#FAF6EE] shadow-[0_6px_20px_rgba(10,27,51,0.05)]">
              <div className="aspect-[16/9] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="/images/driver-savings.webp"
                  alt="Smiling driver wearing sunglasses seated inside her car along a sunlit coastal highway"
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[76%_35%]"
                />
              </div>
              <figcaption className="px-4 py-3 text-[12px] sm:text-[12.5px] text-[#34465D] bg-[#FAF6EE] border-t border-[#DFD4C2] leading-[1.48]">
                <span className="font-bold text-[#0A1B33]">
                  When it pays to check:{" "}
                </span>
                Before a 6-month renewal &middot; After a rate hike &middot; New
                address or vehicle
              </figcaption>
            </figure>
          </div>

          {/* Right 2x2 Warm Ivory Value Matrix */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#CBBBA2] p-[1px] shadow-[0_6px_22px_rgba(10,27,51,0.04)] overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[#CBBBA2] rounded-[11px] overflow-hidden">
                {BENEFITS.map((item) => (
                  <BenefitCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>

            <p className="mt-3 text-[12px] text-[#4E6078] leading-[1.5]">
              Discounts and policy rates depend on state filings, insurer
              underwriting rules, and verified driving history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
