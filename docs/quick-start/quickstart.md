---
sidebar_label: "Quick Start"
sidebar_position: 1
---

# Quick Start

Get **DazzleDuck SQL Server** up and running in minutes using Docker. This is the **recommended way** to try DazzleDuck and mirrors how it is typically used in production.

DazzleDuck is a **remote server for DuckDB**, exposing analytical SQL over **Arrow Flight SQL (gRPC)** and **RESTful HTTP APIs**.

---

## Prerequisites

- Docker 20+
- (Optional) DuckDB CLI, Python, or a BI tool for querying

---

## Run DazzleDuck with Docker

Start the server using the official Docker image:

```bash
docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data
```

You should see output similar to:

```text
DazzleDuck SQL Server
---------------------
Warehouse Path: /data
HTTP Server:    http://localhost:8081
Health Check:   http://localhost:8081/health
UI Dashboard:   http://localhost:8081/v1/ui
Flight SQL:     grpc+tcp://localhost:59307
```

---

## Run Your First Query (HTTP)

Execute a simple query using HTTP:

```bash
curl "http://localhost:8081/v1/query?q=SELECT%201"
```

The response is returned in **Apache Arrow** format and can be consumed directly by DuckDB, Python, or other Arrow-enabled tools.

---

## Query from Local DuckDB

A local DuckDB instance can treat DazzleDuck as a remote data source:

```sql
INSTALL arrow;
LOAD arrow;
SELECT * FROM read_arrow('http://localhost:8081/v1/query?q=SELECT+42');
```

This enables **DuckDB-on-DuckDB** workflows with zero-copy data transfer.

---

## Connect via Arrow Flight SQL (JDBC)

Use the Apache Arrow Flight SQL JDBC driver with the following connection string:

```text
jdbc:arrow-flight-sql://localhost:59307?database=memory&useEncryption=0&user=admin&password=admin
```

This works with tools like **DBeaver**, **Tableau**, and other JDBC-compatible clients.

---

## What’s Next?

- **[Installation](installation.md)** — Build and run from source
- **[Configuration](configuration.md)** — Warehouse paths, auth, TLS, and performance tuning
- **HTTP API** — Querying, ingestion, and planning endpoints
- **Arrow Flight SQL** — High-performance analytics connectivity

DazzleDuck is designed to be simple to start, yet powerful enough for serious analytical workloads.
