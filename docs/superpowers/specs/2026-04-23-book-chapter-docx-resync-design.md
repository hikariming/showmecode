# Book Chapter Re-sync from .docx — Design

**Date:** 2026-04-23
**Status:** Approved (pending implementation plan)

## Problem

The 9 chapter pages under `/book/<slug>` were generated from a mineru PDF→markdown pipeline. Result: text and image positions diverge from the authoritative source in many places (OCR errors, mis-attached images, decorative-image noise). The author now has the original `.docx` (`《赤脚程序员实战手册》.docx`, ~180 MB, 430 embedded images, 244 tables) and wants every chapter page to match it.

## Goal

One-shot rebuild of the 9 chapter `.md` files plus their image assets, sourced directly from the `.docx`, so that body text, table content, and image positions match the book exactly.

## Non-Goals

- No changes to the rendering pipeline (`lib/book-content.ts`, `components/markdown-body.tsx`, `app/book/[slug]/page.tsx`).
- No changes to the part-cover front matter (`pain` / `solution` / `actions` in `data/book/index.ts`).
- No changes to home page, header, footer, or navigation.
- No PR or branch workflow — work straight on `main`, commit per chapter (matches previous round).

## Architecture

```
《赤脚程序员实战手册》.docx
        │
        ▼
scripts/rebuild-from-docx.py        ← one-shot, ~300 lines, python-docx + stdlib
        │
        ├─→ data/book/<slug>.md     × 9   (overwritten)
        └─→ public/book/<slug>/<sha256[:12]>.<ext>   (wiped + rebuilt per chapter)
```

The Next.js render path is unchanged. We only refresh the source-of-truth content.

### Slug map (locked, identical to existing code)

| Part | Slug          |
|------|---------------|
| 1    | cognition     |
| 2    | setup         |
| 3    | mvp           |
| 4    | webapp        |
| 5    | engineering   |
| 6    | efficiency    |
| 7    | integration   |
| 8    | design        |
| 9    | launch        |

## Pipeline

1. **Load** the `.docx` with `python-docx` (paragraphs + tables) plus raw `lxml` access for image and font/shading detection.
2. **Slice** the body into 9 chapter blocks by detecting paragraphs whose text starts with `第N部分：`. Each block holds an ordered list of `(Paragraph | Table)` body elements.
3. **For each chapter** (in slug-map order):
   1. Read existing `data/book/<slug>.md`. Extract its heading lines (`#`, `##`, `###`) — these become **anchors** that pin the existing TOC structure.
   2. Wipe `public/book/<slug>/`.
   3. Walk the chapter's body elements in order. Emit:
      - **Anchor heading** if a paragraph's text matches a known anchor → emit verbatim (with original `#` level).
      - **Code block** if the paragraph qualifies (see Code Detection) → fenced \`\`\` block; consecutive code paragraphs merge into one block.
      - **Image** for each `<w:drawing>` → extract bytes, hash content (`sha256[:12]`), write to `public/book/<slug>/<hash>.<ext>`, emit `![](/book/<slug>/<hash>.<ext>)` on its own line.
      - **Table** → render as GFM markdown table when convertible, otherwise screenshot the table area (image fallback — see Table Strategy).
      - **Plain paragraph** → markdown text, preserving inline `**bold**` from runs that have `<w:b/>`.
   4. Write the assembled markdown to `data/book/<slug>.md`.
4. **Post-pass per chapter**: parse all `![...](/book/<slug>/...)` references in the new `.md`, assert every referenced file exists, and assert there are no orphan files in `public/book/<slug>/`.

## Heading Strategy

Headings come from the existing `.md` (peer-reviewed, already powering the TOC). The script does NOT re-derive headings from docx font sizes. Instead it pattern-matches each docx paragraph against the known anchor list and re-emits the anchor heading in place when found.

If an anchor is not found in the docx slice, the script:
- Logs `[WARN] <slug>: anchor "<text>" not found in docx`
- Still emits the heading at its original sequential position so the page renders and the TOC stays intact.

Author resolves drift case-by-case during review.

## Code Detection

A paragraph becomes part of a fenced code block if **either** signal fires:

- **Font signal**: at least one run uses a monospace font family — `Consolas`, `Menlo`, `Courier`, `Courier New`, `Monaco`, `Source Code Pro`, `Cascadia Code`, `JetBrains Mono`, `SF Mono`, `Inconsolata`, `Roboto Mono`, `Fira Code`, `Noto Mono`. (Initial heuristic; tighten to "all runs monospace" if false-positives appear.)
- **Shading signal**: paragraph has a `<w:pPr><w:shd>` element with a non-`auto`/non-white fill (the gray-box "code" look in Word).

Consecutive code paragraphs merge into one fenced block. Language tag is left empty (\`\`\`) — author can add per-block tags during review if desired.

## Table Strategy

Default: convert to GFM markdown table.

```
| header1 | header2 |
| ------- | ------- |
| cell    | cell    |
```

Cell text is the concatenated paragraph text of each cell.

**Manual fallback** when:
- Any cell has `gridSpan > 1` or `vMerge` (merged cells), OR
- Any cell contains a `<w:drawing>` (image inside a cell), OR
- Table is listed in a `TABLE_FALLBACK` set at the top of the script (manual escape hatch indexed by `(slug, table_index_in_chapter)`).

The script does not auto-rasterize tables (would require LibreOffice/headless Word). Instead it emits an HTML comment placeholder:

```
<!-- TABLE FALLBACK: <slug> table #N — paste a screenshot here -->
```

…and logs `[FALLBACK NEEDED] <slug> table #N (reason: merged_cells | image_in_cell | manual)`. The author screenshots the table from Word, drops the PNG into `public/book/<slug>/`, and replaces the comment with `![](/book/<slug>/<filename>.png)`. One-time tax for genuinely unconvertible tables.

