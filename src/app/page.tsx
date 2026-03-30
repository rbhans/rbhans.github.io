import { Hero } from "@/components/hero";
import { PillNav } from "@/components/pill-nav";
import { WorkSection } from "@/components/work-section";
import { KanbanPanel } from "@/components/kanban-panel";
import { KanbanSection } from "@/components/kanban-section";
import { GitHubSection } from "@/components/github-section";
import { LifeSection } from "@/components/life-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { Footer } from "@/components/footer";
import { getImagesFromDir } from "@/lib/images";


function Divider() {
  return <hr className="border-[var(--stone-200)]" />;
}

export default function Home() {
  const hikingImages = getImagesFromDir("hiking");
  const familyImages = getImagesFromDir("family");
  const basidekickImages = getImagesFromDir("basidekick");
  const opencrateImages = getImagesFromDir("opencrate");
  return (
    <>
      <KanbanPanel />

      {/* Hero */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 md:px-8">
        <div className="sticky top-0 z-20 -mx-6 bg-[var(--stone-50)]/90 px-6 py-3 backdrop-blur-sm md:-mx-8 md:px-8">
          <PillNav />
        </div>

        <div className="space-y-10 py-10">
          <WorkSection
            basidekickImages={basidekickImages}
            opencrateImages={opencrateImages}
          />
          <Divider />
          <GitHubSection />
          <Divider />
          <LifeSection
            hikingImages={hikingImages}
            familyImages={familyImages}
          />
          <Divider />
          <SkillsSection />
          <Divider />
          <EducationSection />
        </div>
        <Divider />
        <Footer />
      </div>
    </>
  );
}
