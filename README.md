<p align="center">
  <picture>
    <source srcset="packages/console/app/src/asset/lander/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="packages/console/app/src/asset/lander/logo-light.svg" media="(prefers-color-scheme: light)">
    <img src="packages/console/app/src/asset/lander/logo-light.svg" alt="Athena-AI logo" width="480">
  </picture>
</p>
<p align="center">
  <strong>The open source AI coding agent — powered by Veldora.</strong>
  <br>
  Terminal-native · Multi-model · Plugin-extensible · Agent-swarm ready
</p>
<p align="center">
  <a href="https://github.com/Abi-de-jo/Athena-AI/releases"><img alt="GitHub release" src="https://img.shields.io/github/v/release/Abi-de-jo/Athena-AI?style=flat-square&logo=github" /></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/actions"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/Abi-de-jo/Athena-AI/ci.yml?style=flat-square&branch=main" /></a>
  <a href="https://www.npmjs.com/package/athena-ai"><img alt="npm" src="https://img.shields.io/npm/v/athena-ai?style=flat-square" /></a>
  <a href="https://opensource.org/licenses/MIT"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" /></a>
  <br>
  <a href="#"><img alt="Downloads" src="https://img.shields.io/github/downloads/Abi-de-jo/Athena-AI/total?style=flat-square" /></a>
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat-square" /></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/issues"><img alt="Issues" src="https://img.shields.io/github/issues/Abi-de-jo/Athena-AI?style=flat-square" /></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#desktop-app">Desktop App</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#agents">Agents</a> •
  <a href="#mcp-servers">MCP Servers</a> •
  <a href="#plugins">Plugins</a> •
  <a href="#skills">Skills</a> •
  <a href="#contributing">Contributing</a>
</p>

<br>

![Athena-AI Terminal UI](packages/console/app/src/asset/lander/screenshot.png)

*Athena-AI running in the terminal — multi-turn coding session with tool use, MCP integration, and agent routing.*

---

## Features

<table>
  <tr>
    <td width="50%">
      <h3>🧠 Multi-Model AI</h3>
      <p>Works with any OpenAI-compatible provider — DeepSeek, GPT, Claude, Gemini, Groq, Ollama (local), OpenRouter, and more. Switch models mid-session.</p>
    </td>
    <td width="50%">
      <h3>⚡ Terminal-Native TUI</h3>
      <p>Beautiful terminal UI built with <a href="https://opentui.com">OpenTUI</a>. Split panes, file diffs, syntax highlighting, inline images, and responsive layout.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🔌 Extensible Plugin System</h3>
      <p>Add functionality through plugins. Codebase indexing, model temperature tuning, session telemetry, goal tracking, and more. Write your own in TypeScript.</p>
    </td>
    <td>
      <h3>🛠️ MCP Server Support</h3>
      <p>Model Context Protocol servers for GitHub, Gmail, LinkedIn, Figma, Postman, Chrome DevTools, Browser Automation, Firecrawl, and filesystem access.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🤖 Multi-Agent Swarm</h3>
      <p>Hierarchical agent system with specialist subagents. Router delegates to domain experts: backend, frontend, database, devops, security, docs, and more.</p>
    </td>
    <td>
      <h3>🧩 Skills Library</h3>
      <p>Load specialized skills on demand. GSAP animation, WordPress development, accessibility audits, penetration testing, prompt engineering, and 30+ more.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📦 Cross-Platform</h3>
      <p>macOS (Apple Silicon & Intel), Windows (native + WSL), Linux (deb, rpm, AppImage). Also available as a desktop app with native windowing.</p>
    </td>
    <td>
      <h3>🔄 Automatic Updates</h3>
      <p>Built-in update notifications. One-command upgrade. Semantic versioning with GitHub Releases. Changelog-driven release process.</p>
    </td>
  </tr>
</table>

---

## Installation

