import { AlertCircle, CarFront, FileText, Shield } from "lucide-react";

const COVERAGE_ITEMS = [
  {
    title: "State Liability & Minimums",
    detail: "Bodily injury and property damage limits required in your state.",
    Icon: CarFront,
  },
  {
    title: "Collision & Comprehensive",
    detail: "Protection for financed, leased, or daily commuter vehicles.",
    Icon: Shield,
  },
  {
    title: "Tickets, Accidents & Lapses",
    detail: "Quote options after violations or a gap in prior coverage.",
    Icon: AlertCircle,
  },
  {
    title: "SR-22 State Filings",
    detail: "Certificate filings where available by state and carrier.",
    Icon: FileText,
  },
] as const;

export function CoverageCard() {
  return (
    <div className="relative h-full rounded-xl overflow-hidden bg-[#071629] border border-[#122744] flex flex-col justify-between shadow-[0_8px_24px_rgba(10,27,51,0.09)]">
      <div className="relative p-6 sm:p-8 pb-6 overflow-hidden">
        <img
          src="/images/mountain-road-coverage.webp"
          alt="Open mountain highway winding through evergreen forest"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#071526]/82 via-[#07162B]/86 to-[#071629]"
        />

        <div className="relative z-10 max-w-[440px]">
          <p className="text-[12px] font-bold tracking-[0.02em] text-[#93C5FD] mb-1.5">
            Coverage Options
          </p>
          <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-extrabold text-[#FAF6EE] leading-[1.15] tracking-[-0.025em] text-balance">
            Policies Matched to Your Driving Needs.
          </h2>
          <p className="mt-2 text-[14px] sm:text-[14.5px] text-white/84 leading-[1.54]">
            Participating agencies quote coverage for daily commuters, financed
            cars, and specialty state filings:
          </p>
        </div>
      </div>

      <ul className="relative z-10 bg-white/10 pt-[1px] grid grid-cols-1 sm:grid-cols-2 gap-[1px]">
        {COVERAGE_ITEMS.map((item) => (
          <li
            key={item.title}
            className="bg-[#091A31] p-5 flex items-start gap-3.5 min-w-0"
          >
            <div
              aria-hidden="true"
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#93C5FD] shrink-0 mt-0.5"
            >
              <item.Icon size={17} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[14px] sm:text-[14.5px] font-extrabold text-[#FAF6EE] leading-snug">
                {item.title}
              </h3>
              <p className="mt-1 text-[12.5px] text-white/75 leading-[1.48]">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
