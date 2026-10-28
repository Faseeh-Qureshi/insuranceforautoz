import type { ReactNode } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function BenefitCard({ title, description, icon }: BenefitCardProps) {
  return (
    <div className="bg-[#FAF6EE] p-5 sm:p-6 flex flex-col items-start min-w-0">
      <div
        aria-hidden="true"
        className="w-10 h-10 rounded-lg bg-[#EAE1D2] border border-[#D4C6B0] flex items-center justify-center text-[#0A56C2] mb-3 shrink-0"
      >
        {icon}
      </div>
      <h3 className="text-[15.5px] sm:text-[16.5px] font-extrabold text-[#0A1B33] leading-snug tracking-[-0.015em]">
        {title}
      </h3>
      <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#34465D] leading-[1.55]">
        {description}
      </p>
    </div>
  );
}
