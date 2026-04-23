"""Walk a chapter's body elements, emit final markdown."""
import re
import sys
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

# Strip leading numbering like "1. ", "2、", "3、 ", etc., before comparing.
# These prefixes appear in the docx body but were stripped from the peer-reviewed .md anchors.
_LEADING_NUM_RE = re.compile(r"^\s*\d+\s*[.、]\s*")
_WS_RE = re.compile(r"\s+")


def _normalize_text(s: str) -> str:
    """Normalize for anchor matching: strip leading numbering, then collapse whitespace."""
    s = _LEADING_NUM_RE.sub("", s)
    return _WS_RE.sub("", s)


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
    # Normalize anchor keys by collapsing whitespace and stripping leading numbering
    # — guards against drift like "AI 是乙方" / "1. 言出法随" between docx and .md.
    anchor_lookup_normalized = {
        _normalize_text(text): (text, lvl) for text, lvl in anchors
    }
    matched_anchors: set[str] = set()
    seen_front_matter = False
    table_index = 0
    out: list[str] = []

    for el in body_elements:
        if isinstance(el, Paragraph):
            text = el.text.strip()
            norm = _normalize_text(text)
            if norm in anchor_lookup_normalized:
                canonical_text, lvl = anchor_lookup_normalized[norm]
                matched_anchors.add(canonical_text)
                out.append(f"{'#' * lvl} {canonical_text}")
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

    for text, lvl in anchors:
        if text in matched_anchors:
            continue
        print(f"[WARN] {slug}: anchor not found in docx — H{lvl} {text!r}", file=sys.stderr)

    return "\n\n".join(out) + "\n"
