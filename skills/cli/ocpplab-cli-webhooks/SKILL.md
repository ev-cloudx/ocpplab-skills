---
name: "ocpplab-cli-webhooks"
description: "ocpplab-cli webhooks commands: webhook endpoints, test deliveries, delivery history and event types."
---

# webhooks

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli webhooks <method> [flags]
```

## API Resources


### deliveries

 - `list` — List webhook delivery attempts

### endpoints

 - `create` — Create a webhook subscription
 - `delete` — Delete a webhook subscription
 - `get` — Get a webhook subscription
 - `list` — List webhook subscriptions
 - `test` — Send a test delivery
 - `update` — Update a webhook subscription

### event-types

 - `get` — Get a webhook event type
 - `list` — List webhook event types

### events

 - `deliver` — Publish a webhook event

### health

 - `get` — Check webhook gateway health
 - `queue` — Check the webhook delivery queue
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli webhooks --schema
ocpplab-cli webhooks <method> --schema

# Human-readable help (for humans)
ocpplab-cli webhooks --help
```

