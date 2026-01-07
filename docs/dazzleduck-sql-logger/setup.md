---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Setup

> Run the log ingestion pipeline as a standalone process.

---

## Requirements

- Java 21+
- Maven (or `./mvnw`)
- Running DazzleDuck SQL Server (HTTP mode)

---

## Entry Point

The logger runs as a **standalone ingestion process**.

```
LogProcessorMain
```

---

## Configuration

All settings are read from:

```
application.conf
```

---

## Run the Log Processor

From the project root:

```bash
./mvnw exec:java \
  -pl dazzleduck-sql-logger \
  -Dexec.mainClass="io.dazzleduck.sql.logger.tailing.LogProcessorMain"
```

The processor will:

- Start directory monitoring
- Tail log files continuously
- Convert logs to Arrow batches
- Send data to DazzleDuck SQL Server over HTTP

---

## Verify Ingestion

- Check Parquet files in the warehouse
- Query ingested logs using DuckDB or DazzleDuck SQL Server

---

## Logging Behavior

- Pipeline failures never crash the application
- Logs may be dropped under backpressure
- Errors are printed locally for visibility

---

Next: **[Configuration →](configuration.md)**
