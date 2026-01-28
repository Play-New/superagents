/**
 * Custom templates - user-provided agent/skill templates
 *
 * Location: ~/.superagents/templates/
 * Structure:
 *   ~/.superagents/templates/
 *   ├── agents/
 *   │   └── custom-agent.md
 *   └── skills/
 *       └── custom-skill.md
 */
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
const CUSTOM_TEMPLATES_DIR = path.join(os.homedir(), '.superagents', 'templates');
/**
 * Initialize custom templates directory
 */
export async function initCustomTemplatesDir() {
    await fs.ensureDir(path.join(CUSTOM_TEMPLATES_DIR, 'agents'));
    await fs.ensureDir(path.join(CUSTOM_TEMPLATES_DIR, 'skills'));
}
/**
 * Get the custom templates directory path
 */
export function getCustomTemplatesDir() {
    return CUSTOM_TEMPLATES_DIR;
}
/**
 * Check if a custom template exists
 */
export async function hasCustomTemplate(type, name) {
    const templatePath = path.join(CUSTOM_TEMPLATES_DIR, type === 'agent' ? 'agents' : 'skills', `${name.toLowerCase()}.md`);
    return fs.pathExists(templatePath);
}
/**
 * Load a custom template with variable substitution
 */
export async function loadCustomTemplate(type, name, context) {
    const templatePath = path.join(CUSTOM_TEMPLATES_DIR, type === 'agent' ? 'agents' : 'skills', `${name.toLowerCase()}.md`);
    if (!(await fs.pathExists(templatePath))) {
        return null;
    }
    const template = await fs.readFile(templatePath, 'utf-8');
    return renderTemplate(template, context);
}
/**
 * Render template with context variables
 */
function renderTemplate(template, context) {
    const vars = {
        projectName: context.goal.description.split(' ').slice(0, 3).join(' '),
        goal: context.goal.description,
        category: context.goal.category,
        framework: context.codebase.framework || 'none',
        language: context.codebase.language || 'javascript',
        dependencies: context.codebase.dependencies.slice(0, 10).map(d => d.name).join(', '),
        patterns: context.codebase.detectedPatterns.map(p => `${p.type}: ${p.description}`).join('\n'),
        skills: context.selectedSkills.join(', '),
        agents: context.selectedAgents.join(', '),
        model: context.selectedModel,
        generatedAt: new Date(context.generatedAt).toLocaleString()
    };
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
        const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        result = result.replace(pattern, value || '');
    }
    return result;
}
/**
 * List all custom templates
 */
export async function listCustomTemplates() {
    const agents = [];
    const skills = [];
    const agentsDir = path.join(CUSTOM_TEMPLATES_DIR, 'agents');
    const skillsDir = path.join(CUSTOM_TEMPLATES_DIR, 'skills');
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
    return { agents, skills };
}
/**
 * Export a built-in template to custom templates directory
 */
export async function exportTemplate(type, name, builtInTemplatesDir) {
    const sourcePath = path.join(builtInTemplatesDir, type === 'agent' ? 'agents' : 'skills', `${name.toLowerCase()}.md`);
    const destPath = path.join(CUSTOM_TEMPLATES_DIR, type === 'agent' ? 'agents' : 'skills', `${name.toLowerCase()}.md`);
    if (!(await fs.pathExists(sourcePath))) {
        return false;
    }
    await initCustomTemplatesDir();
    await fs.copy(sourcePath, destPath);
    return true;
}
/**
 * Import a template file to custom templates directory
 */
export async function importTemplate(type, sourcePath, name) {
    if (!(await fs.pathExists(sourcePath))) {
        return false;
    }
    await initCustomTemplatesDir();
    const templateName = name || path.basename(sourcePath, '.md');
    const destPath = path.join(CUSTOM_TEMPLATES_DIR, type === 'agent' ? 'agents' : 'skills', `${templateName.toLowerCase()}.md`);
    await fs.copy(sourcePath, destPath);
    return true;
}
/**
 * Delete a custom template
 */
export async function deleteCustomTemplate(type, name) {
    const templatePath = path.join(CUSTOM_TEMPLATES_DIR, type === 'agent' ? 'agents' : 'skills', `${name.toLowerCase()}.md`);
    if (!(await fs.pathExists(templatePath))) {
        return false;
    }
    await fs.remove(templatePath);
    return true;
}
//# sourceMappingURL=custom.js.map