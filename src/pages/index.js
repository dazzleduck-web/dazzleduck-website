import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FaCopy } from "react-icons/fa";

export default function Home() {
  /* =========================
     TYPEWRITER
  ========================= */
  const words = React.useMemo(
    () => ["high-performance", "portable", "open-source", "secure"],
    [],
  );

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* =========================
     CARD DATA
  ========================= */

  const serverFeatures = [
    {
      label: "→ Supports HTTP & gRPC (Flight SQL)",
      link: "/docs/dazzleduck-core-servers/servers",
    },
    {
      label: "→ Access Mode Control (Completed & Restricted)",
      link: "/docs/dazzleduck-core-servers/servers",
    },
  ];

  const producers = [
    {
      label: "Logger",
      link: "",
    },
    {
      label: "Metrics",
      link: "",
    },
  ];

  const connectors = [
    {
      label: "DuckDB",
      link: "https://github.com/dazzleduck-web/dazzleduck-sql-duckdb",
    },
    {
      label: "Spark",
      link: "https://github.com/dazzleduck-web/dazzleduck-sql-spark",
    },
    {
      label: "Python (ADBC)",
      link: "",
    },
    {
      label: "JDBC",
      link: "",
    },
  ];

  /* =========================
     QUICK START TABS
  ========================= */
  const quickStartTabs = [
    {
      key: "docker",
      label: "Docker",
      command: "docker run -ti -p 59307:59307 -p 8081:8081 dazzleduck/dazzleduck:latest --conf warehouse=/data",
    },
    {
      key: "flight",
      label: "Flight SQL",
      command: "jdbc:arrow-flight-sql://localhost:59307?database=memory&useEncryption=0&user=admin&password=admin",
    },
    {
      key: "http",
      label: "HTTP",
      command: "curl http://localhost:8081/v1/query?q=select%201",
    },
    {
      key: "python",
      label: "Python",
      command: "pip install adbc-driver-flightsql pyarrow pandas",
    },
    {
      key: "jdbc",
      label: "JDBC",
      command: "mvn dependency:get -Dartifact=org.apache.arrow:flight-sql-jdbc-driver",
    },
  ];

  const [activeQuickTab, setActiveQuickTab] = useState("docker");

  useEffect(() => {
    const current = words[index % words.length];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1),
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <Layout
      title="DazzleDuck SQL Server"
      description="High-performance DuckDB SQL server with Arrow Flight, HTTP, logs, and metrics.">
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-12 bg-linear-to-br from-white to-gray-300 dark:from-black dark:to-neutral-800">
        <div className="flex flex-col lg:flex-row justify-around xl:justify-center gap-12 lg:gap-16 w-full max-w-7xl xl:max-w-[80vw]">
          {/* LEFT HERO */}
          <div className="flex flex-col gap-10 items-center lg:items-start text-center lg:text-left">
            {/* TYPEWRITER */}
            <div className="">
              <div className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100">
                DazzleDuck is a{" "}
                <div className="font-bold text-green-700 dark:text-emerald-400">
                  {text}
                  <span className="invisible ml-1">|</span>
                </div>
                <div className="mt-1">DuckDB based Arrow-native ecosystem.</div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="w-full max-w-xl lg:max-w-3xl lg:w-3xl xl:max-w-8xl xl:w-7xl flex items-center justify-center overflow-visible">
              {/* Light mode image */}
              <img
                src={useBaseUrl("/img/dazzleduck-architecture-light.png")}
                alt="DazzleDuck architecture overview"
                className="block dark:hidden w-full h-auto rounded-xl shadow-xl shadow-black/20 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl"
              />

              {/* Dark mode image */}
              <img
                src={useBaseUrl("/img/dazzleduck-architecture-dark.png")}
                alt="DazzleDuck architecture overview (dark)"
                className="hidden dark:block w-full h-auto rounded-xl shadow-xl shadow-white/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl"
              />
            </div>

            {/* QUICK START CARD */}
            <div className="w-full mt-10 flex justify-center">
              <div
                className="w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg px-5 py-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Get started with DazzleDuck
                  </div>
                </div>

                {/* Tabs */}
                <div
                  className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-neutral-950 border border-neutral-700 rounded-full p-1 mb-3">
                  {quickStartTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveQuickTab(tab.key)}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer
                      ${activeQuickTab === tab.key
                          ? "bg-white dark:bg-neutral-900 text-green-700 dark:text-emerald-400 shadow"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        }
                    `}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Command Box */}
                <div
                  className="flex items-center justify-between bg-gray-300 dark:bg-neutral-800 dark:text-white rounded-xl px-4 py-3 font-mono text-sm shadow-inner">
                  <span className="overflow-y-auto text-nowrap dd-scrollbar-hidden">
                    {quickStartTabs.find((t) => t.key === activeQuickTab)?.command}
                  </span>

                  <button
                    onClick={() => navigator.clipboard.writeText(quickStartTabs.find((t) => t.key === activeQuickTab)?.command,)}
                    className="ml-3 text-xs rounded-l transition-colors">
                    <FaCopy className="text-lg cursor-pointer active:text-green-500 transition duration-100" />
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    to=""
                    className="dd-button px-5 py-2 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white">
                    Introduction
                  </Link>

                  <Link
                    to=""
                    className="dd-button px-5 py-2 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white">
                    Full Installation Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-7 w-full max-w-5xl justify-center xl:max-w-3xl">
            {/* CARD 1 - DazzleDuck Server*/}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="text-center bg-gray-100 dark:bg-neutral-800 p-1 px-3 border-b border-gray-200 dark:border-neutral-700">
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Dazzle Duck Server
                </span>
              </div>

              <div className="px-4 sm:px-6 py-4">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
                  A high-performance Arrow-native SQL server built on DuckDB,
                  enabling scalable remote analytics with industry-standard
                  protocols and enterprise-grade security.
                </p>

                <ul className="dd-ul mb-2 space-y-3">
                  {serverFeatures.map(({ label, link }) => (
                    <li
                      key={label}
                      className="relative text-sm font-medium text-gray-900 dark:text-gray-100">
                      <Link to="">{label}</Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    to=""
                    className="dd-button inline-block bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm text-center">
                    Documentation
                  </Link>

                  <Link
                    to=""
                    className="dd-button inline-block bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm text-center">
                    Installation
                  </Link>
                </div>
              </div>
            </section>

            {/* CARD 2 - Producers*/}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-xl px-4 sm:px-6 py-2 transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Producers
                </span>
              </div>
              <div className="dd-line-thin"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                Produce Arrow data streams consumed by DazzleDuck for real-time
                analytics and observability.
              </p>
              <ul className="dd-ul grid grid-cols-1 sm:grid-cols-2 gap-3">
                {producers.map(({ label, link }) => (
                  <li key={label}>
                    <Link
                      to={link}
                      className="dd-button block text-center py-1.5 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* CARD 3 - Connectors*/}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-xl px-4 sm:px-6 py-2 transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <span className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Connectors
                </span>
              </div>
              <div className="dd-line-thin"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                Connect your applications to DazzleDuck using these supported
                connectors.
              </p>
              <ul className="dd-ul grid grid-cols-1 sm:grid-cols-2 gap-3">
                {connectors.map(({ label, link }) => (
                  <li key={label}>
                    <Link
                      to={link}
                      className="dd-button block text-center py-1.5 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* CARD 4 - Arrow JS UI*/}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-xl px-4 sm:px-6 py-4 transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <span className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                  DazzleDuck Arrow JS UI
                </span>
              </div>

              <div className="dd-line-thin"></div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                A modern, browser-based SQL UI built with Arrow JS that connects
                to the DazzleDuck HTTP Server for interactive query execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  to=""
                  className="dd-button block text-center py-2 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                  Know more
                </Link>

                <Link
                  href="https://github.com/dazzleduck-web/dazzleduck-sql-server/tree/main/ui/arrow-js-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dd-button block text-center py-2 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                  GitHub
                </Link>

                <Link
                  href="https://www.npmjs.com/package/dazzleduck-arrow-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dd-button block text-center py-2 rounded-xl font-semibold text-sm bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                  NPM Package
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
