# Book Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's marketing-placeholder sections (`HotChapters` / `LearningPath` / `ValueGrid`) with a 9-part book IA, add 9 minimal `/book/[slug]` cover pages, and update header / footer accordingly. Visual language must stay identical to the current hero.

**Architecture:** Static, file-driven Next.js App Router site. New `data/book.ts` holds typed book content (hand-curated from PDF). New section components (`StageBand` / `PartGrid` / `PartCard` / `AboutBook` / `CtaBand`) replace the deleted ones. New dynamic route `app/book/[slug]/page.tsx` renders any of 9 parts via a shared `PartCover` component. No tests framework exists in this repo — validation is `npm run build` (TypeScript + Next compile) plus `npm run dev` smoke walk.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4, pypdf (one-shot Python script for PDF extraction).

**Spec:** `docs/superpowers/specs/2026-04-23-book-site-redesign-design.md`

---

## File Map

**Create**
- `scripts/extract-book-data.py` — one-shot PDF → JSON draft extractor
- `data/book.draft.json` — script output (committed for traceability)
- `data/book.ts` — typed book data, hand-curated from draft
- `app/book/[slug]/page.tsx` — dynamic route for 9 part cover pages
- `components/part-cover.tsx` — body of part cover page
- `components/stage-band.tsx` — 4-stage intro band
- `components/part-grid.tsx` — 3×3 grid container
- `components/part-card.tsx` — single part card
- `components/about-book.tsx` — book intro + author wall
- `components/cta-band.tsx` — bottom CTA band

**Modify**
- `data/homepage.ts` — remove old exports (`chapterCards` / `chapterCategories` / `valueItems` / `learningSteps` and their types), update `navItems` and `footerGroups`
- `app/page.tsx` — recompose with new section components
- `components/header.tsx` — make `observedIds` tolerant of `/#anchor` style hrefs (currently filters with `startsWith("#")`)

**Delete**
- `components/value-grid.tsx`
- `components/hot-chapters.tsx`
- `components/learning-path.tsx`
- `components/category-tabs.tsx`
- `components/chapter-card.tsx`

---

## Task 1: Extract book data from PDF

**Files:**
- Create: `scripts/extract-book-data.py`
- Create (output): `data/book.draft.json`

- [ ] **Step 1: Write the extraction script**

Create `scripts/extract-book-data.py`:

