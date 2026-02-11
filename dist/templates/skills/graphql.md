---
name: graphql
description: |
  GraphQL schema, resolver, and client conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# GraphQL — Project Conventions

- Schema-first: define types, queries, mutations in `.graphql` files
- Use DataLoader for all relation resolvers to prevent N+1 queries
- Validate mutation inputs with Zod/class-validator before database calls
- Implement cursor-based pagination (Relay Connection spec) for list fields
- Use proper GraphQL error extensions (`code`, `details`) — not generic messages
- Limit query depth and complexity to prevent abuse
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `schema/` for `.graphql` files, `resolvers/` for resolver modules

## Integration
- Database: resolvers call ORM layer, never raw SQL
- Auth: validate user context in resolvers, not in schema directives

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "graphql" -> `mcp__context7__query-docs`
