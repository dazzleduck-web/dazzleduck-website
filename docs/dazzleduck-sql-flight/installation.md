---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Setup

This guide explains how to run **DazzleDuck SQL Flight Server** in production.

---

## Prerequisites

- **Java:** JDK 21+
- **Maven**
- **Docker:** Recommended for production deployments
- **Ports:**
  - `59307` — Arrow Flight SQL (gRPC)

---

## Run via Docker (Recommended)

```bash
docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data
```

This will print the following on the console:

```
============================================================
DazzleDuck SQL Server v0.0.13-SNAPSHOT
============================================================
Warehouse Path: /data
HTTP Server started successfully
Listening on: http://0.0.0.0:8081
Health check: http://0.0.0.0:8081/health
UI dashboard: http://0.0.0.0:8081/v1/ui
Flight Server is up: Listening on URI: grpc+tcp://0.0.0.0:59307
```

- The server is running in both Arrow Flight SQL (gRPC) and HTTP REST API modes

### Key Runtime Flags

| Flag          | Description                      |
| ------------- | -------------------------------- |
| `warehouse`   | Path to Parquet / DuckDB storage |
| `access_mode` | `OPEN` or `RESTRICTED`           |
| `flight.port` | gRPC port (default: 59307)       |

---

## Run Locally (via runtime)

```bash
./mvnw clean package -DskipTests
```

```bash
export MAVEN_OPTS="--add-opens=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED --add-opens=java.base/sun.util.calendar=ALL-UNNAMED"
```

```bash
./mvnw exec:java -pl dazzleduck-sql-runtime -Dexec.mainClass="io.dazzleduck.sql.runtime.Main" -Dexec.args="--conf warehouse=warehouse"
```

---

## Startup SQL

You can configure startup SQL scripts (extensions, settings, secrets) to be executed automatically during server boot.

Example:

```sql
INSTALL httpfs;
LOAD httpfs;
```

---

## Enable TLS (Optional)

Use encryption for production:

```conf
use_encryption = true
keystore = "server.key"
server_cert = "server.crt"
```

---

## Warehouse Directory

Choose where DuckDB persists data:

```conf
warehouse.path = /var/dazzleduck/warehouse
```

Directory layout example:

```text
warehouse/
 ├── tables/
 ├── ingest/
 └── temp/
```

Ensure this path is writable by the server process.

---

## Notes

- Always configure a persistent warehouse path
- Enable JWT authentication in production
- Use TLS for gRPC when exposed publicly
- Monitor memory usage for large result sets
