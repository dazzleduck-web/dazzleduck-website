---
sidebar_label: "Connection Pool"
sidebar_position: 2
---

# Connection Pool

> High-performance embedded DuckDB pooling with Arrow support and automatic lifecycle management.

---

## Overview

SQL Commons provides a built-in **DuckDB connection pool** for efficient query execution and reuse.

No external database setup is required — DuckDB runs embedded.

---

## Features

- Auto-initialization
- Thread-safe
- Statement reuse
- Arrow reader support
- Arrow streaming
- JDBC compatibility

---

## Usage

### Execute a Query

```java
ConnectionPool.execute("SELECT 1");
```

---

### Print Results

```java
ConnectionPool.printResult("SELECT * FROM users");
```

---

### Arrow Reader

```java
ArrowReader reader =
    ConnectionPool.getReader("SELECT * FROM users");
```

---

### Batch Execution

```java
ConnectionPool.executeBatch(new String[] {
    "CREATE TABLE t(a INT)",
    "INSERT INTO t VALUES (1)"
});
```

---

## Configuration

Properties are loaded from:

```text
src/main/resources/duckdb.properties
```

Example configuration:

```properties
duckdb.database=memory
duckdb.config.enable_external_access=true
duckdb.config.threads=4
```

---

## When to Use

Use this connection pool when:

- Running embedded DuckDB workloads
- Reading Arrow data directly
- Building ingestion pipelines
- Executing batch jobs
- Avoiding JDBC boilerplate

---

Next: **[Query Transformation →](transformation.md)**
