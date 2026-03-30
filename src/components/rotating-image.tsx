"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotatingImage({
  images,
  alt,
  interval = 25000,
  className = "",
  sizes,
  onClick,
}: {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
  sizes?: string;
  onClick?: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={onClick ? `View ${alt} gallery` : undefined}
      className={`block h-full w-full ${onClick ? "cursor-pointer" : ""}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            className={`object-cover ${className}`}
            sizes={sizes || "100vw"}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
