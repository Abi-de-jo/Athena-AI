# Changelog — OpenCode Improver

Dated log of every change made to configs, with rationale.

---

## 2026-06-15 — Installed 17 Anthropic skills + Python dependencies

- **`~/.agents/skills/`**: Added 17 skill directories from github.com/anthropics/skills — `algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `doc-coauthoring`, `docx`, `frontend-design`, `internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `webapp-testing`, `web-artifacts-builder`, `xlsx`. Zero naming conflicts.
- **Python deps**: `pip3 install --break-system-packages pypdf pdfplumber reportlab openpyxl python-pptx markitdown` — all succeeded. Required by document skills for unpack/validate/convert operations.
- **`skills.md`**: Detailed entry on all 17 skills, their categories, file counts, and dependency status.
- **`plugins.md`**: Entry on the Anthropic skills monorepo as a plugin source.
- **MADAR**: Regenerated with `--include-docs` after skill installation.

## 2026-06-15 — R&D proposal DOCX generation with `docx` npm package

- **`/tmp/generate-proposal.js`**: Fixed `PageNumber()` → `new TextRun({ children: [PageNumber.CURRENT] })` for docx v9+ API compatibility. `new PageNumberElement()` creates bare XML that doesn't render — corrected approach is `TextRun` with `PageNumber.CURRENT` as child, which produces the full field structure (fldChar begin/separate/end + instrText PAGE). Script generates 468 KB DOCX with 10 problem sections, 4 embedded flow diagrams, styled tables, headers/footers.
- **knowledge.md, skills.md, plugins.md**: Updated all three files to correct the PageNumber API guidance (removed incorrect PageNumberElement recommendation, documented the working TextRun+PageNumber.CURRENT pattern).
- **`knowledge.md`**: Added durable learnings about docx npm package API quirks, local install requirement, and diagram embedding pattern.
- **`skills.md`**: Added entry on docx npm document generation capability and when to use vs document-prep subagent.
- **`plugins.md`**: Added first entry — docx npm package, install method, verdict, and caveats.
- **Output**: `~/Documents/interview-hiring-process-analysis.docx` (467 KB, successfully generated)

## 2026-06-13 — Created improver directory and knowledge base files (initial setup)

## 2026-06-13 — SAP Work Schedule sync implementation

- **`~/.agents/skills/mssql/connections.json`**: Created as template (placeholder only, no real credentials). Rationale: mssql skill needs a config file; using template prevents accidental credential leaks.

## 2026-06-14 — Created codeflux-god agent (replica of codeflux with bash:allow)

- **`~/.config/opencode/agents/codeflux-god.md`**: Replicated from `codeflux.md` with `bash: ask` → `bash: allow`. No confirmation prompts, otherwise identical behavior. Description updated to "Codeflux-GOD - Unrestricted" mode.

## 2026-06-15 — Created 3 new specialty subagents: ethical-hacking, document-prep, erp-architect

- **`~/.config/opencode/agents/ethical-hacking.md`**: Penetration testing subagent. Covers recon → vuln assessment → exploitation → reporting with OWASP/MITRE ATT&CK mapping. Token-optimized: 8 steps, 15-word description, minimal tools (read/glob/grep/bash:ask/webfetch). No model override - uses default.
- **`~/.config/opencode/agents/document-prep.md`**: Document preparation subagent. LibreOffice (ODT/ODS/ODP) creation, PDF conversion, template automation, mail merge. Token-optimized: 6 steps, ~25-line prompt, 12-word description. Includes soffice commands inline (avoids research loop cost).
- **`~/.config/opencode/agents/erp-architect.md`**: ERP system architect subagent. SAP/Oracle NetSuite/D365/Odoo architecture, module mapping, integration patterns, AI/agentic ERP. Token-optimized: 6 steps, bash:deny (read-only), 15-word description, no model override.
- **`~/.config/opencode/agents/codeflux.md`** and **`codeflux-god.md`**: Updated Automatic Task Routing sections to include routing instructions for all 3 new subagents.
- **`~/.config/opencode/opencode.json`**: Added explicit `agent.codeflux` and `agent.codeflux-god` entries with `permission.task: {"*": "allow"}` to formalize subagent access. Backup at `.bak-2026-06-15-subagents`.

