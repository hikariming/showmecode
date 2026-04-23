#!/usr/bin/env python3
"""Rebuild data/book/<slug>.md and public/book/<slug>/* from the source .docx.

Usage:
    python3 scripts/rebuild-from-docx.py
    python3 scripts/rebuild-from-docx.py --only=cognition,setup
    python3 scripts/rebuild-from-docx.py --dry-run
"""
import argparse
import re
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
    0: "intro",
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
