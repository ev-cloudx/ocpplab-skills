---
name: "ocpplab-cli-energy"
description: "ocpplab-cli energy commands: power-limit control requests for chargers and the power measurements they report."
---

# energy

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli energy <method> [flags]
```

## API Resources


### control-requests

 - `create` — Set or clear a charger's input limit
 - `get` — Get a control request and its outcome
 - `list` — List control requests

### health

 - `get` — Check energy management health

### power-measurements

 - `latest` — Read a charger's latest power per connector
 - `list` — Read a charger's active power
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli energy --schema
ocpplab-cli energy <method> --schema

# Human-readable help (for humans)
ocpplab-cli energy --help
```

