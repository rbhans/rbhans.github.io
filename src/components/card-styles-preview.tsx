"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const sampleProject = {
  title: "QAG Foxhound",
  description: "Assistive tools for Niagara Framework.",
  tags: ["Electron", "Niagara"],
};

const sampleLife = {
  title: "On the Trail",
  caption: "Exploring Tucson's desert trails and beyond whenever I get the chance.",
};

function StyleHeader({ label, blurb }: { label: string; blurb: string }) {
  return (
    <div className="mb-3">
      <p className="text-[10px] font-medium uppercase tracking-[2px] text-[var(--stone-400)]">
        {label}
      </p>
      <p className="mt-1 text-[11px] text-[var(--stone-500)]">{blurb}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLE 1 — Editorial
// No heavy borders. Image dominates. Caption reveals on hover.
// Asymmetric sizes. Serif-forward.
// ─────────────────────────────────────────────
function EditorialLifeCard({ image }: { image: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group relative overflow-hidden rounded-sm"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-64 w-full">
        <Image src={image} alt={sampleLife.title} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="text-[9px] font-medium uppercase tracking-[3px] opacity-80">
          Beyond the Keyboard
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl">
          {sampleLife.title}
        </h3>
        <motion.p
          initial={false}
          animate={{ height: hover ? "auto" : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden text-[11px] leading-relaxed"
        >
          <span className="mt-2 block">{sampleLife.caption}</span>
        </motion.p>
      </div>
    </div>
  );
}

function EditorialProjectCard() {
  return (
    <div className="border-l-2 border-[var(--stone-900)] pl-4 py-2">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
          {sampleProject.title}
        </h4>
        <div className="flex shrink-0 gap-2 text-[9px] uppercase tracking-[1.5px] text-[var(--stone-400)]">
          {sampleProject.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
        {sampleProject.description}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLE 2 — Paper/Zine
// Subtle noise, offset double-border, printed feel.
// ─────────────────────────────────────────────
function PaperLifeCard({ image }: { image: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-md bg-[var(--stone-900)]" />
      <div className="relative overflow-hidden rounded-md border border-[var(--stone-900)] bg-[var(--stone-50)]">
        <div className="relative h-40 w-full">
          <Image src={image} alt={sampleLife.title} fill className="object-cover grayscale-[20%]" sizes="50vw" />
        </div>
        <div className="border-t border-[var(--stone-900)] p-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--stone-900)]" />
            <p className="text-[9px] font-medium uppercase tracking-[2px] text-[var(--stone-900)]">
              Field Log · 04
            </p>
          </div>
          <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
            {sampleLife.title}
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-600)]">
            {sampleLife.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function PaperProjectCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-[var(--stone-900)]" />
      <div className="relative rounded-md border border-[var(--stone-900)] bg-[var(--stone-50)] p-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-[family-name:var(--font-playfair)] text-[13px] text-[var(--stone-900)]">
            {sampleProject.title}
          </h4>
          <div className="flex shrink-0 flex-wrap gap-1">
            {sampleProject.tags.map((t) => (
              <span
                key={t}
                className="border border-[var(--stone-900)] px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[1px] text-[var(--stone-900)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-600)]">
          {sampleProject.description}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLE 3 — Interactive / tactile
// 3D tilt on hover, soft shadow, rounded, tag pills slide in.
// ─────────────────────────────────────────────
function TiltLifeCard({ image }: { image: string }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ rotateX: -4, rotateY: 4, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformPerspective: 800 }}
      className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-[var(--stone-200)]/60"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <motion.div
          animate={{ scale: hover ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image src={image} alt={sampleLife.title} fill className="object-cover" sizes="50vw" />
        </motion.div>
      </div>
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-[14px] text-[var(--stone-900)]">
          {sampleLife.title}
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
          {sampleLife.caption}
        </p>
      </div>
    </motion.div>
  );
}

function TiltProjectCard() {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ y: -3 }}
      className="rounded-2xl bg-white p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-[var(--stone-200)]/60"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-[13px] font-medium text-[var(--stone-900)]">
          {sampleProject.title}
        </h4>
        <motion.div
          animate={{ x: hover ? 0 : 6, opacity: hover ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="flex shrink-0 gap-1"
        >
          {sampleProject.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[var(--stone-100)] px-2 py-0.5 text-[9px] font-medium text-[var(--stone-500)]"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
        {sampleProject.description}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// STYLE 4 — Editorial + Topo overlay
// Editorial base, SVG topo contour behind titles + as divider.
// ─────────────────────────────────────────────
const topoSvg = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='160' viewBox='0 0 240 160' fill='none' stroke='%23a8a29e' stroke-width='0.6' opacity='0.35'>
    <path d='M-10 120 Q 40 90 90 110 T 190 100 T 260 115'/>
    <path d='M-10 100 Q 40 70 90 90 T 190 80 T 260 95'/>
    <path d='M-10 80 Q 50 50 100 70 T 200 60 T 260 75'/>
    <path d='M-10 60 Q 60 30 110 50 T 210 40 T 260 55'/>
    <path d='M-10 40 Q 70 15 120 30 T 220 22 T 260 35'/>
    <path d='M-10 140 Q 30 110 80 125 T 180 120 T 260 135'/>
  </svg>`.replace(/\n\s*/g, " ")
);
const topoBg = `url("data:image/svg+xml;utf8,${topoSvg}")`;

function TopoLifeCard({ image }: { image: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group relative overflow-hidden rounded-sm"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-64 w-full">
        <Image src={image} alt={sampleLife.title} fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{ backgroundImage: topoBg, backgroundSize: "240px 160px" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <p className="font-mono text-[9px] uppercase tracking-[3px] opacity-80">
          32.22°N · 110.92°W
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl">
          {sampleLife.title}
        </h3>
        <motion.p
          initial={false}
          animate={{ height: hover ? "auto" : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden text-[11px] leading-relaxed"
        >
          <span className="mt-2 block">{sampleLife.caption}</span>
        </motion.p>
      </div>
    </div>
  );
}

function TopoProjectCard() {
  return (
    <div
      className="relative border-l-2 border-[var(--stone-900)] py-2 pl-4"
      style={{ backgroundImage: topoBg, backgroundSize: "200px 140px", backgroundPosition: "right center", backgroundRepeat: "no-repeat" }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-[family-name:var(--font-playfair)] text-[15px] text-[var(--stone-900)]">
          {sampleProject.title}
        </h4>
        <div className="flex shrink-0 gap-2 text-[9px] uppercase tracking-[1.5px] text-[var(--stone-400)]">
          {sampleProject.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
        {sampleProject.description}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLE 5 — Trail marker
// Mono coordinate stamps, thin hairlines, ranger-sign caps.
// ─────────────────────────────────────────────
function TrailLifeCard({ image }: { image: string }) {
  return (
    <div className="border-t border-b border-[var(--stone-900)] py-4">
      <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[2px] text-[var(--stone-500)]">
        <span>N 32°13&apos; W 110°55&apos;</span>
        <span>ELEV 4,687 FT</span>
      </div>
      <div className="relative h-56 w-full overflow-hidden">
        <Image src={image} alt={sampleLife.title} fill className="object-cover" sizes="50vw" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          {sampleLife.title.toUpperCase()}
        </h3>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--stone-500)]">
          · 04 ·
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
        {sampleLife.caption}
      </p>
    </div>
  );
}

function TrailProjectCard() {
  return (
    <div className="border-b border-[var(--stone-300)] py-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--stone-400)]">
          TRL-04
        </span>
        <h4 className="font-[family-name:var(--font-playfair)] text-[14px] text-[var(--stone-900)]">
          {sampleProject.title.toUpperCase()}
        </h4>
        <div className="ml-auto flex shrink-0 gap-2 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-500)]">
          {sampleProject.tags.map((t) => (
            <span key={t}>· {t}</span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
        {sampleProject.description}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// STYLE 6 — Field guide
// Kraft card bg, hand-drawn glyphs, serif italic captions.
// ─────────────────────────────────────────────
const kraftBg = "#e9e1d0";

function FieldLifeCard({ image }: { image: string }) {
  return (
    <div className="relative">
      {/* washi tape corners */}
      <div className="absolute -top-2 left-6 z-10 h-5 w-16 rotate-[-4deg] bg-[#c9b88a]/70" />
      <div className="absolute -top-2 right-6 z-10 h-5 w-16 rotate-[3deg] bg-[#c9b88a]/70" />
      <div
        className="relative p-5"
        style={{
          backgroundColor: kraftBg,
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 23px, rgba(120,90,40,0.08) 23px, rgba(120,90,40,0.08) 24px)`,
        }}
      >
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-[var(--stone-700)]/40 pb-2 font-mono text-[9px] uppercase tracking-[2px] text-[var(--stone-700)]">
          <span>Field Log · Vol. IV</span>
          <span>14.iv.26</span>
        </div>
        <div className="relative h-44 w-full overflow-hidden border border-[var(--stone-700)]/30">
          <Image src={image} alt={sampleLife.title} fill className="object-cover sepia-[25%] saturate-[0.85]" sizes="50vw" />
          <div className="absolute left-2 top-2 bg-[#f4ecd6] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-700)]">
            Plate I
          </div>
        </div>
        <div className="mt-3 flex items-start gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#5a4a2a" strokeWidth="1.2" className="mt-0.5 shrink-0">
            <path d="M2 26 L10 12 L14 18 L20 6 L30 26 Z" />
            <path d="M8 20 L12 20 M18 14 L24 14" strokeDasharray="1 2" />
          </svg>
          <div className="min-w-0 flex-1">
            <h3 className="font-[family-name:var(--font-playfair)] text-[18px] leading-tight text-[var(--stone-900)]">
              {sampleLife.title}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-playfair)] text-[12px] italic leading-relaxed text-[var(--stone-700)]">
              &ldquo;{sampleLife.caption}&rdquo;
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--stone-600)]">
              32°13&apos;N · 110°55&apos;W · 4,687 ft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldProjectCard() {
  return (
    <div
      className="relative flex items-center gap-4 py-3 pl-3 pr-3.5"
      style={{
        backgroundColor: kraftBg,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 21px, rgba(120,90,40,0.07) 21px, rgba(120,90,40,0.07) 22px)`,
      }}
    >
      {/* left bound edge */}
      <div className="absolute inset-y-2 left-10 w-px bg-[#c26767]/40" />
      <div className="flex shrink-0 items-center justify-center text-[var(--stone-600)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3 L14 12 L12 21 L10 12 Z" fill="currentColor" opacity="0.3" />
          <path d="M3 12 L12 14 L21 12 L12 10 Z" />
        </svg>
      </div>
      <div className="min-w-0 flex-1 pl-3">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="font-[family-name:var(--font-playfair)] text-[14px] text-[var(--stone-900)]">
            {sampleProject.title}
          </h4>
          <span className="font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-500)]">
            Entry · 04
          </span>
        </div>
        <p className="mt-0.5 font-[family-name:var(--font-playfair)] text-[11px] italic leading-relaxed text-[var(--stone-700)]">
          {sampleProject.description}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--stone-600)]">
          {sampleProject.tags.map((t) => (
            <span key={t} className="border-b border-dotted border-[var(--stone-600)]/50 pb-px">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────

export function CardStyles({ hikingImages }: { hikingImages: string[] }) {
  const img = hikingImages[0] ?? "/hiking/placeholder.jpg";

  return (
    <div className="mt-10 space-y-14">
      <section>
        <StyleHeader
          label="Option 1 · Editorial"
          blurb="Borderless. Image-dominant life cards with overlay + reveal. Project cards become typographic list items with a left rule. Magazine/masthead energy."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <EditorialLifeCard image={img} />
          <div className="flex flex-col justify-center gap-4">
            <EditorialProjectCard />
            <EditorialProjectCard />
            <EditorialProjectCard />
          </div>
        </div>
      </section>

      <section>
        <StyleHeader
          label="Option 2 · Paper / Zine"
          blurb="Hard black outline, offset drop-shadow block, numbered labels, grayscale-tinted photos. Printed-zine / field-journal vibe — pairs with Playfair."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <PaperLifeCard image={img} />
          <div className="flex flex-col justify-center gap-3">
            <PaperProjectCard />
            <PaperProjectCard />
          </div>
        </div>
      </section>

      <section>
        <StyleHeader
          label="Option 3 · Tactile / tilt"
          blurb="Soft shadows, larger radius, subtle 3D tilt on hover, image zoom, tag pills slide in. Modern product-site feel — closest to the current style but with more life."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TiltLifeCard image={img} />
          <div className="flex flex-col justify-center gap-3">
            <TiltProjectCard />
            <TiltProjectCard />
          </div>
        </div>
      </section>

      <section>
        <StyleHeader
          label="Option 4 · Editorial + Topo"
          blurb="Editorial base with SVG contour-line overlay on photos and behind project rows. Coordinates replace the kicker. Ties to the animated topo background."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TopoLifeCard image={img} />
          <div className="flex flex-col justify-center gap-4">
            <TopoProjectCard />
            <TopoProjectCard />
            <TopoProjectCard />
          </div>
        </div>
      </section>

      <section>
        <StyleHeader
          label="Option 5 · Trail marker"
          blurb="Monospace coordinate + elevation stamps, ranger-sign caps, hairline rules instead of cards. Feels like a trailhead placard or a USGS quadrangle entry."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TrailLifeCard image={img} />
          <div className="flex flex-col justify-center gap-1">
            <TrailProjectCard />
            <TrailProjectCard />
            <TrailProjectCard />
          </div>
        </div>
      </section>

      <section>
        <StyleHeader
          label="Option 6 · Field guide"
          blurb="Kraft-paper card bg, subtle sepia photos, hand-drawn mountain/compass glyphs, italic Playfair captions. Pocket field-journal / naturalist notebook feel."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldLifeCard image={img} />
          <div className="flex flex-col justify-center gap-3">
            <FieldProjectCard />
            <FieldProjectCard />
          </div>
        </div>
      </section>
    </div>
  );
}
