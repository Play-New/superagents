/**
 * Compressed prompt templates for AI generation
 *
 * Design goals:
 * - Reduce token usage by 30-50%
 * - Remove redundancy and verbose examples
 * - Use concise language while maintaining quality
 */
import type { GenerationContext } from '../types/generation.js';
/**
 * Summarize a file to its essential structure (imports, exports, function signatures)
 * This reduces token usage significantly compared to full file content
 */
export declare function summarizeFile(content: string, filename: string): string;
/**
 * Build compact context section for prompts
 */
export declare function buildContextSection(context: GenerationContext): string;
/**
 * Build compact file samples section
 */
export declare function buildSamplesSection(context: GenerationContext, maxFiles?: number): string;
/**
 * Compressed agent prompt template
 * Targets <=400 tokens, project-specific only
 */
export declare function buildAgentPrompt(agentName: string, context: GenerationContext): string;
/**
 * Compressed skill prompt template
 * Targets <=300 tokens, conventions only
 */
export declare function buildSkillPrompt(skillName: string, context: GenerationContext): string;
/**
 * Compressed CLAUDE.md prompt template
 * Targets <=50 instructions, ~700 tokens output
 */
export declare function buildClaudeMdPrompt(context: GenerationContext): string;
//# sourceMappingURL=templates.d.ts.map