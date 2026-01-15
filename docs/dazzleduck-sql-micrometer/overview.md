---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Micrometer

> Turn Micrometer metrics into SQL‑queryable datasets using Apache Arrow and DazzleDuck SQL Server.

---

## Overview

**DazzleDuck SQL Micrometer** integrates **Micrometer** with **DazzleDuck SQL Server** by exporting runtime metrics as **Apache Arrow** records and ingesting them over HTTP for durable storage and analytics.

Instead of treating metrics as short‑lived monitoring signals only suitable for dashboards, this module makes metrics **first‑class analytical data** that can be queried with SQL, joined with other datasets, and analyzed over time.

---

## What This Module Does

- Implements a custom **Micrometer `MeterRegistry`**
- Periodically snapshots all registered meters (step‑based publishing)
- Normalizes metrics into a **stable Arrow schema**
- Sends Arrow batches to **DazzleDuck SQL Server** via HTTP ingestion
- Persists metrics as Parquet in the warehouse

---

## High‑Level Pipeline

```text
Micrometer meters
      ↓
ArrowMicroMeterRegistry (StepMeterRegistry)
      ↓
Arrow rows (metrics snapshot)
      ↓
HttpProducer
      ↓
DazzleDuck SQL Server (/v1/ingest)
      ↓
Parquet metrics tables
```

---

## Why SQL‑First Metrics Matter

Micrometer excels at **real‑time observability**, but it is not designed for:

- Cross‑metric joins
- Long‑term historical analysis
- Regression detection in CI
- Release‑to‑release performance comparisons
- Ad‑hoc forensic queries

By exporting metrics as Arrow and storing them in DazzleDuck, you unlock:

- SQL analytics over metrics
- Offline and batch analysis
- Deterministic, reproducible snapshots
- Integration with DuckDB, Pandas, Spark, and BI tools

---

## What This Is (and Is Not)

**This is:**

- An analytics‑oriented Micrometer registry
- A bridge between observability and data analytics
- A producer of Arrow‑native metric datasets

**This is not:**

- A Prometheus replacement
- A metrics visualization UI
- A time‑series database

---

## When to Use This

Use **DazzleDuck SQL Micrometer** when you need:

- SQL over metrics
- Performance regression detection
- CI or benchmark validation
- Historical metric comparisons
- Analytics‑ready observability data
