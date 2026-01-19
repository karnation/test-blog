"use strict";

const { spawn, spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const SCRIBERE_ROOT = path.join(ROOT, "node_modules", "scribere");
const devBuildScript = path.join(SCRIBERE_ROOT, "scripts", "dev-build.js");
const nodemonName = process.platform === "win32" ? "nodemon.cmd" : "nodemon";
const nodemonBin = path.join(ROOT, "node_modules", ".bin", nodemonName);

if (!fs.existsSync(nodemonBin)) {
  console.error("[dev] nodemon is missing. Run `npm install` first.");
  process.exit(1);
}

// 1. Initial build
spawnSync(process.execPath, [path.join(SCRIBERE_ROOT, "scripts", "dev-build.js")], {
  stdio: "inherit",
  cwd: ROOT,
});

// 2. Start local server
const server = spawn(process.execPath, [path.join(SCRIBERE_ROOT, "scripts", "serve.js")], {
  stdio: "inherit",
  cwd: ROOT,
});

console.log("[dev] watching for changes");

// 3. Start watcher (Fixed for Windows using shell: true)
const watcher = spawn(
  nodemonBin,
  [
    "--quiet",
    "--on-change-only",
    "--exitcrash",
    "--watch",
    "content",
    "--ext",
    "md,html,css,js,json,svg",
    devBuildScript,
  ],
  { 
    stdio: "inherit", 
    cwd: ROOT, 
    shell: process.platform === "win32" 
  }
);

process.on("SIGINT", () => {
  watcher.kill();
  server.kill();
  process.exit();
});
