---
name: "ocpplab-cli-ocpi"
description: "ocpplab-cli ocpi commands: OCPI roaming - partners and invites, credentials handshake, CPO and eMSP data, push and pull sync, charging profiles and commands."
---

# ocpi

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli ocpi <method> [flags]
```

## API Resources


### cpo-data

 - `cancel_reservation` — Cancel a reservation and notify the eMSP (2.2.1 / 2.3.0)
 - `create_cdr` — Create a CDR
 - `delete_tariff` — Delete a tariff
 - `send_active_charging_profile` — Send a session's ActiveChargingProfile to its eMSP (2.2.1 / 2.3.0)
 - `update_connector` — Update a connector
 - `update_evse_status` — Update an EVSE (usually its status)
 - `update_location` — Update part of a location
 - `update_session` — Update part of a charging session
 - `upsert_location` — Create or replace a location
 - `upsert_session` — Create or replace a charging session
 - `upsert_tariff` — Create or replace a tariff

### credentials

 - `pull_versions` — Discover a partner's OCPI versions and endpoints (admin)
 - `rotate` — Rotate credentials with a partner (admin)
 - `start_handshake` — Register with a partner (credentials handshake, admin)
 - `status` — Read the stored handshake with a partner (admin)
 - `unregister` — Unregister from a partner (admin)

### emsp

 - `clear_charging_profile` — Clear the charging profile of a partner session (2.2.1 / 2.3.0)
 - `get_active_charging_profile` — Request the active charging profile of a partner session (2.2.1 / 2.3.0)
 - `send_command` — Send a command to a partner CPO
 - `set_charging_preferences` — Set charging preferences on a partner session (2.2.1 / 2.3.0)
 - `set_charging_profile` — Set a charging profile on a partner session (2.2.1 / 2.3.0)
 - `update_token` — Update part of a token (e.g. block it)
 - `upsert_token` — Create or replace a token

### invites

 - `create` — Invite a roaming partner (admin)
 - `revoke` — Revoke an invite (admin)
 - `rotate` — Rotate an invite's Token A (admin)

### partners

 - `get` — Get a roaming partner
 - `list` — List roaming partners
 - `register` — Register a roaming partner
 - `remove` — Remove a roaming partner (admin)
 - `update` — Update a roaming partner

### sync

 - `pull_cdrs` — Pull CDRs from a partner CPO
 - `pull_hub_client_info_as_cpo` — Pull a Hub's ClientInfo list into our CPO side (2.2.1 / 2.3.0)
 - `pull_hub_client_info_as_emsp` — Pull a Hub's ClientInfo list into our eMSP side (2.2.1 / 2.3.0)
 - `pull_locations` — Pull locations from a partner CPO
 - `pull_sessions` — Pull sessions from a partner CPO
 - `pull_tariffs` — Pull tariffs from a partner CPO
 - `pull_tokens` — Pull tokens from a partner eMSP
 - `push_cdr` — Push a stored CDR to a partner eMSP
 - `push_location` — Push a stored location to a partner eMSP
 - `push_session` — Push a stored session to a partner eMSP (full, or a PATCH with patch_body)
 - `push_tariff` — Push a stored tariff to a partner eMSP
 - `push_token` — Push a stored token to a partner CPO (full, or a PATCH with patch_body)

### templates

 - `list` — List OCPI + OCPP location templates
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli ocpi --schema
ocpplab-cli ocpi <method> --schema

# Human-readable help (for humans)
ocpplab-cli ocpi --help
```

