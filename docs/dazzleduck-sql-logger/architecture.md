---
sidebar_label: "Architecture"
sidebar_position: 4
---

# Architecture

> How the logger works under the hood.

---

## High-Level Design

```text
SLF4J
  ↓
ArrowSimpleLogger
  ↓
Batch Buffer
  ↓
Arrow IPC Writer
  ↓
AsyncArrowFlightSender
  ↓
Apache Arrow Flight
  ↓
SimpleFlightLogServer
```

---

## Logger Pipeline

### Capture

Log events are intercepted via **SLF4J SPI** using a custom service provider.

### Batch

Log events are accumulated in memory in batches of **10 records** by default.

### Serialize

Each batch is written as an **Apache Arrow IPC stream** into in-memory buffers.

### Send

The batch is enqueued for asynchronous network transfer using a scheduled sender.

---

## Server Processing

The Flight log server accepts:

```text
PUT (Arrow IPC streams)
```

And prints logs row-wise:

```text
[LOG RECEIVED] ts | level | logger | thread | message | app | host
```

---

## Flight Producer Design

The server implements a minimal `FlightProducer`:

* `acceptPut` → receives Arrow IPC streams
* `getFlightInfo` → no-op
  generates empty schema
* `getStream` → unsupported
* `doAction` → disabled

This is a **log sink**, not a query engine.

---

## Threading Model

| Component       | Threading Model     |
| --------------- | ------------------- |
| Logger call     | Application thread  |
| Batch flush     | Scheduled executor  |
| Sender transmit | Single async thread |
| Queue handling  | Non-blocking        |

---

## Performance Characteristics

* Zero-copy Arrow buffers
* No filesystem writes
* Network streaming only
* Bounded memory queue
* Background flushing

---

Next: **[Internals →](internals.md)**
