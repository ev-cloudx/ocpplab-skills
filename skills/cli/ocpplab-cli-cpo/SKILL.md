---
name: "ocpplab-cli-cpo"
description: "ocpplab-cli cpo commands: the organization's charging infrastructure as a CPO - charge points, EVSEs, connectors, locations, tariffs, sessions, CDRs, customers, app users, token and voucher groups, AFIR data."
---

# cpo

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli cpo <method> [flags]
```

## API Resources


### afir

 - `statuses` — Get AFIR EVSE statuses
 - `tables` — Get AFIR static data

### app-users

 - `create` — Create an app user
 - `get` — Get an app user
 - `list` — List app users
 - `replace` — Replace an app user

### audit-logs

 - `list` — List audit log entries

### catalog

 - `list_models` — List charger models
 - `tariff_public_key` — Get the tariff-signing public key

### cdrs

 - `get` — Get a CDR
 - `list` — List CDRs
 - `push` — Push a CDR to a partner

### charge-points

 - `create` — Create a charge point
 - `delete` — Delete a charge point
 - `get` — Get a charge point
 - `list` — List charge points
 - `list_cdrs` — List a charge point's CDRs
 - `list_connectors` — List a charge point's connectors
 - `list_evses` — List a charge point's EVSEs
 - `list_sessions` — List a charge point's sessions
 - `reboot` — Reboot a charger
 - `reset` — Reset a charger
 - `update` — Update a charge point

### connectors

 - `change_availability` — Change a connector's availability
 - `create` — Create a connector
 - `delete` — Delete a connector
 - `get` — Get a connector
 - `list` — List connectors
 - `remote_start` — Start charging remotely
 - `remote_stop` — Stop charging remotely
 - `unlock` — Unlock a connector
 - `update` — Update a connector

### customers

 - `create` — Create a customer
 - `delete` — Delete a customer
 - `get` — Get a customer
 - `list` — List customers
 - `replace` — Replace a customer

### evses

 - `create` — Create an EVSE
 - `delete` — Delete an EVSE
 - `get` — Get an EVSE
 - `list` — List EVSEs
 - `update` — Update an EVSE

### health

 - `get` — Check the CPO service

### locations

 - `create` — Create a location
 - `delete` — Delete a location
 - `get` — Get a location
 - `list` — List locations
 - `push` — Push a location to a partner
 - `update` — Update a location

### sessions

 - `get` — Get a session
 - `get_cdr` — Get a session's CDR
 - `list` — List sessions
 - `push` — Push a session to a partner

### tariffs

 - `assign` — Assign a tariff to a connector
 - `create` — Create a tariff
 - `delete` — Delete a tariff
 - `get` — Get a tariff
 - `list` — List tariffs
 - `list_assignments` — List tariff assignments
 - `push` — Push a tariff to a partner
 - `unassign` — Unassign a tariff from a connector
 - `update` — Update a tariff

### temporary-evse-statuses

 - `create` — Create a temporary EVSE status
 - `delete` — Delete a temporary EVSE status
 - `get` — Get a temporary EVSE status
 - `list` — List temporary EVSE statuses
 - `update` — Update a temporary EVSE status

### token-groups

 - `add_location` — Link a location to a token group
 - `add_token` — Add a token to a token group
 - `create` — Create a token group
 - `delete` — Delete a token group
 - `disable` — Disable a token group
 - `enable` — Enable a token group
 - `get` — Get a token group
 - `list` — List token groups
 - `list_locations` — List a token group's locations
 - `list_tokens` — List a token group's tokens
 - `remove_location` — Unlink a location from a token group
 - `remove_token` — Remove a token from a token group
 - `update` — Update a token group

### voucher-groups

 - `add_location` — Link a location to a voucher group
 - `create` — Create a voucher group
 - `delete` — Delete a voucher group
 - `get` — Get a voucher group
 - `list` — List voucher groups
 - `list_locations` — List a voucher group's locations
 - `list_vouchers` — List a voucher group's vouchers
 - `remove_location` — Unlink a location from a voucher group
 - `update` — Update a voucher group

### vouchers

 - `add_token` — Give a token a voucher
 - `create` — Create a voucher
 - `delete` — Delete a voucher
 - `get` — Get a voucher
 - `list` — List vouchers
 - `list_tokens` — List a voucher's tokens
 - `remove_token` — Take a voucher from a token
 - `update` — Update a voucher
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli cpo --schema
ocpplab-cli cpo <method> --schema

# Human-readable help (for humans)
ocpplab-cli cpo --help
```

