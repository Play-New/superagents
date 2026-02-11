---
name: angular
description: |
  Angular 17+ standalone component conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Angular — Project Conventions

- Standalone components by default — avoid NgModules for new code
- Use signals (`signal()`, `computed()`) for state, NOT zone-based change detection
- Use `inject()` function over constructor injection
- Use `input.required<T>()` and `output<T>()` for component I/O
- Always use `track` in `@for` loops (required in Angular 17+)
- Avoid `subscribe()` — use `async` pipe or `toSignal()` instead
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `src/app/` for components, `src/app/services/` for injectable services

## Integration
- Forms: Reactive Forms with `FormBuilder` and `Validators`
- HTTP: `HttpClient` via `inject()`, return Observables from services

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Dev: `ng serve`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "angular" -> `mcp__context7__query-docs`
