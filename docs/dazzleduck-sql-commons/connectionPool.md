---
sidebar_label: "Connection Pool"
sidebar_position: 2
---

# Connection Pool

> Embedded DuckDB connection management with Arrow-native streaming support.

---

## Overview

`ConnectionPool` provides a **high-performance, thread-safe** way to execute SQL against an embedded DuckDB instance.

Unlike traditional pools, this implementation:

- Uses DuckDB's native connection duplication
- Streams results via Apache Arrow
- Avoids heavy JDBC object creation

---

## Key Features

- Singleton-managed DuckDB instance
- Connection duplication per request
- Arrow IPC streaming enabled by default
- Automatic statement and reader cleanup
- Batch execution helpers
- Record mapping utilities

---

## Basic Usage

### Execute a Query

```java
ConnectionPool.execute("SELECT 1");
```

### Print Results (Debugging)

```java
ConnectionPool.printResult("SELECT * FROM users");
```

### Collect a Single Value

```java
Long count = ConnectionPool.collectFirst("SELECT COUNT(*) FROM t", Long.class);
```

---

## Arrow Reader

```java
try (BufferAllocator allocator = new RootAllocator()) {
    ArrowReader reader = ConnectionPool.getReader(
        connection,
        allocator,
        "SELECT * FROM users",
        1000
    );
}
```

Arrow readers stream data in batches and must always be closed.

---

## Batch Execution

```java
ConnectionPool.executeBatch(new String[] {
    "CREATE TABLE t(a INT)",
    "INSERT INTO t VALUES (1)"
});
```

Transactional batch execution is also supported.

---

## Configuration

Properties are loaded from:

```text
src/main/resources/duckdb.properties
```

Common options:

```properties
duckdb.database=memory
duckdb.config.threads=4
duckdb.config.enable_external_access=true
```

---

## Production Notes

- Designed for **embedded** DuckDB only
- Not a network pool
- Prefer Arrow readers over ResultSet
- Always close readers and connections

---

Next: **[Query Transformation →](transformation.md)**
