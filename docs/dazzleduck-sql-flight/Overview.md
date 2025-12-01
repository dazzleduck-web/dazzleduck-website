---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Flight Server

> Expose DuckDB as a native Apache Arrow Flight SQL engine.

---

## Overview

The **DazzleDuck SQL Flight Server** runs DuckDB as a remote, high-performance SQL engine using **Apache Arrow Flight SQL**.

It enables:

- Native FlightSQL clients (JDBC / Python / Go)
- Remote DuckDB query execution
- Arrow-native streaming
- Secure authentication
- Server-side authorization
- Partitioned ingestion
- Query cancellation
- Query planning & split execution

Unlike HTTP mode, this server speaks **pure FlightSQL** and behaves like a real analytics backend.

---

## Core Capabilities

### ✅ Native FlightSQL Execution
- Prepared statements
- Arrow streaming
- Multi-batch results
- Metadata endpoints
- Arrow JDBC support

### ✅ Server-Side Authorization
- JWT authentication
- Header-based auth validation
- Table-level enforcement
- Path-level enforcement
- Row-level filters via claims

### ✅ Data Ingestion
- Arrow IPC upload
- Parquet ingest
- Partitioned writes
- Transform expressions
- Concurrent ingestion

### ✅ Operational Features
- Startup SQL scripts
- Cancellation support
- Fetch-size control
- Split execution
- Warehouse persistence

---

## How it Works (Conceptually)

```text
Client (JDBC / FlightSQL)
        │
        ▼
Arrow Flight Server
        │
        ├── Auth Middleware
        ├── Query Planner
        ├── Access Control
        ├── Ingestion Pipeline
        │
        ▼
DuckDB Engine
```

All execution flows through a single FlightSQL producer backed by DuckDB.

---

## When to Use Flight Mode

Use FlightSQL when you need:

✅ High-throughput analytics  
✅ Streaming results  
✅ Multi-client compatibility  
✅ JDBC support  
✅ Production-safe SQL APIs  
✅ Remote DuckDB  
✅ Arrow-native workflows  

---

Want to go next? **[Installation & Configuration  →](installation.md)**
