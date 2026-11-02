import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Phone, Shield } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import {
  COVERAGE_FAQ_ITEMS,
  DISCOUNTS_FAQ_ITEMS,
  SR22_FAQ_ITEMS,
  type FaqEntry,
} from "../seo/routes";
import { CallNowButton } from "../components/CallNowButton";
import { CarrierStrip } from "../components/CarrierStrip";
import { FinalCTA } from "../components/FinalCTA";

interface PageHeroProps {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  showCallCta?: boolean;
}

function PageHero({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  showCallCta = true,
}: PageHeroProps) {
  return (
    <section className="relative w-full bg-[#071526] text-white border-b border-white/10">
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-15">
        <nav
          aria-label="Breadcrumb"
          className="text-[12px] font-medium text-white/65 mb-3 flex flex-wrap items-center gap-1.5"
        >
          <a
            href="/"
            className="hover:text-white underline-offset-4 hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-xs"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-white/35">
            /
          </span>
          <span className="text-[#93C5FD]">{breadcrumb}</span>
        </nav>

        <div className="max-w-[720px]">
          <p className="text-[12px] font-bold tracking-[0.02em] text-[#93C5FD] mb-2">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(1.7rem,5.2vw,2.75rem)] font-extrabold text-[#FAF6EE] leading-[1.1] tracking-[-0.028em] text-balance">
            {title}
          </h1>
          <p className="mt-3 text-[14.5px] sm:text-[16px] text-white/85 leading-[1.58] max-w-[630px]">
            {subtitle}
          </p>

          {showCallCta && (
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <CallNowButton variant="hero" className="w-full sm:w-auto" />
              <p className="text-[12.5px] text-white/78 text-center sm:text-left">
                Free service &middot; State-licensed agencies &middot; No
                obligation
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GuideFaqSection({
  heading,
  items,
}: {
  heading: string;
  items: readonly FaqEntry[];
}) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    items.reduce<Record<string, boolean>>((acc, item, index) => {
      acc[item.id] = index === 0;
      return acc;
    }, {})
  );

  return (
    <section
      aria-labelledby="guide-faq-heading"
      className="w-full bg-[#E6DCCA] border-t border-[#CBBBA2] py-10 sm:py-14"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
        <div className="max-w-[820px] bg-[#FAF6EE] rounded-xl border border-[#CBBBA2] p-5 sm:p-8 shadow-[0_4px_18px_rgba(10,27,51,0.04)]">
          <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
            Common Questions
          </p>
          <h2
            id="guide-faq-heading"
            className="text-[22px] sm:text-[27px] font-extrabold text-[#0A1B33] leading-[1.16] tracking-[-0.025em] mb-4 text-balance"
          >
            {heading}
          </h2>

          <div className="divide-y divide-[#DDD2C0] border-y border-[#DDD2C0]">
            {items.map((item) => {
              const isOpen = !!openIds[item.id];
              const panelId = `${item.id}-panel`;
              const buttonId = `${item.id}-btn`;

              return (
                <div key={item.id} className="py-2 sm:py-2.5">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenIds((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className="w-full flex items-center justify-between gap-3 py-1.5 text-left text-[14.5px] sm:text-[15px] font-extrabold text-[#0A1B33] hover:text-[#0A56C2] transition-colors cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2] rounded-xs"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={18}
                        strokeWidth={2.3}
                        aria-hidden="true"
                        className={`text-[#0A56C2] shrink-0 transition-transform duration-150 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-150 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-1 pb-1.5"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-5 text-[13.5px] sm:text-[14px] text-[#34465D] leading-[1.58]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedGuidesStrip({ currentPath }: { currentPath: string }) {
  const guides = [
    {
      href: "/auto-insurance-coverage/",
      title: "Coverage Options & Limits",
      summary: "Compare liability, collision, comprehensive, and deductibles.",
    },
    {
      href: "/car-insurance-discounts/",
      title: "Car Insurance Discounts",
      summary: "Multi-car, safe-driver, bundling, and renewal credits.",
    },
    {
      href: "/sr22-high-risk-auto-insurance/",
      title: "SR-22 & High-Risk Filings",
      summary: "Owner and non-owner SR-22, FR-44, and post-lapse options.",
    },
    {
      href: "/how-it-works/",
      title: "How Our Referral Works",
      summary: "See how phone matching connects you with licensed agencies.",
    },
  ].filter((guide) => guide.href !== currentPath);

  return (
    <section
      aria-labelledby="related-guides-heading"
      className="w-full bg-[#F2EBDF] border-t border-[#D7CAB5] py-9 sm:py-12"
    >
      <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
        <h2
          id="related-guides-heading"
          className="text-[19px] sm:text-[22px] font-extrabold text-[#0A1B33] tracking-[-0.02em] mb-4"
        >
          Related Auto Insurance Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="group bg-[#FAF6EE] border border-[#CBBBA2] hover:border-[#0A56C2] rounded-xl p-5 flex flex-col justify-between transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2]"
            >
              <div>
                <h3 className="text-[15.5px] font-extrabold text-[#0A1B33] group-hover:text-[#0A56C2] transition-colors">
                  {guide.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-[#34465D] leading-[1.52]">
                  {guide.summary}
                </p>
              </div>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0A56C2]">
                <span>Read guide</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.3}
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoverageGuidePage() {
  const coverages = [
    {
      title: "Bodily Injury & Property Damage Liability",
      whenRequired: "Mandatory in nearly every U.S. state",
      detail:
        "Pays covered medical bills, lost wages, legal defense, and vehicle or property repairs when you are at fault in an accident.",
    },
    {
      title: "Collision Coverage",
      whenRequired: "Typically required on financed or leased vehicles",
      detail:
        "Covers repair or actual cash value replacement of your own car after colliding with another vehicle or stationary object, minus your deductible.",
    },
    {
      title: "Comprehensive Coverage",
      whenRequired: "Typically required by auto lenders and lessors",
      detail:
        "Protects your vehicle against non-collision events including hail, theft, vandalism, falling trees, flooding, glass breakage, and animal strikes.",
    },
    {
      title: "Uninsured & Underinsured Motorist (UM/UIM)",
      whenRequired: "Required in select states; optional in others",
      detail:
        "Helps pay medical expenses and, in eligible states, vehicle damage if you are hit by a hit-and-run driver or someone carrying insufficient limits.",
    },
    {
      title: "Medical Payments (MedPay) & PIP",
      whenRequired: "PIP required in no-fault states such as FL, MI, NJ, NY",
      detail:
        "Covers medical treatment for you and your passengers regardless of fault, and in Personal Injury Protection states can include partial wage loss.",
    },
    {
      title: "Roadside & Rental Reimbursement",
      whenRequired: "Optional policy endorsements",
      detail:
        "Covers emergency towing, battery jump-starts, and daily rental car allowances while your insured vehicle is in the shop for a covered claim.",
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Auto Insurance Coverage"
        eyebrow="U.S. Auto Policy Coverage Guide"
        title="Compare Liability, Collision & Full Coverage Auto Insurance."
        subtitle="Choosing the right limits and deductibles keeps you compliant with state law and lender rules without overpaying for duplicate add-ons. Review real coverage combinations in one call."
      />

      <CarrierStrip />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="max-w-[680px] mb-7">
            <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
              Core Policy Components
            </p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#0A1B33] leading-[1.15] tracking-[-0.025em] text-balance">
              Six Coverages Licensed Agents Quote Side by Side.
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#34465D] leading-[1.58]">
              Online estimators often default to bare state minimums to advertise
              a low teaser number. When you speak with a licensed agency, you can
              price the exact limits your household actually needs.
            </p>
          </div>

          <div className="rounded-xl bg-[#CBBBA2] p-[1px] overflow-hidden shadow-[0_6px_22px_rgba(10,27,51,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#CBBBA2] rounded-[11px] overflow-hidden">
              {coverages.map((item) => (
                <article
                  key={item.title}
                  className="bg-[#FAF6EE] p-5 sm:p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[11.5px] font-semibold text-[#0A56C2]">
                      {item.whenRequired}
                    </p>
                    <h3 className="mt-1.5 text-[16px] font-extrabold text-[#0A1B33] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-[#34465D] leading-[1.56]">
                      {item.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Liability Limit & Deductible Comparison Table */}
          <div className="mt-10 sm:mt-12 bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl overflow-hidden">
            <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[#DDD2C0]">
              <h2 className="text-[19px] sm:text-[22px] font-extrabold text-[#0A1B33] tracking-[-0.02em]">
                How Split Liability Limits Work (Example Tiers)
              </h2>
              <p className="mt-1 text-[13.5px] text-[#34465D]">
                Split limits appear as three numbers (in thousands): bodily injury
                per person / bodily injury per accident / property damage per
                accident.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13.5px] sm:text-[14px]">
                <thead>
                  <tr className="bg-[#EDE4D4] text-[#0A1B33] border-b border-[#CBBBA2]">
                    <th className="py-3 px-4 sm:px-6 font-extrabold">
                      Coverage Tier
                    </th>
                    <th className="py-3 px-4 sm:px-6 font-extrabold tabular-nums">
                      Typical Split Limit
                    </th>
                    <th className="py-3 px-4 sm:px-6 font-extrabold">
                      Best Suited For
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD2C0] text-[#34465D]">
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0A1B33]">
                      State Minimum Liability
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 tabular-nums font-semibold">
                      25/50/25 (varies by state)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      Drivers prioritizing the lowest legal monthly cost on an
                      older paid-off vehicle.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0A1B33]">
                      Balanced Commuter Protection
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 tabular-nums font-semibold">
                      50/100/50 + $500 or $1,000 deductible
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      Everyday commuters with financed vehicles who want stronger
                      property damage protection.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0A1B33]">
                      Higher Asset Protection
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 tabular-nums font-semibold">
                      100/300/100 + UM/UIM
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      Homeowners and multi-car households shielding income and
                      savings against severe claims.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <GuideFaqSection
        heading="Auto Insurance Coverage Questions"
        items={COVERAGE_FAQ_ITEMS}
      />

      <RelatedGuidesStrip currentPath="/auto-insurance-coverage/" />
      <FinalCTA />
    </>
  );
}

export function DiscountsGuidePage() {
  const categories = [
    {
      title: "Policy & Bundling Credits",
      items: [
        "Multi-vehicle household policies (insuring two or more cars together)",
        "Homeowners, condo, or renters multi-policy bundling",
        "Continuous prior insurance without a coverage lapse",
        "Early-shopper credit when quoting 7 to 14 days before renewal",
      ],
    },
    {
      title: "Driver Record & Safe Driving",
      items: [
        "Three-to-five-year accident-free and claim-free history",
        "Clean MVR with zero moving violations",
        "State-approved defensive driving course completion",
        "Optional telematics or usage-based low-mileage programs",
      ],
    },
    {
      title: "Vehicle Safety & Ownership",
      items: [
        "Factory forward-collision warning and automatic emergency braking",
        "Active GPS theft-recovery and factory immobilizer systems",
        "Newer model-year vehicle and original-owner credits",
        "Garage or private-driveway overnight parking in eligible ZIP codes",
      ],
    },
    {
      title: "Billing & Household Eligibility",
      items: [
        "Paid-in-full 6-month or 12-month policy term discount",
        "Automatic EFT bank draft and paperless policy documents",
        "Good-student GPA and distant-student away-at-college credits",
        "Military, veteran, educator, or occupational group eligibility",
      ],
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Car Insurance Discounts"
        eyebrow="Rate Reduction & Discount Review"
        title="Check Eligible Car Insurance Discounts Before You Renew."
        subtitle="Each insurer weights bundling, mileage, vehicle safety equipment, and continuous coverage differently. A five-minute call checks which carrier credits apply to your profile."
      />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="max-w-[680px] mb-7">
            <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
              Underwriting Credits
            </p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#0A1B33] leading-[1.15] tracking-[-0.025em] text-balance">
              Four Discount Categories Licensed Agents Check on the Call.
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#34465D] leading-[1.58]">
              Many drivers miss reductions simply because their mileage dropped,
              an older ticket aged off their motor vehicle record, or their
              current carrier raised neighborhood base rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <section
                key={cat.title}
                className="bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-5 sm:p-7"
              >
                <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#0A1B33] tracking-[-0.015em]">
                  {cat.title}
                </h3>
                <ul className="mt-3.5 space-y-2.5 text-[13.5px] sm:text-[14px] text-[#34465D] leading-[1.52]">
                  {cat.items.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        strokeWidth={2.6}
                        aria-hidden="true"
                        className="text-[#0A56C2] shrink-0 mt-1"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-5 text-[12px] text-[#4E6078]">
            Discount availability, percentage caps, and eligibility rules vary by
            state insurance department filings and participating carrier.
          </p>
        </div>
      </section>

      <GuideFaqSection
        heading="Car Insurance Discount Questions"
        items={DISCOUNTS_FAQ_ITEMS}
      />

      <RelatedGuidesStrip currentPath="/car-insurance-discounts/" />
      <FinalCTA />
    </>
  );
}

export function Sr22GuidePage() {
  const scenarios = [
    {
      title: "Owner SR-22 Auto Policy",
      description:
        "For drivers who own or finance a vehicle and need their insurer to file a state certificate of financial responsibility electronically with the DMV.",
    },
    {
      title: "Non-Owner SR-22 Policy",
      description:
        "For drivers without a registered vehicle in their household who require liability certification to reinstate a suspended driver's license.",
    },
    {
      title: "FR-44 Higher-Limit Filings (FL & VA)",
      description:
        "Specialized financial responsibility filings in Florida and Virginia that require elevated bodily injury and property damage liability limits.",
    },
    {
      title: "Coverage After Tickets, Accidents, or Lapses",
      description:
        "Compare non-standard and standard insurers willing to write policies after speeding citations, at-fault claims, or a prior cancellation.",
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="SR-22 & High-Risk Coverage"
        eyebrow="State Filings & Non-Standard Underwriting"
        title="SR-22, FR-44 & High-Risk Auto Insurance Quotes by Phone."
        subtitle="Not every carrier writes SR-22 certificates or accepts drivers after a lapse or major violation. Calling connects you directly with licensed agencies that quote specialized state filings."
      />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="max-w-[680px] mb-7">
            <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
              Specialized Situations
            </p>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#0A1B33] leading-[1.15] tracking-[-0.025em] text-balance">
              Find Insurers That Actively Write High-Risk Profiles.
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#34465D] leading-[1.58]">
              Preferred-only carriers may decline an application or price it out
              of reach after a violation, while specialty carriers compete for
              these exact policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scenarios.map((item) => (
              <article
                key={item.title}
                className="bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-2.5">
                  <Shield
                    size={17}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="text-[#0A56C2] shrink-0"
                  />
                  <h3 className="text-[16.5px] font-extrabold text-[#0A1B33]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-[13.5px] sm:text-[14px] text-[#34465D] leading-[1.58]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 bg-[#08182D] text-white rounded-xl p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="max-w-[640px]">
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#FAF6EE]">
                Need same-day proof of insurance or electronic DMV filing?
              </h2>
              <p className="mt-1 text-[13.5px] text-white/80 leading-[1.55]">
                Tell the licensed agent your state and whether your DMV notice
                specifies an Owner SR-22, Non-Owner SR-22, or FR-44 certificate
                (where available).
              </p>
            </div>
            <CallNowButton variant="darkSection" className="w-full sm:w-auto shrink-0" />
          </div>
        </div>
      </section>

      <GuideFaqSection
        heading="SR-22 & High-Risk Insurance Questions"
        items={SR22_FAQ_ITEMS}
      />

      <RelatedGuidesStrip currentPath="/sr22-high-risk-auto-insurance/" />
      <FinalCTA />
    </>
  );
}

export function HowItWorksPage() {
  const steps = [
    {
      num: "01.",
      title: `Dial ${SITE_CONFIG.phone.fullDisplay}`,
      body: "Call our toll-free referral line from any mobile or landline phone. There are no long online questionnaires to fill out before speaking with a real person.",
    },
    {
      num: "02.",
      title: "Connect With a Licensed Agency in Your State",
      body: "Based on your five-digit ZIP code and coverage needs, your call routes to a participating insurance agency licensed to quote policies in your state.",
    },
    {
      num: "03.",
      title: "Review Quotes & Decide With Zero Pressure",
      body: "Compare monthly or six-month premiums, deductibles, and eligible discounts. You are never obligated to buy or switch policies.",
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="How It Works"
        eyebrow="Transparent Consumer Referral Process"
        title="How InsuranceforAutoz Connects Drivers With Licensed Agencies."
        subtitle="We built a straightforward phone referral service for U.S. drivers who want real, bindable quote comparisons without submitting personal details across dozens of lead-resale forms."
      />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1240px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8 space-y-8">
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <li
                key={s.num}
                className="bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-5 sm:p-7"
              >
                <span className="font-[family-name:var(--font-display)] text-[14px] font-extrabold text-[#0A56C2] tabular-nums">
                  {s.num}
                </span>
                <h2 className="mt-1.5 text-[17px] sm:text-[18px] font-extrabold text-[#0A1B33] leading-snug tabular-nums">
                  {s.title}
                </h2>
                <p className="mt-2 text-[13.5px] sm:text-[14px] text-[#34465D] leading-[1.58]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-5 sm:p-7">
              <h2 className="text-[19px] sm:text-[21px] font-extrabold text-[#0A1B33]">
                How Our Service Remains Free to Drivers
              </h2>
              <p className="mt-2.5 text-[14px] text-[#34465D] leading-[1.62]">
                InsuranceforAutoz is an independent marketing and referral
                service. Consumers never pay a fee to call or request quotes.
                Participating third-party insurance agencies may compensate us for
                marketing referrals. Insurance premiums are filed with state
                regulators by the issuing carrier, meaning calling through our
                referral line does not add a markup to your policy rate.
              </p>
              <h3 className="mt-5 text-[15.5px] font-extrabold text-[#0A1B33]">
                Helpful Information to Have Nearby
              </h3>
              <ul className="mt-2.5 space-y-2 text-[13.5px] sm:text-[14px] text-[#34465D]">
                <li className="flex items-start gap-2">
                  <Check
                    size={15}
                    strokeWidth={2.6}
                    aria-hidden="true"
                    className="text-[#0A56C2] shrink-0 mt-1"
                  />
                  <span>Your five-digit residential ZIP code</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={15}
                    strokeWidth={2.6}
                    aria-hidden="true"
                    className="text-[#0A56C2] shrink-0 mt-1"
                  />
                  <span>
                    Vehicle year, make, and model (or VIN if requesting an exact
                    bindable rate)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check
                    size={15}
                    strokeWidth={2.6}
                    aria-hidden="true"
                    className="text-[#0A56C2] shrink-0 mt-1"
                  />
                  <span>
                    Current insurer name and preferred liability or deductible
                    tier
                  </span>
                </li>
              </ul>
            </div>

            <aside className="lg:col-span-5 bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-5 sm:p-7 flex flex-col justify-between">
              <div>
                <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33]">
                  Company &amp; Mailing Office
                </h2>
                <dl className="mt-3.5 space-y-3 text-[13.5px] sm:text-[14px]">
                  <div>
                    <dt className="font-bold text-[#0A1B33]">Service Name</dt>
                    <dd className="text-[#34465D]">{SITE_CONFIG.brandName}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#0A1B33]">
                      Consumer Quote Line
                    </dt>
                    <dd className="tabular-nums">
                      <a
                        href={SITE_CONFIG.phone.href}
                        className="font-extrabold text-[#0A56C2] hover:underline"
                      >
                        {SITE_CONFIG.phone.fullDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#0A1B33]">
                      Mailing Address
                    </dt>
                    <dd className="text-[#34465D]">
                      {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 pt-4 border-t border-[#DDD2C0] text-[12.5px] text-[#4E6078] flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href="/privacy-policy/"
                  className="font-semibold text-[#0A56C2] hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-use/"
                  className="font-semibold text-[#0A56C2] hover:underline"
                >
                  Terms of Use
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RelatedGuidesStrip currentPath="/how-it-works/" />
      <FinalCTA />
    </>
  );
}

export function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumb="Privacy Policy"
        eyebrow="Consumer Privacy & Data Notice"
        title="Privacy Policy"
        subtitle="How InsuranceforAutoz handles website analytics, inbound telephone referrals, and consumer privacy rights across the United States."
        showCallCta={false}
      />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14">
        <div className="max-w-[900px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-6 sm:p-9 space-y-6 text-[14px] sm:text-[15px] text-[#34465D] leading-[1.68]">
            <p className="text-[12.5px] font-semibold text-[#4E6078]">
              Effective Date: November 2026 &middot; {SITE_CONFIG.brandName}
            </p>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                1. Overview of Our Service
              </h2>
              <p>
                {SITE_CONFIG.brandName} operates an independent auto insurance
                marketing and telephone referral website. This website does not
                collect online quote forms, Social Security numbers, driver's
                license numbers, or payment card details.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                2. Information Collected During Website Visits &amp; Calls
              </h2>
              <p>
                When you browse our website, standard technical telemetry (such
                as browser type, device viewport, referring page, and aggregate
                click events measured via Google Analytics) is processed to
                maintain site performance and measure advertising effectiveness.
                When you place a phone call to{" "}
                <span className="font-bold text-[#0A1B33] tabular-nums">
                  {SITE_CONFIG.phone.fullDisplay}
                </span>
                , call-routing metadata such as caller telephone number, region,
                call duration, and any quote details you voluntarily share by
                voice are used to connect you with a participating state-licensed
                insurance agency.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                3. How Calls Are Shared With Participating Agencies
              </h2>
              <p>
                Once your call is transferred to a participating third-party
                agency or insurer, any personal or underwriting information you
                provide to obtain an insurance quote is governed by that licensed
                provider's own privacy notice and applicable state insurance
                regulations. Calls may be recorded or monitored for quality
                assurance and regulatory compliance.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                4. Cookies &amp; Analytics Choices
              </h2>
              <p>
                You may restrict or clear cookies at any time through your web
                browser settings or install the Google Analytics opt-out browser
                add-on without affecting your ability to read our guides or call
                our referral line.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                5. Written Privacy Inquiries &amp; Mailing Address
              </h2>
              <p>
                For written privacy requests or U.S. state consumer privacy
                inquiries, mail correspondence to{" "}
                <strong className="text-[#0A1B33]">
                  {SITE_CONFIG.brandName}
                </strong>
                , {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}, or
                call{" "}
                <a
                  href={SITE_CONFIG.phone.href}
                  className="font-bold text-[#0A56C2] hover:underline tabular-nums"
                >
                  {SITE_CONFIG.phone.fullDisplay}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function TermsOfUsePage() {
  return (
    <>
      <PageHero
        breadcrumb="Terms of Use"
        eyebrow="Consumer Terms & Regulatory Disclosures"
        title="Terms of Use"
        subtitle="Terms, independent referral disclosures, and carrier trademark notices governing your use of InsuranceforAutoz."
        showCallCta={false}
      />

      <section className="w-full bg-[#F2EBDF] py-10 sm:py-14">
        <div className="max-w-[900px] mx-auto pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-6 lg:px-8">
          <div className="bg-[#FAF6EE] border border-[#CBBBA2] rounded-xl p-6 sm:p-9 space-y-6 text-[14px] sm:text-[15px] text-[#34465D] leading-[1.68]">
            <p className="text-[12.5px] font-semibold text-[#4E6078]">
              Effective Date: November 2026 &middot; {SITE_CONFIG.brandName}
            </p>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                1. Independent Referral Service Status
              </h2>
              <p>
                {SITE_CONFIG.brandName} is an independent marketing and consumer
                referral service and is not an insurance company, underwriting
                carrier, licensed agency, or insurance broker. We do not issue
                quotes directly, bind coverage, collect premiums, or handle
                insurance claims.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                2. No Guarantee of Specific Rates or Carrier Availability
              </h2>
              <p>
                Calling{" "}
                <span className="font-bold text-[#0A1B33] tabular-nums">
                  {SITE_CONFIG.phone.fullDisplay}
                </span>{" "}
                connects you with participating third-party insurance agencies
                licensed in your jurisdiction. Quotes, discounts, deductibles,
                and policy availability depend on state insurance filings,
                vehicle specifications, verified motor vehicle records, and each
                insurer's underwriting guidelines. Not all insurers shown on this
                website are available in all states or through every
                participating agency.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                3. Free Consumer Access &amp; Zero Obligation
              </h2>
              <p>
                Using this website and calling our referral line is free for
                consumers and carries no obligation to purchase or switch auto
                insurance policies. Always review written policy documents from
                the licensed agency or carrier before canceling existing
                coverage.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                4. Third-Party Trademarks &amp; Educational Content
              </h2>
              <p>
                Carrier names and logos displayed on {SITE_CONFIG.brandName} are
                registered trademarks of their respective owners and are shown
                strictly to identify insurers that may be represented by
                participating independent agencies. Educational guides on this
                site are provided for general informational purposes and do not
                constitute legal or licensed insurance advice.
              </p>
            </div>

            <div>
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#0A1B33] mb-2">
                5. Mailing Address
              </h2>
              <p>
                Correspondence regarding these Terms of Use may be mailed to{" "}
                <strong className="text-[#0A1B33]">
                  {SITE_CONFIG.brandName}
                </strong>
                , {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="w-full bg-[#F2EBDF] py-16 sm:py-24">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2]">
          404 Page Not Found
        </p>
        <h1 className="mt-2 text-[28px] sm:text-[36px] font-extrabold text-[#0A1B33] tracking-[-0.028em]">
          We Could Not Find That Page.
        </h1>
        <p className="mt-3 text-[15px] text-[#34465D] leading-[1.6]">
          Return to the home page to explore auto insurance coverage guides or
          call{" "}
          <span className="font-bold text-[#0A1B33] tabular-nums">
            {SITE_CONFIG.phone.fullDisplay}
          </span>{" "}
          to compare live quotes with a state-licensed agency.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full border border-[#0A1B33] text-[#0A1B33] font-extrabold text-[14.5px] hover:bg-[#0A1B33] hover:text-white transition-colors w-full sm:w-auto"
          >
            Back to Home
          </a>
          <a
            href={SITE_CONFIG.phone.href}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#0A56C2] hover:bg-[#1666D8] text-white font-extrabold text-[14.5px] tabular-nums transition-colors w-full sm:w-auto"
          >
            <Phone size={16} strokeWidth={2.3} aria-hidden="true" className="fill-white" />
            <span>Call {SITE_CONFIG.phone.shortDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
