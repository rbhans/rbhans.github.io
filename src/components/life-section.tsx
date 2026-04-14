"use client";

import { ScrollReveal } from "./scroll-reveal";
import { RotatingImage } from "./rotating-image";
import { Lightbox } from "./lightbox";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function LifeCard({
  title,
  caption,
  images,
  plate,
  coords,
  glyph,
  delay,
}: {
  title: string;
  caption: string;
  images: string[];
  plate: string;
  coords: string;
  glyph: React.ReactNode;
  delay: number;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <ScrollReveal delay={delay}>
        <motion.div
          className="relative"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -top-2 left-6 z-10 h-5 w-16 rotate-[-4deg] bg-[var(--paper-washi)] opacity-55" />
          <div className="absolute -top-2 right-6 z-10 h-5 w-16 rotate-[3deg] bg-[var(--paper-washi)] opacity-55" />
          <div className="paper-ruled relative border border-[var(--paper-border)] p-5">
            <div className="mb-3 flex items-center justify-between border-b border-dashed border-[var(--paper-border-strong)] pb-2 font-mono text-[9px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]">
              <span>Field Log · {plate}</span>
              <span>{coords}</span>
            </div>
            <div
              className="relative h-40 w-full cursor-pointer overflow-hidden border border-[var(--paper-border-strong)]"
              onClick={() => setLightboxOpen(true)}
            >
              <RotatingImage
                images={images}
                alt={title}
                interval={25000}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="sepia-[20%] saturate-[0.9]"
              />
              <div className="absolute left-2 top-2 bg-[var(--paper-card)] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[1.5px] text-[var(--paper-ink-muted)]">
                {plate}
              </div>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <div className="mt-0.5 shrink-0 text-[var(--paper-ink-muted)]">{glyph}</div>
              <div className="min-w-0 flex-1">
                <h3 className="font-[family-name:var(--font-playfair)] text-[17px] leading-tight text-[var(--stone-900)]">
                  {title}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-playfair)] text-[12px] italic leading-relaxed text-[var(--stone-700)] text-[var(--paper-ink-muted)]">
                  &ldquo;{caption}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox images={images} alt={title} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

const mountainGlyph = (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M2 26 L10 12 L14 18 L20 6 L30 26 Z" />
    <path d="M8 20 L12 20 M18 14 L24 14" strokeDasharray="1 2" />
  </svg>
);

const heartGlyph = (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M16 27 C 6 20, 3 13, 7 9 C 10 6, 14 8, 16 12 C 18 8, 22 6, 25 9 C 29 13, 26 20, 16 27 Z" />
    <path d="M10 14 L22 14" strokeDasharray="1 2" />
  </svg>
);

export function LifeSection({
  hikingImages,
  familyImages,
}: {
  hikingImages: string[];
  familyImages: string[];
}) {
  return (
    <section id="life">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--paper-ink-muted)]">
          Beyond the Keyboard
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          Life
        </h2>
      </ScrollReveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <LifeCard
          title="On the Trail"
          caption="Exploring Tucson's desert trails and beyond whenever I get the chance."
          images={hikingImages}
          plate="Plate I"
          coords="32°13'N · 110°55'W"
          glyph={mountainGlyph}
          delay={0.1}
        />
        <LifeCard
          title="Family"
          caption="Wife and son — the best adventure partners."
          images={familyImages}
          plate="Plate II"
          coords="Home Base"
          glyph={heartGlyph}
          delay={0.2}
        />
      </div>
    </section>
  );
}
