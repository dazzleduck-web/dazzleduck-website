---
sidebar_label: "Usage"
sidebar_position: 3
---

# Using Arrow JS UI

> Learn how to query, explore, and visualize data once connected to DazzleDuck.

---

## 🔐 Login & Connection

To begin, connect the UI to your running DazzleDuck HTTP server. **[→ Setup Guide](setup.md)**

### Steps

1. Enter the **Server URL**
2. Provide your **Username** and **Password**
3. Click **Connect**

### What happens under the hood?

* A JWT token is issued after login
* Token is stored securely in the browser session
* All SQL requests automatically attach the JWT

✅ You stay logged in without re-authenticating after every query.

---

## 🧠 SQL Editor

The built-in query editor supports standard **DuckDB SQL**.

### ✅ Supported

* `SELECT`
* `INSERT`
* `CREATE TABLE`
* `JOIN`
* Aggregations (`COUNT`, `SUM`, `AVG`, etc.)
* Parquet / file reads
* And many more

### Example

```sql
SELECT gender, COUNT(*)
FROM users
GROUP BY gender;
```

Click **Run** to execute your query.

---

## 📋 Result Table

After execution, results appear in the table panel with:

* Scrollable for large datasets
* Fast Arrow-based rendering
* Support for large result sets

✅ Designed for both speed and clarity.

---

## 📊 Chart Builder

Visualize the result set instantly.

### Supported chart types

* Line
* Bar
* Pie

---

### ⚡ Live Chart Updates

Re-run any query and:

* Tables update automatically
* Charts re-render instantly

✅ No refresh required.

---

## 🧪 Multi-Query Running 

Run multiple queries in parallel:

* Each query gets its own tab
* Results appear one after another
* No waiting for one query to finish

---

## 🚨 Error Handling

When things go wrong, Arrow JS UI surfaces clean, meaningful errors.

| Error           | Cause              |
| --------------- | ------------------ |
| **401**         | JWT expired        |
| **403**         | Unauthorized query |
| **500**         | Server SQL error   |
| **Empty table** | No rows returned   |

### Common fixes

* Re-login if token expires
* Check user permissions
* Validate SQL syntax
* Inspect server logs for 500 errors

---

## ✅ Summary

You can now:

* Connect securely
* Execute SQL
* Inspect large datasets
* Visualize instantly
* Handle failures cleanly

---

Want to know more about **[Charts](charts.md)** or **[Architecture](architecture.md)**?.
