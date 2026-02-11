---
name: python
description: |
  Python 3.10+ conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Python — Project Conventions

- Python 3.10+ with modern type hints (`str | int`, `list[str]`, `dict[str, Any]`)
- Always use virtual environments — never install globally
- Use `pathlib.Path` instead of string paths
- No mutable default arguments (`def foo(items=[])` is a bug)
- Handle exceptions specifically — never bare `except:`
- Use `async def` for I/O-bound, regular `def` for CPU-bound
- Prefer f-strings over `.format()` or `%`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `pyproject.toml` for packaging, `requirements.txt` for dependencies

## Integration
- Type checking: `mypy --strict` for full type safety
- Linting: ruff for fast linting and formatting

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Type check: `mypy .`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "python" -> `mcp__context7__query-docs`
