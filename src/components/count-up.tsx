"use client";

import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
