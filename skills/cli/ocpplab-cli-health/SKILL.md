---
name: "ocpplab-cli-health"
description: "ocpplab-cli health commands: check that the OCPPLab API and its gateways are up."
---

# health

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli health <method> [flags]
```

## API Resources

 - `check` — Health Check
 - `live` — Health Live
 - `ready` — Health Ready
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli health --schema
ocpplab-cli health <method> --schema

# Human-readable help (for humans)
ocpplab-cli health --help
```

