/**
 * Format adapter - converts between Claude and Cursor formats
 */

/**
 * Convert Claude markdown content to Cursor .mdc format
 * Cursor rules use frontmatter for metadata and support glob patterns
 */
export function toCursorFormat(content: string, options: {
  name: string;
  description?: string;
  globs?: string[];
}): string {
  const frontmatter = buildFrontmatter(options);
  return `${frontmatter}\n${content}`;
}

/**
 * Build frontmatter for Cursor .mdc files
 */
function buildFrontmatter(options: {
  name: string;
  description?: string;
  globs?: string[];
}): string {
  const lines = ['---'];

  lines.push(`name: "${options.name}"`);

  if (options.description) {
    lines.push(`description: "${options.description}"`);
  }

  if (options.globs && options.globs.length > 0) {
    lines.push('globs:');
    for (const glob of options.globs) {
      lines.push(`  - "${glob}"`);
    }
  }

  lines.push('---');

  return lines.join('\n');
}

/**
 * Get default globs for a skill based on its name
 */
export function getSkillGlobs(skillName: string): string[] {
  const skillGlobs: Record<string, string[]> = {
    'typescript': ['**/*.ts', '**/*.tsx'],
    'javascript': ['**/*.js', '**/*.jsx'],
    'nodejs': ['**/*.js', '**/*.ts', 'package.json'],
    'react': ['**/*.tsx', '**/*.jsx', 'src/components/**/*'],
    'nextjs': ['**/*.tsx', '**/*.ts', 'app/**/*', 'pages/**/*'],
    'vue': ['**/*.vue', 'src/**/*'],
    'python': ['**/*.py'],
    'fastapi': ['**/*.py', 'app/**/*', 'routers/**/*'],
    'tailwind': ['**/*.css', 'tailwind.config.*'],
    'prisma': ['prisma/**/*', '**/*.prisma'],
    'drizzle': ['drizzle/**/*', 'db/**/*'],
    'docker': ['Dockerfile*', 'docker-compose*.yml', '.dockerignore'],
    'graphql': ['**/*.graphql', '**/*.gql'],
    'vitest': ['**/*.test.ts', '**/*.spec.ts', 'vitest.config.*'],
    'express': ['**/*.ts', '**/*.js', 'routes/**/*', 'middleware/**/*'],
    'supabase': ['supabase/**/*', '**/*.sql'],
    'mcp': ['**/*.ts', '**/*.py', 'mcp.json']
  };

  return skillGlobs[skillName.toLowerCase()] || ['**/*'];
}

/**
 * Get default globs for an agent based on its name
 */
export function getAgentGlobs(agentName: string): string[] {
  const agentGlobs: Record<string, string[]> = {
    'backend-engineer': ['src/**/*', 'lib/**/*', 'api/**/*'],
    'frontend-specialist': ['src/components/**/*', 'src/pages/**/*', 'public/**/*'],
    'code-reviewer': ['**/*'],
    'debugger': ['**/*'],
    'devops-specialist': ['Dockerfile*', '*.yml', '*.yaml', '.github/**/*'],
    'security-analyst': ['**/*'],
    'database-specialist': ['**/*.sql', 'prisma/**/*', 'drizzle/**/*', 'migrations/**/*'],
    'api-designer': ['api/**/*', 'routes/**/*', 'openapi.*'],
    'testing-specialist': ['**/*.test.*', '**/*.spec.*', 'tests/**/*'],
    'docs-writer': ['**/*.md', 'docs/**/*'],
    'performance-optimizer': ['**/*']
  };

  return agentGlobs[agentName.toLowerCase()] || ['**/*'];
}
