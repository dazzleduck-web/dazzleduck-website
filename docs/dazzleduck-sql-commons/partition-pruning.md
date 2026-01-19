---
sidebar_label: "Partition Pruning"
sidebar_position: 5
---

# Partition Pruning

> Predicate-driven pruning for Hive and Delta Lake datasets.

---

## Overview

Partition pruning analyzes SQL predicates and eliminates irrelevant partitions **before query execution**.

This dramatically reduces I/O and improves query latency.

---

## Supported Layouts

- Hive-style partitions (`key=value/`)
- Delta Lake directories

---

## How It Works

```text
Parse SQL WHERE clause
        ↓
Extract partition predicates
        ↓
Resolve matching directories
        ↓
Exclude irrelevant partitions
        ↓
Execute reduced scan
```

---

## Example

Query:

```sql
SELECT * FROM sales WHERE year = 2024 AND month = 1
```

Scans only:

```text
/sales/year=2024/month=1/*
```

---

## Tools

### Hive

```bash
./mvnw exec:java -Dexec.mainClass="io.github.tanejagagan.sql.commons.hive.HivePartitionPruning"
```

### Delta Lake

```bash
./mvnw exec:java -Dexec.mainClass="io.github.tanejagagan.sql.commons.delta.PartitionPruning"
```

---

## Production Benefits

- Reduced disk I/O
- Faster queries
- Lower memory usage
- Scales to very large datasets
