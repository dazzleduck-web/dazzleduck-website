---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Logger

> High-performance Arrow-native logging over Apache Arrow Flight.

---

## Overview

**DazzleDuck SQL Logger** is an Arrow-based log transport system that sends application logs over **Apache Arrow Flight** instead of traditional files or sockets.

It enables structured, high-throughput, zero-copy logging pipelines using Arrow IPC and Flight streaming.

---

## What It Provides

✅ SLF4J-compatible logging  
✅ Arrow-native structured logs  
✅ Columnar log streams  
✅ Network transport via Flight  
✅ Asynchronous log batching  
✅ Zero-copy ingestion  
✅ Pluggable destinations  
✅ Backpressure & queue control  

---

## Components

### Logger Client (Java Agent)

- Captures logs via SLF4J
- Converts logs into Arrow batches
- Buffers asynchronously
- Sends Arrow over Flight

### Flight Log Server

- Accepts Arrow streams
- Decodes record batches
- Prints or forwards logs
- Extensible receiver

---

## Why Arrow-Based Logging?

Traditional logging is:

❌ Line-based  
❌ Text-only  
❌ Hard to process at scale  
❌ Costly to parse  

Arrow logging is:

✅ Columnar  
✅ Typed  
✅ Compressible  
✅ Analytics-ready  
✅ Streamable  
✅ Zero-copy  

---

## Typical Flow

```text
Application Log
      ↓
ArrowSimpleLogger (SLF4J)
      ↓
Arrow Batch Builder
      ↓
AsyncArrowFlightSender
      ↓
Arrow Flight Server
      ↓
Console / DB / Lake / Stream
```
---

## Use Cases

- Distributed logging  
- Audit pipelines  
- SQL workload tracing  
- Analytics-ready log ingestion  
- Structured observability  
- Stream processing  
- Schema-based logs  

Next: **[Installation & Setup →](setup.md)**