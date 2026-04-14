import { fetchGitHubStats } from "@/lib/github";
import { ScrollReveal } from "./scroll-reveal";
import { CountUp } from "./count-up";
import { LanguageBar } from "./language-bar";

export async function GitHubSection() {
  const stats = await fetchGitHubStats();

  const statCards = [
    { label: "Repositories", value: stats.repos },
    { label: "Languages", value: stats.languages.length },
  ];

  return (
    <section id="github">
      <ScrollReveal>
        <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--paper-ink-muted)]">
          Development
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-xl text-[var(--stone-900)]">
          GitHub
        </h2>
      </ScrollReveal>

      {stats.repos > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {statCards.map((card, i) => (
              <ScrollReveal key={card.label} delay={0.1 + i * 0.1}>
                <div className="paper-ruled border border-[var(--paper-border)] p-4 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-[2px] text-[var(--paper-ink-muted)]">
                    Tally · 0{i + 1}
                  </p>
                  <div className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-[var(--stone-900)]">
                    <CountUp target={card.value} />
                  </div>
                  <p className="mt-1 font-[family-name:var(--font-playfair)] text-[12px] italic text-[var(--paper-ink-muted)]">
                    {card.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {stats.languages.length > 0 && (
            <ScrollReveal delay={0.3} className="mt-4">
              <LanguageBar languages={stats.languages} />
            </ScrollReveal>
          )}
        </>
      ) : (
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-sm text-[var(--paper-ink-muted)]">
            GitHub stats loading&hellip;
          </p>
        </ScrollReveal>
      )}
    </section>
  );
}
