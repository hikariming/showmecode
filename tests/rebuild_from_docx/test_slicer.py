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
    assert sorted(result.keys()) == [0, 1, 2, 3]
    assert result[0] == []
    assert [el.text for el in result[1]] == ["body A1", "body A2"]
    assert [el.text for el in result[2]] == ["body B1"]
    assert [el.text for el in result[3]] == ["body C1"]


def test_captures_paragraphs_before_part_one_under_key_zero(make_doc):
    doc = make_doc([
        ("preamble", None),
        ("第一部分：A", None),
        ("body A1", None),
    ])
    result = slice_by_part(doc)
    assert sorted(result.keys()) == [0, 1]
    assert [el.text for el in result[0]] == ["preamble"]
    assert [el.text for el in result[1]] == ["body A1"]


def test_no_parts_returns_only_intro_key(make_doc):
    doc = make_doc([("just text", None)])
    result = slice_by_part(doc)
    assert list(result.keys()) == [0]
    assert [el.text for el in result[0]] == ["just text"]
