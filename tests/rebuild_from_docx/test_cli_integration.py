"""End-to-end smoke that the audit catches dangling refs and orphans."""
from pathlib import Path

import pytest

# Import module under test (file with hyphen → must use importlib)
import importlib.util
import sys


@pytest.fixture(scope="module")
def cli_module():
    path = Path(__file__).resolve().parents[2] / "scripts" / "rebuild-from-docx.py"
    spec = importlib.util.spec_from_file_location("rebuild_cli", path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules["rebuild_cli"] = mod
    spec.loader.exec_module(mod)
    return mod


def test_audit_flags_dangling_reference(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    md = "Hello\n\n![](/book/x/missing.png)\n"
    errs = cli_module.audit("x", md, images)
    assert any("dangling" in e for e in errs)


def test_audit_flags_orphan_file(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    (images / "orphan.png").write_bytes(b"x")
    errs = cli_module.audit("x", "no images here", images)
    assert any("orphan" in e for e in errs)


def test_audit_passes_when_balanced(tmp_path, cli_module):
    images = tmp_path / "imgs"
    images.mkdir()
    (images / "abc123.png").write_bytes(b"x")
    md = "![](/book/x/abc123.png)\n"
    assert cli_module.audit("x", md, images) == []
