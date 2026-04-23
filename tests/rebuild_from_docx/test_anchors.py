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
