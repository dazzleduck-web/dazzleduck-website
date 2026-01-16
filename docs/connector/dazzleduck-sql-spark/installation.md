---
sidebar_label: "Installation"
sidebar_position: 3
---

# Installation

This section explains how to set up **DazzleDuck SQL Spark Integration** for local or production use.

---

## Prerequisites

* Apache Spark **3.5.x**
* Java **17** or newer
* Docker (for running DazzleDuck SQL Server)

---

## Start DazzleDuck SQL Server

```bash
docker run -ti \
  -v "$PWD/example/data":/local-data \
  -p 59307:59307 \
  -p 8080:8080 \
  dazzleduck/dazzleduck \
  --conf warehouse=/warehouse
```

Ensure:

* Flight SQL port (`59307`) is reachable
* Credentials are configured (default: `admin/admin`)

---

## Launch Spark SQL with Package

```bash
bin/spark-sql \
  --packages io.dazzleduck.sql:dazzleduck-sql-spark:0.0.4
```

Spark will download the connector automatically.

---

## Connectivity Notes

* Use `disableCertificateVerification=true` for development
* Enable TLS in production
* Increase `connection_timeout` for large scans

---

## Verify Installation

Run:

```sql
SHOW TABLES;
```

If no errors occur, the connector is loaded correctly.
