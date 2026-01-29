/**
 * Interactive prompts using @clack/prompts
 */
import * as p from '@clack/prompts';
import pc from 'picocolors';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { AGENT_EXPERTS } from './banner.js';
export async function collectProjectGoal() {
    p.intro(pc.bgCyan(pc.black(' SuperAgents ')));
    // Use p.group for back navigation support
    const answers = await p.group({
        description: () => p.text({
            message: 'What are you building?',
            placeholder: 'E.g., A SaaS analytics dashboard with real-time charts',
            validate: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Please describe your project';
                }
                if (value.trim().length < 10) {
                    return 'Please provide more detail (at least 10 characters)';
                }
                return undefined;
            }
        }),
        category: ({ results }) => {
            const suggestedCategory = categorizeGoal(results.description || '');
            // Build options array, filtering out duplicate
            const allOptions = [
                { value: 'saas-dashboard', label: 'SaaS Dashboard', hint: 'Analytics, metrics, admin panels' },
                { value: 'ecommerce', label: 'E-Commerce Platform', hint: 'Online stores, marketplaces' },
                { value: 'content-platform', label: 'Content Platform', hint: 'Blogs, CMS, publishing' },
                { value: 'api-service', label: 'API Service', hint: 'REST/GraphQL APIs, microservices' },
                { value: 'mobile-app', label: 'Mobile App', hint: 'iOS, Android, React Native' },
                { value: 'cli-tool', label: 'CLI Tool', hint: 'Command-line utilities' },
                { value: 'data-pipeline', label: 'Data Pipeline', hint: 'ETL, data processing' },
                { value: 'auth-service', label: 'Auth Service', hint: 'Authentication, user management' },
                { value: 'custom', label: 'Custom', hint: 'Something else' }
            ];
            // Add detected option at the top if it's not 'custom'
            const options = suggestedCategory !== 'custom'
                ? [
                    {
                        value: suggestedCategory,
                        label: `${getCategoryLabel(suggestedCategory)} ${pc.dim('(detected)')}`,
                        hint: 'Recommended based on your description'
                    },
                    ...allOptions.filter(opt => opt.value !== suggestedCategory)
                ]
                : allOptions;
            return p.select({
                message: 'Project type (use ← to go back)',
                options: options,
                initialValue: suggestedCategory
            });
        }
    }, {
        onCancel: () => {
            p.cancel('Operation cancelled');
            process.exit(0);
        }
    });
    return {
        description: answers.description,
        category: answers.category
    };
}
export async function selectModel() {
    const result = await p.group({
        model: () => p.select({
            message: 'Which AI model should we use? (use ← to go back)',
            options: [
                {
                    value: 'sonnet',
                    label: 'Claude Sonnet 4.5',
                    hint: 'Fast & capable (recommended)'
                },
                {
                    value: 'opus',
                    label: 'Claude Opus 4.5',
                    hint: 'Most capable (slower, higher cost)'
                }
            ],
            initialValue: 'sonnet'
        })
    }, {
        onCancel: () => {
            p.cancel('Operation cancelled');
            process.exit(0);
        }
    });
    return result.model;
}
export async function confirmSelections(recommendations) {
    // Show expert-backed agents recommendation
    const agentLines = recommendations.agents
        .slice(0, 5)
        .map(a => {
        const expert = AGENT_EXPERTS[a.name];
        const expertText = expert ? pc.cyan(` [${expert.expert}]`) : '';
        return `  ${pc.green('✓')} ${pc.bold(a.name)}${expertText}\n     ${pc.dim(a.reasons[0])}`;
    })
        .join('\n');
    p.note(agentLines, 'Expert-Backed Agents');
    const agents = await p.multiselect({
        message: `Select agents ${pc.dim('(built on industry-leading principles)')}`,
        options: recommendations.agents.map(agent => {
            const expert = AGENT_EXPERTS[agent.name];
            const expertHint = expert ? `${expert.expert}'s ${expert.domain}` : agent.reasons[0];
            return {
                value: agent.name,
                label: agent.name,
                hint: expertHint,
                selected: recommendations.defaultAgents.includes(agent.name)
            };
        }),
        required: true
    });
    if (p.isCancel(agents)) {
        p.cancel('Operation cancelled');
        process.exit(0);
    }
    // Show skills recommendation
    p.note(recommendations.skills
        .slice(0, 5)
        .map(s => `  ${pc.green('✓')} ${pc.bold(s.name)} - ${pc.dim(s.reasons[0])}`)
        .join('\n'), 'Framework Skills');
    const skills = await p.multiselect({
        message: `Select skills ${pc.dim('(framework-specific best practices)')}`,
        options: recommendations.skills.map(skill => ({
            value: skill.name,
            label: skill.name,
            hint: skill.reasons[0],
            selected: recommendations.defaultSkills.includes(skill.name)
        })),
        required: true
    });
    if (p.isCancel(skills)) {
        p.cancel('Operation cancelled');
        process.exit(0);
    }
    return { agents, skills };
}
export async function confirmOverwrite(dirName = '.claude') {
    const shouldOverwrite = await p.confirm({
        message: `${dirName} directory already exists. Overwrite?`,
        initialValue: false
    });
    if (p.isCancel(shouldOverwrite)) {
        return false;
    }
    return shouldOverwrite;
}
export async function selectPackages(packages) {
    p.note(`Found ${packages.length} packages in this monorepo:\n` +
        packages.map(p => `  ${pc.green('•')} ${p.name} (${p.relativePath})`).join('\n'), 'Monorepo Detected');
    const selected = await p.multiselect({
        message: `Select packages to configure ${pc.dim('(space to toggle, enter to confirm)')}`,
        options: packages.map(pkg => ({
            value: pkg.relativePath,
            label: pkg.name,
            hint: pkg.relativePath,
            selected: true // Default to all selected
        })),
        required: true
    });
    if (p.isCancel(selected)) {
        p.cancel('Operation cancelled');
        process.exit(0);
    }
    return selected;
}
/**
 * Detect if this is a new project (empty/minimal) or existing codebase
 */