## 2026-06-14 — Added MADAR integration to codeflux & codeflux-god

- **`codeflux.md`** and **`codeflux-god.md`**: Added MADAR Integration section before Interaction Style, + a bullet in Research Behavior to prefer `madar pack` over glob/grep. Rationale: MADAR's knowledge graph provides focused codebase context instead of full-file scans, reducing token consumption significantly.
- **`codeflux.md`** and **`codeflux-god.md`**: Added "Keep the graph in sync" subsection in MADAR Integration — regenerate `madar generate .` after any config/knowledge-base change so the graph stays fresh.

## 2026-06-15 — MADAR `--include-docs` Flag Set as STANDARD

- **Reinforced in `knowledge.md`**: Changed from "recommended for markdown-heavy repos" to "hard rule — every generate MUST use --include-docs, no exceptions." Regeneration required after ANY config/knowledge/agent change.
- **Why**: Without this flag, the graph silently produces 0 nodes → token savings are lost. Slip-ups here directly cost tokens.

## 2026-06-15 — Fixed MADAR Graph: Added `--include-docs` Globally

- **Root cause**: MADAR excludes `.md` files by default. All `madar generate .` calls on markdown-heavy `.config/opencode/` produced 0 nodes → agents fell back to expensive glob/grep sweeps, defeating the purpose.
- **`codeflux.md`** and **`codeflux-god.md`**: Both `madar generate .` references (lines "check impact" and "keep in sync") updated to `madar generate . --include-docs`.
- **`madar-graph/SKILL.md`**: Updated generation command + added note explaining `--include-docs` for markdown-heavy repos.
- **`token-audit.md`**: Added entry documenting the issue, fix, and token impact (~3-8k saved per lookup).
- **`knowledge.md`**: Added durable learning about `--include-docs` requirement.
- **Verification**: `madar generate . --include-docs` now produces 94 nodes / 124 edges from 16 files. Previously produced 0 nodes with error "No graph nodes could be generated".

## 2026-06-15 — User Language Preference Saved

- **`knowledge.md`**: Added permanent note: user wants 100% English only in all communication — no language mixing. Rationale: user explicitly requested this be stored in memory.

## 2026-06-15 — Fixed page dimension bug in python-docx build script

- **`/tmp/build_docx.py`**: Page dimensions used raw twips values (`PAGE_W=11906`, `PAGE_H=16838`, `MARGIN=1440`) but python-docx expects EMU (1in = 914400 EMU). Result: page was 0.013" × 0.018" — caused Word/LibreOffice to crash on open.
- **Fix**: Changed to `Cm(21.0).emu`, `Cm(29.7).emu`, `Cm(2.54).emu`. Verified XML now has correct `w:pgSz w:w="11906" w:h="16838"` and `w:pgMar w:top="1440"`.
- **Added detection command** to knowledge.md for verifying pgSz values in output.
- **Hard rule added**: Any python-docx script creating new documents must use helper classes (`Cm()`, `Inches()`, `Emu()`) for dimensions — never raw integers.

## 2026-06-15 — Enhanced interview-hiring-process-analysis.docx