```bash
# Quick install (macOS / Linux / Windows WSL)
curl -fsSL https://athena-ai.dev/install | bash

# npm (any platform)
npm install -g athena-ai@latest
# or
bun add -g athena-ai@latest
# or
pnpm add -g athena-ai@latest

# macOS (Homebrew)
brew install Abi-de-jo/tap/athena-ai

# Windows (Scoop)
scoop bucket add athena-ai https://github.com/Abi-de-jo/scoop-athena
scoop install athena-ai

# Windows (Chocolatey)
choco install athena-ai

# Linux (AUR) — Arch
yay -S athena-ai-bin

# Nix
nix run github:Abi-de-jo/Athena-AI

# Docker
docker run -it --rm -v $(pwd):/workspace ghcr.io/Abi-de-jo/athena-ai
```

> **Minimum requirements**: Node 18+ or Bun 1.3+, terminal with 256-color support, 1 GB RAM.

---

## Desktop App

Athena-AI is also available as a native desktop application with a standalone TUI window, menu bar integration, and auto-updates.

| Platform | Download |
|----------|----------|
| macOS (Apple Silicon) | `Athena-AI-desktop-mac-arm64.dmg` |
| macOS (Intel) | `Athena-AI-desktop-mac-x64.dmg` |
| Windows (x64) | `Athena-AI-desktop-windows-x64.exe` |
| Linux (deb) | `Athena-AI-desktop-linux-amd64.deb` |
| Linux (rpm) | `Athena-AI-desktop-linux-x86_64.rpm` |
| Linux (AppImage) | `Athena-AI-desktop-linux-x86_64.AppImage` |

