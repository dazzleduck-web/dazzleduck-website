---
sidebar_label: "Setup & Configuration"
sidebar_position: 2
---

# Setup & Configuration

> Enable Arrow‑based metric ingestion using Micrometer and DazzleDuck SQL Server.

---

## Requirements

- Java 21+
- Micrometer 1.10+
- Running DazzleDuck SQL Server (HTTP ingestion enabled)

---

## How It Works

This module provides a **Micrometer `MeterRegistry`** that periodically publishes metric snapshots as **Apache Arrow** rows and ingests them into DazzleDuck SQL Server over HTTP.

Registry creation and wiring is **configuration‑driven**.

---

## Registry Creation

Create and register the Arrow‑backed registry using the factory:

```java
MeterRegistry registry = MetricsRegistryFactory.create();

Metrics.addRegistry(registry);
```

This returns a `CompositeMeterRegistry` that contains an `ArrowMicroMeterRegistry` instance.

---

## Configuration Source

All settings are loaded from **Typesafe Config**:

```conf
dazzleduck_micrometer { ... }
```

Configuration can be provided via:

- `application.conf`
- Environment variables
- JVM system properties

---

## Example Configuration

```conf
dazzleduck_micrometer {
  application_id   = "orders-service"
  application_name = "orders"
  application_host = "host-1"

  http {
    base_url = "http://localhost:8081"
    target_path = "/v1/ingest"
    username = "admin"
    password = "admin"
    http_client_timeout_ms = 5000
  }

  max_in_memory_bytes = 10485760   # 10 MB
  max_on_disk_bytes   = 1073741824 # 1 GB

  min_batch_size = 1048576 # 1 MB
  max_batch_size = 16777216 # 16 MB
  max_send_interval_ms = 1000

  retry_count = 3
  retry_interval_ms = 1000
  transformations = []
  partition_by = []
}
```

---

## Publishing Model

- Metrics are published on a **fixed step interval** (default: 10s)
- Each publish cycle sends a **snapshot** of all meters
- Publishing is non‑blocking and failure‑tolerant

---

## Graceful Shutdown

Always close the registry on application shutdown:

```java
registry.close();
```

This ensures:

- Final metric flush
- Sender shutdown
- Resource cleanup
