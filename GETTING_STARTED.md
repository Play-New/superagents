# Getting Started with SuperAgents

## Overview

**SuperAgents** is a fully implemented CLI tool that generates context-aware Claude Code configurations. It analyzes your codebase, understands your project goals, and creates customized agents and skills.

## Installation

### Option 1: Quick Install (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/rinaldofesta/superagents/main/install.sh | bash
```

This installs SuperAgents to `~/.superagents` and adds it to your PATH.

### Option 2: Clone and Build

```bash
git clone https://github.com/rinaldofesta/superagents.git
cd superagents
npm install
npm run build
npm link  # Makes 'superagents' available globally
```

## Usage

```bash
# Navigate to any project directory
cd your-project

# Run SuperAgents
superagents
```

### What Happens

1. **Goal Collection** - You describe what you're building
2. **Authentication** - Choose Claude Plan (Max) or API Key
3. **Model Selection** - Pick Sonnet (fast) or Opus (powerful)
4. **Codebase Analysis** - Automatic detection of frameworks and patterns
5. **Recommendations** - Smart suggestions based on goal + codebase
6. **Agent/Skill Selection** - Choose which to generate
7. **AI Generation** - Claude creates customized configs (with progress %)
8. **Output** - `.claude/` folder created with all files

### Example Session

```
$ superagents

╔═══════════════════════════════════════════════════════════════╗
║   SUPERAGENTS - Context-Aware Configuration Generator         ║
╚═══════════════════════════════════════════════════════════════╝

? What are you building?
> A SaaS analytics dashboard with real-time charts

? Project type
> SaaS Dashboard (detected)

? Authentication method
> Claude Plan (using your Max subscription)

? Which AI model should we use?
> Claude Sonnet 4.5

✓ Codebase analyzed
✓ Recommendations generated

? Select agents to include (space to toggle, enter to confirm)
☑ frontend-engineer
☑ backend-engineer
☑ reviewer

? Select skills to include
☑ nextjs
☑ typescript
☑ react

⠋ [25%] Generating agent: frontend-engineer...
⠙ [50%] ✓ Agent frontend-engineer
⠹ [75%] Generating skill: typescript...
✔ Generation complete! [100%]

✓ Success! Your Claude Code configuration is ready.
```

## Generated Output

SuperAgents creates a `.claude/` folder in your project:

```
.claude/
├── CLAUDE.md              # Project overview tailored to your goal
├── settings.json          # Claude Code configuration
├── agents/                # Specialized sub-agents
│   ├── backend-engineer.md
│   ├── frontend-engineer.md
│   └── reviewer.md
├── skills/                # Domain knowledge files
│   ├── nodejs.md
│   ├── typescript.md
│   └── react.md
└── hooks/
    └── skill-loader.sh    # Auto-loads relevant skills
```

## Commands

| Command | Description |
|---------|-------------|
| `superagents` | Run the configuration generator |
| `superagents update` | Update to the latest version |

## Authentication Methods

### 1. Claude Plan (Max Subscription)

If you have a Claude Max subscription and are logged into the `claude` CLI, SuperAgents can use your existing authentication. No API key needed!

### 2. API Key

Provide your Anthropic API key either:
- Via environment variable: `ANTHROPIC_API_KEY=sk-...`
- Via `.env` file in your project
- By entering it when prompted

## Updating

```bash
superagents update
```

This pulls the latest changes from GitHub if installed via curl, or runs `npm update` if installed via npm.

## Project Structure

```
superagents/
├── src/
│   ├── index.ts              # CLI entry point with Commander.js
│   ├── cli/                  # Interactive prompts and display
│   │   ├── banner.ts         # ASCII art and success messages
│   │   ├── prompts.ts        # @clack/prompts integration
│   │   └── progress.ts       # Progress indicators
│   ├── analyzer/             # Codebase analysis
│   │   └── codebase-analyzer.ts
│   ├── context/              # Recommendation engine
│   │   └── recommendation-engine.ts
│   ├── generator/            # AI-powered generation
│   │   └── index.ts
│   ├── writer/               # File output
│   │   └── index.ts
│   ├── utils/                # Utilities
│   │   ├── auth.ts           # Authentication handling
│   │   └── claude-cli.ts     # Claude CLI wrapper
│   ├── config/               # Configuration
│   │   └── presets.ts        # Goal presets
│   └── types/                # TypeScript types
├── bin/superagents           # Executable
├── install.sh                # Installation script
└── dist/                     # Compiled JavaScript
```

## Implementation Status

All core features are implemented and working:

| Feature | Status |
|---------|--------|
| CLI Interface | ✅ Complete |
| Goal Collection | ✅ Complete |
| Authentication (Claude Plan + API Key) | ✅ Complete |
| Codebase Analysis | ✅ Complete |
| Recommendation Engine | ✅ Complete |
| AI Generation with Progress | ✅ Complete |
| Output Writer | ✅ Complete |
| Update Command | ✅ Complete |
| Curl Installation | ✅ Complete |

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/rinaldofesta/superagents.git
cd superagents
npm install
```

### Commands

```bash
npm run dev        # Watch mode
npm run build      # Compile TypeScript
npm start          # Run compiled version
npm test           # Run tests
npm run type-check # TypeScript check
npm run lint       # ESLint
```

### Making Changes

1. Edit files in `src/`
2. Run `npm run build`
3. Test with `npm start` or `superagents`
4. Commit and push

## Troubleshooting

### "Claude Code not authenticated"

Make sure you're logged into Claude CLI:
```bash
claude --version
```

If not authenticated, SuperAgents will offer API Key authentication instead.

### Generation seems slow

- Each agent/skill takes ~10-30 seconds to generate
- The progress indicator shows percentage complete
- Using Sonnet is faster than Opus

### Permission denied on install

```bash
chmod +x ~/.local/bin/superagents
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

---

**SuperAgents** - Context-aware Claude Code configuration generator
