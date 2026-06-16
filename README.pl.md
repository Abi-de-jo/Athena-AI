<p align="center">
  <a href="https://rimurucode.vercel.app">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Rimuru AI logo">
    </picture>
  </a>
</p>
<p align="center">Otwartoźródłowy agent kodujący AI.</p>
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

### Instalacja

```bash
# YOLO
curl -fsSL https://rimurucode.vercel.app/install | bash

# Menedżery pakietów
npm i -g rimuru-ai@latest        # lub bun/pnpm/yarn
scoop install rimuru-ai             # Windows
choco install rimuru-ai             # Windows
brew install gowdaman/tap/rimuru-ai # macOS i Linux (zalecane, zawsze aktualne)
brew install rimuru-ai              # macOS i Linux (oficjalna formuła brew, wolniejsze aktualizacje)
sudo pacman -S rimuru-ai            # Arch Linux (Stabilne)
paru -S rimuru-ai-bin               # Arch Linux (Najnowsze z AUR)
mise use -g rimuru-ai               # Dowolny system
nix run nixpkgs#rimuru-ai           # lub github:gowdaman/rimuru-ai dla najnowszej gałęzi dev
```

> [!TIP]
> Przed instalacją usuń wersje starsze niż 0.1.x.

### Aplikacja desktopowa (BETA)

Rimuru AI jest także dostępny jako aplikacja desktopowa. Pobierz ją bezpośrednio ze strony [releases](https://github.com/gowdaman/rimuru-ai/releases) lub z [rimurucode.vercel.app/download](https://rimurucode.vercel.app/download).

| Platforma             | Pobieranie                         |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `rimuru-ai-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `rimuru-ai-desktop-mac-x64.dmg`     |
| Windows               | `rimuru-ai-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` lub AppImage        |

```bash
# macOS (Homebrew)
brew install --cask rimuru-ai-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/rimuru-ai-desktop
```

#### Katalog instalacji

Skrypt instalacyjny stosuje następujący priorytet wyboru ścieżki instalacji:

1. `$OPENCODE_INSTALL_DIR` - Własny katalog instalacji
2. `$XDG_BIN_DIR` - Ścieżka zgodna ze specyfikacją XDG Base Directory
3. `$HOME/bin` - Standardowy katalog binarny użytkownika (jeśli istnieje lub można go utworzyć)
4. `$HOME/.rimuru-ai/bin` - Domyślny fallback

```bash
# Przykłady
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://rimurucode.vercel.app/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://rimurucode.vercel.app/install | bash
```

### Agents

Rimuru AI zawiera dwóch wbudowanych agentów, między którymi możesz przełączać się klawiszem `Tab`.

- **build** - Domyślny agent z pełnym dostępem do pracy developerskiej
- **plan** - Agent tylko do odczytu do analizy i eksploracji kodu
  - Domyślnie odmawia edycji plików
  - Pyta o zgodę przed uruchomieniem komend bash
  - Idealny do poznawania nieznanych baz kodu lub planowania zmian

Dodatkowo jest subagent **general** do złożonych wyszukiwań i wieloetapowych zadań.
Jest używany wewnętrznie i można go wywołać w wiadomościach przez `@general`.

Dowiedz się więcej o [agents](https://rimurucode.vercel.app/docs/agents).

### Dokumentacja

Więcej informacji o konfiguracji Rimuru AI znajdziesz w [**dokumentacji**](https://rimurucode.vercel.app/docs).

### Współtworzenie

Jeśli chcesz współtworzyć Rimuru AI, przeczytaj [contributing docs](./CONTRIBUTING.md) przed wysłaniem pull requesta.

### Budowanie na Rimuru AI

Jeśli pracujesz nad projektem związanym z Rimuru AI i używasz "rimuru-ai" jako części nazwy (na przykład "rimuru-ai-dashboard" lub "rimuru-ai-mobile"), dodaj proszę notatkę do swojego README, aby wyjaśnić, że projekt nie jest tworzony przez zespół Rimuru AI i nie jest z nami w żaden sposób powiązany.

---

**Dołącz do naszej społeczności** [Discord](https://discord.gg/rimuru-ai) | [X.com](https://x.com/rimuru-ai)
