"""Render a docx Paragraph's runs to markdown text."""
from docx.text.paragraph import Paragraph

CODE_FONTS = {"Consolas", "Menlo", "Courier", "Courier New", "Monaco"}


def _is_code(run) -> bool:
    return (run.font.name or "") in CODE_FONTS


def paragraph_to_markdown(p: Paragraph) -> str:
    """Convert a Paragraph's runs into a single markdown string.

    - Runs in a code font → wrapped in backticks (adjacent runs merge).
    - Bold runs (non-code) → wrapped in `**...**`.
    - Code formatting takes precedence over bold for the same run.
    - Empty runs are skipped.
    """
    out: list[str] = []
    code_buf: list[str] = []

    def flush_code():
        if code_buf:
            joined = "".join(code_buf)
            if joined.strip():
                out.append(f"`{joined}`")
            else:
                out.append(joined)
            code_buf.clear()

    for run in p.runs:
        text = run.text
        if not text:
            continue
        if _is_code(run):
            code_buf.append(text)
            continue
        flush_code()
        if run.bold and text.strip():
            out.append(f"**{text}**")
        else:
            out.append(text)
    flush_code()
    return "".join(out)
