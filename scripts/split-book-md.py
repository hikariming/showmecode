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
    start_re = re.compile(rf'^# {re.escape(marker)}[:：]', re.MULTILINE)
    m = start_re.search(text)
    if not m:
        raise ValueError(f"part marker not found: {marker}")
    body = text[m.start():]
    if next_marker:
        end_re = re.compile(rf'^# {re.escape(next_marker)}[:：]', re.MULTILINE)
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