**Download from the [Releases page](https://github.com/Abi-de-jo/Athena-AI/releases).**

```bash
# macOS (Homebrew)
brew install --cask athena-ai-desktop

# Windows (Scoop)
scoop bucket add extras; scoop install extras/athena-ai-desktop
```

---

## Quick Start

```bash
# 1. Start Athena-AI (from your project directory)
athena

# 2. Configure your provider (first launch)
#    Add a model provider in ~/.config/athena/opencode.json:
#    {
#      "provider": {
#        "opencode": {
#          "models": {
#            "deepseek-v4-flash": {
#              "name": "DeepSeek-V4-Flash",
#              "limit": { "context": 1000000, "output": 384000 }
#            },
#            "gpt-4o": {
#              "name": "gpt-4o",
#              "provider": "openai",
#              "limit": { "context": 128000, "output": 16000 }
#            }
#          }
#        }
#      }
#    }

# 3. Start coding
#    Type your task in natural language — Athena-AI will:
#    - Understand your intent
#    - Read and edit files
#    - Run terminal commands
#    - Call MCP tools when needed
#    - Delegate to specialist subagents

# 4. Use slash commands
#    /goal <description>   — Set a session goal and auto-continue
#    /build <package>      — Build a specific package with turbo
#    /typecheck            — Run typecheck across the project
#    /lint                 — Run linter
```

### Key shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Switch between agents (build / plan / custom) |
| `Ctrl+P` | Toggle file search |
| `Ctrl+D` | Toggle diff view |
| `Ctrl+E` | Open file explorer |
| `Ctrl+K` | Clear conversation |
| `Ctrl+L` | Scroll to bottom |
| `Esc` | Cancel current operation |

---

## Agents

Athena-AI includes a powerful hierarchical agent system. Each agent has a specific role, tool permissions, and model configuration.

### Primary Agents

| Agent | Mode | Description |
|-------|------|-------------|
| **Athena-Wisdom** | `primary` | 10x autonomous system architect — parallel swarm execution, self-evolving memory, predictive failure detection |
| **Athena** | `primary` | Rimuru meta-agent — improves agents, plugins, MCPs, token efficiency. Routes tasks to specialist subagents |
| **Athena-PRO** | `primary` | Unrestricted version of Athena — no confirmation gates, direct apply |
| **Athena-God** | `primary` | Unconstrained god-mode agent — maximum permissions, full project + system context |
| **Veldora** | `primary` | Original build agent — full-access development agent |
| **Plan** | `primary` | Read-only analysis agent — explores codebases without making changes |

### Specialist Subagents

| Agent | Domain | Tools |
|-------|--------|-------|
| **FrontCraft** | Frontend (React, Vue, Angular, CSS, a11y) | Write, edit, glob, grep |
| **BackForge** | Backend (APIs, auth, services) | Write, edit, bash, task |
| **DataVault** | Database (schema, queries, migrations) | Read, write, bash |
| **PipelineForge** | CI/CD (GitHub Actions, Docker, K8s) | Read, write, bash |
| **AgentSmith** | Agent & tool development | Full toolkit |
| **SkillForge** | Skill creation & management | Read, write, task |
| **MCPForge** | MCP server creation & config | Read, write, bash |
| **PromptAlchemist** | Prompt optimization | Read, write |
| **Great Sage** | Self-learning, evolution, error absorption | Read, task |

### Creating Custom Agents

Agents are defined as Markdown files with YAML frontmatter:

```yaml
---
description: My custom agent for React component development
mode: primary
temperature: 0.2
steps: 25
permission:
  read: allow
  edit: allow
  glob: allow
  grep: allow
  bash: ask
  webfetch: allow
  task: allow
---
```

Place them in `.rimuru/agents/` (project-local) or `~/.config/rimuru/agents/` (global).

---

## MCP Servers

Model Context Protocol (MCP) servers extend Athena-AI with external tool integrations.

| Server | Type | Capabilities |
|--------|------|-------------|
| **GitHub** | remote | Repository management, issues, PRs, releases, actions |
| **Gmail** | local (OAuth) | Read/send emails, manage threads, search |
| **LinkedIn** | local (OAuth) | Create posts, manage comments & reactions, upload images |
| **Firecrawl** | remote | Web scraping, crawling, mapping, search, structured data extraction |
| **Figma** | local | Design file access, component inspection, export |
| **Postman** | remote | API collection management, request execution |
| **Chrome DevTools** | local (npx) | Browser debugging, console, network, elements |
| **Browser Use** | local (npx) | Browser automation, web interaction, form filling |
| **Filesystem** | local | File read/write outside workspace |

**Configure MCPs** in `.rimuru/rimuru.jsonc`:

```json
{
  "mcp": {
    "servers": {
      "firecrawl": {
        "type": "remote",
        "url": "https://mcp.firecrawl.dev/YOUR_KEY/v2/mcp"
      },
      "github": {
        "type": "local",
        "command": ["npx", "-y", "@modelcontextprotocol/server-github"],
        "environment": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

---

## Plugins

Extend Athena-AI's core functionality with plugins:

| Plugin | Purpose |
|--------|---------|
| `optimal-model-temps` | Automatically adjusts model temperature based on task type |
| `codebase-index` | Builds searchable codebase index for context-aware suggestions |
| `helicone-session` | Session telemetry and analytics via Helicone |
| `goal-plugin` | Session-scoped goal tracking with auto-continue |

**Install plugins** via `rimuru.jsonc`:

```json
{
  "plugins": [
    "optimal-model-temps",
    "codebase-index",
    "helicone-session",
    "goal-plugin"
  ]
}
```

---

## Skills

Skills are specialized instruction sets loaded on-demand when a task matches their description. Athena-AI ships with 35+ built-in skills:

| Category | Skills |
|----------|--------|
| **Animation** | GSAP Core, Timeline, ScrollTrigger, Plugins, Performance |
| **WordPress** | Block Development, Theme Development, Plugin Development, REST API, Security Review, Performance Review, ACF, WooCommerce, WP-CLI, Playground, Accessibility, Admin UI, Headless/WPGraphQL, CI/CD, Migration, PHPStan, Testing, Interactivity API, Abilities API |
| **Development** | Prompt Enhancement, Skill Creation, Subagent-Driven Development, Brainstorming, Diagnostics, Debugging, Architecture Improvement, Knowledge Graphs |
| **Automation** | Browser Automation, Document Preparation, System Verification |
| **Teaching** | Teach, Find Skills |

**Custom skills** go in `~/.agents/skills/<name>/SKILL.md`:

```markdown
---
name: my-skill
description: What this skill does — triggers on matching user requests
---
# My Skill

Instructions loaded when this skill is activated...
```

---

## Configuration

Athena-AI is configured through `rimuru.jsonc` files (JSON with comments):

| File | Scope |
|------|-------|
| `~/.config/rimuru/rimuru.jsonc` | Global (all projects) |
| `.rimuru/rimuru.jsonc` | Project-local (overrides global) |
| `~/.config/rimuru/opencode.jsonc` | Global provider + MCP config |

See the [full configuration reference](https://athena-ai.dev/docs/config) for all options.

---

## Development

### Prerequisites

- [Bun](https://bun.sh) 1.3.14+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/Abi-de-jo/Athena-AI.git
cd Athena-AI

# Install dependencies
bun install

# Build all packages
bun turbo build

# Run typecheck
bun turbo typecheck
```

### Project Structure

```
Athena-AI/
├── packages/
│   ├── core/          # Core library — config, plugins, MCP, permissions
│   ├── rimuru/        # CLI tool — main entry point
│   ├── tui/           # Terminal UI components
│   ├── ui/            # Shared UI primitives
│   ├── console/       # Console/terminal app
│   ├── desktop/       # Desktop app (Electron wrapper)
│   ├── app/           # Web app
│   ├── docs/          # Documentation site (Astro)
│   └── sdk/           # TypeScript SDK
├── .rimuru/           # Project-local agent configs
├── patches/           # Dependency patches
└── scripts/           # Build and release scripts
```

### Release Process

Athena-AI follows [Semantic Versioning](https://semver.org/):

1. **Version bump**: Update version in `packages/rimuru/package.json`
2. **Changelog**: Add entries to `CHANGELOG.md`
3. **Tag**: `git tag v<version> && git push origin v<version>`
4. **Release**: GitHub Actions builds and publishes:
   - npm package (`athena-ai`)
   - Homebrew formula
   - Desktop app binaries (DMG, EXE, AppImage)
   - Docker images
5. **Announce**: Release notes on GitHub Releases

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting:

- 🐛 **Bug reports**: Open a [GitHub Issue](https://github.com/Abi-de-jo/Athena-AI/issues)
- 💡 **Feature requests**: Start a [Discussion](https://github.com/Abi-de-jo/Athena-AI/discussions)
- 🔧 **Pull requests**: Fork, branch, commit, PR

### Development conventions

- **Branch names**: Short, hyphen-separated, no type prefixes (e.g., `enhanced-config`, `mcp-setup`)
- **Commits**: `type(scope): summary` — types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
- **Code style**: `const` over `let`, early returns, no `any`, no star imports, functional array methods
- **Testing**: Run from package directories: `cd packages/rimuru && bun test`

---

## License

MIT © [Abi-de-jo](https://github.com/Abi-de-jo)

---

## Community

<p align="center">
  <a href="#"><img alt="Discord" src="https://img.shields.io/badge/Discord-Join%20chat-5865F2?style=for-the-badge&logo=discord" /></a>
  <a href="#"><img alt="X/Twitter" src="https://img.shields.io/badge/X-Follow%20%40AthenaAI-000000?style=for-the-badge&logo=x" /></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/discussions"><img alt="GitHub Discussions" src="https://img.shields.io/badge/GitHub-Discussions-181717?style=for-the-badge&logo=github" /></a>
</p>

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Abi-de-jo">Abi-de-jo</a> · Powered by <a href="https://effect.website/">Effect</a> and <a href="https://opentui.com/">OpenTUI</a></sub>
</p>
