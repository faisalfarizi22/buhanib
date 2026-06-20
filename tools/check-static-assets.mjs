import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");
const scanExtensions = new Set([".html", ".js", ".css"]);
const assetRefPattern = /["'`(](\/(?:asset|icon|_next\/static|gallery|partner|evidence)\/[^"'`)<>\s]+)/g;

function walk(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(entryPath));
      continue;
    }

    if (scanExtensions.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

function publicAssetExists(ref) {
  const cleanRef = ref.split(/[?#]/)[0].slice(1);
  return existsSync(path.join(outDir, cleanRef)) || existsSync(path.join(publicDir, cleanRef));
}

if (!existsSync(outDir) || !statSync(outDir).isDirectory()) {
  console.error("Missing out/ directory. Run `npm run build` first.");
  process.exit(1);
}

const missing = new Map();

for (const file of walk(outDir)) {
  const text = readFileSync(file, "utf8");

  for (const match of text.matchAll(assetRefPattern)) {
    const ref = match[1];

    if (!publicAssetExists(ref)) {
      const relativeFile = path.relative(root, file);
      const files = missing.get(ref) ?? new Set();
      files.add(relativeFile);
      missing.set(ref, files);
    }
  }
}

if (missing.size > 0) {
  console.error("Missing static asset references:");
  for (const [ref, files] of [...missing.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.error(`- ${ref}`);
    for (const file of [...files].sort().slice(0, 4)) {
      console.error(`  used by ${file}`);
    }
  }
  process.exit(1);
}

console.log("Static asset references are valid.");
