---
sidebar_label: "Ingestion"
sidebar_position: 6
---

# Ingestion Utilities

> Shared helpers for Arrow-based ingestion, partitioned writes, and Parquet output.

---

## Overview

Ingestion utilities provide reusable components used by:

- HTTP ingestion (`/v1/ingest`)
- Flight SQL ingestion
- Batch pipelines

They coordinate Arrow readers, partition logic, transformations, and file output.

---

## Key Components

| Component               | Purpose                          |
| ----------------------- | -------------------------------- |
| `ParquetIngestionQueue` | Buffered, batched Parquet writes |
| `BulkIngestQueue`       | Time / size-based batching       |
| `PostIngestionTask`     | Metadata and registration hooks  |
| `MappedReader`          | Column transformation            |

---

## ParquetIngestionQueue

### Responsibilities

- Accumulate Arrow batches
- Apply transformations
- Partition data
- Execute DuckDB `COPY` statements
- Emit ingestion metadata

Writes occur when:

- Bucket size threshold is reached, or
- Max delay expires

---

## SQL Generation

Ingestion uses DuckDB's native COPY:

```sql
COPY (
  SELECT *, expr AS col
  FROM read_arrow([...])
  ORDER BY col
)
TO 'path'
(FORMAT parquet, PARTITION_BY(col), RETURN_FILES);
```

---

## Cancellation Support

- Each write task registers a cancel hook
- Active DuckDB statements are cancelled safely

---

## Production Considerations

- Tune batch sizes carefully
- Monitor memory usage
- Prefer partitioned writes
- Handle retries at producer layer
