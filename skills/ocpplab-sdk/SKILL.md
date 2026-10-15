---
name: ocpplab-sdk
description: Write code against the OCPPLab API with the official TypeScript (npm `ocpplab`) or Python (PyPI `ocpplab`) SDK - client setup, method naming, pagination, typed errors, retries and timeouts. Use when adding OCPPLab to an application or script, or when code imports `ocpplab` / `OcpplabSDK`.
---

# OCPPLab SDKs

Both SDKs are generated from the same API, so they mirror each other. Auth and the 202 polling rule are in the `ocpplab` skill.

## Install and create a client

```bash
npm i ocpplab        # TypeScript, Node.js 18+
pip install ocpplab  # Python 3.9+
```

```typescript
import { OcpplabSDK } from "ocpplab";

const client = new OcpplabSDK({ token: process.env.OCPPLAB_TOKEN! });
```

```python
import os
from ocpplab import OcpplabSDK  # AsyncOcpplabSDK for asyncio

client = OcpplabSDK(token=os.environ["OCPPLAB_TOKEN"])
```

| Option | TypeScript | Python | Default |
| --- | --- | --- | --- |
| Another host | `baseUrl` | `base_url` | `https://api.ocpplab.io` |
| Timeout | `timeoutInSeconds` | `timeout` | 60 s |
| Retries | `maxRetries` | `request_options={"max_retries": n}` | 2 |

## Naming

- Methods follow the API domains: `client.<domain>.<resource>.<method>`.
- TypeScript methods are camelCase (`commands.getStatus`), Python snake_case (`commands.get_status`).
- **Request and response fields are snake_case in both** (`{ command_id: "..." }`, `deployment_id`, `id_tag`).
- TypeScript takes one request object (`getStatus({ command_id })`); Python takes keyword arguments, with path ids positional (`get_status("cmd-1")`).
- Types: `OcpplabSDKTypes.<Name>` in TypeScript, `from ocpplab.types import <Name>` in Python.

Unsure about a method or its fields? Read its page: https://docs.ocpplab.io/api-reference (each operation has TypeScript and Python samples), or the SDK's type definitions in `node_modules/ocpplab` / site-packages.

## Pagination

List methods return a pager that walks every page:

```typescript
for await (const brand of await client.evcharger.catalog.listBrands()) {
    console.log(brand.slug);
}
```

```python
for brand in client.evcharger.catalog.list_brands():
    print(brand.slug)
```

## Errors

Each status has its own class, all extending `OcpplabSDKError` (TypeScript) or `ApiError` (Python), with the status code and body.

```typescript
import { OcpplabSDKError, OcpplabSDKTypes } from "ocpplab";

try {
    await client.evcharger.commands.getStatus({ command_id: "cmd-1" });
} catch (error) {
    if (error instanceof OcpplabSDKTypes.NotFoundError) {
        // not delivered yet: poll again
    } else if (error instanceof OcpplabSDKError) {
        console.error(error.statusCode, error.body);
    } else {
        throw error;
    }
}
```

```python
from ocpplab import NotFoundError
from ocpplab.core.api_error import ApiError

try:
    client.evcharger.commands.get_status("cmd-1")
except NotFoundError:
    pass  # not delivered yet: poll again
except ApiError as error:
    print(error.status_code, error.body)
```

Classes: `BadRequestError` 400, `UnauthorizedError` 401, `ForbiddenError` 403, `NotFoundError` 404, `ConflictError` 409, `PreconditionFailedError` 412, `UnprocessableEntityError` 422, `TooManyRequestsError` 429, `InternalServerError` 500, `BadGatewayError` 502, `ServiceUnavailableError` 503, `GatewayTimeoutError` 504.

## Retries

The SDKs retry 408, 429 and 5xx up to 2 times with backoff, **except** a POST that could act twice (creates, commands): it is sent once, even after a 503. Before retrying one yourself, check whether the first attempt went through (`deployment_runtime_ops.status`, `commands.list_results`). Operations with an `Idempotency-Key` header (for example `booking.locations.create`) keep their retries.

## Rules

- Read the token from `OCPPLAB_TOKEN`; never hard-code it.
- Calls that return 202 are not done: poll (see `ocpplab`).
- Use the SDK instead of raw `fetch` / `requests`: it handles auth, retries, pagination and types.
