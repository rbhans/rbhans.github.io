import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public/images");

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function getImagesFromDir(subdir: string): string[] {
  const dirPath = path.join(IMAGES_DIR, subdir);
  try {
    return fs
      .readdirSync(dirPath)
      .filter((f) => VALID_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/${subdir}/${f}`);
  } catch {
    return [];
  }
}
