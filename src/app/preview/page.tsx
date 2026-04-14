import { getImagesFromDir } from "@/lib/images";
import { CardStyles } from "@/components/card-styles-preview";

export default function Preview() {
  const hikingImages = getImagesFromDir("hiking");
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:px-8">
      <p className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--stone-400)]">
        Preview
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl text-[var(--stone-900)]">
        Card Style Options
      </h1>
      <p className="mt-2 text-[12px] text-[var(--stone-500)]">
        Same content, three treatments. Pick one and we&apos;ll roll it out across Life, Project Board, Skills, Work, and GitHub cards.
      </p>

      <CardStyles hikingImages={hikingImages} />
    </div>
  );
}
