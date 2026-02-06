/**
 * Codebase analyzer - detects project type, frameworks, and patterns
 */
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
/** Default ignore patterns always applied to glob operations */
const DEFAULT_IGNORE_PATTERNS = [
    'node_modules/**',
    '.git/**',
    '.next/**',
    'dist/**',
    'build/**',
    'coverage/**'
];
/**
 * Parse a .superagentsignore file into an array of glob ignore patterns.
 * Follows gitignore conventions: blank lines and lines starting with # are skipped.
 */
function parseIgnoreFile(content) {
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'));
}
export class CodebaseAnalyzer {
    projectRoot;
    constructor(projectRoot) {
        this.projectRoot = projectRoot;
    }
    async analyze() {
        const startTime = Date.now();
        // Load user-defined ignore patterns from .superagentsignore (if present)
        const userIgnorePatterns = await this.loadIgnorePatterns();
        // Run analysis in parallel for performance
        const [projectType, framework, hasPackageJson, hasTsConfig, monorepo] = await Promise.all([
            this.detectProjectType(),
            this.detectFramework(),
            fs.pathExists(path.join(this.projectRoot, 'package.json')),
            fs.pathExists(path.join(this.projectRoot, 'tsconfig.json')),
            this.detectMonorepo()
        ]);
        const language = hasTsConfig ? 'typescript' : 'javascript';
        // Get dependencies if package.json exists
        const dependencies = hasPackageJson
            ? await this.getDependencies()
            : [];
        // Get dev dependencies if package.json exists
        const devDependencies = hasPackageJson
            ? await this.getDevDependencies()
            : [];
        // Detect patterns
        const patterns = await this.detectPatterns(userIgnorePatterns);
        // Count files and lines
        const { totalFiles, totalLines } = await this.countFilesAndLines(userIgnorePatterns);
        // Sample important files for AI generation context
        const sampledFiles = await this.sampleFiles(projectType, framework, patterns, userIgnorePatterns);
        // Infer agents and skills based on what we found
        const suggestedAgents = this.inferAgents(projectType, patterns);
        const suggestedSkills = this.inferSkills(framework, [...dependencies, ...devDependencies]);
        return {
            projectRoot: this.projectRoot,
            projectType,
            language,
            framework,
            dependencies,
            devDependencies,
            fileStructure: [],
            totalFiles,
            totalLines,
            detectedPatterns: patterns,
            suggestedSkills,
            suggestedAgents,
            existingClaudeConfig: null,
            mcpServers: [],
            monorepo,
            sampledFiles,
            analyzedAt: new Date().toISOString(),
            analysisTimeMs: Date.now() - startTime
        };
    }
    /**
     * Load and parse .superagentsignore from project root.
     * Returns an empty array if the file does not exist.
     */
    async loadIgnorePatterns() {
        const ignorePath = path.join(this.projectRoot, '.superagentsignore');
        try {
            if (await fs.pathExists(ignorePath)) {
                const content = await fs.readFile(ignorePath, 'utf-8');
                return parseIgnoreFile(content);
            }
        }
        catch {
            // If we can't read the ignore file, proceed without it
        }
        return [];
    }
    /**
     * Build the full ignore list by merging defaults with user patterns
     */
    buildIgnorePatterns(userPatterns) {
        return [...DEFAULT_IGNORE_PATTERNS, ...userPatterns];
    }
    async detectProjectType() {
        // Check for Next.js
        const nextConfigFiles = [
            'next.config.js',
            'next.config.mjs',
            'next.config.ts'
        ];
        for (const configFile of nextConfigFiles) {
            if (await fs.pathExists(path.join(this.projectRoot, configFile))) {
                return 'nextjs';
            }
        }
        // Check package.json for framework dependencies
        const pkgPath = path.join(this.projectRoot, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            const deps = { ...pkg.dependencies, ...pkg.devDependencies };
            if (deps['next'])
                return 'nextjs';
            if (deps['react'])
                return 'react';
            if (deps['vue'])
                return 'vue';
            if (deps['express'] || deps['fastify'])
                return 'node';
        }
        // Check for other project types
        if (await fs.pathExists(path.join(this.projectRoot, 'requirements.txt'))) {
            return 'python';
        }
        if (await fs.pathExists(path.join(this.projectRoot, 'go.mod'))) {
            return 'go';
        }
        if (await fs.pathExists(path.join(this.projectRoot, 'Cargo.toml'))) {
            return 'rust';
        }
        return 'unknown';
    }
    async detectFramework() {
        const pkgPath = path.join(this.projectRoot, 'package.json');
        if (!(await fs.pathExists(pkgPath))) {
            return null;
        }
        const pkg = await fs.readJson(pkgPath);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        if (deps['next'])
            return 'nextjs';
        if (deps['@nuxt/core'])
            return 'nuxtjs';
        if (deps['vue'])
            return 'vue';
        if (deps['@angular/core'])
            return 'angular';
        if (deps['svelte'])
            return 'svelte';
        if (deps['express'])
            return 'express';
        if (deps['fastify'])
            return 'fastify';
        if (deps['@nestjs/core'])
            return 'nestjs';
        return null;
    }
    async getDependencies() {
        const pkgPath = path.join(this.projectRoot, 'package.json');
        const pkg = await fs.readJson(pkgPath);
        return Object.entries(pkg.dependencies || {}).map(([name, version]) => ({
            name,
            version: version,
            category: this.categorizeDependency(name)
        }));
    }
    async getDevDependencies() {
        const pkgPath = path.join(this.projectRoot, 'package.json');
        const pkg = await fs.readJson(pkgPath);
        return Object.entries(pkg.devDependencies || {}).map(([name, version]) => ({
            name,
            version: version,
            category: this.categorizeDependency(name)
        }));
    }
    async countFilesAndLines(userIgnorePatterns = []) {
        try {
            const codeFiles = await glob('**/*.{ts,tsx,js,jsx,py,go,rs,java,rb,php,cs}', {
                cwd: this.projectRoot,
                ignore: this.buildIgnorePatterns(userIgnorePatterns),
                nodir: true
            });
            let totalLines = 0;
            for (const file of codeFiles) {
                try {
                    const content = await fs.readFile(path.join(this.projectRoot, file), 'utf-8');
                    totalLines += content.split('\n').length;
                }
                catch {
                    // Skip unreadable files
                }
            }
            return { totalFiles: codeFiles.length, totalLines };
        }
        catch {
            return { totalFiles: 0, totalLines: 0 };
        }
    }
    categorizeDependency(name) {
        // UI libraries
        if (['react', 'vue', '@angular/core', 'svelte'].includes(name))
            return 'framework';
        if (['tailwindcss', '@shadcn/ui', 'styled-components'].includes(name))
            return 'ui';
        // Database
        if (['postgres', 'mysql', 'mongodb', 'redis'].some(db => name.includes(db)))
            return 'database';
        // ORM
        if (['prisma', 'drizzle-orm', 'typeorm', 'sequelize'].includes(name))
            return 'orm';
        // Auth
        if (['next-auth', '@clerk/nextjs', '@supabase/auth'].some(auth => name.includes(auth)))
            return 'auth';
        // Payments
        if (['stripe', '@stripe/stripe-js', 'paypal'].some(pay => name.includes(pay)))
            return 'payments';
        // Testing
        if (['vitest', 'jest', 'playwright', 'cypress'].includes(name))
            return 'testing';
        // Build tools
        if (['vite', 'webpack', 'esbuild', 'turbo'].includes(name))
            return 'build';
        return 'other';
    }
    async detectPatterns(userIgnorePatterns = []) {
        const patterns = [];
        const ignorePatterns = this.buildIgnorePatterns(userIgnorePatterns);
        try {
            // API routes (Next.js App Router + Express-style)
            const apiRoutes = await glob('**/app/**/route.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (apiRoutes.length > 0) {
                patterns.push({
                    type: 'api-routes',
                    paths: apiRoutes,
                    confidence: 1.0,
                    description: 'Next.js App Router API routes'
                });
            }
            // Server actions
            const serverActions = await glob('**/actions/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (serverActions.length > 0) {
                patterns.push({
                    type: 'server-actions',
                    paths: serverActions,
                    confidence: 0.8,
                    description: 'Server actions'
                });
            }
            // React components
            const components = await glob('**/components/**/*.{tsx,jsx}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (components.length > 0) {
                patterns.push({
                    type: 'components',
                    paths: components,
                    confidence: 1.0,
                    description: 'React components'
                });
            }
            // Services
            const services = await glob('**/{services,service}/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (services.length > 0) {
                patterns.push({
                    type: 'services',
                    paths: services,
                    confidence: 0.9,
                    description: 'Service layer modules'
                });
            }
            // Models / entities
            const models = await glob('**/{models,entities,schemas}/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (models.length > 0) {
                patterns.push({
                    type: 'models',
                    paths: models,
                    confidence: 0.9,
                    description: 'Data models or entities'
                });
            }
            // Controllers
            const controllers = await glob('**/{controllers,controller}/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (controllers.length > 0) {
                patterns.push({
                    type: 'controllers',
                    paths: controllers,
                    confidence: 0.9,
                    description: 'Controller modules'
                });
            }
            // Middleware
            const middleware = await glob('**/{middleware,middlewares}/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (middleware.length > 0) {
                patterns.push({
                    type: 'middleware',
                    paths: middleware,
                    confidence: 0.9,
                    description: 'Middleware modules'
                });
            }
            // Hooks
            const hooks = await glob('**/{hooks,composables}/**/*.{ts,tsx,js,jsx}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (hooks.length > 0) {
                patterns.push({
                    type: 'hooks',
                    paths: hooks,
                    confidence: 0.9,
                    description: 'Custom hooks or composables'
                });
            }
            // Utils
            const utils = await glob('**/{utils,helpers,lib}/**/*.{ts,js}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (utils.length > 0) {
                patterns.push({
                    type: 'utils',
                    paths: utils,
                    confidence: 0.7,
                    description: 'Utility and helper modules'
                });
            }
            // Tests
            const tests = await glob('**/*.{test,spec}.{ts,tsx,js,jsx}', {
                cwd: this.projectRoot,
                ignore: ignorePatterns
            });
            if (tests.length > 0) {
                patterns.push({
                    type: 'tests',
                    paths: tests,
                    confidence: 1.0,
                    description: 'Test files'
                });
            }
        }
        catch {
            // Ignore glob errors
        }
        return patterns;
    }
    inferAgents(projectType, patterns) {
        const agents = new Set();
        // Always useful
        agents.add('code-reviewer');
        agents.add('debugger');
        // Based on project type
        if (projectType === 'nextjs' || projectType === 'react' || projectType === 'vue') {
            agents.add('backend-engineer');
        }
        // Based on patterns
        if (patterns.some(p => p.type === 'components')) {
            agents.add('backend-engineer');
        }
        if (patterns.some(p => p.type === 'api-routes')) {
            agents.add('backend-engineer');
        }
        return Array.from(agents);
    }
    inferSkills(framework, dependencies) {
        const skills = new Set();
        // Framework-based
        if (framework) {
            skills.add(framework);
        }
        // Dependency-based
        for (const dep of dependencies) {
            if (dep.name === 'typescript')
                skills.add('typescript');
            if (dep.name === 'tailwindcss')
                skills.add('tailwind');
            if (dep.name === '@supabase/supabase-js')
                skills.add('supabase');
            if (dep.name === 'stripe')
                skills.add('stripe');
            if (dep.name.startsWith('prisma'))
                skills.add('prisma');
            if (dep.name === 'drizzle-orm')
                skills.add('drizzle');
        }
        return Array.from(skills);
    }
    /**
     * Sample important files for AI generation context
     * Prioritizes configuration files, entry points, and representative code
     */
    async sampleFiles(projectType, _framework, patterns, userIgnorePatterns = []) {
        const sampledFiles = [];
        const maxFiles = 20;
        const maxFileSize = 100000; // 100KB max per file
        const maxLines = 500; // Max 500 lines per file
        const ignorePatterns = this.buildIgnorePatterns(userIgnorePatterns);
        try {
            // Always include package.json and tsconfig if they exist
            await this.tryAddFile(sampledFiles, 'package.json', 'Project dependencies and scripts', ignorePatterns);
            await this.tryAddFile(sampledFiles, 'tsconfig.json', 'TypeScript configuration', ignorePatterns);
            // Include framework config files
            if (projectType === 'nextjs') {
                await this.tryAddFile(sampledFiles, 'next.config.js', 'Next.js configuration', ignorePatterns);
                await this.tryAddFile(sampledFiles, 'next.config.mjs', 'Next.js configuration', ignorePatterns);
                await this.tryAddFile(sampledFiles, 'next.config.ts', 'Next.js configuration', ignorePatterns);
            }
            // Sample a few files from each pattern type
            for (const pattern of patterns) {
                const filesToSample = Math.min(3, pattern.paths.length);
                for (let i = 0; i < filesToSample && sampledFiles.length < maxFiles; i++) {
                    const filePath = pattern.paths[i];
                    await this.tryAddFile(sampledFiles, filePath, `Example ${pattern.type}`, ignorePatterns, maxFileSize, maxLines);
                }
            }
            // Try to find entry point files
            const entryPoints = [
                'src/index.ts',
                'src/index.js',
                'src/main.ts',
                'src/main.js',
                'index.ts',
                'index.js',
                'app/layout.tsx',
                'app/page.tsx'
            ];
            for (const entryPoint of entryPoints) {
                if (sampledFiles.length >= maxFiles)
                    break;
                await this.tryAddFile(sampledFiles, entryPoint, 'Entry point file', ignorePatterns, maxFileSize, maxLines);
            }
        }
        catch (error) {
            // If file sampling fails, continue with empty array
            console.warn('Warning: File sampling failed', error);
        }
        return sampledFiles;
    }
    /**
     * Try to add a file to sampled files array.
     * Skips files that match any of the ignore patterns.
     */
    async tryAddFile(sampledFiles, relativePath, purpose, ignorePatterns = [], maxSize = 100000, maxLines = 500) {
        // Check if the file matches any ignore pattern
        if (ignorePatterns.length > 0) {
            const matched = await glob(relativePath, {
                cwd: this.projectRoot,
                ignore: ignorePatterns,
                nodir: true
            });
            if (matched.length === 0) {
                // File is either ignored or doesn't exist — check existence separately
                const fullPath = path.join(this.projectRoot, relativePath);
                if (await fs.pathExists(fullPath)) {
                    // File exists but is ignored
                    return;
                }
            }
        }
        const fullPath = path.join(this.projectRoot, relativePath);
        try {
            if (!(await fs.pathExists(fullPath))) {
                return;
            }
            const stats = await fs.stat(fullPath);
            // Skip if file is too large
            if (stats.size > maxSize) {
                return;
            }
            let content = await fs.readFile(fullPath, 'utf-8');
            // Truncate if too many lines
            const lines = content.split('\n');
            if (lines.length > maxLines) {
                content = lines.slice(0, maxLines).join('\n') + '\n\n[... truncated ...]';
            }
            sampledFiles.push({
                path: relativePath,
                content,
                purpose
            });
        }
        catch {
            // Silently skip files that can't be read
        }
    }
    /**
     * Detect if project is a monorepo and identify packages
     */
    async detectMonorepo() {
        const pkgPath = path.join(this.projectRoot, 'package.json');
        if (!(await fs.pathExists(pkgPath))) {
            return null;
        }
        const pkg = await fs.readJson(pkgPath);
        let tool = null;
        let workspaceGlobs = [];
        // Check for npm/yarn workspaces
        if (pkg.workspaces) {
            workspaceGlobs = Array.isArray(pkg.workspaces) ? pkg.workspaces : pkg.workspaces.packages || [];
            tool = 'npm';
            // Check for yarn specifically
            if (await fs.pathExists(path.join(this.projectRoot, 'yarn.lock'))) {
                tool = 'yarn';
            }
        }
        // Check for pnpm workspace
        const pnpmWorkspacePath = path.join(this.projectRoot, 'pnpm-workspace.yaml');
        if (await fs.pathExists(pnpmWorkspacePath)) {
            tool = 'pnpm';
            const content = await fs.readFile(pnpmWorkspacePath, 'utf-8');
            const match = content.match(/packages:\s*\n([\s\S]*?)(?=\n\w|\n$|$)/);
            if (match) {
                workspaceGlobs = match[1]
                    .split('\n')
                    .map(line => line.trim().replace(/^-\s*['"]?|['"]?$/g, ''))
                    .filter(line => line.length > 0);
            }
        }
        // Check for lerna
        const lernaPath = path.join(this.projectRoot, 'lerna.json');
        if (await fs.pathExists(lernaPath)) {
            tool = 'lerna';
            const lerna = await fs.readJson(lernaPath);
            workspaceGlobs = lerna.packages || ['packages/*'];
        }
        // Check for turborepo
        const turboPath = path.join(this.projectRoot, 'turbo.json');
        if (await fs.pathExists(turboPath)) {
            tool = 'turborepo';
        }
        // Check for nx
        const nxPath = path.join(this.projectRoot, 'nx.json');
        if (await fs.pathExists(nxPath)) {
            tool = 'nx';
        }
        // If no monorepo tool found, return null
        if (!tool || workspaceGlobs.length === 0) {
            return null;
        }
        // Find all packages matching the workspace globs
        const packages = [];
        for (const workspaceGlob of workspaceGlobs) {
            const matchingPaths = await glob(workspaceGlob, {
                cwd: this.projectRoot,
                ignore: ['node_modules/**']
            });
            for (const relativePath of matchingPaths) {
                const packagePath = path.join(this.projectRoot, relativePath);
                const packageJsonPath = path.join(packagePath, 'package.json');
                const hasPackageJson = await fs.pathExists(packageJsonPath);
                let name = path.basename(relativePath);
                if (hasPackageJson) {
                    const packageJson = await fs.readJson(packageJsonPath);
                    name = packageJson.name || name;
                }
                packages.push({
                    name,
                    path: packagePath,
                    relativePath,
                    hasPackageJson
                });
            }
        }
        return {
            isMonorepo: packages.length > 0,
            tool,
            rootPackageJson: pkgPath,
            packages,
            workspaceGlobs
        };
    }
}
//# sourceMappingURL=codebase-analyzer.js.map