- **`~/Documents/interview-hiring-process-analysis.docx`**: Fixed 3 critical issues + 3 enhancements:
  - **Image `.undefined` fix**: 4 PNG images had `.undefined` extension — renamed to `.png` in zip, added content type mapping, updated all `.rels` references. This was preventing python-docx from even opening the file.
  - **Image size fix**: All 4 images were 10.4×6.2in (way beyond A4 usable area of ~6.3in). Resized to 5.8×3.5in (92% of usable width, aspect-ratio preserved).
  - **Header update**: Replaced generic "Interview Hiring Process — Project Proposal" header with `CHRONEXA` (left, dark blue) + `◆ CONFIDENTIAL` (right, red, tab-stop aligned) on ALL 9 sections.
  - **Footer update**: Page number field + "Chronexa | Confidential" on content pages; minimal "CHRONEXA | Confidential" on title page.
  - **Heading 1 styling**: Added dark blue bottom border to all H1s for visual hierarchy.
  - **KEY STATISTICS section**: Dark blue background (`#1A527C`), white centered text.
  - **Statistics box**: Green border with light green fill for the scheduling metrics.
  - **Title page**: Center-aligned "Project Proposal", larger font, corporate blue color.
  - **knowledge.md**: Added durable learning about docx editing workflows and image `.undefined` fix pattern.
  - **skills.md**: Added note about using the docx skill for docx editing.

## 2026-06-16 — Added goals to figma-mcp-check project

- **`.opencode/goals/state.json`**: Added active goal for "Build Business Web App with Next.js + Figma MCP + GSAP". Goal includes description, status `active`, and 8 sub-tasks spanning setup, Figma design extraction, UI implementation, GSAP animations, custom component library, responsive layout, and business logic.
- **Rationale**: Establishes traceable objective for this project, enabling OpenCode's goals tracking to measure progress across sessions.

## 2026-06-13 — SAP Work Schedule sync code

- **`sap-sync-cron/src/sap.api.ts`**: Added `fetchWorkSchedule()` + `getWsAuthHeader()` + WS credential fields. Rationale: separate SAP system for work schedules, small dataset (no pagination).
- **`sap-sync-cron/src/app.service.ts`**: Added `SAPWorkScheduleSync()` cron (daily 1 AM) with busy-flag guard. Rationale: matches existing delete+reseed+createMany pattern.
- **`sap-sync-cron/src/app.controller.ts`**: Added `POST /sync/work-schedule` endpoint. Rationale: manual trigger for testing.
- **`sap-sync-cron/AGENTS.md`**: Updated with work schedule sync docs. Rationale: keeping project knowledge current.

## 2026-06-17 — Phase 5: Context-aware `opencode` → `rimuru-ai` docs replacement + fixes

### Fixes applied
- **Over-replacement reverted** (109 files): `opencode.jsonc` → `rimuru-ai.jsonc` fixed. `.opencode/` directory reverted. `OPENCODE_*` env vars preserved. Theme name `"opencode"` kept.
- **External names preserved**: `awesome-opencode`, `opencode.cafe`, `opencode.local`, `opencode-agent`, plugin names (`opencode-daytona`, `opencode-helicone-session`), `opencode.nvim` URLs, `opencode-docs` CDN path in social cards.
- **Correct replacements**: `~/.local/share/opencode/` → `rimuru-ai/`, `~/.cache/opencode/` → `rimuru-ai/`, XDG paths, Windows paths, ACP config examples.
- **Broken URLs fixed**: `awesome-rimuru-ai` → `awesome-opencode` (actual GitHub org), `rimuru-aigent` → `opencode-agent` (GitHub app).

### Context-aware batch script
Python script at `/tmp/opencode/fix_opencode.py` processed **477 files**, **4,281 occurrences** — replacing contextually appropriate `opencode` → `rimuru-ai` while preserving all legitimate references (config files, dirs, env vars, theme names, plugin names, URLs, web components, mDNS).

### Verification
- **Build**: `bun run build` — 0 errors, 611 pages ✅
- **Dev server**: All routes return HTTP 200 ✅
- **Built HTML**: Only legitimate `opencode` references survive ✅

## 2026-06-17 — Team members & CONTRIBUTING.md updated

- **`.github/TEAM_MEMBERS`**: Replaced upstream opencode team with rimuru-ai team — `gowdaman-dev`, `Abi-de-jo`, `jahangeer-dev`.
- **`CONTRIBUTING.md`**: Added Contributors section with the 3 team members and their GitHub links.

