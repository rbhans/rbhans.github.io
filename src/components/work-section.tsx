import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { ProjectCard } from "./project-card";

export function WorkSection({
  basidekickImages,
  opencrateImages,
}: {
  basidekickImages: string[];
  opencrateImages: string[];
}) {
  return (
    <section id="work">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
          Currently
        </p>
        <a
          href="https://www.qagraphics.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-[#0B426B] p-2">
            <Image
              src="/images/qa-graphics-logo.png"
              alt="QA Graphics"
              width={64}
              height={20}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
              QA Graphics
            </h2>
            <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--stone-600)]">
              Senior Graphic Outsourcing Design — crafting BAS graphic and UI
              solutions for the building automation industry.
            </p>
          </div>
        </a>
      </ScrollReveal>

      <div className="mt-8">
        <ScrollReveal delay={0.1}>
          <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
            Side Projects
          </p>
        </ScrollReveal>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ScrollReveal delay={0.15}>
            <ProjectCard
              name="BASidekick"
              description="An open-source, community-driven reference for building automation professionals — tools, resources, and industry news in one place."
              language="TypeScript"
              languageColor="var(--accent-sky)"
              meta="basidekick.com"
              href="https://basidekick.com"
              images={basidekickImages}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <ProjectCard
              name="OpenCrate BMS"
              description="An open-source building management system written in pure Rust — built for reliability, speed, and transparency."
              language="Rust"
              languageColor="var(--accent-rust)"
              meta="Open Source"
              href="https://rbhans.github.io/opencrate-site/"
              images={opencrateImages}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
