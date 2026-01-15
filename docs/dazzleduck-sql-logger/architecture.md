---
sidebar_label: "Architecture"
sidebar_position: 4
---

# Architecture

> How the log tail → Arrow → HTTP ingestion pipeline works.

---

## High-Level Design

```text
Log files (*.log)
      ↓
LogFileTailReader
      ↓
LogTailToArrowProcessor
      ↓
JsonToArrowConverter
      ↓
Arrow IPC batches
      ↓
HttpProducer
      ↓
DazzleDuck SQL Server (/v1/ingest)
      ↓
Parquet in warehouse
```

---

## Pipeline Stages

### 1. File Tailing

- Monitors a directory for new and existing log files
- Tails appended content only (no rereads)
- Handles file rotation and multiple files safely

---

### 2. JSON Parsing

- Each log line must be a single JSON object
- Invalid JSON lines are skipped safely
- Parsing errors do not crash the pipeline

---

### 3. Arrow Conversion

- Parsed records are converted into Arrow vectors
- Uses a fixed, schema-driven layout
- Data is batched to control memory and throughput

---

### 4. HTTP Ingestion

- Arrow IPC batches are sent via HTTP to DazzleDuck SQL Server
- Uses `/v1/ingest` endpoint
- Supports JWT authentication and retries
- Backpressure is enforced via bounded queues

---

## Threading Model

| Component      | Threading                 |
| -------------- | ------------------------- |
| File tailing   | Background watcher thread |
| JSON parsing   | Worker thread             |
| Arrow batching | Processor thread          |
| HTTP sending   | Async sender thread       |
| Backpressure   | Bounded queues            |

---

## Failure & Safety Guarantees

- Application never blocks on log ingestion
- Logs may be dropped under sustained pressure
- Failures are isolated and logged locally
- Pipeline continues running on partial failures

---

## Performance Characteristics

- Streaming-friendly
- Low memory overhead
- No disk writes during processing
- Arrow-native columnar transport
