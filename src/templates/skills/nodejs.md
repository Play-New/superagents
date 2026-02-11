---
name: nodejs
description: |
  Node.js 20+ runtime conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Node.js — Project Conventions

- ESM modules with `.js` extensions in imports (`"type": "module"` in package.json)
- Use `fs/promises` for async file ops, `existsSync` only for sync checks
- Use `path.join()` for cross-platform paths
- Validate environment variables at startup, fail fast on missing required vars
- Never block the event loop with sync I/O in hot paths
- Handle `SIGTERM`/`SIGINT` for graceful shutdown in long-running processes
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}

## Integration
- Package manager: {{packageManager}}
- TypeScript compiled to ESM, run with `node dist/`

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "nodejs" -> `mcp__context7__query-docs`
