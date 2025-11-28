---
sidebar_label: "Setup & Configuration"
sidebar_position: 2
---

# Setup & Configuration

> Configure Arrow-Micrometer in your Java application and start exporting metrics as SQL-queryable Arrow data.

---

## 🧩 1. Add Arrow Registry

Create the registry using `ArrowMicroMeterRegistry`:

```java
ArrowMicroMeterRegistry registry = new ArrowMicroMeterRegistry.Builder()
    .config(config)
    .endpoint("http://localhost:8080/arrow")
    .httpTimeout(Duration.ofSeconds(5))
    .clock(Clock.SYSTEM)
    .build();
```

This initializes the Arrow-based Micrometer registry that will capture metrics and export them in Arrow format.

---

## ⚙ 2. Configuration Options

Arrow-Micrometer uses `ArrowRegistryConfig` for runtime configuration.

### Required Properties

| Property           | Description            |
| ------------------ | ---------------------- |
| `arrow.enabled`    | Enable the registry    |
| `arrow.outputFile` | Output Arrow file path |

---

### Example Configuration

```java
ArrowRegistryConfig config = new ArrowRegistryConfig() {

    @Override
    public String get(String key) {
        if ("arrow.outputFile".equals(key))
            return "metrics.arrow";
        return null;
    }

    @Override
    public boolean enabled() {
        return true;
    }

    @Override
    public Duration step() {
        return Duration.ofSeconds(10);
    }
};
```

---

## ⏱ 3. Publishing Frequency

Control how often metrics are flushed into Arrow files using `step()`:

```java
@Override
public Duration step() {
    return Duration.ofSeconds(10);
}
```

✅ This publishes metric snapshots every **10 seconds**.

---

## 📦 4. Output Modes

Arrow-Micrometer supports multiple output strategies:

### ✅ Supported

* File-based Arrow dataset

### 🔜 Planned (Future)

* HTTP upload
* Memory-based streaming

---

## 🛑 5. Graceful Shutdown

Ensure all metrics are flushed on application shutdown:

```java
Runtime.getRuntime().addShutdownHook(new Thread(() -> registry.close()));
```

✅ This guarantees safe persistence before exit.

---

## ✅ Summary

You're now configured to:

* Capture Micrometer metrics
* Export Arrow datasets
* Analyze via SQL

---

Next: **[Schema →](schema.md)**
