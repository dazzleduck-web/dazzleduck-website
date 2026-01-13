---
sidebar_label: "Architecture"
sidebar_position: 2
---

# Architecture

The Spark integration is built as a **Spark DataSource V2** that communicates with DazzleDuck SQL Server using **Arrow Flight SQL**.

---

## Key Components

### ArrowRPCTableProvider

* Entry point used by Spark (`USING io.dazzleduck.sql.spark.ArrowRPCTableProvider`)
* Parses Spark OPTIONS
* Constructs Arrow RPC–backed tables

### ArrowRPCTable

* Represents a logical Spark table
* Exposes schema and partitioning information
* Delegates scanning to Arrow RPC readers

### ArrowRPCScan / ArrowRPCScanBuilder

* Converts Spark logical plans into Arrow Flight SQL queries
* Handles projection, filtering, and aggregation rewriting

### ArrowPartitionReaderFactory

* Creates per-partition readers
* Enables Spark parallelism
* Each Spark task opens its own Arrow Flight stream

### FlightSqlClientPool

* Manages reusable Arrow Flight SQL connections
* Handles timeouts and authentication

---

## Query Lifecycle

1. Spark parses SQL query
2. Logical plan is translated into Arrow-compatible SQL
3. Spark requests partitions
4. Each task:

   * Opens Arrow Flight SQL connection
   * Streams Arrow record batches
5. Spark consumes batches as internal rows

---

## Query Rewriting

The integration rewrites Spark expressions into DuckDB-compatible SQL using:

* `DuckDBExpressionSQLBuilder`
* `QueryBuilderV2`
* Expression utilities (literals, field references)

Unsupported expressions are filtered early to fail fast.

---

## Partition Awareness

* Partition columns are declared explicitly
* Spark splits work across partitions
* DazzleDuck applies partition pruning where possible

This allows Spark to scale reads efficiently.

---

## Security Model

* Authentication handled via Arrow Flight SQL
* Username/password passed via JDBC-style URL
* TLS supported when enabled on server

---
 Next: **Installation & Setup**
