# Book Chapter Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the full body text of all 9 book parts on `/book/[slug]` pages, with sticky TOC for long parts and locally-hosted images.

**Architecture:** One-shot Python script splits two mineru markdown exports into 9 per-slug `.md` files in `data/book/`, downloads all images to `public/book/<slug>/`, rewrites image URLs to local paths. Next.js server component reads each file via `fs.readFileSync` and renders with `react-markdown` + `remark-gfm` + `rehype-slug`. A client-side TOC component scrolls-spies the H2 headings and shows on `xl` breakpoint when ≥ 4 H2s exist. After raw extraction, three batched cleanup tasks (3 parts each) hand-fix OCR noise, heading levels, code fences, and decorative-image filtering.

**Tech Stack:** Next.js 16 App Router (RSC), TypeScript strict, Tailwind v4, react-markdown 9, remark-gfm 4, rehype-slug 6. Python 3 stdlib only for the extraction script.

**Spec:** `docs/superpowers/specs/2026-04-23-book-chapter-content-design.md`

**No test infrastructure in this codebase.** Verification is `npm run build` + `npm run lint` + manual smoke tests via `curl localhost:3000/book/<slug>`. Do not introduce jest/vitest for this plan.

---

## File Structure

| File | Purpose |
|---|---|
| `scripts/split-book-md.py` | One-shot: split + download images + write 9 `.md` |
| `data/book/<slug>.md` (×9) | Per-part body markdown, single source of truth |
| `public/book/<slug>/<hash>.<ext>` | Localized images (filtered to ≤50MB) |
| `lib/book-content.ts` | Server helper `getPartBody(slug)` |
| `components/markdown-body.tsx` | RSC react-markdown wrapper with Tailwind classNames |
| `components/part-toc.tsx` | Client sticky TOC with scroll-spy |
| `components/part-nav.tsx` | Prev/next nav (extracted from `part-cover.tsx`) |
| `components/part-cover.tsx` | Trim: drop placeholder text + prev/next nav |
| `app/book/[slug]/page.tsx` | Compose PartCover + body + TOC + PartNav |
| `.gitignore` | Add mineru artifacts |
| `package.json` | Add 3 deps |

---

## Task 1: Install deps and update .gitignore

**Files:**
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install runtime deps**

```bash
cd /Users/rqq/showmecode && npm install react-markdown@9 remark-gfm@4 rehype-slug@6
```

Expected: 3 packages added, no peer-dep warnings related to React 19. If react-markdown 9 errors on React 19 peer, try `npm install react-markdown@latest remark-gfm@latest rehype-slug@latest` to grab the most current version.

- [ ] **Step 2: Update .gitignore**

Append these lines to `/Users/rqq/showmecode/.gitignore`:

```
# mineru raw exports — not source of truth, see data/book/ for curated md
MinerU_*.md
MinerU_*.json
```

- [ ] **Step 3: Verify mineru files now ignored**

```bash
cd /Users/rqq/showmecode && git status --short | grep -i mineru
```

Expected: empty output.

- [ ] **Step 4: Commit**

```bash
cd /Users/rqq/showmecode
git add package.json package-lock.json .gitignore
git commit -m "chore: add markdown deps + ignore mineru raw exports

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Write extraction script and generate raw drafts

**Files:**
- Create: `scripts/split-book-md.py`
- Create: `data/book/<slug>.md` (×9, by running the script)
- Create: `public/book/<slug>/<hash>.<ext>` (downloaded by script)

- [ ] **Step 1: Write `scripts/split-book-md.py`**

```python
#!/usr/bin/env python3
"""Split mineru markdown into per-part files and localize images.

One-shot. Default refuses to overwrite existing data/book/<slug>.md;
use --force to override (DANGEROUS — wipes manual cleanup)."""
import argparse
import hashlib
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_1 = ROOT / "MinerU_markdown_《赤脚程序员实战手册》_2047115887568547840.md"
SRC_2 = ROOT / "MinerU_markdown_《赤脚程序员实战手册》_第5-9篇_2047119446859116544.md"
DATA_DIR = ROOT / "data" / "book"
PUBLIC_DIR = ROOT / "public" / "book"

