---
sidebar_label: "Internals"
sidebar_position: 5
---

# Internals (Advanced)

> Internals around file tailing + HTTP ingestion
---

## Arrow Schema

Logs are transmitted as Arrow rows with the following fields:

```text
timestamp
level
logger
thread
message
application_id
application_name
application_host
file_name
```

All fields are UTF8 for compatibility and simplicity.

---

## Processing Loop

```text
File tail → JSON parse → Arrow batch → HTTP send
```

### Detailed Flow

1. Log lines are read from files
2. JSON objects are validated
3. Records are appended to Arrow vectors
4. Batches are flushed based on size or time
5. Arrow IPC streams are sent via HTTP

---

## Backpressure Model

- Uses bounded queues
- Prevents unbounded memory growth
- Drops logs under sustained pressure

This design prioritizes **application safety over log completeness**.

---

## Error Handling

- Invalid JSON is skipped
- Network failures trigger retries
- Persistent failures result in drops
- Sender threads never block producers

---

## Security Model

- Transport security is provided by the HTTP layer
- JWT authentication is supported via `HttpProducer`
- Secrets should be provided via environment variables

---

## Performance Notes

This design avoids:

- Line-by-line text parsing
- Regex-heavy processing
- Synchronous I/O

Resulting in **analytics-ready logs at scale**.
