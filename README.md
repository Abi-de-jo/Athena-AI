<p align="center">
  <picture>
    <source srcset="media/logo-dark.svg" media="(prefers-color-scheme: dark)">
    <img src="media/logo-light.svg" alt="Athena AI" width="480">
  </picture>
</p>

<p align="center">
  <strong>Athena AI</strong> — The open source AI coding agent. Terminal-native, multi-model, agent-swarm ready.
  <br>
  <sub><em>Code by Abi</em></sub>
</p>

<p align="center">
  <a href="https://github.com/Abi-de-jo/Athena-AI/releases"><img alt="Release" src="https://img.shields.io/github/v/release/Abi-de-jo/Athena-AI?style=flat-square&label=version"></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/Abi-de-jo/Athena-AI?style=flat-square"></a>
  <a href="https://github.com/Abi-de-jo/Athena-AI/network"><img alt="Forks" src="https://img.shields.io/github/forks/Abi-de-jo/Athena-AI?style=flat-square"></a>
</p>

<br>

```
    █████╗ ████████╗██╗  ██╗███████╗███╗   ██╗ █████╗
   ██╔══██╗╚══██╔══╝██║  ██║██╔════╝████╗  ██║██╔══██╗
   ███████║   ██║   ███████║█████╗  ██╔██╗ ██║███████║
   ██╔══██║   ██║   ██╔══██║██╔══╝  ██║╚██╗██║██╔══██║
   ██║  ██║   ██║   ██║  ██║███████╗██║ ╚████║██║  ██║
   ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝
 ```

<br>

