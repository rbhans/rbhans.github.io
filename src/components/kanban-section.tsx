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

interface Stage {
  key: Status;
  numeral: string;
  stamp: string;
  sub: string;
}

const stages: Stage[] = [
  { key: "backlog", numeral: "I", stamp: "Trailhead", sub: "Planned routes" },
  { key: "in-progress", numeral: "II", stamp: "Ascent", sub: "Currently climbing" },
  { key: "live", numeral: "III", stamp: "Summit", sub: "Flag planted" },
];

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
      title: "QAG Vectortology",
      description: "Meta-tagged vector symbol library exposing tags for haystack-style queries.",
      tags: ["Niagara Module"],
    },
    {
      title: "NiagaraFalls",
      description: "Niagara service exposing station point reads and subscriptions as a clean WebSocket API for external apps.",
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

function StageIcon({ stage }: { stage: Status }) {
  const stroke = "#5a4a2a";
  if (stage === "backlog") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </svg>
    );
  }
  if (stage === "in-progress") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
        <path d="M2 20 L9 10 L12 14 L16 6 L22 20 Z" />
        <path d="M9 17 L15 17" strokeDasharray="1 2" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3">
      <path d="M2 20 L9 8 L13 14 L17 4 L22 20 Z" fill={stroke} fillOpacity="0.25" />
      <path d="M17 4 L17 10 L21 8.5 L17 6.5" fill={stroke} fillOpacity="0.9" />
    </svg>
  );
}

function compassGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 L14 12 L12 21 L10 12 Z" fill="currentColor" opacity="0.3" />
      <path d="M3 12 L12 14 L21 12 L12 10 Z" />
    </svg>
  );
}

function Entry({ project, index }: { project: Project; index: number }) {
  const entryNo = String(index + 1).padStart(2, "0");
  const content = (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      className="relative flex items-center gap-4 py-3 pl-3 pr-3.5"
    >
      <div className="absolute inset-y-2 left-10 w-px bg-[var(--paper-red)]" />
      <div className="flex shrink-0 items-center justify-center text-[var(--stone-600)]">
        {compassGlyph()}
      </div>
      <div className="min-w-0 flex-1 pl-3">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-[family-name:var(--font-playfair)] text-[14px] text-[var(--stone-900)]">
            {project.title}
          </h4>
          <span className="shrink-0 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-500)]">
            Entry · {entryNo}
          </span>
        </div>
        {project.description && (
          <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-[11px] italic leading-relaxed text-[var(--stone-700)]">
            {project.description}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-600)]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-b border-dotted border-[var(--paper-border-strong)] pb-px"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

function ElevationProfile({ counts }: { counts: number[] }) {
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  const points = [
    { x: 10, y: 44 },
    { x: 60, y: 28 },
    { x: 110, y: 12 },
  ];
  const path = `M0 50 L${points[0].x} ${points[0].y} L${points[1].x} ${points[1].y} L${points[2].x} ${points[2].y} L120 8`;
  return (
    <svg width="120" height="50" viewBox="0 0 120 50" className="shrink-0">
      <path d={path} fill="none" stroke="#5a4a2a" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.7" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2.5" fill="#5a4a2a" />
          <text
            x={p.x}
            y={p.y - 6}
            fontSize="7"
            fill="#5a4a2a"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            opacity="0.8"
          >
            {Math.round((counts[i] / total) * 100)}%
          </text>
        </g>
      ))}
    </svg>
  );
}

export function KanbanSection() {
  const counts = stages.map((s) => projects[s.key].length);

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

      <ScrollReveal delay={0.1}>
        <div className="mt-6 relative">
          <div className="absolute -top-2 left-10 z-10 h-5 w-16 rotate-[-3deg] bg-[var(--paper-washi)] opacity-55" />
          <div className="absolute -top-2 right-10 z-10 h-5 w-20 rotate-[2deg] bg-[var(--paper-washi)] opacity-55" />
          <div className="paper-ruled relative border border-[var(--paper-border)] px-5 py-5 sm:px-7">
            {/* Spread header */}
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-[var(--paper-border-strong)] pb-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[2px] text-[var(--stone-700)]">
                  Expedition Log · Vol. IV
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-[18px] leading-tight text-[var(--stone-900)]">
                  Routes in Progress
                </h3>
                <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-[11px] italic text-[var(--stone-700)]">
                  From trailhead to summit, the current ascent.
                </p>
              </div>
              <ElevationProfile counts={counts} />
            </div>

            {/* Stages */}
            <div className="mt-5 space-y-6">
              {stages.map((stage, si) => {
                const items = projects[stage.key];
                if (items.length === 0) return null;
                return (
                  <div key={stage.key} className="relative">
                    {/* Stage stamp header */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--paper-border-strong)] bg-[var(--paper-card)]/70">
                        <StageIcon stage={stage.key} />
                      </div>
                      <div className="flex min-w-0 items-baseline gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--stone-600)]">
                          Stage {stage.numeral}
                        </span>
                        <span className="text-[var(--stone-500)]">·</span>
                        <h4 className="font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
                          {stage.stamp}
                        </h4>
                        <span className="font-[family-name:var(--font-playfair)] text-[11px] italic text-[var(--stone-600)]">
                          {stage.sub}
                        </span>
                      </div>
                      <span className="ml-auto shrink-0 border border-[var(--paper-border-strong)] bg-[var(--paper-card)]/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--paper-ink-muted)]">
                        {items.length}
                      </span>
                    </div>

                    {/* Entries */}
                    <div className="mt-2 pl-1">
                      {items.map((project, i) => (
                        <Entry key={project.title} project={project} index={i} />
                      ))}
                    </div>

                    {/* Trail connector to next stage */}
                    {si < stages.length - 1 && (
                      <div className="mt-4 flex items-center gap-2 pl-4">
                        <svg width="100%" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" className="flex-1">
                          <path
                            d="M0 5 Q 50 -2 100 5 T 200 5"
                            fill="none"
                            stroke="#5a4a2a"
                            strokeWidth="1"
                            strokeDasharray="2 3"
                            opacity="0.5"
                          />
                        </svg>
                        <span className="shrink-0 font-mono text-[8px] uppercase tracking-[2px] text-[var(--stone-600)]">
                          ↓ onward
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
