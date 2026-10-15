---
name: "ocpplab-cli-proxy"
description: "ocpplab-cli proxy commands: OCPP/OCPI proxy - proxied charger points, tokens, and OCPP or OCPI commands sent through the proxy."
---

# proxy

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli proxy <method> [flags]
```

## API Resources


### backends

 - `create` — Register a CSMS backend
 - `delete` — Delete a CSMS backend
 - `get` — Get a CSMS backend
 - `get_by_name` — Get a CSMS backend by name
 - `list` — List CSMS backends
 - `update` — Update a CSMS backend

### charger-points

 - `create` — Register a charger point
 - `delete` — Delete a charger point
 - `get` — Get a charger point
 - `list` — List charger points
 - `update` — Update a charger point

### commands

 - `get_ocpi_result` — Read the OCPI CommandResult of an OCPI command
 - `get_ocpp_status` — Read the status of an OCPP command
 - `send_ocpi` — Send an OCPI command to a charger
 - `send_ocpp` — Send an OCPP command to a charger

### routing-rules

 - `create` — Create a routing rule
 - `delete` — Delete a routing rule
 - `get` — Get a routing rule
 - `list` — List routing rules
 - `update` — Update a routing rule

### tokens

 - `activate` — Activate an Unused card
 - `block` — Block an authorization token (reason required)
 - `create` — Register an authorization token
 - `delete` — Delete an authorization token
 - `get` — Get an authorization token
 - `get_by_card_number` — Get an authorization token by printed card number
 - `get_by_id_tag` — Get an authorization token by idTag
 - `list` — List authorization tokens
 - `reprovision` — Reprovision a card with a new chip
 - `unblock` — Unblock an authorization token
 - `update` — Update an authorization token
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli proxy --schema
ocpplab-cli proxy <method> --schema

# Human-readable help (for humans)
ocpplab-cli proxy --help
```

