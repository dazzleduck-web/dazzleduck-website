---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Running the Server

> Build and launch the DazzleDuck SQL HTTP Server in minutes.

---

## ✅ Requirements

Before you start, ensure you have:

- Java 21 or later
- Maven 3.8+
- An open port (default: `8080`)

---

## 🔨 Build the Server

From the project root, run:

```bash
mvn clean install
```

This will compile the server and create the runnable JAR.

---

## ▶ Run the Server

Launch the server with:

```bash
java -jar target/dazzleduck-sql-http.jar
```

### Expected Output

If successful, you should see:

```text
Http Server is up: Listening on URL: http://localhost:8080
```

---

## 🌐 Change Host or Port

Edit your configuration file to customize binding:

```hocon
http.host = "0.0.0.0"
http.port = 8080
```

Restart the server after making changes.

---

## ✅ Verify Installation

Test the server with:

```bash
curl "http://localhost:8080/query?q=SELECT+1"
```

If running correctly, the server will return a valid response.

---

## 📁 Directory Structure

The **warehouse path** controls where the server stores data:

```text
warehouse/
 ├── tables/   # DuckDB tables
 ├── ingest/   # Uploaded Arrow files
 ├── temp/     # Temporary working files
```

Ensure this directory is writable by the server process.

---

## ✅ Summary

You now have the HTTP server running locally.

Next Step: **[Setup & Configuration →](configuration.md)**
