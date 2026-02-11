---
name: financial-planning
description: |
  Financial modeling and KPI tracking conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Financial Planning — Project Conventions

- Track unit economics: CAC, LTV, ARPU, payback period, gross margin
- LTV/CAC ratio must be >3x; payback period <12 months for healthy SaaS
- Use Rule of 40 (Growth% + Margin% > 40%) as efficiency benchmark
- Runway calculations: use trailing 3-month average burn, not single month
- Model 3 scenarios (conservative, base, optimistic) for every projection
- Revenue recognized is not cash received — track accounts receivable separately
- CAC includes ALL sales and marketing costs, not just ad spend
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}

## Integration
- Dashboard: surface MRR, ARR, churn, burn rate, runway as core KPIs
- Pricing: calculate blended ARPU across tiers, validate with unit economics

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`
