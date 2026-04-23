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
