---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Logger

> File-based log ingestion pipeline powered by Apache Arrow and DazzleDuck SQL Server.

---

## Overview

**DazzleDuck SQL Logger** is a **production-grade log ingestion pipeline** that tails JSON log files from disk, converts them into **Apache Arrow** format, and ingests them into **DazzleDuck SQL Server** over HTTP for durable storage and analytics (Parquet).

Unlike traditional logging systems that write line-oriented text files, this module produces **structured, columnar log data** that is immediately analytics-ready.

---

## What This Module Does

- Watches a directory for log files (`*.log`)
- Safely tails newly appended log lines
- Parses one-JSON-object-per-line log records
- Converts records into Apache Arrow batches
- Sends Arrow streams to DazzleDuck HTTP ingestion (`/v1/ingest`)
- Persists logs as Parquet in the warehouse

---

## Core Components

### Log Processing

- **LogFileTailReader**
  Detects new files and incrementally tails appended lines without rereading old data.

- **LogTailToArrowProcessor**
  Orchestrates tailing → JSON parsing → Arrow conversion → sending.

- **JsonToArrowConverter**
  Converts validated JSON log records into Arrow vectors using a fixed schema.

---

### Sending & Ingestion

- **HttpProducer**
  Sends Arrow IPC streams to the DazzleDuck SQL Server HTTP ingestion endpoint.
  Handles batching, retries, backpressure, and JWT authentication.

---

### Log Generation (Development & Testing)

- **SimpleLogGenerator** — Static logs for unit tests
- **LogFileGenerator** — Realistic rolling log files for end-to-end tests

---

## Why Arrow-Based Log Ingestion?

Traditional logging is:

❌ Line-based
❌ Text-only
❌ Expensive to parse
❌ Poor for analytics

Arrow-based ingestion is:

✅ Columnar
✅ Typed & schema-driven
✅ Zero-copy friendly
✅ Analytics-ready
✅ Efficient at scale

---

## When to Use This

Use **DazzleDuck SQL Logger** when you need:

- File-based log ingestion
- Real-time or near-real-time analytics
- Arrow-native transport
- Reliable end-to-end validation
- Logs stored as Parquet for SQL analytics
