# SuperAgents transforms how developers set up Claude Code by generating context-aware configurations tailored to their specific project. Instead of generic prompts, each generated agent embodies proven software engineering principles from industry legends—Uncle Bob's Clean Code, Dan Abramov's React patterns, Martin Fowler's refactoring techniques, and Kent Beck's TDD methodology. The result: AI-assisted development that produces code matching the quality standards of expert engineers.

## Vision

SuperAgents is a CLI tool that bridges the gap between generic AI assistance and expert-level software development. By encoding the wisdom of industry legends into specialized agents, developers get AI-powered code review, writing, and debugging that adheres to time-tested principles. The vision is to make every developer's AI assistant as knowledgeable as having Uncle Bob, Dan Abramov, Martin Fowler, and Kent Beck reviewing their code.

**Type:** cli-tool
**Status:** New project
**Generated:** 1/29/2026, 3:10:27 PM

## What We're Building

SuperAgents generates context-aware Claude Code configurations that understand your specific codebase. Key objectives:

- **Intelligent Project Analysis**: Automatically detect project type, language, framework, and dependencies to generate relevant configurations
- **Expert-Backed Agents**: Each agent embodies proven methodologies from software engineering legends
- **Skill System**: Modular knowledge packages that can be loaded on-demand for specific technologies
- **Zero Configuration**: Works out of the box with sensible defaults while remaining fully customizable
- **Developer Experience**: Interactive CLI with clear prompts and helpful feedback

## Coding Principles

> Behavioral guidelines to reduce common LLM coding mistakes. These bias toward caution over speed - use judgment for trivial tasks.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Language | TypeScript | Type-safe JavaScript development |
| Runtime | Node.js | Server-side execution environment |
| AI Integration | @anthropic-ai/sdk | Claude API interaction |
| CLI Framework | Commander.js | Command-line argument parsing |
| CLI UX | @clack/prompts | Interactive terminal prompts |
| CLI UX | ora | Terminal spinners and loading states |
| Configuration | cosmiconfig | Config file discovery and loading |
| File System | fs-extra | Enhanced file operations |
| File Patterns | glob | File pattern matching |
| Archives | archiver, unzipper | ZIP file creation and extraction |

## Project Structure

```
pn-superagents/
├── src/
│   └── index.ts          # Main CLI entry point
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── CLAUDE.md            # This file
```

## Available Agents

Use `/agent <name>` to switch:
- **backend-engineer** - Building APIs, server logic, database operations, and system architecture following SOLID principles
- **docs-writer** - Creating clear documentation, README files, API docs, and technical guides
- **testing-specialist** - Writing unit tests, integration tests, and implementing TDD following Kent Beck's methodology
- **code-reviewer** - Reviewing PRs with Uncle Bob's Clean Code principles, identifying code smells and suggesting improvements
- **copywriter** - Crafting user-facing text, error messages, CLI output, and marketing copy
- **frontend-specialist** - Building UIs with Dan Abramov's React patterns, component architecture, and state management
- **debugger** - Systematic bug investigation, root cause analysis, and fix verification

## Available Skills

Use `Skill(name)` to load:
- **typescript** - TypeScript best practices, type patterns, generics, and strict mode guidelines
- **nodejs** - Node.js patterns, async/await, streams, error handling, and package management

## Quick Start

1. Switch agent: `/agent <name>`
2. Load skill: `Skill(name)`
3. Use Context7 for up-to-date docs

---
Generated by SuperAgents - Context-aware configuration for Claude Code