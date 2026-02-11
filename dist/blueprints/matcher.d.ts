/**
 * Blueprint matcher — scores blueprints against project goal and spec
 * Pure logic, no AI calls
 */
import type { BlueprintMatch } from '../types/blueprint.js';
import type { ProjectGoal, ProjectSpec } from '../types/goal.js';
/**
 * Match blueprints against a project goal and optional spec.
 *
 * Scoring:
 * - Category match: +40 per matching category
 * - Keyword overlap: +5 per keyword found in goal description or spec fields
 * - Stack match: +15 per stack signal in spec.stack
 * - Focus match: +10 if blueprint aligns with spec.focus
 *
 * Returns top 3 matches with score > 20, sorted descending.
 */
export declare function matchBlueprints(goal: ProjectGoal, spec?: ProjectSpec): BlueprintMatch[];
//# sourceMappingURL=matcher.d.ts.map