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
