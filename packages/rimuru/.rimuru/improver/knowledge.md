# Knowledge Base — OpenCode Improver

Durable learnings, patterns, decisions, and their outcomes.

---

## 2026-06-13 — SAP Work Schedule Sync implementation

- **Pattern**: Adding a new SAP sync = 4 changes: `sap.api.ts` (fetch method), `app.service.ts` (cron method + busy flag), `app.controller.ts` (POST endpoint), `AGENTS.md` (documentation).
- **Delete+reseed+createMany** is the standard sync pattern for small datasets (<1000 rows). Works for work schedule, leaves, professional leaves.
- **Prisma model naming**: `SAP_Workschedule` → client property is `sAP_Workschedule` (camelCase preserves case after prefix).
- **Hardcoded fallbacks** in `sap.api.ts` are this project's standard (`.env` is git-tracked so secrets aren't stored there — only `DATABASE_URL` is in `.env`).
- **Direct MSSQL CLI**: `pymssql` via pip works without root. Future projects should configure `connections.json` per-project (never hardcode DB credentials globally).

## 2026-06-15 — Token-Optimized Subagent Design Patterns

- **Key token-saving mechanisms for subagents**:
  - `steps: 6-8` for narrow domain tasks (vs 25-50 for general coding agents) — saves ~60% on reasoning loops
  - Short `description` (~15 words) — each description adds ~20-30 tokens to Task tool system prompt
  - No `model` override — lets default model handle it; avoids hardcoding expensive models
  - Minimal tool permissions — every extra tool adds schema tokens (~50-100 tokens per tool). Only allow what's needed.
  - `bash: deny` for read-only agents (erp-architect) — saves tool schema tokens
  - Inline command examples in prompts — avoids research websearch loops (~2-5k tokens per lookup)
   - KV-cache friendly structure: stable prefix (role + methodology) before variable content

## 2026-06-17 — MADAR → FastContext Migration Complete

- **Migration**: Replaced [MADAR](https://github.com/lubab/madar) (graph-based code context via `madar generate`/`pack`/`query`) with [FastContext](https://github.com/microsoft/fastcontext) (delegated repo-exploration subagent from Microsoft Research).
- **Why**: FastContext separates exploration from task solving — the main agent delegates a natural-language query to a dedicated subagent that returns compact file:line citations. This avoids the need to:
  - Maintain a knowledge graph (`out/graph.json` + cache) that goes stale
  - Remember to run `madar generate . --include-docs` after every config change
  - Pay the overhead of full-file graph extraction
- **Usage**: `fastcontext -q "<question>" --citation` for focused context (returns file:line ranges). `fastcontext -q "<question>" --max-turns 12 --citation` for complex multi-file traces.
- **Skill installed**: `~/.agents/skills/fastcontext/SKILL.md`
- **CLI installed**: `uv tool install` from github.com/microsoft/fastcontext
- **Requires**: OpenAI-compatible endpoint via `BASE_URL`, `MODEL`, `API_KEY` env vars (not yet configured)
- **Old `madar-graph` skill**: Deleted from `~/.agents/skills/madar-graph/`
- **Old `out/` directory**: Deleted from `~/.config/opencode/out/`
- **Old MADAR npm package** (`@lubab/madar`): Still globally installed but unused. Can be cleaned up later.

## 2026-06-15 — DOCX Generation with npm `docx` Package

- **Install locally** in the script's working directory: `npm install docx` (not `npm install -g` — global install doesn't resolve from arbitrary dirs like `/tmp/`)
- **Key API changes in v9+**:
  - `PageNumber` is now an object with constants (`CURRENT`, `TOTAL_PAGES`) — not a constructor
  - **CORRECT way to add page numbers**: `new TextRun({ children: [PageNumber.CURRENT] })` inside a Paragraph
  - `new PageNumberElement()` creates bare `<w:pgNum/>` XML — does NOT render a working page number. DO NOT use it.
  - `PageNumber.CURRENT` inside a TextRun's `children` array produces the full field structure (`w:fldChar` begin/separate/end + `w:instrText` PAGE) that Word needs
