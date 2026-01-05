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
docker run -ti \
  -p 8081:8081 \
  -p 59307:59307 \
  dazzleduck/dazzleduck:latest \
  --conf warehouse=/data
```

This launches the full DazzleDuck SQL Server, including:

- HTTP API
- Arrow Flight SQL
- DuckDB execution engine

---

## Running from Source (Development)

The HTTP module is not intended to be run in isolation. It is started by the **runtime module**.

### Build

```bash
mvn clean package
```

### Run (via runtime)

```bash
java -jar dazzleduck-sql-runtime/target/dazzleduck-sql-runtime.jar --conf warehouse=warehouse
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
