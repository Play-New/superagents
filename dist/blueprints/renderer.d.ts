/**
 * ROADMAP.md renderer — generates clean parseable markdown from a blueprint
 */
import type { BlueprintDefinition } from '../types/blueprint.js';
import type { GenerationContext } from '../types/generation.js';
/**
 * Render a ROADMAP.md from a blueprint definition.
 *
 * Format uses `## Phase N:` headers and `- [ ]`/`- [x]` task markers
 * so the status command can parse progress.
 */
export declare function renderRoadmap(blueprint: BlueprintDefinition, _context: GenerationContext): string;
//# sourceMappingURL=renderer.d.ts.map