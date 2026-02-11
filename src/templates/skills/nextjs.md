---
name: nextjs
description: |
  Next.js App Router conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Next.js — Project Conventions

- App Router: pages in `app/` directory, Server Components by default
- Add `'use client'` only for components that need hooks or event handlers
- `params` is a Promise in Next.js 15+ — always `await params`
- Use `next/image` for images, `next/link` for navigation
- Route Handlers in `app/api/*/route.ts` — export named HTTP methods
- Server Actions with `'use server'` for form mutations, call `revalidatePath` after writes
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `app/layout.tsx` (root layout), `app/page.tsx` (home), `app/api/` (API routes)

## Integration
- Data fetching in Server Components, interactive UI in Client Components
- Database/ORM calls go in Server Components or Server Actions, never in client code

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Dev: `npx next dev`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "nextjs" -> `mcp__context7__query-docs`
