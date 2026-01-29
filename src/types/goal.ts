/**
 * Types for project goal analysis
 */

export type GoalCategory =
  | 'saas-dashboard'
  | 'ecommerce'
  | 'content-platform'
  | 'api-service'
  | 'mobile-app'
  | 'cli-tool'
  | 'data-pipeline'
  | 'auth-service'
  | 'custom';

export type TechCategory = 'frontend' | 'backend' | 'database' | 'auth' | 'payments' | 'deployment';
export type Priority = 'required' | 'recommended' | 'optional';

export interface TechRequirement {
  category: TechCategory;
  description: string;
  priority: Priority;
  suggestedTechnologies: string[];
}

export interface AgentSuggestion {
  name: string;
  reason: string;
  priority: number; // 1-10
}

export interface SkillSuggestion {
  name: string;
  reason: string;
  priority: number; // 1-10
}

export interface ProjectGoal {
  // User input
  description: string;
  category: GoalCategory;

  // Analyzed data
  technicalRequirements: TechRequirement[];
  suggestedAgents: AgentSuggestion[];
  suggestedSkills: SkillSuggestion[];

  // Metadata
  timestamp: string;
  confidence: number; // 0-1
}

export interface GoalPreset {
  recommendedAgents: AgentSuggestion[];
  recommendedSkills: SkillSuggestion[];
  technicalRequirements: TechRequirement[];
}

// Project mode: 'new' for empty/minimal projects, 'existing' for codebases with code
export type ProjectMode = 'new' | 'existing';

// Focus area for new projects
export type ProjectFocus = 'frontend' | 'backend' | 'fullstack' | 'api';

// Tech stack options for new projects
export type TechStack =
  | 'react-node'
  | 'nextjs'
  | 'python-fastapi'
  | 'vue-node'
  | 'other';

// Requirements that can be selected for new projects
export type ProjectRequirement =
  | 'auth'
  | 'payments'
  | 'realtime'
  | 'database'
  | 'api';

// Spec for new projects (guided spec gathering)
export interface ProjectSpec {
  vision: string;
  stack: TechStack;
  focus: ProjectFocus;
  requirements: ProjectRequirement[];
}
