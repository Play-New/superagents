---
name: nestjs
description: |
  NestJS module, controller, and service conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# NestJS — Project Conventions

- Every feature gets its own module, controller, and service triad
- Register all providers in their module's `providers` array; export what other modules need
- Use `class-validator` + global `ValidationPipe` for DTO validation (whitelist + transform)
- Use Guards for auth, Pipes for validation, Interceptors for cross-cutting concerns
- Don't inject request-scoped providers into singleton providers
- Use `forRootAsync()` for dynamic module configuration with env vars
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `src/<feature>/` with `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/`

## Integration
- Database: inject repository/Prisma service into feature services
- Auth: `AuthGuard` + `@UseGuards()` on protected controllers

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Dev: `npm run start:dev`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "nestjs" -> `mcp__context7__query-docs`
