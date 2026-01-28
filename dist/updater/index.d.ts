/**
 * Config updater - incrementally update .claude/ folder
 */
import type { GenerationContext, SettingsJson } from '../types/generation.js';
interface ExistingConfig {
    agents: string[];
    skills: string[];
    settings: SettingsJson;
}
export declare class ConfigUpdater {
    private projectRoot;
    private claudeDir;
    constructor(projectRoot: string);
    /**
     * Check if .claude/ directory exists
     */
    hasExistingConfig(): Promise<boolean>;
    /**
     * Read existing configuration
     */
    readExisting(): Promise<ExistingConfig>;
    /**
     * Prompt user to select what to update
     */
    promptUpdateOptions(existing: ExistingConfig, available: {
        agents: string[];
        skills: string[];
    }): Promise<{
        agentsToAdd: string[];
        agentsToRemove: string[];
        skillsToAdd: string[];
        skillsToRemove: string[];
        regenerateClaudeMd: boolean;
    }>;
    /**
     * Apply updates to the configuration
     */
    applyUpdates(context: GenerationContext, updates: {
        agentsToAdd: string[];
        agentsToRemove: string[];
        skillsToAdd: string[];
        skillsToRemove: string[];
        regenerateClaudeMd: boolean;
    }): Promise<{
        added: {
            agents: string[];
            skills: string[];
        };
        removed: {
            agents: string[];
            skills: string[];
        };
        regenerated: boolean;
    }>;
    /**
     * Update settings.json after changes
     */
    private updateSettings;
}
export {};
//# sourceMappingURL=index.d.ts.map