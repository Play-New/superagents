/**
 * Export/Import configurations for team sharing
 *
 * Export: Creates a zip file with .claude/ contents and metadata
 * Import: Extracts zip file and restores .claude/ configuration
 */

import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';
import unzipper from 'unzipper';

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
export async function exportConfig(
  projectRoot: string,
  outputPath: string
): Promise<{ path: string; metadata: ExportMetadata }> {
  const claudeDir = path.join(projectRoot, '.claude');
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');

  // Check if .claude/ exists
  if (!(await fs.pathExists(claudeDir))) {
    throw new Error('No .claude/ configuration found. Run superagents first to generate one.');
  }

  // Collect metadata
  const agentsDir = path.join(claudeDir, 'agents');
  const skillsDir = path.join(claudeDir, 'skills');
  const hooksDir = path.join(claudeDir, 'hooks');

  const agents: string[] = [];
  const skills: string[] = [];

  if (await fs.pathExists(agentsDir)) {
    const files = await fs.readdir(agentsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        agents.push(file.replace('.md', ''));
      }
    }
  }

  if (await fs.pathExists(skillsDir)) {
    const files = await fs.readdir(skillsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        skills.push(file.replace('.md', ''));
      }
    }
  }

  const metadata: ExportMetadata = {
    version: '1.3.0',
    exportedAt: new Date().toISOString(),
    projectRoot: path.basename(projectRoot),
    agents,
    skills,
    hasHooks: await fs.pathExists(hooksDir),
    hasCLAUDEmd: await fs.pathExists(claudeMdPath)
  };

  // Create output directory if it doesn't exist
  await fs.ensureDir(path.dirname(outputPath));

  // Create zip file
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      resolve({ path: outputPath, metadata });
    });

    archive.on('error', reject);

    archive.pipe(output);

    // Add metadata file
    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });

    // Add .claude/ directory
    archive.directory(claudeDir, '.claude');

    // Add CLAUDE.md if it exists
    if (metadata.hasCLAUDEmd) {
      archive.file(claudeMdPath, { name: 'CLAUDE.md' });
    }

    archive.finalize();
  });
}

/**
 * Import configuration from a zip file
 */
export async function importConfig(
  zipPath: string,
  projectRoot: string,
  overwrite = false
): Promise<{ metadata: ExportMetadata; filesWritten: number }> {
  // Check if zip file exists
  if (!(await fs.pathExists(zipPath))) {
    throw new Error(`File not found: ${zipPath}`);
  }

  const claudeDir = path.join(projectRoot, '.claude');
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');

  // Check for existing configuration
  if ((await fs.pathExists(claudeDir)) && !overwrite) {
    throw new Error('Existing .claude/ configuration found. Use --force to overwrite.');
  }

  // Extract to temp directory first
  const tempDir = path.join(projectRoot, '.superagents-import-temp');
  await fs.remove(tempDir);
  await fs.ensureDir(tempDir);

  let filesWritten = 0;
  let metadata: ExportMetadata | null = null;

  try {
    // Extract zip
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', resolve)
        .on('error', reject);
    });

    // Read metadata
    const metadataPath = path.join(tempDir, 'metadata.json');
    if (await fs.pathExists(metadataPath)) {
      metadata = await fs.readJSON(metadataPath);
    }

    // Remove existing .claude/ if overwriting
    if (await fs.pathExists(claudeDir)) {
      await fs.remove(claudeDir);
    }

    // Move .claude/ directory
    const extractedClaudeDir = path.join(tempDir, '.claude');
    if (await fs.pathExists(extractedClaudeDir)) {
      await fs.move(extractedClaudeDir, claudeDir);
      // Count files
      const countFiles = async (dir: string): Promise<number> => {
        let count = 0;
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
          if (item.isFile()) {
            count++;
          } else if (item.isDirectory()) {
            count += await countFiles(path.join(dir, item.name));
          }
        }
        return count;
      };
      filesWritten += await countFiles(claudeDir);
    }

    // Move CLAUDE.md if it exists
    const extractedClaudeMd = path.join(tempDir, 'CLAUDE.md');
    if (await fs.pathExists(extractedClaudeMd)) {
      await fs.move(extractedClaudeMd, claudeMdPath, { overwrite: true });
      filesWritten++;
    }

  } finally {
    // Cleanup temp directory
    await fs.remove(tempDir);
  }

  if (!metadata) {
    metadata = {
      version: 'unknown',
      exportedAt: 'unknown',
      projectRoot: 'unknown',
      agents: [],
      skills: [],
      hasHooks: false,
      hasCLAUDEmd: false
    };
  }

  return { metadata, filesWritten };
}

/**
 * Preview contents of a config zip file
 */
export async function previewConfig(zipPath: string): Promise<ExportMetadata | null> {
  if (!(await fs.pathExists(zipPath))) {
    throw new Error(`File not found: ${zipPath}`);
  }

  return new Promise((resolve, reject) => {
    let metadata: ExportMetadata | null = null;

    fs.createReadStream(zipPath)
      .pipe(unzipper.Parse())
      .on('entry', async (entry) => {
        if (entry.path === 'metadata.json') {
          const content = await entry.buffer();
          metadata = JSON.parse(content.toString());
        } else {
          entry.autodrain();
        }
      })
      .on('close', () => resolve(metadata))
      .on('error', reject);
  });
}
