from scripts.rebuild_from_docx.runs import paragraph_to_markdown


def test_plain_text(make_doc):
    doc = make_doc([("hello world", None)])
    p = doc.paragraphs[0]
    assert paragraph_to_markdown(p) == "hello world"


def test_inline_code_via_consolas(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    p.add_run("run ")
    code = p.add_run("npm install")
    code.font.name = "Consolas"
    p.add_run(" first")
    assert paragraph_to_markdown(p) == "run `npm install` first"


def test_bold_run_emits_double_star(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    p.add_run("see ")
    bold = p.add_run("important")
    bold.bold = True
    p.add_run(" note")
    assert paragraph_to_markdown(p) == "see **important** note"


def test_consolas_takes_precedence_over_bold(make_doc):
    """Bold + Consolas → inline code, not bolded code."""
    doc = make_doc([])
    p = doc.add_paragraph()
    code = p.add_run("npm")
    code.font.name = "Consolas"
    code.bold = True
    assert paragraph_to_markdown(p) == "`npm`"


def test_empty_paragraph_returns_empty_string(make_doc):
    doc = make_doc([("", None)])
    assert paragraph_to_markdown(doc.paragraphs[0]) == ""


def test_adjacent_consolas_runs_merge_into_single_backticks(make_doc):
    doc = make_doc([])
    p = doc.add_paragraph()
    a = p.add_run("npm "); a.font.name = "Consolas"
    b = p.add_run("install"); b.font.name = "Consolas"
    assert paragraph_to_markdown(p) == "`npm install`"
