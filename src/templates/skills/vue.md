---
name: vue
description: |
  Vue 3 Composition API conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Vue.js — Project Conventions

- Composition API with `<script setup lang="ts">` — no Options API in new code
- Use `ref` for primitives, `reactive` for objects; never destructure reactive objects (loses reactivity)
- Access refs with `.value` in script, auto-unwrapped in templates
- Define props with `defineProps<Props>()` and emits with `defineEmits<Events>()`
- Always use `:key` with `v-for`
- Extract reusable logic into composables (`use*.ts` files)
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `composables/` for shared composables, `stores/` for Pinia stores

## Integration
- State: Pinia stores with Composition API style (`defineStore` + `ref`/`computed`)
- Routing: Vue Router with typed route params

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "vue" -> `mcp__context7__query-docs`
