"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KanbanSection } from "./kanban-section";

export function KanbanPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tab handle — fixed to right edge */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 z-30 -translate-y-1/2 rounded-l-lg border border-r-0 border-[var(--paper-border)] bg-[var(--paper-card)]/90 px-2 py-4 shadow-sm backdrop-blur transition-all hover:bg-[var(--paper-card-deep)] hover:px-3"
      >
        <span
          className="block font-mono text-[10px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]"
          style={{ writingMode: "vertical-rl" }}
        >
          Project Board
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

      {/* Panel — always mounted, translated off-screen when closed */}
      <motion.div
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed bottom-0 right-0 top-0 z-50 w-[340px] overflow-y-auto border-l border-[var(--paper-border)] bg-[var(--paper-bg)] p-6 shadow-xl sm:w-[380px] ${open ? "" : "pointer-events-none"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--stone-400)] transition-colors hover:bg-[var(--stone-200)] hover:text-[var(--stone-900)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <KanbanSection />
      </motion.div>
    </>
  );
}
