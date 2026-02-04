/**
 * Types for project goal analysis
 */

// Work area to group related project types
export type WorkArea =
  | 'development'
  | 'marketing'
  | 'content'
  | 'business'
  | 'research'
  | 'operations';

export type GoalCategory =
  // Development
  | 'saas-dashboard'
  | 'ecommerce'
  | 'content-platform'
  | 'api-service'
  | 'mobile-app'
  | 'cli-tool'
  | 'data-pipeline'
  | 'auth-service'
  // Business & Content
  | 'business-plan'
  | 'marketing-campaign'
  | 'content-creation'
  | 'research-analysis'
  | 'project-docs'
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

  // Project requirements (from new project spec)
  requirements?: ProjectRequirement[];

  // Analyzed data
  technicalRequirements: TechRequirement[];
  suggestedAgents: AgentSuggestion[];
  suggestedSkills: SkillSuggestion[];

  // Metadata
  timestamp: string;
  confidence: number; // 0-1
}

// Security level based on project category
export type SecurityLevel = 'standard' | 'elevated' | 'high';

// Category to security level mapping
export const CATEGORY_SECURITY: Record<GoalCategory, SecurityLevel> = {
  'auth-service': 'high',
  'ecommerce': 'elevated',
  'saas-dashboard': 'elevated',
  'api-service': 'standard',
  'mobile-app': 'standard',
  'cli-tool': 'standard',
  'data-pipeline': 'standard',
  'content-platform': 'standard',
  'business-plan': 'standard',
  'marketing-campaign': 'standard',
  'content-creation': 'standard',
  'research-analysis': 'standard',
  'project-docs': 'standard',
  'custom': 'standard'
};

export interface GoalPreset {
  recommendedAgents: AgentSuggestion[];
  recommendedSkills: SkillSuggestion[];
  technicalRequirements: TechRequirement[];
}

// Project mode: 'new' for empty/minimal projects, 'existing' for codebases with code
export type ProjectMode = 'new' | 'existing';

// Focus area for new projects
export type ProjectFocus = 'frontend' | 'backend' | 'fullstack' | 'api';

// Tech stack options for new projects (development)
export type TechStack =
  | 'react-node'
  | 'nextjs'
  | 'python-fastapi'
  | 'vue-node'
  | 'other';

// Tool options for non-development projects
export type WorkTools =
  | 'google-workspace'
  | 'notion'
  | 'excel-sheets'
  | 'figma'
  | 'hubspot'
  | 'salesforce'
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
