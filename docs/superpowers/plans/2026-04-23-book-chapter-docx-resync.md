# Book Chapter Re-sync from .docx Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild 9 chapter `.md` files plus their image assets directly from `《赤脚程序员实战手册》.docx` so body text, tables, code, and image positions match the book exactly.

**Architecture:** A single Python script (`scripts/rebuild-from-docx.py`) walks the docx body in order, slices it into 9 chapters by `第N部分：` markers, and emits one markdown file per chapter plus a fresh `public/book/<slug>/` image directory. Existing `.md` headings (peer-reviewed) become anchors that pin TOC structure. Inline code comes from runs in Consolas font; multi-line code comes from 1×1 tables whose runs are all Consolas; data tables become GFM tables; other 1×1 tables are unwrapped as plain paragraphs.

**Tech Stack:** Python 3 with `python-docx` (already present in env from previous rounds), `lxml` (transitive), `hashlib` + `pathlib` from stdlib, `pytest` for unit tests.

**Spec:** `docs/superpowers/specs/2026-04-23-book-chapter-docx-resync-design.md`

---

## File Structure

**Create:**
- `scripts/rebuild_from_docx/__init__.py` — empty, marks package
- `scripts/rebuild_from_docx/slicer.py` — chapter detection by `第N部分：` markers
- `scripts/rebuild_from_docx/anchors.py` — read existing `.md` headings into anchor dict
- `scripts/rebuild_from_docx/runs.py` — convert paragraph runs (Arial/Consolas) → markdown text with inline code
- `scripts/rebuild_from_docx/tables.py` — classify and render tables (code / data / callout)
- `scripts/rebuild_from_docx/images.py` — extract `<w:drawing>` → hashed file in `public/book/<slug>/`
- `scripts/rebuild_from_docx/render.py` — orchestrate per-chapter walk, emit final `.md`
- `scripts/rebuild-from-docx.py` — CLI entry point: `python scripts/rebuild-from-docx.py [--only=slug,slug] [--dry-run]`
- `tests/rebuild_from_docx/__init__.py` — empty
- `tests/rebuild_from_docx/test_slicer.py`
- `tests/rebuild_from_docx/test_anchors.py`
- `tests/rebuild_from_docx/test_runs.py`
- `tests/rebuild_from_docx/test_tables.py`
- `tests/rebuild_from_docx/test_images.py`
- `tests/rebuild_from_docx/fixtures/` — minimal `.docx` fixtures built by tests on the fly
- `tests/rebuild_from_docx/conftest.py` — `pytest` fixtures for building tiny docx files in memory

**Overwritten (per chapter, when its turn comes in T8):**
- `data/book/<slug>.md` × 9
- `public/book/<slug>/*` × 9 (directory wiped + refilled)

**Untouched:** `lib/book-content.ts`, `components/markdown-body.tsx`, `components/part-toc.tsx`, `components/part-cover.tsx`, `components/part-nav.tsx`, `app/book/[slug]/page.tsx`, `data/book/index.ts`, all home-page / header / footer code.

---

### Task 1: Project skeleton + chapter slicer

**Files:**
- Create: `scripts/rebuild_from_docx/__init__.py`
- Create: `scripts/rebuild_from_docx/slicer.py`
- Create: `tests/rebuild_from_docx/__init__.py`
- Create: `tests/rebuild_from_docx/conftest.py`
- Create: `tests/rebuild_from_docx/test_slicer.py`

- [ ] **Step 1: Create empty package marker files**

```bash
mkdir -p scripts/rebuild_from_docx tests/rebuild_from_docx
touch scripts/rebuild_from_docx/__init__.py tests/rebuild_from_docx/__init__.py
```

- [ ] **Step 2: Verify python-docx + pytest are available**

Run: `python3 -c "import docx, pytest; print(docx.__version__, pytest.__version__)"`
Expected: prints two version numbers. If `pytest` missing: `pip install pytest`.

- [ ] **Step 3: Write conftest.py with a tiny-docx builder fixture**

Create `tests/rebuild_from_docx/conftest.py`:

```python
import pytest
from docx import Document
from docx.shared import Pt


@pytest.fixture
def make_doc():
    """Build an in-memory Document. `paras` is a list of (text, font_name | None)."""
    def _make(paras):
        doc = Document()
        for text, font in paras:
            p = doc.add_paragraph()
            run = p.add_run(text)
            if font:
                run.font.name = font
                run.font.size = Pt(11)
        return doc
    return _make
```

- [ ] **Step 4: Write the failing slicer test**

Create `tests/rebuild_from_docx/test_slicer.py`:

```python
from scripts.rebuild_from_docx.slicer import slice_by_part


def test_slices_three_parts(make_doc):
    doc = make_doc([
        ("第一部分：A", None),
        ("body A1", None),
        ("body A2", None),
        ("第二部分：B", None),
        ("body B1", None),
        ("第三部分：C", None),
        ("body C1", None),
    ])
    result = slice_by_part(doc)
    assert sorted(result.keys()) == [1, 2, 3]
    assert [el.text for el in result[1]] == ["body A1", "body A2"]
    assert [el.text for el in result[2]] == ["body B1"]
    assert [el.text for el in result[3]] == ["body C1"]


def test_ignores_paragraphs_before_part_one(make_doc):
    doc = make_doc([
        ("preamble", None),
        ("第一部分：A", None),
        ("body A1", None),
    ])
    result = slice_by_part(doc)
    assert list(result.keys()) == [1]
    assert [el.text for el in result[1]] == ["body A1"]


def test_handles_no_parts_returns_empty(make_doc):
    doc = make_doc([("just text", None)])
    assert slice_by_part(doc) == {}
```

