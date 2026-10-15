---
name: "ocpplab-cli-evcharger"
description: "ocpplab-cli evcharger commands: deploy virtual EV chargers, OCPP commands (plug, start/stop session, faults, local lists), deployment status and diagnostics, OCPP logs, charger catalog and location templates."
---

# evcharger

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli evcharger <method> [flags]
```

## API Resources


### catalog

 - `get_model` — Get catalog brand model
 - `list_brands` — List catalog brands
 - `list_models` — List catalog brand models

### commands

 - `authorize_id_tag` — Authorize an id tag
 - `change_configuration` — Change charger configuration
 - `clear_fault` — Clear a charger fault
 - `clear_local_list` — Clear charger local authorization list
 - `ev_requests_energy` — Signal that the EV requests energy
 - `ev_stops_energy` — Signal that the EV stops requesting energy
 - `get_status` — Get the status of a queued command
 - `inject_fault` — Inject a charger fault
 - `list_results` — List recent command results for a charger
 - `plug_connector` — Plug a connector
 - `power_update` — Update delivered power
 - `proxy_message` — Send a raw OCPP proxy message
 - `reset_cache` — Reset charger authorization cache
 - `send_local_list` — Send a local authorization list
 - `start_session` — Start a charging session
 - `stop_session` — Stop a charging session
 - `unplug_connector` — Unplug a connector

### deployment

 - `create` — Create charger deployment
 - `delete` — Delete one charger deployment

### deployment-runtime-ops

 - `diagnostics` — Why a deployed charger is not running: pods, events and system logs
 - `events` — Recent deployment stage changes for the organization
 - `operate` — Stop, restart, or delete deployed charger runtimes
 - `status` — Current deployment stage of lab chargers

### location

 - `create` — Create location, optionally with chargers
 - `delete` — Delete a deployment location and its chargers

### logs

 - `delete` — Delete charger OCPP logs
 - `list` — List charger OCPP logs

### templates

 - `list` — List OCPP + OCPI location templates
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli evcharger --schema
ocpplab-cli evcharger <method> --schema

# Human-readable help (for humans)
ocpplab-cli evcharger --help
```

