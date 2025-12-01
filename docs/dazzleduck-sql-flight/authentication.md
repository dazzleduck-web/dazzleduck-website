---
sidebar_label: "Authentication"
sidebar_position: 3
---

# Authentication & Authorization

> Secure client connections using JWT, headers, and claims-based access control.

---

## Authentication Modes

DazzleDuck SQL Flight supports multiple authentication mechanisms:

- HTTP-based token login
- Header-based JWT validation
- Client credentials
- Middleware enforcement

---

## JWT Authentication Flow

```text
Client
  ↓
HTTP Login Service
  ↓
JWT Token Issued
  ↓
FlightSQL Request
  ↓
AdvanceServerCallHeaderAuthMiddleware
  ↓
AdvanceJWTTokenAuthenticator
  ↓
Access Policy Enforcement
```

---

## Client Example (Java)

```java
FlightClient.builder(allocator, location)
  .intercept(AuthUtils.createClientMiddlewareFactory(
      "admin",
      "password",
      Map.of("cluster_id", "TEST_CLUSTER")
  ))
  .build();
```

---

## Claims-Based Authorization

Authorization is enforced using JWT claims and request headers.

| Claim / Header | Purpose |
|----------------|---------|
| `database` | Catalog control |
| `schema` | Schema filtering |
| `table` | Table-level access |
| `path` | Filesystem access |
| `filter` | Row-level filtering |
| Custom keys | Application logic |

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

## Blocked Queries

Unauthorized access raises:

```text
FlightRuntimeException: PERMISSION_DENIED
```

---

## Cluster Tokens via Headers

Cluster-level identity enforcement:

```http
cluster_id: MY_CLUSTER
```

### Configuration

```conf
jwt_token.claims.generate.headers = ["cluster_id"]
jwt_token.claims.validate.headers = ["cluster_id"]
```

---

Next : **[Ingestion & Data Flow →](ingestion.md)**
