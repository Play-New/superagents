---
name: fastapi
description: |
  FastAPI endpoint and Pydantic model conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# FastAPI — Project Conventions

- Use Pydantic v2 models for all request/response schemas (`model_validate()`, NOT `parse_obj()`)
- Use `Annotated[type, Depends()]` for dependency injection — cleaner than positional args
- Use `async def` for I/O endpoints, `def` for CPU-bound handlers
- Always set `response_model` to control output schema
- Organize with `APIRouter` per resource: `router = APIRouter(prefix="/users", tags=["users"])`
- Add `lifespan` context for startup/shutdown events (DB connections, etc.)
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- `main.py` (entry), `routers/` (endpoints), `models/` (Pydantic schemas)

## Integration
- Validation: Pydantic handles request validation automatically
- Docs: auto-generated at `/docs` (Swagger) and `/redoc`

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
- Dev: `uvicorn main:app --reload`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "fastapi" -> `mcp__context7__query-docs`
