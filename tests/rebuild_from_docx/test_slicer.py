from scripts.rebuild_from_docx.slicer import slice_by_part


def test_slices_three_parts(make_doc):
    doc = make_doc([
        ("第一部分：A", None),
        ("body A1", None),
        ("body A2", None),
        ("第二部分：B", None),
        ("body B1", None),
        ("第三部分：C", None),
        ("body C1", None),
    ])
    result = slice_by_part(doc)
    assert sorted(result.keys()) == [1, 2, 3]
    assert [el.text for el in result[1]] == ["body A1", "body A2"]
    assert [el.text for el in result[2]] == ["body B1"]
    assert [el.text for el in result[3]] == ["body C1"]


def test_ignores_paragraphs_before_part_one(make_doc):
    doc = make_doc([
        ("preamble", None),
        ("第一部分：A", None),
        ("body A1", None),
    ])
    result = slice_by_part(doc)
    assert list(result.keys()) == [1]
    assert [el.text for el in result[1]] == ["body A1"]


def test_handles_no_parts_returns_empty(make_doc):
    doc = make_doc([("just text", None)])
    assert slice_by_part(doc) == {}
