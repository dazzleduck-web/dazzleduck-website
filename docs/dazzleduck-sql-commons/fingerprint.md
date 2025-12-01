---
sidebar_label: "Query Fingerprinting"
sidebar_position: 4
---

# Query Fingerprinting

> Detects equivalent queries by removing literals and generating stable query hashes.

---

## Overview

Query fingerprinting transforms SQL queries into a **canonical form** by removing constants and normalizing structure.

This allows grouping logically identical queries even if their values differ.

---

## Purpose

Fingerprinting helps detect:

- Duplicate queries  
- Slight query variations  
- Query hotspots  
- Retry patterns  
- Inefficient patterns  

---

## Example

Convert:

```sql
SELECT * FROM users WHERE id = 10
```

Into:

```sql
SELECT * FROM users WHERE id = ?
```

Then compute a **hash** from the normalized SQL.

---

## Run the Tool

Generate fingerprints using:

```bash
./mvnw exec:java -Dexec.mainClass="io.github.tanejagagan.sql.commons.Fingerprint"
```

---

## Use Cases

✅ Query deduplication  
✅ Query cache labeling  
✅ Hotspot detection  
✅ Performance analytics  
✅ Optimization hints  

---

## Read More

Deep dive article:

https://medium.com/@tanejagagan/ac5e00cb96b5

---

Next: **[Partition Pruning →](partition-pruning.md)**
