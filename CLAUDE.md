# SuperAgents

Goal-aware Claude Code configuration generator that asks "What are you building?" to create customized configurations (agents, skills, hooks) tailored to both your existing codebase AND your project goals.

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Runtime | Node.js | 20+ | ESM modules, modern async/await |
| Language | TypeScript | 5.x | Strict mode with additional checks |
| CLI Framework | Commander.js | 12.x | Command parsing and CLI structure |
| Interactive UI | @clack/prompts | 0.7.x | Beautiful terminal prompts and selections |
| Progress | ora | 8.x | Terminal spinners and progress indicators |
| Colors | picocolors | 1.x | Terminal text coloring |
| AI Integration | Anthropic SDK | 0.30.x | Claude API for intelligent generation |
| File Operations | fs-extra | 11.x | Enhanced filesystem utilities |
| Validation | Zod | 3.x | Runtime schema validation |
| Testing | Vitest | 4.x | Unit and integration tests |

## Quick Start

```bash
# Prerequisites: Node.js 20+

# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Build
npm run build

# Run locally
npm start

# Type check
npm run type-check

# Lint
npm run lint

# Run tests
npm test
```

## Project Structure

```
superagents/
├── src/
│   ├── index.ts              # CLI entry point and workflow orchestration
│   ├── cli/
│   │   ├── banner.ts         # ASCII art, displaySuccess(), displayError()
│   │   ├── prompts.ts        # collectProjectGoal(), selectModel(), confirmSelections()
│   │   └── progress.ts       # ProgressIndicator class, withProgress() utility
│   ├── config/
│   │   └── presets.ts        # GOAL_PRESETS for all 9 project types
│   └── types/
│       ├── goal.ts           # ProjectGoal, GoalCategory, GoalPreset, TechRequirement
│       ├── codebase.ts       # CodebaseAnalysis, ProjectType, Framework, Pattern
│       ├── generation.ts     # GenerationContext, GeneratedOutputs, WriteSummary
│       └── config.ts         # AgentDefinition, SkillDefinition, Recommendations
├── bin/
│   └── superagents           # Executable entry point (imports dist/index.js)
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

### Implementation Status

| Module | Status | Location |
|--------|--------|----------|
| CLI Interface | Complete | `src/cli/` |
| Type System | Complete | `src/types/` |
| Goal Presets | Complete | `src/config/presets.ts` |
| Entry Point | Skeleton | `src/index.ts` |
| Codebase Analyzer | Planned | `src/analyzer/` |
| Goal Analyzer | Planned | `src/analyzer/` |
| Recommendation Engine | Planned | `src/context/` |
| AI Generator | Planned | `src/generator/` |
| Output Writer | Planned | `src/writer/` |

## Architecture Overview

SuperAgents uses a goal-first approach that differentiates it from traditional codebase analyzers:

```
1. Collect Goal     -> "What are you building?"
2. Select Model     -> Claude Sonnet 4.5 or Opus 4.5
3. Analyze Codebase -> Detect frameworks, patterns (TODO)
4. Recommendations  -> Merge goal + codebase insights (TODO)
5. User Confirms    -> Select agents and skills
6. AI Generation    -> Claude creates custom configs (TODO)
7. Write Output     -> .claude/ folder created (TODO)
```

### Key Modules

| Module | Location | Purpose |
|--------|----------|---------|
| Banner | `src/cli/banner.ts:29-31` | `displayBanner()` shows ASCII art |
| Banner | `src/cli/banner.ts:34-75` | `displaySuccess()` shows completion summary |
| Prompts | `src/cli/prompts.ts:10-53` | `collectProjectGoal()` with category detection |
| Prompts | `src/cli/prompts.ts:55-79` | `selectModel()` for AI model choice |
| Prompts | `src/cli/prompts.ts:81-135` | `confirmSelections()` for agent/skill selection |
| Progress | `src/cli/progress.ts:8-51` | `ProgressIndicator` class wrapping ora |
| Progress | `src/cli/progress.ts:53-69` | `withProgress()` async helper |
| Presets | `src/config/presets.ts:7-256` | `GOAL_PRESETS` for 9 goal categories |

## Development Guidelines

### File Naming
- Source files: `kebab-case.ts` (e.g., `goal-analyzer.ts`, `codebase.ts`)
- Type files grouped in `types/` directory
- Config files grouped in `config/` directory
- Executable uses the package name directly (`superagents`)

### Code Naming
- Interfaces/Types: `PascalCase` (e.g., `ProjectGoal`, `CodebaseAnalysis`)
- Functions: `camelCase` (e.g., `collectProjectGoal`, `displayBanner`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `GOAL_PRESETS`, `BANNER`)
- Type unions: `kebab-case` string literals (e.g., `'saas-dashboard' | 'ecommerce'`)
- Private fields: Not used (prefer explicit naming)

### Import Order
```typescript
// 1. External packages
import { Command } from 'commander';
import * as p from '@clack/prompts';
import pc from 'picocolors';

// 2. Internal types (with type keyword)
import type { ProjectGoal, GoalCategory } from '../types/goal.js';
import type { Recommendations } from '../types/config.js';

// 3. Internal modules
import { displayBanner } from './cli/banner.js';

