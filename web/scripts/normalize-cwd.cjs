const fs = require("node:fs");
try {
  const realCwd = fs.realpathSync.native(process.cwd());
  if (realCwd !== process.cwd()) {
    process.chdir(realCwd);
  }
} catch {
  // Ignore if realpathSync.native is unavailable
}

require("../node_modules/next/dist/bin/next");
