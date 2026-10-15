// Regenerate skills/cli/ from the published ocpplab-cli, with descriptions an
// agent can match on (the generator's are "Operations on <domain>").
//
//     node scripts/generate-cli-skills.mjs            # rewrite skills/cli/
//     node scripts/generate-cli-skills.mjs --check    # fail if skills/cli/ is stale
//
// Bump CLI_VERSION when @ocpplab/cli is released.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CLI_VERSION = "0.1.0";
const OUT = new URL("../skills/cli/", import.meta.url).pathname;

const DESCRIPTIONS = {
    "ocpplab-cli-shared":
        "ocpplab-cli basics: install (npm i -g @ocpplab/cli), sign in (auth login or OCPPLAB_TOKEN), global flags (--dry-run, --format, --query, --json, --page-all) and output formats. Read before running any ocpplab-cli command.",
    "ocpplab-cli-evcharger":
        "ocpplab-cli evcharger commands: deploy virtual EV chargers, OCPP commands (plug, start/stop session, faults, local lists), deployment status and diagnostics, OCPP logs, charger catalog and location templates.",
    "ocpplab-cli-cpo":
        "ocpplab-cli cpo commands: the organization's charging infrastructure as a CPO - charge points, EVSEs, connectors, locations, tariffs, sessions, CDRs, customers, app users, token and voucher groups, AFIR data.",
    "ocpplab-cli-emsp":
        "ocpplab-cli emsp commands: the organization as an eMSP - tenant profile, roaming identities, partner-location networks, driver tokens and token groups, sessions, CDRs and remote commands.",
    "ocpplab-cli-ocpi":
        "ocpplab-cli ocpi commands: OCPI roaming - partners and invites, credentials handshake, CPO and eMSP data, push and pull sync, charging profiles and commands.",
    "ocpplab-cli-proxy":
        "ocpplab-cli proxy commands: OCPP/OCPI proxy - proxied charger points, tokens, and OCPP or OCPI commands sent through the proxy.",
    "ocpplab-cli-booking":
        "ocpplab-cli booking commands: bookable locations and charger bookings (reserve, fulfill, cancel, reject, fail, no-show).",
    "ocpplab-cli-energy":
        "ocpplab-cli energy commands: power-limit control requests for chargers and the power measurements they report.",
    "ocpplab-cli-webhooks":
        "ocpplab-cli webhooks commands: webhook endpoints, test deliveries, delivery history and event types.",
    "ocpplab-cli-health":
        "ocpplab-cli health commands: check that the OCPPLab API and its gateways are up.",
};

function generate(dir) {
    execFileSync("npx", ["-y", `@ocpplab/cli@${CLI_VERSION}`, "generate-skills", "--output-dir", dir], {
        stdio: ["ignore", "ignore", "inherit"],
    });
    for (const name of readdirSync(dir)) {
        const path = join(dir, name, "SKILL.md");
        const description = DESCRIPTIONS[name];
        if (!description) throw new Error(`no description for generated skill ${name}`);
        const text = readFileSync(path, "utf8").replace(
            /^description: .*$/m,
            `description: ${JSON.stringify(description)}`,
        );
        writeFileSync(path, text);
    }
}

function listFiles(dir) {
    return readdirSync(dir, { recursive: true }).sort();
}

const work = mkdtempSync(join(tmpdir(), "ocpplab-cli-skills-"));
try {
    generate(join(work, "cli"));
    if (process.argv.includes("--check")) {
        const fresh = join(work, "cli");
        const files = listFiles(fresh);
        const stale =
            JSON.stringify(files) !== JSON.stringify(listFiles(OUT)) ||
            files.some((f) => f.endsWith(".md") && readFileSync(join(fresh, f), "utf8") !== readFileSync(join(OUT, f), "utf8"));
        if (stale) {
            console.error("skills/cli/ is stale: run node scripts/generate-cli-skills.mjs");
            process.exit(1);
        }
    } else {
        rmSync(OUT, { recursive: true, force: true });
        cpSync(join(work, "cli"), OUT, { recursive: true });
        console.log(`Wrote skills/cli/ from @ocpplab/cli@${CLI_VERSION}`);
    }
} finally {
    rmSync(work, { recursive: true, force: true });
}
