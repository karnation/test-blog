# AI Agents in Scribere

This file documents how AI agents (like Antigravity) should interact with this repository and provides troubleshooting tips for common environment issues on Windows.

## Windows Setup & Troubleshooting

For a detailed breakdown of the setup process, technical hurdles, and comparisons to Mac/Linux environments, see the **[Windows Setup Guide](file:///c:/Users/kjh/Documents/personal/projects/test-blog/WINDOWS.md)**.

### 1. `gh` or `npm` command not found
Git Bash often needs a manual push to see new installations. 
- **Fix**: Open your `~/.bashrc` file (in your user home directory) and ensure the paths are added:
  ```bash
  export PATH="$PATH:/c/Program Files/nodejs:/c/Program Files/GitHub CLI"
  ```
- **Apply**: Run `source ~/.bashrc` in your terminal.

### 2. `npm start` fails with `spawn EINVAL`
The default engine script sometimes fails on Windows when spawning watchers.
- **Fix**: Use the custom local script I've provided:
  ```bash
  npm start  # This is mapped to 'node scripts/start-local.js'
  ```

### 3. `EADDRINUSE: address already in use 0.0.0.0:8000`
A background Node process is likely still holding onto the port.
- **Fix**: Kill all hanging Node processes:
  ```powershell
  # In Git Bash or PowerShell
  taskkill //F //IM node.exe
  ```

### 4. PowerShell Security Errors (`UnauthorizedAccess`)
Windows may block `npm` because it's a script.
- **Fix**: Run the command using `cmd /c` or call the Node script directly:
  ```bash
  cmd /c "npm install"
  # or
  node scripts/start-local.js
  ```

## AI Agent Specs
- Scribere engine docs live in `node_modules/scribere/docs/`.
- Always use `shell: true` when spawning processes on Windows.
- Prefer manual file copying over interactive `npx` commands in restricted environments.
