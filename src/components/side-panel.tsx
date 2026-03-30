"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SidePanel({
  projectBoard,
  activityFeed,
}: {
  projectBoard: ReactNode;
  activityFeed: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"board" | "activity">("board");

  return (
    <>
      {/* Single tab handle on right edge */}
      <div className="fixed right-0 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1">
        <button
          onClick={() => { setTab("board"); setOpen(true); }}
          className="rounded-l-lg border border-r-0 border-[var(--stone-300)] bg-white/90 px-2 py-3 shadow-sm backdrop-blur transition-all hover:bg-[var(--stone-100)] hover:px-3"
        >
          <span
            className="block text-[9px] font-medium uppercase tracking-[2px] text-[var(--stone-500)]"
            style={{ writingMode: "vertical-rl" }}
          >
            Projects
          </span>
        </button>
        <button
          onClick={() => { setTab("activity"); setOpen(true); }}
          className="rounded-l-lg border border-r-0 border-[var(--stone-300)] bg-white/90 px-2 py-3 shadow-sm backdrop-blur transition-all hover:bg-[var(--stone-100)] hover:px-3"
        >
          <span
            className="block text-[9px] font-medium uppercase tracking-[2px] text-[var(--stone-500)]"
            style={{ writingMode: "vertical-rl" }}
          >
            Activity
          </span>
        </button>
      </div>

      {/* Backdrop */}
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

      {/* Panel */}
      <motion.div
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        role="dialog"
        aria-label="Side panel"
        aria-hidden={!open}
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-[340px] flex-col border-l border-[var(--stone-200)] bg-[var(--stone-50)] shadow-xl sm:w-[380px] ${open ? "" : "pointer-events-none"}`}
      >
        {/* Header with tabs + close */}
        <div className="flex items-center border-b border-[var(--stone-200)] px-4 py-3">
          <div className="flex gap-1">
            <button
              onClick={() => setTab("board")}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
                tab === "board"
                  ? "bg-[var(--stone-900)] text-white"
                  : "text-[var(--stone-500)] hover:bg-[var(--stone-200)]"
              }`}
            >
              Project Board
            </button>
            <button
              onClick={() => setTab("activity")}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition-colors ${
                tab === "activity"
                  ? "bg-[var(--stone-900)] text-white"
                  : "text-[var(--stone-500)] hover:bg-[var(--stone-200)]"
              }`}
            >
              Activity
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-[var(--stone-400)] transition-colors hover:bg-[var(--stone-200)] hover:text-[var(--stone-900)]"
          >
            <span className="sr-only">Close panel</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className={tab === "board" ? "" : "hidden"}>
            {projectBoard}
          </div>
          <div className={tab === "activity" ? "" : "hidden"}>
            {activityFeed}
          </div>
        </div>
      </motion.div>
    </>
  );
}
