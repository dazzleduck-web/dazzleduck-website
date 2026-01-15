---
sidebar_label: "Usage"
sidebar_position: 4
---

# Usage

> This section explains how to use the Arrow JS UI effectively.

---

## Login

1. Enter server URL
2. Provide username/password
3. Submit to authenticate

JWT is automatically attached to all requests.

---

## Running Queries

- Add a new query row
- Enter SQL
- Execute independently

Supports:

- Parallel execution
- Cancellation
- Large result sets

### Example

```sql
SELECT gender, COUNT(*) FROM users GROUP BY gender;
```

---

## Viewing Results

Results can be toggled between:

- Table view
- Chart view
- Raw Arrow inspection

---

## Search Mode

- Select time range
- Apply filters
- Browse paginated results

---

## Sessions

- Save session → JSON file
- Restore session later
- Queries + connection context restored

---

## Cancel Queries

- Each query has an ID
- Cancel sends `/v1/cancel`
- Immediate server interruption
