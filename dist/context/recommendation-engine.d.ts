/**
 * Recommendation engine - combines goal and codebase analysis
 */
import type { ProjectGoal } from '../types/goal.js';
import type { CodebaseAnalysis } from '../types/codebase.js';
import type { Recommendations } from '../types/config.js';
export declare class RecommendationEngine {
    private static readonly TECH_KEYWORDS;
    recommend(goal: ProjectGoal, codebase: CodebaseAnalysis): Recommendations;
    /**
     * Extract technology keywords from goal description
     */
    private extractTechnologies;
}
//# sourceMappingURL=recommendation-engine.d.ts.map