- **Diagram embedding**: Use `ImageRun` with PNG files on disk. Image dimensions in EMUs (dxa): `w * 914400 / dpi`, `h * 914400 / dpi`
- **Structure**: Build doc in sections with `properties` (page margins, orientation), `headers`/`footers`, `children` array
- **Output path**: `path.join(require('os').homedir(), 'Documents/...')` — always use `os.homedir()` for cross-platform

## 2026-06-15 — DOCX Editing: Use the `docx` Skill (~/.agents/skills/docx/)

- **Hard rule**: For ALL .docx file editing/creation, load the `docx` skill first (`skill({name: "docx"})`). It has the ooxml scripts, Document library, and proper workflows.
- **The `docx` skill recommends**: For editing existing documents → use the Document library (Python, via `ooxml/scripts/unpack.py` + Python script + `pack.py`). For creating new documents → use `docx-js` (npm `docx` package).
- **python-docx alternative**: python-docx works for basic edits (images, headers, footers) but the skill's Document library gives full OOXML access for complex edits.
- **Image `.undefined` fix**: PNG images with `.undefined` extension in docx zip → need two fixes: (1) rename to `.png`, (2) update `[Content_Types].xml` to map `Extension="undefined"` to `ContentType="image/png"`, (3) update all `.rels` and `.xml` references.
- **Image sizing**: A4 page has ~5731510 EMU usable width. Images wider than this must be scaled down proportionally.

## 2026-06-15 — CRITICAL: python-docx Page Dimension Unit Bug

- **The Bug**: Setting `section.page_width = 11906` produces a page of **0.013 inches** — Word/LibreOffice crashes trying to render content on a page that tiny.
- **Root Cause**: The script author confused **twips** (1in = 1440 twips, used in final XML) with **EMU** (1in = 914400 EMU, used by python-docx API). A comment saying "A4 width in DXA" added confusion — "DXA" is not a real OpenXML unit.
- **The Fix**: NEVER use raw integer values for page dimensions or margins. ALWAYS use python-docx helper classes:
  - `Cm(21.0).emu` for A4 width (21cm)
  - `Cm(29.7).emu` for A4 height (29.7cm)
  - `Cm(2.54).emu` (or `Inches(1).emu`) for 1-inch margins
  - Or set directly: `section.page_width = Cm(21.0)` (python-docx accepts Length objects)
- **How to verify**: Check the generated XML — `w:pgSz` values should be ~11907 x 16838 (twips), and `w:pgMar` should be 1440 for 1in margins. If numbers are tiny (19 x 27), the EMU→twips conversion is wrong.
- **Detection script**: `python3 -c "import zipfile; z=zipfile.ZipFile('file.docx'); import re; s=re.search(r'<w:pgSz[^>]+/>', z.read('word/document.xml').decode()); print(s.group(0) if s else 'not found')"` — if `w:w` is < 100, page is corrupted.
- **Hard rule**: Any python-docx script that creates a new document MUST verify page dimensions in the output before distributing. One wrong constant crashes every document viewer.

## 2026-06-15 — User Communication Preference: English Only

- **User prefers 100% English** in all communication. Do not mix languages (Chinese, Tamil, etc.) in responses, explanations, or examples — even when the topic or platform has multilingual content. All payloads, walkthroughs, and reasoning must be delivered in English only.
- This preference is permanent — do not re-confirm or re-ask.

## 2026-06-17 — Context-Aware Replacements: What Stays vs Changes When Renaming

