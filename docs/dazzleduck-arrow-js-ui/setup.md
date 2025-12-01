---
sidebar_label: "Setup Guide"
sidebar_position: 2
---

# Arrow JS UI — Setup Guide

> Run **DazzleDuck SQL HTTP Server** and **Arrow JS UI** locally in minutes.

---

## 🧱 Prerequisites

* Java 17+
* Maven 3.8+
* Node.js 18+
* npm or pnpm

---

## Step 1 — Start the HTTP Server

Before starting Arrow JS UI, ensure that your **DazzleDuck SQL HTTP Server** is already running.

If not, follow the server installation guide here:

👉 **[Visit HTTP Server Setup →](../dazzleduck-sql-http/installation.md)**

---

## Step 2 — Run Arrow JS Frontend

### Navigate to frontend

```bash
cd ui/arrow-js-frontend
```

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Open UI

```
http://localhost:5173
```

✅ Arrow JS UI should now appear in browser.

---

## Step 3 — Connect to the Server

Inside the UI login panel, fill in:

| Field          | Value                                          |
| -------------- | ---------------------------------------------- |
| **Server URL** | [http://localhost:8080](http://localhost:8080) |
| **Username**   | Configured user                                |
| **Password**   | Configured password                            |

Click **Connect** to authenticate.

✅ After successful login, you can execute SQL queries.

---

## Step 4 — Execute SQL

Try running your first query:

```sql
SELECT 1 AS id;
```

### Results will appear in:

* 📋 Table View
* 📊 Chart Builder Panel (atleast 3 columns needed for better view & 2 for pie chart)

---

## 🛠 Troubleshooting

### ❌ CORS errors

Ensure your server configuration allows frontend requests:

```
allow-origin = "*"
```

---

### ❌ Login failed

Check these settings:

* `jwt_token.expiration`
* `secret_key`
* User credentials configuration

---

### ❌ No SQL results

Verify connection by running:

```sql
SELECT 1;
```

If it works, database connection is fine.

---

## ✅ You're ready!

You’re all set! Start running queries and visualizing data using Arrow JS UI.

Happy querying! 🚀
