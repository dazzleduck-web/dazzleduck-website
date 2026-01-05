---
sidebar_label: "API Reference"
sidebar_position: 5
---

# API Reference

> HTTP API for executing DuckDB queries via Arrow Flight SQL.

#### All API endpoints are prefixed with `/v1`.

---

## Authentication

When enabled, endpoints require a JWT token:

```http
Authorization: Bearer <JWT>
```

---

## /query — Execute SQL

Execute a SQL statement and stream results.

### GET

```http
/query?q=SELECT+1
```

Optional caller-provided query id:

```http
/query?q=SELECT+1&id=42
```

You may also execute `SET` statements and session-level configuration:

```http
/query?q=SET+enable_progress_bar=true;
```

---

### POST

```http
POST /query
```

Body:

```json
{ "query": "SELECT * FROM users", "id": 42 }
```

### Response

- Arrow IPC stream
- Chunked streaming

Execution is delegated to the Flight SQL producer.

---

## /plan — Query Planning

Prepare a query without executing it.

```http
POST /plan
```

```json
{ "query": "SELECT * FROM users" }
```

Returns signed execution handles suitable for distributed execution.

---

## /cancel — Cancel Query

Cancel a running query by ID.

```http
POST /cancel
```

```json
{ "id": 42 }
```

---

## /ingest — Arrow Ingestion

Upload Arrow IPC streams for ingestion.

```http
POST /ingest?path=table/users
```

Supports partitioning, sorting, and transformations via headers.

---

## /login — Authentication

Issue a JWT token.

```http
POST /login
```

---

## /ui — Web UI

Serve the Arrow JS frontend.

```http
/ui
```

---

## Error Codes

| Status | Meaning         |
| -----: | --------------- |
|    400 | Invalid request |
|    401 | Unauthorized    |
|    404 | Not found       |
|    500 | Internal error  |

---

## Summary

The HTTP API provides secure, Arrow‑native access to DuckDB using standard web protocols.

