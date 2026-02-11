---
name: mcp
description: |
  Model Context Protocol server conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# MCP — Project Conventions

- Tools: single-responsibility, descriptive names, clear input schemas with descriptions
- Always validate tool inputs before execution
- Return structured errors with `isError: true` — never expose internal details
- Python: use FastMCP with Pydantic models for input validation
- TypeScript: use `@modelcontextprotocol/sdk` with stdio transport
- Keep tools focused — one action per tool, not multi-step workflows
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- Server entry: `server.py` (Python) or `src/index.ts` (TypeScript)

## Integration
- Claude Desktop: configure in `claude_desktop_config.json` under `mcpServers`
- Environment: pass secrets via `env` in config, never hardcode

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "model context protocol" -> `mcp__context7__query-docs`
