---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL HTTP Server

> HTTP layer that exposes DuckDB as a remote, Arrow-native analytics service.

---

## Overview

The **DazzleDuck SQL HTTP Server** provides a **RESTful HTTP interface** on top of the DazzleDuck SQL execution engine. It allows clients to execute analytical SQL queries, ingest Arrow data, and manage query lifecycles using simple HTTP requests, while internally delegating all execution to a **single Arrow Flight SQL producer backed by DuckDB**.

This module is intentionally designed as a **thin HTTP façade** — it does not re-implement query planning or execution logic. Instead, it focuses on:

- HTTP request handling
- Authentication and authorization
- Streaming Arrow results over HTTP
- Coordinating ingestion and query lifecycle APIs

---

## What This Server Provides

### API Reference (HTTP)

All API endpoints are prefixed with `/v1`.

| Method     | Endpoint     | Description                                                 |
| :--------- | :----------- | :---------------------------------------------------------- |
| `POST`     | `/v1/login`  | Authenticate and retrieve a JWT token.                      |
| `GET/POST` | `/v1/query`  | Execute a SQL query. Params: `q` (query string).            |
| `POST`     | `/v1/plan`   | Generate a query plan (splits) for distributed execution.   |
| `POST`     | `/v1/ingest` | Upload Arrow stream to a Parquet file. Query param: `path`. |
| `POST`     | `/v1/cancel` | Cancel a currently running query.                           |
| `GET`      | `/v1/ui`     | Open the web dashboard.                                     |
| `GET`      | `/health`    | Server health check (Unversioned).                          |

---

## Key Design Principles

- **Arrow-first**: All data transfer uses Apache Arrow formats
- **Single execution core**: One DuckDB + Flight SQL producer handles all work
- **Streaming by default**: Large results are streamed with backpressure awareness
- **Minimal abstraction**: HTTP layer stays thin and predictable

---

## When to Use the HTTP Server

This module is ideal when you need:

- SQL-over-HTTP access to DuckDB
- A backend for web-based analytics
- Lightweight data APIs returning Arrow data
- A bridge between Arrow pipelines and SQL analytics

---

## Relationship to Other Modules

- **Execution**: Delegates to `dazzleduck-sql-flight`
- **Security**: Integrates with `dazzleduck-sql-login`
- **Metrics**: Exposes telemetry via `dazzleduck-sql-micrometer`
- **UI**: Serves the Arrow JS frontend

---

## Summary

DazzleDuck SQL HTTP Server turns DuckDB into a **remote analytics engine accessible over HTTP**, without sacrificing performance or Arrow-native efficiency.

---

Next: **[Installation →](installation.md)**
