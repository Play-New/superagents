---
name: tailwind
description: |
  Tailwind CSS utility-first conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Tailwind CSS — Project Conventions

- Utility-first: compose classes directly, avoid custom CSS
- Mobile-first: base styles apply to all sizes, use `sm:`, `md:`, `lg:` for larger breakpoints
- Dark mode: use `dark:` prefix for dark theme variants
- Use `clsx` or `cn` utility for conditional class composition
- Use `@apply` sparingly — prefer component extraction over directive usage
- Arbitrary values only when design tokens don't cover the case: `w-[137px]`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `tailwind.config.ts` (or `.js`) for theme customization

## Integration
- Components: build reusable components instead of repeating long class strings
- Framework: works with React/Vue/Svelte — no framework-specific changes needed

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "tailwindcss" -> `mcp__context7__query-docs`
