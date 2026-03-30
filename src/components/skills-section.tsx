"use client";

import { ScrollReveal } from "./scroll-reveal";
import { motion } from "framer-motion";

const groups = [
  {
    title: "Building Automation",
    tags: [
      "JCI Metasys",
      "Tridium Niagara",
      "Schneider EcoStruxure",
      "BAS UI/Graphic Design",
    ],
  },
  {
    title: "Design & Tools",
    tags: ["Adobe Illustrator", "Photoshop", "Affinity", "MS Office", "Claude Code", "Codex"],
  },
  {
    title: "Development",
    tags: ["Rust", "TypeScript", "Electron", "Tauri", "Open Source"],
  },
  {
    title: "Interests",
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
  show: { transition: { staggerChildren: 0.06 } },
};

const tagVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function SkillsSection() {
  return (
    <section id="skills">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
          Toolkit
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          Skills &amp; Interests
        </h2>
      </ScrollReveal>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {groups.map((group, gi) => (
          <ScrollReveal key={group.title} delay={gi * 0.1}>
            <h3 className="text-[11px] font-medium uppercase tracking-[2px] text-[var(--stone-400)]">
              {group.title}
            </h3>
            <motion.div
              className="mt-2 flex flex-wrap gap-1.5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {group.tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariant}
                  className="rounded-md border border-[var(--stone-200)] bg-[var(--stone-100)] px-2.5 py-1 text-[11px] text-[var(--stone-600)]"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
