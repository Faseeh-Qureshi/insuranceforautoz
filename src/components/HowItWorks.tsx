import { SITE_CONFIG } from "../config/site";
import { CallNowButton } from "./CallNowButton";

const STEPS = [
  {
    step: "01.",
    title: `Call ${SITE_CONFIG.phone.shortDisplay}`,
    description:
      "Share your ZIP code, vehicle year and model, and desired coverage level.",
  },
  {
    step: "02.",
    title: "Match by State",
    description:
      "Connect with a participating agency licensed to quote carriers in your state.",
  },
  {
    step: "03.",
    title: "Compare & Decide",
    description:
      "Review exact monthly or 6-month rates and switch only if an offer makes sense.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="w-full bg-[#08182D] text-white border-y border-white/10 py-10 sm:py-14 lg:py-18"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
        <div className="max-w-[540px]">
          <p className="text-[12px] font-bold tracking-[0.02em] text-[#93C5FD] mb-1.5">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-[24px] sm:text-[29px] lg:text-[33px] font-extrabold text-[#FAF6EE] leading-[1.14] tracking-[-0.025em] text-balance"
          >
            Check Your Rate in Three Steps.
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-white/80 leading-[1.56]">
            Skip multi-page online forms and review real policy pricing by phone.
          </p>
        </div>

        <ol className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 rounded-xl bg-white/12 p-[1px] gap-[1px] overflow-hidden">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="bg-[#0D213B] p-5 sm:p-6 lg:p-7 flex flex-col min-w-0"
            >
              <span className="font-[family-name:var(--font-display)] text-[13.5px] font-extrabold text-[#60A5FA] tabular-nums">
                {item.step}
              </span>
              <h3 className="mt-1.5 text-[16.5px] sm:text-[17.5px] font-extrabold text-[#FAF6EE] leading-snug tracking-[-0.015em] tabular-nums">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-white/78 leading-[1.55]">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-5 sm:mt-6 rounded-xl bg-[#112847] border border-white/12 px-5 py-4.5 sm:px-7 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
          <div className="min-w-0">
            <p className="text-[15px] sm:text-[16px] font-extrabold text-[#FAF6EE] tracking-[-0.01em]">
              Ready to compare quotes for your vehicle?
            </p>
            <p className="mt-0.5 text-[12.5px] sm:text-[13px] text-white/76 tabular-nums">
              Direct line: {SITE_CONFIG.phone.fullDisplay} &middot; Free check,
              no obligation
            </p>
          </div>

          <CallNowButton variant="darkSection" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
