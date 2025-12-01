---
sidebar_label: "Partition Pruning"
sidebar_position: 5
---

# Partition Pruning

> Prunes Hive and Delta Lake partitions using query predicates before execution.

---

## Overview

SQL Commons applies **partition pruning** before query execution for:

- Delta Lake  
- Hive  

This avoids scanning irrelevant directories and dramatically reduces I/O.

---

## Delta Lake

Run the Delta pruning tool:

```bash
./mvnw exec:java \
  -Dexec.mainClass="io.github.tanejagagan.sql.commons.delta.PartitionPruning"
```

---

## Hive

Run the Hive pruning tool:

```bash
./mvnw exec:java \
  -Dexec.mainClass="io.github.tanejagagan.sql.commons.hive.HivePartitionPruning"
```

---

## How It Works

```text
Read WHERE clause
        ↓
Extract partition filters
        ↓
Resolve valid directories
        ↓
Prune unused partitions
        ↓
Reduce scan volume
```

---

## Example

SQL query:

```sql
SELECT * FROM sales WHERE year = 2024
```

Only reads:

```text
/sales/year=2024/*
```

---

## Benefits

✅ Faster queries  
✅ Lower I/O  
✅ Reduced memory usage  
✅ Smarter scans  
✅ Scales to large datasets  

---

Next: **[Ingestion Utilities →](ingestion-utils.md)**