# (slug, source_file, part_marker_in_source). Order = bookParts order.
SLUGS = [
    ("cognition",   SRC_1, "第⼀部分"),
    ("setup",       SRC_1, "第⼆部分"),
    ("mvp",         SRC_1, "第三部分"),
    ("webapp",      SRC_1, "第四部分"),
    ("engineering", SRC_2, "第五部分"),
    ("efficiency",  SRC_2, "第六部分"),
    ("integration", SRC_2, "第七部分"),
    ("design",      SRC_2, "第⼋部分"),
    ("launch",      SRC_2, "第九部分"),
]

IMG_RE = re.compile(r'!\[image\]\((https://cdn-mineru\.openxlab\.org\.cn/[^\)]+)\)')
# Match the 3 intro boxes [核⼼痛点]/[解决⽅案]/[关键⾏动] together; stop at next non-bracketed `# `.
INTRO_RE = re.compile(r'^# \[[^\]]+\][\s\S]*?(?=\n# (?!\[))', re.MULTILINE)


def read_source(path: Path) -> str:
    return path.read_text(encoding='utf-8').replace('\x00', '')


def slice_part(text: str, marker: str, next_marker: str | None) -> str:
    start_re = re.compile(rf'^# {re.escape(marker)}[：:]', re.MULTILINE)
    m = start_re.search(text)
    if not m:
        raise ValueError(f"part marker not found: {marker}")
    body = text[m.start():]
    if next_marker:
        end_re = re.compile(rf'^# {re.escape(next_marker)}[：:]', re.MULTILINE)
        m2 = end_re.search(body, 1)
        if m2:
            body = body[:m2.start()]
    return body


def download_image(url: str, dest_dir: Path) -> str:
    h = hashlib.sha256(url.encode()).hexdigest()[:12]
    ext = url.rsplit('.', 1)[-1].split('?')[0].lower()
    if ext not in ('jpg', 'jpeg', 'png', 'gif', 'webp'):
        ext = 'jpg'
    dest = dest_dir / f"{h}.{ext}"
    if not dest.exists():
        dest_dir.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(url, dest)
    return f"/book/{dest_dir.name}/{h}.{ext}"


def localize_images(body: str, slug: str) -> str:
    dest_dir = PUBLIC_DIR / slug

    def replace(m: re.Match) -> str:
        try:
            new_url = download_image(m.group(1), dest_dir)
            return f'![image]({new_url})'
        except Exception as e:
            print(f"  [warn] {slug}: failed {m.group(1)[:80]}...: {e}", file=sys.stderr)
            return m.group(0)

    return IMG_RE.sub(replace, body)


def strip_metadata(body: str) -> str:
    # Drop the first line (# 第X部分：...) and any leading blank lines/images
    lines = body.split('\n', 1)
    body = lines[1] if len(lines) > 1 else ''
    # Drop the [核⼼痛点]/[解决⽅案]/[关键⾏动] block (already in data/book.ts导读)
    body = INTRO_RE.sub('', body, count=1)
    return body.lstrip()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--force', action='store_true',
                    help='overwrite existing data/book/<slug>.md (wipes cleanup)')
    args = ap.parse_args()

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    src_text = {SRC_1: read_source(SRC_1), SRC_2: read_source(SRC_2)}

    for i, (slug, src, marker) in enumerate(SLUGS):
        out = DATA_DIR / f"{slug}.md"
        if out.exists() and not args.force:
            print(f"[skip] {slug} (exists, use --force)")
            continue
        next_marker = None
        if i + 1 < len(SLUGS) and SLUGS[i + 1][1] is src:
            next_marker = SLUGS[i + 1][2]
        body = slice_part(src_text[src], marker, next_marker)
        body = strip_metadata(body)
        body = localize_images(body, slug)
        out.write_text(body, encoding='utf-8')
        print(f"[ok] {slug}: wrote {out.name} ({len(body)} chars)")