## 2026-06-17 — CLI/TUI logo rebranded to box-drawing art "rimuru-ai"

- **`packages/opencode/src/cli/ui.ts`**: Replaced old block-char "opencode" wordmark (4 lines, ~39 chars) with 3-line box-drawing art using Unicode ┏┓┻┫╻╹┗┛━ characters. `logo()` TTY path simplified: removed `_^~` block renderer + `draw()` function + left/right glyph split. Now applies bright cyan (`\x1b[96m`) to box-drawing chars for TTY, plain text for non-TTY.
- **`packages/tui/src/logo.ts`**: Replaced `_^~` encoded glyph data with the same box-drawing art. `go` / `marks` reduced to empty (TUI animated logo awaits separate update).
- **Binary rebuilt**: `bun run build --single --skip-embed-web-ui --skip-install` → `0.0.0-dev-202606162057`. Installed to `~/.opencode/bin/rimuru-ai`. `--help` now shows the new logo.

## 2026-06-17 — Phase 5: `packages/opencode/` → `packages/rimuru/` directory rename (build verified)

### What changed
- **Directory renamed**: `packages/opencode/` → `packages/rimuru/` via `mv`
- **External references fixed** (3 files):
  - `package.json` dev script path: `--cwd packages/rimuru`
  - `turbo.json`: `"rimuru-ai#test"` + `RIMURU_DISABLE_SHARE` env var
  - `demo.ts` screenshot path: `packages/opencode/...` → `packages/rimuru/...`
  - `share-next.ts` + test: `OPENCODE_DISABLE_SHARE` → `RIMURU_DISABLE_SHARE`
- **Import paths fixed** (2 files):
  - `packages/core/src/plugin/skill.ts`: `customize-opencode.md` → `customize-rimuru.md` + `CustomizeOpencodeContent` → `CustomizeRimuruContent`
  - `packages/rimuru/src/skill/index.ts`: `CUSTOMIZE_OPENCODE_SKILL_*` → `CUSTOMIZE_RIMURU_SKILL_*` + `SkillPlugin.CustomizeOpencodeContent` → `SkillPlugin.CustomizeRimuruContent`

### Build verified
`bun run build --single --skip-embed-web-ui --skip-install` → `1.0.0-dev-202606171124` ✅

### Key insight
- **Zero `import` refs to `packages/opencode/`** existed — codebase uses `@/*` path aliases and `@rimurucode-ai/*` package names.
- **`ProviderV2.ID.opencode`** intentionally preserved as well-known provider ID for open-source models.

### Remaining (non-blocking)
- `infra/*.ts` (SST) — AWS resource names still use `opencode-` prefix
- `script/*.ts` — dev scripts reference `opencode` CLI binary name
- `patches/install-korean-ime-fix.sh` — `$HOME/.opencode` dirs
- `CONTRIBUTING.md`, `specs/` — docs
- MADAR graph not regenerated (4175 files, timed out)

## 2026-06-17 — MADAR → FastContext Migration (Full Replacement)

- **`~/.agents/skills/madar-graph/`**: Deleted entire skill directory.
- **`~/.agents/skills/fastcontext/`**: Created with `SKILL.md` — FastContext is a delegated repo-exploration subagent from Microsoft Research that returns compact file:line citations.
- **`codeflux.md`** and **`codeflux-god.md`**: Replaced "MADAR Integration for Token Efficiency" section with "FastContext Integration for Token Efficiency". All `madar pack`/`madar query`/`madar generate` references replaced with `fastcontext -q "..." --citation`. Also updated "Research Behavior" bullet to prefer fastcontext over glob/grep.
- **`knowledge.md`**: Replaced MADAR `--include-docs` standard entry with FastContext migration entry + FastContext usage patterns & constraints section.
- **`token-audit.md`**: Marked the MADAR `--include-docs` entry as SUPERSEDED by FastContext.
- **`skills.md`**: Added entry for MADAR→FastContext skill swap.
- **`~/.config/opencode/out/`**: Deleted entire MADAR-generated output directory (graph.json + cache files + manifest.json).
- **CLI installed**: `uv tool install` from github.com/microsoft/fastcontext. Verified at `/home/gowdaman/.local/bin/fastcontext`.
- **Remaining**: `BASE_URL`/`MODEL`/`API_KEY` env vars not yet set — FastContext won't work until configured.

