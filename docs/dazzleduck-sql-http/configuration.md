---
sidebar_label: "Configuration"
sidebar_position: 3
---

# Configuration Reference

> Central configuration options for DazzleDuck SQL HTTP Server.

---

## 🧩 Config Loading Order

Configuration is resolved using **Typesafe Config** with layered overrides:

1. Command-line arguments
2. `application.conf`
3. Built-in defaults

All configuration is resolved from the configured `CONFIG_PATH` namespace.

---

## 🌐 Core Settings

### HTTP Binding

Control where the server listens:

```conf
http.host = "0.0.0.0"
http.port = 8080
```

---

## 🔐 Authentication

Enable authentication with JWT:

```conf
http.authentication = "jwt"
secret_key = "<base64-secret>"
jwt_token.expiration = 60m
```

### Supported modes

| Mode   | Description             |
| ------ | ----------------------- |
| `none` | No authentication       |
| `jwt`  | JWT-protected endpoints |

---

## 🌍 CORS

Allow browser clients to access the server:

```conf
allow-origin = "*"
```

✅ Required for UI-based clients.

---

## 📂 Warehouse Path

Define where DuckDB stores tables and ingestion files:

```ini
warehouse.path = /var/dazzleduck/data
```

Directory structure:

```text
warehouse/
 ├── tables/
 ├── ingest/
 └── temp/
```

---

## 🔒 Access Mode

Control write access globally:

```conf
mode = "restricted"
```

### Options

| Mode         | Behavior         |
| ------------ | ---------------- |
| `restricted` | SQL guarded      |
| `open`       | No authorization |

---

## 🚀 Arrow & Flight SQL

Advanced Arrow configuration (optional):

```conf
flight_sql {
   ...
}

dazzleduck_server {
   ...
}
```

---

## 🆔 Producer ID

Each server instance uses a unique ID:

```java
UUID.randomUUID()
```

This ensures safe multi-producer execution.

---

## 🔁 Configuration Merge Order

Final configuration resolution:

```text
1. CLI overrides
2. application.conf
3. Default values
```

---

## ✅ Summary

You control:

- Network binding
- Authentication
- Storage layout
- Access model
- Arrow engine behavior

---

Wanna explore more? Must visit **[API Reference →](api-reference.md)**
