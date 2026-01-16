---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Commons

> Core SQL intelligence and utility layer for the DazzleDuck SQL Server ecosystem.

---

## Overview

**DazzleDuck SQL Commons** is a foundational library that provides query intelligence, execution helpers, and optimization utilities on top of embedded **DuckDB**.

This module is not a standalone server. Instead, it powers:

- `dazzleduck-sql-http`
- `dazzleduck-sql-flight`
- Ingestion pipelines
- Query planning and split execution
- Authorization and policy enforcement

---

## What Problems It Solves

Traditional JDBC utilities are insufficient for modern analytical workloads. SQL Commons adds:

- Safe SQL rewriting (AST-based)
- Query fingerprinting and similarity detection
- Partition pruning (Hive / Delta Lake)
- Embedded DuckDB connection lifecycle management
- Arrow-native result streaming
- Ingestion helpers for Parquet and Arrow

---

## Key Capabilities

### Connection Management

- Embedded DuckDB pooling via `ConnectionPool`
- Arrow streaming enabled by default
- Automatic resource cleanup

### SQL Transformation

- Parse SQL into an AST
- Rewrite queries safely
- Normalize and canonicalize queries

### Query Fingerprinting

- Remove literals from predicates
- Generate stable hashes for similar queries
- Used for caching, analytics, and deduplication

### Partition Pruning

- Hive-style partition pruning
- Delta Lake pruning
- Predicate-based directory elimination

### Ingestion Utilities

- Arrow → Parquet helpers
- Partitioned writes
- Transformation-aware ingestion

---

## Where It Is Used

SQL Commons is the **query brain** of DazzleDuck.

All planning, pruning, transformation, and ingestion intelligence flows through this module.
