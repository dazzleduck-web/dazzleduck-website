---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Running

> Build and run the DazzleDuck SQL HTTP Server as part of the full server distribution.

---

## Requirements

- Java 21+
- Maven 3.8+
- Linux / macOS / Windows

---

## Recommended: Run via Docker

The preferred production and evaluation method is Docker:

```bash
docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data
```

This launches the full DazzleDuck SQL Server, including:

- HTTP API
- Arrow Flight SQL
- DuckDB execution engine

And print the following on the console:

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
- HTTP API endpoints are available at `/v1/*` (e.g., `/v1/query`, `/v1/login`, `/v1/ingest`)
- Health check endpoint is available at `/health` (unversioned)

---

## Running from Source (Development)

The HTTP module is not intended to be run in isolation. It is started by the **runtime module**.

### Build

```bash
./mvnw clean package -DskipTests
```

### Run (via runtime)

```bash
export MAVEN_OPTS="--add-opens=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED --add-opens=java.base/sun.util.calendar=ALL-UNNAMED"
```

```bash
./mvnw exec:java -pl dazzleduck-sql-runtime -Dexec.mainClass="io.dazzleduck.sql.runtime.Main" -Dexec.args="--conf warehouse=warehouse"
```

---

## Verify Installation

```bash
curl "http://localhost:8081/v1/query?q=SELECT%201"
```

Expected result: a valid Arrow or JSON response.

---

## Ports

|  Port | Purpose          |
| ----: | ---------------- |
|  8081 | HTTP API & UI    |
| 59307 | Arrow Flight SQL |

---

## Summary

The HTTP server runs as part of the complete DazzleDuck SQL Server stack and should not be deployed standalone in production.

---

Next: **[Configuration →](configuration.md)**
