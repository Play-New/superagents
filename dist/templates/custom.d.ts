/**
 * Custom templates - user-provided agent/skill templates
 *
 * Location: ~/.superagents/templates/
 * Structure:
 *   ~/.superagents/templates/
 *   ├── agents/
 *   │   └── custom-agent.md
 *   └── skills/
 *       └── custom-skill.md
 */
import type { GenerationContext } from '../types/generation.js';
/**
 * Initialize custom templates directory
 */
export declare function initCustomTemplatesDir(): Promise<void>;
/**
 * Get the custom templates directory path
 */
export declare function getCustomTemplatesDir(): string;
/**
 * Check if a custom template exists
 */
export declare function hasCustomTemplate(type: 'agent' | 'skill', name: string): Promise<boolean>;
/**
 * Load a custom template with variable substitution
 */
export declare function loadCustomTemplate(type: 'agent' | 'skill', name: string, context: GenerationContext): Promise<string | null>;
/**
 * List all custom templates
 */
export declare function listCustomTemplates(): Promise<{
    agents: string[];
    skills: string[];
}>;
/**
 * Export a built-in template to custom templates directory
 */
export declare function exportTemplate(type: 'agent' | 'skill', name: string, builtInTemplatesDir: string): Promise<boolean>;
/**
 * Import a template file to custom templates directory
 */
export declare function importTemplate(type: 'agent' | 'skill', sourcePath: string, name?: string): Promise<boolean>;
/**
 * Delete a custom template
 */
export declare function deleteCustomTemplate(type: 'agent' | 'skill', name: string): Promise<boolean>;
//# sourceMappingURL=custom.d.ts.map