// Note: .js extension required for ESM imports
```

### TypeScript Configuration
- Strict mode enabled with additional checks:
  - `noUnusedLocals`, `noUnusedParameters`
  - `noImplicitReturns`, `noFallthroughCasesInSwitch`
- Module: NodeNext (ESM)
- Target: ES2022
- Path alias: `@/*` maps to `./src/*` (defined but not currently used)

### ESLint Rules
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/no-unused-vars`: error (allows `_` prefix)
- `no-console`: off (CLI tool uses console extensively)

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start in watch mode with tsx |
| `npm run build` | Compile TypeScript to dist/ |
| `npm start` | Run compiled version |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run type-check` | TypeScript check without emit |
| `npm run lint` | ESLint on src/ |
| `npm run clean` | Remove dist/ |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes (for generation) | Claude API key for AI generation |

Create `.env` file for local development (excluded by .gitignore).

## Key Types

### GoalCategory
```typescript
type GoalCategory =
  | 'saas-dashboard'    // Analytics, metrics, admin panels
  | 'ecommerce'         // Online stores, marketplaces
  | 'content-platform'  // Blogs, CMS, publishing
  | 'api-service'       // REST/GraphQL APIs, microservices
  | 'mobile-app'        // iOS, Android, React Native
  | 'cli-tool'          // Command-line utilities
  | 'data-pipeline'     // ETL, data processing
  | 'auth-service'      // Authentication, user management
  | 'custom';           // Anything else
```

### ProjectGoal (src/types/goal.ts)
```typescript
interface ProjectGoal {
  description: string;                    // User's input
  category: GoalCategory;                 // Detected/selected type
  technicalRequirements: TechRequirement[];
  suggestedAgents: AgentSuggestion[];
  suggestedSkills: SkillSuggestion[];
  timestamp: string;
  confidence: number;                     // 0-1
}
```

### GenerationContext (src/types/generation.ts)
```typescript
interface GenerationContext {
  goal: ProjectGoal;
  codebase: CodebaseAnalysis;
  selectedAgents: string[];
  selectedSkills: string[];
  selectedModel: 'opus' | 'sonnet';
  sampledFiles: SampledFile[];
  generatedAt: string;
}
```

### GOAL_PRESETS (src/config/presets.ts)
Each goal category has:
- `recommendedAgents`: Array of { name, priority (1-10), reason }
- `recommendedSkills`: Array of { name, priority (1-10), reason }
- `technicalRequirements`: Array of { category, description, priority, suggestedTechnologies }

## Generated Output Structure

When complete, SuperAgents generates:

```
.claude/
├── CLAUDE.md              # Project overview + goals
├── settings.json          # Claude Code configuration
├── skills/                # Tech-specific knowledge (.md files)
│   ├── nextjs.md
│   ├── typescript.md
│   └── ...
├── agents/                # Specialized sub-agents (.md files)
│   ├── frontend-engineer.md
│   ├── backend-engineer.md
│   └── ...
└── hooks/
    └── skill-loader.sh    # Auto-loads relevant skills
```

## Critical Rules

1. **NEVER** log API keys or sensitive data
2. **ALWAYS** respect .gitignore when sampling files
3. **ALWAYS** validate AI-generated content before writing
4. **NEVER** send entire codebases to Claude API (sample smartly)
5. **ALWAYS** provide progress feedback for operations >2 seconds
6. **NEVER** overwrite existing .claude/ without confirmation
7. **ALWAYS** use TypeScript strict mode
8. **NEVER** execute generated code automatically

## Error Handling Pattern

```typescript
// Use user-friendly errors with suggestions
throw new UserFacingError(
  'No project found',
  'Run superagents in a directory with package.json or similar project file.'
);
```

Current implementation uses standard try-catch with `displayError()` in `src/index.ts:82-88`.

## Performance Targets

- Initial analysis: <5 seconds
- AI generation per agent: <10 seconds
- Total workflow: <60 seconds for typical project

## Development Principles

1. **User-Centric Design**
   - Every prompt should be clear and actionable
   - Progress indicators for long operations
   - Helpful error messages with suggestions

2. **AI-First Architecture**
   - Use Claude to generate project-specific content
   - Avoid generic templates
   - Context-rich prompts for better output

3. **Privacy & Security**
   - Never send secrets to API (.env files excluded)
   - Respect .gitignore patterns
   - Local-first processing

4. **Extensibility**
   - Plugin system for custom detectors (planned)
   - Template overrides (planned)
   - Community skill library (future)

## Testing

Test files use `*.test.ts` suffix and are run with Vitest:
```bash
npm test           # Run once
npm run test:watch # Watch mode
```

Test fixtures should be placed in a `tests/fixtures/` directory (to be created).

## Additional Resources

- @Architecture.md - Complete technical architecture (system design, data flow, AI prompts)
- @README.md - User-facing documentation
- @GETTING_STARTED.md - Implementation roadmap with phases
- @PROJECT_SUMMARY.md - Project overview and current status


## Skill Usage Guide

When working on tasks involving these technologies, invoke the corresponding skill:

| Skill | Invoke When |
|-------|-------------|
| ora | Displays terminal spinners, progress indicators, and loading states |
| commander | Builds CLI applications with command parsing and argument handling |
| clack-prompts | Creates beautiful terminal prompts, selections, and interactive user input |
| typescript | Enforces TypeScript strict mode, type safety, and compiler configuration |
| nodejs | Manages Node.js runtime, ESM modules, and async/await patterns |
| picocolors | Applies terminal text coloring and formatting for CLI output |
| anthropic | Integrates Claude API for AI-powered text generation and analysis |
| fs-extra | Performs enhanced file system operations and directory management |
| zod | Validates runtime data schemas and provides type safety |
| vitest | Runs unit and integration tests with fast iteration and coverage |
