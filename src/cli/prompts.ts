/**
 * Interactive prompts using @clack/prompts
 */

import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { GoalCategory } from '../types/goal.js';
import type { Recommendations } from '../types/config.js';
import type { TargetIDE } from '../types/generation.js';
import type { MonorepoPackage } from '../types/codebase.js';

export async function collectProjectGoal(): Promise<{ description: string; category: GoalCategory }> {
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
      const suggestedCategory = categorizeGoal(results.description as string || '');

      // Build options array, filtering out duplicate
      const allOptions: Array<{ value: GoalCategory; label: string; hint: string }> = [
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
        options: options as any,
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
    description: answers.description as string,
    category: answers.category as GoalCategory
  };
}

export async function selectIDE(): Promise<TargetIDE> {
  const result = await p.group({
    ide: () => p.select<{ value: TargetIDE; label: string; hint: string }[], TargetIDE>({
      message: 'Which IDE are you using?',
      options: [
        {
          value: 'claude',
          label: 'Claude Code',
          hint: 'Official Anthropic CLI (recommended)'
        },
        {
          value: 'cursor',
          label: 'Cursor',
          hint: 'AI-powered code editor'
        }
      ],
      initialValue: 'claude'
    })
  }, {
    onCancel: () => {
      p.cancel('Operation cancelled');
      process.exit(0);
    }
  });

  return result.ide;
}

export async function selectModel(): Promise<'opus' | 'sonnet'> {
  const result = await p.group({
    model: () => p.select<{ value: 'opus' | 'sonnet'; label: string; hint: string }[], 'opus' | 'sonnet'>({
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

export async function confirmSelections(recommendations: Recommendations): Promise<{
  agents: string[];
  skills: string[];
}> {
  // Show recommendations
  p.note(
    recommendations.agents
      .slice(0, 5)
      .map(a => `  ${pc.green('✓')} ${a.name} (score: ${a.score}) - ${a.reasons[0]}`)
      .join('\n'),
    'Recommended Agents'
  );

  const agents = await p.multiselect({
    message: `Select agents to include ${pc.dim('(space to toggle, enter to confirm)')}`,
    options: recommendations.agents.map(agent => ({
      value: agent.name,
      label: agent.name,
      hint: `${agent.reasons[0]} (score: ${agent.score})`,
      selected: recommendations.defaultAgents.includes(agent.name)
    })),
    required: true
  }) as string[];

  if (p.isCancel(agents)) {
    p.cancel('Operation cancelled');
    process.exit(0);
  }

  p.note(
    recommendations.skills
      .slice(0, 5)
      .map(s => `  ${pc.green('✓')} ${s.name} (score: ${s.score}) - ${s.reasons[0]}`)
      .join('\n'),
    'Recommended Skills'
  );

  const skills = await p.multiselect({
    message: `Select skills to include ${pc.dim('(space to toggle, enter to confirm)')}`,
    options: recommendations.skills.map(skill => ({
      value: skill.name,
      label: skill.name,
      hint: `${skill.reasons[0]} (score: ${skill.score})`,
      selected: recommendations.defaultSkills.includes(skill.name)
    })),
    required: true
  }) as string[];

  if (p.isCancel(skills)) {
    p.cancel('Operation cancelled');
    process.exit(0);
  }

  return { agents, skills };
}

export async function confirmOverwrite(dirName = '.claude'): Promise<boolean> {
  const shouldOverwrite = await p.confirm({
    message: `${dirName} directory already exists. Overwrite?`,
    initialValue: false
  });

  if (p.isCancel(shouldOverwrite)) {
    return false;
  }

  return shouldOverwrite as boolean;
}

export async function selectPackages(packages: MonorepoPackage[]): Promise<string[]> {
  p.note(
    `Found ${packages.length} packages in this monorepo:\n` +
    packages.map(p => `  ${pc.green('•')} ${p.name} (${p.relativePath})`).join('\n'),
    'Monorepo Detected'
  );

  const selected = await p.multiselect({
    message: `Select packages to configure ${pc.dim('(space to toggle, enter to confirm)')}`,
    options: packages.map(pkg => ({
      value: pkg.relativePath,
      label: pkg.name,
      hint: pkg.relativePath,
      selected: true // Default to all selected
    })),
    required: true
  }) as string[];

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled');
    process.exit(0);
  }

  return selected;
}

// Helper functions

function categorizeGoal(description: string): GoalCategory {
  if (!description) {
    return 'custom';
  }
  const lower = description.toLowerCase();

  const keywords: Record<GoalCategory, string[]> = {
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
      return category as GoalCategory;
    }
  }

  return 'custom';
}

function getCategoryLabel(category: GoalCategory): string {
  const labels: Record<GoalCategory, string> = {
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
