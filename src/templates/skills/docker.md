---
name: docker
description: |
  Docker containerization conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Docker — Project Conventions

- Use multi-stage builds: build stage for compilation, production stage with minimal image
- Use specific image tags (`node:20-alpine`), never `latest`
- Run as non-root user (`USER node` or custom user) in production
- Order Dockerfile instructions for cache efficiency: package files first, then source
- Always include `.dockerignore` (node_modules, .git, .env, dist)
- Add `HEALTHCHECK` for orchestration readiness
- Use `dumb-init` or `tini` for proper signal handling as PID 1
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `Dockerfile`, `docker-compose.yml`, `.dockerignore`

## Integration
- Environment: inject secrets via env vars at runtime, never bake into image
- Compose: use `depends_on` with health checks for service ordering

## Commands
- Build: `docker build -t {{goal}} .`
- Up: `docker compose up -d`
- Logs: `docker compose logs -f`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "docker" -> `mcp__context7__query-docs`
