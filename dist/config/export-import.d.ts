/**
 * Export/Import configurations for team sharing
 *
 * Export: Creates a zip file with .claude/ contents and metadata
 * Import: Extracts zip file and restores .claude/ configuration
 */
interface ExportMetadata {
    version: string;
    exportedAt: string;
    projectRoot: string;
    agents: string[];
    skills: string[];
    hasHooks: boolean;
    hasCLAUDEmd: boolean;
}
/**
 * Export .claude/ configuration to a zip file
 */
export declare function exportConfig(projectRoot: string, outputPath: string): Promise<{
    path: string;
    metadata: ExportMetadata;
}>;
/**
 * Import configuration from a zip file
 */
export declare function importConfig(zipPath: string, projectRoot: string, overwrite?: boolean): Promise<{
    metadata: ExportMetadata;
    filesWritten: number;
}>;
/**
 * Preview contents of a config zip file
 */
export declare function previewConfig(zipPath: string): Promise<ExportMetadata | null>;
export {};
//# sourceMappingURL=export-import.d.ts.map