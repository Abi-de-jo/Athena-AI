# Rimuru-AI Project Notes

## Session: 2026-06-16 — White-label OpenCode fork as Rimuru AI

### Done
- Fixed ghostty-web dependency (was `github:gowdaman/ghostty-web`, reverted to `github:anomalyco/ghostty-web`)
- Cleared stale bun cache entry `@opencode-ai+plugin` — `bun install` passes 23/23 typecheck tasks
- Rewrote `README.md`, `AGENTS.md`, `package.json` — Rimuru AI branding
- Created repo `github.com/gowdaman-dev/rimuru-ai` (public), pushed `dev` branch
- Rewrote `install` script — `APP=rimuru`, ASCII logo, all URLs point to `gowdaman-dev/rimuru-ai`
- Rewrote `github/README.md` and `github/action.yml`
- Rewrote `SECURITY.md`, `CONTEXT.md`, `CONTRIBUTING.md`
- Rewrote `flake.nix`, `nix/opencode.nix` (pname=rimuru-ai), `nix/desktop.nix` (pname=rimuru-desktop), `nix/node_modules.nix` (pname=rimuru-node_modules)
- Updated `nix/hashes.json` — fixed duplicate `darwin` key
- Updated all `.github/workflows/*.yml` — install URLs → `rimurucode.vercel.app/install`, git config → `bot@rimuru.sh`/`rimuru@gowdaman.dev`, CLI commands → `rimuru run`, bot → `rimuru-agent[bot]`
- Updated `nix-eval.yml` — `PACKAGES="rimuru-ai"`
- Updated `opencode.yml` — renamed workflow to `rimuru`, model → `rimuru-ai/claude-sonnet-4-6`
- Updated `.rimuru/tui.json` — schema URL → `rimurucode.vercel.app/tui.json`
- User confirmed deployment target: **Vercel** at **`rimurucode.vercel.app`**

### Pending (resume next session)
1. Sweep 21 translated READMEs (`README.*.md`) — ~190 `opencode.ai` URLs + "OpenCode" name → `rimurucode.vercel.app` / "Rimuru AI"
2. White-label console i18n files (`packages/app/src/i18n/*.json`) — ~30 language files with "OpenCode" UI strings
3. Fix `review.yml` line 54 — `rimuru-ai run` → `rimuru run --agent review`
4. Set up Vercel (`vercel.json`) for `rimurucode.vercel.app`
5. `bun turbo typecheck` + push to `dev`

### Key Context
- GitHub auth: `gh` logged in as `gowdaman-dev` (not `gowdaman`), scopes: `gist, read:org, repo, workflow`
- Git remote: `https://github.com/gowdaman-dev/rimuru-ai.git`
- Branch: `dev` (default)
- Binary name: `rimuru` (install script + nix output)
- Install URL: `https://rimurucode.vercel.app/install`
- Pre-push hook runs `bun turbo typecheck` — must pass
- Last commit: `55c0701db` — "chore: white-label to Rimuru AI — README, AGENTS.md, package.json"

---

## Session: 2026-06-18 — TUI logo rebrand + Rimuru slime icons

### Done
- **TUI rebrand**: Replaced "opencode" ASCII art + GO wings with 6-line "RIMURU" block-letter ASCII logo
  - Fixed `Array.from` crash: `logo.right` length must match `logo.left` (both 6)
  - Fixed `sessionEpilogue()`: `opencode -s` → `rimuru -s`
  - `presentation.test.ts` passes, TUI typecheck passes
- **Desktop icons → Rimuru slime**: Downloaded CC0-licensed SVG from Wikimedia Commons
  - Generated 49 icon files (all channels dev/beta/prod): PNGs, iOS, Android, ICO, ICNS
  - Saved source SVG to `packages/desktop/icons/rimuru.svg`
  - Generation script at `/tmp/rimuru-icon-gen/gen-icons.sh`
- **Desktop prebuild fix**: `../opencode` → `../rimuru` in `packages/desktop/scripts/prebuild.ts`
- **CLI binary**: Built via `bun run script/build.ts --single --skip-embed-web-ui` — 121MB x86-64 ELF, smoke test passed
- **Installed**: Copied to `~/.local/bin/rimuru-ai`

### Key Context
- TUI build: `bun run script/build.ts --single --skip-embed-web-ui` from `packages/rimuru/`
- Binary install: `cp dist/rimuru-ai-linux-x64/bin/rimuru-ai ~/.local/bin/`
- Desktop build blocked by sidecar dependency (pre-existing, not caused by our changes)
- Rimuru SVG source: CC0 fan art, public domain — safe for commercial use
