"use client";

import { ScrollReveal } from "./scroll-reveal";
import { RotatingImage } from "./rotating-image";
import { Lightbox } from "./lightbox";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const currentlyPlaying = [
  { title: "Slay the Spire 2" },
  { title: "Mewgenics" },
];

function LifeCard({
  title,
  caption,
  images,
  icons,
  delay,
}: {
  title: string;
  caption: string;
  images: string[] | null;
  icons?: string[];
  delay: number;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <ScrollReveal delay={delay}>
        <motion.div
          className="overflow-hidden rounded-xl border border-[var(--stone-200)] bg-white"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative h-36 overflow-hidden bg-[var(--stone-200)]">
            {images && images.length > 0 ? (
              <RotatingImage
                images={images}
                alt={title}
                interval={25000}
                sizes="(max-width: 640px) 100vw, 33vw"
                onClick={() => setLightboxOpen(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center gap-3 bg-gradient-to-br from-[var(--stone-100)] to-[var(--stone-200)]">
                {icons?.map((icon, j) => (
                  <span key={j} className="text-3xl opacity-60">
                    {icon}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-[family-name:var(--font-playfair)] text-[13px] text-[var(--stone-900)]">
              {title}
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--stone-500)]">
              {caption}
            </p>
          </div>
        </motion.div>
      </ScrollReveal>

      <AnimatePresence>
        {lightboxOpen && images && (
          <Lightbox
            images={images}
            alt={title}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

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
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
          Beyond the Keyboard
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          Life
        </h2>
      </ScrollReveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <LifeCard
          title="On the Trail"
          caption="Exploring Tucson's desert trails and beyond whenever I get the chance."
          images={hikingImages}
          delay={0.1}
        />
        <LifeCard
          title="Family"
          caption="Wife and son — the best adventure partners."
          images={familyImages}
          delay={0.2}
        />
        <LifeCard
          title="Tech & Gaming"
          caption="Mac, PS5, Steam Deck. Currently diving into self-hosting and homelab setups."
          images={null}
          icons={["💻", "🎮", "🖥️"]}
          delay={0.3}
        />
      </div>

      {/* Currently Playing */}
      <ScrollReveal delay={0.3}>
        <div className="mt-5 rounded-xl border border-[var(--stone-200)] bg-white p-4">
          <p className="text-[10px] font-medium uppercase tracking-[2px] text-[var(--stone-400)]">
            Currently Playing
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {currentlyPlaying.map((game) => (
              <span
                key={game.title}
                className="rounded-md border border-[var(--stone-200)] bg-[var(--stone-100)] px-2.5 py-1 text-[11px] text-[var(--stone-600)]"
              >
                🎮 {game.title}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
