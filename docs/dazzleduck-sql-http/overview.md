---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL HTTP Server

> Expose DuckDB as a production-ready HTTP analytics service.

---

## ✨ Overview

The **DazzleDuck SQL HTTP Server** exposes DuckDB and Arrow Flight SQL as a lightweight, high-performance HTTP service.

It enables you to:

- Execute analytical SQL queries remotely
- Ingest Apache Arrow datasets
- Stream results over Flight SQL
- Authenticate users via JWT
- Cancel and plan queries programmatically
- Serve UI clients from the same backend

In short: **it turns DuckDB into a remote analytics engine.**

---

## 🏗 Built on

> ### The HTTP server is built with a modern, high-performance stack:

- Helidon WebServer
- Apache Arrow
- Apache Arrow Flight SQL
- DuckDB
- JWT Authentication

> ### This design keeps the server:

- Lightweight
- Fast
- Dependency-free
- Ready for embedded deployments

---

## 🔧 What does this server provide?

The server exposes a complete analytics API layer:

- SQL execution over HTTP
- Arrow-native ingestion
- Flight SQL streaming
- JWT-based authentication
- Query cancellation
- Web UI backend
- SQL planning API
- Access-mode enforcement

---

## 🌐 Available Endpoints

| Endpoint  | Purpose                 |
| --------- | ----------------------- |
| `/query`  | Execute SQL             |
| `/plan`   | Pre-flight SQL planning |
| `/ingest` | Upload Arrow datasets   |
| `/cancel` | Cancel running queries  |
| `/login`  | Authentication          |
| `/ui`     | Serves Arrow JS UI      |

---

## ⚙ Supported Operations

- Execute analytical SQL queries
- Upload Arrow batches into DuckDB
- Plan queries remotely
- Cancel long-running statements
- Enforce JWT authorization
- Control read/write access mode

---

## 🎯 Intended Use Cases

This HTTP server is ideal for:

- Web-based SQL systems
- Embedded analytics services
- Remote DuckDB workloads
- Arrow-based ingestion pipelines
- Auth-enabled data APIs

---

## ▶ How it runs

At runtime, the server initializes:

- Helidon routing layer
- Arrow memory allocator
- DuckDB + Flight SQL producer
- Configured warehouse directory
- Optional JWT security filter

All endpoints route through a single analytics engine.

---

## ✅ Summary

DazzleDuck SQL HTTP Server provides a clean, production-grade HTTP layer for DuckDB.

No heavy infrastructure. No external metastore. Just SQL over HTTP.

---

Next Step: **[Installation →](installation.md)**
