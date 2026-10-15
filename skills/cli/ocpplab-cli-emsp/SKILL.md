---
name: "ocpplab-cli-emsp"
description: "ocpplab-cli emsp commands: the organization as an eMSP - tenant profile, roaming identities, partner-location networks, driver tokens and token groups, sessions, CDRs and remote commands."
---

# emsp

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli emsp <method> [flags]
```

## API Resources


### callbacks

 - `list` — List callback deliveries

### cdrs

 - `get` — Get a CDR
 - `list` — List CDRs

### chargers

 - `resolve` — Resolve a charger's route

### commands

 - `get` — Get a command
 - `list` — List commands
 - `send` — Send a command

### emp-identities

 - `deregister` — Deregister a roaming identity
 - `get` — Get a roaming identity
 - `list` — List your roaming identities
 - `register` — Register a roaming identity
 - `update` — Update a roaming identity

### evses

 - `status` — Get an EVSE's live status

### health

 - `get` — Check the eMSP gateway

### locations

 - `batch` — Look up many locations at once
 - `check_availability` — Check availability of several locations
 - `cluster` — Cluster partner locations for a map (deprecated)
 - `get` — Get a location
 - `get_by_uid` — Get a location by uid
 - `list` — Search locations
 - `list_facilities` — List facilities at partner locations
 - `map` — Map viewport: clusters or pins
 - `route` — Locations along a route
 - `search` — Search by text or EVSE id

### networks

 - `create` — Create a sub-network
 - `create_base` — Create a base network
 - `create_rule` — Add an access rule
 - `delete` — Delete a sub-network
 - `delete_rule` — Remove an access rule
 - `get` — Get a network
 - `get_effective_view` — See which CPOs your drivers reach
 - `list` — List your networks
 - `list_consumers` — List who uses your published network
 - `list_locations` — List the locations a network reaches
 - `list_rules` — List a network's access rules
 - `set_publish_state` — Publish or withdraw a base network
 - `update` — Update a network

### sessions

 - `get` — Get a session
 - `list` — List sessions

### tariffs

 - `estimate` — Estimate the price of a session
 - `get` — Get a tariff
 - `list` — List tariffs

### tenant

 - `get_priority` — Get your published-network ranking
 - `get_profile` — Get your eMSP profile
 - `set_priority` — Set your published-network ranking
 - `update_profile` — Update your eMSP profile

### token-groups

 - `activate` — Activate a token group
 - `add_tokens` — Add tokens to a group
 - `assign_network` — Assign a network to a group
 - `create` — Create a token group
 - `get` — Get a token group
 - `list` — List token groups
 - `list_networks` — List the networks assigned to a group
 - `reactivate` — Reactivate a token group
 - `remove_token` — Remove a token from a group
 - `revoke` — Revoke a token group
 - `suspend` — Suspend a token group
 - `unassign_network` — Remove a network from a group
 - `update` — Update a token group

### tokens

 - `activate` — Activate a token
 - `bulk_provision` — Provision up to 1000 tokens
 - `get` — Get a token
 - `history` — Get a token's history
 - `list` — List your tokens
 - `provision` — Provision a token
 - `reactivate` — Reactivate a token
 - `revoke` — Revoke a token
 - `suspend` — Suspend a token
 - `update` — Update a token
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli emsp --schema
ocpplab-cli emsp <method> --schema

# Human-readable help (for humans)
ocpplab-cli emsp --help
```

