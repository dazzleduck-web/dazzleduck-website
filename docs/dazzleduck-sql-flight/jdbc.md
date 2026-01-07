---
sidebar_label: "JDBC"
sidebar_position: 5
---

# JDBC & Client Connectivity

DazzleDuck SQL Flight Server is fully compatible with **Apache Arrow Flight SQL JDBC and ADBC clients**.

---

## JDBC Connection

### Driver

Use the **Arrow Flight SQL JDBC Driver**.

### Connection URL

```text
jdbc:arrow-flight-sql://localhost:59307?database=memory&useEncryption=0&user=admin&password=admin
```

### Authentication

```text
user=admin
password=admin
```

JWT-based authentication can also be used when enabled.

---

## Python (ADBC)

```python
from adbc_driver_flightsql import dbapi
conn = dbapi.connect("grpc+tcp://localhost:59307")
cursor = conn.cursor()
cursor.execute("SELECT * FROM my_table")
print(cursor.fetchall())
```

---

## BI Tools

Verified compatibility:

- DBeaver
- Tableau (via JDBC)
- Superset

---

## Performance Tips

- Use fetch-size tuning
- Prefer Arrow-native clients
- Avoid row-based adapters
