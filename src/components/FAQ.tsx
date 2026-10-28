import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Is there any fee to call and check rates?",
    answer:
      "No. InsuranceforAutoz is free for drivers. Participating agencies quote policies at no charge, and you pay a premium only if you choose to buy coverage from a provider.",
  },
  {
    id: "faq-2",
    question: "Why call instead of filling out online quote forms?",
    answer:
      "Online forms often collect pages of personal data before showing rough estimates. A short call lets a licensed agent match exact coverage limits, deductibles, and eligible discounts right away.",
  },
  {
    id: "faq-3",
    question: "Will every carrier shown offer me a quote?",
    answer:
      "Not always. Carrier availability depends on your state, vehicle, driving record, and the insurers represented by participating agencies in your area.",
  },
  {
    id: "faq-4",
    question: "Do I have to wait until my policy expires to switch?",
    answer:
      "No. Reviewing quotes carries zero obligation, and if you choose a better policy mid-term, a licensed agent can align your new start date with your cancellation date so coverage never lapses.",
  },
  {
    id: "faq-5",
    question: "What details help speed up the call?",
    answer:
      "Having your five-digit ZIP code, vehicle year, make, and model, and your current or preferred coverage level is enough to begin.",
  },
] as const;

export function FAQ() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "faq-1": true,
    "faq-2": true,
    "faq-3": false,
    "faq-4": false,
    "faq-5": false,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpenIds({
        "faq-1": true,
        "faq-2": false,
        "faq-3": false,
        "faq-4": false,
        "faq-5": false,
      });
    }
  }, []);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col justify-between h-full bg-[#FAF6EE] rounded-xl border border-[#CBBBA2] p-5 sm:p-8 shadow-[0_4px_18px_rgba(10,27,51,0.04)]">
      <div>
        <p className="text-[12px] font-bold tracking-[0.02em] text-[#0A56C2] mb-1.5">
          Common Questions
        </p>
        <h2
          id="faq-heading"
          className="text-[24px] sm:text-[28px] lg:text-[30px] font-extrabold text-[#0A1B33] leading-[1.15] tracking-[-0.025em] mb-4 text-balance"
        >
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-[#DDD2C0] border-y border-[#DDD2C0]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openIds[item.id];
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div key={item.id} className="py-2 sm:py-2.5">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between gap-3 py-1.5 text-left text-[14.5px] sm:text-[15px] font-extrabold text-[#0A1B33] hover:text-[#0A56C2] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A56C2] rounded-xs cursor-pointer min-h-[44px]"
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

      <p className="mt-4 text-[12px] text-[#4E6078]">
        Need clarity on deductibles or state minimums? Ask a licensed agent
        when you call.
      </p>
    </div>
  );
}
