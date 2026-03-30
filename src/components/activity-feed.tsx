"use client";

import { type ActivityItem } from "@/lib/activity";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  switch (type) {
    case "commit":
      return (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--stone-200)] text-[var(--stone-500)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v6M12 16v6" />
          </svg>
        </div>
      );
    case "repo":
      return (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--stone-200)] text-[var(--stone-500)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      );
    case "note":
      return (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-sky)]/10 text-[var(--accent-sky)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
      );
  }
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <div className="text-center text-[11px] text-[var(--stone-400)]">
        No recent activity
      </div>
    );
  }

  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
        Recent Activity
      </p>
      <div className="mt-3 flex flex-col">
        {items.map((item, i) => {
          const inner = (
            <div className="group flex items-start gap-3 border-b border-[var(--stone-200)]/60 py-2.5 last:border-0">
              <ActivityIcon type={item.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] text-[var(--stone-900)] group-hover:text-[var(--accent-sky)]">
                  {item.title}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[var(--stone-400)]">
                  {item.repo && <span className="font-[family-name:var(--font-geist-mono)]">{item.repo}</span>}
                  <span>{timeAgo(item.date)}</span>
                </div>
              </div>
            </div>
          );

          return item.link ? (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="block transition-colors">
              {inner}
            </a>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
