---
name: "ocpplab-cli-booking"
description: "ocpplab-cli booking commands: bookable locations and charger bookings (reserve, fulfill, cancel, reject, fail, no-show)."
---

# booking

> **PREREQUISITE:** Read `../ocpplab-cli-shared/SKILL.md` for auth, global flags, and output formatting. If missing, run `ocpplab-cli generate-skills` to create it.

```bash
ocpplab-cli booking <method> [flags]
```

## API Resources


### bookings

 - `cancel` — Cancel a reservation
 - `create` — Create a reservation
 - `fail` — Mark a reservation as failed
 - `fulfill` — Mark a reservation as fulfilled
 - `get` — Get a reservation
 - `list` — List reservations
 - `no_show` — Mark a reservation as a no-show
 - `reject` — Reject a reservation
 - `reserve` — Confirm a reservation
 - `update` — Update a reservation

### health

 - `get` — Check the booking service

### locations

 - `create` — Create a bookable site
 - `delete` — Delete a bookable site
 - `get` — Get a bookable site
 - `list` — List bookable sites
 - `update` — Update a bookable site
## Discovering Commands

**Agents: always prefer `--schema` over `--help`** — `--schema` returns JSON; `--help` returns human prose.

```bash
# Machine-readable surface (use this)
ocpplab-cli booking --schema
ocpplab-cli booking <method> --schema

# Human-readable help (for humans)
ocpplab-cli booking --help
```