- [ ] **Step 5: Run the failing tests**

Run: `python3 -m pytest tests/rebuild_from_docx/test_slicer.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'scripts.rebuild_from_docx.slicer'`.

- [ ] **Step 6: Implement slicer**

Create `scripts/rebuild_from_docx/slicer.py`:

```python
"""Slice a Document into chapter blocks by `第N部分：` markers."""
import re
from typing import Iterable, Union

from docx.document import Document
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

PART_RE = re.compile(r"^第([一二三四五六七八九])部分[：:]")
NUM_MAP = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9}

BodyElement = Union[Paragraph, Table]


def _iter_body(doc: Document) -> Iterable[BodyElement]:
    """Yield paragraphs and tables in document order (python-docx loses order otherwise)."""
    body = doc.element.body
    for child in body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, doc)
        elif child.tag == qn("w:tbl"):
            yield Table(child, doc)


def slice_by_part(doc: Document) -> dict[int, list[BodyElement]]:
    """Return {part_number: [body elements between this marker and the next]}."""
    chapters: dict[int, list[BodyElement]] = {}
    current: int | None = None
    for el in _iter_body(doc):
        text = el.text.strip() if isinstance(el, Paragraph) else ""
        m = PART_RE.match(text)
        if m:
            current = NUM_MAP[m.group(1)]
            chapters[current] = []
            continue
        if current is not None:
            chapters[current].append(el)
    return chapters
```

- [ ] **Step 7: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_slicer.py -v`
Expected: 3 passed.

- [ ] **Step 8: Commit**

```bash
git add scripts/rebuild_from_docx/__init__.py scripts/rebuild_from_docx/slicer.py tests/rebuild_from_docx/
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): chapter slicer

Slices a Document into nine chapter blocks by 第N部分： markers,
preserving paragraph + table order.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Anchor extraction from existing .md

**Files:**
- Create: `scripts/rebuild_from_docx/anchors.py`
- Create: `tests/rebuild_from_docx/test_anchors.py`

- [ ] **Step 1: Write failing tests**

Create `tests/rebuild_from_docx/test_anchors.py`:

```python
from pathlib import Path

from scripts.rebuild_from_docx.anchors import load_anchors


def test_extracts_h1_h2_h3(tmp_path: Path):
    md = tmp_path / "x.md"
    md.write_text(
        "# 第一部分：认知篇\n\n"
        "intro paragraph\n\n"
        "## Why Vibe Coding\n\n"
        "body\n\n"
        "### 第 1 步：唤起向导\n\n"
        "step body\n",
        encoding="utf-8",
    )
    result = load_anchors(md)
    assert result == [
        ("第一部分：认知篇", 1),
        ("Why Vibe Coding", 2),
        ("第 1 步：唤起向导", 3),
    ]


def test_ignores_h4_and_below(tmp_path: Path):
    md = tmp_path / "x.md"
    md.write_text("# A\n\n#### too deep\n\n##### deeper\n", encoding="utf-8")
    assert load_anchors(md) == [("A", 1)]


def test_ignores_hash_inside_code_block(tmp_path: Path):
    md = tmp_path / "x.md"
    md.write_text(
        "# Real\n\n```\n# not a heading\n## also not\n```\n\n## Also Real\n",
        encoding="utf-8",
    )
    assert load_anchors(md) == [("Real", 1), ("Also Real", 2)]
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `python3 -m pytest tests/rebuild_from_docx/test_anchors.py -v`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement anchors loader**

Create `scripts/rebuild_from_docx/anchors.py`:

```python
"""Extract H1/H2/H3 headings from an existing .md file."""
import re
from pathlib import Path

HEADING_RE = re.compile(r"^(#{1,3})\s+(.+?)\s*$")


def load_anchors(md_path: Path) -> list[tuple[str, int]]:
    """Return list of (heading_text, level) in document order. Levels 1-3 only.

    Skips heading-like lines inside fenced code blocks.
    """
    anchors: list[tuple[str, int]] = []
    in_fence = False
    for line in md_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = HEADING_RE.match(line)
        if m:
            anchors.append((m.group(2).strip(), len(m.group(1))))
    return anchors
```

- [ ] **Step 4: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_anchors.py -v`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/rebuild_from_docx/anchors.py tests/rebuild_from_docx/test_anchors.py
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): anchor loader

Reads existing chapter .md files and extracts H1-H3 headings as anchors.
Skips heading-like lines inside fenced code blocks.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Run-level renderer (inline code via Consolas)

**Files:**
- Create: `scripts/rebuild_from_docx/runs.py`
- Create: `tests/rebuild_from_docx/test_runs.py`

- [ ] **Step 1: Write failing tests**

Create `tests/rebuild_from_docx/test_runs.py`:

```python
from scripts.rebuild_from_docx.runs import paragraph_to_markdown


def test_plain_text(make_doc):
    doc = make_doc([("hello world", None)])
    p = doc.paragraphs[0]
    assert paragraph_to_markdown(p) == "hello world"


