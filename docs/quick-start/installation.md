---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation

**Installation methods** for **DazzleDuck SQL Server**.

DazzleDuck is distributed as a **Docker image** and can also be run directly from source for development.

---

## Option 1 — Run with Docker (Recommended)

Docker is the easiest and most reliable way to run DazzleDuck.

```bash
docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data
```

### Exposed Ports

|  Port | Purpose                 |
| ----: | ----------------------- |
| 59307 | Arrow Flight SQL (gRPC) |
|  8081 | HTTP API & UI           |

---

## Option 2 — Run from Source (Development)

### Requirements

- Java 21
- Maven (or `./mvnw`)

### Build

```bash
./mvnw clean package -DskipTests
```

### Run

```bash
export MAVEN_OPTS="--add-opens=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED"
```
```bash
./mvnw exec:java -pl dazzleduck-sql-runtime -Dexec.mainClass="io.dazzleduck.sql.runtime.Main" -Dexec.args="--conf warehouse=warehouse"
```

---

## Verify Installation

- **Health Check:** [http://localhost:8081/health](http://localhost:8081/health)
- **UI Dashboard:** [http://localhost:8081/v1/ui](http://localhost:8081/v1/ui)
- **Flight SQL:** grpc+tcp://localhost:59307

---

## Next Steps

- **[Quick Start](quickstart.md)** — Run your first queries
- **[Configuration](configuration.md)** — Auth, TLS, warehouse, fetch size
- **Clients** — JDBC, Python (ADBC), DuckDB
