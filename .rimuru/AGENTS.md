# Global OpenCode Rules

## Shell Strategy (Windows / Non-Interactive)
This environment is strictly non-interactive - no TTY/PTY available.

- Always use non-interactive flags: `-y` (npm/apt), `--no-edit` (git merge), `--no-input` (pip)
- Use `-m "message"` for git commits, never bare `git commit`
- Prefer OpenCode's native Read/Write/Edit tools over shell-based file manipulation
- Never use interactive editors (vim, nano, less, more) or REPLs (python without `-c`)
- Use `-f` for rm, `-o` for unzip, `BatchMode=yes` for ssh
- On Windows PowerShell: use `cmd1; if ($?) { cmd2 }` to chain dependent commands
- Use `& "path/to/exe" args` for executables with spaces in path

## Shared Development Conventions

### Before Making Changes
- Briefly outline the plan before implementing multi-file changes
- Flag security-sensitive changes (auth, permissions, data exposure) explicitly
- For any destructive operations, show the command/migration and ask before executing

### Code Quality
- Write or update tests for new/modified code
- Use existing utility functions before creating new ones
- Don't introduce new dependencies without flagging it first
- Keep changes scoped - if a task is narrow (pure UI tweak, query opt), don't touch other layers

### Safety
- Never hardcode secrets, API keys, or credentials
- For infra/system changes: prefer plan/dry-run first, always summarize rollback path
- For database: prefer reversible migrations; never run DROP/TRUNCATE without confirmation
