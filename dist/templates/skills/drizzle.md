---
name: drizzle
description: |
  Drizzle ORM conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Drizzle ORM — Project Conventions

- Schema defined in TypeScript (`db/schema.ts`) — NOT in SQL files
- Use `$inferSelect` and `$inferInsert` for type inference from schema
- Run `npx drizzle-kit generate` after schema changes, then `npx drizzle-kit migrate`
- Use `db.transaction()` for multi-table operations that must be atomic
- SQL-like API (`select().from().where()`) for complex queries, relational API for simple reads
- Handle null values explicitly in schema definitions
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `db/schema.ts`, `drizzle.config.ts`, `drizzle/` (migrations)

## Integration
- TypeScript: types inferred directly from schema — no code generation step
- Config: `drizzle.config.ts` with `satisfies Config` for type safety

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Studio: `npx drizzle-kit studio`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "drizzle-orm" -> `mcp__context7__query-docs`
