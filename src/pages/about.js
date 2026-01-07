import React from 'react';
import Layout from '@theme/Layout';
import '../css/about.css';
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function about() {
    return (
        <Layout
            title="About DazzleDuck SQL Server"
            description="Learn about DazzleDuck SQL Server — a high-performance, Arrow-native SQL server built on DuckDB."
        >
            <main className="about-page">
                <section className="intro-section">
                    <h1>About <span className="highlight">DazzleDuck SQL Server</span></h1>
                    <p className="intro-text">
                        DazzleDuck SQL Server is a high-performance, remote SQL server built on top of
                        DuckDB and Apache Arrow. It transforms DuckDB from an embedded database into a
                        scalable analytics service that supports remote clients, streaming results,
                        and modern data workflows.
                    </p>

                    <div className="intro-links">
                        <a href="./docs/about" className="secondary-btn">Learn More</a>
                    </div>
                </section>

                <section className="details-section">
                    <h2>Our Vision</h2>
                    <p>
                        Our goal is to make analytical SQL fast, simple, and accessible without the
                        operational complexity of traditional database servers. DazzleDuck bridges
                        the gap between embedded analytics and distributed systems by combining
                        DuckDB’s performance with Arrow-native data transport.
                    </p>
                    <ul className="key-points">
                        <li><strong>Performance:</strong> Vectorized execution and Arrow-based streaming for large analytical workloads.</li>
                        <li><strong>Simplicity:</strong> Minimal setup with familiar SQL and standard protocols.</li>
                        <li><strong>Interoperability:</strong> Works with HTTP, Arrow Flight SQL, JDBC, ADBC, and BI tools.</li>
                        <li><strong>Open Source:</strong> Transparent, community-driven development built in the open.</li>
                    </ul>
                </section>

                <section className="team-section">
                    <h2>Community & Contributors</h2>
                    <p>
                        DazzleDuck SQL Server is developed and maintained by an open-source community
                        of engineers and data practitioners focused on building practical, high-performance
                        analytics infrastructure.
                    </p>

                    <div className="team-grid">
                        <div className="team-member">
                            <img src="https://placehold.co/600x400" alt="Shivam Suryawanshi" />
                            <h4>Shivam Suryawanshi</h4>
                            <p>Founder & Lead Developer</p>
                        </div>
                        <div className="team-member">
                            <img src="https://placehold.co/600x400" alt="Open Source Community" />
                            <h4>Open Source Contributors</h4>
                            <p>Community Developers & Maintainers</p>
                        </div>
                    </div>
                </section>

                <section className="contact-section">
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions, feedback, or ideas? We welcome contributions, discussions,
                        and collaboration from the community.
                    </p>

                    <div className="contact-links">
                        <a href="mailto:contact@dazzleduck.io">
                            <FaEnvelope /> contact@dazzleduck.io
                        </a>
                        <a
                            href="https://github.com/dazzleduck-web/dazzleduck-sql-server"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub /> GitHub Repository
                        </a>
                        <a
                            href="https://twitter.com/dazzleduckdb"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitter /> @dazzleduckdb
                        </a>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