export async function detectProjectMode(projectRoot = process.cwd()) {
    // Check for package.json
    const hasPackageJson = await fs.pathExists(path.join(projectRoot, 'package.json'));
    // Check for src/ directory
    const hasSrcDir = await fs.pathExists(path.join(projectRoot, 'src'));
    // Count code files (excluding node_modules, .git, dist)
    let codeFileCount = 0;
    try {
        const codeFiles = await glob('**/*.{ts,tsx,js,jsx,py,go,rs,java}', {
            cwd: projectRoot,
            ignore: ['node_modules/**', '.git/**', 'dist/**', '.next/**', 'build/**'],
            nodir: true
        });
        codeFileCount = codeFiles.length;
    }
    catch {
        // If glob fails, assume empty
    }
    // New project criteria: no package.json OR (no src/ AND fewer than 5 code files)
    if (!hasPackageJson || (!hasSrcDir && codeFileCount < 5)) {
        return 'new';
    }
    return 'existing';
}
/**
 * Guided spec gathering for NEW projects
 * Asks 4 questions to understand what the user is building
 */
export async function collectNewProjectSpec() {
    p.intro(pc.bgCyan(pc.black(' SuperAgents - New Project Setup ')));
    const answers = await p.group({
        // Step 1: Core vision
        vision: () => p.text({
            message: 'What are you building?',
            placeholder: 'E.g., A task management app with team collaboration',
            validate: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Please describe your project';
                }
                if (value.trim().length < 10) {
                    return 'Please provide more detail (at least 10 characters)';
                }
                return undefined;
            }
        }),
        // Step 2: Tech stack
        stack: () => p.select({
            message: 'What tech stack? (use ← to go back)',
            options: [
                { value: 'nextjs', label: 'Next.js (Full-stack)', hint: 'React + API routes + SSR' },
                { value: 'react-node', label: 'React + Node.js', hint: 'Separate frontend and backend' },
                { value: 'python-fastapi', label: 'Python + FastAPI', hint: 'Python backend with FastAPI' },
                { value: 'vue-node', label: 'Vue + Node.js', hint: 'Vue frontend with Node backend' },
                { value: 'other', label: 'Other', hint: 'Custom or unlisted stack' }
            ],
            initialValue: 'nextjs'
        }),
        // Step 3: Focus area
        focus: () => p.select({
            message: 'Primary focus? (use ← to go back)',
            options: [
                { value: 'fullstack', label: 'Full-stack balanced', hint: 'Equal frontend and backend work' },
                { value: 'frontend', label: 'Frontend-heavy', hint: 'Focus on UI/UX and interactions' },
                { value: 'backend', label: 'Backend-heavy', hint: 'Focus on APIs and data' },
                { value: 'api', label: 'API-only', hint: 'No frontend, pure API service' }
            ],
            initialValue: 'fullstack'
        }),
        // Step 4: Key requirements
        requirements: () => p.multiselect({
            message: 'Key requirements? (use ← to go back, space to toggle)',
            options: [
                { value: 'auth', label: 'Authentication', hint: 'User login, sessions, OAuth' },
                { value: 'database', label: 'Database', hint: 'Data persistence with ORM' },
                { value: 'api', label: 'External APIs', hint: 'Third-party API integrations' },
                { value: 'payments', label: 'Payments', hint: 'Stripe, subscriptions' },
                { value: 'realtime', label: 'Real-time features', hint: 'WebSockets, live updates' }
            ],
            required: false
        })
    }, {
        onCancel: () => {
            p.cancel('Operation cancelled');
            process.exit(0);
        }
    });
    return {
        vision: answers.vision,
        stack: answers.stack,
        focus: answers.focus,
        requirements: (answers.requirements || [])
    };
}
/**
 * Convert ProjectSpec to ProjectGoal for existing codebase flow compatibility
 */
