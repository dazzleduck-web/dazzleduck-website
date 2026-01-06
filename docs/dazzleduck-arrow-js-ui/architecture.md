---
sidebar_label: "Architecture"
sidebar_position: 2
---

# Architecture

The **DazzleDuck Arrow JS UI** follows a thin‑client architecture that keeps all heavy computation on the server while the browser focuses on **query orchestration, Arrow decoding, and visualization**.

This design ensures scalability, correctness, and parity with real production usage.

---

## System Overview

```
┌───────────────────────────┐
│        Web Browser        │
│  (React + Arrow JS UI)    │
└────────────┬──────────────┘
             │ HTTP (JSON + Arrow IPC)
             ▼
┌───────────────────────────┐
│ DazzleDuck SQL HTTP Server│
│   /v1/query /v1/ingest    │
│   /v1/plan  /v1/login    │
└────────────┬──────────────┘
             │
             │ DuckDB (Arrow Native)
             ▼
┌───────────────────────────┐
│ Warehouse (Parquet/Arrow) │
└───────────────────────────┘
```

---

## Request Flow

### 1. Authentication

- UI sends credentials to `/v1/login`
- Server returns a JWT
- JWT is stored **in memory only** (never persisted)

### 2. Query Execution

- SQL is sent via `/v1/query` (GET or POST)
- Server executes SQL inside DuckDB
- Results streamed back as **Arrow IPC**

### 3. Rendering

- Arrow JS decodes IPC buffers
- Data is rendered as:

  - Tables
  - Charts
  - Raw inspection views

### 4. Cancellation

- Queries include a `queryId`
- UI can call `/v1/cancel` to interrupt execution

---

## Client Responsibilities

The UI intentionally keeps logic minimal:

- Session lifecycle
- Query state management
- Arrow decoding
- Visualization

All correctness, authorization, planning, and execution remain server‑side.

---

## Security Model

- JWT Bearer tokens in `Authorization` header
- Claims propagate execution context (org, path, function)
- No credentials or tokens written to disk

---

## Deployment Model

- Static frontend assets
- Can be hosted:

  - Behind the DazzleDuck HTTP server (`/v1/ui`)
  - As a standalone static site

---

## Why This Architecture Works

- Zero data duplication
- Arrow end‑to‑end
- Same behavior as real clients (curl, DuckDB, JDBC)
- Production‑safe by default

---

Next: **[Setup →](setup.md)**
