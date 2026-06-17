# Skills Log — OpenCode Improver

Log of skills created/modified and their purpose.

---

## 2026-06-15 — Installed 17 skills from github.com/anthropics/skills

- **Source**: https://github.com/anthropics/skills (cloned to /tmp/anthropic-skills)
- **Location**: All installed to `~/.agents/skills/<name>/`
- **Skills installed**:
  - **Creative**: `algorithmic-art` (p5.js generative art), `brand-guidelines` (Anthropic branding), `canvas-design` (PNG/PDF visual art, 83 files), `theme-factory` (10 preset themes for artifacts), `slack-gif-creator` (animated GIFs for Slack)
  - **Document**: `docx` (Word creation/edit, 61 files — Python scripts + npm docx), `pdf` (PDF read/edit/fill/OCR, 12 files), `pptx` (PowerPoint creation/edit, 59 files), `xlsx` (Excel creation/edit, 54 files)
  - **Development**: `claude-api` (Anthropic API reference, 49 files), `mcp-builder` (MCP server creation guide), `webapp-testing` (Playwright for local web apps), `web-artifacts-builder` (React/shadcn HTML artifacts), `frontend-design` (UI design guidance)
  - **Enterprise**: `internal-comms` (templates for status reports, newsletters, etc.), `doc-coauthoring` (structured doc writing workflow)
  - **Meta**: `skill-creator` (create/modify/evaluate skills)
- **Dependencies installed**: `pypdf`, `pdfplumber`, `reportlab`, `openpyxl`, `python-pptx`, `markitdown` (via pip3 --break-system-packages) — needed by docx/pdf/pptx/xlsx skills for unpacking, validation, and conversion
- **Conflict check**: Zero naming conflicts with existing skills
- **Verification**: All 17 SKILL.md files present and parseable

## 2026-06-15 — DOCX editing workflow (used docx skill content)

- **Lesson learned**: The `docx` skill at `~/.agents/skills/docx/` should be loaded FIRST when editing/creating .docx files. It contains:
  - `ooxml/scripts/unpack.py` / `pack.py` — zip-level docx manipulation (critical for fixing `.undefined` image extensions)
  - `SKILL.md` with detailed OOXML reference (table styles, numbering, headers/footers XML patterns)
  - Python Document library for high-level editing
- **python-docx limitations**: Can't handle malformed content-types. Must pre-fix `.undefined` image extensions via zipfile before python-docx can open a document.
- **Workflow for future**: (1) Load docx skill → (2) Fix zip-level issues → (3) Use skill's Document library or python-docx → (4) Validate with `unpack.py`

## 2026-06-15 — Document Generation via `docx` npm package

- **Discovered/Used**: `npm docx` package (`npm install -g docx`) for programmatic Word document generation
- **Capability**: Creates professional DOCX with tables, headers/footers, embedded PNG diagrams (via `ImageRun`), page numbers, styled paragraphs, color-coded sections, Table of Contents scaffolding
- **When to use**: Any task requiring a formatted Word document proposal, report, or analysis
- **How**: Write a Node.js script using `docx`'s `Document`, `Packer`, `Paragraph`, `TextRun`, `Table`, `ImageRun`, etc. Then `node script.js` produces the `.docx` file
- **Caveats**: 
  - `PageNumber()` is deprecated in v9+ — use `new TextRun({ children: [PageNumber.CURRENT] })` instead
  - `new PageNumberElement()` creates bare XML — does NOT render a working page number
  - Install locally (not globally) for reliable resolution from scripts in `/tmp/`
  - Diagrams must be PNG files on disk; `ImageRun` embeds them inline
- **Related**: `document-prep` subagent handles LibreOffice-based document tasks; use `docx` npm for programmatic generation (more control, no GUI dep)

---

## 2026-06-15 — Created 3 new subagents (not skills, but domain-specific agents)

- Created subagents as global agent `.md` files (not skills). Rationale: subagents run autonomously with tool access; skills just inject instructions. These domains need tool autonomy.
- **`ethical-hacking.md`**: Offensive/defensive security agent. Uses `bash: ask` for tool execution, `webfetch: allow` for CVE/exploit research.
- **`document-prep.md`**: Document automation via LibreOffice headless. References `soffice` commands inline. Uses `bash: ask` for document generation/conversion.
- **`erp-architect.md`**: ERP architecture consultant. Read-only agent (`bash: deny`) that advises on SAP/Oracle/Odoo/D365 architecture.
- All subagents omit `model` override → use default provider model, cheaper than hardcoding an expensive model.

## 2026-06-17 — MADAR → FastContext Skill Swap

- **Deleted**: `~/.agents/skills/madar-graph/` — MADAR knowledge-graph skill (replaced by FastContext)
- **Created**: `~/.agents/skills/fastcontext/SKILL.md` — FastContext delegation-based repo explorer from [github.com/microsoft/fastcontext](https://github.com/microsoft/fastcontext)
- **Usage**: `fastcontext -q "<question>" --citation` for focused file:line citations, or `--max-turns 12` for complex multi-file traces
- **Requirements**: Requires `BASE_URL`, `MODEL`, `API_KEY` env vars (OpenAI-compatible endpoint) — not yet configured

## 2026-06-13 — mssql skill: added connections.json template