## 2026-06-17 — Removed `opencode-codebase-index` plugin from global config

- **`~/.config/opencode/opencode.json`**: Removed `opencode-codebase-index` from `plugin` array.
- **Rationale**: User requested removal of the "index plugin".
- **Backup**: `.bak-2026-06-17-remove-index-plugin`
- **Result**: Plugin array now has 3 entries: `opencode-optimal-model-temps`, `opencode-helicone-session`, `opencode-goal-plugin`.

## 2026-06-17 — Fixed `ReferenceError: ai is not defined` runtime error

### Root cause
Two JavaScript property access bugs caused by renaming `ProviderV2.ID.opencode` → `ProviderV2.ID.rimuru-ai` in TypeScript source. Property `opencode` has wire value `"rimuru-ai"` — the JS property name is unchanged, only the wire string changed. Dot-access with hyphen is parsed as subtraction:

```
ProviderV2.ID.rimuru-ai  →  JS parses as ProviderV2.ID.rimuru - ai
engines.rimuru-ai        →  JS parses as engines.rimuru - ai
```

### Files fixed
1. **`packages/rimuru/src/tool/registry.ts:57`**: `ProviderV2.ID.rimuru-ai` → `ProviderV2.ID.opencode` (the correct JS property name)
2. **`packages/rimuru/src/plugin/shared.ts:200`**: `engines.rimuru-ai` → `engines["rimuru-ai"]` (bracket notation for hyphenated property)

### Verification
- Binary rebuilt: `1.0.0-dev-202606171213` (smoke test passed ✅)
- Binary installed to `~/.opencode/bin/rimuru-ai`
- Binary runs past tool registry initialization without crashing
- Remaining errors are only model/provider quota issues (unrelated)

## 2026-06-17 — CLI & TUI logos replaced with "RIMURU" ASCII art

- **`packages/rimuru/src/cli/ui.ts`**: Replaced old opencode box-drawing wordmark (4 lines, `█▀▀█` style) with 6-line "RIMURU" ASCII art using Unicode block characters (`██`, `╔`, `╗`, `╚`, `╝`, `║`, `═`).
- **`packages/tui/src/logo.ts`**: Replaced `logo.left`/`logo.right` split encoding (`_^~` 3D system) with the raw 6-line RIMURU art in `left` only. `right` left empty — no longer needed.
- **`packages/tui/src/util/presentation.ts`**: Simplified `wordmark()` — removed the left/right split, `_^~` draw encoding, dim/shadow coloring. Now renders raw art lines as-is. Cleaner code: ~26 lines → ~5 lines.
- **`bg-pulse-render.ts`**: Unchanged — `go` is already empty (was cleared in earlier rename), so animated background pulse is inactive.
- **Build**: `bun run build --single --skip-install` ✅ — smoke test passes, `--help` shows new logo.
- **Binary**: Installed to `~/.opencode/bin/rimuru-ai`.

## 2026-06-17 — Web title & favicon rebranded to "Rimuru AI"

- **Title changed**: "OpenCode" → "Rimuru AI" in 6 files across web frontend (`packages/app/`, `packages/desktop/`, `packages/rimuru/`) — HTML `<title>`, meta tags, configs, and dist folder.
- **Favicon rebranded**: Replaced old `opencode`-branded SVG with Rimuru-branded "R" mark (blue gradient "R" over dark rounded square). PNG/ICO variants regenerated from SVG via `rsvg-convert`.
- **Dist synced**: All favicon variants copied to `app/dist/`.
- **Build & Install**: `bun run build --single --skip-install` from `packages/rimuru/` → success. Binary swapped into `~/.opencode/bin/rimuru-ai` (old binary saved as `.bak`). Title/favicon changes visible on next restart.

