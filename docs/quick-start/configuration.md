---
sidebar_label: "Configuration"
sidebar_position: 3
---

# Configuration

DazzleDuck SQL Server is configured using **command-line flags** or an `application.conf` file. The configuration focuses on **operational concerns**, not SQL semantics.

---

## Core Configuration Options

### Warehouse Path

The warehouse is where DuckDB files and ingested Parquet data are stored:

```bash
--conf warehouse=/data
```

This is the **most important setting** for persistent deployments.

---

### Authentication (JWT)

Enable JWT authentication for HTTP endpoints:

```bash
--conf http.authentication=jwt
```

Authenticate using:

```bash
curl -X POST http://localhost:8081/v1/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

Use the returned token for subsequent requests.

---

### Fetch Size

Control how many rows are sent per batch:

```bash
-H "fetch_size: 10000"
```

This helps tune memory usage for large result sets.

---

### TLS / Encryption

DazzleDuck can run with or without TLS depending on your environment:

```bash
--conf useEncryption=false
```

For production deployments, TLS is strongly recommended.

---

## Configuration Sources

Configuration can be provided via:

1. Command-line flags (`--conf key=value`)
2. `application.conf` file
3. Environment variables (for secrets)

---

## Next Steps

- **Security** — JWT, TLS, headers
- **Ingestion** — Bulk Arrow uploads
- **Monitoring** — Micrometer metrics
