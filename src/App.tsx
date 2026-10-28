import { useState } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { HeroSection } from "./components/HeroSection";
import { CarrierStrip } from "./components/CarrierStrip";
import { BenefitsSection } from "./components/BenefitsSection";
import { HowItWorks } from "./components/HowItWorks";
import { CoverageCard } from "./components/CoverageCard";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { SiteFooter } from "./components/SiteFooter";
import { MobileCallBar } from "./components/MobileCallBar";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [footerModalOpen, setFooterModalOpen] = useState(false);

  return (
    <div className="min-h-[100svh] flex flex-col bg-[#F2EBDF] text-[#0A1B33]">
      <SiteHeader
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={setMobileMenuOpen}
      />

      <main className="flex-1">
        {/* 1. Deep heritage navy hero (#071526) */}
        <HeroSection />

        {/* 2. Warm travertine 8-carrier ledger (#E6DCCA) */}
        <CarrierStrip />

        {/* 3. Rich warm cream rate-comparison & discount matrix (#F2EBDF) */}
        <BenefitsSection />

        {/* 4. Deep heritage navy 3-step call sequence (#08182D) */}
        <HowItWorks />

        {/* 5. Warm travertine band for coverage scope & candid FAQs (#E6DCCA) */}
        <section
          id="coverage"
          aria-label="Coverage scope and frequently asked questions"
          className="w-full bg-[#E6DCCA] border-t border-[#CBBBA2] py-10 sm:py-14 lg:py-18"
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

        {/* 6. Rich warm cream final renewal benchmark banner (#F2EBDF) */}
        <FinalCTA />
      </main>

      {/* 7. 3-Tier corporate footer (#05101F -> #040C18 -> #030913) */}
      <SiteFooter onModalOpenChange={setFooterModalOpen} />

      <MobileCallBar suppressed={mobileMenuOpen || footerModalOpen} />
    </div>
  );
}
