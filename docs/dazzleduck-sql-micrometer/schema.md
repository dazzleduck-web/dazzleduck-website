---
sidebar_label: "Metric & Arrow Schema"
sidebar_position: 3
---

# Metric & Arrow Schema

> Exact schema used when exporting Micrometer metrics as Apache Arrow.

---

## Supported Meter Types

All core Micrometer meters are supported:

- Counter
- Gauge
- Timer
- DistributionSummary
- LongTaskTimer
- FunctionCounter
- FunctionTimer

---

## Arrow Schema (Authoritative)

Each published metric is written as **one Arrow row** using the following schema:

```text
name               STRING   NOT NULL
type               STRING   NOT NULL
application_id     STRING
application_name   STRING
application_host   STRING
tags               MAP<STRING, STRING> NOT NULL
value              DOUBLE
min                DOUBLE
max                DOUBLE
mean               DOUBLE
```

This schema is defined in `ArrowMetricSchema` and is **stable across releases**.

---

## Field Semantics

| Field            | Description                                             |
| ---------------- | ------------------------------------------------------- |
| name             | Metric name                                             |
| type             | Meter type (counter, timer, gauge, ...)                 |
| application_id   | Logical application identifier                          |
| application_name | Human‑readable service name                             |
| application_host | Hostname or node id                                     |
| tags             | Micrometer tags as key‑value map                        |
| value            | Primary metric value (count, gauge value, active tasks) |
| min              | Minimum observed value (when applicable)                |
| max              | Maximum observed value                                  |
| mean             | Mean / average value                                    |

---

## Type‑Specific Mapping

| Meter Type          | value        | min | max        | mean      |
| ------------------- | ------------ | --- | ---------- | --------- |
| Counter             | count        | 0   | 0          | 0         |
| Gauge               | value        | 0   | 0          | 0         |
| Timer               | count        | 0   | max(sec)   | mean(sec) |
| DistributionSummary | count        | 0   | max        | mean      |
| LongTaskTimer       | active tasks | 0   | total(sec) | avg(sec)  |
| Function meters     | computed     | 0   | computed   | computed  |

---

## Deterministic Output

The registry guarantees:

- Stable schema
- Deterministic ordering (sorted by type and name)
- Repeatable snapshots

This enables:

- CI regression checks
- Release comparisons
- Diff‑based validation
