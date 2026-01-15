---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Flight Server

> Production-grade Apache Arrow Flight SQL server for DuckDB

---

## Overview

The **DazzleDuck SQL Flight Server** exposes DuckDB as a **remote, high-performance analytical database** using **Apache Arrow Flight SQL**. It transforms DuckDB from an embedded, single-process engine into a **multi-client, server-based analytics backend** while preserving DuckDB’s vectorized execution and Arrow-native data flow.

This module is designed for **BI tools, data science workloads, and distributed query engines** that require:

- JDBC / ADBC compatibility
- High-throughput streaming results
- Low-latency analytical queries
- Secure authentication and authorization
- Production-safe query lifecycle management

Unlike the HTTP module, this server speaks **pure Flight SQL (gRPC)** and behaves like a full-fledged analytical database service.

---

## Key Capabilities

### Native Flight SQL Execution

- Full Apache Arrow Flight SQL compliance
- Prepared statements and metadata APIs
- Multi-batch Arrow streaming
- Zero-copy columnar transfer
- Compatible with JDBC, Python (ADBC), Go, and Rust clients

### Security & Authorization

- JWT-based authentication
- Header-driven authorization context
- Path-level and table-level access enforcement
- Claim-aware query execution (org, tenant, role, etc.)

### Data Ingestion

- Arrow IPC ingestion
- Parquet-backed persistence
- Partitioned writes
- Transform expressions during ingest
- Concurrent and idempotent ingestion support

### Operational Features

- Query cancellation
- Fetch-size control
- Startup SQL initialization
- Split planning for distributed execution
- Warehouse-backed persistence

---

## High-Level Architecture

```text
Client (JDBC / ADBC / FlightSQL)
        │
        ▼
Arrow Flight SQL Server
        │
        ├── Authentication & Authorization
        ├── Query Planner & Validator
        ├── Split & Execution Engine
        ├── Ingestion Pipeline
        │
        ▼
DuckDB Engine
```

All SQL execution flows through a single **FlightSQL producer**, ensuring consistent semantics, security, and performance.

---

## When to Use Flight SQL Mode

Choose **Flight SQL** when you need:

- High-throughput analytical queries
- JDBC or BI tool integration (DBeaver, Tableau, Superset)
- Arrow-native streaming to Python / Spark
- Secure multi-client access to DuckDB
- Production-grade SQL APIs
