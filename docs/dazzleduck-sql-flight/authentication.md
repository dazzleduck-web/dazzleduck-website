---
sidebar_label: "Authentication"
sidebar_position: 3
---

# Authentication & Authorization

DazzleDuck SQL Flight Server supports **JWT-based authentication** and fine-grained authorization for production workloads.

---

## Authentication Model

- Clients authenticate using **JWT tokens**
- Tokens are validated at the Flight SQL layer
- Claims are propagated into query execution context

---

## JWT Claims Usage

JWT claims can be used to:

- Restrict accessible paths
- Enforce tenant / org isolation
- Apply row-level filters
- Control allowed functions

Common claims:

| Claim      | Purpose                         |
| ---------- | ------------------------------- |
| `org`      | Tenant / organization isolation |
| `role`     | Authorization level             |
| `path`     | Allowed warehouse paths         |
| `database` | Catalog control                 |
| `schema`   | Schema filtering                |
| `table`    | Table-level access              |
| `filter`   | Row-level filtering             |

---

## Header-Based Context

Flight SQL supports passing execution context via headers:

- Authorization tokens
- Dataset paths
- Execution hints

This allows **stateless**, secure query execution.

---

## Access Modes

| Mode         | Description                  |
| ------------ | ---------------------------- |
| `COMPLETE`   | No auth required (dev only)  |
| `RESTRICTED` | JWT required for all queries |

---

## Client Example (Java)

```java
FlightClient.builder(allocator, location)
  .intercept(AuthUtils.createClientMiddlewareFactory(
      "username",
      "password",
      Map.of("cluster_id", "TEST_CLUSTER")
  ))
  .build();
```

---

## Example: Restrict Access to One Table

### JWT Payload

```json
{
  "table": "users",
  "filter": "key = 'k2'"
}
```

### Result

- ✅ Only table `users` visible
- ✅ Only filtered rows returned
- ❌ Other tables throw authorization error

---

## Production Recommendations

- Always enable JWT in production
- Rotate signing keys regularly
- Validate claims strictly
- Combine with TLS for secure transport