### `opencode` references that MUST NEVER be renamed (fork-safe)
These are internal identifiers, config schemas, environment variables, or external project names — not "old brand name" references:
- **Config files**: `opencode.json`, `opencode.jsonc` — these are the canonical config filenames
- **Directory**: `.opencode/`, `~/.config/opencode/` — internal directory paths
- **Environment variables**: `OPENCODE_HOME`, `OPENCODE_PROVIDER`, `OPENCODE_*` — all uppercase prefix vars
- **Theme names**: `"opencode"` in theme config (it's a theme name, not the app name)
- **npm package names**: `opencode-daytona`, `opencode-helicone-session` — actual published packages
- **GitHub orgs**: `awesome-opencode` — real GitHub organization
- **Community URLs**: `opencode.cafe` — real community site
- **mDNS default**: `opencode.local` — hardcoded default in server code
- **URL paths**: `.well-known/opencode` — hardcoded route path
- **GitHub apps**: `opencode-agent` — real GitHub App name
- **Web component tags**: `<opencode-language-select>` — custom HTML element name
- **Social card CDN paths**: `opencode-docs/` in social card CDN URLs

### `opencode` references that SHOULD rename to `rimuru-ai`
- XDG data dir: `~/.local/share/opencode/` → `~/.local/share/rimuru-ai/`
- XDG cache dir: `~/.cache/opencode/` → `~/.cache/rimuru-ai/`
- XDG config dir body text: `$XDG_CONFIG_HOME/opencode/` → `$XDG_CONFIG_HOME/rimuru-ai/`
- Windows app data paths: `%USERPROFILE%\\rimuru-ai` (was `.opencode`)
- npm package name: `opencode-ai` → `rimuru-ai` (actual npm package)
- ACP config examples: `command = "opencode"` → `command = "rimuru-ai"`, `name = "opencode"` → `name = "rimuru-ai"`
- General prose references to the tool name

### Batch replacement strategy
- **Never use blanket `sed`** on forked codebases with overlapping names — always use context-aware scripts
- Check 3+ chars before/after each match to determine context (config filename? env var? directory path? prose?)
- After every batch rename: build the project and verify — don't assume correctness
- Always check external URLs after rename — GitHub orgs, npm packages, etc. are common breakage points
- Run a post-build grep on rendered output to spot-check for stale visible references

## 2026-06-17 — FastContext: Usage Patterns & Constraints

- **Primary command**: `fastcontext -q "<natural language question>" --citation` — returns compact file:line ranges, ideal for pre-edit context gathering
- **Deep trace**: `fastcontext -q "<question>" --max-turns 12 --citation` — for multi-file traces and architecture questions
- **No graph to maintain**: Unlike MADAR, no `generate`/`pack`/`query` workflow. No `out/` directory. No `--include-docs` flag to remember.
- **Token impact**: FastContext's subagent returns only file:line citations (~200-500 tokens) instead of full file contents (~3-8k tokens). The subagent itself consumes some tokens for exploration, but the main agent's context window is spared.
- **Caveat**: FastContext runs read-only as a subagent — it can't modify files. It also requires an external LLM API endpoint (not yet configured). Until configured, the agent falls back to manual glob/grep/file-read sweeps.
- **Backward compat**: MADAR is still globally installed (`@lubab/madar@0.28.0` via npm). No conflicts if both are present. Can uninstall later.
- **The `fastcontext` skill** at `~/.agents/skills/fastcontext/SKILL.md` has full documentation. Load with `skill({name: "fastcontext"})`.

## 2026-06-17 — Package Directory Rename: `@/*` Aliases Make It Safe

- **When a codebase uses `@/*` path aliases** (tsconfig `paths: {"@/*": ["./src/*"]}`), all internal imports within a package resolve via the alias — NOT the directory name. This means:
  - Renaming `packages/opencode/` → `packages/rimuru/` breaks ZERO import statements within the package
  - Only external references to the directory path need updating: workspace config, turbo.json, build scripts
- **Cross-package imports** use `@rimuru-ai/package-name` (from other packages in the monorepo) — these are already decoupled from directory names
- **No relative imports like `../../opencode/src/`** were found — the workspace resolution pattern prevented this antipattern entirely
- **Always check** with `rg -rn 'packages/<oldname>'` before renaming to find all external references
- **Turbo task names** in `turbo.json` use the `package.json#name` field, NOT the directory name. After rename, ensure task names match: `"rimuru-ai#test"` not `"rimuru#test"`

## 2026-06-17 — Migration Complete: Phases 1-5 Done

- **Final state**: All user-facing branding changed from `opencode` to `rimuru-ai`. Binary builds at `dist/rimuru-ai-linux-x64/bin/opencode` (internal binary name stays `opencode`).
- **Preserved intentionally**:
  - `ProviderV2.ID.opencode` — well-known provider ID for open-source models (OpenCode Go)
  - `.opencode/` fallback path — backward compat with existing user configs
  - External plugin names (`opencode-daytona`, `opencode-helicone-session`, etc.)
  - `opencode-agent[bot]` — GitHub bot identity
  - `opencode.json`/`opencode.jsonc` — config filenames (canonical)
  - `OPENCODE_*` env vars — existing env variables
- **Non-blocking remaining items**: `infra/*.ts` (SST resource names), `script/*.ts` (dev scripts), `patches/`, docs
- **Build status**: `bun run build --single --skip-embed-web-ui --skip-install` passes with smoke test
- **Version**: `1.0.0-dev-YYYYMMDDHHMM` (upgraded from `0.0.0-dev-`)

## 2026-06-17 — Dual-Key Provider Registration Pattern

- **Problem**: models.dev/api.json returns provider ID `"opencode"`, but rimuru custom handler only registered under `"rimuru"` key. Custom handler loop does `database[providerID]` lookup — `database["opencode"]` was undefined → handler silently skipped → models.dev free models never appeared.
- **Solution**: Register the same handler under TWO keys: `"rimuru"` (for user config block) and `"opencode"` (for models.dev data). This is cleaner than renaming either side.
- **Pattern**: `custom(dep, [key1, key2], handler)` — Provider.ts registration supports arrays of aliases.
- **Session handler matching**: `isRimuruProvider` must check BOTH `startsWith("rimuru-ai")` AND `=== ProviderV2.ID.opencode` because opencode free models route through the same rimuru endpoint but have a different provider ID.
- **Native runtime allowlist**: Must explicitly include `ProviderV2.ID.opencode` — it's not automatically covered by `startsWith("rimuru-ai")`.
- **Key insight**: `ProviderV2.ID.opencode` as `"opencode"` (not `"rimuru-ai"`) is correct — models.dev always returns `"opencode"`, and the catalog/plugin system looks up by this constant. Changing it to something else would require renaming in the API response parser too.
- **Server run pattern**: `setsid <binary> < /dev/null` to prevent shell timeout killing the process in non-interactive environment.
- **Binary rebuild**: `bun run build --single --skip-install` from `packages/rimuru/` directory (not root).
- **Binary install**: `cp dist/rimuru-ai-linux-x64/bin/rimuru-ai ~/.local/bin/` (no sudo needed in non-interactive env).

### 2026-06-18 — TUI Logo Component: logo.right Must Match logo.left Length

- **Bug**: `Array.from(undefined)` crash in `component/logo.tsx:856` when `logo.right` is `[]` but `logo.left` has 6 elements.
- **Root cause**: `Logo` component iterates `<For each={ctx.shape.left}>` and accesses `ctx.shape.right[index()]` — if `right` is shorter than `left`, the excess indices return `undefined`, and `renderLine(line)` calls `Array.from(undefined)`.
- **Fix**: Always ensure `logo.left.length === logo.right.length`. For the Rimuru logo: `logo.right = rimuruLines.map(() => "")`.
- **Empty `go` arrays**: Safe for `bg-pulse-render.ts` because `go.left.map()` returns `[]`, so `Array.from(line)` in `flatMap` never executes.

### 2026-06-18 — Rimuru SVG Icon Generation Toolchain

- **Tool**: `rsvg-convert` for SVG→PNG rendering, ImageMagick `magick convert` for padding/resizing/ICO assembly.
- **Command**: `rsvg-convert -h 2048 rimuru.svg -o base-raw.png && magick base-raw.png -background none -gravity center -extent 2048x2048 base.png` to pad landscape SVG to square with transparent background.
- **ICO generation**: `magick base.png \( -clone 0 -resize 256x256 \) \( -clone 0 -resize 64x64 \) ... -delete 0 icon.ico` — layers from largest to smallest.
- **ICNS (Linux fallback)**: ImageMagick can write a simple ICNS but `iconutil` (macOS-only) is preferred. On Linux, the fallback is a single-resolution ICNS.
- **All channels**: Must copy icons to `icons/dev/`, `icons/beta/`, `icons/prod/`.
- **Source SVG**: CC0-licensed Rimuru slime from Wikimedia Commons. 2KB, 3900×2869 viewBox, single `<path>` + 2 ellipses + eye detail.
