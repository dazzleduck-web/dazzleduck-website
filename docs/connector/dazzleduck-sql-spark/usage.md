---
sidebar_label: "Usage"
sidebar_position: 4
---

# Usage (Spark SQL)

This section demonstrates how to query DazzleDuck-managed data from **Spark SQL**.

---

## Creating a Temporary View

```sql
CREATE TEMP VIEW t (key STRING, value STRING, p INT)
USING io.dazzleduck.sql.spark.ArrowRPCTableProvider
OPTIONS (
  url 'jdbc:arrow-flight-sql://localhost:59307?disableCertificateVerification=true&user=admin&password=admin',
  path '/local-data/parquet/kv',
  partition_columns 'p',
  connection_timeout 'PT60M'
);
```

---

## Querying the View

```sql
SELECT * FROM t;
```

Spark will:

* Request partitions
* Open parallel Arrow streams
* Process data using Spark execution engine

---

## Working with DuckLake

### Install & Load Extension

```sql
INSTALL ducklake;
LOAD ducklake;
```

### Attach Catalog

```sql
ATTACH 'ducklake:/warehouse/metadata'
AS my_catalog (DATA_PATH '/warehouse/data');
```

### Create Spark View

```sql
CREATE TEMP VIEW t (key STRING, value STRING, partition INT)
USING io.dazzleduck.sql.spark.ArrowRPCTableProvider
OPTIONS (
  url 'jdbc:arrow-flight-sql://localhost:59307?useEncryption=false&user=admin&password=admin',
  database 'catalog_name',
  schema 'schema_name',
  table 'table_name',
  partition_columns 'partition'
);
```

---

## Notes & Limitations

* Read-only integration
* Schema must match exactly
* Unsupported Spark expressions will fail fast

---

## Troubleshooting

| Issue              | Resolution                      |
| ------------------ | ------------------------------- |
| Connection refused | Check server + ports            |
| TLS errors         | Disable verification (dev only) |
| Timeout            | Increase `connection_timeout`   |

