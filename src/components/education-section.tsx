import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

export function EducationSection() {
  return (
    <section>
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
          Education
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mt-3 flex items-center gap-4 rounded-xl border border-[var(--stone-200)] bg-white p-5">
          <div className="flex h-12 w-28 shrink-0 items-center justify-center">
            <Image
              src="/images/isu-logo.svg"
              alt="Iowa State University"
              width={112}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
              Iowa State University
            </h3>
            <p className="mt-0.5 text-xs text-[var(--stone-500)]">
              BA Mechanical Engineering, 2011
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
