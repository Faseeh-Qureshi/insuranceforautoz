import { CoverageCard } from "./CoverageCard";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { BenefitsSection } from "./BenefitsSection";
import { CarrierStrip } from "./CarrierStrip";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CarrierStrip />
      <BenefitsSection />
      <HowItWorks />

      <section
        id="coverage"
        aria-label="Coverage scope and frequently asked questions"
        className="cv-auto w-full bg-[#E6DCCA] border-t border-[#CBBBA2] py-10 sm:py-14 lg:py-18"
      >
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-stretch">
            <div className="lg:col-span-6">
              <CoverageCard />
            </div>
            <div id="faq" className="lg:col-span-6">
              <FAQ />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