export function specToGoal(spec) {
    // Map stack to a suitable category
    const categoryMap = {
        'nextjs': 'saas-dashboard',
        'react-node': 'saas-dashboard',
        'python-fastapi': 'api-service',
        'vue-node': 'saas-dashboard',
        'other': 'custom'
    };
    // Build a richer description from the spec
    const focusText = {
        frontend: 'frontend-focused',
        backend: 'backend-focused',
        fullstack: 'full-stack',
        api: 'API-first'
    }[spec.focus];
    const requirementsText = spec.requirements.length > 0
        ? ` with ${spec.requirements.join(', ')}`
        : '';
    const description = `${spec.vision} (${focusText}${requirementsText})`;
    return {
        description,
        category: categoryMap[spec.stack]
    };
}
// Helper functions
function categorizeGoal(description) {
    if (!description) {
        return 'custom';
    }
    const lower = description.toLowerCase();
    const keywords = {
        'saas-dashboard': ['saas', 'dashboard', 'analytics', 'metrics', 'admin', 'panel'],
        'ecommerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'marketplace', 'cart'],
        'content-platform': ['blog', 'cms', 'content', 'articles', 'posts', 'publishing'],
        'api-service': ['api', 'rest', 'graphql', 'microservice', 'backend', 'service'],
        'mobile-app': ['mobile', 'app', 'ios', 'android', 'react native', 'flutter'],
        'cli-tool': ['cli', 'command line', 'terminal', 'tool', 'utility'],
        'data-pipeline': ['pipeline', 'etl', 'data processing', 'batch', 'warehouse'],
        'auth-service': ['authentication', 'auth', 'login', 'identity', 'sso', 'oauth'],
        'custom': []
    };
    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => lower.includes(word))) {
            return category;
        }
    }
    return 'custom';
}
function getCategoryLabel(category) {
    const labels = {
        'saas-dashboard': 'SaaS Dashboard',
        'ecommerce': 'E-Commerce Platform',
        'content-platform': 'Content Platform',
        'api-service': 'API Service',
        'mobile-app': 'Mobile App',
        'cli-tool': 'CLI Tool',
        'data-pipeline': 'Data Pipeline',
        'auth-service': 'Auth Service',
        'custom': 'Custom'
    };
    return labels[category];
}
//# sourceMappingURL=prompts.js.map