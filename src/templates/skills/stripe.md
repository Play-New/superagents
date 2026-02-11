---
name: stripe
description: |
  Stripe payment and subscription conventions for this project.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, mcp__context7__resolve-library-id, mcp__context7__query-docs
---

# Stripe — Project Conventions

- Never trust client-side payment confirmation — always verify via webhooks
- Use Stripe Checkout over custom forms when possible (handles PCI, 3DS, localization)
- Verify webhook signatures with `stripe.webhooks.constructEvent()` using raw body
- Idempotency: events can be delivered multiple times — deduplicate by `event.id`
- Store Stripe Customer ID in your database at signup, not at first payment
- Test locally: `stripe listen --forward-to localhost:3000/webhook`
{{#if negativeConstraints}}
- {{negativeConstraints}}
{{/if}}

## File Locations
- {{patterns}}
- Webhook handler route, Stripe client initialization module

## Integration
- Database: sync subscription status on webhook events, not on checkout redirect
- Environment: `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in env vars

## Commands
- Test: `{{testCommand}}`
- Lint: `{{lintCommand}}`

## Docs
Context7: `mcp__context7__resolve-library-id` -> "stripe" -> `mcp__context7__query-docs`
