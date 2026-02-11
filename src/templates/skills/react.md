---
name: react
description: |
  React 18+ function component conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# React — Project Conventions

- Function components only with TypeScript props interfaces
- Hooks at top level — never call conditionally
- Clean up effects: always return cleanup function from `useEffect`
- Use `useCallback`/`useMemo` only when there is a measured perf need, not by default
- Keys on every list item (`v-for` / `.map()`)
- Avoid inline object/function props that break memoization
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}

## Integration
{{#if framework}}
- Framework: {{framework}} (check framework skill for routing/SSR conventions)
{{/if}}
- Styling: follow project's existing CSS approach (Tailwind / CSS modules / styled-components)
- State: prefer local state; lift to context only when truly shared

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "react" -> `mcp__context7__query-docs`
