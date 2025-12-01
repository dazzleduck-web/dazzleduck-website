---
sidebar_label: "API Reference"
sidebar_position: 4
---

# API Reference

> HTTP + Flight SQL bridge for executing DuckDB remotely.

All endpoints accept **GET or POST** where applicable and may return **Arrow streams, JSON, or Flight binary** depending on endpoint.

---

## /query — Execute SQL

Executes SQL by internally issuing a **Flight SQL request** using a signed `StatementHandle`.

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
{
  "query": "SELECT * FROM users",
  "id": 100
}
```

### Response

- Arrow data stream (Flight format)
- Chunked row batches
- Binary response when Flight mode is enabled

### Execution semantics

- Each request creates a `StatementHandle`
- Handle is cryptographically signed
- Query routed to DuckDB via FlightSQL producer
- Arrow stream is piped directly to HTTP response

### DuckDB integration

DuckDB can directly consume query results:

```sql
SELECT *
FROM read_arrow(url_encode('http://localhost:8080/query?q=SELECT+1'));
```

Add authorization using DuckDB HTTP secrets:

```sql
CREATE SECRET http_auth (
  TYPE http,
  EXTRA_HTTP_HEADERS MAP {
    'Authorization': 'Bearer <JWT>'
  }
);
```

---

### POST

```http
POST /query
```

Body:

```json
{
  "query": "SELECT * FROM users",
  "id": 100
}
```

### Response

- Arrow data stream (Flight format)
- Chunked row batches
- Binary response when Flight mode is enabled

### Execution semantics

- Each request creates a `StatementHandle`
- Handle is cryptographically signed
- Query routed to DuckDB via FlightSQL producer
- Arrow stream is piped directly to HTTP response

---

## /plan — Query Planning

Prepares a SQL plan _without executing it_.

Internally, this uses `FlightProducer.getFlightInfo()` to return **statement tickets**.

```http
POST /plan
```

Body:

```json
{
  "query": "SELECT * FROM users"
}
```

### Advanced headers

Control splitting behavior:

```http
X-SPLIT-SIZE: 1
```

Split size determines the number of generated execution fragments.

### Response

```json
[{ "id": 1, "query": "...", "signed": true }]
```

Each entry is a signed `StatementHandle` that can later be executed using `/query` or canceled via `/cancel`.

---

## /cancel — Cancel Query

Stops a running statement by ID.

```http
POST /cancel
```

Body:

```json
{ "id": 42 }
```

### Result codes

| Status | Meaning           |
| ------ | ----------------- |
| 200    | Cancel succeeded  |
| 202    | Cancel accepted   |
| 409    | Already completed |

---

## /ingest — Upload Arrow

Uploads Arrow IPC streams and ingests them into DuckDB.

```http
POST /ingest?path=table/users
```

### Headers

```http
Content-Type: application/arrow
X-DATA-FORMAT: parquet | arrow
X-PRODUCER-ID: my_app
X-SORT-ORDER: id
X-DATA-PARTITION: column_name
X-DATA-TRANSFORMATION: (a + 1) AS b
```

### Behavior

- Accepts Arrow IPC streams
- Writes partitions under warehouse path
- Applies server-side SQL expressions
- Supports concurrent ingestion

---

## /login — Authenticate

Issues a JWT token using the configured secret.

```http
POST /login
```

---

## /ui — Frontend

Serves the Arrow JS UI for browser-based SQL execution.

```http
http://localhost:8080/ui
```

---

## 🔐 Authorization

When JWT authentication is enabled, these endpoints require a token:

- `/query`
- `/plan`
- `/ingest`
- `/cancel`

### Header format

```http
Authorization: Bearer <JWT>
```

Filter applied automatically before request execution.

---

## ✅ Summary

This API exposes DuckDB as a remote SQL engine via:

- SQL execution
- Query planning
- Streaming ingestion
- Cancellation
- Authentication
- Web UI integration

---

Wanna go Next? Visit : **[Architecture →](architecture.md)**
