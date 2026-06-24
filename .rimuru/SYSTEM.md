# SYSTEM.md — Comprehensive Host & Project Context

> Auto-generated god-mode context. Read once at session start. Acts as persistent memory of the host machine, project layout, user environment, and configured integrations. Treat as ground truth unless explicitly told otherwise.

## Host Machine

| Key | Value |
|---|---|
| OS | Windows 11 Home Single Language |
| Build | 10.0.26200 |
| Arch | x64 |
| CPU | Intel(R) Core(TM) 5 210H (12 logical cores) |
| RAM | 15.6 GB |
| User | `narea` |
| Home | `C:\Users\narea` |
| Default shell | PowerShell 5.1 (Windows PowerShell) |
| PowerShell Core (pwsh 7) | **not installed** — install via `winget install Microsoft.PowerShell` for ANSI/escape support |
| D: drive free | ~175 GB |

## Runtimes (PATH)

| Tool | Version | Notes |
|---|---|---|
| Bun | 1.3.14 | Primary runtime. `bun run dev` in `D:\athena-ai\packages\rimuru` launches the TUI. |
| Node | v24.15.0 | Secondary. `npm` 11.12.1. |
| Git | 2.54.0 (Windows) | `gh` CLI 2.94.0 installed. |
| Python | 3.10.11 (default), 3.13.14 (PythonSoftwareFoundation.WindowsApps — used by node-gyp) | 3.10 on PATH; 3.13 used by Visual Studio Store stub. |
| Docker | 29.5.2 | Engine running, build `79eb04c`. |
| Claude CLI | `C:\Users\narea\.local\bin\claude.exe` | Authenticated. Used by `claude-code` provider. |

## Athena Install

- Binary: `C:\Users\narea\.rimuru\bin\athena.cmd` (added to user PATH; `athena` available in any new terminal).
- Source: `D:\athena-ai\` (cloned from `https://github.com/gowdaman-dev/athena-ai.git`).
- Plugin workspace package `@rimurucode-ai/plugin` was built once with `tsc` → `packages\plugin\dist\`.
- `bun install` was run with `--ignore-scripts` because Visual Studio Build Tools are **not installed**. Two native postinstalls were skipped: `tree-sitter-powershell` and `node-pty`. This degrades PowerShell syntax highlighting in the TUI editor and may affect some PTY behaviors.

## Project Layout (athena-ai monorepo)

- `packages/rimuru/` — main CLI/TUI entry (`src/index.ts`). Launched by `bun run dev`.
- `packages/plugin/` — built-in tools and shell. Imports via `@rimurucode-ai/plugin`.
- `packages/sdk/js/` — `@rimurucode-ai/sdk` (TypeScript source, no build needed).
- `packages/script/` — `@rimurucode-ai/script` (TypeScript source).
- `packages/core/` — shared core library (Drizzle DB, Effect services).
- `packages/console/app/`, `packages/app/`, `packages/desktop/`, `packages/llm/`, `packages/identity/`, `packages/function/`, `packages/server/`, `packages/web-astro.bak/`, `packages/storybook/`, `packages/effect-drizzle-sqlite/`, `packages/effect-sqlite-node/`, `packages/enterprise/`, `packages/containers/`, `packages/http-recorder/`, `packages/tui/`, `packages/ui/`, `packages/slack/`, `packages/stats/`, `packages/docs/`.
- `packages/rimuru/.rimuru/` — bundled built-in configs (agents, command, glossary, goals, improver, plugins, skills, themes, tool).
- `AGENTS.md` (root) — project dev guide (branch naming, commit format, style).
- `packages/rimuru/AGENTS.md` — database & dev-server guide.
- `CONTEXT.md` — high-level project context.
- `SPEC.md` (if present) — behavior spec.
- Bun workspace catalog at root `package.json` controls all dep versions.
- Turbo (`turbo.json`) orchestrates typecheck/build across packages.

## Project Conventions (athena-ai)

- Branch names: short, ≤3 words, hyphens, no slashes or type prefixes (e.g. `enhanced-config`, `mcp-setup`).
- Commits: Conventional Commits — `type(scope): summary`. Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`. Scopes: `core`, `athena-ai`, `tui`, `app`, `desktop`, `sdk`, `plugin`, `config`, `mcp`.
- Style: `const` over `let`, early returns over `else`, no `try`/`catch` where avoidable. Follow existing source.
- Module shape: flat top-level exports, `export * as Foo from "./foo"` self-reexport — **never** `export namespace`.
- Database: Drizzle schema in `packages/core/src/**/*.sql.ts`. Migrations applied by core.
- Dev TUI: never run `bun dev` as a blocking foreground command in agent context. Use `tmux new-session -d -s athena-ai-dev 'bun dev'`, capture with `tmux capture-pane -pt athena-ai-dev`, stop with `tmux kill-session -t athena-ai-dev`. **Note: tmux is Unix-only — on Windows use the TUI directly via `athena` from a real interactive terminal, or use ConPTY-backed wrappers.**

## User Environment (key facts)

