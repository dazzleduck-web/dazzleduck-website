---
sidebar_label: "Overview"
sidebar_position: 1
---

# DazzleDuck SQL Spark Integration

[![GitHub Repo](https://img.shields.io/badge/GitHub-dazzleduck--sql--spark-blue?logo=github)](https://github.com/dazzleduck-web/dazzleduck-sql-spark)
[![Medium Blog](https://img.shields.io/badge/Medium-Supercharge%20Spark%20Cluster-green?logo=medium)](https://medium.com/@tanejagagan/supercharge-spark-cluster-with-arrow-flight-server-d3854972dab0)

The **DazzleDuck SQL Spark Integration** enables **Apache Spark SQL** to query data stored in **DazzleDuck SQL Server** using **Apache Arrow Flight SQL**. It allows Spark to treat remote DuckDB-backed datasets as native Spark tables, without copying data into Spark-managed storage.

This module is designed for **distributed analytics**, where Spark handles execution planning and parallelism, while DazzleDuck acts as a high-performance, Arrow-native storage and query backend.

---

## Purpose

This integration exists to:

* Query **remote DuckDB / DuckLake / Parquet** data directly from Spark
* Avoid data duplication between DuckDB and Spark
* Use **Arrow Flight SQL** for efficient, columnar, zero-copy data transfer
* Enable Spark-based analytics on top of DazzleDuck-managed warehouses

It is particularly useful when:

* Spark is used for large-scale joins or ML pipelines
* DuckDB/DazzleDuck is used for ingestion, compaction, and storage
* You want Spark and DuckDB to coexist in the same data architecture

---

## What This Module Provides

* A **Spark DataSource V2** implementation
* An **Arrow Flight SQL–backed table provider**
* Partition-aware reading for parallel Spark execution
* Predicate and aggregation-aware query planning

Spark sees DazzleDuck tables as **temporary views** backed by a remote Arrow RPC source.

---

## High-Level Architecture

```
Spark SQL
  │
  │ DataSource V2
  ▼
ArrowRPCTableProvider
  │
  │ Arrow Flight SQL (gRPC)
  ▼
DazzleDuck SQL Server
  │
  │ DuckDB / DuckLake
  ▼
Warehouse (Parquet / DuckLake)
```

* Spark drives query execution
* DazzleDuck serves Arrow record batches
* Data remains columnar end-to-end

---

## Relationship to DazzleDuck SQL Server

This project is **not part of** `dazzleduck-sql-server`, but depends on it at runtime.

| Component             | Responsibility                       |
| --------------------- | ------------------------------------ |
| Spark                 | Distributed execution & scheduling   |
| DazzleDuck SQL Server | Storage, ingestion, Arrow Flight SQL |
| Arrow Flight          | Transport layer                      |

---

## Typical Use Cases

* Distributed analytics over Parquet or DuckLake
* Spark-based ETL reading from DuckDB-managed data
* Federated architectures (DuckDB for storage, Spark for compute)
* Large partitioned reads with predicate pushdown

---

## Scope & Non-Goals

**In scope:**

* Reading data from DazzleDuck into Spark
* Partition-aware parallelism

**Out of scope:**

* Writing data back to DazzleDuck from Spark
* Replacing Spark’s execution engine
* Acting as a Spark catalog
