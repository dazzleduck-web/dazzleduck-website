---
sidebar_label: "Installation"
sidebar_position: 2
---

# Installation & Setup

> Get started with DazzleDuck SQL Logger.

---

## Requirements

* Java 17+
* Maven
* Running Arrow Flight server
* Open port (default: `32010`)

---

## Start Log Server

Run the Flight log server:

```bash
java -cp dazzleduck-sql-logger.jar io.dazzleduck.sql.logger.server.SimpleFlightLogServer
```

Expected output:

```text
Flight log server listening on: grpc://0.0.0.0:32010
```

---

## Add Logger to Your App

Include the logger dependency and SLF4J binding.

Ensure the following service provider exists:

```bash
META-INF/services/org.slf4j.spi.SLF4JServiceProvider
```

With:

```text
io.dazzleduck.sql.logger.ArrowSLF4JServiceProvider
```

---

## Enable Arrow Logger

Once on the classpath, logging happens automatically.

Use as you normally would:

```java
Logger log = LoggerFactory.getLogger(MyApp.class);

log.info("Hello Arrow Log");
log.warn("User {} failed", userId);
```

---

## Verify Output

Server prints logs:

```text
[LOG RECEIVED] 2025-01-10 21:01:33 | INFO | MyService | main | Hello Arrow Log | ...
```

---

Next: **[Configuration →](configuration.md)**
