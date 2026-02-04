/**
 * Tiered model selection for cost optimization
 *
 * Uses cheaper/faster models for simpler tasks:
 * - Haiku: Simple skills, hooks, simple agents
 * - Sonnet: Complex agents, complex skills
 * - Opus: CLAUDE.md (only if user selected Opus)
 */
export const MODEL_IDS = {
    haiku: 'claude-3-5-haiku-20241022',
    sonnet: 'claude-sonnet-4-5-20250929',
    opus: 'claude-opus-4-5-20251101'
};
// Cost per 1M tokens (approximate USD)
export const MODEL_COSTS = {
    haiku: { input: 0.25, output: 1.25 },
    sonnet: { input: 3, output: 15 },
    opus: { input: 15, output: 75 }
};
// Agent complexity mapping for model selection
// Complex agents need better reasoning, simple agents can use faster models
const AGENT_COMPLEXITY = {
    // Complex agents - need sophisticated reasoning
    'architect': 'complex',
    'security-analyst': 'complex',
    'database-specialist': 'complex',
    'api-designer': 'complex',
    // Medium agents - balanced reasoning needs
    'backend-engineer': 'medium',
    'frontend-specialist': 'medium',
    'testing-specialist': 'medium',
    'code-reviewer': 'medium',
    'devops-specialist': 'medium',
    'debugger': 'medium',
    'performance-optimizer': 'medium',
    'product-manager': 'medium',
    // Simple agents - more template-like, less complex reasoning
    'designer': 'simple',
    'copywriter': 'simple',
    'docs-writer': 'simple'
};
/**
 * Select the appropriate model based on task type and complexity
 *
 * Tiering strategy:
 * - Haiku: Simple tasks (hooks, basic skills, simple agents) - 80% cost reduction vs Sonnet
 * - Sonnet: Complex tasks (complex agents, advanced skills) - baseline
 * - Opus: Only when user explicitly selects it for CLAUDE.md
 * Never exceed user's selected tier to respect budget constraints.
 */
export function selectModel(options) {
    const { userSelectedModel, generationType, complexity, itemName } = options;
    // Determine effective complexity
    let effectiveComplexity = complexity || 'medium';
    // For agents, look up specific complexity if not provided
    if (generationType === 'agent' && itemName && !complexity) {
        effectiveComplexity = AGENT_COMPLEXITY[itemName.toLowerCase()] || 'medium';
    }
    // For skills, determine complexity if not provided
    if (generationType === 'skill' && itemName && !complexity) {
        effectiveComplexity = getSkillComplexity(itemName);
    }
    // Mapping based on generation type and complexity
    let tier;
    switch (generationType) {
        case 'hook':
            tier = 'haiku'; // Hooks are simple bash scripts
            break;
        case 'skill':
            tier = effectiveComplexity === 'simple' ? 'haiku' : 'sonnet';
            break;
        case 'agent':
            // Simple agents can use haiku, complex agents need sonnet
            tier = effectiveComplexity === 'simple' ? 'haiku' :
                effectiveComplexity === 'complex' ? 'sonnet' : 'sonnet';
            break;
        case 'claude-md':
            tier = userSelectedModel; // Respect user's choice for main doc
            break;
        default:
            tier = 'sonnet';
    }
    // Never use a model more expensive than user selected
    if (tier === 'opus' && userSelectedModel === 'sonnet') {
        return MODEL_IDS.sonnet;
    }
    return MODEL_IDS[tier];
}
/**
 * Get agent complexity for a specific agent name
 */
export function getAgentComplexity(agentName) {
    return AGENT_COMPLEXITY[agentName.toLowerCase()] || 'medium';
}
/**
 * Get the tier name from a model ID
 */
export function getModelTier(modelId) {
    if (modelId.includes('haiku'))
        return 'haiku';
    if (modelId.includes('opus'))
        return 'opus';
    return 'sonnet';
}
/**
 * Determine skill complexity based on name
 */
export function getSkillComplexity(skillName) {
    const simpleSkills = [
        'markdown', 'git', 'npm', 'eslint', 'prettier',
        'yaml', 'json', 'dotenv', 'editorconfig'
    ];
    const complexSkills = [
        'nextjs', 'react', 'typescript', 'graphql', 'kubernetes',
        'docker', 'aws', 'terraform', 'prisma', 'drizzle',
        'trpc', 'nestjs', 'fastify', 'express'
    ];
    const lowerName = skillName.toLowerCase();
    if (simpleSkills.some(s => lowerName.includes(s)))
        return 'simple';
    if (complexSkills.some(s => lowerName.includes(s)))
        return 'complex';
    return 'medium';
}
/**
 * Get a human-readable model name
 */
export function getModelDisplayName(modelId) {
    if (modelId.includes('haiku'))
        return 'Haiku 3.5';
    if (modelId.includes('opus'))
        return 'Opus 4.5';
    if (modelId.includes('sonnet'))
        return 'Sonnet 4.5';
    return modelId;
}
//# sourceMappingURL=model-selector.js.map