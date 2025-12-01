---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Commons

> Core SQL intelligence layer for DuckDB and analytical systems.

---

## Overview

**DazzleDuck SQL Commons** is a utility and processing library that powers query intelligence inside the DazzleDuck ecosystem.

It provides:

- Query transformation and normalization
- Partition pruning logic
- SQL fingerprinting
- Connection pooling
- Query parsing utilities
- File scanning helpers
- Query planning helpers
- Delta Lake and Hive optimizations

This module is used internally by:

- HTTP Server
- Flight Server
- Arrow ingestion APIs
- Authorization logic
- Planner and optimizer layers

---

## What Problems Does It Solve?

SQL Commons is built to handle workloads that traditional JDBC utilities do not:

✅ Rewriting SQL safely  
✅ Removing query literals for analytics  
✅ Pruning data early  
✅ Detecting similar queries  
✅ Managing DuckDB connections  
✅ Reading Arrow efficiently  
✅ Partition-aware filters  
✅ Advanced query fingerprints  

---

## Key Capabilities

### Connection Management
Efficient DuckDB pooling.

### SQL Normalization
Canonical SQL trees for consistent analysis.

### Query Fingerprinting
Detect duplicate and similar queries at scale.

### Partition Pruning
Reduce I/O by skipping partitions at query time.

### Ingestion Helpers
Metadata + transformation support.

### Planner Utilities
Used by split execution and federated planning.

---

## When Should You Use It?

Use SQL Commons if you need:

✅ Analytical SQL processing  
✅ Intelligent query routing  
✅ Partition classification  
✅ Optimization utilities  
✅ Query similarity detection  
✅ Embedded DuckDB helpers  

---

## Summary

This module is the **query brain** of DazzleDuck.

All planning, pruning, authorization, ingestion intelligence flows from here.

---

Next: **[Connection Pool →](connectionPool.md)**
