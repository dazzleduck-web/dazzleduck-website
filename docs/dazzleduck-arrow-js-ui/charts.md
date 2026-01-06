---
sidebar_label: "Charts"
sidebar_position: 5
---

# Charts

The Arrow JS UI provides **built‑in charting** powered directly by Arrow result sets.

---

## Supported Charts

- Line Chart
- Bar Chart
- Pie Chart

Charts are rendered client‑side using Arrow column vectors.

---

## Data Flow

1. Query executes
2. Arrow IPC received
3. Columns mapped to chart axes
4. Chart rendered instantly

---

## Configuration

Users can select:

- X axis
- Y axis
- Aggregations

---

## Best Practices

- Use aggregated queries for charts
- Avoid high‑cardinality dimensions
- Prefer numeric columns

---

## Limitations

- Charts are exploratory
- No persisted dashboards (by design)

---

## Future Enhancements

- Multiple series
- Time‑window controls
- Exportable chart configs

---

Charts are designed to stay **simple, fast, and honest to the data**.
