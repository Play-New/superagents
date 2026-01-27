# SuperAgents

Context-aware Claude Code configuration generator that asks "What are you building?" to create customized configurations (agents, skills, hooks) tailored to both your existing codebase AND your project goals.

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
# Install globally via curl
curl -fsSL https://raw.githubusercontent.com/rinaldofesta/superagents/main/install.sh | bash

# Or clone and build locally
git clone https://github.com/rinaldofesta/superagents.git
cd superagents
npm install
npm run build
npm start

# Update to latest version
superagents update
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
│   ├── analyzer/
│   │   └── codebase-analyzer.ts  # Codebase analysis and pattern detection
│   ├── context/
│   │   └── recommendation-engine.ts  # Smart recommendations based on goal + codebase
│   ├── generator/
│   │   └── index.ts          # AI-powered agent/skill generation with Claude
│   ├── writer/
│   │   └── index.ts          # Output writer for .claude/ folder
│   ├── utils/
│   │   ├── auth.ts           # Authentication (Claude Plan or API Key)
│   │   └── claude-cli.ts     # Claude CLI wrapper for Max subscribers
│   ├── config/
│   │   └── presets.ts        # GOAL_PRESETS for all 9 project types
│   └── types/
│       ├── goal.ts           # ProjectGoal, GoalCategory, GoalPreset
│       ├── codebase.ts       # CodebaseAnalysis, ProjectType, Framework
│       ├── generation.ts     # GenerationContext, GeneratedOutputs
│       └── config.ts         # AgentDefinition, SkillDefinition
├── bin/
│   └── superagents           # Executable entry point
├── install.sh                # Curl installation script
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

### Implementation Status

| Module | Status | Location |
|--------|--------|----------|
| CLI Interface | ✅ Complete | `src/cli/` |
| Type System | ✅ Complete | `src/types/` |
| Goal Presets | ✅ Complete | `src/config/presets.ts` |
| Entry Point | ✅ Complete | `src/index.ts` |
| Codebase Analyzer | ✅ Complete | `src/analyzer/codebase-analyzer.ts` |
| Recommendation Engine | ✅ Complete | `src/context/recommendation-engine.ts` |
| AI Generator | ✅ Complete | `src/generator/index.ts` |
| Output Writer | ✅ Complete | `src/writer/index.ts` |
| Authentication | ✅ Complete | `src/utils/auth.ts` |
| Claude CLI Wrapper | ✅ Complete | `src/utils/claude-cli.ts` |
| Update Command | ✅ Complete | `src/index.ts` |

## Architecture Overview

SuperAgents uses a context-first approach:

```
1. Collect Goal     -> "What are you building?"
2. Authenticate     -> Claude Plan (Max) or API Key
3. Select Model     -> Claude Sonnet 4.5 or Opus 4.5
4. Analyze Codebase -> Detect frameworks, patterns, dependencies
5. Recommendations  -> Merge goal + codebase insights
6. User Confirms    -> Select agents and skills
7. AI Generation    -> Claude creates custom configs (with progress %)
8. Write Output     -> .claude/ folder created
```

### Key Modules

| Module | Location | Purpose |
|--------|----------|---------|
| Banner | `src/cli/banner.ts` | ASCII art and success/error displays |
| Prompts | `src/cli/prompts.ts` | Interactive prompts with @clack/prompts |
| Auth | `src/utils/auth.ts` | Two auth methods: Claude Plan or API Key |
| Claude CLI | `src/utils/claude-cli.ts` | Wrapper for `claude` CLI (Max subscribers) |
| Analyzer | `src/analyzer/codebase-analyzer.ts` | Codebase analysis |
| Recommendations | `src/context/recommendation-engine.ts` | Smart agent/skill suggestions |
| Generator | `src/generator/index.ts` | AI-powered generation with progress |
| Writer | `src/writer/index.ts` | File output to .claude/ folder |
| Presets | `src/config/presets.ts` | Goal presets for 9 project types |

## Authentication

SuperAgents supports two authentication methods:

1. **Claude Plan (Max Subscription)** - Uses the `claude` CLI you're already logged into
2. **API Key** - Direct Anthropic API key from environment or input

The tool detects if you have Claude CLI authenticated and offers both options.

## Development Guidelines

### File Naming
- Source files: `kebab-case.ts` (e.g., `codebase-analyzer.ts`)
- Type files grouped in `types/` directory
- Config files grouped in `config/` directory

### Code Naming
- Interfaces/Types: `PascalCase` (e.g., `ProjectGoal`, `CodebaseAnalysis`)
- Functions: `camelCase` (e.g., `collectProjectGoal`, `displayBanner`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `GOAL_PRESETS`, `BANNER`)

### Import Order
```typescript
// 1. External packages
import { Command } from 'commander';
import * as p from '@clack/prompts';

// 2. Internal types (with type keyword)
import type { ProjectGoal } from '../types/goal.js';

// 3. Internal modules
import { displayBanner } from './cli/banner.js';

// Note: .js extension required for ESM imports
```

## Available Commands

| Command | Description |
|---------|-------------|
| `superagents` | Run the main configuration generator |
| `superagents update` | Update to the latest version |
| `npm run dev` | Start in watch mode with tsx |
| `npm run build` | Compile TypeScript to dist/ |
| `npm test` | Run Vitest test suite |
| `npm run type-check` | TypeScript check without emit |
| `npm run lint` | ESLint on src/ |

## Generated Output Structure

SuperAgents generates:

```
.claude/
├── CLAUDE.md              # Project overview + goals
├── settings.json          # Claude Code configuration
├── skills/                # Tech-specific knowledge (.md files)
│   ├── nodejs.md
│   ├── typescript.md
│   └── ...
├── agents/                # Specialized sub-agents (.md files)
│   ├── backend-engineer.md
│   ├── code-reviewer.md
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

### GenerationContext
```typescript
interface GenerationContext {
  goal: ProjectGoal;
  codebase: CodebaseAnalysis;
  selectedAgents: string[];
  selectedSkills: string[];
  selectedModel: 'opus' | 'sonnet';
  authMethod: 'claude-plan' | 'api-key';
  apiKey?: string;
  sampledFiles: SampledFile[];
  generatedAt: string;
}
```

## Additional Resources

- @Architecture.md - Complete technical architecture
- @README.md - User-facing documentation
- @NEW_IMPLEMENTATION.md - Implementation roadmap and progress tracking

## Skill Usage Guide

| Skill | Invoke When |
|-------|-------------|
| ora | Displays terminal spinners, progress indicators |
| commander | CLI command parsing and argument handling |
| clack-prompts | Interactive terminal prompts and selections |
| typescript | TypeScript strict mode and type safety |
| nodejs | Node.js runtime, ESM modules, async/await |
| picocolors | Terminal text coloring and formatting |
| anthropic | Claude API integration |
| fs-extra | Enhanced file system operations |
| zod | Runtime schema validation |
| vitest | Unit and integration tests |
