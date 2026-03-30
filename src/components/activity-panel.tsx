"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ActivityPanel({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tab handle — fixed to right edge, below project board tab */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-[calc(50%+70px)] z-30 rounded-l-lg border border-r-0 border-[var(--stone-300)] bg-white/90 px-2 py-4 shadow-sm backdrop-blur transition-all hover:bg-[var(--stone-100)] hover:px-3"
      >
        <span
          className="block text-[10px] font-medium uppercase tracking-[2px] text-[var(--stone-500)]"
          style={{ writingMode: "vertical-rl" }}
        >
          Activity
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel — always mounted so server children render, but translated off-screen when closed */}
      <motion.div
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed bottom-0 right-0 top-0 z-50 w-[340px] overflow-y-auto border-l border-[var(--stone-200)] bg-[var(--stone-50)] p-6 shadow-xl sm:w-[380px] ${open ? "" : "pointer-events-none"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--stone-400)] transition-colors hover:bg-[var(--stone-200)] hover:text-[var(--stone-900)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {children}
      </motion.div>
    </>
  );
}
