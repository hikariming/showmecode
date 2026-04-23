import { readFileSync } from "node:fs";
import { join } from "node:path";

import GithubSlugger from "github-slugger";

const BOOK_DIR = join(process.cwd(), "data", "book");

export function getPartBody(slug: string): string {
  return readFileSync(join(BOOK_DIR, `${slug}.md`), "utf-8");
}

export type TocItem = { id: string; text: string };

/** Extract H2 list from raw markdown using same slugger as rehype-slug. */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[1].replace(/[#*`]/g, "").trim();
    items.push({ id: slugger.slug(text), text });
  }
  return items;
}
