# OCPPLab skills

Agent skills for [OCPPLab](https://docs.ocpplab.io): teach Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, OpenCode, Windsurf and [40+ other agents](https://github.com/vercel-labs/skills#supported-agents) to drive virtual EV chargers, CPO and eMSP data and OCPI roaming through the OCPPLab SDKs, CLI and MCP servers.

## Install

```bash
npx skills add ev-cloudx/ocpplab-skills
```

The installer asks which agents and skills to install. Non-interactive:

```bash
# Every skill, every agent, this project
npx skills add ev-cloudx/ocpplab-skills --all

# Every skill for Claude Code and Codex, for your user (all projects)
npx skills add ev-cloudx/ocpplab-skills --skill '*' -a claude-code -a codex -g -y

# Just the entry-point skill
npx skills add ev-cloudx/ocpplab-skills --skill ocpplab
```

Update later with `npx skills update`, remove with `npx skills remove`.

## Skills

| Skill | Use it for |
| --- | --- |
| `ocpplab` | Start here: domains, auth, which surface to use, the 202 polling rule, errors, where the docs are |
| `ocpplab-virtual-chargers` | Deploy virtual chargers against a CSMS, then plug, charge, unplug, inject faults and diagnose |
| `ocpplab-sdk` | Write code with the TypeScript or Python SDK: naming, pagination, errors, retries |
| `ocpplab-mcp` | Connect an AI client to the OCPPLab MCP servers (product and docs) |
| `ocpplab-cli-shared` | `ocpplab-cli` install, sign-in, global flags, output formats |
| `ocpplab-cli-evcharger`, `-cpo`, `-emsp`, `-ocpi`, `-proxy`, `-booking`, `-energy`, `-webhooks`, `-health` | Every `ocpplab-cli` command, per domain |

## You also need

- An OCPPLab token: Studio → **Settings → SDK tokens** (https://app.ocpplab.com/dashboard/settings/sdk-tokens), exported as `OCPPLAB_TOKEN`.
- One of: `npm i ocpplab`, `pip install ocpplab`, `npm i -g @ocpplab/cli`, or the MCP server `https://api.ocpplab.io/mcp`.

## Contributing

- Hand-written skills live in `skills/<name>/SKILL.md`. Keep every command and code sample runnable against the current SDK and CLI.
- `skills/cli/` is generated from `@ocpplab/cli` by `node scripts/generate-cli-skills.mjs`; don't edit it by hand. Bump `CLI_VERSION` there after a CLI release.
- CI checks that `skills/cli/` is current and that every skill is discoverable.
