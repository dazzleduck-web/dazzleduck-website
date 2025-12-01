---
sidebar_label: "SQL Transformation"
sidebar_position: 3
---

# SQL Transformation

> AST-based SQL rewriting, normalization, and structural query manipulation engine.

---

## Overview

SQL Commons provides an **AST-based SQL transformation engine**.

Instead of doing string replacements, queries are parsed into a structured tree that can be safely modified, rewritten, and normalized.

---

## Parsing SQL into a Tree

```java
SqlTree tree = Transformations.parseToTree(sql);
```

Once parsed, the query becomes a navigable structure instead of text.

---

## Capabilities

The transformation engine can:

- Normalize queries
- Remove literals
- Modify filters
- Remap columns
- Rewrite functions
- Apply canonical formatting

---

## Example Rewrite

Convert:

```sql
SELECT * FROM users WHERE age > 25
```

Into:

```sql
SELECT * FROM users WHERE age > ?
```

---

Convert:

```sql
WHERE id = 100 OR id = 200
```

Into:

```sql
WHERE id IN (?, ?)
```

---

## Applications

This engine is used for:

- Fingerprinting
- Authorization rewriting
- Predicate pushdown
- Optimization
- Policy enforcement
- Safety checks

---

## Summary

SQL Transformation is the foundation for:

✅ SQL rewriting  
✅ Security  
✅ Performance  
✅ Fingerprinting  

---

Next: **[Fingerprinting →](fingerprint.md)**
