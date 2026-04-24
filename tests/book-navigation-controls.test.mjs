import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const bookData = readFileSync(new URL("../data/book.ts", import.meta.url), "utf8");
const stageBand = readFileSync(new URL("../components/stage-band.tsx", import.meta.url), "utf8");
const bookPage = readFileSync(new URL("../app/book/[slug]/page.tsx", import.meta.url), "utf8");
const bookReader = readFileSync(new URL("../components/book-reader.tsx", import.meta.url), "utf8");

test("homepage stage cards link to the first chapter for each stage", () => {
  const expectedTargets = ["/book/cognition", "/book/mvp", "/book/design", "/book/launch"];

  for (const target of expectedTargets) {
    assert.match(bookData, new RegExp(`href:\\s*"${target}"`));
  }

  assert.match(stageBand, /import Link from "next\/link"/);
  assert.match(stageBand, /href=\{stage\.href\}/);
});

test("book chapter pages render the reader with font-size controls", () => {
  assert.match(bookPage, /import \{ BookReader \} from "@\/components\/book-reader"/);
  assert.match(bookPage, /<BookReader>{body}<\/BookReader>/);
});

test("font-size controls stay in the article flow instead of overlapping the top nav", () => {
  assert.doesNotMatch(bookReader, /className="[^"]*\bsticky\b/);
  assert.doesNotMatch(bookReader, /className="[^"]*\btop-4\b/);
});
