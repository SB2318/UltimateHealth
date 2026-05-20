#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const testPattern = /\.(test|spec)\.[jt]sx?$/;
const ignoredDirs = new Set([
  ".expo",
  ".git",
  "android",
  "ios",
  "node_modules",
]);

function hasTestFile(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (hasTestFile(fullPath)) {
        return true;
      }
      continue;
    }

    if (entry.isFile() && testPattern.test(entry.name)) {
      return true;
    }
  }

  return false;
}

const jestBin = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "jest.cmd" : "jest");

if (fs.existsSync(jestBin)) {
  const result = spawnSync(jestBin, ["--passWithNoTests", "--ci"], {
    cwd: root,
    stdio: "inherit",
  });
  process.exit(result.status ?? 1);
}

if (hasTestFile(root)) {
  console.error("Test files were found, but Jest is not installed.");
  process.exit(1);
}

console.log("No app test files found; skipping Jest run.");
