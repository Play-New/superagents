/**
 * Cursor output writer - creates .cursor/rules/ folder structure
 */
import type { GeneratedOutputs, WriteSummary } from '../types/generation.js';
export declare class CursorWriter {
    private projectRoot;
    constructor(projectRoot: string);
    writeAll(outputs: GeneratedOutputs): Promise<WriteSummary>;
}
//# sourceMappingURL=cursor-writer.d.ts.map