import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import "../css/custom.css";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: "⚡",
      title: "High-Performance Analytics",
      desc: "Built on DuckDB and Apache Arrow for vectorized, columnar execution with zero-copy data transfer.",
    },
    {
      icon: "🔗",
      title: "Remote SQL Access",
      desc: "Expose DuckDB as a remote SQL service via HTTP and Arrow Flight SQL for BI tools, Python, and web clients.",
    },
    {
      icon: "📦",
      title: "Arrow-Native Data Platform",
      desc: "Stream queries and ingest data using Apache Arrow for efficient analytics at scale.",
    },
    {
      icon: "🛠️",
      title: "Production-Ready",
      desc: "Supports JWT authentication, query planning, cancellation, ingestion, metrics, and observability.",
    },
  ];

  return (
    <Layout
      title="DazzleDuck SQL Server"
      description="High-performance remote SQL server powered by DuckDB and Apache Arrow."
    >
      <main className="hero-section">
        <div className="hero-content">
          <h1>DazzleDuck SQL Server</h1>
          <p className="hero-subtitle">
            A high-performance, Arrow-native SQL server that turns DuckDB into a scalable,
            remote analytics engine.
          </p>
          <div className="hero-buttons">
            <Link className="button-primary" to="/docs/intro">
              🚀 Get Started
            </Link>
            <a
              className="button-secondary"
              href="https://github.com/dazzleduck-web/dazzleduck-sql-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
      </main>

      <section className="features-section">
        <h2>Why DazzleDuck?</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
