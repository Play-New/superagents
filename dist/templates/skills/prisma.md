---
name: prisma
description: |
  Prisma ORM conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Prisma — Project Conventions

- Schema in `prisma/schema.prisma` — single source of truth for database structure
- Run `npx prisma generate` after every schema change
- Use `npx prisma migrate dev --name <description>` for migrations, `npx prisma db push` only for prototyping
- Use `select` over `include` when you need specific fields (avoid over-fetching)
- Wrap multi-model writes in `prisma.$transaction()`
- Never expose raw Prisma client responses directly to API — map to DTOs
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `prisma/schema.prisma`, `prisma/migrations/`

## Integration
- TypeScript: Prisma Client auto-generates types from schema
- API layer: validate input with Zod before passing to Prisma queries

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Studio: `npx prisma studio`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "prisma" -> `mcp__context7__query-docs`
