/**
 * ROADMAP.md parser — extracts phases and tasks from markdown
 */

export interface ParsedPhase {
  number: number;
  name: string;
  tasks: { title: string; done: boolean }[];
}

/**
 * Parse ROADMAP.md content into structured phases.
 *
 * Expects `## Phase N: Name` headers and `- [x]`/`- [ ]` task lines.
 */
export function parseRoadmap(content: string): ParsedPhase[] {
  const phases: ParsedPhase[] = [];
  let currentPhase: ParsedPhase | null = null;

  for (const line of content.split('\n')) {
    // Match phase headers: ## Phase 1: Foundation
    const phaseMatch = line.match(/^## Phase (\d+):\s*(.+)/);
    if (phaseMatch) {
      if (currentPhase) {
        phases.push(currentPhase);
      }
      currentPhase = {
        number: parseInt(phaseMatch[1], 10),
        name: phaseMatch[2].trim(),
        tasks: []
      };
      continue;
    }

    // Match task lines: - [x] or - [ ]
    const taskMatch = line.match(/^- \[([ xX])\]\s+(.+)/);
    if (taskMatch && currentPhase) {
      currentPhase.tasks.push({
        title: taskMatch[2].trim(),
        done: taskMatch[1].toLowerCase() === 'x'
      });
    }
  }

  // Push last phase
  if (currentPhase) {
    phases.push(currentPhase);
  }

  return phases;
}
