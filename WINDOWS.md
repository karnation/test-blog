# Windows Setup Guide & Learnings

Setting up the Scribere blog engine on Windows is significantly different from the Mac/Linux experience due to how Windows handles environment variables, shell processes, and security policies. 

This guide documents what worked, what didn't, and the technical hurdles we cleared.

## Executive Summary: Mac vs. Windows

| Feature | Mac/Linux Behavior | Windows Behavior | Solution |
| :--- | :--- | :--- | :--- |
| **Path Persistence** | `.zshrc` or `.bash_profile` are standard and immediate. | PATH changes often require a restart or manual `.bashrc` updates in Git Bash. | Manual `~/.bashrc` exported paths. |
| **Process Spawning** | `spawn('command')` works for direct executables. | `spawn('npm')` fails because `npm` is a batch script (`.cmd`). | Use `shell: true` in `child_process.spawn`. |
| **Script Execution** | Shell scripts are first-class citizens. | PowerShell often blocks script execution by default (`UnauthorizedAccess`). | Use `cmd /c` or native `node` calls. |
| **Port Management** | Processes usually clean up after SIGINT. | Zombie background processes tend to hold onto ports (e.g., 8000). | `taskkill /F /IM node.exe`. |

---

## 1. Environment & Pathing

### What Didn't Work
- Installing Node.js and Git via `winget` and expecting them to be immediately available in an open Git Bash window. 
- Relying on the Windows System PATH alone (Git Bash caching often lags behind).

### What Worked
- Creating a `~/.bashrc` and `~/.bash_profile` specifically for Git Bash.
- Explicitly adding `/c/Program Files/nodejs` and `/c/Program Files/GitHub CLI` to the path within the Bash session.

---

## 2. The `npm start` Hurdles

### What Didn't Work
The default `node_modules/scribere/scripts/start.js` failed with `Error: spawn EINVAL`. This is because the engine tries to spawn `nodemon`, which on Windows is a `.cmd` file. Without `shell: true`, Node tries to execute the text of the batch file as a binary.

### What Worked
We created a custom `scripts/start-local.js` that:
1.  Detects the Windows platform.
2.  Uses `{ shell: true }` when spawning the long-running watcher process.
3.  Directly calls the `serve.js` script using `node`, bypassing the PowerShell execution policy.

---

## 3. GitHub CLI & Authentication

### What Worked
- **Installation**: `winget install GitHub.cli` worked perfectly.
- **Pathing**: Needed the same `.bashrc` treatment as Node.
- **Auth**: `gh auth login` via the browser is the most reliable way to handle the Git Credential Manager parity on Windows.

---

## 4. Prose Linter (Stylistic Differences)
The `prose-lint` tool is extremely strict by default (British/Australian spelling, active voice, no intensifiers). 

### What Worked
Creating `config/prose-lint.json`. The engine is designed to look for this file in the project root to override its internal defaults. This allowed us to:
- Disable the "question-mark" rule.
- Relax thresholds to allow for a more "casual" Windows-centric technical prose.

---

## Technical Recommendations for Windows
1.  **Always use Git Bash**: It provides the closest approximation to the engine's expected environment.
2.  **Use `taskkill`**: Keep a terminal command ready to clear hanging Node processes if you see `EADDRINUSE`.
3.  **Manual Initialization**: If `npx` hangs (likely due to interactive prompts failing in a sub-shell), clone the engine manually and copy the `example/` folder to `content/`.
