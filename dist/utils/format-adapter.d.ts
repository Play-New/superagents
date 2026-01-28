/**
 * Format adapter - converts between Claude and Cursor formats
 */
/**
 * Convert Claude markdown content to Cursor .mdc format
 * Cursor rules use frontmatter for metadata and support glob patterns
 */
export declare function toCursorFormat(content: string, options: {
    name: string;
    description?: string;
    globs?: string[];
}): string;
/**
 * Get default globs for a skill based on its name
 */
export declare function getSkillGlobs(skillName: string): string[];
/**
 * Get default globs for an agent based on its name
 */
export declare function getAgentGlobs(agentName: string): string[];
//# sourceMappingURL=format-adapter.d.ts.map