```python
#!/usr/bin/env python3
"""One-shot extractor: pulls per-part 痛点/方案/行动/作者 from the source PDF.

Output is a draft for human curation — never imported by the app."""
import json
import re
from pathlib import Path
from pypdf import PdfReader

PDF = Path(__file__).resolve().parent.parent / "《赤脚程序员实战手册》.pdf"
OUT = Path(__file__).resolve().parent.parent / "data" / "book.draft.json"

PARTS = [
    {"slug": "cognition",   "number": 1, "name": "认知篇",  "fullTitle": "重塑 AI 编程思维",      "stage": "think",  "start": 5,   "end": 16,  "pageCount": 12},
    {"slug": "setup",       "number": 2, "name": "准备篇",  "fullTitle": "打造 VibeCoding 工作台", "stage": "think",  "start": 17,  "end": 74,  "pageCount": 58},
    {"slug": "mvp",         "number": 3, "name": "入门篇",  "fullTitle": "快速构建 MVP",          "stage": "build",  "start": 75,  "end": 114, "pageCount": 40},
    {"slug": "webapp",      "number": 4, "name": "进阶篇",  "fullTitle": "完整网页应用",          "stage": "build",  "start": 115, "end": 171, "pageCount": 57},
    {"slug": "engineering", "number": 5, "name": "秩序篇",  "fullTitle": "建立工程规范",          "stage": "build",  "start": 172, "end": 200, "pageCount": 29},
    {"slug": "efficiency",  "number": 6, "name": "效率篇",  "fullTitle": "把重复劳动交给机器",    "stage": "build",  "start": 201, "end": 249, "pageCount": 49},
    {"slug": "integration", "number": 7, "name": "连接篇",  "fullTitle": "打破能力的孤岛",        "stage": "build",  "start": 250, "end": 291, "pageCount": 42},
    {"slug": "design",      "number": 8, "name": "设计篇",  "fullTitle": "建立工程化审美",        "stage": "polish", "start": 292, "end": 339, "pageCount": 48},
    {"slug": "launch",      "number": 9, "name": "上线篇",  "fullTitle": "让世界看到你的作品",    "stage": "ship",   "start": 340, "end": 365, "pageCount": 26},
]


def normalize(text: str) -> str:
    # PDF often has \x01 control chars between glyphs and a stray U+FF65 etc.
    text = text.replace("\x01", "").replace("\x00", "")
    text = text.replace("⼼", "心").replace("⽅", "方").replace("⾏", "行").replace("⽵", "章")
    return re.sub(r"[ \t]+", " ", text)


def grab_block(text: str, start_marker: str, end_markers: list[str]) -> str:
    idx = text.find(start_marker)
    if idx == -1:
        return ""
    body = text[idx + len(start_marker):]
    cut = len(body)
    for end in end_markers:
        j = body.find(end)
        if j != -1 and j < cut:
            cut = j
    return body[:cut].strip()


def main() -> None:
    reader = PdfReader(str(PDF))
    out = []
    for p in PARTS:
        # Read first 5 pages of the part — enough to cover the 痛点/方案/行动 box.
        chunk = ""
        for i in range(p["start"] - 1, min(p["start"] + 4, len(reader.pages))):
            chunk += normalize(reader.pages[i].extract_text() or "")
            chunk += "\n"

        author_match = re.search(r"本章作者[：:]\s*([^\n]{2,40})", chunk)
        author_title_match = None
        if author_match:
            after = chunk.split(author_match.group(0), 1)[1]
            author_title_match = next((l.strip() for l in after.split("\n") if l.strip()), "")

        part_data = {
            **p,
            "author": author_match.group(1).strip() if author_match else "",
            "authorTitle": author_title_match or "",
            "pain":     grab_block(chunk, "[核心痛点]",   ["[解决方案]", "[关键行动]", "本章作者"]),
            "solution": grab_block(chunk, "[解决方案]",   ["[关键行动]", "本章作者"]),
            "actions":  grab_block(chunk, "[关键行动]",   ["本章作者", "一、", "1."]),
        }
        out.append(part_data)

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(out)} parts)")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the script**

Run: `python3 scripts/extract-book-data.py`
Expected output: `Wrote /Users/rqq/showmecode/data/book.draft.json (9 parts)`

- [ ] **Step 3: Eyeball the draft for quality**

Run: `python3 -c "import json; d=json.load(open('data/book.draft.json')); [print(p['number'], p['name'], '|', p['author'], '|', repr(p['pain'][:80])) for p in d]"`

Expected: every part has a non-empty `author` and `pain`. If `pain` is empty for any part, the marker text in the PDF differs (likely full-width brackets `【...】` instead of `[...]`) — adjust `start_marker` for that part and re-run. Don't proceed until all 9 are populated.

- [ ] **Step 4: Commit script + draft**

```bash
git add scripts/extract-book-data.py data/book.draft.json
git commit -m "feat(data): one-shot PDF extractor + raw draft for 9 parts"
```

---

## Task 2: Hand-curate `data/book.ts`

**Files:**
- Create: `data/book.ts`

- [ ] **Step 1: Write the typed shell**

Create `data/book.ts`:

```ts
export type StageId = "think" | "build" | "polish" | "ship";

export type Stage = {
  id: StageId;
  label: string;
  description: string;
  partRange: string;
};

export type Author = {
  id: string;
  name: string;
  title: string;
  initials: string;
  partSlugs: string[];
};

export type BookPart = {
  slug: string;
  number: number;
  name: string;       // "认知篇"
  fullTitle: string;  // "重塑 AI 编程思维"
  pain: string;
  solution: string;
  actions: string[];
  authorId: string;
  pageCount: number;
  stage: StageId;
};

