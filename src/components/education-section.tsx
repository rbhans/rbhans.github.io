import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

export function EducationSection() {
  return (
    <section>
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--paper-ink-muted)]">
          Education
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="paper-ruled mt-3 flex items-center gap-4 border border-[var(--paper-border)] p-5">
          <div className="flex h-12 w-28 shrink-0 items-center justify-center">
            <Image
              src="/images/isu-logo.svg"
              alt="Iowa State University"
              width={112}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="border-l border-dashed border-[var(--paper-border-strong)] pl-4">
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]">
              Credential · 2011
            </p>
            <h3 className="mt-0.5 font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
              Iowa State University
            </h3>
            <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-[12px] italic text-[var(--paper-ink-muted)]">
              BA Mechanical Engineering
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
