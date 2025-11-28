---
sidebar_label: "Architecture"
sidebar_position: 5
---

# Architecture

> Internal design of the DazzleDuck SQL HTTP Server.

---

## 🧩 High-Level Design

```text
Client
  │
  ▼
HTTPS / HTTP
  │
  ▼
Helidon WebServer
  │
  ├── QueryService      → FlightProducer.getStream()
  ├── PlanningService   → FlightProducer.getFlightInfo()
  ├── IngestService     → Bulk ingestion pipeline
  ├── CancelService     → Query interruption
  ├── LoginService      → JWT token issuance
  ▼
DuckDB Flight SQL Engine
```

The HTTP layer exposes DuckDB as a remote analytics engine using Apache Arrow Flight SQL.

---

## 🚦 Startup Process (from `Main.java`)

When the server boots, it follows this sequence:

1. Load configuration (CLI + file + defaults)
2. Configure logging
3. Enable CORS
4. Initialize Arrow `RootAllocator`
5. Resolve access mode (open / restricted)
6. Create DuckDB Flight SQL producer
7. Register all HTTP routes
8. Apply JWT filters (if enabled)
9. Start Helidon server

---

## 🏭 Producer Initialization

The DuckDB Flight SQL producer is initialized with:

- Warehouse path
- Access mode
- Temporary directories
- Ingestion factory
- Flight endpoint binding
- Base64 secret key

This producer becomes the single execution engine behind:

- Query execution
- Planning
- Ingestion
- Cancellation

---

## 🔐 Authentication Pipeline

When JWT is enabled, every protected request flows through:

```text
Request
  ↓
JwtAuthenticationFilter
  ↓
SqlAuthorizer.JWT_AUTHORIZER
  ↓
Service Handler
```

Authorization is enforced _before_ query execution begins.

---

## 🧨 Error Handling

Custom exception hierarchy maps failures to HTTP responses:

- `BadRequestException` → 400
- `InternalErrorException` → 500
- `HttpException` (base class)

Runtime errors are surfaced to the client with proper status codes.

---

## 📡 Streaming Model

Query results are returned using:

- Ticket-based execution
- Apache Arrow Flight streams
- `OutputStreamServerStreamListener` drains batches

This allows:

- Backpressure-aware streaming
- Low-memory operation
- Efficient large-result transfers

---

## 📦 Ingestion Model

### Input

- Arrow IPC streams
- Header-driven transforms
- Partitioning directives

### Output

- Files written into warehouse
- Columnar storage
- Optional sorting applied

---

## ✅ Summary

DazzleDuck SQL HTTP Server follows a clean split:

- Thin HTTP layer
- Strong Flight engine
- Deterministic data flow
- Unified execution core

---

Go to : **[Installation →](installation.md)**
