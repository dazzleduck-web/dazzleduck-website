---
sidebar_label: "Ingestion"
sidebar_position: 4
---

# Arrow Ingestion Pipeline

---

## Supported Formats

The Flight server supports multiple ingestion formats:

- Arrow IPC stream
- Parquet
- FlightSQL `ExecuteIngest`
- HTTP ingestion (when HTTP server is enabled)

---

## Arrow IPC Example (FlightSQL)

Java client example:

```java
FlightSqlClient.ExecuteIngestOptions opts =
 new FlightSqlClient.ExecuteIngestOptions(
    "",
    FlightSql.CommandStatementIngest
        .TableDefinitionOptions.newBuilder().build(),
    false,
    "",
    "",
    Map.of("path", "users.parquet")
);

sqlClient.executeIngest(arrowStream, opts);
```

---

## HTTP Ingestion Headers

When using HTTP ingestion, the following headers control behavior:

```http
Content-Type: application/arrow
X-DATA-PARTITION: column
X-DATA-TRANSFORMATION: expr
X-SORT-ORDER: field desc
```

---

## Partition Example

Arrow files are written in a partitioned layout:

```text
/path/orders
  year=2025/
    part-0001.parquet
```

---

## Transform Example

Add a computed column:

### Header

```http
X-DATA-TRANSFORMATION: (a + 1) AS b
```

### Result Query

```sql
SELECT a, b FROM table;
```

---

## Concurrency Model

Ingestion is production-safe and parallel:

- ✅ Writers execute safely
- ✅ Temp paths isolate sessions
- ✅ Atomic commit to warehouse
- ✅ Thread-safe ingest pipeline

---

## Consumption Example

Read ingested data:

```sql
SELECT * FROM read_parquet('/warehouse/orders/*/*.parquet');
```

---

Want to visit **[JDBC](jdbc.md)** ?
