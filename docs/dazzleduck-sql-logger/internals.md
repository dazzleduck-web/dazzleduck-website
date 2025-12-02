---
sidebar_label: "Internals"
sidebar_position: 5
---

# Internals (Advanced)

---

## Arrow Schema

Logs are transmitted as Arrow rows:

```text
timestamp
level
logger
thread
message
applicationId
applicationName
host
destinationUrl
```

Typed as UTF8 fields.

---

## Transport

* Arrow Flight `PUT` operations
* Binary Arrow IPC payloads
* Backpressure via `BlockingQueue`
* Batching + scheduled flushing

---

## Async Sender Loop

```text
Queue → Batch → ArrowReader → Flight PUT
```

### Flow

1. Logs are enqueued into a bounded queue
2. Background thread groups into batches
3. Arrow IPC stream is reconstructed
4. Stream is sent via Flight `startPut`
5. Server acknowledges receipt

---

## Error Handling

Designed for safety and isolation:

* No application crash on failures
* Logs dropped under pressure
* Failures printed locally
* Sender thread is daemonized

---

## Extending the Server

The Flight log server can be extended to:

* Insert rows into DuckDB
* Write logs to Parquet
* Push to Kafka
* Stream to HTTP
* Persist to S3 / blob stores

---

## Security Model

### Current

* ❌ No encryption
* ❌ No authentication

### Planned

* ✅ JWT authentication
* ✅ TLS encryption
* ✅ Token-based ingestion control

---

## Performance Notes

Arrow logging avoids:

* JSON overhead
* String parsing
* Regex-based processing
* Unstructured formats

This enables **analytics-ready logging at scale**.
