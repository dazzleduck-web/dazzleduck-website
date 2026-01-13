---
sidebar_label: "Introduction"
sidebar_position: 1
---

# Introduction

## Welcome to **DazzleDuck SQL Server**

[![GitHub Repo](https://img.shields.io/badge/GitHub-dazzleduck--sql--server-blue?logo=github)](https://github.com/dazzleduck-web/dazzleduck-sql-server)

**DazzleDuck SQL Server** is a high‑performance **remote server for DuckDB** that enables clients to execute analytical SQL queries over the network using modern, columnar data protocols.

Instead of embedding DuckDB directly inside every application, DazzleDuck exposes DuckDB as a **shared, multi‑client service**, supporting both:

- **Apache Arrow Flight SQL (gRPC)** for high‑throughput analytics
- **Versioned RESTful HTTP APIs** for simple and universal access

DazzleDuck focuses on _connectivity, scalability, and interoperability_ while delegating query planning and execution to DuckDB’s proven analytical engine.

---

## What Problems Does DazzleDuck Solve?

DuckDB is extremely fast and lightweight, but it is traditionally **embedded and single‑process**. DazzleDuck SQL Server fills the gap by providing:

- **Remote access** to DuckDB from multiple clients
- **Standardized protocols** (Flight SQL, HTTP) instead of custom drivers
- **Arrow‑native data transfer** for zero‑copy analytics
- **Operational features** like authentication, logs, metrics, and health checks

This makes DazzleDuck ideal for:

- Sharing DuckDB across teams and tools
- Powering BI tools and notebooks remotely
- Building lightweight analytical services and data platforms

---

## Core Capabilities

### Dual Protocol Access

- **Arrow Flight SQL (gRPC)**
  Designed for high‑performance analytical workloads. Compatible with JDBC and ADBC clients (Python, R, BI tools).

- **RESTful HTTP API (`/v1`)**
  Simple and flexible API for executing queries, ingesting data, generating query plans, and accessing the UI.

---

### Arrow‑Native Data Transfer

All query results and ingestion payloads use **Apache Arrow** formats. This ensures:

- Minimal serialization overhead
- Efficient transfer of large result sets
- Direct interoperability with DuckDB, Pandas, Spark, and other Arrow‑enabled systems

---

### Security & Operations

- **JWT authentication** for HTTP APIs
- **Health checks** for orchestration and monitoring
- **Micrometer metrics** for observability
- **Docker‑first deployment** for easy operations

---

## How DazzleDuck Fits Into the Ecosystem

DazzleDuck **does not replace DuckDB** — it extends it.

- DuckDB handles **SQL parsing, optimization, and execution**
- DazzleDuck handles **network access, protocols, security, and multi‑client coordination**

Together, they form a lightweight **remote analytics stack** that combines DuckDB’s performance with modern data connectivity.

---

## Get Started

Start using DazzleDuck in minutes:

- **Quick Start** — Run the server using Docker and execute your first query
- **HTTP API** — Query DuckDB remotely over REST
- **Arrow Flight SQL** — Connect using JDBC or ADBC drivers
- **UI Dashboard** — Monitor server activity and health

Continue with the **Quick Start Guide** to launch your first DazzleDuck SQL Server instance.

> _Fast analytics. Open protocols. DuckDB everywhere._
