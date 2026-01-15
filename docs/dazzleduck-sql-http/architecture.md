---
sidebar_label: "Architecture"
sidebar_position: 4
---

# Architecture

> Internal design of the DazzleDuck SQL HTTP Server.

---

## High‑Level Design

```text
Client
  ↓
HTTP / HTTPS
  ↓
Helidon WebServer
  ↓
QueryService        → FlightProducer.getStream()
PlanningService     → FlightProducer.getFlightInfo()
IngestionService    → Bulk Arrow ingestion
CancelService       → Query interruption
LoginService        → JWT issuance
  ↓
DuckDB execution engine
(exposed via Arrow Flight SQL)
```

---

## Delegation Model

The HTTP layer:

- Does **not** execute SQL itself
- Does **not** manage DuckDB state
- Acts as a protocol bridge

All query execution, planning, ingestion, and cancellation are delegated to a **single Flight SQL producer**.

---

## Streaming Model

- Results are streamed as Arrow IPC batches
- Backpressure is honored end‑to‑end
- Large results do not accumulate in memory

---

## Error Handling

Custom exception hierarchy maps failures to HTTP responses:

| Exception              | HTTP Status |
| ---------------------- | ----------- |
| BadRequestException    | 400         |
| UnauthorizedException  | 401         |
| InternalErrorException | 500         |

---

## Summary

The HTTP server provides a clean separation:

- Thin HTTP façade
- Unified execution engine
- Predictable data flow
