---
sidebar_label: "SQL Queries"
sidebar_position: 4
---

# Querying Metrics with SQL

> Once exported, your Micrometer metrics become a fully queryable analytics table.

---

## 📥 Load Arrow into DuckDB

Read your exported Arrow file directly:

```sql
SELECT *
FROM read_arrow('metrics.arrow');
```

✅ Your metrics now behave like a SQL table.

---

## ⏱ Analyze Latency

Inspect average and worst-case timings:

```sql
SELECT name, mean, max
FROM read_arrow('metrics.arrow')
WHERE type = 'timer';
```

✅ Perfect for performance tuning and bottleneck analysis.

---

## 🔥 Find Error Hotspots

Sort problem metrics to the top:

```sql
SELECT name, value
FROM read_arrow('metrics.arrow')
ORDER BY value DESC;
```

✅ Identify abnormal counters or spikes instantly.

---

## 🏷 Group by Tag

Aggregate by metadata such as environment, service, or endpoint:

```sql
SELECT
  tags['env'] AS environment,
  SUM(value) AS total
FROM read_arrow('metrics.arrow')
GROUP BY environment;
```

✅ Powerful filtering and grouping via tags.

---

## 📊 Historical Comparisons

Query multiple snapshots over time:

```sql
SELECT *
FROM read_parquet('snapshots/*.parquet')
WHERE ts > now() - interval '1 day';
```

✅ Ideal for trend analysis and regression detection.

---

## 📤 Export Anywhere

Convert Arrow files to other formats:

```sql
COPY read_arrow('metrics.arrow') TO 'metrics.parquet';
COPY read_arrow('metrics.arrow') TO 'metrics.csv';
```

✅ Zero lock-in — use your data anywhere.

---

## 🧠 Common Query Patterns

### Latency by endpoint

```sql
SELECT
  name,
  tags['endpoint'] AS endpoint,
  mean AS avg_latency
FROM read_arrow('metrics.arrow')
WHERE type = 'timer';
```

---

### High-volume counters

```sql
SELECT name, value
FROM read_arrow('metrics.arrow')
WHERE type = 'counter'
ORDER BY value DESC;
```

---

### Environment comparison

```sql
SELECT
  tags['env'] AS environment,
  AVG(mean) AS avg_latency
FROM read_arrow('metrics.arrow')
WHERE type = 'timer'
GROUP BY environment;
```

---

## ✅ Summary

With Arrow-Micrometer you can:

* Query metrics like tables
* Join, group, and filter
* Track regressions
* Compare releases
* Power dashboards

---

Next: **Usage Examples →**
