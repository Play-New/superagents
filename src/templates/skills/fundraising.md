---
name: fundraising
description: |
  Fundraising strategy and investor materials conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Fundraising — Project Conventions

- Pitch deck: 10-12 slides (Problem, Solution, Traction, Market, Model, Competition, Team, Financials, Ask)
- Market sizing: always include bottom-up calculation, not just top-down TAM
- Send monthly investor updates even when news is bad — silence destroys trust
- Keep cap table clean from Day 1 — messy cap tables kill deals
- Term sheet focus: liquidation preference, anti-dilution, board composition matter more than valuation
- Data room ready: corporate docs, financials, legal, product, team materials organized before outreach
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}

## Integration
- Financial models: link to financial-planning skill for projections and unit economics
- Metrics: pull live data from dashboard for investor updates

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
