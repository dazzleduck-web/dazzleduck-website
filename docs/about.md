---
sidebar_label: "About"
# sidebar_position: 3
---

# About DazzleDuck SQL Server

**DazzleDuck SQL Server** is an open‑source project focused on making **DuckDB accessible as a remote, multi‑client analytics service**.

The goal is simple: preserve DuckDB’s exceptional analytical performance while enabling modern data workflows that require **remote access, standard protocols, and operational tooling**.

---

## Why DazzleDuck Exists

DuckDB excels as an embedded analytical database, but many real‑world use cases need more:

- Multiple users querying the same data
- Standard drivers instead of embedded libraries
- Integration with BI tools, notebooks, and services
- Secure, observable, and container‑friendly deployment

DazzleDuck SQL Server was created to solve these problems by wrapping DuckDB with:

- **Apache Arrow Flight SQL** for high‑performance connectivity
- **HTTP APIs** for simplicity and flexibility
- **Arrow‑native data exchange** for zero‑copy analytics

---

## Design Principles

DazzleDuck is built around a few core principles:

- **Leverage proven engines**
  DuckDB remains responsible for query execution, optimization, and storage access.

- **Open standards first**
  Arrow, Flight SQL, JDBC, ADBC, and HTTP ensure broad ecosystem compatibility.

- **Minimal abstraction**
  No unnecessary layers between clients and DuckDB.

- **Developer‑friendly by default**
  Simple setup, predictable APIs, and transparent behavior.

---

## What DazzleDuck Is (and Is Not)

**DazzleDuck _is_:**

- A remote server for DuckDB
- A Flight SQL and HTTP gateway
- A lightweight analytics service
- An open‑source infrastructure component

**DazzleDuck is _not_:**

- A new SQL engine
- A replacement for DuckDB
- A proprietary data platform

---

## Community & Open Source

DazzleDuck SQL Server is developed in the open and welcomes community participation.

- **GitHub Repository**: [https://github.com/dazzleduck-web/dazzleduck-sql-server](https://github.com/dazzleduck-web/dazzleduck-sql-server)
- **Issues & Discussions**: Feature requests, bugs, and design discussions happen on GitHub

Whether you’re a data engineer, backend developer, or analytics enthusiast, contributions are welcome.

---

## Learn More

- **Quick Start** — Launch your first server instance
- **Architecture Overview** — Understand the server components
- **HTTP API Reference** — Query and ingest data remotely
- **Arrow Flight SQL** — Connect using JDBC and ADBC drivers

---

## Project Philosophy

> _DuckDB provides the speed._ > _Arrow provides the format._ > _DazzleDuck provides the bridge._

Together, they enable fast, open, and portable analytics — without heavyweight infrastructure.