## Image Naming & Deduplication

- Filename: `<sha256[:12]>.<ext>` (matches existing scheme in `public/book/`).
- Same image bytes used in two chapters produces the same hash — but each chapter has its own directory, so the file is written once per chapter that uses it. (We don't share across chapters; this matches existing layout.)
- Extension is taken from the embedded part's content type: `image/png` → `.png`, `image/jpeg` → `.jpg`, `image/gif` → `.gif`.

## Wipe Strategy

For each chapter we process:
1. `rm -rf public/book/<slug>/*` (directory itself is preserved)
2. Run extraction → write new files
3. Audit: every `.md` image ref points to an existing file; every file in the directory is referenced by at least one `.md` ref.

The script processes chapters one at a time and aborts on first audit failure (no half-written state across chapters).

## Validation

**Script-internal (automated):**
- Anchor coverage warnings (see Heading Strategy).
- Image audit (see Wipe Strategy).
- Table fallback log entries.
- Final summary: `<slug>: paragraphs=N, code_blocks=N, images=N, tables=N, fallbacks=N`.

**Manual gate (author, before each commit):**
- Run `npm run dev`, open the chapter page, scroll through. Confirm: tables render correctly, images appear at the right paragraphs, code blocks are styled, no obvious garbled text.
- Spot-check one section against the `.docx` opened in Word.

## Failure Modes

| Symptom | Response |
|---------|----------|
| Code detection over-fires (normal text wrongly fenced) | Tighten heuristic — require *all* runs monospace, not *any*. Re-run. |
| Anchors don't match (mineru heading text ≠ docx text) | Script warns; author edits the anchor text in the `.md` to match the docx phrasing, or accepts the drift. |
| Table renders broken (very wide, embedded images) | Add `(slug, table_index)` to `TABLE_FALLBACK`. Re-run that chapter. |
| Too noisy to ship in one commit | `--only=cognition,setup` flag scopes the run. Author commits chapter-by-chapter. |
| `[FALLBACK NEEDED]` for a table image | Author hand-pastes a screenshot into `public/book/<slug>/`, replaces the placeholder ref. One-time tax for genuinely unconvertible tables. |

## Execution Model

- Plan executed via `superpowers:subagent-driven-development` (matches previous chapter-content round).
- Branch: work directly on `main`. Commit per chapter once it passes the manual gate.
- Test artifacts: there is no automated test surface for content correctness — the manual gate is the test.

## File Inventory

**Created:**
- `scripts/rebuild-from-docx.py` (~300 lines)

**Overwritten (per chapter, when its turn comes):**
- `data/book/<slug>.md` × 9
- `public/book/<slug>/*` × 9 (directory wiped + refilled)

**Untouched:**
- `lib/book-content.ts`
- `components/markdown-body.tsx`
- `components/part-toc.tsx`
- `components/part-cover.tsx`
- `components/part-nav.tsx`
- `app/book/[slug]/page.tsx`
- `data/book/index.ts`
- All home-page / header / footer code
