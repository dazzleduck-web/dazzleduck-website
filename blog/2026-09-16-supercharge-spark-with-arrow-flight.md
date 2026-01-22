---
slug: supercharge-spark-with-arrow-flight
title: "Supercharge Spark Clusters with Arrow Flight SQL"
authors: [gagan-taneja]
tags: [spark, arrow-flight, duckdb, architecture, distributed-sql]
date: 2025-09-16
description: "How Arrow Flight SQL and DuckDB can be combined with Apache Spark to build a high-performance, scalable, and cost-efficient analytics architecture."
---

Apache Spark has proven itself as a powerful platform for scalable, fault-tolerant data processing across massive datasets. DuckDB, in contrast, is designed as an in-process OLAP database optimized for high-performance, single-node analytical execution.

By combining Apache Spark’s orchestration and distributed execution model with DuckDB’s vectorized query engine using Apache Arrow IPC, we can build a highly efficient architecture that reduces data movement, lowers operational costs, and improves end-to-end query performance.

This article explores the technologies involved, the system architecture, and the practical benefits of integrating Spark with an Arrow Flight SQL server backed by DuckDB.

---

<!-- truncate -->

## Arrow Flight SQL Server

Arrow Flight SQL is a high-performance protocol within the Apache Arrow ecosystem designed specifically for SQL-based data access. It provides a modern alternative to traditional connectivity protocols such as JDBC and ODBC by enabling columnar, zero-copy data transfer over gRPC.

In this setup, we use the **DazzleDuck Flight SQL Server**, which supports SQL planning and execution using DuckDB as its execution engine. The server exposes two primary endpoints:

* **HTTP endpoint** for SQL execution and query planning
* **Arrow Flight SQL (gRPC)** endpoint for high-performance, binary data transfer

---

## Running the Flight SQL Server

The easiest way to start the server is via Docker. The image includes a small sample dataset located at `/data/`.

```bash
docker run -ti -p 59307:59307 -p 8080:8080 dazzleduck/dazzleduck:latest
```

Once started, the server exposes:

* HTTP on port `8080`
* Arrow Flight SQL on port `59307`

---

## Querying the Server from DuckDB

In a separate terminal, start DuckDB and install the Arrow extension:

```sql
INSTALL arrow FROM community;
LOAD arrow;
```

You can now execute SQL queries remotely against the Arrow Flight SQL server and read the results directly into DuckDB using Arrow IPC.

```sql
SET VARIABLE encoded_query = url_encode(
  'FROM (
     FROM (VALUES(NULL::DATE, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR))
       t(dt, p, key, value)
     WHERE false
     UNION ALL BY NAME
     FROM read_parquet(''/data/hive_table/*/*/*.parquet'',
       hive_partitioning = true,
       hive_types = {''dt'': DATE, ''p'': VARCHAR})
   )'
);

SELECT *
FROM read_arrow(
  concat('http://localhost:8080/query?q=', getvariable(encoded_query))
);
```

At this point, you have executed a remote query through the Arrow Flight SQL server and consumed the results locally using DuckDB.

---

## Parallel Query Execution via Planning and Splitting

For large datasets, a single DuckDB instance may not be sufficient. To address this, the DazzleDuck HTTP planning service can split a query into multiple independent tasks that can be executed in parallel.

Consider the following query:

```sql
SELECT count(*), key
FROM read_parquet('/data/hive_table/')
GROUP BY key;
```

If the dataset consists of multiple files, the planner can split this query into smaller subqueries, each targeting a subset of files. For example:

```sql
SELECT count(*), key FROM read_parquet('file1') GROUP BY key;
SELECT count(*), key FROM read_parquet('file2') GROUP BY key;
SELECT count(*), key FROM read_parquet('file3') GROUP BY key;
```

The planning endpoint can be invoked as follows:

```sql
SELECT *
FROM read_json(
  concat('http://localhost:8080/plan?split_size=1&q=', getvariable(encoded_query))
);
```

The response contains multiple query splits, which can be executed independently and in parallel.

---

## Reducing Results with Apache Spark

To combine the partial results, Apache Spark can be used as a reduction engine. This approach leverages Spark’s distributed execution model while keeping the heavy scanning and filtering work close to the data.

### Spark Connector for Arrow Flight SQL

The DazzleDuck Spark connector is implemented using the Spark DataSource API and provides native integration with Arrow Flight SQL servers.

The connector performs the following steps:

1. Requests query splits from the Flight SQL planning service
2. Dispatches splits to Spark executors
3. Executes splits against the Arrow Flight SQL server
4. Receives results in Arrow IPC format
5. Performs final aggregation and reduction in Spark

---

## Running the Spark Example

Start Spark SQL with the connector:

```bash
bin/spark-sql \
  --packages io.dazzleduck.sql:dazzleduck-sql-spark:0.0.4
```

Create a temporary view backed by the Arrow Flight SQL server:

```sql
CREATE TEMP VIEW t (
  key STRING,
  value STRING,
  dt DATE,
  p STRING
)
USING io.dazzleduck.sql.spark.ArrowRPCTableProvider
OPTIONS (
  url 'jdbc:arrow-flight-sql://localhost:59307?disableCertificateVerification=true&user=admin&password=admin',
  partition_columns 'dt, p',
  path '/data/hive_table',
  connection_timeout 'PT60m'
);
```

Run the distributed query:

```sql
SELECT count(*), key FROM t GROUP BY key;
```

Spark handles the final reduction, while the Arrow Flight SQL server performs efficient, columnar data access.

---

## Architectural Benefits

### Multi-Cloud and On-Premise Interoperability

Arrow Flight SQL acts as a universal, high-performance interface for analytical data across heterogeneous environments. Whether data resides on-premise or in different cloud providers, the same protocol and data format can be used consistently.

### Centralized Functionality

By centralizing caching, authentication, and access control at the Arrow Flight SQL server layer, organizations can simplify client applications and enforce consistent security policies.

### Processing Closer to the Data

This architecture pushes the majority of data reduction closer to storage, minimizing data transfer to expensive compute layers and enabling lightweight tools such as DuckDB and Polars to operate efficiently.

### Statelessness and Scalability

Arrow Flight SQL servers are typically stateless, allowing them to scale horizontally behind load balancers without complex coordination or state management.

---

## Final Thoughts

While adding an Arrow Flight SQL layer may initially seem like extra complexity, it ultimately simplifies the data stack by standardizing data access on a modern, high-performance protocol.

This approach enables composable, cost-efficient analytics architectures that combine the strengths of distributed engines like Spark with high-performance, in-process query engines such as DuckDB.

By adopting Arrow Flight SQL, organizations can build systems that are easier to scale, easier to secure, and significantly faster to operate.