- Working dir convention: `D:\athena-ai\` for athena-ai work, `C:\Users\narea\` otherwise.
- Default PowerShell prompt: `PS C:\Users\narea>`. ANSI escape codes in `*.ps1` scripts will render as raw text on Windows PowerShell 5.1 — recommend `pwsh` (PowerShell 7) for any script that emits colors/cursor moves.
- Python on PATH is 3.10.11, but `node-gyp` resolved 3.13 from the Microsoft Store stub at `C:\Users\narea\AppData\Local\Microsoft\WindowsApps\…\python.exe`.
- Visual Studio Build Tools: **not installed** — needed for `tree-sitter-*` and `node-pty` native builds. Install with: `winget install Microsoft.VisualStudio.2022.BuildTools --override "--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"` (admin required).

## Available Skills (user-global at `C:\Users\narea\.config\opencode\skills\`)

- `Athena.md`, `Athena-god.md` — meta-agent & god-mode patterns
- `backend.md` — API / server work
- `frontend.md` — UI work
- `general.md` — cross-domain fallback
- `hermes.md` — learn new tools/APIs on demand
- `testing.md` — test strategy & writing
- `explore.md` — codebase discovery

All skills should be treated as loaded and available for delegation.

> Note: the user-global `~/.config/opencode/skills/` directory was cleared; only the **bundled** skills in `D:\athena-ai\.rimuru\agents\athena*.md` remain (12 base + 9 max-tier = 21 domain profiles). Local skills directory is empty — `athena run` won't find skills at `~/.config/opencode/skills/` until re-created.

## Configured MCPs (live in `~/.config/opencode/opencode.json`)

| MCP | Purpose | Auth | Notes |
|---|---|---|---|
| `github` | GitHub operations (issues, PRs, code, Actions) | `${GITHUB_TOKEN}` ⚠️ **NOT SET** | tell user to set if any gh tool call fails |
| `linkedin` | LinkedIn post/comment/reaction | `${ATHENA_LINKEDIN_CLIENT_ID}` + `${ATHENA_LINKEDIN_CLIENT_SECRET}` | local node server at `linkedin-mcp-image/server.js` |
| `gmail` | Gmail read/send/search/labels | `${ATHENA_GMAIL_OAUTH_PATH}` → `D:\hemres-key.json` | OAuth credentials JSON, not in env |
| `vercel` | Vercel deploys/projects/logs/env | `${VERCEL_TOKEN}` ✅ set | full Vercel platform access |
| `figma` | Figma design context (read/inspect) | remote OAuth (in-session) | https://mcp.figma.com/mcp |
| `browser-use` | Headless browser automation | none | local Python CLI |
| `firecrawl` | Web scrape/crawl/search/extract | hosted MCP key (in URL) | https://mcp.firecrawl.dev/.../v2/mcp |
| `postman` | Postman API (collections, requests, envs) | remote OAuth (in-session) | https://mcp.postman.com/minimal |
| `chrome-devtools` | Chrome devtools protocol (CDP) | none | local via `npx chrome-devtools-mcp --no-usage-statistics` |

## Provider

- `claude-code` provider with `sonnet` model (Claude Code Sonnet, 1M context, 16K output, reasoning + tool calls enabled).
- CLI path: `claude` (resolved to `C:\Users\narea\.local\bin\claude.exe`).

## Plugins Enabled (user-global)

- `@tarquinen/opencode-dcp@latest` — dynamic context provider
- `opencode-optimal-model-temps` — temperature tuning
- `opencode-codebase-index` — codebase indexing for semantic search

## Working Agreements (god-mode defaults)

- **No silent failures**: errors must surface, not be swallowed.
- **No destructive operations without explicit confirmation**: deleting files, force-pushing, dropping tables, killing processes.
- **Prefer tmux / background processes for long-running commands**; never block on interactive TUI launches.
- **Prefer `bun` over `node`**, `npx` for one-off CLIs.
- **When MCP auth/env is missing**: tell the user which env var to set; do not guess.
- **Path awareness**: project root is `D:\athena-ai\`; user home is `C:\Users\narea\`; forward slashes work in Bun/Node, backslashes required for Windows shell.
- **Secrets in config**: LinkedIn client_id/secret were moved to env vars (`ATHENA_LINKEDIN_CLIENT_ID`/`_SECRET`). Gmail path is `D:\hemres-key.json`. figma/postman are remote MCPs (OAuth in-session). If asked to share config, redact first.

## Credentials Awareness (env vars back the MCPs)

> **Architectural rule**: secrets live in env vars or files, NEVER in the prompt. The MCPs read env vars at startup. When the LLM calls a tool, the MCP uses the env var internally; the model only sees the tool result. So **the model has full power to use credentials without ever knowing the values** — that's the secure way.

| Env var | Backs | Status (user-level) | Set with |
|---|---|---|---|
| `GITHUB_TOKEN` | github MCP | ❌ **MISSING** | `[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN","<PAT>","User")` |
| `ATHENA_LINKEDIN_CLIENT_ID` | linkedin MCP | ✅ set | (already moved) |
| `ATHENA_LINKEDIN_CLIENT_SECRET` | linkedin MCP | ✅ set | (already moved) |
| `ATHENA_GMAIL_OAUTH_PATH` | gmail MCP | ✅ set → `D:\hemres-key.json` | (already moved) |
| `VERCEL_TOKEN` | vercel MCP | ✅ set | (user-configured) |
| figma / postman | remote OAuth | n/a (auth in-session) | n/a |
| browser-use / chrome-devtools | none required | n/a | n/a |
| firecrawl | hosted key in URL | n/a | n/a |

**On MCP auth failure**: read the tool error → identify which env var is missing or invalid → tell the user the exact var name and the PowerShell set-command. **Never** echo or guess the secret value.

## Project-local `.env` (`D:\rimuru-ai\.env`)

> Bun auto-loads `.env` from cwd. User-level env vars override. Git-ignored — never committed. Template at `.env.example` (committed) shows structure with no values.

Keys defined in `D:\rimuru-ai\.env` (read values from disk, do NOT echo them):

| Key | Purpose | Backed-up by |
|---|---|---|
| `GITHUB_TOKEN` | github MCP PAT (optional — falls back to `gh` CLI keyring auth) | set to empty → `gh auth` works; set non-empty → MCP uses PAT |
| `ATHENA_LINKEDIN_CLIENT_ID` | linkedin MCP OAuth client id | user-level env var of same name |
| `ATHENA_LINKEDIN_CLIENT_SECRET` | linkedin MCP OAuth client secret | user-level env var of same name |
| `ATHENA_GMAIL_OAUTH_PATH` | gmail MCP OAuth credentials JSON path → `D:\hemres-key.json` | user-level env var of same name |
| `VERCEL_TOKEN` | vercel MCP platform token | user-level env var of same name |

**MCP auth status (last scan)**: github ✅, linkedin ✅, gmail ✅, vercel ✅, browser-use ✅, chrome-devtools ✅, firecrawl ✅, figma ⚠️ (OAuth in-session), postman ⚠️ (OAuth in-session). The two ⚠️ MCPs are remote and authenticate per-session via OAuth in the browser — no env var needed.

## Built-in Tools (`.rimuru/tool/*.ts`)

Re-enabled (were off by default in upstream opencode config):

| Tool | Purpose |
|---|---|
| `github-triage` | Auto-classify & label new GitHub issues (from `packages/rimuru/.rimuru/tool/github-triage.ts`) |
| `github-pr-search` | Semantic search over open PRs |

## Slash Commands (`.rimuru/command/`)

Bundled by the project:

| Command | Purpose |
|---|---|
| `ai-deps` | Audit AI/ML dependencies in the project |
| `changelog` | Generate changelog from conventional commits |
| `commit` | Stage + commit with conventional message |
| `issues` | Triage / list GitHub issues |
| `learn` | Capture a learning into the improver store |
| `rmslop` | Strip LLM-emitted boilerplate from output |
| `spellcheck` | Run spellcheck across project |
| `translate` | Translate text/documents |

Project-custom commands (in `.rimuru/opencode.jsonc`):

- `goal` — set session goal, auto-continue until done
- `build-package` — `bun turbo build --filter=$ARGUMENTS`
- `typecheck` — `bun turbo typecheck`
- `lint` — `oxlint`
- `system-info` — print SYSTEM.md summary

## Bundled Themes

- `D:\athena-ai\packages\rimuru\.rimuru\themes\mytheme.json`
- `C:\Users\narea\.config\opencode\themes\athena-blue.json` ← new (set by athena-god setup)
- `C:\Users\narea\.config\opencode\themes\athena-red.json` ← new

## Athena Agent Roster (in `opencode.jsonc` + bundled profiles)

| Agent | Mode | Role |
|---|---|---|
| `athena-god` | primary (default) | unrestricted god-mode meta; all skills/MCPs; god rules |
| `athena` | primary | workhorse |
| `athena-max` | primary | max-power meta; bash:allow |
| `athena-build` | primary | build/test/lint |
| `athena-doc` | primary | documentation |
| `athena-codebase` | primary | codebase navigation |
| `athena-{agent-tool-dev,backend-dev,cicd,database,frontend-dev,great-sage,mcp-creator,prompt-enhancer,skill-creator}` | profiles in `.rimuru/agents/` | domain specialists |
| `athena-max-{...}` (9 files) | profiles | advanced tier of above |

## Quick-Reference Commands

```powershell
# Launch Athena TUI
athena

# Run a one-shot prompt
athena run "your prompt here"

# Reinstall dependencies (preserves .rimuru overrides)
cd D:\athena-ai; bun install --ignore-scripts

# Build the plugin workspace after src changes
cd D:\athena-ai\packages\plugin; bun run build

# Project-wide typecheck
cd D:\athena-ai; bun turbo typecheck

# Lint
cd D:\athena-ai; bun run lint

# Git status
cd D:\athena-ai; git status
```
