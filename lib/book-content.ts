import { readFileSync } from "node:fs";
import { join } from "node:path";

const BOOK_DIR = join(process.cwd(), "data", "book");

export function getPartBody(slug: string): string {
  return readFileSync(join(BOOK_DIR, `${slug}.md`), "utf-8");
}
