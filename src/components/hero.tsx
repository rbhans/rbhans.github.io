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

function HeroContours() {
  const lines = [
    { d: "M-50,30 Q200,10 400,28 Q600,48 800,22 Q1000,8 1200,30", delay: 0.6, w: 1.2 },
    { d: "M-50,48 Q200,30 400,46 Q600,64 800,42 Q1000,28 1200,48", delay: 0.8, w: 0.9 },
    { d: "M-50,65 Q200,50 400,62 Q600,78 800,58 Q1000,46 1200,64", delay: 1.0, w: 0.7 },
    { d: "M-50,110 Q150,95 350,108 Q550,122 750,100 Q950,88 1150,106", delay: 0.9, w: 1.0 },
    { d: "M-50,125 Q150,112 350,123 Q550,136 750,118 Q950,106 1150,122", delay: 1.1, w: 0.7 },
    { d: "M-50,140 Q150,130 350,138 Q550,148 750,134 Q950,124 1150,136", delay: 1.3, w: 0.5 },
  ];

  return (
    <svg
      viewBox="0 0 1100 160"
      fill="none"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      {lines.map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke="#292524"
          strokeWidth={line.w}
          strokeLinecap="round"
          opacity={0.1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{
            pathLength: { duration: 2.5, delay: line.delay, ease: "easeInOut" },
            opacity: { duration: 0.3, delay: line.delay },
          }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const nameY = useTransform(scrollY, [0, 400], [0, -25]);
  const bioY = useTransform(scrollY, [0, 400], [0, -10]);
  const contoursY = useTransform(scrollY, [0, 400], [0, 12]);
  const heroOpacity = useTransform(scrollY, [200, 450], [1, 0]);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[var(--stone-900)] pb-12 pt-24 md:pb-16 md:pt-32">

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-8 md:px-12">
        <motion.div style={{ y: nameY, opacity: heroOpacity }}>
          <h1 className="overflow-hidden font-[family-name:var(--font-playfair)] text-5xl tracking-tight text-[var(--stone-50)] md:text-6xl">
            <span className="sr-only">Ben Hansen</span>
            <span aria-hidden="true"><AnimatedText text="Ben Hansen" delay={0.1} /></span>
          </h1>

          <motion.p
            className="mt-3 text-[11px] font-medium uppercase tracking-[4px] text-[var(--stone-500)]"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            Engineer&ensp;&middot;&ensp;Designer&ensp;&middot;&ensp;Builder
          </motion.p>
        </motion.div>

        <motion.div style={{ y: bioY, opacity: heroOpacity }}>
          <motion.p
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--stone-400)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Mechanical engineer with a focus on BAS graphic and UI design.
            Building open-source tools, community resources, and better
            workflows for the building automation industry. Based in Tucson, AZ.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