<p align="center">
  <em>Athena AI running in the terminal — full ASCII art logo with interactive prompt, MCP integration, and agent-swarm routing.</em>
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Desktop App](#-desktop-app)
- [Quick Start](#-quick-start)
- [Agents](#-agents)
- [MCP Servers](#-mcp-servers)
- [Plugins](#-plugins)
- [Skills](#-skills)
- [Configuration](#-configuration)
- [Development](#-development)
- [Releases & Changelog](#-releases--changelog)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)

---

## 🚀 Features

<table>
  <tr>
    <td width="33%">
      <h3>🧠 Multi-Model AI</h3>
      <p>DeepSeek, GPT, Claude, Gemini, Groq, Ollama, OpenRouter — any OpenAI-compatible provider. Switch mid-session.</p>
    </td>
    <td width="33%">
      <h3>⚡ Terminal-Native TUI</h3>
      <p>Beautiful terminal UI with <a href="https://opentui.com">OpenTUI</a>. Split panes, syntax highlighting, inline diffs, responsive layout.</p>
    </td>
    <td width="33%">
      <h3>🤖 Agent Swarm</h3>
      <p>Hierarchical multi-agent system with specialist subagents. Athena-Wisdom, Athena-PRO, Great Sage, and more.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🔌 Plugin System</h3>
      <p>Codebase indexing, model temperature tuning, session telemetry, goal tracking. Write your own in TypeScript.</p>
    </td>
    <td>
      <h3>🛠️ MCP Servers</h3>
      <p>GitHub, Gmail, LinkedIn, Firecrawl, Figma, Postman, Chrome DevTools, Browser Use, Filesystem — all configured.</p>
    </td>
    <td>
      <h3>🧩 35+ Skills</h3>
      <p>GSAP animation, WordPress dev, security audits, accessibility reviews, penetration testing, and more.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📦 Cross-Platform</h3>
      <p>macOS (Apple Silicon & Intel), Windows (native + WSL), Linux (deb, rpm, AppImage). Docker available.</p>
    </td>
    <td>
      <h3>🔄 Auto-Updates</h3>
      <p>Semantic versioning. One-command upgrade. GitHub Releases with changelogs. Desktop app auto-updater.</p>
    </td>
    <td>
      <h3>🔐 Privacy First</h3>
      <p>Bring your own API keys. No telemetry by default. Fully local code execution. Open source under MIT.</p>
    </td>
  </tr>
</table>

---

## 📦 Installation

```bash
# Quick install (macOS / Linux / WSL)
curl -fsSL https://athena-ai.dev/install | bash

# npm (all platforms)
npm install -g athena-ai@latest

# Bun
bun add -g athena-ai@latest

# pnpm
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

> **Minimum requirements**: Node 18+ or Bun 1.3+, 256-color terminal, 1 GB RAM. Works on Windows Terminal, iTerm2, Kitty, Alacritty, GNOME Terminal, and most modern terminals.

---

## 🖥️ Desktop App

Standalone desktop application with native windowing, auto-updates, and menu bar integration.

| Platform | Download Link |
|----------|--------------|
| macOS (Apple Silicon) | [`Athena-AI-desktop-mac-arm64.dmg`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |
| macOS (Intel) | [`Athena-AI-desktop-mac-x64.dmg`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |
| Windows (x64) | [`Athena-AI-desktop-windows-x64.exe`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |
| Linux (deb) | [`Athena-AI-desktop-linux-amd64.deb`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |
| Linux (rpm) | [`Athena-AI-desktop-linux-x86_64.rpm`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |
| Linux (AppImage) | [`Athena-AI-desktop-linux-x86_64.AppImage`](https://github.com/Abi-de-jo/Athena-AI/releases/latest) |

```bash
# macOS (Homebrew cask)
brew install --cask athena-ai-desktop

# Windows (Scoop)
scoop bucket add extras
scoop install extras/athena-ai-desktop
```

> **All releases** are available on the [Releases page](https://github.com/Abi-de-jo/Athena-AI/releases).

---

## ⚡ Quick Start

```bash
# 1. Start Athena-AI from your project directory
athena

# 2. On first launch, configure a model provider:
#    Edit ~/.config/athena/opencode.json:
#    {
#      "provider": {
#        "opencode": {
#          "models": {
#            "deepseek-v4-flash": {
#              "name": "DeepSeek-V4-Flash",
#              "limit": { "context": 1000000, "output": 384000 }
#            }
#          }
#        }
#      }
#    }

# 3. Start coding in natural language
#    Athena-AI will read files, edit code, run commands, call MCP tools,
#    and delegate to specialist subagents automatically.

# 4. Slash commands
/goal <description>   — Set a session goal and auto-continue
/build <package>      — Build a specific package
/typecheck            — Run typecheck across project
/lint                 — Run linter
```

### ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Switch agent (build / plan / custom) |
| `Ctrl+P` | File search |
| `Ctrl+D` | Toggle diff view |
| `Ctrl+E` | File explorer |
| `Ctrl+K` | Clear conversation |
| `Ctrl+L` | Scroll to bottom |
| `Esc` | Cancel operation |

---

## 🤖 Agents

Athena-AI's hierarchical agent system routes tasks to the right specialist automatically.

### Primary Agents

| Agent | Mode | Description |
|-------|------|-------------|
| **Athena-Wisdom** | `primary` | 10x autonomous architect — parallel swarm, self-evolving memory, predictive failure detection |
| **Athena-PRO** | `primary` | Rimuru meta-agent — improves agents, plugins, MCPs, token efficiency. No confirmation gates |
| **Athena** | `primary` | Meta-agent with confirmation gates |
| **Athena-God** | `primary` | Unconstrained god-mode — maximum permissions, full system context |
| **Plan** | `primary` | Read-only agent for code exploration and analysis |

### Specialist Subagents

| Agent | Domain |
|-------|--------|
| **FrontCraft** | Frontend (React, Vue, Angular, CSS, a11y) |
| **BackForge** | Backend (APIs, auth, services, microservices) |
| **DataVault** | Database (schema, queries, migrations, sharding) |
| **PipelineForge** | CI/CD (GitHub Actions, Docker, K8s, Terraform) |
| **AgentSmith** | Agent & tool development |
| **SkillForge** | Skill creation & management |
| **MCPForge** | MCP server creation & orchestration |
| **PromptAlchemist** | Prompt optimization & engineering |
| **Great Sage** | Self-learning, error absorption, rule evolution |

---

## 🛠️ MCP Servers

Model Context Protocol servers extend Athena-AI with powerful external integrations.

| Server | Type | Capabilities |
|--------|------|-------------|
| **GitHub** | remote | Repos, issues, PRs, releases, actions |
| **Gmail** | OAuth | Read/send emails, manage threads |
| **LinkedIn** | OAuth | Posts, comments, reactions, image uploads |
| **Firecrawl** | remote | Web scraping, crawling, search, structured extraction |
| **Figma** | local | Design files, components, exports |
| **Postman** | remote | API collections, requests, testing |
| **Chrome DevTools** | local | Browser debugging, console, network |
| **Browser Use** | local | Browser automation, form filling |
| **Filesystem** | local | File read/write outside workspace |

Configure in `.rimuru/rimuru.jsonc`:

```json
{
  "mcp": {
    "servers": {
      "firecrawl": {
        "type": "remote",
        "url": "https://mcp.firecrawl.dev/YOUR_KEY/v2/mcp"
      }
    }
  }
}
```

---

## 🔌 Plugins

| Plugin | Purpose |
|--------|---------|
| `optimal-model-temps` | Auto-adjusts model temperature per task type |
| `codebase-index` | Searchable codebase index for context-aware suggestions |
| `helicone-session` | Session telemetry and analytics |
| `goal-plugin` | Session-scoped goal tracking with auto-continue |

```json
{
  "plugins": ["optimal-model-temps", "codebase-index", "helicone-session", "goal-plugin"]
}
```

---

## 🧩 Skills

35+ built-in skills loaded on-demand when a task matches:

| Category | Skills |
|----------|--------|
| **Animation** | GSAP Core, Timeline, ScrollTrigger, Plugins, Performance |
| **WordPress** | Blocks, Themes, Plugins, REST API, Security, Performance, ACF, WooCommerce, WP-CLI, Playground, a11y, Admin UI, Headless, CI/CD, Migration, PHPStan, Testing, Interactivity API |
| **Dev Tools** | Prompt Enhancement, Skill Creation, Agent-Driven Dev, Brainstorming, Diagnostics, Debugging, Architecture, Knowledge Graphs |
| **Automation** | Browser Automation, Document Prep, System Verification |
| **Security** | Ethical Hacking, OWASP/NIST/MITRE |

---

## ⚙️ Configuration

Config files use JSON with comments (`.jsonc`):

| File | Scope |
|------|-------|
| `~/.config/rimuru/rimuru.jsonc` | Global (all projects) |
| `.rimuru/rimuru.jsonc` | Project-local overrides |
| `~/.config/athena/opencode.json` | Providers + MCP servers |

---

## 🛠️ Development

### Prerequisites
- [Bun](https://bun.sh) 1.3.14+
- Git

### Setup

```bash
git clone https://github.com/Abi-de-jo/Athena-AI.git
cd Athena-AI
bun install
bun turbo build
bun turbo typecheck
```

### Project Structure

```
Athena-AI/
├── packages/
│   ├── core/            # Core library — config, plugins, MCP, permissions
│   ├── rimuru/           # CLI tool — main entry point (v1.18.0)
│   ├── tui/              # Terminal UI components
│   ├── ui/               # Shared UI primitives
│   ├── console/          # Console/terminal app
│   ├── desktop/          # Desktop app (Electron)
│   ├── app/              # Web app
│   ├── docs/             # Documentation site
│   └── sdk/              # TypeScript SDK
├── media/                # README assets and screenshots
├── .rimuru/              # Project-local agent configs
├── patches/              # Dependency patches
└── scripts/              # Build and release scripts
```

---

## 📝 Releases & Changelog

### Versioning

Athena-AI follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

### Release Process

1. **Version bump** — Update `packages/rimuru/package.json`
2. **Changelog** — Add entries to `CHANGELOG.md`
3. **Tag** — `git tag v<version> && git push origin v<version>`
4. **Release** — Auto-builds: npm package, Homebrew formula, desktop binaries (DMG/EXE/AppImage), Docker images
5. **Announce** — Release notes on GitHub Releases

### Latest Release

👉 **[v1.18.0](https://github.com/Abi-de-jo/Athena-AI/releases/latest)** — Initial production release

Full changelog: [CHANGELOG.md](CHANGELOG.md)

---

## 🤝 Contributing

We welcome all contributors! This project is built for the community.

### How to Contribute

1. **Fork** the repository
2. **Branch**: `feat/your-feature`, `fix/your-fix`, `docs/your-doc`
3. **Commit**: `type(scope): summary` — types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
4. **Push**: `git push origin your-branch`
5. **PR**: Open a pull request to `main`

### Code Style

- `const` over `let`, early returns over `else`
- No `any` type, no star imports, no `try`/`catch` where possible
- Functional array methods (flatMap, filter, map) over for loops
- Rely on type inference, dot notation over destructuring

### Testing

```bash
# Run from package directories
cd packages/rimuru
bun test
```

---

## 📄 License

[MIT](LICENSE) © [Abi-de-jo](https://github.com/Abi-de-jo)

---

## 👥 Contributors

Athena-AI is **Code by Abi** — built with ❤️ for the open source community.

<!-- CONTRIBUTORS_PLACEHOLDER -->

<p align="center">
  <sub>
    Built with <a href="https://effect.website/">Effect</a> · <a href="https://opentui.com/">OpenTUI</a> · 
    <a href="https://bun.sh">Bun</a>
  </sub>
  <br>
  <sub>Athena-AI — The open source AI coding agent. Code by Abi.</sub>
  <br><br>
  <a href="https://github.com/Abi-de-jo/Athena-AI/discussions">💬 Discussions</a> ·
  <a href="https://github.com/Abi-de-jo/Athena-AI/issues">🐛 Issues</a> ·
  <a href="https://github.com/Abi-de-jo/Athena-AI/releases">📦 Releases</a>
</p>
