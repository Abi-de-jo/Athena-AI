#!/bin/bash
# publish-all.sh — Publish ALL @rimuru-ai/* sub-packages + rimuru-ai to npm.
#
# Resolves both catalog: and workspace:* references, publishes in
# dependency order (leaf first → root last).
#
# Usage: ./publish-all.sh [--dry-run]
#   --dry-run  Only show what would be published, don't actually publish.

set -euo pipefail
cd "$(dirname "$0")"

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "*** DRY RUN — no packages will be published ***"
fi

# ── 1. Read root catalog ──────────────────────────────────────────────
ROOT_PKG="package.json"
if [[ ! -f "$ROOT_PKG" ]]; then
  echo "ERROR: Run from repo root (package.json not found)"
  exit 1
fi

# Extract catalog as JSON
CATALOG=$(node -e "
  const p = JSON.parse(require('fs').readFileSync('$ROOT_PKG','utf8'));
  console.log(JSON.stringify(p.workspaces?.catalog || {}));
")

echo "=== Catalog loaded with $(echo "$CATALOG" | node -e "const c=JSON.parse(require('fs').readFileSync(0,'utf8'));console.log(Object.keys(c).length)") entries ==="

# ── 2. Define publish order (leaves first, roots last) ────────────────
# Each entry: "dir" package-name
PUBLISH_ORDER=(
  "packages/effect-drizzle-sqlite" "@rimuru-ai/effect-drizzle-sqlite"
  "packages/effect-sqlite-node"    "@rimuru-ai/effect-sqlite-node"
  "packages/sdk/js"                "@rimuru-ai/sdk"
  "packages/script"                "@rimuru-ai/script"
  "packages/llm"                   "@rimuru-ai/llm"
  "packages/core"                  "@rimuru-ai/core"
  "packages/plugin"                "@rimuru-ai/plugin"
  "packages/ui"                    "@rimuru-ai/ui"
  "packages/server"                "@rimuru-ai/server"
  "packages/tui"                   "@rimuru-ai/tui"
  "packages/rimuru"                "rimuru-ai"
)

# ── 3. Pre-build workspace version map ────────────────────────────────
# Maps package names to their local versions
declare -A WS_VERSIONS
WS_VERSIONS=()
for ((i=0; i<${#PUBLISH_ORDER[@]}; i+=2)); do
  dir="${PUBLISH_ORDER[$i]}"
  name="${PUBLISH_ORDER[$((i+1))]}"
  ver=$(node -e "
    const p = JSON.parse(require('fs').readFileSync('$dir/package.json','utf8'));
    console.log(p.version || '1.17.7');
  ")
  WS_VERSIONS["$name"]="$ver"
done

echo ""
echo "=== Workspace package versions ==="
for name in "${!WS_VERSIONS[@]}"; do
  echo "  $name -> ${WS_VERSIONS[$name]}"
done
echo ""

# ── 4. Publish each package ────────────────────────────────────────────
for ((i=0; i<${#PUBLISH_ORDER[@]}; i+=2)); do
  dir="${PUBLISH_ORDER[$i]}"
  name="${PUBLISH_ORDER[$((i+1))]}"
  pkgfile="$dir/package.json"
  bakfile="$dir/package.json.bak"

  echo ""
  echo "═══ [$((i/2+1))/${#PUBLISH_ORDER[@]}] Processing $name ($dir) ═══"

  # Backup original
  cp "$pkgfile" "$bakfile"

  # Resolve catalog: refs and workspace:* refs
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$pkgfile', 'utf8'));
    const catalog = $CATALOG;

    // Resolve catalog: references
    ['dependencies','devDependencies','peerDependencies','overrides'].forEach(section => {
      if (!pkg[section]) return;
      Object.keys(pkg[section]).forEach(key => {
        if (pkg[section][key] === 'catalog:' && catalog[key]) {
          pkg[section][key] = catalog[key];
        }
      });
    });

    // Resolve workspace:* references
    const wsVersions = $(node -e "
      const m = {};
      $(for name in "${!WS_VERSIONS[@]}"; do
        echo "m['$name'] = '${WS_VERSIONS[$name]}';"
      done)
      console.log(JSON.stringify(m));
    ");
    ['dependencies','devDependencies','peerDependencies'].forEach(section => {
      if (!pkg[section]) return;
      Object.keys(pkg[section]).forEach(key => {
        if (pkg[section][key] === 'workspace:*' && wsVersions[key]) {
          pkg[section][key] = '^' + wsVersions[key];
        }
      });
    });

    fs.writeFileSync('$pkgfile', JSON.stringify(pkg, null, 2) + '\n');
    console.log('  Resolved: catalog refs + workspace refs');
  " || { echo "FAILED to resolve $name"; cp "$bakfile" "$pkgfile"; exit 1; }

  if $DRY_RUN; then
    echo "  [DRY RUN] Would publish $name"
    echo "  Resolved deps:"
    node -e "
      const pkg = JSON.parse(require('fs').readFileSync('$pkgfile', 'utf8'));
      const deps = pkg.dependencies || {};
      Object.entries(deps).forEach(([k,v]) => console.log('    ' + k + '@' + v));
    "
  else
    echo "  Publishing $name..."

    # Check if already published
    PUB_VER=$(node -e "
      const pkg = JSON.parse(require('fs').readFileSync('$pkgfile', 'utf8'));
      console.log(pkg.version || '1.17.7');
    ")
    if npm view "$name@$PUB_VER" version &>/dev/null; then
      echo "  Already published $name@$PUB_VER — skipping"
    else
      (cd "$dir" && npm publish --access public) && echo "  ✓ Published $name" || {
        echo "  ✗ FAILED to publish $name"
        cp "$bakfile" "$pkgfile"
        exit 1
      }
    fi
  fi

  # Restore original
  cp "$bakfile" "$pkgfile"
  rm "$bakfile"
done

echo ""
echo "============================================"
if $DRY_RUN; then
  echo "DRY RUN complete. No packages were published."
else
  echo "ALL PACKAGES PUBLISHED SUCCESSFULLY!"
fi
echo "============================================"
