# Plugins Log - OpenCode Improver

Log of plugins evaluated/installed, with notes on what they do and whether they helped.

---

## 2026-06-15 — Anthropic Skills Repository (github.com/anthropics/skills)

- **What**: Official Anthropic skills repo — 17 skills covering creative, document, development, enterprise, and meta domains
- **How**: Cloned repo, copied all `skills/*/` directories to `~/.agents/skills/`. OpenCode auto-discovers skills from SKILL.md files.
- **Python deps**: Installed `pypdf`, `pdfplumber`, `reportlab`, `openpyxl`, `python-pptx`, `markitdown` for document skill scripts
- **Notable sizes**: `canvas-design` (83 files, 5.6 MB), `docx` (61 files, 1.2 MB), `pptx` (59 files, 1.2 MB), `xlsx` (54 files, 1.2 MB), `claude-api` (49 files, 756 KB)
- **Verdict**: ✅ All installed and verified. Some skills (docx, pdf, pptx, xlsx) are proprietary/source-available per Anthropic's LICENSE.txt.

## 2026-06-15 — `npm docx` package (v9+)

- **What**: Node.js library for creating Word (.docx) documents programmatically
- **Why**: Used to generate a professional R&D proposal document (467 KB, 10+ sections, 4 embedded flow diagrams, tables, headers/footers, page numbers)
- **Install**: `npm install docx` (prefer local install, global `-g` doesn't resolve from `/tmp/`)
- **Verdict**: ✅ Works well. Much more control than LibreOffice headless for complex structured docs. Only dependency needed for DOCX generation.
- **Caveat**: API changed at v9 — `PageNumber` is no longer a constructor. Use `new TextRun({ children: [PageNumber.CURRENT] })` for page numbers. `PageNumberElement` creates bare XML that doesn't render. Check the installed version's API before writing scripts.