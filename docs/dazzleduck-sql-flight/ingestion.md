---
sidebar_label: "Ingestion"
sidebar_position: 4
---

# Data Ingestion (Flight SQL)

The Flight SQL module supports **high-throughput Arrow-native ingestion** directly into the warehouse.

---

## Supported Formats

- Apache Arrow IPC streams
- Parquet output

---

## Ingestion Flow

```text
Client (Arrow IPC)
        │
        ▼
Flight SQL Ingestion
        │
        ├── Validation
        ├── Optional Transformations
        ├── Partitioning
        ▼
Parquet Files in Warehouse
```

---

## Features

### Partitioning

- Partition by one or more columns
- Hive-style directory layout

### Transformations

- Apply expressions during ingest
- Compute derived columns

### Concurrency

- Fully concurrent ingestion
- Safe for parallel writers

---

## Example (Conceptual)

```sql
INSERT INTO table
SELECT * FROM arrow_stream
```

---

## Production Considerations

- Use partitioning for large datasets
- Monitor disk usage
- Prefer Arrow streams over row-based inserts
