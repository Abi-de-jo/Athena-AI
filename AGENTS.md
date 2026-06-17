# Rimuru-AI Development Guide

## Project Identity
Rimuru-AI is an AI-powered development tool. This is the main repository.

## Branch Names
Use short branch names (at most three words, hyphens, no slashes or type prefixes).

Examples: `enhanced-config`, `mcp-setup`, `doc-prep-workflow`

## Commits and PR Titles
Conventional commit format: `type(scope): summary`.

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
Scopes: `core`, `rimuru-ai`, `tui`, `app`, `desktop`, `sdk`, `plugin`, `config`, `mcp`

## Style Guide
Follow the existing code style in the source. Key rules:
- `const` over `let`, early returns over `else`
- No `try`/`catch` where possible
- No `any` type
- No import aliasing or star imports
- Rely on type inference
- Functional array methods (flatMap, filter, map) over for loops
- Inline values used once
- Dot notation over destructuring

## Dependencies
- Package Manager: `bun@1.3.14`
- Run `bun install` after any dependency changes
- Run `bun turbo typecheck` for type checking (from package dirs, not root)
- Run `oxlint` for linting

## MCP Servers
Configured in `.rimuru/rimuru.jsonc`. Available MCPs:
- figma — Design integration
- filesystem — File system access
- postman — API management
- chrome-devtools — Browser testing/debugging
- browser-use — Web automation
- mcp-pdf — Document preparation
- sqlite — Database management

## Testing
- Tests cannot run from repo root
- Run from package directories like `packages/opencode`
- Avoid mocks where possible
- Test actual implementation, don't duplicate logic
