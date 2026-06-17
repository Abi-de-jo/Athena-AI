const fs = require("fs");
const root = JSON.parse(fs.readFileSync("package.json", "utf8"));
const catalog = root.workspaces?.catalog || {};

const vendorPackages = [
  "effect-drizzle-sqlite",
  "effect-sqlite-node",
  "sdk",
  "script",
  "llm",
  "core",
  "plugin",
  "ui",
  "server",
  "tui",
];

const srcDirs = {
  "effect-drizzle-sqlite": "packages/effect-drizzle-sqlite",
  "effect-sqlite-node": "packages/effect-sqlite-node",
  sdk: "packages/sdk/js",
  script: "packages/script",
  llm: "packages/llm",
  core: "packages/core",
  plugin: "packages/plugin",
  ui: "packages/ui",
  server: "packages/server",
  tui: "packages/tui",
};

const rimuruDir = "packages/rimuru";
const vendorDir = rimuruDir + "/vendor";
fs.rmSync(vendorDir, { recursive: true, force: true });

// Copy sub-packages into vendor/
for (const vendir of vendorPackages) {
  const target = vendorDir + "/" + vendir;
  fs.cpSync(srcDirs[vendir], target, {
    recursive: true,
    filter: (src) =>
      !src.includes("node_modules") &&
      !src.includes(".turbo") &&
      !src.includes("/dist/") &&
      !src.endsWith(".test.ts"),
  });
  console.log("Copied: vendor/" + vendir);
}

// Resolve catalog refs in vendored packages; strip workspace:* deps
for (const vendir of vendorPackages) {
  const path = vendorDir + "/" + vendir + "/package.json";
  const pkg = JSON.parse(fs.readFileSync(path, "utf8"));
  delete pkg.overrides;
  ["dependencies", "devDependencies", "peerDependencies"].forEach((section) => {
    if (!pkg[section]) return;
    const cleaned = {};
    Object.keys(pkg[section]).forEach((key) => {
      if (pkg[section][key] === "catalog:" && catalog[key]) {
        cleaned[key] = catalog[key];
      } else if (pkg[section][key] !== "workspace:*") {
        cleaned[key] = pkg[section][key];
      }
    });
    pkg[section] = Object.keys(cleaned).length > 0 ? cleaned : undefined;
  });
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
}

// Update rimuru-ai package.json
const rimuruPkg = JSON.parse(
  fs.readFileSync(rimuruDir + "/package.json", "utf8")
);
delete rimuruPkg.overrides;

// Add vendor/ to files
if (!rimuruPkg.files.includes("vendor/")) rimuruPkg.files.push("vendor/");

// Strip ALL @rimurucode-ai/* workspace deps
["dependencies", "devDependencies"].forEach((section) => {
  if (!rimuruPkg[section]) return;
  Object.keys(rimuruPkg[section]).forEach((key) => {
    if (key.startsWith("@rimurucode-ai/")) {
      delete rimuruPkg[section][key];
      console.log("Stripped dep: " + key);
    } else if (rimuruPkg[section][key] === "catalog:" && catalog[key]) {
      rimuruPkg[section][key] = catalog[key];
    }
  });
  if (Object.keys(rimuruPkg[section]).length === 0)
    delete rimuruPkg[section];
});

// Add install script: create node_modules/@rimurucode-ai/* -> vendor/* symlinks
rimuruPkg.scripts = rimuruPkg.scripts || {};
rimuruPkg.scripts.install =
  'node -e "const{existsSync,mkdirSync,symlinkSync}=require(\'fs\');' +
  "const vp=['effect-drizzle-sqlite','effect-sqlite-node','sdk','script','llm','core','plugin','ui','server','tui'];" +
  "const nm='node_modules/@rimurucode-ai';" +
  "if(!existsSync(nm))mkdirSync(nm,{recursive:true});" +
  "vp.forEach(d=>{const t=nm+'/'+d;if(!existsSync(t))symlinkSync('../../vendor/'+d,t,'dir')})" +
  '"';

fs.writeFileSync(
  rimuruDir + "/package.json",
  JSON.stringify(rimuruPkg, null, 2) + "\n"
);
console.log("package.json ready with install hook");