if __name__ == '__main__':
    main()
```

- [ ] **Step 2: Run the script**

```bash
cd /Users/rqq/showmecode && python3 scripts/split-book-md.py
```

Expected: 9 lines `[ok] <slug>: wrote <slug>.md (NNNNN chars)`. May take 1-3 minutes due to image downloads (~880 images). Some `[warn]` lines for individual failed image fetches are tolerable; rerun the script to retry just those.

- [ ] **Step 3: Sanity check the output**

```bash
cd /Users/rqq/showmecode
ls -la data/book/
du -sh public/book/
ls public/book/cognition/ | head -3
```

Expected:
- 9 `.md` files in `data/book/`, sizes roughly proportional to PDF page counts (cognition ~smaller, webapp/setup ~larger)
- `public/book/` total under 300MB (will be trimmed to ≤50MB during cleanup)
- A few `<12-hex>.jpg` files in each slug subdir

- [ ] **Step 4: Verify image URLs were rewritten**

```bash
cd /Users/rqq/showmecode && grep -c 'cdn-mineru' data/book/*.md
```

Expected: every file shows 0 (all CDN URLs replaced). If any file > 0, those are images the download failed for — note them, the cleanup task will handle.

- [ ] **Step 5: Commit script + raw drafts + images**

```bash
cd /Users/rqq/showmecode
git add scripts/split-book-md.py data/book public/book
git commit -m "feat(book): extract 9-part raw markdown bodies from mineru

Mechanical extraction only — manual cleanup of OCR noise, heading
levels, code fences, and decorative images comes in later tasks.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Server helper for reading body markdown

**Files:**
- Create: `lib/book-content.ts`

- [ ] **Step 1: Create the helper**

```typescript
// lib/book-content.ts
import { readFileSync } from "node:fs";
import { join } from "node:path";

const BOOK_DIR = join(process.cwd(), "data", "book");

export function getPartBody(slug: string): string {
  return readFileSync(join(BOOK_DIR, `${slug}.md`), "utf-8");
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/rqq/showmecode && npx tsc --noEmit --ignoreDeprecations 6.0
```

Expected: no errors. (The `--ignoreDeprecations 6.0` flag is needed because `tsconfig.json`'s `baseUrl` is deprecated in TS 6 and otherwise causes early bail-out.)

- [ ] **Step 3: Commit**

```bash
cd /Users/rqq/showmecode
git add lib/book-content.ts
git commit -m "feat(book): add server helper for reading per-part markdown bodies

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Markdown rendering component

**Files:**
- Create: `components/markdown-body.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/markdown-body.tsx
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export function MarkdownBody({ children }: { children: string }) {
  return (
    <div className="book-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-12 mb-5 text-3xl font-semibold text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2
              id={id}
              className="mt-12 mb-4 scroll-mt-24 border-l-4 border-brand/60 pl-4 text-2xl font-semibold text-foreground"
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3
              id={id}
              className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold text-foreground"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 text-base font-semibold text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-5 text-[15px] leading-[1.85] text-foreground/86">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-5 list-disc space-y-2 pl-6 text-foreground/86">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 list-decimal space-y-2 pl-6 text-foreground/86">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-brand/60 bg-brand-soft/40 py-2 pl-4 italic text-foreground/86">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-[0.9em] text-brand">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl bg-slate-900 px-5 py-4 text-sm leading-[1.7] text-slate-100">
              {children}
            </pre>
          ),
          a: ({ href, children }) => {
            const url = href ?? "#";
            const internal = url.startsWith("/") || url.startsWith("#");
            if (internal) {
              return (
                <Link
                  href={url}
                  className="text-brand underline decoration-brand/40 underline-offset-2 transition hover:decoration-brand"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-brand/40 underline-offset-2 transition hover:decoration-brand"
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => {
            const url = typeof src === "string" ? src : "";
            if (!url) return null;
            return (
              <Image
                src={url}
                alt={alt ?? ""}
                width={1200}
                height={800}
                loading="lazy"
                className="my-6 mx-auto block max-w-full rounded-2xl border border-line"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/rqq/showmecode && npx tsc --noEmit --ignoreDeprecations 6.0
```

Expected: no errors. If `react-markdown` types complain about `code` props, the `className`/`children` destructure may need `unknown` cast — check the actual error and adjust types accordingly.

- [ ] **Step 3: Configure next.config.mjs to allow remote images (defensive — only matters if any CDN URL slipped through)**

Open `/Users/rqq/showmecode/next.config.mjs` and check if `images.remotePatterns` exists. If the file is empty/minimal, leave it alone — all images should be local from `public/`. If you find a CDN URL leaked through cleanup, add a remotePattern then; otherwise no change needed for this step.

- [ ] **Step 4: Commit**

```bash
cd /Users/rqq/showmecode
git add components/markdown-body.tsx
git commit -m "feat(book): add MarkdownBody RSC with Tailwind className map

Renders react-markdown + remark-gfm + rehype-slug. H2 anchors via slugger
feed the upcoming PartToc. Headings use brand accent border, code blocks
use slate-900 surface, images localized via Next/Image lazy loading.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Sticky TOC component with scroll-spy

**Files:**
- Create: `components/part-toc.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/part-toc.tsx
"use client";

import { useEffect, useState } from "react";

import GithubSlugger from "github-slugger";

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

export function PartToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="本篇目录"
      className="hidden xl:block sticky top-20 self-start w-56 max-h-[calc(100vh-6rem)] overflow-y-auto pl-6 text-sm"
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
        本篇目录
      </div>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block -ml-px border-l py-1.5 pl-4 transition ${
                item.id === activeId
                  ? "border-brand text-brand font-medium"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Install github-slugger (used by both rehype-slug and our extractor — same algorithm = matching ids)**

```bash
cd /Users/rqq/showmecode && npm install github-slugger@2
```

Expected: 1 package added.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/rqq/showmecode && npx tsc --noEmit --ignoreDeprecations 6.0
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/rqq/showmecode
git add components/part-toc.tsx package.json package-lock.json
git commit -m "feat(book): add PartToc client component with scroll-spy

Uses github-slugger (same algorithm rehype-slug uses) so the TOC's
href anchors line up with the H2 ids the renderer emits. Sticky on
xl+, hidden below.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Wire body + TOC + nav into the part page

**Files:**
- Create: `components/part-nav.tsx`
- Modify: `components/part-cover.tsx` (drop placeholder + nav)
- Modify: `app/book/[slug]/page.tsx` (compose body + toc + nav)

- [ ] **Step 1: Create `components/part-nav.tsx`** (extract prev/next from PartCover so the nav can sit AFTER the body)

```tsx
// components/part-nav.tsx
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { bookParts, type BookPart } from "@/data/book";

export function PartNav({ part }: { part: BookPart }) {
  const sorted = [...bookParts].sort((a, b) => a.number - b.number);
  const idx = sorted.findIndex((p) => p.slug === part.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <nav className="page-shell max-w-4xl mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          href={`/book/${prev.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          ← 第 {prev.number} 篇 {prev.name} {prev.fullTitle}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/book/${next.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand sm:justify-end"
        >
          第 {next.number} 篇 {next.name} {next.fullTitle}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
```

- [ ] **Step 2: Trim `components/part-cover.tsx`**

Remove:
- The `bookParts` import
- Lines computing `sorted`, `idx`, `prev`, `next` (lines 12-15 in current file)
- The `<p className="mt-12 ... 全文正在整理中">…</p>` block (lines 86-88)
- The whole `<nav className="mt-12 ...">…</nav>` block at the bottom (lines 90-110)

The trimmed file should look like:

```tsx
// components/part-cover.tsx
import Link from "next/link";

import { authors, type BookPart } from "@/data/book";

function authorOf(part: BookPart) {
  return authors.find((a) => a.id === part.authorId);
}

export function PartCover({ part }: { part: BookPart }) {
  const author = authorOf(part);

  return (
    <section className="section-space">
      <div className="page-shell max-w-4xl">
        <Link
          href="/#chapters"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          ← 返回全部篇章
        </Link>

        <div className="mt-8 flex items-baseline gap-5">
          <span className="text-[3.6rem] font-semibold leading-none tabular-nums tracking-[-0.06em] text-brand/85">
            {String(part.number).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand">
            {part.name}
          </span>
        </div>

        <h1 className="mt-5 text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.06em] text-foreground sm:text-[3.6rem]">
          {part.fullTitle}
        </h1>

        {author ? (
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-base font-semibold text-brand">
              {author.initials}
            </span>
            <span className="font-medium text-foreground">{author.name}</span>
            <span>·</span>
            <span>{author.title}</span>
            <span>·</span>
            <span>约 {part.pageCount} 页</span>
          </div>
        ) : null}

        <div className="mt-12 rounded-[24px] border-l-4 border-brand/60 bg-white/85 p-6 text-[1.05rem] leading-8 text-foreground/92 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            核心痛点
          </div>
          {part.pain}
        </div>

        <div className="mt-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            解决方案
          </div>
          <p className="text-[1.05rem] leading-8 text-foreground/92">{part.solution}</p>
        </div>

        <div className="mt-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            关键行动
          </div>
          <ul className="space-y-3">
            {part.actions.map((action, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-[18px] border border-line bg-white/85 p-4 text-[1rem] leading-7 text-foreground/90"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                  {i + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace `app/book/[slug]/page.tsx`**

```tsx
// app/book/[slug]/page.tsx
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarkdownBody } from "@/components/markdown-body";
import { PartCover } from "@/components/part-cover";
import { PartNav } from "@/components/part-nav";
import { PartToc, extractToc } from "@/components/part-toc";
import { bookParts } from "@/data/book";
import { getPartBody } from "@/lib/book-content";

const TOC_MIN_HEADINGS = 4;

export function generateStaticParams() {
  return bookParts.map((part) => ({ slug: part.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = bookParts.find((p) => p.slug === slug);
  if (!part) return {};
  return {
    title: `第 ${part.number} 篇 ${part.name} - ${part.fullTitle} | 赤脚程序员实战手册`,
    description: part.solution,
  };
}

export default async function BookPartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = bookParts.find((p) => p.slug === slug);
  if (!part) notFound();

  const body = getPartBody(part.slug);
  const toc = extractToc(body);
  const showToc = toc.length >= TOC_MIN_HEADINGS;

  return (
    <>
      <Header />
      <main>
        <PartCover part={part} />
        <section className="section-space pt-0">
          <div className="page-shell max-w-4xl">
            <div className="xl:flex xl:gap-8">
              <article className="min-w-0 flex-1">
                <MarkdownBody>{body}</MarkdownBody>
              </article>
              {showToc ? <PartToc items={toc} /> : null}
            </div>
          </div>
        </section>
        <PartNav part={part} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Build and smoke-test**

```bash
cd /Users/rqq/showmecode && npm run build 2>&1 | tail -30
```

Expected: clean build, 9 static `/book/<slug>` routes generated, no errors.

```bash
cd /Users/rqq/showmecode && npm run dev &
sleep 5
curl -s http://localhost:3000/book/cognition | grep -c '<h2'
kill %1
```

Expected: H2 count > 0 (cognition has at least 5 chapter headings after raw extraction).

- [ ] **Step 5: Commit**

```bash
cd /Users/rqq/showmecode
git add components/part-nav.tsx components/part-cover.tsx app/book/[slug]/page.tsx
git commit -m "feat(book): render markdown body + TOC on part pages

PartCover trimmed to导读 only; prev/next nav extracted to PartNav so
it can sit after the body. TOC shows on xl+ when ≥ 4 H2 headings.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Cleanup pass for parts 1-3 (cognition / setup / mvp)

**Files:**
- Modify: `data/book/cognition.md`
- Modify: `data/book/setup.md`
- Modify: `data/book/mvp.md`
- Modify: `public/book/cognition/`, `public/book/setup/`, `public/book/mvp/` (delete decorative images)

For each of the three slugs, run this checklist. Use `Read` to inspect the file first, then `Edit`/`Write` to apply fixes.

- [ ] **Step 1: Half-width Kangxi characters**

These are PDF artifacts. Replace globally in each `.md`:
- `⼀` → `一`, `⼆` → `二`, `⼿` → `手`, `⼝` → `口`, `⼯` → `工`, `⼩` → `小`, `⼤` → `大`, `⼈` → `人`, `⼊` → `入`, `⼼` → `心`, `⼦` → `子`, `⼗` → `十`, `⼏` → `几`, `⼁` → `丨`, `⽇` → `日`, `⽉` → `月`, `⽊` → `木`, `⽔` → `水`, `⽕` → `火`, `⽌` → `止`, `⽐` → `比`, `⽣` → `生`, `⽤` → `用`, `⽩` → `白`, `⽬` → `目`, `⽴` → `立`, `⽵` → `竹`, `⽶` → `米`, `⾔` → `言`, `⾝` → `身`, `⾞` → `车`, `⻓` → `长`, `⻔` → `门`, `⻘` → `青`, `⻙` → `韦`, `⻚` → `页`, `⻛` → `风`, `⻜` → `飞`, `⻝` → `食`, `⻢` → `马`, `⻥` → `鱼`, `⻦` → `鸟`, `⻩` → `黄`, `⻪` → `皮`, `⻯` → `龙`, `⼯` → `工`, `⻆` → `角`, `⻅` → `见`, `⻪` → `皮`, `⻅` → `见`, `⼯` → `工`

Use `replace_all: true` per substitution. Some chars may not appear; that's fine, the Edit tool will error on those — just skip them.

- [ ] **Step 2: mineru LaTeX-rendered symbols**

Look for `$\mathbb{C}$`, `$\checkmark$`, `$\bullet$`, `$\$$`, etc. and replace with the intended character (✅, ✔, •, $, etc.) based on context. Common case: `$\mathbb{C}$` in a「成果验收」list should be `✅`.

- [ ] **Step 3: Heading level remap**

After mineru, all headings are flat `#`. Remap:
- Top-level chapter dividers (e.g. lines like `# 一、xxx`, `# 二、xxx`, or topical major sections like `# 心法一：...`) → `## ` (H2, feeds the TOC)
- Step / sub-section headings (e.g. `# 第N步：xxx`, `# 1. xxx`, secondary topic titles) → `### ` (H3)
- Anything else still at `#` → judgement call: if it's a real subsection, `### `; if it's a stray heading-styled paragraph (e.g. just a single label), demote to plain bold paragraph

Goal: each part should have at least 3-6 H2s and zero stray `#` H1s.

- [ ] **Step 4: Code fences**

Find shell command, JSON config, or code-style snippets currently rendered as plain paragraphs and wrap in fenced code blocks with language tags:
- Shell: ```` ```bash ````
- JSON: ```` ```json ````
- TS/JS: ```` ```ts ```` / ```` ```js ````
- Other: ```` ``` ```` (no lang)

Identify by content: lines with `npm `, `git `, `cd `, `export `, `$ `, JSON `{` blocks, etc.

- [ ] **Step 5: Decorative images**

Open the file and identify decorative images to delete (book cover, pure illustration, redundant small images). Keep IDE screenshots, command-line screenshots, UI demos.

For each decorative image:
1. Note the filename from the markdown URL (e.g. `/book/cognition/abc123def456.jpg`)
2. Remove the `![image](...)` line from the `.md`
3. Delete the corresponding file: `rm public/book/cognition/abc123def456.jpg`

Aim for 30-50% reduction per part on average.

- [ ] **Step 6: Remove residual metadata**

Scan for and delete:
- `本章作者：xxx` lines
- Author title lines that follow (e.g. `AI教育工作者`)
- Any leftover `# [核心痛点]` / `# [解决方案]` / `# [关键行动]` markers (the script handles the leading one but not duplicates)
- The first line if it's just an image (often a part-cover image, redundant given PartCover)

- [ ] **Step 7: Build + smoke-test these 3 pages**

```bash
cd /Users/rqq/showmecode && npm run build 2>&1 | tail -10
```

Expected: clean build.

```bash
cd /Users/rqq/showmecode && npm run dev &
sleep 5
for s in cognition setup mvp; do
  echo "=== $s ==="
  curl -s "http://localhost:3000/book/$s" | grep -oE '<h2[^>]*>[^<]+' | head -8
done
kill %1
```

Expected: each part shows its expected H2 chapter list.

- [ ] **Step 8: Commit**

```bash
cd /Users/rqq/showmecode
git add data/book/cognition.md data/book/setup.md data/book/mvp.md public/book/cognition public/book/setup public/book/mvp
git commit -m "fix(book): clean cognition/setup/mvp — Kangxi, headings, fences, prune images

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Cleanup pass for parts 4-6 (webapp / engineering / efficiency)

**Files:**
- Modify: `data/book/webapp.md`
- Modify: `data/book/engineering.md`
- Modify: `data/book/efficiency.md`
- Modify: `public/book/webapp/`, `public/book/engineering/`, `public/book/efficiency/`

Apply the same checklist from Task 7 to these three slugs. Note the differences for these parts:

- [ ] **Step 1: Half-width Kangxi characters** — same substitution list as Task 7 Step 1.

- [ ] **Step 2: mineru LaTeX-rendered symbols** — same as Task 7 Step 2. Engineering and efficiency parts have heavy `$\mathbb{C}$` usage in subagent demo lists; these are checkmarks.

- [ ] **Step 3: Heading level remap** — same logic as Task 7 Step 3. These parts use `# 第N步：` headings extensively for the CLAUDE.md / Subagent / Hook setup walkthroughs — those should be `### ` H3 inside a parent `## ` chapter section.

- [ ] **Step 4: Code fences** — same as Task 7 Step 4. Engineering & efficiency are heavy on shell/JSON examples (CLAUDE.md content, Hook configs, Subagent YAML). High payoff here.

- [ ] **Step 5: Decorative images** — same as Task 7 Step 5.

- [ ] **Step 6: Remove residual metadata** — same as Task 7 Step 6.

- [ ] **Step 7: Build + smoke-test these 3 pages**

```bash
cd /Users/rqq/showmecode && npm run build 2>&1 | tail -10
cd /Users/rqq/showmecode && npm run dev &
sleep 5
for s in webapp engineering efficiency; do
  echo "=== $s ==="
  curl -s "http://localhost:3000/book/$s" | grep -oE '<h2[^>]*>[^<]+' | head -8
done
kill %1
```

- [ ] **Step 8: Commit**

```bash
cd /Users/rqq/showmecode
git add data/book/webapp.md data/book/engineering.md data/book/efficiency.md public/book/webapp public/book/engineering public/book/efficiency
git commit -m "fix(book): clean webapp/engineering/efficiency — Kangxi, headings, fences, prune images

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Cleanup pass for parts 7-9 (integration / design / launch)

**Files:**
- Modify: `data/book/integration.md`
- Modify: `data/book/design.md`
- Modify: `data/book/launch.md`
- Modify: `public/book/integration/`, `public/book/design/`, `public/book/launch/`

Apply the same checklist from Task 7 to these three slugs.

- [ ] **Step 1-6**: same as Task 7 Steps 1-6.

- [ ] **Step 7: Build + smoke-test these 3 pages**

```bash
cd /Users/rqq/showmecode && npm run build 2>&1 | tail -10
cd /Users/rqq/showmecode && npm run dev &
sleep 5
for s in integration design launch; do
  echo "=== $s ==="
  curl -s "http://localhost:3000/book/$s" | grep -oE '<h2[^>]*>[^<]+' | head -8
done
kill %1
```

- [ ] **Step 8: Commit**

```bash
cd /Users/rqq/showmecode
git add data/book/integration.md data/book/design.md data/book/launch.md public/book/integration public/book/design public/book/launch
git commit -m "fix(book): clean integration/design/launch — Kangxi, headings, fences, prune images

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Final verification

**Files:** none modified.

- [ ] **Step 1: Lint**

```bash
cd /Users/rqq/showmecode && npm run lint
```

Expected: 0 errors, 0 warnings related to changed files.

- [ ] **Step 2: Build**

```bash
cd /Users/rqq/showmecode && npm run build 2>&1 | tail -30
```

Expected: clean build, all 9 `/book/<slug>` routes statically generated.

- [ ] **Step 3: Image budget check**

```bash
cd /Users/rqq/showmecode && du -sh public/book/
```

Expected: ≤ 50MB. If above, do another decorative-image pruning pass on the largest subdirectories (run `du -sh public/book/*/`).

- [ ] **Step 4: Smoke test all 9 pages**

```bash
cd /Users/rqq/showmecode && npm run dev &
sleep 5
for s in cognition setup mvp webapp engineering efficiency integration design launch; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/book/$s")
  h2_count=$(curl -s "http://localhost:3000/book/$s" | grep -cE '<h2[^>]*>')
  img_count=$(curl -s "http://localhost:3000/book/$s" | grep -cE '<img[^>]+/book/')
  echo "$s: HTTP $status, $h2_count H2s, $img_count localized images"
