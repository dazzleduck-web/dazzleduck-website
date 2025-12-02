---
sidebar_label: "Configuration"
sidebar_position: 3
---

# Configuration

> Configure the logger for your environment.

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
dazzleduck_server {
  id = "app-1"
  name = "order-service"
  host = "10.0.0.10"
  destinationUrl = "grpc://log-server:32010"
}
```

---

## Field Descriptions

| Field          | Purpose                |
| -------------- | ---------------------- |
| id             | Unique app instance ID |
| name           | Service name           |
| host           | Host identifier        |
| destinationUrl | Log server target      |

---

## Queue Settings (Advanced)

Configure in code when creating the sender manually:

```java
new AsyncArrowFlightSender(
    "localhost",
    32010,
    10000,    // queue capacity
    10,       // batch size
    Duration.ofSeconds(2)
);
```

---

## Batch Controls

| Control        | Behavior              |
| -------------- | --------------------- |
| MAX_BATCH_SIZE | Logs per Arrow batch  |
| Flush interval | Network push interval |
| Queue size     | Backpressure control  |

---

## Failure Handling

When the queue is full:

* Logs are dropped
* Application is not blocked
* Failure is printed to `stderr`

---

Next: **[Architecture →](architecture.md)**
