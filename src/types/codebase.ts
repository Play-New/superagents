/**
 * Types for codebase analysis
 */

export type ProjectType =
  | 'nextjs'
  | 'react'
  | 'vue'
  | 'angular'
  | 'svelte'
  | 'node'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'csharp'
  | 'php'
  | 'ruby'
  | 'unknown';

export type ProgrammingLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'csharp'
  | 'php'
  | 'ruby';

export type Framework =
  | 'nextjs'
  | 'nuxtjs'
  | 'react'
  | 'vue'
  | 'angular'
  | 'svelte'
  | 'express'
  | 'fastify'
  | 'nestjs'
  | 'django'
  | 'fastapi'
  | 'flask'
  | 'gin'
  | 'fiber'
  | 'actix'
  | 'rocket'
  | 'spring'
  | 'laravel'
  | 'rails'
  | null;

export type DependencyCategory =
  | 'framework'
  | 'ui'
  | 'database'
  | 'orm'
  | 'auth'
  | 'payments'
  | 'testing'
  | 'build'
  | 'other';

export interface Dependency {
  name: string;
  version: string;
  category: DependencyCategory;
}

export type PatternType =
  | 'api-routes'
  | 'server-actions'
  | 'components'
  | 'services'
  | 'models'
  | 'controllers'
  | 'middleware'
  | 'hooks'
  | 'utils'
  | 'tests';

export interface Pattern {
  type: PatternType;
  paths: string[];
  confidence: number; // 0-1
  description: string;
}

export interface FileNode {
  path: string;
  type: 'file' | 'directory';
  size?: number;
  children?: FileNode[];
}

export interface MCPServer {
  name: string;
  path: string;
  capabilities: string[];
}

export type MonorepoTool = 'npm' | 'yarn' | 'pnpm' | 'lerna' | 'turborepo' | 'nx';

export interface MonorepoPackage {
  name: string;
  path: string;
  relativePath: string;
  hasPackageJson: boolean;
}

export interface MonorepoInfo {
  isMonorepo: boolean;
  tool: MonorepoTool | null;
  rootPackageJson: string | null;
  packages: MonorepoPackage[];
  workspaceGlobs: string[];
}

export interface ExistingClaudeConfig {
  hasClaudeDir: boolean;
  hasCLAUDEMd: boolean;
  agents: string[];
  skills: string[];
  hooks: string[];
}

export interface CodebaseAnalysis {
  // Basic info
  projectRoot: string;
  projectType: ProjectType;
  language: ProgrammingLanguage | null;
  framework: Framework;

  // Dependencies
  dependencies: Dependency[];
  devDependencies: Dependency[];

  // Structure
  fileStructure: FileNode[];
  totalFiles: number;
  totalLines: number;

  // Patterns
  detectedPatterns: Pattern[];

  // Recommendations
  suggestedSkills: string[];
  suggestedAgents: string[];

  // Existing configs
  existingClaudeConfig: ExistingClaudeConfig | null;
  mcpServers: MCPServer[];

  // Monorepo info
  monorepo: MonorepoInfo | null;

  // Sampled files for AI context
  sampledFiles: SampledFile[];

  // Metadata
  analyzedAt: string;
  analysisTimeMs: number;
}

export interface SampledFile {
  path: string;
  content: string;
  purpose: string; // Why this file was sampled
}
