/**
 * Codebase analyzer - detects project type, frameworks, and patterns
 */
import type { CodebaseAnalysis, MonorepoInfo } from '../types/codebase.js';
export declare class CodebaseAnalyzer {
    private projectRoot;
    constructor(projectRoot: string);
    analyze(): Promise<CodebaseAnalysis>;
    private detectProjectType;
    private detectFramework;
    private getDependencies;
    private categorizeDependency;
    private detectPatterns;
    private inferAgents;
    private inferSkills;
    /**
     * Sample important files for AI generation context
     * Prioritizes configuration files, entry points, and representative code
     */
    private sampleFiles;
    /**
     * Try to add a file to sampled files array
     */
    private tryAddFile;
    /**
     * Detect if project is a monorepo and identify packages
     */
    detectMonorepo(): Promise<MonorepoInfo | null>;
}
//# sourceMappingURL=codebase-analyzer.d.ts.map