export const stages: Stage[] = [
  { id: "think",  label: "想清楚", description: "看清需求与边界，建立 AI 协作心法。",     partRange: "第 1-2 篇" },
  { id: "build",  label: "写出来", description: "从第一个 MVP 到工程化的完整应用。",      partRange: "第 3-7 篇" },
  { id: "polish", label: "变好看", description: "用专业审美让产品脱离粗糙感。",           partRange: "第 8 篇" },
  { id: "ship",   label: "发出去", description: "把代码变成所有人都能访问的网站。",       partRange: "第 9 篇" },
];

export const authors: Author[] = [
  { id: "mingli",   name: "明立",           title: "AI 教育工作者",          initials: "明", partSlugs: ["cognition"] },
  { id: "yang",     name: "社恐患者杨老师", title: "资深 Agent 开发工程师",   initials: "杨", partSlugs: ["setup"] },
  { id: "lanxing",  name: "蓝星",           title: "后端开发工程师",          initials: "蓝", partSlugs: ["mvp", "webapp"] },
  { id: "kafka",    name: "卡夫卡",         title: "移动开发工程师",          initials: "卡", partSlugs: ["engineering", "efficiency", "integration"] },
  { id: "bay",      name: "Bay",            title: "设计师",                  initials: "B",  partSlugs: ["design"] },
  { id: "kouzi",    name: "扣子是谁呀",     title: "独立开发者",              initials: "扣", partSlugs: ["launch"] },
];

export const bookParts: BookPart[] = [
  // FILL IN — see Step 2.
];
```

- [ ] **Step 2: Curate 9 `BookPart` entries from the draft**

Open `data/book.draft.json` and `data/book.ts` side by side. For each of the 9 entries in the draft:

1. Copy `pain` / `solution` text from draft into the corresponding `BookPart` literal. Trim trailing whitespace, fix any obvious OCR artifacts (e.g. stray full-width spaces, broken brackets).
2. Split the draft `actions` block into a `string[]` of 3-5 bullets. The PDF formats them with `◦` or numeric prefixes — drop the marker, keep one logical action per array item.
3. Map `author` → `authorId` using the `authors` table above (e.g. `"明立"` → `"mingli"`).

Final shape per part — example for part 1:

```ts
{
  slug: "cognition",
  number: 1,
  name: "认知篇",
  fullTitle: "重塑 AI 编程思维",
  pain: "绝大多数人的热情，都耗尽在了'准备开始'的路上。立志成为'赤脚程序员'，却被告知要先学 HTML、Python 语法。这种漫长的技术学习路线，让普通人根本无法触达创造的乐趣。",
  solution: "用自然语言替代编程语言。把 AI 当作编译器：输入的不再是代码，而是你清晰的中文指令。",
  actions: [
    "认知升级：从'写代码的人'转变为'定义问题的人'。你负责逻辑和需求，AI 负责语法和实现。",
    "打破迷信：不用担心基础薄弱。在 VibeCoding 时代，语文能力（表达清晰度）比代码能力更重要。",
  ],
  authorId: "mingli",
  pageCount: 12,
  stage: "think",
},
```

Repeat for parts 2-9. The complete draft already has every field populated; this step is editorial cleanup, not authoring.

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors. If any part references a missing `authorId` or wrong `stage`, fix it.

- [ ] **Step 4: Commit**

```bash
git add data/book.ts
git commit -m "feat(data): typed book data — 4 stages, 6 authors, 9 parts"
```

---

## Task 3: Refactor `data/homepage.ts`

**Files:**
- Modify: `data/homepage.ts`

- [ ] **Step 1: Replace the file content**

Overwrite `data/homepage.ts` with:

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

export const navItems: NavItem[] = [
  { label: "全部篇章", href: "/#chapters" },
  { label: "学习路径", href: "/#path" },
  { label: "关于本书", href: "/#about" },
  { label: "GitHub",  href: "#" }, // TODO: replace with real repo URL
];

export const footerGroups: FooterGroup[] = [
  {
    title: "本书内容",
    links: [
      { label: "全部篇章",     href: "/#chapters" },
      { label: "学习路径",     href: "/#path" },
      { label: "第 1 篇 认知篇", href: "/book/cognition" },
      { label: "第 9 篇 上线篇", href: "/book/launch" },
    ],
  },
  {
    title: "作者团队",
    links: [
      { label: "关于本书", href: "/#about" },
    ],
  },
  {
    title: "其它",
    links: [
      { label: "回到顶部", href: "#top" },
      { label: "GitHub",   href: "#" }, // TODO: replace with real repo URL
    ],
  },
];
```

