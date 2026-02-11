---
name: typescript
description: |
  TypeScript strict-mode conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# TypeScript — Project Conventions

- Strict mode always on: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- Use `type` keyword for type-only imports: `import type { Foo } from './types.js'`
- ESM with `.js` extensions in all import paths
- Prefix unused params with underscore: `(_unused, value) => value`
- Prefer interfaces for objects, union types for constrained strings
- Avoid `any` — use `unknown` for truly unknown types; never `// @ts-ignore`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}

## Integration
- Validation: Zod schemas infer TypeScript types at boundaries
- Testing: Vitest with full type checking

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Type check: `npx tsc --noEmit`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "typescript" -> `mcp__context7__query-docs`
