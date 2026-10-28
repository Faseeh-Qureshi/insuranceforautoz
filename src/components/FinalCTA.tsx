import { SITE_CONFIG } from "../config/site";
import { CallNowButton } from "./CallNowButton";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="w-full bg-[#F2EBDF] py-10 sm:py-14 border-t border-[#CBBBA2]"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden bg-[#071629] border border-[#122744] px-5 py-7 sm:px-10 sm:py-9 lg:px-12 lg:py-10 shadow-[0_14px_34px_rgba(7,22,41,0.14)]">
          <img
            src="/images/scenic-road-cta.webp"
            alt=""
            aria-hidden="true"
            width={1376}
            height={568}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-[right_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#071629] via-[#081A33]/94 via-58% to-[#071629]/55"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-10">
            <div className="max-w-[540px]">
              <p className="text-[12px] font-bold tracking-[0.02em] text-[#93C5FD] mb-1.5">
                Free Rate Check
              </p>
              <h2
                id="final-cta-heading"
                className="text-[23px] sm:text-[28px] lg:text-[31px] font-extrabold text-[#FAF6EE] leading-[1.14] tracking-[-0.025em] text-balance"
              >
                Benchmark Your Policy Before You Renew.
              </h2>
              <p className="mt-2 text-[14px] sm:text-[15px] text-white/85 leading-[1.56]">
                Call{" "}
                <span className="font-bold text-white tabular-nums">
                  {SITE_CONFIG.phone.fullDisplay}
                </span>{" "}
                to compare available auto insurance rates and discounts with no
                obligation.
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:items-start lg:items-end gap-2 shrink-0">
              <CallNowButton variant="banner" className="w-full sm:w-auto" />
              <p className="text-[12px] text-white/75 text-center sm:text-left lg:text-right">
                Free service &middot; No obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
