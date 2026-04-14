"use client";

import { ScrollReveal } from "./scroll-reveal";
import { motion } from "framer-motion";

const groups = [
  {
    title: "Building Automation",
    stamp: "Field I",
    tags: [
      "JCI Metasys",
      "Tridium Niagara",
      "Schneider EcoStruxure",
      "BAS UI/Graphic Design",
    ],
  },
  {
    title: "Design & Tools",
    stamp: "Field II",
    tags: ["Adobe Illustrator", "Photoshop", "Affinity", "MS Office", "Claude Code", "Codex"],
  },
  {
    title: "Development",
    stamp: "Field III",
    tags: ["Rust", "TypeScript", "Electron", "Tauri", "Open Source"],
  },
  {
    title: "Interests",
    stamp: "Field IV",
    tags: [
      "Smart Buildings",
      "Green Building Energy",
      "Sustainable Design",
      "AI/ML Applications",
      "UI Design",
      "Hiking",
      "Formula 1",
      "Video Games",
      "Self-Hosting",
    ],
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const tagVariant = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

export function SkillsSection() {
  return (
    <section id="skills">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--paper-ink-muted)]">
          Toolkit
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          Skills &amp; Interests
        </h2>
      </ScrollReveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {groups.map((group, gi) => (
          <ScrollReveal key={group.title} delay={gi * 0.08}>
            <div className="paper-ruled h-full border border-[var(--paper-border)] p-4">
              <div className="flex items-baseline justify-between border-b border-dashed border-[var(--paper-border-strong)] pb-2">
                <h3 className="font-[family-name:var(--font-playfair)] text-[14px] text-[var(--stone-900)]">
                  {group.title}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--paper-ink-muted)]">
                  {group.stamp}
                </span>
              </div>
              <motion.div
                className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[1px] text-[var(--paper-ink-muted)]"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {group.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={tagVariant}
                    className="border-b border-dotted border-[var(--paper-border-strong)] pb-px"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
