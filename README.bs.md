<p align="center">
  <a href="https://rimurucode.vercel.app">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Rimuru AI logo">
    </picture>
  </a>
</p>
<p align="center">Rimuru AI je open source AI agent za programiranje.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/rimuru-ai"><img alt="npm" src="https://img.shields.io/npm/v/rimuru-ai?style=flat-square" /></a>
  <a href="https://github.com/gowdaman/rimuru-ai/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/gowdaman/rimuru-ai/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![Rimuru AI Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://rimurucode.vercel.app)

---

### Instalacija

```bash
# YOLO
curl -fsSL https://rimurucode.vercel.app/install | bash

# Package manageri
npm i -g rimuru-ai@latest        # ili bun/pnpm/yarn
scoop install rimuru-ai             # Windows
choco install rimuru-ai             # Windows
brew install gowdaman/tap/rimuru-ai # macOS i Linux (preporučeno, uvijek ažurno)
brew install rimuru-ai              # macOS i Linux (zvanična brew formula, rjeđe se ažurira)
sudo pacman -S rimuru-ai            # Arch Linux (Stable)
paru -S rimuru-ai-bin               # Arch Linux (Latest from AUR)
mise use -g rimuru-ai               # Bilo koji OS
nix run nixpkgs#rimuru-ai           # ili github:gowdaman/rimuru-ai za najnoviji dev branch
```

> [!TIP]
> Ukloni verzije starije od 0.1.x prije instalacije.

### Desktop aplikacija (BETA)

Rimuru AI je dostupan i kao desktop aplikacija. Preuzmi je direktno sa [stranice izdanja](https://github.com/gowdaman/rimuru-ai/releases) ili sa [rimurucode.vercel.app/download](https://rimurucode.vercel.app/download).

| Platforma             | Preuzimanje                        |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `rimuru-ai-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `rimuru-ai-desktop-mac-x64.dmg`     |
| Windows               | `rimuru-ai-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ili AppImage       |

```bash
# macOS (Homebrew)
brew install --cask rimuru-ai-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/rimuru-ai-desktop
```

#### Instalacijski direktorij

Instalacijska skripta koristi sljedeći redoslijed prioriteta za putanju instalacije:

1. `$OPENCODE_INSTALL_DIR` - Prilagođeni instalacijski direktorij
2. `$XDG_BIN_DIR` - Putanja usklađena sa XDG Base Directory specifikacijom
3. `$HOME/bin` - Standardni korisnički bin direktorij (ako postoji ili se može kreirati)
4. `$HOME/.rimuru-ai/bin` - Podrazumijevana rezervna lokacija

```bash
# Primjeri
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://rimurucode.vercel.app/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://rimurucode.vercel.app/install | bash
```

### Agenti

Rimuru AI uključuje dva ugrađena agenta između kojih možeš prebacivati tasterom `Tab`.

- **build** - Podrazumijevani agent sa punim pristupom za razvoj
- **plan** - Agent samo za čitanje za analizu i istraživanje koda
  - Podrazumijevano zabranjuje izmjene datoteka
  - Traži dozvolu prije pokretanja bash komandi
  - Idealan za istraživanje nepoznatih codebase-ova ili planiranje izmjena

Uključen je i **general** pod-agent za složene pretrage i višekoračne zadatke.
Koristi se interno i može se pozvati pomoću `@general` u porukama.

Saznaj više o [agentima](https://rimurucode.vercel.app/docs/agents).

### Dokumentacija

Za više informacija o konfiguraciji Rimuru AI-a, [**pogledaj dokumentaciju**](https://rimurucode.vercel.app/docs).

### Doprinosi

Ako želiš doprinositi Rimuru AI-u, pročitaj [upute za doprinošenje](./CONTRIBUTING.md) prije slanja pull requesta.

### Gradnja na Rimuru AI-u

Ako radiš na projektu koji je povezan s Rimuru AI-om i koristi "rimuru-ai" kao dio naziva, npr. "rimuru-ai-dashboard" ili "rimuru-ai-mobile", dodaj napomenu u svoj README da projekat nije napravio Rimuru AI tim i da nije povezan s nama.

---

**Pridruži se našoj zajednici** [Discord](https://discord.gg/rimuru-ai) | [X.com](https://x.com/rimuru-ai)
