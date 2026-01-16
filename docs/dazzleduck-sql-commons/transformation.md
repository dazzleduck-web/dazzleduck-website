---
sidebar_label: "SQL Transformation"
sidebar_position: 3
---

# SQL Transformation

> AST-based SQL rewriting, normalization, and structural query manipulation.

---

## Overview

SQL Commons includes a **parser-driven transformation engine** that converts SQL strings into an Abstract Syntax Tree (AST).

This allows safe, semantic-aware query rewriting instead of fragile string replacements.

---

## Parsing SQL

```java
SqlTree tree = Transformations.parseToTree(sql);
```

Once parsed, the query can be inspected and modified programmatically.

---

## Capabilities

The transformation engine supports:

- Literal removal
- Predicate normalization
- Column remapping
- Function rewriting
- Canonical formatting
- Structural equality checks

---

## Example

Input:

```sql
SELECT * FROM users WHERE id = 100 OR id = 200
```

Transformed:

```sql
SELECT * FROM users WHERE id IN (?, ?)
```

---

## Usage in DazzleDuck

This engine is used for:

- Query fingerprinting
- Authorization rewriting
- Partition pruning
- Policy enforcement
- Planner optimization

---

## Production Considerations

- Always transform before hashing
- Avoid transforming raw user SQL directly
- Use canonical form for comparisons
