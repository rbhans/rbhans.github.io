const sections = [
  { id: "work", label: "Work" },
  { id: "github", label: "GitHub" },
  { id: "life", label: "Life" },
  { id: "skills", label: "Skills" },
];

export function PillNav() {
  return (
    <nav className="mt-6 flex flex-wrap gap-2">
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            i === 0
              ? "bg-[var(--stone-900)] text-[var(--stone-50)]"
              : "border border-[var(--stone-300)] text-[var(--stone-600)] hover:border-[var(--stone-400)] hover:text-[var(--stone-900)]"
          }`}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
