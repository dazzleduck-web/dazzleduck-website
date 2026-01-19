---
sidebar_label: "Configuration"
sidebar_position: 3
---

# Configuration

> Configure the log ingestion pipeline.

---

## Configuration File

All logger settings are loaded from:

```
application.conf
```

Using **Typesafe Config**.

---

## Example Configuration

```conf
dazzleduck_logger {
  logDirectory = "/var/log/my-app"

  server {
    endpoint = "http://localhost:8081/v1/ingest"
    jwtToken  = "${DDAUTH_TOKEN}"
  }

  batching {
    batchSize = 1000
    flushIntervalMs = 2000
    queueCapacity = 10000
  }
}
```

---

## Key Settings

### Log Source

| Field        | Description                        |
| ------------ | ---------------------------------- |
| logDirectory | Directory containing `*.log` files |

---

### HTTP Ingestion

| Field    | Description                     |
| -------- | ------------------------------- |
| endpoint | DazzleDuck `/v1/ingest` URL     |
| jwtToken | JWT for authenticated ingestion |

---

### Batching & Backpressure

| Field           | Purpose                  |
| --------------- | ------------------------ |
| batchSize       | Logs per Arrow batch     |
| flushIntervalMs | Max delay before sending |
| queueCapacity   | Backpressure control     |

---

## Failure Handling

- Logs are dropped when the queue is full
- Application threads are never blocked
- Failures are logged locally
