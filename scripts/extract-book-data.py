#!/usr/bin/env python3
"""One-shot extractor: pulls per-part 痛点/方案/行动/作者 from the source PDF.

Output is a draft for human curation — never imported by the app."""
import json
import re
import unicodedata
from pathlib import Path
from pypdf import PdfReader

PDF = Path(__file__).resolve().parent.parent / "《赤脚程序员实战手册》.pdf"
OUT = Path(__file__).resolve().parent.parent / "data" / "book.draft.json"

PARTS = [
    {"slug": "cognition",   "number": 1, "name": "认知篇",  "fullTitle": "重塑 AI 编程思维",      "stage": "think",  "start": 5,   "end": 16,  "pageCount": 12},
    {"slug": "setup",       "number": 2, "name": "准备篇",  "fullTitle": "打造 VibeCoding 工作台", "stage": "think",  "start": 17,  "end": 74,  "pageCount": 58},
    {"slug": "mvp",         "number": 3, "name": "入门篇",  "fullTitle": "快速构建 MVP",          "stage": "build",  "start": 75,  "end": 114, "pageCount": 40},
    {"slug": "webapp",      "number": 4, "name": "进阶篇",  "fullTitle": "完整网页应用",          "stage": "build",  "start": 115, "end": 171, "pageCount": 57},
    {"slug": "engineering", "number": 5, "name": "秩序篇",  "fullTitle": "建立工程规范",          "stage": "build",  "start": 172, "end": 200, "pageCount": 29},
    {"slug": "efficiency",  "number": 6, "name": "效率篇",  "fullTitle": "把重复劳动交给机器",    "stage": "build",  "start": 201, "end": 249, "pageCount": 49},
    {"slug": "integration", "number": 7, "name": "连接篇",  "fullTitle": "打破能力的孤岛",        "stage": "build",  "start": 250, "end": 291, "pageCount": 42},
    {"slug": "design",      "number": 8, "name": "设计篇",  "fullTitle": "建立工程化审美",        "stage": "polish", "start": 292, "end": 339, "pageCount": 48},
    {"slug": "launch",      "number": 9, "name": "上线篇",  "fullTitle": "让世界看到你的作品",    "stage": "ship",   "start": 340, "end": 365, "pageCount": 26},
]


# CJK Radicals Supplement (U+2E80-U+2EFF) — NFKC does NOT decompose this block,
# so map the artifacts this PDF actually emits.
_CJK_SUPPLEMENT_MAP = {
    "⻚": "页", "⻓": "长", "⻥": "鱼",
    "⻔": "门", "⻜": "飞", "⻅": "见",
}

# Document-specific Kangxi quirk: this PDF emits ⽹ (U+2F75 KANGXI RADICAL BAMBOO)
# in places where 章 was intended (e.g. "本⽵作者" → "本章作者"). Apply BEFORE NFKC
# so we don't have to touch the post-NFKC form 竹 (which would corrupt genuine bamboo).
_PRE_NFKC_MAP = {"⽵": "章"}


def normalize(text: str) -> str:
    text = text.replace("\x01", "").replace("\x00", "")
    for src, dst in _PRE_NFKC_MAP.items():
        text = text.replace(src, dst)
    for src, dst in _CJK_SUPPLEMENT_MAP.items():
        text = text.replace(src, dst)
    text = unicodedata.normalize("NFKC", text)
    return re.sub(r"[ \t]+", " ", text)


def grab_block(text: str, start_marker: str, end_markers: list[str]) -> str:
    idx = text.find(start_marker)
    if idx == -1:
        return ""
    body = text[idx + len(start_marker):]
    cut = len(body)
    for end in end_markers:
        j = body.find(end)
        if j != -1 and j < cut:
            cut = j
    return body[:cut].strip()


def strip_leading_author_block(text: str) -> str:
    # Remove author byline whether it appears at the leading position (Part 8)
    # or embedded mid-text (Parts 6/7, where it splits the pain paragraph).
    return re.sub(r"本章作者[：:][^\n]+\n[^\n]+\n?", "", text).strip()


def main() -> None:
    reader = PdfReader(str(PDF))
    out = []
    for p in PARTS:
        # Read first 5 pages of the part — enough to cover the 痛点/方案/行动 box.
        chunk = ""
        for i in range(p["start"] - 1, min(p["start"] + 4, len(reader.pages))):
            chunk += normalize(reader.pages[i].extract_text() or "")
            chunk += "\n"

        author_match = re.search(r"本章作者[：:]\s*([^\n]{2,40})", chunk)
        author_title = ""
        if author_match:
            after = chunk.split(author_match.group(0), 1)[1]
            author_title = next((line.strip() for line in after.split("\n") if line.strip()), "")

        part_data = {
            **p,
            "author": author_match.group(1).strip() if author_match else "",
            "authorTitle": author_title,
            "pain":     strip_leading_author_block(grab_block(chunk, "[核心痛点]",   ["[解决方案]", "[关键行动]"])),
            "solution": grab_block(chunk, "[解决方案]",   ["[关键行动]", "本章作者"]),
            "actions":  grab_block(chunk, "[关键行动]",   ["本章作者", "一、", "1."]),
        }
        out.append(part_data)

    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(out)} parts)")


if __name__ == "__main__":
    main()
