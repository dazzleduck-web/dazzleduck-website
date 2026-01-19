---
sidebar_label: "Query Fingerprinting"
sidebar_position: 4
---

# Query Fingerprinting

> Detects semantically equivalent SQL queries by removing literals and hashing a canonical form.

---

## Overview

Query fingerprinting converts SQL into a **stable, normalized representation** so that logically identical queries map to the same fingerprint.

---

## Why Fingerprinting Matters

Fingerprinting enables:

- Query deduplication
- Cache key generation
- Hot query detection
- Retry pattern analysis
- Analytics aggregation

---

## Example

Input:

```sql
SELECT * FROM users WHERE id = 10
```

Normalized:

```sql
SELECT * FROM users WHERE id = ?
```

A hash is then generated from the normalized query.

---

## Tool Usage

```bash
./mvnw exec:java -Dexec.mainClass="io.github.tanejagagan.sql.commons.Fingerprint"
```

---

## Implementation Notes

- Uses AST-based transformation
- Ignores literal values
- Preserves query structure

---

## Production Use

Fingerprinting is used internally for:

- Metrics aggregation
- Planning heuristics
- Observability

---

### Read More:
Deep dive article → [https://medium.com/@tanejagagan/detecting-similar-sql-queries-using-duckdb](https://medium.com/@tanejagagan/ac5e00cb96b5)