Note: removed exports `chapterCategories`, `chapterCards`, `learningSteps`, `valueItems` and their types. Tasks below stop importing them; the next build step will catch any stragglers.

- [ ] **Step 2: TypeScript check (will surface broken imports)**

Run: `npx tsc --noEmit`
Expected: errors in `components/value-grid.tsx`, `components/hot-chapters.tsx`, `components/learning-path.tsx`, `components/category-tabs.tsx`, `components/chapter-card.tsx` complaining about missing exports. This is expected — those files are deleted in Task 9. Do NOT try to fix them yet.

- [ ] **Step 3: Commit (yes, broken — will be fixed by sequential tasks)**

```bash
git add data/homepage.ts
git commit -m "refactor(data): homepage exports trimmed to nav + footer only"
```

---

## Task 4: Patch header anchor observer for `/#…` hrefs

**Files:**
- Modify: `components/header.tsx:13-24`

- [ ] **Step 1: Update `observedIds` to accept both `#` and `/#` style hrefs**

In `components/header.tsx`, replace the `observedIds` computation:

```tsx
  const observedIds = useMemo(
    () =>
      Array.from(
        new Set(
          navItems
            .map((item) => item.href)
            .filter((href) => href.startsWith("#") || href.startsWith("/#"))
            .map((href) => href.replace(/^\/?#/, "")),
        ),
      ),
    [],
  );
```

Also update the active-state comparison so a nav item with `href="/#chapters"` matches `activeHash="#chapters"`. Replace the `isActive` line (around line 78):

```tsx
            const isActive =
              item.href === activeHash || item.href === `/${activeHash}`;
```

- [ ] **Step 2: Commit**

```bash
git add components/header.tsx
git commit -m "fix(header): tolerate cross-page /#anchor hrefs in nav"
```

---

## Task 5: Build the part cover page

**Files:**
- Create: `components/part-cover.tsx`
- Create: `app/book/[slug]/page.tsx`

- [ ] **Step 1: Create `components/part-cover.tsx`**

```tsx
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { authors, bookParts, type BookPart } from "@/data/book";

function authorOf(part: BookPart) {
  return authors.find((a) => a.id === part.authorId);
}

export function PartCover({ part }: { part: BookPart }) {
  const author = authorOf(part);
  const sorted = [...bookParts].sort((a, b) => a.number - b.number);
  const idx = sorted.findIndex((p) => p.slug === part.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

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

        <p className="mt-12 rounded-[18px] border border-dashed border-line-strong bg-white/60 p-5 text-sm text-muted">
          全文正在整理中。如需阅读完整内容，可查看本仓库根目录的 PDF。
        </p>

        <nav className="mt-12 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/book/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PartCover } from "@/components/part-cover";
import { bookParts } from "@/data/book";

export function generateStaticParams() {
  return bookParts.map((part) => ({ slug: part.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const part = bookParts.find((p) => p.slug === params.slug);
  if (!part) return {};
  return {
    title: `第 ${part.number} 篇 ${part.name} - ${part.fullTitle} | 赤脚程序员实战手册`,
    description: part.solution,
  };
}

export default function BookPartPage({ params }: { params: { slug: string } }) {
  const part = bookParts.find((p) => p.slug === params.slug);
  if (!part) notFound();
  return (
    <>
      <Header />
      <main>
        <PartCover part={part} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: TypeScript check**

Run: `npx tsc --noEmit`
Expected: errors only in the soon-to-be-deleted old components (from Task 3 fallout). The new files should be clean.

- [ ] **Step 4: Commit**

```bash
git add components/part-cover.tsx app/book/
git commit -m "feat(book): add /book/[slug] dynamic route + part cover component"
```

---

## Task 6: Build `StageBand` component

**Files:**
- Create: `components/stage-band.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { SectionShell } from "@/components/section-shell";
import { stages } from "@/data/book";

