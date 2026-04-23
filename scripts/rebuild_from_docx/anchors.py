"""Extract H1/H2/H3 headings from an existing .md file."""
import re
from pathlib import Path

HEADING_RE = re.compile(r"^(#{1,3})\s+(.+?)\s*$")


def load_anchors(md_path: Path) -> list[tuple[str, int]]:
    """Return list of (heading_text, level) in document order. Levels 1-3 only.

    Skips heading-like lines inside fenced code blocks.  Per the CommonMark
    spec, a closing fence must be a bare ``` (no info string); a line like
    ```bash inside an open fence is treated as literal content, not a new fence.
    """
    anchors: list[tuple[str, int]] = []
    in_fence = False
    for line in md_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            if not in_fence:
                # Opening fence: any ```<info> starts a fence
                in_fence = True
            elif stripped == "```":
                # Closing fence: only a bare ``` (no info string) closes it
                in_fence = False
            # else: ```<info> inside a fence is literal content — ignore
            continue
        if in_fence:
            continue
        m = HEADING_RE.match(line)
        if m:
            anchors.append((m.group(2).strip(), len(m.group(1))))
    return anchors
