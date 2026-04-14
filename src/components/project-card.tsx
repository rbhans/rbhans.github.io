"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RotatingImage } from "./rotating-image";
import { Lightbox } from "./lightbox";

export function ProjectCard({
  name,
  description,
  language,
  languageColor,
  meta,
  href,
  images,
  imageInterval = 45000,
  plate,
}: {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  meta: string;
  href: string;
  images?: string[];
  imageInterval?: number;
  plate?: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="paper-ruled block overflow-hidden border border-[var(--paper-border)] p-4 transition-colors"
      >
        <div className="mb-3 flex items-center justify-between border-b border-dashed border-[var(--paper-border-strong)] pb-2 font-mono text-[9px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]">
          <span>Specimen · {plate ?? "—"}</span>
          <span>{meta}</span>
        </div>
        {images && images.length > 0 && (
          <div
            className="relative h-40 w-full overflow-hidden border border-[var(--paper-border-strong)]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLightboxOpen(true);
            }}
          >
            <RotatingImage
              images={images}
              alt={name}
              interval={imageInterval}
              className="object-top sepia-[15%] saturate-[0.95]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="mt-3">
          <h3 className="font-[family-name:var(--font-playfair)] text-[17px] leading-tight text-[var(--stone-900)]">
            {name}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-playfair)] text-[12px] italic leading-relaxed text-[var(--paper-ink-muted)]">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[1.5px] text-[var(--paper-ink-muted)]">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              {language}
            </span>
          </div>
        </div>
      </motion.a>

      <AnimatePresence>
        {lightboxOpen && images && (
          <Lightbox images={images} alt={name} onClose={() => setLightboxOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
