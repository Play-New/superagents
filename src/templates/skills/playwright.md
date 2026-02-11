---
name: playwright
description: |
  Playwright E2E testing conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Playwright — Project Conventions

- Prefer semantic locators: `getByRole`, `getByLabel`, `getByText` — NOT CSS selectors
- Never use `page.waitForTimeout()` — rely on auto-waiting and `expect` assertions
- Tests must be independent and parallelizable — no shared state between tests
- Use Page Object Model for reusable page interactions
- Use `storageState` for reusing authenticated sessions across tests
- Mock APIs with `page.route()` when testing UI in isolation
- Enable traces on CI: `trace: 'on-first-retry'` for debugging failures
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `tests/` or `e2e/` for test files, `pages/` for Page Objects

## Integration
- Auth: shared `storageState` fixture for authenticated tests
- CI: run with `npx playwright test` in headless mode

## Commands
- Test: `npx playwright test`
- UI mode: `npx playwright test --ui`
- Report: `npx playwright show-report`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "playwright" -> `mcp__context7__query-docs`
