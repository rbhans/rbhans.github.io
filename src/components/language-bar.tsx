"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function LanguageBar({
  languages,
}: {
  languages: { name: string; color: string; percent: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="paper-ruled border border-[var(--paper-border)] p-4"
    >
      <p className="font-mono text-[9px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]">
        Languages · Spectrum
      </p>
      <div className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            className="rounded-full"
            style={{ backgroundColor: lang.color }}
            initial={{ flex: 0 }}
            animate={isInView ? { flex: lang.percent } : { flex: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-[var(--paper-ink-muted)]">
        {languages.map((lang) => (
          <span key={lang.name} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            {lang.name} {lang.percent}%
          </span>
        ))}
      </div>
    </div>
  );
}
