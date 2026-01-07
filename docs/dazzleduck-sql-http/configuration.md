---
sidebar_label: "Configuration"
sidebar_position: 3
---

# Configuration Reference

> HTTP‑specific configuration for DazzleDuck SQL Server.

---

## Configuration Resolution

Configuration is loaded using **Typesafe Config**, with the following precedence:

1. Command‑line flags
2. `application.conf`
3. Built‑in defaults

---

## HTTP Binding

```conf
http.host = "0.0.0.0"
http.port = 8081
```

---

## Authentication

Enable JWT authentication:

```conf
http.authentication = "jwt"
secret_key = "<base64‑encoded‑secret>"
jwt_token.expiration = 60m
```

Supported modes:

| Mode | Description             |
| ---- | ----------------------- |
| none | No authentication       |
| jwt  | JWT‑protected endpoints |

---

## CORS

```conf
allow-origin = "*"
```

Required for browser‑based clients and the UI.

---

## Warehouse Path

```conf
warehouse.path = /var/dazzleduck/data
```

Directory layout:

```text
warehouse/
 ├── tables/
 ├── ingest/
 └── temp/
```

---

## Access Mode

```conf
mode = "restricted"
```

| Mode       | Behavior              |
| ---------- | --------------------- |
| restricted | Guarded SQL execution |
| open       | No authorization      |

---

## Execution Engine (Delegated)

Advanced settings for the Arrow Flight SQL engine are passed through:

```conf
flight_sql { ... }
dazzleduck_server { ... }
```

These settings are consumed by the execution core, not the HTTP layer itself.

---

## Producer Identity

Each server instance uses a unique producer ID to:

- Isolate concurrent queries
- Enable safe cancellation
- Prevent cross‑client interference

---

## Summary

HTTP configuration controls **networking, security, and access**, while execution behavior is delegated to the underlying Flight SQL engine.

---

Next: **[Architecture →](architecture.md)**