done
kill %1
```

Expected: each line `<slug>: HTTP 200, N H2s, M localized images` with N >= 1 and M >= 0. No 500 errors.

- [ ] **Step 5: Final visual spot-check**

Open these URLs in a browser and eyeball:
- `http://localhost:3000/book/cognition` — short part, should NOT show TOC (likely fewer than 4 H2s after cleanup, depending on cleanup judgement)
- `http://localhost:3000/book/setup` — long part with many subsections, SHOULD show TOC on ≥ xl viewport
- `http://localhost:3000/book/launch` — verify prev/next nav links to integration → (none after launch)

Confirm no half-width Kangxi visible, no `$\mathbb{C}$` LaTeX residue, no broken images, code blocks render with dark slate background.

- [ ] **Step 6: Commit any final fixes**

If smoke tests turned up issues, fix them and commit:

```bash
cd /Users/rqq/showmecode
git add -p
git commit -m "fix(book): final smoke-test corrections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

If no issues, no commit needed.

---

## Self-Review Checklist (controller runs after plan complete)

- **Spec coverage:** ✅ All sections of spec covered:
  - 信息架构 → Task 6 (page composition)
  - 数据流 → Task 2 (script)
  - 文件结构 → Tasks 1-6
  - 关键决策 (5 items) → all reflected in tasks
  - OCR 清洗 checklist (8 items) → Tasks 7-9 cover items 1-7; item 8 (空段/重复) folded into the heading-remap step
  - 视觉规范 → Task 4 (className map)
  - 验证清单 → Task 10
  - 风险 (图片体积) → Task 7-9 Step 5 + Task 10 Step 3 budget check
- **Placeholders:** none. Every step has concrete code or commands.
- **Type consistency:** `getPartBody`, `MarkdownBody`, `PartToc`, `PartNav`, `extractToc`, `TocItem` all defined and used consistently.
- **Known judgement-call areas:** Tasks 7/8/9 cleanup steps require taste decisions (which images are decorative, what counts as a chapter-level heading). This is by design — the spec assigns this work to the implementer (claude) and the author (user) reviews via PR diffs.
