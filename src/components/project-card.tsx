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
}: {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  meta: string;
  href: string;
  images?: string[];
  imageInterval?: number;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
        transition={{ duration: 0.2 }}
        className="block overflow-hidden rounded-xl border border-[var(--stone-200)] bg-white transition-colors"
      >
        {images && images.length > 0 && (
          <div
            className="relative h-36 w-full overflow-hidden bg-[var(--stone-100)]"
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
              className="object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-playfair)] text-base text-[var(--stone-900)]">
            {name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--stone-500)]">
            {description}
          </p>
          <div className="mt-3 flex gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--stone-400)]">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              {language}
            </span>
            <span>{meta}</span>
          </div>
        </div>
      </motion.a>

      <AnimatePresence>
        {lightboxOpen && images && (
          <Lightbox
            images={images}
            alt={name}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
