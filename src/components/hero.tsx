"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

function MountainMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M2 20 L9 10 L13 14 L17 6 L22 20 Z" />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const nameY = useTransform(scrollY, [0, 400], [0, -25]);
  const bioY = useTransform(scrollY, [0, 400], [0, -10]);
  const heroOpacity = useTransform(scrollY, [200, 450], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[var(--stone-900)] pb-14 pt-20 md:pb-20 md:pt-28"
    >
      {/* Washi tape corner */}
      <div className="absolute left-6 top-4 z-10 h-5 w-20 rotate-[-4deg] bg-[var(--paper-washi)] opacity-60 md:left-10" />

      {/* Top frame rule */}
      <div className="absolute left-8 right-8 top-10 z-0 flex items-center gap-3 md:left-12 md:right-12">
        <div className="h-px flex-1 bg-[var(--paper-washi)]/30" />
        <span className="font-mono text-[9px] uppercase tracking-[3px] text-[var(--paper-washi)]/70">
          Vol. IV · Est. MMXXVI
        </span>
        <div className="h-px flex-1 bg-[var(--paper-washi)]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-8 md:px-12">
        <motion.div style={{ y: nameY, opacity: heroOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[3px] text-[var(--paper-washi)]"
          >
            <span className="inline-block h-px w-8 bg-[var(--paper-washi)]/60" />
            Field Log of
          </motion.p>

          <h1 className="overflow-hidden font-[family-name:var(--font-playfair)] text-5xl tracking-tight text-[var(--paper-card)] md:text-6xl">
            <span className="sr-only">Ben Hansen</span>
            <span aria-hidden="true">
              <AnimatedText text="Ben Hansen" delay={0.1} />
            </span>
          </h1>

          <motion.div
            className="mt-4 flex items-center gap-3 text-[var(--paper-washi)]"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <MountainMark />
            <p className="font-mono text-[10px] uppercase tracking-[4px]">
              Engineer&ensp;&middot;&ensp;Designer&ensp;&middot;&ensp;Builder
            </p>
            <div className="h-px flex-1 bg-[var(--paper-washi)]/30" />
          </motion.div>
        </motion.div>

        <motion.div style={{ y: bioY, opacity: heroOpacity }}>
          <motion.p
            className="mt-6 max-w-lg font-[family-name:var(--font-playfair)] text-[15px] italic leading-relaxed text-[var(--stone-300)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          >
            &ldquo;Mechanical engineer with a focus on BAS graphic and UI design.
            Building open-source tools, community resources, and better
            workflows for the building automation industry.&rdquo;
          </motion.p>

          <motion.p
            className="mt-4 font-mono text-[9px] uppercase tracking-[3px] text-[var(--paper-washi)]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            — Based Tucson, AZ · 32°13&prime;N 110°55&prime;W
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom frame rule */}
      <div className="absolute bottom-6 left-8 right-8 z-0 flex items-center gap-3 md:left-12 md:right-12">
        <div className="h-px flex-1 bg-[var(--paper-washi)]/30" />
        <span className="font-mono text-[9px] uppercase tracking-[3px] text-[var(--paper-washi)]/60">
          ↓ Ascent Begins
        </span>
        <div className="h-px flex-1 bg-[var(--paper-washi)]/30" />
      </div>
    </section>
  );
}
