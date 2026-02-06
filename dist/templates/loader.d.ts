/**
 * Template loader - loads and renders local templates
 *
 * Design:
 * - Use local templates for common agents/skills to reduce API calls
 * - Template variables: {{projectName}}, {{framework}}, {{goal}}, etc.
 * - Conditional sections: {{#if category === 'cli-tool'}}...{{/if}}
 * - Truthy checks: {{#if categoryGuidance}}...{{/if}}
 * - Fallback to API generation if no template exists
 */
import type { GenerationContext } from '../types/generation.js';
import { type SecurityLevel } from '../types/goal.js';
interface TemplateVars {
    projectName: string;
    goal: string;
    category: string;
    framework: string;
    language: string;
    dependencies: string;
    patterns: string;
    skills: string;
    agents: string;
    model: string;
    generatedAt: string;
    codeExamples: string;
    requirements: string;
    securityLevel: SecurityLevel;
    categoryGuidance: string;
    patternRules: string;
}
/**
 * Check if a local template exists for the given item
 */
export declare function hasTemplate(type: 'agent' | 'skill', name: string): boolean;
/**
 * Load and render a template with context variables
 */
export declare function loadTemplate(type: 'agent' | 'skill', name: string, context: GenerationContext): Promise<string | null>;
/**
 * Build template variables from generation context
 */
export declare function buildTemplateVars(context: GenerationContext): TemplateVars;
/**
 * Render template by replacing {{variable}} placeholders
 * Also handles conditional sections:
 * - {{#if securityLevel === 'high'}}...{{/if}}
 * - {{#if categoryGuidance}}...{{/if}}
 */
export declare function renderTemplate(template: string, vars: TemplateVars): string;
/**
 * Get list of available templates
 */
export declare function getAvailableTemplates(): {
    agents: string[];
    skills: string[];
};
export {};
//# sourceMappingURL=loader.d.ts.map