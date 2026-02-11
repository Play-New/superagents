---
name: express
description: |
  Express.js middleware and routing conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Express.js — Project Conventions

- Always call `next()` in middleware or send a response — never leave requests hanging
- Error middleware must have exactly 4 parameters `(err, req, res, _next)` and be registered last
- Organize routes by resource using `Router()` — mount with `app.use('/api/resource', router)`
- Validate all request inputs (use Zod middleware) before hitting business logic
- Use `helmet()` for security headers, `cors()` for cross-origin configuration
- Add `return` after sending a response in conditional branches
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `routes/` or `src/routes/` for route modules

## Integration
- Validation: Zod schemas as middleware before handlers
- Database: call ORM/DB layer from route handlers, never from middleware

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "express" -> `mcp__context7__query-docs`
