---
name: ocpplab
description: Start here for any OCPPLab task - EV charging work through the OCPPLab API (virtual OCPP chargers, CPO charge points and tariffs, eMSP driver tokens, OCPI roaming, proxy, bookings, energy limits, webhooks). Explains auth, which surface to use (TypeScript or Python SDK, ocpplab-cli, MCP), the 202 polling rule, and where the docs are. Use when the user mentions OCPPLab, ocpplab-cli, the ocpplab SDK, or wants to simulate or manage EV chargers with it.
---

# OCPPLab

OCPPLab is one API for EV charging work. Docs: https://docs.ocpplab.io (Markdown index for agents: https://docs.ocpplab.io/llms.txt; add `.md` to any page URL).

## Domains

| Domain | Use it to | SDK namespace | CLI group | MCP server |
| --- | --- | --- | --- | --- |
| Virtual chargers | Deploy simulated chargers against any CSMS and drive them with OCPP commands | `client.evcharger` | `ocpplab-cli evcharger` | `/mcp/evcharger` |
| CPO | Charge points, EVSEs, connectors, locations, tariffs, sessions, CDRs | `client.cpo` | `ocpplab-cli cpo` | `/mcp/cpo` |
| eMSP | Driver tokens, token groups, partner-location networks | `client.emsp` | `ocpplab-cli emsp` | `/mcp/emsp` |
| OCPI roaming | Partners, credentials handshake, push and pull CPO/eMSP data | `client.ocpi` | `ocpplab-cli ocpi` | `/mcp/ocpi` |
| Proxy | Route OCPP/OCPI traffic and send commands through OCPPLab | `client.proxy` | `ocpplab-cli proxy` | `/mcp/proxy` |
| Bookings | Bookable locations and reservations | `client.booking` | `ocpplab-cli booking` | `/mcp/booking` |
| Energy | Power-limit requests and power measurements | `client.energy` | `ocpplab-cli energy` | `/mcp/energy` |
| Webhooks | Events pushed to an HTTPS endpoint | `client.webhooks` | `ocpplab-cli webhooks` | `/mcp/webhook` |

## Authentication

Every surface takes the same bearer token. The user generates it in Studio: https://app.ocpplab.com/dashboard/settings/sdk-tokens (Settings → SDK tokens). It is shown once and acts as the member who created it.

```bash
export OCPPLAB_TOKEN="<token>"
```

- Read the token from `OCPPLAB_TOKEN`. Never write it into a file, a commit or a log.
- Results only include the token's organization: an id from another organization returns `404`.
- Admin-only operations return `403` unless the token belongs to an organization admin.

## Pick the surface

| Situation | Use | Skill |
| --- | --- | --- |
| Writing application code | TypeScript (`npm i ocpplab`) or Python (`pip install ocpplab`) SDK | `ocpplab-sdk` |
| Running one-off operations from the terminal or a script | `ocpplab-cli` (`npm i -g @ocpplab/cli`) | `ocpplab-cli-shared` |
| Letting an AI client act on OCPPLab directly | MCP server `https://api.ocpplab.io/mcp` | `ocpplab-mcp` |
| Simulating chargers end to end | Any of the above | `ocpplab-virtual-chargers` |

All of them call `https://api.ocpplab.io` by default.

## The 202 rule

Deploying chargers and sending them commands return **202 Accepted** at once and finish in the background. Never treat 202 as done: poll what the response points to.

| You called | Poll | Until |
| --- | --- | --- |
| `evcharger.location.create`, `evcharger.deployment_runtime_ops.operate` | `evcharger.deployment_runtime_ops.status` with the identities | every `stage` is `online`, or an `outcome` is `failed` / `stuck` |
| any `evcharger.commands.*` | `evcharger.commands.get_status(command_id)` for each `results[].command.id` | `status` is `applied`, `rejected`, `expired` or `failed` |

`get_status` returns `404` until the charger has received the command: keep polling. Poll every 2 to 5 seconds with a deadline.

## Errors

| Status | Meaning |
| --- | --- |
| 401 | Missing or deleted token |
| 403 | Needs an organization admin |
| 404 | Unknown id, or one from another organization |
| 409 | Object already exists (the message names the owner) |
| 422 | Invalid body; `detail` lists each field |
| 429 | Rate limited; wait `Retry-After` seconds |

The SDKs never resend a POST that could act twice (creates, commands). Check status before retrying one yourself.

## Look things up

When unsure how an operation works, read the docs instead of guessing:

- Endpoint pages: https://docs.ocpplab.io/api-reference (every operation, with TypeScript and Python samples)
- Search the docs over MCP: `https://docs.ocpplab.io/_mcp/server` (tool `searchDocs`)
- CLI: `ocpplab-cli <domain> <resource> <operation> --help`, or `--schema` for JSON
