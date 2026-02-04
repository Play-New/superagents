/**
 * Types for project goal analysis
 */
export type WorkArea = 'development' | 'marketing' | 'content' | 'business' | 'research' | 'operations';
export type GoalCategory = 'saas-dashboard' | 'ecommerce' | 'content-platform' | 'api-service' | 'mobile-app' | 'cli-tool' | 'data-pipeline' | 'auth-service' | 'business-plan' | 'marketing-campaign' | 'content-creation' | 'research-analysis' | 'project-docs' | 'custom';
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
    priority: number;
}
export interface SkillSuggestion {
    name: string;
    reason: string;
    priority: number;
}
export interface ProjectGoal {
    description: string;
    category: GoalCategory;
    requirements?: ProjectRequirement[];
    technicalRequirements: TechRequirement[];
    suggestedAgents: AgentSuggestion[];
    suggestedSkills: SkillSuggestion[];
    timestamp: string;
    confidence: number;
}
export type SecurityLevel = 'standard' | 'elevated' | 'high';
export declare const CATEGORY_SECURITY: Record<GoalCategory, SecurityLevel>;
export interface GoalPreset {
    recommendedAgents: AgentSuggestion[];
    recommendedSkills: SkillSuggestion[];
    technicalRequirements: TechRequirement[];
}
export type ProjectMode = 'new' | 'existing';
export type ProjectFocus = 'frontend' | 'backend' | 'fullstack' | 'api';
export type TechStack = 'react-node' | 'nextjs' | 'python-fastapi' | 'vue-node' | 'other';
export type WorkTools = 'google-workspace' | 'notion' | 'excel-sheets' | 'figma' | 'hubspot' | 'salesforce' | 'other';
export type ProjectRequirement = 'auth' | 'payments' | 'realtime' | 'database' | 'api';
export interface ProjectSpec {
    vision: string;
    stack: TechStack;
    focus: ProjectFocus;
    requirements: ProjectRequirement[];
}
//# sourceMappingURL=goal.d.ts.map