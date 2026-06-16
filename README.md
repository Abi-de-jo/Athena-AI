<p align="center">
  <picture>
    <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
    <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Rimuru AI logo">
  </picture>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://github.com/gowdaman-dev/rimuru-ai/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/gowdaman-dev/rimuru-ai/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a>
</p>

---

### Installation

```bash
# YOLO
curl -fsSL https://rimuru.ai/install | bash

# Package managers (coming soon)
# npm i -g rimuru-ai@latest
```

> [!TIP]
> This is a development fork — the install script and published packages are being set up.

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

Rimuru AI includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.

### Documentation

For more info on how to configure Rimuru AI, refer to the project-level `.opencode/` configuration files in this repo.

### Contributing

Interested in contributing? Check the [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

---

**Join our community** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
