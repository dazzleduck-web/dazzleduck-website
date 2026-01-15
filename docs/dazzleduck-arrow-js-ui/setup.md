---
sidebar_label: "Setup"
sidebar_position: 3
---

# Setup

> This guide explains how to run the **DazzleDuck Arrow JS UI** locally and in production.

---

## Prerequisites

- Node.js **18+**
- npm or pnpm
- Running DazzleDuck SQL HTTP Server

---

## Local Development

```bash
cd ui/arrow-js-frontend
```

```bash
npm install
```

```bash
npm run dev
```

The UI will be available at:

```
http://localhost:5173
```

---

## Arrow-js Frontend Docker Image

### Build the Docker Image
From the project root (where the `Dockerfile` is located) - (*dazzleduck-sql-server\ui\arrow-js-frontend*)

Run:
```bash
docker build -t dazzleduck-frontend .
```

### Start the container
```bash
docker run -p 5174:5174 dazzleduck-frontend
```
---

## Backend Configuration

The UI connects to the HTTP server using a base URL:

```env
VITE_DAZZLEDUCK_HTTP_URL=http://localhost:8081
```

This can be configured via:

- `.env` file
- Build‑time environment variables


---

## Connect to the Server

Connection settings panel, fill in:

| Field                 | Value                                          |
| --------------------- | ---------------------------------------------- |
| **Server URL**        | [http://localhost:8081](http://localhost:8081) |
| **Username**          | Configured user                                |
| **Password**          | Configured password                            |
| **Advanced settings** | claims & split size                            |

---

## Execute SQL

Try running your first query:

```sql
SELECT 1 AS id;
```

---

## Production Build

```bash
npm run build
```

Generates static assets in:

```
dist/
```

---

## Security Notes

- UI never stores passwords
- JWT tokens live only in memory
- HTTPS strongly recommended in production
