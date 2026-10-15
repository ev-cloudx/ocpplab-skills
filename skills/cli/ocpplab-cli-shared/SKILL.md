---
name: "ocpplab-cli-shared"
description: "ocpplab-cli basics: install (npm i -g @ocpplab/cli), sign in (auth login or OCPPLAB_TOKEN), global flags (--dry-run, --format, --query, --json, --page-all) and output formats. Read before running any ocpplab-cli command."
---

# ocpplab-cli — Shared Reference

## Authentication

- **HTTPBearer** (bearer token): `OCPPLAB_TOKEN` env var or keyring `ocpplab-cli:HTTPBearer` (populated by `auth login`)
- **OCPPLabOAuth** (bearer): custom auth provider

Set the required environment variable(s):

```bash
export OCPPLAB_TOKEN="<your-token>"
```

Verify authentication resolves:

```bash
ocpplab-cli auth status
```

## Global Flags

These flags appear across the CLI. The harness-level ones (`--dry-run`, `--format`, `--base-url`, `--quiet`) are available on every command; `--page-all` and `--output` surface only on operations whose spec supports the affordance — check the per-op `--schema` output's `paginable` / `binaryResponse` hints to know which ops carry them.

| Flag | Description | Default |
|------|-------------|---------|
| `--dry-run` | Validate locally without sending the request | |
| `--format <FMT>` | Output format: `json`, `table`, `yaml`, `csv`, `raw`, `jsonl`, `http` | `table` on a TTY, `json` when piped |
| `--base-url <URL>` | Override the API base URL | |
| `--params <JSON>` | URL/query/path parameters as JSON | |
| `--json <JSON>` | Request body for POST/PATCH/PUT | |
| `-o, --output <PATH>` | Write a binary response to a file; `-` streams the bytes to stdout for piping. Only on operations that return binary. | |
| `--page-all` | Auto-paginate (NDJSON). Only on paginable operations. | off |
| `--page-limit <N>` | Max pages to fetch | `10` |
| `--page-delay <MS>` | Delay between page fetches | `100` |
| `--no-pager` | Disable pager even on interactive terminals | |
| `--no-retry` | Disable retries | |
| `--no-extract` | Print the full response body | |

## Output Formatting

```bash
# JSON (default)
ocpplab-cli <resource> <method> --format json

# Table view
ocpplab-cli <resource> <method> --format table

# Pipe-friendly: jq, grep, etc.
ocpplab-cli <resource> <method> | jq '.fieldName'
```

## Dry Run

Use `--dry-run` to preview the HTTP request without sending it:

```bash
ocpplab-cli <resource> <method> --dry-run
```

