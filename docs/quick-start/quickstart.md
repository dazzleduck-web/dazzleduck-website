---
sidebar_label: "Quick Start"
sidebar_position: 1
---

# Quick Start

Get **DazzleDuck SQL Server** up and running in minutes using Docker. This is the **recommended way** to try DazzleDuck and mirrors how it is typically used in production.

DazzleDuck is a **remote server for DuckDB**, exposing analytical SQL over **Arrow Flight SQL (gRPC)** and **RESTful HTTP APIs**.

---

## Prerequisites

- Docker 20+
- (Optional) DuckDB CLI, Python, or a BI tool for querying

---

## Run DazzleDuck with Docker

Start the server using the official Docker image:

```bash
docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data
```

You should see output similar to:

  ```text
  ============================================================
  DazzleDuck SQL Server v0.0.13-SNAPSHOT
  ============================================================
  Warehouse Path: /data
  HTTP Server started successfully
  Listening on: http://0.0.0.0:8081
  Health check: http://0.0.0.0:8081/health
  UI dashboard: http://0.0.0.0:8081/v1/ui
  Flight Server is up: Listening on URI: grpc+tcp://0.0.0.0:59307
  ```

---

## Run Arrow JS UI with Docker

To interact with DazzleDuck via a web UI, you can run the Arrow JS Frontend using Docker.

### Build the Docker Image

From the project root (where the `Dockerfile` is located) - (*dazzleduck-sql-server\ui\arrow-js-frontend*)

```bash
docker build -t dazzleduck-frontend .
```

### Start the Container

```bash
docker run -p 5174:5174 dazzleduck-frontend
```

The UI will be available at http://localhost:5174

---

## Run Your First Query (HTTP)

Execute a simple query using HTTP:

```bash
curl "http://localhost:8081/v1/query?q=SELECT%201"
```

The response is returned in **Apache Arrow** format and can be consumed directly by DuckDB, Python, or other Arrow-enabled tools.

---

## Connecting via new [ADBC Python Flight SQL driver](https://pypi.org/project/adbc-driver-flightsql/)

You can now use the new Apache Arrow Python ADBC Flight SQL driver to query the Flight SQL server.  ADBC offers performance advantages over JDBC - because it minimizes serialization/deserialization, and data stays in columnar format at all phases.

You can learn more about ADBC and Flight SQL [here](https://voltrondata.com/resources/simplifying-database-connectivity-with-arrow-flight-sql-and-adbc).

Ensure you have Python 3.9+ installed, then open a terminal, then run:
```bash
# Create a Python virtual environment
python3 -m venv .venv

# Activate the virtual environment
. .venv/bin/activate

# Install the requirements including the new Arrow ADBC Flight SQL driver
pip install --upgrade pip
pip install pandas pyarrow adbc_driver_flightsql

# Start the python interactive shell
python
```

In the Python shell - you can then run:
```python
import os
from adbc_driver_flightsql import dbapi as sqlflite, DatabaseOptions


with sqlflite.connect(uri="grpc+tls://localhost:59307",
                        db_kwargs={"username": os.getenv("SQLFLITE_USERNAME", "admin"),
                                   "password": os.getenv("SQLFLITE_PASSWORD", "admin"),
                                   DatabaseOptions.TLS_SKIP_VERIFY.value: "true"  # Not needed if you use a trusted CA-signed TLS cert
                                   }
                        ) as conn:
   with conn.cursor() as cur:
       cur.execute("select * from generate_series(20)",
                   )
       x = cur.fetch_arrow_table()
       print(x)
```

---

## Connect via Arrow Flight SQL (JDBC)

You can use the JDBC driver to connect from your host computer to the locally running Docker Flight SQL server with this JDBC string (change the password value to match the value specified for the SQLFLITE_PASSWORD environment variable if you changed it from the example above):

```bash
jdbc:arrow-flight-sql://localhost:59307?database=memory&useEncryption=0&user=admin&password=admin
```

For instructions on setting up the JDBC driver in popular Database IDE tool: [DBeaver Community Edition](https://dbeaver.io) - see this [repo](https://github.com/voltrondata/setup-arrow-jdbc-driver-in-dbeaver).

**Note** - if you stop/restart the Flight SQL Docker container, and attempt to connect via JDBC with the same password - you could get error: "Invalid bearer token provided. Detail: Unauthenticated".  This is because the client JDBC driver caches the bearer token signed with the previous instance's secret key.  Just change the password in the new container by changing the "SQLFLITE_PASSWORD" env var setting - and then use that to connect via JDBC.

This works with tools like **DBeaver**, **Tableau**, and other JDBC-compatible clients.

---

## Query from Local DuckDB

A local DuckDB instance can treat DazzleDuck as a remote data source:

```sql
INSTALL nanoarrow FROM community;
LOAD nanoarrow;
SELECT * FROM read_arrow('http://localhost:8081/v1/query?q=SELECT+42');
```

This enables **DuckDB-on-DuckDB** workflows with zero-copy data transfer.

---

## What’s Next?

- **[Installation](installation.md)** — Build and run from source
- **[Configuration](configuration.md)** — Warehouse paths, auth, TLS, and performance tuning
- **HTTP API** — Querying, ingestion, and planning endpoints
- **Arrow Flight SQL** — High-performance analytics connectivity

DazzleDuck is designed to be simple to start, yet powerful enough for serious analytical workloads.