def test_inline_code_via_consolas(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    p.add_run("run ")
    code = p.add_run("npm install")
    code.font.name = "Consolas"
    p.add_run(" first")
    assert paragraph_to_markdown(p) == "run `npm install` first"


def test_bold_run_emits_double_star(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    p.add_run("see ")
    bold = p.add_run("important")
    bold.bold = True
    p.add_run(" note")
    assert paragraph_to_markdown(p) == "see **important** note"


def test_consolas_takes_precedence_over_bold(make_doc):
    """Bold + Consolas → inline code, not bolded code."""
    doc = make_doc([])
    p = doc.add_paragraph()
    code = p.add_run("npm")
    code.font.name = "Consolas"
    code.bold = True
    assert paragraph_to_markdown(p) == "`npm`"


def test_empty_paragraph_returns_empty_string(make_doc):
    doc = make_doc([("", None)])
    assert paragraph_to_markdown(doc.paragraphs[0]) == ""


def test_adjacent_consolas_runs_merge_into_single_backticks(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    a = p.add_run("npm "); a.font.name = "Consolas"
    b = p.add_run("install"); b.font.name = "Consolas"
    assert paragraph_to_markdown(p) == "`npm install`"
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `python3 -m pytest tests/rebuild_from_docx/test_runs.py -v`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement runs renderer**

Create `scripts/rebuild_from_docx/runs.py`:

```python
"""Render a docx Paragraph's runs to markdown text."""
from docx.text.paragraph import Paragraph

CODE_FONTS = {"Consolas", "Menlo", "Courier", "Courier New", "Monaco"}


def _is_code(run) -> bool:
    return (run.font.name or "") in CODE_FONTS


def paragraph_to_markdown(p: Paragraph) -> str:
    """Convert a Paragraph's runs into a single markdown string.

    - Runs in a code font → wrapped in backticks (adjacent runs merge).
    - Bold runs (non-code) → wrapped in `**...**`.
    - Code formatting takes precedence over bold for the same run.
    - Empty runs are skipped.
    """
    out: list[str] = []
    code_buf: list[str] = []

    def flush_code():
        if code_buf:
            joined = "".join(code_buf)
            if joined.strip():
                out.append(f"`{joined}`")
            else:
                out.append(joined)
            code_buf.clear()

    for run in p.runs:
        text = run.text
        if not text:
            continue
        if _is_code(run):
            code_buf.append(text)
            continue
        flush_code()
        if run.bold and text.strip():
            out.append(f"**{text}**")
        else:
            out.append(text)
    flush_code()
    return "".join(out)
```

- [ ] **Step 4: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_runs.py -v`
Expected: 6 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/rebuild_from_docx/runs.py tests/rebuild_from_docx/test_runs.py
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): paragraph run renderer

Converts paragraph runs to markdown: Consolas → inline backticks
(adjacent runs merge), bold → **stars**. Code formatting wins over bold.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Image extractor

**Files:**
- Create: `scripts/rebuild_from_docx/images.py`
- Create: `tests/rebuild_from_docx/test_images.py`

- [ ] **Step 1: Write failing tests**

Create `tests/rebuild_from_docx/test_images.py`:

```python
import hashlib
from pathlib import Path

from docx import Document
from docx.shared import Inches

from scripts.rebuild_from_docx.images import extract_drawings_from_paragraph


def test_extract_image_writes_hashed_file(tmp_path: Path):
    # Build a docx with one inline image
    doc = Document()
    p = doc.add_paragraph()
    run = p.add_run()
    fixture = tmp_path / "tiny.png"
    fixture.write_bytes(b"\x89PNG\r\n\x1a\n" + b"x" * 100)  # not a real PNG, fine for hashing
    run.add_picture(str(fixture), width=Inches(1.0))

    out_dir = tmp_path / "out"
    out_dir.mkdir()
    refs = extract_drawings_from_paragraph(doc.paragraphs[0], doc, out_dir, slug="cognition")

    assert len(refs) == 1
    ref = refs[0]
    # ref looks like /book/cognition/<hash>.png
    assert ref.startswith("/book/cognition/")
    assert ref.endswith(".png")
    # file actually written
    written = list(out_dir.glob("*.png"))
    assert len(written) == 1
    # hash matches first 12 chars of sha256
    expected_hash = hashlib.sha256(written[0].read_bytes()).hexdigest()[:12]
    assert expected_hash in ref


def test_paragraph_with_no_drawing_returns_empty(make_doc, tmp_path: Path):
    doc = make_doc([("plain text", None)])
    out_dir = tmp_path / "out"
    out_dir.mkdir()
    assert extract_drawings_from_paragraph(doc.paragraphs[0], doc, out_dir, slug="x") == []
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `python3 -m pytest tests/rebuild_from_docx/test_images.py -v`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement images extractor**

Create `scripts/rebuild_from_docx/images.py`:

```python
"""Extract <w:drawing> images from a paragraph and write them to disk."""
import hashlib
from pathlib import Path

from docx.document import Document
from docx.oxml.ns import qn
from docx.text.paragraph import Paragraph

EXT_BY_CT = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
}


def _embed_ids_in_paragraph(p_element) -> list[str]:
    blip_tag = "{http://schemas.openxmlformats.org/drawingml/2006/main}blip"
    embed_attr = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed"
    return [
        blip.get(embed_attr)
        for blip in p_element.iter(blip_tag)
        if blip.get(embed_attr)
    ]


def extract_drawings_from_paragraph(
    p: Paragraph, doc: Document, out_dir: Path, slug: str
) -> list[str]:
    """Write each image in `p` to `out_dir/<sha256[:12]>.<ext>` and return /book/<slug>/<file> refs."""
    refs: list[str] = []
    for embed_id in _embed_ids_in_paragraph(p._element):
        part = doc.part.related_parts[embed_id]
        data = part.blob
        digest = hashlib.sha256(data).hexdigest()[:12]
        ext = EXT_BY_CT.get(part.content_type, "")
        if not ext:
            ext = Path(part.partname).suffix or ".bin"
        target = out_dir / f"{digest}{ext}"
        if not target.exists():
            target.write_bytes(data)
        refs.append(f"/book/{slug}/{digest}{ext}")
    return refs
```

- [ ] **Step 4: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_images.py -v`
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/rebuild_from_docx/images.py tests/rebuild_from_docx/test_images.py
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): image extractor

Extracts inline drawings from a paragraph, dedupes by sha256[:12]
content hash, writes to public/book/<slug>/<hash>.<ext>, returns
markdown image references.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Table classifier and renderer

**Files:**
- Create: `scripts/rebuild_from_docx/tables.py`
- Create: `tests/rebuild_from_docx/test_tables.py`

- [ ] **Step 1: Write failing tests**

Create `tests/rebuild_from_docx/test_tables.py`:

```python
from docx import Document

from scripts.rebuild_from_docx.tables import (
    classify_table,
    render_code_table,
    render_data_table,
    render_callout_table,
)


def _add_consolas_table(doc: Document, lang_first: bool, body: str) -> None:
    t = doc.add_table(rows=1, cols=1)
    p = t.rows[0].cells[0].paragraphs[0]
    if lang_first:
        text = body
    else:
        text = body
    run = p.add_run(text)
    run.font.name = "Consolas"


def test_classify_code_container():
    doc = Document()
    _add_consolas_table(doc, lang_first=True, body="JSON\n{\"k\": 1}")
    assert classify_table(doc.tables[0]) == "code"


def test_classify_data_table():
    doc = Document()
    t = doc.add_table(rows=2, cols=2)
    t.rows[0].cells[0].text = "h1"
    t.rows[0].cells[1].text = "h2"
    t.rows[1].cells[0].text = "v1"
    t.rows[1].cells[1].text = "v2"
    assert classify_table(doc.tables[0]) == "data"


def test_classify_callout():
    doc = Document()
    t = doc.add_table(rows=1, cols=1)
    t.rows[0].cells[0].text = "just a note"
    assert classify_table(doc.tables[0]) == "callout"


def test_classify_respects_manual_fallback_override():
    """If (slug, idx) is in TABLE_FALLBACK, classify_table returns 'fallback'."""
    from scripts.rebuild_from_docx.tables import TABLE_FALLBACK
    doc = Document()
    t = doc.add_table(rows=2, cols=2)
    t.rows[0].cells[0].text = "h"
    TABLE_FALLBACK.add(("any-slug", 0))
    try:
        assert classify_table(doc.tables[0], slug="any-slug", index=0) == "fallback"
    finally:
        TABLE_FALLBACK.discard(("any-slug", 0))


def test_render_code_table_strips_known_language_hint():
    doc = Document()
    _add_consolas_table(doc, lang_first=True, body="JSON\n{\"k\": 1}")
    rendered = render_code_table(doc.tables[0])
    assert rendered == '```json\n{"k": 1}\n```'


def test_render_code_table_maps_plain_text_to_text():
    doc = Document()
    _add_consolas_table(doc, lang_first=True, body="Plain Text\ngit -v")
    assert render_code_table(doc.tables[0]) == "```text\ngit -v\n```"


def test_render_code_table_keeps_unknown_first_line_as_code():
    doc = Document()
    _add_consolas_table(doc, lang_first=True, body="本次可以执行\nls -la")
    # not a known language → no language tag, first line stays in body
    assert render_code_table(doc.tables[0]) == "```\n本次可以执行\nls -la\n```"


def test_render_data_table_to_gfm():
    doc = Document()
    t = doc.add_table(rows=3, cols=2)
    t.rows[0].cells[0].text = "维度"
    t.rows[0].cells[1].text = "值"
    t.rows[1].cells[0].text = "速度"
    t.rows[1].cells[1].text = "快"
    t.rows[2].cells[0].text = "成本"
    t.rows[2].cells[1].text = "低"
    assert render_data_table(doc.tables[0]) == (
        "| 维度 | 值 |\n"
        "| --- | --- |\n"
        "| 速度 | 快 |\n"
        "| 成本 | 低 |"
    )


def test_render_callout_emits_paragraphs():
    doc = Document()
    t = doc.add_table(rows=1, cols=1)
    t.rows[0].cells[0].paragraphs[0].add_run("first line")
    t.rows[0].cells[0].add_paragraph("second line")
    rendered = render_callout_table(doc.tables[0])
    assert rendered == "first line\n\nsecond line"
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `python3 -m pytest tests/rebuild_from_docx/test_tables.py -v`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement tables module**

Create `scripts/rebuild_from_docx/tables.py`:

```python
"""Classify and render docx tables.

Three classes seen in 《赤脚程序员实战手册》.docx (244 tables total):

- code: 1×1 cell whose runs are all Consolas. First text line is a language hint.
- data: ≥2 rows × ≥2 cols, no Consolas runs.
- callout: anything else (1×1 plain prose, 1×N author/intro boxes).
"""
from docx.table import Table

from .runs import paragraph_to_markdown

CODE_FONTS = {"Consolas", "Menlo", "Courier", "Courier New", "Monaco"}

# Manual escape hatch: tables that cannot render cleanly as GFM (merged cells,
# images-in-cells, very wide content). Keyed by (slug, table_index_within_chapter).
# Empty by default; populated only if T8 manual gate uncovers a broken table.
TABLE_FALLBACK: set[tuple[str, int]] = set()

LANG_MAP = {
    "plain text": "text",
    "shell": "bash",
    "ps": "powershell",
    "powershell": "powershell",
    "bash": "bash",
    "sh": "bash",
    "json": "json",
    "yaml": "yaml",
    "yml": "yaml",
    "javascript": "javascript",
    "js": "javascript",
    "typescript": "typescript",
    "ts": "typescript",
    "html": "html",
    "css": "css",
    "sql": "sql",
    "python": "python",
    "py": "python",
    "markdown": "markdown",
    "md": "markdown",
    "swift": "swift",
}


def _all_consolas(table: Table) -> bool:
    """True if every non-whitespace run in every cell is in a code font."""
    saw_any = False
    for row in table.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                for r in p.runs:
                    if not r.text.strip():
                        continue
                    saw_any = True
                    if (r.font.name or "") not in CODE_FONTS:
                        return False
    return saw_any


def classify_table(table: Table, slug: str | None = None, index: int | None = None) -> str:
    if slug is not None and index is not None and (slug, index) in TABLE_FALLBACK:
        return "fallback"
    rows = len(table.rows)
    cols = len(table.columns) if rows else 0
    if rows == 1 and cols == 1 and _all_consolas(table):
        return "code"
    if rows >= 2 and cols >= 2 and not _all_consolas(table):
        return "data"
    return "callout"


def render_fallback_placeholder(slug: str, index: int) -> str:
    """Emit an HTML comment for the author to replace with a hand-pasted screenshot."""
    return f"<!-- TABLE FALLBACK: {slug} table #{index} — paste a screenshot here -->"


def render_code_table(table: Table) -> str:
    cell = table.rows[0].cells[0]
    raw = "\n".join(p.text for p in cell.paragraphs).rstrip()
    lines = raw.split("\n")
    lang = ""
    body_lines = lines
    if lines:
        first = lines[0].strip().lower()
        if first in LANG_MAP:
            lang = LANG_MAP[first]
            body_lines = lines[1:]
    body = "\n".join(body_lines).rstrip()
    return f"```{lang}\n{body}\n```"


def render_data_table(table: Table) -> str:
    rows_text = [[cell.text.strip().replace("\n", " ") for cell in row.cells] for row in table.rows]
    if not rows_text:
        return ""
    header = "| " + " | ".join(rows_text[0]) + " |"
    sep = "| " + " | ".join(["---"] * len(rows_text[0])) + " |"
    body = ["| " + " | ".join(row) + " |" for row in rows_text[1:]]
    return "\n".join([header, sep, *body])


def render_callout_table(table: Table) -> str:
    """Unwrap a 1×N callout: emit each cell's paragraphs as plain markdown, blank-line separated."""
    parts: list[str] = []
    for row in table.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                text = paragraph_to_markdown(p)
                if text.strip():
                    parts.append(text)
    return "\n\n".join(parts)
```

- [ ] **Step 4: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_tables.py -v`
Expected: 9 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/rebuild_from_docx/tables.py tests/rebuild_from_docx/test_tables.py
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): table classifier and renderer

Classifies docx tables as code (1x1 all-Consolas), data (≥2x≥2),
or callout. Renders code tables as fenced blocks with language
detection, data tables as GFM, callouts unwrapped to paragraphs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Per-chapter render orchestrator

**Files:**
- Create: `scripts/rebuild_from_docx/render.py`
- Create: `tests/rebuild_from_docx/test_render.py`

This task wires slicer + anchors + runs + images + tables into one render function. The orchestrator walks a chapter's body elements, emits anchor headings when a paragraph matches an anchor (text equality), emits images on their own line, and skips the per-chapter front-matter callout (the first table containing `本章作者：`).

- [ ] **Step 1: Write failing tests**

Create `tests/rebuild_from_docx/test_render.py`:

```python
from pathlib import Path

import pytest
from docx import Document

from scripts.rebuild_from_docx.render import render_chapter


@pytest.fixture
def anchor_md(tmp_path):
    def _write(headings: list[tuple[str, int]]) -> Path:
        md = tmp_path / "anchors.md"
        md.write_text(
            "\n\n".join(f"{'#' * lvl} {text}" for text, lvl in headings),
            encoding="utf-8",
        )
        return md
    return _write


def test_emits_anchor_heading_when_paragraph_matches(anchor_md, tmp_path):
    md = anchor_md([("第一部分：A", 1), ("Section X", 2)])
    doc = Document()
    doc.add_paragraph("intro")
    doc.add_paragraph("Section X")  # this should become "## Section X"
    doc.add_paragraph("body of section")
    out_imgs = tmp_path / "imgs"; out_imgs.mkdir()
    result = render_chapter(
        body_elements=doc.paragraphs,
        anchors_md=md,
        slug="x",
        images_dir=out_imgs,
    )
    assert "# 第一部分：A" in result
    assert "## Section X" in result
    assert "intro" in result
    assert "body of section" in result
    # Section X must appear as a heading exactly once — never as a plain paragraph too
    assert result.count("Section X") == 1


def test_skips_front_matter_callout_table(anchor_md, tmp_path):
    md = anchor_md([("第一部分：A", 1)])
    doc = Document()
    t = doc.add_table(rows=1, cols=1)
    t.rows[0].cells[0].text = "本章作者：明立\nAI教育工作者"
    doc.add_paragraph("real body")
    body = list(_iter_body_for_test(doc))
    out_imgs = tmp_path / "imgs"; out_imgs.mkdir()
    result = render_chapter(body, md, "x", out_imgs)
    assert "本章作者" not in result
    assert "real body" in result


def test_renders_data_table_inline(anchor_md, tmp_path):
    md = anchor_md([("第一部分：A", 1)])
    doc = Document()
    t = doc.add_table(rows=2, cols=2)
    t.rows[0].cells[0].text = "k"
    t.rows[0].cells[1].text = "v"
    t.rows[1].cells[0].text = "1"
    t.rows[1].cells[1].text = "2"
    body = list(_iter_body_for_test(doc))
    out_imgs = tmp_path / "imgs"; out_imgs.mkdir()
    result = render_chapter(body, md, "x", out_imgs)
    assert "| k | v |" in result
    assert "| 1 | 2 |" in result


def _iter_body_for_test(doc):
    """Mirror slicer's body-iteration so tests can hand a chapter slice to render_chapter."""
    from docx.oxml.ns import qn
    from docx.text.paragraph import Paragraph
    from docx.table import Table
    for child in doc.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, doc)
        elif child.tag == qn("w:tbl"):
            yield Table(child, doc)
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `python3 -m pytest tests/rebuild_from_docx/test_render.py -v`
Expected: FAIL with `ModuleNotFoundError`.

- [ ] **Step 3: Implement render orchestrator**

Create `scripts/rebuild_from_docx/render.py`:

```python
"""Walk a chapter's body elements, emit final markdown."""
from pathlib import Path
from typing import Iterable

from docx.document import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

from .anchors import load_anchors
from .images import extract_drawings_from_paragraph
from .runs import paragraph_to_markdown
from .tables import (
    classify_table,
    render_callout_table,
    render_code_table,
    render_data_table,
    render_fallback_placeholder,
)

FRONT_MATTER_MARKER = "本章作者"


def _has_drawing(p: Paragraph) -> bool:
    blip_tag = "{http://schemas.openxmlformats.org/drawingml/2006/main}blip"
    return next(p._element.iter(blip_tag), None) is not None


def render_chapter(
    body_elements: Iterable,
    anchors_md: Path,
    slug: str,
    images_dir: Path,
    doc: Document | None = None,
) -> str:
    """Render the chapter body to markdown.

    `doc` is needed only for image extraction; pass the parent Document. If omitted,
    images are skipped (used by tests that don't set up image relationships).
    """
    anchors = load_anchors(anchors_md)
    anchor_lookup = {text: lvl for text, lvl in anchors}
    seen_front_matter = False
    table_index = 0
    out: list[str] = []

    for el in body_elements:
        if isinstance(el, Paragraph):
            text = el.text.strip()
            if text in anchor_lookup:
                lvl = anchor_lookup[text]
                out.append(f"{'#' * lvl} {text}")
                continue
            if doc is not None and _has_drawing(el):
                refs = extract_drawings_from_paragraph(el, doc, images_dir, slug)
                for ref in refs:
                    out.append(f"![]({ref})")
                # If the paragraph has BOTH text and image, emit the text after the image
                rendered_text = paragraph_to_markdown(el).strip()
                if rendered_text:
                    out.append(rendered_text)
                continue
            rendered = paragraph_to_markdown(el)
            if rendered.strip():
                out.append(rendered)
        elif isinstance(el, Table):
            kind = classify_table(el, slug=slug, index=table_index)
            table_index += 1
            if kind == "callout":
                # Skip the first front-matter callout per chapter
                cell_text = el.rows[0].cells[0].text
                if not seen_front_matter and FRONT_MATTER_MARKER in cell_text:
                    seen_front_matter = True
                    continue
                rendered = render_callout_table(el)
            elif kind == "code":
                rendered = render_code_table(el)
            elif kind == "data":
                rendered = render_data_table(el)
            elif kind == "fallback":
                rendered = render_fallback_placeholder(slug, table_index - 1)
            else:
                rendered = ""
            if rendered.strip():
                out.append(rendered)

    return "\n\n".join(out) + "\n"
```

- [ ] **Step 4: Run tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/test_render.py -v`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add scripts/rebuild_from_docx/render.py tests/rebuild_from_docx/test_render.py
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): per-chapter render orchestrator

Walks chapter body, emits anchor headings on text-match,
extracts images, classifies and renders tables. Skips the
本章作者 front-matter callout.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: CLI entry point + audit + integration smoke

**Files:**
- Create: `scripts/rebuild-from-docx.py`
- Create: `tests/rebuild_from_docx/test_cli_integration.py`

This task adds the user-facing CLI, the `--only` flag, the wipe-images-then-write flow, and the post-pass audit (every `.md` image ref points to a real file; no orphan files in the chapter dir). It does **NOT** commit the regenerated content — that happens in Task 8 chapter-by-chapter.

- [ ] **Step 1: Write the slug-map constant + CLI wiring**

Create `scripts/rebuild-from-docx.py`:

```python
#!/usr/bin/env python3
"""Rebuild data/book/<slug>.md and public/book/<slug>/* from the source .docx.

Usage:
    python3 scripts/rebuild-from-docx.py
    python3 scripts/rebuild-from-docx.py --only=cognition,setup
    python3 scripts/rebuild-from-docx.py --dry-run
"""
import argparse
import re
import shutil
import sys
from pathlib import Path

from docx import Document

# Make `scripts.rebuild_from_docx` importable when run directly.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from scripts.rebuild_from_docx.render import render_chapter
from scripts.rebuild_from_docx.slicer import slice_by_part

REPO = Path(__file__).resolve().parent.parent
DOCX = REPO / "《赤脚程序员实战手册》.docx"
DATA_DIR = REPO / "data" / "book"
IMG_ROOT = REPO / "public" / "book"

SLUGS = {
    1: "cognition",
    2: "setup",
    3: "mvp",
    4: "webapp",
    5: "engineering",
    6: "efficiency",
    7: "integration",
    8: "design",
    9: "launch",
}

IMG_REF_RE = re.compile(r"!\[[^\]]*\]\((/book/[^/]+/([^)]+))\)")


def audit(slug: str, md_text: str, images_dir: Path) -> list[str]:
    """Return a list of audit error strings; empty list = pass."""
    errors: list[str] = []
    referenced: set[str] = set()
    for m in IMG_REF_RE.finditer(md_text):
        full_ref, filename = m.group(1), m.group(2)
        referenced.add(filename)
        if not (images_dir / filename).exists():
            errors.append(f"[{slug}] dangling reference: {full_ref}")
    on_disk = {p.name for p in images_dir.iterdir() if p.is_file()}
    for orphan in sorted(on_disk - referenced):
        errors.append(f"[{slug}] orphan file: {orphan}")
    return errors


def process(part: int, slug: str, doc: Document, chapters: dict, dry_run: bool) -> int:
    body = chapters.get(part)
    if body is None:
        print(f"[{slug}] SKIP — no chapter {part} found in docx", file=sys.stderr)
        return 1
    anchors_md = DATA_DIR / f"{slug}.md"
    if not anchors_md.exists():
        print(f"[{slug}] SKIP — anchors file missing: {anchors_md}", file=sys.stderr)
        return 1
    images_dir = IMG_ROOT / slug
    if not dry_run:
        if images_dir.exists():
            for entry in images_dir.iterdir():
                if entry.is_file():
                    entry.unlink()
        else:
            images_dir.mkdir(parents=True)
    md_text = render_chapter(body, anchors_md, slug, images_dir, doc=doc)
    errors = audit(slug, md_text, images_dir) if not dry_run else []
    if errors:
        for e in errors:
            print(e, file=sys.stderr)
        return 2
    if dry_run:
        print(f"[{slug}] DRY — {len(md_text)} chars, would rewrite {anchors_md}")
    else:
        anchors_md.write_text(md_text, encoding="utf-8")
        img_count = sum(1 for _ in images_dir.iterdir())
        print(f"[{slug}] OK — wrote {len(md_text)} chars, {img_count} images")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", default="", help="comma-separated slugs to process")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not DOCX.exists():
        print(f"Source docx not found: {DOCX}", file=sys.stderr)
        return 1
    doc = Document(str(DOCX))
    chapters = slice_by_part(doc)

    targets = list(SLUGS.items())
    if args.only:
        wanted = {s.strip() for s in args.only.split(",") if s.strip()}
        targets = [(p, s) for p, s in targets if s in wanted]
        if not targets:
            print(f"No matching slugs in --only={args.only}", file=sys.stderr)
            return 1

    rc = 0
    for part, slug in targets:
        rc = max(rc, process(part, slug, doc, chapters, args.dry_run))
    return rc


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Add a small integration test that exercises CLI on a tiny in-memory chapter set**

Create `tests/rebuild_from_docx/test_cli_integration.py`:

```python
"""End-to-end smoke that the audit catches dangling refs and orphans."""
from pathlib import Path

import pytest

# Import module under test (file with hyphen → must use importlib)
import importlib.util
import sys


@pytest.fixture(scope="module")
def cli_module():
    path = Path(__file__).resolve().parents[2] / "scripts" / "rebuild-from-docx.py"
    spec = importlib.util.spec_from_file_location("rebuild_cli", path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules["rebuild_cli"] = mod
    spec.loader.exec_module(mod)
    return mod


def test_audit_flags_dangling_reference(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    md = "Hello\n\n![](/book/x/missing.png)\n"
    errs = cli_module.audit("x", md, images)
    assert any("dangling" in e for e in errs)


def test_audit_flags_orphan_file(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    (images / "orphan.png").write_bytes(b"x")
    errs = cli_module.audit("x", "no images here", images)
    assert any("orphan" in e for e in errs)


def test_audit_passes_when_balanced(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    (images / "abc123.png").write_bytes(b"x")
    md = "![](/book/x/abc123.png)\n"
    assert cli_module.audit("x", md, images) == []
```

- [ ] **Step 3: Run all tests, verify pass**

Run: `python3 -m pytest tests/rebuild_from_docx/ -v`
Expected: all tests pass (~25 total).

- [ ] **Step 4: Dry-run the full pipeline**

Run: `python3 scripts/rebuild-from-docx.py --dry-run`
Expected: 9 lines `[<slug>] DRY — N chars, would rewrite ...` and exit code 0.

- [ ] **Step 5: Live-run on cognition only (smallest chapter, safest first)**

Run: `python3 scripts/rebuild-from-docx.py --only=cognition`
Expected: `[cognition] OK — wrote N chars, M images`, exit 0. If audit errors appear, fix the script (do NOT commit data changes yet).

- [ ] **Step 6: Visually smoke the dev server on cognition**

In a separate terminal: `npm run dev` (if not already running). Open http://localhost:3000/book/cognition. Confirm:
- Headings render (TOC populated)
- Images appear at the right paragraphs
- Inline `code` shows in monospace
- Multi-line code blocks have a fenced look
- Any data tables render as tables (cognition has 0 — this is mainly relevant for later chapters)
- No "broken image" placeholders

If anything is structurally wrong (not just minor wording), revert the cognition changes (`git checkout data/book/cognition.md public/book/cognition/`), fix the script, re-run.

- [ ] **Step 7: Commit script + cognition output**

```bash
git add scripts/rebuild-from-docx.py tests/rebuild_from_docx/test_cli_integration.py \
        data/book/cognition.md public/book/cognition/
git commit -m "$(cat <<'EOF'
feat(rebuild-from-docx): CLI + audit + cognition pass

Adds CLI entry point with --only and --dry-run flags, post-pass
image-reference audit (dangling refs + orphans), and the first
regenerated chapter (cognition) as a smoke test.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Roll out remaining 8 chapters

This task is mechanical but author-gated: regenerate each remaining chapter, eyeball the rendered page, and commit. Done one chapter per commit so any breakage is bisectable.

The order proceeds smallest-text first (lowest risk of compounding extraction issues), longest last:

```
setup → mvp → engineering → launch → webapp → integration → efficiency → design
```

- [ ] **Step 1: Regenerate `setup`**

Run: `python3 scripts/rebuild-from-docx.py --only=setup`
Expected: `[setup] OK — wrote N chars, M images`, exit 0.

- [ ] **Step 2: Manual gate for setup**

Open http://localhost:3000/book/setup. Confirm headings, images, code, tables render correctly. Spot-check 2 sections against the .docx in Word.

If issues found that are extraction bugs (mis-detected code, broken table): fix the script, re-run setup, re-check. Do NOT commit setup until clean.

- [ ] **Step 3: Commit setup**

```bash
git add data/book/setup.md public/book/setup/
git commit -m "$(cat <<'EOF'
content(book): regenerate setup chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4: Regenerate, gate, commit `mvp`**

Run: `python3 scripts/rebuild-from-docx.py --only=mvp`
Open http://localhost:3000/book/mvp, check, then:

```bash
git add data/book/mvp.md public/book/mvp/
git commit -m "$(cat <<'EOF'
content(book): regenerate mvp chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Regenerate, gate, commit `engineering`**

Run: `python3 scripts/rebuild-from-docx.py --only=engineering`
Open http://localhost:3000/book/engineering, check, then:

```bash
git add data/book/engineering.md public/book/engineering/
git commit -m "$(cat <<'EOF'
content(book): regenerate engineering chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Regenerate, gate, commit `launch`**

Run: `python3 scripts/rebuild-from-docx.py --only=launch`
Open http://localhost:3000/book/launch, check, then:

```bash
git add data/book/launch.md public/book/launch/
git commit -m "$(cat <<'EOF'
content(book): regenerate launch chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 7: Regenerate, gate, commit `webapp`**

Run: `python3 scripts/rebuild-from-docx.py --only=webapp`
Open http://localhost:3000/book/webapp, check, then:

```bash
git add data/book/webapp.md public/book/webapp/
git commit -m "$(cat <<'EOF'
content(book): regenerate webapp chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 8: Regenerate, gate, commit `integration`**

Run: `python3 scripts/rebuild-from-docx.py --only=integration`
Open http://localhost:3000/book/integration, check, then:

```bash
git add data/book/integration.md public/book/integration/
git commit -m "$(cat <<'EOF'
content(book): regenerate integration chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 9: Regenerate, gate, commit `efficiency`**

Run: `python3 scripts/rebuild-from-docx.py --only=efficiency`
Open http://localhost:3000/book/efficiency, check, then:

```bash
git add data/book/efficiency.md public/book/efficiency/
git commit -m "$(cat <<'EOF'
content(book): regenerate efficiency chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 10: Regenerate, gate, commit `design`**

Run: `python3 scripts/rebuild-from-docx.py --only=design`
Open http://localhost:3000/book/design, check, then:

```bash
git add data/book/design.md public/book/design/
git commit -m "$(cat <<'EOF'
content(book): regenerate design chapter from .docx

Re-extracted via scripts/rebuild-from-docx.py to align body text,
tables, code blocks, and image positions with the authoritative source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 11: Final pass — re-run everything to verify deterministic output**

Run: `python3 scripts/rebuild-from-docx.py`
Expected: 9 `OK` lines, exit 0. `git status` should show only minor diffs (or none) — re-running shouldn't churn unless there's nondeterminism in the script.

- [ ] **Step 12: Push**

```bash
git push origin main
```
