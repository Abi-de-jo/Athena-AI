<p align="center">
  <picture>
    <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
    <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Rimuru AI logo">
  </picture>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/rimuru-ai"><img alt="npm version" src="https://img.shields.io/npm/v/rimuru-ai?style=flat-square" /></a>
  <a href="https://github.com/gowdaman-dev/rimuru-ai/actions/workflows/publish-npm.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/gowdaman-dev/rimuru-ai/publish-npm.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a>
</p>

---

### Installation

```bash
# Quick install
curl -fsSL https://rimurucode.vercel.app/install | bash

# or via npm
npm install -g rimuru-ai@latest
```

### Desktop App (BETA)

Rimuru AI is also available as a desktop application. Download directly from the [releases page](https://github.com/gowdaman-dev/rimuru-ai/releases).

| Platform              | Download                              |
| --------------------- | ------------------------------------- |
| macOS (Apple Silicon) | `rimuru-desktop-mac-arm64.dmg`        |
| macOS (Intel)         | `rimuru-desktop-mac-x64.dmg`          |
| Windows               | `rimuru-desktop-windows-x64.exe`      |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`        |

### Project Status

This is the main repository for Rimuru AI — an AI-powered development tool. It is actively developed as a fork with enhanced MCP server integration, expanded agent system, and custom identity/logo.

### Agents

Rimuru AI ships with **Veldora** and **Veldora-Pro** — two hierarchically organized meta-agents:

- **veldora** — General-purpose agent for development, research, and multi-turn tasks
- **veldora-pro** — Self-improving meta-agent that audits, tunes, and optimizes the Rimuru setup itself (agent configs, plugins, skills, MCP servers, token efficiency)

Plus specialist subagents for backend, frontend, database, devops, systems engineering, ethical hacking, document prep, and ERP architecture.

### Documentation

For more info on how to configure Rimuru AI, refer to the project-level `.rimuru/` configuration files in this repo.

### Contributing

Interested in contributing? Check the [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

---