export function StageBand() {
  return (
    <SectionShell
      id="path"
      eyebrow="Learning Path"
      title="一本书的四个阶段"
      description="把 9 篇内容串成一条创作流程：先想清楚，再写出来，把它做好看，最后让世界看到。"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, idx) => (
          <article
            key={stage.id}
            className="rounded-[24px] border border-line bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-brand/24"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-semibold text-white">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/72">
                {stage.partRange}
              </span>
            </div>
            <h3 className="mt-4 text-[1.5rem] font-semibold tracking-[-0.04em] text-foreground">
              {stage.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{stage.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/stage-band.tsx
git commit -m "feat(home): add StageBand — 4-stage intro band"
```

---

## Task 7: Build `PartCard` and `PartGrid` components

**Files:**
- Create: `components/part-card.tsx`
- Create: `components/part-grid.tsx`

- [ ] **Step 1: Create `components/part-card.tsx`**

```tsx
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { authors, type BookPart } from "@/data/book";

export function PartCard({ part }: { part: BookPart }) {
  const author = authors.find((a) => a.id === part.authorId);

  return (
    <Link
      href={`/book/${part.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white/88 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-brand/28 hover:shadow-[0_24px_60px_rgba(31,94,255,0.12)]"
    >
      <div className="relative overflow-hidden border-b border-line/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,255,0.98))] p-5">
        <div className="dot-field absolute inset-0 opacity-70" />
        <div className="relative flex items-baseline justify-between">
          <span className="text-[2.6rem] font-semibold leading-none tabular-nums tracking-[-0.06em] text-brand/85">
            {String(part.number).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-line bg-white/92 px-3 py-1 text-xs font-semibold text-foreground/72">
            约 {part.pageCount} 页
          </span>
        </div>
        <div className="relative mt-5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand/70">
            {part.name}
          </div>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.04em] text-foreground">
            {part.fullTitle}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-6 text-muted line-clamp-3">{part.pain}</p>
        {part.actions.length ? (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/82">
            {part.actions.slice(0, 2).map((action, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" />
                <span className="line-clamp-2">{action}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">{author?.name ?? "—"}</span>
          <span className="inline-flex items-center gap-1 font-medium text-brand transition group-hover:gap-2">
            阅读这篇
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `components/part-grid.tsx`**

```tsx
import { PartCard } from "@/components/part-card";
import { SectionShell } from "@/components/section-shell";
import { bookParts } from "@/data/book";

export function PartGrid() {
  const parts = [...bookParts].sort((a, b) => a.number - b.number);

  return (
    <SectionShell
      id="chapters"
      eyebrow="Chapters"
      title="九篇章节，覆盖从想法到上线全过程"
      description="每一篇都聚焦一个真实痛点，配套可执行的关键行动。点开任意一篇即可阅读详情。"
      className="border-t border-line/60 bg-white/55"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => (
          <PartCard key={part.slug} part={part} />
        ))}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/part-card.tsx components/part-grid.tsx
git commit -m "feat(home): add PartCard + PartGrid — 9-part 3x3 grid"
```

---

## Task 8: Build `AboutBook` and `CtaBand` components

**Files:**
- Create: `components/about-book.tsx`
- Create: `components/cta-band.tsx`

- [ ] **Step 1: Create `components/about-book.tsx`**

```tsx
import Link from "next/link";

import { SectionShell } from "@/components/section-shell";
import { authors, bookParts } from "@/data/book";

export function AboutBook() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="赤脚程序员，自己解决自己的问题"
      description="上世纪农村的'赤脚医生'用最少的训练守护邻里健康。今天，借助 AI 编程工具，每个非科班的人也能动手解决身边的麻烦。这本手册由 6 位一线作者协作完成，带你走完从想法到上线的完整路径。"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => {
          const parts = bookParts.filter((p) => author.partSlugs.includes(p.slug));
          return (
            <article
              key={author.id}
              className="rounded-[24px] border border-line bg-white/88 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-lg font-semibold text-brand">
                  {author.initials}
                </span>
                <div>
                  <div className="text-[1.1rem] font-semibold text-foreground">{author.name}</div>
                  <div className="text-sm text-muted">{author.title}</div>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {parts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/book/${p.slug}`}
                      className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2 text-sm text-foreground/85 transition hover:border-brand/30 hover:text-brand"
                    >
                      <span>第 {p.number} 篇 · {p.name}</span>
                      <span className="text-xs text-muted">{p.fullTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Create `components/cta-band.tsx`**

```tsx
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

export function CtaBand() {
  return (
    <section className="section-space">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[32px] border border-brand/20 bg-[linear-gradient(135deg,rgba(31,94,255,0.06),rgba(255,255,255,0.95))] p-10 text-center shadow-[0_30px_80px_rgba(31,94,255,0.1)] sm:p-14">
          <div className="dot-field absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-[2.8rem]">
              准备好开始你的第一篇了吗？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              从认知篇出发，了解 AI 时代'赤脚程序员'到底是怎么思考问题的。
            </p>
            <Link
              href="/book/cognition"
              className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-[20px] bg-brand px-8 text-[1.05rem] font-semibold text-white shadow-[0_20px_40px_rgba(31,94,255,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-strong"
            >
              开始阅读第 1 篇
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/about-book.tsx components/cta-band.tsx
git commit -m "feat(home): add AboutBook (author wall) + CtaBand"
```

---

## Task 9: Recompose `app/page.tsx` and delete dead components

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/value-grid.tsx`, `components/hot-chapters.tsx`, `components/learning-path.tsx`, `components/category-tabs.tsx`, `components/chapter-card.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { AboutBook } from "@/components/about-book";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PartGrid } from "@/components/part-grid";
import { StageBand } from "@/components/stage-band";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StageBand />
        <PartGrid />
        <AboutBook />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Delete the 5 dead components**

```bash
rm components/value-grid.tsx components/hot-chapters.tsx components/learning-path.tsx components/category-tabs.tsx components/chapter-card.tsx
```

- [ ] **Step 3: Verify nothing else imports them**

Use the Grep tool with pattern `value-grid|hot-chapters|learning-path|category-tabs|chapter-card` across the repo. Expected: zero matches outside `data/book.draft.json` (which is JSON, not code).

- [ ] **Step 4: TypeScript check**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/
git commit -m "refactor(home): recompose page with new sections + drop dead components"
```

---

## Task 10: Build verification + smoke walk

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds. The output should report 10 routes — `/` plus 9 statically-generated `/book/[slug]` pages. If fewer than 9 part pages are generated, `generateStaticParams` is wrong.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors. Warnings about unused vars in deleted files mean cache stale — re-run after `rm -rf .next`.

- [ ] **Step 3: Dev smoke walk**

Run: `npm run dev` (background) and open `http://localhost:3000` in a browser.

Walk through manually:
- Hero unchanged.
- Below hero: 4-stage band → 9-card grid (3 columns at desktop) → 6 author cards → CTA band → footer.
- Click each of the 9 part cards → lands on `/book/<slug>` with correct content (title, pain, solution, actions, author).
- On part page, click "上一篇" / "下一篇" — first part shows only "下一篇", last part only "上一篇".
- Header nav: "全部篇章" scrolls to grid, "学习路径" to stage band, "关于本书" to author wall. Active state highlights as you scroll.
- Footer "回到顶部" works.

If anything visually drifts from the hero's style language (round corners, shadow weight, spacing rhythm), revisit the offending component and align.

- [ ] **Step 4: Final commit (if any tweaks needed)**

If smoke walk surfaced fixes, commit each as a focused diff. Otherwise, this task ends with no commit.

---

## Self-Review Notes

- Spec coverage: every section of the spec maps to a task — data extraction (Task 1), curated data (Task 2), homepage data refactor (Task 3), header anchor fix (Task 4, infra dependency surfaced during planning), part cover route (Task 5), 4 new homepage sections (Tasks 6-8), recompose + cleanup (Task 9), validation (Task 10).
- No placeholders remain inside steps; the only intentional `#` placeholder is the GitHub URL in nav/footer, called out in the spec's risk section.
- Type names consistent across tasks: `BookPart`, `Author`, `Stage`, `StageId`, `bookParts`, `authors`, `stages` used identically wherever referenced.
- Sequencing leaves the repo with TS errors after Task 3 — intentional, fixed by the time Task 9 completes; commits between are still meaningful units.
