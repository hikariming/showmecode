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
