# Token Audit — OpenCode Improver

## 2026-06-15 — MADAR Graph Was Empty Due to Missing `--include-docs`

- **Issue**: All `madar generate .` calls omitted `--include-docs`. Since `.config/opencode/` is ~90% markdown, the extractor produced 0 nodes → `pack`/`query` returned nothing → agents fell back to glob/grep/file sweeps (wasting thousands of tokens).
- **Fix**: Added `--include-docs` to all `madar generate` calls in `codeflux.md`, `codeflux-god.md`, and `madar-graph/SKILL.md`.
- **Result**: 94 nodes, 124 edges from 16 files. Pack/query now work and can replace expensive file sweeps.
- **Token impact**: Each successful MADAR `pack` replaces ~2-5k tokens of glob/grep/file reads. Estimated savings: ~3-8k tokens per lookup.
- **SUPERSEDED 2026-06-17**: MADAR replaced entirely by FastContext. Now uses `fastcontext -q "..." --citation` instead of `madar pack`/`madar query`. No graph to maintain; exploration is delegated to a subagent that returns compact file:line citations (~200-500 tokens per lookup vs ~3-8k per file sweep).

---

## 2026-06-15 — Subagent token optimization applied

- **Ethical-hacking agent**: 8 steps instead of default 25+ → saves ~200-400 tokens per subagent invocation (fewer reasoning loops). `bash: ask` prevents runaway tool execution.
- **Document-prep agent**: 6 steps + inline soffice commands → saves ~2-5k tokens by avoiding websearch for "how to convert ODT to PDF with LibreOffice" on every use.
- **ERP-architect agent**: 6 steps + `bash: deny` + `webfetch: allow` → read-only by design. No bash tool schema overhead (~100 tokens saved per request).
- **All new subagents**: No `model` override → inherits default model, no hardcoded expensive provider tokens.
- **codeflux.json / opencode.json agent entries**: Added `permission.task: {"*": "allow"}` to formalize subagent access (was implicit before, now explicit — same token cost, clearer intent).

## 2026-06-13 — Initial observations
