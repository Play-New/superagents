/**
 * Interactive prompts using @clack/prompts
 */
import type { GoalCategory } from '../types/goal.js';
import type { Recommendations } from '../types/config.js';
import type { TargetIDE } from '../types/generation.js';
import type { MonorepoPackage } from '../types/codebase.js';
export declare function collectProjectGoal(): Promise<{
    description: string;
    category: GoalCategory;
}>;
export declare function selectIDE(): Promise<TargetIDE>;
export declare function selectModel(): Promise<'opus' | 'sonnet'>;
export declare function confirmSelections(recommendations: Recommendations): Promise<{
    agents: string[];
    skills: string[];
}>;
export declare function confirmOverwrite(dirName?: string): Promise<boolean>;
export declare function selectPackages(packages: MonorepoPackage[]): Promise<string[]>;
//# sourceMappingURL=prompts.d.ts.map