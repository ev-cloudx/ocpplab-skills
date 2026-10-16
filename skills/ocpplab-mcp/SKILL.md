---
name: ocpplab-mcp
description: Connect an AI client (Claude Code, Codex, Cursor, VS Code, Windsurf, Claude Desktop, claude.ai, ChatGPT) to the OCPPLab MCP servers - the product server that acts on OCPPLab data (285 tools) and the docs server that answers questions from docs.ocpplab.io. Use when the user wants an agent to use OCPPLab through MCP, or an OCPPLab MCP connection fails.
---

# OCPPLab MCP

| Server | URL | Gives the agent | Auth |
| --- | --- | --- | --- |
| Product | `https://api.ocpplab.io/mcp`, or one domain at `/mcp/<domain>` | OCPPLab data and actions, as the signed-in user | Browser sign-in (OAuth) or `Authorization: Bearer <SDK token>` |
| Docs | `https://docs.ocpplab.io/_mcp/server` | `searchDocs`: answers from the docs | None |

## Connect

Browser sign-in, for clients that support MCP OAuth (the user picks the organization and selects **Allow**):

```bash
claude mcp add --transport http ocpplab https://api.ocpplab.io/mcp
claude mcp add --transport http ocpplab-docs https://docs.ocpplab.io/_mcp/server
```

Then run `/mcp` in Claude Code and sign in. Cursor, VS Code, claude.ai and ChatGPT take the same URL with no credentials.

With an SDK token (CI, headless agents):

```bash
claude mcp add --transport http ocpplab-cpo https://api.ocpplab.io/mcp/cpo \
  --header 'Authorization: Bearer ${OCPPLAB_TOKEN}'
codex mcp add ocpplab-cpo --url https://api.ocpplab.io/mcp/cpo --bearer-token-env-var OCPPLAB_TOKEN
```

Configs for Cursor, VS Code, Windsurf, Claude Desktop and Python: https://docs.ocpplab.io/mcp/connect-a-client.md

## Connect only what the task needs

Each server adds its tool list to the agent's context. The all-in-one `/mcp` has 285 tools; prefer domain servers when the task stays in one or two:

`/mcp/evcharger` (virtual chargers), `/mcp/cpo`, `/mcp/emsp`, `/mcp/ocpi`, `/mcp/proxy`, `/mcp/booking`, `/mcp/energy`, `/mcp/webhook`.

Every tool: https://docs.ocpplab.io/mcp/servers-and-tools.md

## Using the tools

- Names are `<domain>_<operation>`, e.g. `evcharger_start_session`, `cpo_charge_points_list`.
- Tools carry read-only / destructive / idempotent hints; ask the user before a destructive one.
- Long-running tools return a tracking id, and their description names the tool to poll (e.g. poll `evcharger_get_command_status`).
- Updates: omit a field to leave it unchanged; send `null` to clear it.
- Limit: 120 tool calls per minute per user and organization, shared by every MCP URL (`initialize` and `tools/list` are not counted). Over it, a tool call returns the tool error `rate limit exceeded (429): retry after <N>s`; wait that many seconds.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `401` or a repeated sign-in prompt | Token missing or deleted, `OCPPLAB_TOKEN` not exported where the client started, or access revoked: sign in again |
| "This app has no OCPPLab organization access" | The user left that organization: disconnect in Studio (Settings → Connected apps) and reconnect |
| `403 admin role required` | The tool needs an organization admin |
| `404` for a known id | The id belongs to another organization |
| Tool error `rate limit exceeded (429): retry after <N>s` | Over 120 tool calls per minute; wait the seconds in the message |
| Wrong tool picked | Connect fewer domain servers |

Smoke test:

```bash
curl -sS -X POST https://api.ocpplab.io/mcp/cpo \
  -H "Authorization: Bearer $OCPPLAB_TOKEN" -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"curl","version":"0"}}}'
```

A working setup answers with `"name": "ocpplab-cpo"`.
