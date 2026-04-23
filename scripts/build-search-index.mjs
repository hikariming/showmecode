#!/usr/bin/env node
/**
 * Build a search index over all chapters + intro. Output: public/search-index.json.
 *
 * Each entry covers one section (H1/H2/H3) plus the body text under it (until the
 * next heading at the same or higher level). Anchors match rehype-slug output so
 * results can deep-link to /book/<slug>#<anchor>.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import GithubSlugger from "github-slugger";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const BOOK_DIR = join(REPO, "data", "book");
const OUT = join(REPO, "public", "search-index.json");

// Chapter display labels, keyed by slug. "intro" is the preface.
const CHAPTER_LABELS = {
  intro: "引言",
  cognition: "第 1 篇 · 认知篇",
  setup: "第 2 篇 · 准备篇",
  mvp: "第 3 篇 · 入门篇",
  webapp: "第 4 篇 · 进阶篇",
  engineering: "第 5 篇 · 秩序篇",
  efficiency: "第 6 篇 · 效率篇",
  integration: "第 7 篇 · 连接篇",
  design: "第 8 篇 · 设计篇",
  launch: "第 9 篇 · 上线篇",
};

const CHAPTER_ORDER = Object.keys(CHAPTER_LABELS);

const HEADING_RE = /^(#{1,3})\s+(.+?)\s*$/;
const FENCE_RE = /^```\s*$/;
const FENCE_OPEN_RE = /^```/;

/** Strip markdown noise from body text (links, images, code, emphasis). */
function stripMarkdown(s) {
  return s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Yield {level, text, body} sections from one markdown file. */
function sectionsOf(md) {
  const lines = md.split("\n");
  const sections = [];
  let current = null;
  let inFence = false;

  for (const line of lines) {
    // Toggle fence only on bare ``` (matches anchors.py behavior).
    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      if (current) current.bodyLines.push(line);
      continue;
    }
    if (inFence) {
      if (current) current.bodyLines.push(line);
      continue;
    }
    // Don't treat partial-fence lines (```bash) as headings.
    if (FENCE_OPEN_RE.test(line)) {
      if (current) current.bodyLines.push(line);
      continue;
    }
    const m = HEADING_RE.exec(line);
    if (m) {
      if (current) sections.push(current);
      current = {
        level: m[1].length,
        text: m[2].trim(),
        bodyLines: [],
      };
      continue;
    }
    if (current) current.bodyLines.push(line);
  }
  if (current) sections.push(current);

  return sections.map((s) => ({
    level: s.level,
    text: s.text,
    body: stripMarkdown(s.bodyLines.join("\n")),
  }));
}

function buildIndex() {
  const files = readdirSync(BOOK_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => CHAPTER_LABELS[slug])
    .sort((a, b) => CHAPTER_ORDER.indexOf(a) - CHAPTER_ORDER.indexOf(b));

  const docs = [];
  let nextId = 0;

  for (const slug of files) {
    const md = readFileSync(join(BOOK_DIR, `${slug}.md`), "utf-8");
    const slugger = new GithubSlugger();
    const sections = sectionsOf(md);

    // Synthesize a chapter-level entry so the chapter title itself is searchable.
    docs.push({
      id: nextId++,
      slug,
      chapter: CHAPTER_LABELS[slug],
      heading: CHAPTER_LABELS[slug],
      level: 0,
      anchor: "",
      body: sections.map((s) => s.text).join(" · "),
    });

    for (const s of sections) {
      docs.push({
        id: nextId++,
        slug,
        chapter: CHAPTER_LABELS[slug],
        heading: s.text,
        level: s.level,
        anchor: slugger.slug(s.text.replace(/[#*`]/g, "").trim()),
        body: s.body,
      });
    }
  }

  return docs;
}

function main() {
  const docs = buildIndex();
  writeFileSync(OUT, JSON.stringify(docs), "utf-8");
  const bytes = Buffer.byteLength(JSON.stringify(docs));
  console.log(`[search-index] ${docs.length} entries · ${(bytes / 1024).toFixed(1)} KB → ${OUT}`);
}

main();
