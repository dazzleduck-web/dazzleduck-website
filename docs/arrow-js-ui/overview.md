---
sidebar_label: "Overview"
sidebar_position: 1
---

# Arrow JS UI — Overview

> A blazing-fast, developer-friendly SQL UI built on Apache Arrow.

---

## ✨ What is Arrow JS UI?

The **Arrow JS UI** is a modern web interface for querying and visualizing data from the **DazzleDuck SQL HTTP Server**.
It allows you to execute SQL directly from your browser, inspect results in tables, and generate interactive charts — all with real-time Arrow rendering.

It is purpose-built for the HTTP mode of DazzleDuck and leverages **Apache Arrow** for ultra-fast data transport and rendering in the browser.

---

## 🚀 What you can do

* 🔐 Secure login (JWT-based authentication)
* 🌐 Connect to any HTTP SQL endpoint
* 🧠 Run SQL queries from your browser
* 📋 View clean, paginated result tables
* 📊 Visualize data using multiple chart types
* 🔄 Switch chart types instantly (Line, Bar & Pie)

---

## 🏗 Architecture Overview

| Layer             | Technology               |
| ----------------- | ------------------------ |
| **Backend**       | Java 21, Helidon, DuckDB |
| **API**           | HTTP SQL                 |
| **Serialization** | Apache Arrow             |
| **Frontend**      | React + Vite             |
| **Styling**       | Tailwind CSS             |
| **Charting**      | D3.js                    |
| **Testing**       | Vitest                   |

---

## 🎯 Why choose Arrow JS UI?

Use Arrow JS UI if you want:

* A lightweight SQL dashboard
* Query visualization without heavy BI tools
* Fast iteration and testing
* A DuckDB-powered analytics platform
* A web interface for SQL over HTTP / Flight-style APIs

---

## 🔁 How it works

```text
Browser UI   →   HTTP Server   →   DuckDB Engine
(SQL Query)      (Query API)      (Execution)
      ↑                 ↓
   Arrow JS         Arrow IPC / JSON
    Rendering       Result Stream
```

### Execution Flow

1. You submit a SQL query from the browser
2. The query is sent to the server over HTTP
3. DuckDB executes the statement
4. The result is streamed back as Arrow or JSON
5. Arrow JS renders everything instantly

---

## 🖼 Screenshots

### Home UI

![Arrow JS UI Home](../../static/arrow-js-imgs/home.png)

---

### Results in Table

![Arrow JS UI Result in Table](../../static/arrow-js-imgs/table.png)

---

### Results in Charts

![Arrow JS UI Data display in Charts](../../static/arrow-js-imgs/charts.png)

---

## ✅ Summary

Arrow JS UI gives you:

* Speed (via Apache Arrow)
* Simplicity (browser-based SQL)
* Power (DuckDB analytics)
* Clarity (tables + charts)

Build, query, and visualize — without leaving your browser.

---

Ready to get started? Proceed to the **[Setup Guide →](setup.md)**
