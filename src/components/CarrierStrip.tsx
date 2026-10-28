import {
  AaaLogo,
  AllstateLogo,
  FarmersLogo,
  GeicoLogo,
  HartfordLogo,
  ProgressiveLogo,
  StateFarmLogo,
  UsaaLogo,
} from "./CarrierLogos";

const CARRIERS = [
  { key: "allstate", Component: AllstateLogo },
  { key: "geico", Component: GeicoLogo },
  { key: "progressive", Component: ProgressiveLogo },
  { key: "statefarm", Component: StateFarmLogo },
  { key: "hartford", Component: HartfordLogo },
  { key: "usaa", Component: UsaaLogo },
  { key: "aaa", Component: AaaLogo },
  { key: "farmers", Component: FarmersLogo },
] as const;

export function CarrierStrip() {
  return (
    <section
      aria-labelledby="carriers-heading"
      className="w-full bg-[#E6DCCA] border-b border-[#CBBBA2]"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3.5 sm:mb-4.5">
          <h2
            id="carriers-heading"
            className="text-[16px] sm:text-[18px] font-extrabold text-[#0A1B33] tracking-[-0.02em]"
          >
            Compare Quotes Across Major U.S. Carriers
          </h2>
          <p className="text-[12.5px] sm:text-[13px] text-[#34465D] font-medium">
            Checked through participating state-licensed agencies
          </p>
        </div>

        {/* Compact, high-contrast 2x4 mobile / 4x2 desktop ledger on warm travertine */}
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#C8B89E] gap-[1px] border border-[#C8B89E] overflow-hidden shadow-[0_2px_10px_rgba(10,27,51,0.04)]">
          {CARRIERS.map(({ key, Component }) => (
            <div
              key={key}
              className="h-[52px] sm:h-[64px] px-3 sm:px-5 flex items-center justify-center bg-[#FAF6EE] hover:bg-[#FDFBF7] transition-colors duration-150 min-w-0"
            >
              <Component />
            </div>
          ))}
        </div>

        <p className="mt-2.5 text-[11.5px] sm:text-[12px] text-[#4E6078]">
          Carrier participation and policy availability vary by state, vehicle,
          and underwriting eligibility.
        </p>
      </div>
    </section>
  );
}