## 2026-06-17 — Provider ID Alignment: rimuru-ai ↔ opencode (dual-key registration)

### Motivation
models.dev/api.json returns provider ID `"opencode"` with 70 models (21+ free). But rimuru-ai's code only matched `"rimuru-ai"` in session handlers and the custom handler loop — `database["opencode"]` was never found, so free models were silently skipped.

### Changes (5 files, commit 4ec1210a1)

1. **`packages/core/src/provider.ts`**: `ProviderV2.ID.opencode` → `schema.make("opencode")` (was `"rimuru-ai"`). Foundational fix — everything routes through this constant.

2. **`packages/rimuru/src/provider/provider.ts:179-205`**: Rimuru handler registered under BOTH keys `"rimuru"` (for connected API key config) and `"opencode"` (for models.dev data). Dual-key is the root cause fix: without `"opencode"` in custom(), `database["opencode"]` was undefined → handler skipped.

3. **`packages/rimuru/src/session/llm/request.ts:168,180`**: `isRimuruProvider` now also checks `=== ProviderV2.ID.opencode` for session header injection (project ID, API key).

4. **`packages/rimuru/src/session/llm/native-runtime.ts:56`**: Added `ProviderV2.ID.opencode` to provider allowlist (was blocking opencode models).

5. **`packages/rimuru/src/acp/service.ts:785`**: Uses `ProviderV2.ID.opencode` for default model selection.

### Key Design Decision
- Dual-key (`"rimuru"` + `"opencode"`) NOT a single rename — both config origins coexist: user's rimuru-ai config block vs models.dev's `"opencode"` provider entry.

### Build & Deploy
- Binary rebuilt from `packages/rimuru/`, installed to `~/.opencode/bin/rimuru-ai`
- Server started on port 4096 (PID 53958), running, SPA responds at `/`, `/config/providers` shows `opencode`
- `packages/rimuru/` committed for first time (was untracked)

---

## 2026-06-18 — TUI rebrand + Rimuru slime icons

### TUI ASCII logo rebrand (rimuru-ai CLI)
- **`packages/tui/src/logo.ts`**: Replaced old "opencode" ASCII art + GO wings with 6-line "RIMURU" block-letter logo (`rimuruLines`). Fixed `Array.from` crash: `logo.right` was `[]` while `logo.left` had 6 elements — `component/logo.tsx:856` accessed `right[index]` → `undefined` → `Array.from(undefined)`. Fix: `logo.right = rimuruLines.map(() => "")`.
- **`packages/tui/src/util/presentation.ts`**: `sessionEpilogue()` emits `rimuru -s` (was `opencode -s`). `wordmark()` simplified to only emit logo lines.
- **`packages/tui/test/util/presentation.test.ts`**: Passes (expected `rimuru -s ses_123`).
- **`GoLogo`/`bg-pulse`**: Dead code but harmless — empty arrays render nothing.

### Desktop icons → Rimuru slime
- **`packages/desktop/icons/rimuru.svg`**: Added CC0-licensed Rimuru slime SVG from Wikimedia Commons.
- **Generated 49 icon files** across dev/beta/prod channels via `rsvg-convert` + ImageMagick — all PNG sizes, Windows tiles, iOS AppIcon set, Android adaptive icons, ICO (6-layer), ICNS.
- **`packages/desktop/scripts/prebuild.ts`**: Fixed path `../opencode` → `../rimuru` (rebrand artifact blocking desktop build).

### CLI binary build & install
- `bun run script/build.ts --single --skip-embed-web-ui` → 121MB x86-64 ELF binary.
- **Installed to `~/.local/bin/rimuru-ai`** — smoke test (`--version`) passes.
- Desktop `prebuild` + `package:linux` not tested (pre-existing sidecar binary dependency).
