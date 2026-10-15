---
name: ocpplab-virtual-chargers
description: Deploy OCPPLab virtual EV chargers against a CSMS and drive them through charging sessions - create a location with chargers, wait until they are online, plug a connector, start and stop a session, unplug, inject faults, and diagnose stuck chargers. Use when the user wants to test a CSMS or OCPP backend with simulated chargers, or to run OCPP commands on OCPPLab virtual chargers.
---

# OCPPLab virtual chargers

Needs `OCPPLAB_TOKEN` (see the `ocpplab` skill) and the WebSocket URL of the user's CSMS. Examples use the Python SDK; the TypeScript SDK and `ocpplab-cli` are shown where they differ.

## 1. Put chargers online

Creating a location returns 202; the chargers deploy in the background. Poll their stage.

```python
import os, time
from ocpplab import OcpplabSDK
from ocpplab.types import VirtualLocationChargerItem, VirtualLocationCoordinates

client = OcpplabSDK(token=os.environ["OCPPLAB_TOKEN"])
identities = ["DEMO-CP-001", "DEMO-CP-002"]
client.evcharger.location.create(
    name="Demo hub",
    address="1 Parvis de la Defense",
    city="Puteaux",
    country="FRA",
    coordinates=VirtualLocationCoordinates(lat=48.892, lng=2.238),
    chargers=[
        VirtualLocationChargerItem(
            identity=identity,
            brand_slug="wallbox",
            model="wallbox-pulsar-plus",
            connector_type="Type2",
            ws_url=os.environ["CSMS_WS_URL"],
        )
        for identity in identities
    ],
)

deadline = time.monotonic() + 600
while True:
    chargers = client.evcharger.deployment_runtime_ops.status(identity=identities).items
    if chargers and all(c.stage == "online" for c in chargers):
        break
    if any(c.outcome in ("failed", "stuck") for c in chargers):
        raise SystemExit([(c.identity, c.hint) for c in chargers])
    if time.monotonic() > deadline:
        raise SystemExit("not online after 10 minutes")
    time.sleep(5)
```

- Pick a model with `client.evcharger.catalog.list_brands()` then `list_models(brand_slug)`; never invent a `brand_slug` or `model`.
- 20 ready-made topologies: `client.evcharger.templates.list()`.
- An online charger also appears as a CPO charge point (`client.cpo.charge_points`).

## 2. Drive a session

Every command takes a `target`: one charger by its OCPP `identity` (the one you deployed it with) or `deployment_id`, or every charger of a `location_id`, optionally narrowed to `charger_ids`. It returns 202 with one `results[].command.id` per charger. Poll each id.

```python
from ocpplab import NotFoundError
from ocpplab.types import CommandTarget, ConnectorPayload, StartSessionPayload

FINAL = {"applied", "rejected", "expired", "failed"}

def wait(queued):
    for result in queued.results:
        while True:
            try:
                status = client.evcharger.commands.get_status(result.command.id)
                if status.status in FINAL:
                    print(result.identity, status.event_type, status.status)
                    break
            except NotFoundError:
                pass  # not delivered to the charger yet
            time.sleep(2)

target = CommandTarget(identity="DEMO-CP-001")
connector = ConnectorPayload(evse_id=1, connector_id=1)
wait(client.evcharger.commands.plug_connector(target=target, payload=connector))
wait(client.evcharger.commands.start_session(
    target=target, payload=StartSessionPayload(id_tag=os.environ["ID_TAG"], connector_id=1)))
wait(client.evcharger.commands.stop_session(target=target))
wait(client.evcharger.commands.unplug_connector(target=target, payload=connector))
```

- `start_session` already plugs in and authorizes; call `plug_connector` first only to test an idle, plugged-in charger.
- `start_session` ending `rejected` means the CSMS refused the id tag.
- TypeScript: same calls in camelCase (`client.evcharger.commands.startSession({ target, payload })`, `getStatus({ command_id })`); fields stay snake_case.

### With the CLI

```bash
ocpplab-cli evcharger commands plug_connector \
  --target.identity DEMO-CP-001 --payload.evse-id 1 --payload.connector-id 1
ocpplab-cli evcharger commands start_session \
  --target.identity DEMO-CP-001 --payload.id-tag "$ID_TAG" --payload.connector-id 1
ocpplab-cli evcharger commands get_status --command-id <command-id>
```

Add `--dry-run` to print the request without sending it.

## Other commands

Same pattern for `authorize_id_tag`, `change_configuration`, `inject_fault` / `clear_fault`, `send_local_list` / `clear_local_list`, `reset_cache`, `ev_requests_energy` / `ev_stops_energy`, `power_update` and `proxy_message` (raw OCPP). `list_results` lists a charger's recent commands.

## When a charger is stuck

1. Read `hint` from `deployment_runtime_ops.status`.
2. Call `client.evcharger.deployment_runtime_ops.diagnostics(deployment_id=...)` (the id `evcharger.deployment.create` returns) and read `verdict` and `notes`.
3. Check the `ws_url` and that the CSMS accepts the charger's identity.

## Clean up

Delete what you created when the test is done: `client.evcharger.deployment.delete(identity="DEMO-CP-001")` for each charger, or `client.evcharger.location.delete(location_id=...)` for the whole location. Deleting is destructive: confirm with the user first.

Reference: https://docs.ocpplab.io/get-started/guides/plug-charge-unplug.md
