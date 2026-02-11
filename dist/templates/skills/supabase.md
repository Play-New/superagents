---
name: supabase
description: |
  Supabase auth, database, storage, and realtime conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Supabase — Project Conventions

- Always type the client: `createClient<Database>(url, key)` with generated types
- Enable Row Level Security (RLS) on every table — no exceptions
- Use `SUPABASE_ANON_KEY` on client, `SUPABASE_SERVICE_ROLE_KEY` only on server (never expose)
- Use `.single()` when expecting exactly one row, handle null for optional relations
- Unsubscribe from realtime channels on component cleanup
- Generate types: `npx supabase gen types typescript --project-id <id> > types/database.ts`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `types/database.ts` (generated), `supabase/migrations/` (SQL migrations)

## Integration
- Auth: handle `onAuthStateChange` for session management
- Frontend: use typed Supabase client for queries; RLS policies handle authorization

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "supabase" -> `mcp__context7__query-docs`
