---
name: vitest
description: |
  Vitest testing conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Vitest — Project Conventions

- Test files: `*.test.ts` or `*.spec.ts` colocated with source or in `tests/`
- Clear mocks between tests: `beforeEach(() => vi.clearAllMocks())`
- Mock modules with `vi.mock('./module')` — restore with `mockRestore()`
- Use `vi.useFakeTimers()` / `vi.useRealTimers()` in `beforeEach`/`afterEach` for time-dependent tests
- Prefer `toStrictEqual` for exact object matching, `toMatchObject` for partial
- Async: `await expect(promise).resolves.toBe(x)` or `.rejects.toThrow()`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `vitest.config.ts` for configuration, `test/setup.ts` for global setup

## Integration
- TypeScript: tests run with full type checking
- Coverage: `vitest --coverage` with v8 provider

## Commands
- Test: `{{testCommand}}`
- Watch: `npx vitest --watch`
- Coverage: `npx vitest --coverage`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "vitest" -> `mcp__context7__query-docs`
