---
sidebar_label: "SQL Queries"
sidebar_position: 4
---

# Querying Metrics with SQL

> Analyze Micrometer metrics using SQL after ingestion into DazzleDuck.

---

## Query Metrics Tables

Once ingested, metrics are stored as Parquet in the DazzleDuck warehouse and can be queried using DuckDB or DazzleDuck SQL Server.

```sql
SELECT * FROM metrics;
```

---

## Analyze Latency

Inspect timer behavior:

```sql
SELECT name, mean, max FROM metrics WHERE type = 'timer';
```

---

## Find High‑Volume Counters

```sql
SELECT name, value FROM metrics WHERE type = 'counter' ORDER BY value DESC;
```

---

## Group by Tag

```sql
SELECT tags['endpoint'] AS endpoint, AVG(mean) AS avg_latency FROM metrics WHERE type = 'timer' GROUP BY endpoint;
```

---

## Application‑Level Filtering

```sql
SELECT * FROM metrics WHERE application_name = 'orders';
```

---

## Historical Analysis

If metrics are partitioned by time or application:

```sql
SELECT application_name, AVG(mean) AS avg_latency FROM metrics GROUP BY application_name;
```

---

## Export Metrics

```sql
COPY metrics TO 'metrics_snapshot.parquet';
```

---

## Summary

With DazzleDuck SQL Micrometer you can:

- Query metrics with SQL
- Join metrics with other datasets
- Track regressions
- Perform offline analysis

---

Next: **Back to [Setup & Configuration →](setup.md)**
