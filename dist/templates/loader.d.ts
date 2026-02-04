/**
 * Template loader - loads and renders local templates
 *
 * Design:
 * - Use local templates for common agents/skills to reduce API calls
 * - Template variables: {{projectName}}, {{framework}}, {{goal}}, etc.
 * - Conditional sections: {{#if category === 'cli-tool'}}...{{/if}}
 * - Pattern-aware rules: {{#if patterns.includes('Repository')}}...{{/if}}
 * - Fallback to API generation if no template exists
 */
import type { GenerationContext } from '../types/generation.js';
/**
 * Check if a local template exists for the given item
 */
export declare function hasTemplate(type: 'agent' | 'skill', name: string): boolean;
/**
 * Load and render a template with context variables
 */
export declare function loadTemplate(type: 'agent' | 'skill', name: string, context: GenerationContext): Promise<string | null>;
/**
 * Get list of available templates
 */
export declare function getAvailableTemplates(): {
    agents: string[];
    skills: string[];
};
//# sourceMappingURL=loader.d.ts.map