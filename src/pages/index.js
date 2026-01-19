import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Home() {
  /* =========================
     TYPEWRITER
  ========================= */
  const words = [
    "high-performance",
    "portable",
    "open-source",
    "Arrow-native",
    "secure",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <main className="min-h-screen flex items-center justify-center px-8 py-12 bg-linear-to-br from-white to-gray-300 dark:from-black dark:to-neutral-800">
        <div className="flex justify-around max-w-[80vw] w-full lg:grid-cols-2 sm:grid-cols-1 sm:gap-15">
          {/* LEFT HERO */}
          <div className="flex flex-col gap-10">
            {/* TYPEWRITER */}
            <div className="">
              <div className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
                DazzleDuck is a{" "}
                <div className="font-bold text-green-700 dark:text-emerald-400">
                  {text}
                  <span className="ml-1 animate-pulse">|</span>
                </div>
                <div className="mt-1">SQL server built on DuckDB.</div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="w-3xl flex items-center justify-center overflow-visible">
              <img
                src={useBaseUrl("/img/dazzleduck-architecture.png")}
                alt="DazzleDuck architecture overview"
                className="w-full h-auto rounded-xl block shadow-xl shadow-black/20 dark:shadow-white/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-white/30"
              />
            </div>
          </div>

          {/* RIGHT STACK */}
          <div className="flex flex-col gap-7 max-w-5xl w-5xl justify-center">
            {/* CARD 1 */}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-700">
              <div className="text-center bg-gray-100 dark:bg-neutral-800 p-1 px-3 border-b border-gray-200 dark:border-neutral-700">
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Dazzle Duck Server
                </span>
              </div>

              <div className="px-6 py-4">
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
                  A high-performance Arrow-native SQL server built on DuckDB,
                  enabling scalable remote analytics with industry-standard
                  protocols and enterprise-grade security.
                </p>

                <ul className="dd-ul mb-2 space-y-3">
                  <li className="relative text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Link to="/docs/dazzleduck-core-servers/servers">
                      → Supports HTTP & gRPC (Flight SQL)
                    </Link>
                  </li>
                  <li className="relative text-sm font-medium text-gray-900 dark:text-gray-100 ">
                    <Link to="/docs/security/access-control">
                      → Access Mode Control (Completed & Restricted)
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 flex gap-5">
                  <Link
                    to="/docs/intro"
                    className="dd-button inline-block bg-green-700 hover:bg-green-800 px-6 py-2.5 rounded-xl font-semibold text-sm">
                    Documentation
                  </Link>

                  <Link
                    to="/docs/quick-start/installation"
                    className="dd-button inline-block bg-neutral-700 hover:bg-neutral-800 px-6 py-2.5 rounded-xl font-semibold text-sm">
                    Installation
                  </Link>
                </div>
              </div>
            </section>

            {/* CARD 2 */}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-sm px-6 py-4 transition-all duration-300 hover:-translate-y-1">
              <span className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                Producers
              </span>
              <div className="dd-line-thin"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                Produce Arrow data streams consumed by DazzleDuck for real-time
                analytics and observability.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Link
                  className="dd-button px-4 py-1.5 rounded-full font-semibold text-sm bg-neutral-500 hover:bg-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  to="/docs/dazzleduck-sql-logger/overview">
                  Logger
                </Link>
                <Link
                  className="dd-button px-4 py-1.5 rounded-full font-semibold text-sm bg-neutral-500 hover:bg-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  to="/docs/dazzleduck-sql-micrometer/overview">
                  Micrometer
                </Link>
              </div>
            </section>

            {/* CARD 3 */}
            <section className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-sm px-6 py-2 transition-all duration-300 hover:-translate-y-1">
              <span className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                Connectors
              </span>
              <div className="dd-line-thin"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                Connect your applications to DazzleDuck using these supported
                connectors.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  [
                    "Python (ADBC)",
                    "/docs/quick-start/quickstart#connecting-via-new-adbc-python-flight-sql-driver",
                  ],
                  [
                    "JDBC",
                    "/docs/quick-start/quickstart#connect-via-arrow-flight-sql-jdbc",
                  ],
                  [
                    "DuckDB",
                    "/docs/quick-start/quickstart#query-from-local-duckdb",
                  ],
                  ["Spark", "/docs/connector/dazzleduck-sql-spark/overview"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="dd-button block text-center py-2.5 rounded-xl font-semibold text-sm  bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
