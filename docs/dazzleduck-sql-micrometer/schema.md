---
sidebar_label: "Schema"
sidebar_position: 3
---

# Metric Types & Arrow Schema

> Learn how Micrometer metrics are transformed into structured, queryable Arrow datasets.

---

## 📚 Supported Meter Types

Arrow-Micrometer supports **all core Micrometer meters** and preserves their semantics in Arrow form:

| Meter Type          |
| ------------------- |
| Counter             |
| Gauge               |
| Timer               |
| DistributionSummary |
| LongTaskTimer       |
| FunctionCounter     |
| FunctionTimer       |

✅ No data loss. No down-sampling.

---

## 🧱 Row Representation

Each metric snapshot is written as a **row** in the Arrow dataset.

### Fields per row

| Field   | Description                        |
| ------- | ---------------------------------- |
| `name`  | Metric name                        |
| `type`  | Meter classification               |
| `tags`  | Key-value metadata                 |
| `value` | Current value                      |
| `count` | Event count                        |
| `total` | Total duration / accumulated value |
| `mean`  | Average                            |
| `max`   | Maximum                            |
| `ts`    | Timestamp                          |

---

## 🧬 Example Arrow Schema

```java
name    STRING
type    STRING
tags    MAP<STRING, STRING>
value   DOUBLE
count   DOUBLE
total   DOUBLE
mean    DOUBLE
max     DOUBLE
ts      TIMESTAMP
```

✅ The schema is designed for fast SQL and DataFrame usage.

---

## 🔄 Type Mapping

How Micrometer meters translate into Arrow fields:

| Micrometer Type     | Arrow Columns           |
| ------------------- | ----------------------- |
| Counter             | `value`                 |
| Gauge               | `value`                 |
| Timer               | `count`, `mean`, `max`  |
| DistributionSummary | `min`, `max`, `total`   |
| LongTaskTimer       | active task information |
| Function meters     | computed on read        |

---

## 🎯 Deterministic Output

Arrow-Micrometer guarantees **deterministic output** for reproducibility and auditing.

### Guarantees

* Metrics are sorted by name
* Schema is stable across runs
* Order is deterministic
* Output is diff-friendly

---

## ✅ Why determinism matters

Deterministic output makes Arrow-Micrometer perfect for:

✅ CI regression detection
✅ Release comparisons
✅ Diff-based validation
✅ Forensic debugging

---

## ✅ Summary

Arrow-Micrometer gives you:

* A stable schema
* Clean SQL access
* Consistent output
* Cross-tool compatibility

---

Next: **[Usage & Querying →](querying.md)**
