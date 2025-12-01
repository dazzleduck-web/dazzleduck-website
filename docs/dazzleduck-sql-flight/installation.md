---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Startup

---

## Requirements

Before starting, ensure you have:

- Java 21+
- Maven
- DuckDB extension support
- Open gRPC port (default: `flight_sql.port`)

---

## Build

From the project root, run:

```bash
mvn clean install
```

---

## Run Server

Start the FlightSQL server:

```bash
java -jar target/dazzleduck-sql-flight.jar
```

### Expected Output

```text
Flight Server is up: Listening on URI: grpc://localhost:<port>
```

---

## Basic Configuration

### Set Host and Port

Edit your config file:

```conf
flight_sql.host = "0.0.0.0"
flight_sql.port = 55556
```

---

## Enable TLS (Optional)

Use encryption for production:

```conf
use_encryption = true
keystore = "server.key"
server_cert = "server.crt"
```

---

## Warehouse Directory

Choose where DuckDB persists data:

```conf
warehouse.path = /var/dazzleduck/warehouse
```

Directory layout:

```text
warehouse/
 ├── tables/
 ├── ingest/
 └── temp/
```

Ensure this path is writable by the server process.

---

## Startup SQL Script

Execute SQL commands during boot:

```conf
startup.sql.location = "/opt/init.sql"
```

Example:

```sql
CREATE SCHEMA analytics;
CREATE TABLE analytics.users(id INT, name TEXT);
```

---

Next : **[Authentication & Security →](authentication.md)**
