/**
 * Cursor output writer - creates .cursor/rules/ folder structure
 */

import fs from 'fs-extra';
import path from 'path';
import type { GeneratedOutputs, WriteSummary } from '../types/generation.js';
import { confirmOverwrite } from '../cli/prompts.js';
import { toCursorFormat, getSkillGlobs, getAgentGlobs } from '../utils/format-adapter.js';

export class CursorWriter {
  constructor(private projectRoot: string) {}

  async writeAll(outputs: GeneratedOutputs): Promise<WriteSummary> {
    const cursorDir = path.join(this.projectRoot, '.cursor');
    const rulesDir = path.join(cursorDir, 'rules');

    // Check for existing .cursor directory
    if (await fs.pathExists(cursorDir)) {
      const overwrite = await confirmOverwrite('.cursor');
      if (!overwrite) {
        throw new Error('User cancelled: .cursor directory already exists');
      }
      await fs.remove(rulesDir);
    }

    // Create directory structure
    await fs.ensureDir(path.join(rulesDir, 'agents'));
    await fs.ensureDir(path.join(rulesDir, 'skills'));

    // Write project.mdc (main context file, similar to CLAUDE.md)
    const projectContent = toCursorFormat(outputs.claudeMd, {
      name: 'Project Context',
      description: 'Main project guidelines and context'
    });
    await fs.writeFile(
      path.join(rulesDir, 'project.mdc'),
      projectContent,
      'utf-8'
    );

    // Write agents
    for (const agent of outputs.agents) {
      const agentContent = toCursorFormat(agent.content, {
        name: agent.agentName,
        description: `${agent.agentName} agent rules`,
        globs: getAgentGlobs(agent.agentName)
      });
      const filename = agent.filename.replace('.md', '.mdc');
      await fs.writeFile(
        path.join(rulesDir, 'agents', filename),
        agentContent,
        'utf-8'
      );
    }

    // Write skills
    for (const skill of outputs.skills) {
      const skillContent = toCursorFormat(skill.content, {
        name: skill.skillName,
        description: `${skill.skillName} knowledge`,
        globs: getSkillGlobs(skill.skillName)
      });
      const filename = skill.filename.replace('.md', '.mdc');
      await fs.writeFile(
        path.join(rulesDir, 'skills', filename),
        skillContent,
        'utf-8'
      );
    }

    return {
      totalFiles: outputs.agents.length + outputs.skills.length + 1,
      agents: outputs.agents.map(a => a.agentName),
      skills: outputs.skills.map(s => s.skillName),
      claudeDir: rulesDir
    };
  }
}
