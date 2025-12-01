---
sidebar_label: "JDBC"
sidebar_position: 5
---

# JDBC Access (Arrow Flight JDBC)

---

## Overview

DazzleDuck SQL Flight Server exposes DuckDB using the **Arrow Flight JDBC driver**.

This allows:

✅ Native JDBC clients  
✅ Prepared statements  
✅ Batch inserts  
✅ Metadata discovery  
✅ Authentication support  
✅ Query cancellation  
✅ Fetch size tuning

---

## JDBC URL

Standard JDBC URL:

```text
jdbc:arrow-flight-sql://localhost:55556/?database=memory&useEncryption=0&user=admin&password=admin
```

Example with custom path:

```text
jdbc:arrow-flight-sql://localhost:55556/?database=memory&user=admin&password=admin&path=s3://bucket/folder
```

---

## Basic Connection

```java
Connection conn = DriverManager.getConnection(
  "jdbc:arrow-flight-sql://localhost:55556/?database=memory&useEncryption=0&user=admin&password=admin"
);
```

---

## Execute Queries

```java
try (Statement st = conn.createStatement()) {
    ResultSet rs = st.executeQuery("SELECT 1");
    while (rs.next()) {
        System.out.println(rs.getInt(1));
    }
}
```

---

## DDL Support

```java
Statement st = conn.createStatement();
st.execute("CREATE SCHEMA analytics");
st.execute("DROP SCHEMA analytics");
```

---

## Prepared Statements

```java
PreparedStatement ps =
  conn.prepareStatement("INSERT INTO users VALUES (?)");

ps.setInt(1, 42);
ps.executeUpdate();
```

---

## Batch Inserts

```java
PreparedStatement ps =
  conn.prepareStatement("INSERT INTO metrics VALUES (?)");

for (int i = 0; i < 10; i++) {
    ps.setInt(1, i);
    ps.addBatch();
}
ps.executeBatch();
```

---

## Cancel Query

```java
Statement st = conn.createStatement();
st.cancel();
```

Cancel while executing:

```java
Thread t = new Thread(() -> {
    try {
        Thread.sleep(500);
        st.cancel();
    } catch (Exception ignored) {}
});
t.start();

st.execute(LONG_RUNNING_QUERY);
```

---

## Fetch Size Control

```java
Statement st = conn.createStatement();
st.setFetchSize(10);
ResultSet rs = st.executeQuery("SELECT * FROM generate_series(100)");
```

---

## Metadata Queries

```java
DatabaseMetaData meta = conn.getMetaData();

meta.getSchemas();
meta.getCatalogs();
meta.getTableTypes();
meta.getTables(null, null, null, null);
```

---

## Retain Authentication

Keep auth headers for long sessions:

```text
?retainAuth=true
```

---

## Advanced Access (Internal Handler)

Access internal Flight client:

```java
ArrowFlightConnection afc = (ArrowFlightConnection) conn;
Field f = afc.getClass().getDeclaredField("clientHandler");
f.setAccessible(true);
ArrowFlightSqlClientHandler handler =
  (ArrowFlightSqlClientHandler) f.get(afc);

handler.getInfo("SELECT 1");
```

---

## Summary

JDBC mode supports:

✅ Query + DDL  
✅ Batch inserts  
✅ Prepared statements  
✅ Metadata  
✅ Cancellation  
✅ TLS support  
✅ Authorization headers  
✅ External warehouses

---
