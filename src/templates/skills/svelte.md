---
name: svelte
description: |
  Svelte 5 runes and SvelteKit conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Svelte — Project Conventions

- Svelte 5 runes only: `$state`, `$derived`, `$effect`, `$props` — no legacy `$:` syntax
- Use `$derived` for computed values, NOT `$effect` (effects are for side effects only)
- Use `.svelte.ts` extension for files that use runes outside components
- SvelteKit: load data in `+page.server.ts` load functions, mutations via form actions
- Form actions work without JS (progressive enhancement) — use `use:enhance` for SPA behavior
- Props: `let { prop }: Props = $props()` with TypeScript interface
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `src/routes/` (pages), `src/lib/` (shared code), `src/lib/stores/` (state)

## Integration
- State: class-based stores in `.svelte.ts` files with `$state` and `$derived`
- Data: server load functions for SSR, form actions for mutations

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Dev: `npm run dev`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "svelte" -> `mcp__context7__query-docs`
