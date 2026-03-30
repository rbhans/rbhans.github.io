"use client";

import { ScrollReveal } from "./scroll-reveal";
import { motion } from "framer-motion";

type Status = "backlog" | "in-progress" | "live";

interface Project {
  title: string;
  description?: string;
  tags?: string[];
  link?: string;
}

const columns: { key: Status; label: string; icon: string }[] = [
  { key: "backlog", label: "Backlog", icon: "○" },
  { key: "in-progress", label: "In Progress", icon: "◑" },
  { key: "live", label: "Live", icon: "●" },
];

// ── Edit this data to update the board ──
const projects: Record<Status, Project[]> = {
  backlog: [
    {
      title: "OpenBMS Agent",
      description: "An open, model-agnostic knowledge base and AI agent for building automation systems.",
      tags: ["AI", "BMS"],
    },
  ],
  "in-progress": [
    {
      title: "OpenCrate BMS",
      description: "Open-source building management system.",
      tags: ["Rust", "Open Source"],
      link: "https://rbhans.github.io/opencrate-site/",
    },
    {
      title: "QAG Foxhound",
      description: "Assistive tools for Niagara Framework.",
      tags: ["Electron"],
    },
    {
      title: "QAG Metassist",
      description: "Assistive tools for Metasys.",
      tags: ["Electron"],
    },
    {
      title: "QAG svgSmart",
      description: "Meta-tagged SVG with smart features.",
      tags: ["Niagara Module"],
    },
    {
      title: "QAG FloorView",
      description: "Floor plan viewer/editor for overlaying interactive zones, equipment markers, labels, and pinned points on building layouts.",
      tags: ["Niagara Module"],
    },
    {
      title: "QAG UI",
      description: "Author, manage, and publish dashboards, equipment graphics, floor plans, and site maps in a customizable UI.",
      tags: ["Niagara Module"],
    },
  ],
  live: [
    {
      title: "BASidekick",
      description: "Community reference for BAS professionals.",
      tags: ["TypeScript", "Web"],
      link: "https://basidekick.com",
    },
    {
      title: "QAG Charts",
      description: "Configurable dashboard, KPI, and advanced chart widgets for visualizing station and history data.",
      tags: ["Niagara Module"],
    },
    {
      title: "QAG SiteMap",
      description: "Leaflet-based interactive map view with configurable station-linked markers and styling.",
      tags: ["Niagara Module"],
    },
  ],
};

function KanbanCard({ project }: { project: Project }) {
  const inner = (
    <motion.div
      whileHover={{ x: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      transition={{ duration: 0.15 }}
      className="flex items-start gap-3 rounded-lg border border-[var(--stone-200)] bg-white px-3 py-2.5 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <h4 className="text-[12px] font-medium text-[var(--stone-900)]">
          {project.title}
        </h4>
        {project.description && (
          <p className="mt-0.5 text-[10px] leading-relaxed text-[var(--stone-500)]">
            {project.description}
          </p>
        )}
      </div>
      {project.tags && project.tags.length > 0 && (
        <div className="flex shrink-0 flex-wrap justify-end gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-[var(--stone-200)] bg-[var(--stone-100)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--stone-400)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

export function KanbanSection() {
  return (
    <section id="board">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
          What I&apos;m Working On
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          Project Board
        </h2>
      </ScrollReveal>

      <div className="mt-4 flex flex-col gap-3">
        {columns.map((col, ci) => {
          const items = projects[col.key];
          if (items.length === 0) return null;
          return (
            <ScrollReveal key={col.key} delay={ci * 0.1}>
              <div className="rounded-xl border border-[var(--stone-200)] bg-[var(--stone-100)]/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[11px] text-[var(--stone-400)]">
                    {col.icon}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[2px] text-[var(--stone-400)]">
                    {col.label}
                  </span>
                  <span className="ml-auto rounded-full bg-[var(--stone-200)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--stone-500)]">
                    {items.length}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {items.map((project) => (
                    <KanbanCard key={project.title} project={project} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
