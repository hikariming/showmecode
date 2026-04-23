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
