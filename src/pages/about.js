import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
    FaGithub,
    FaTwitter,
    FaEnvelope,
} from "react-icons/fa";
import { SiTicktick, SiMedium } from "react-icons/si";
import { PiHandbagDuotone, PiGlobeHemisphereWestDuotone } from "react-icons/pi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { GiHorseHead } from "react-icons/gi";
import { GrLinkedin } from "react-icons/gr";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function About() {

    /* =========================
   ABOUT PAGE DATA
========================= */

    const visionItems = [
        {
            title: "Simple",
            desc:
                "Run DazzleDuck with minimal configuration and familiar SQL. No heavy cluster setup or complex orchestration.",
            icon: <SiTicktick />,
        },
        {
            title: "Portable",
            desc:
                "Deploy anywhere DuckDB runs — laptops, servers, containers, or cloud — with consistent behavior.",
            icon: <PiHandbagDuotone />,
        },
        {
            title: "Arrow-Native",
            desc:
                "Built on Apache Arrow and Flight SQL for zero-copy data transport and efficient streaming.",
            icon: <MdOutlineDoubleArrow />,
        },
        {
            title: "Fast",
            desc:
                "Leverages DuckDB’s vectorized execution for high-performance analytical workloads.",
            icon: <GiHorseHead />,
        },
        {
            title: "Extensible",
            desc:
                "Easily integrate logging, metrics, connectors, and custom extensions as your system grows.",
            icon: <IoExtensionPuzzleOutline />,
        },
        {
            title: "Open Source",
            desc:
                "Fully open-source and community-driven, designed to evolve transparently in the open.",
            icon: <PiGlobeHemisphereWestDuotone />,
        },
    ];

    const contributors = [
        {
            name: "Gagan Taneja",
            role: "Architect & Lead Developer",
            img: useBaseUrl("/img/team/gagan.jpg"),
            linkedinLink: "https://www.linkedin.com/in/tanejagagan/",
            mediumLink: "https://medium.com/@tanejagagan",
            githubLink: "https://github.com/tanejagagan",
        },
        {
            name: "Shrikant Suryawanshi",
            role: "Software Developer",
            img: useBaseUrl("/img/team/shrikant.jpg"),
            linkedinLink:
                "https://www.linkedin.com/in/shrikant-suryawanshi/",
            githubLink: "https://github.com/shrikantsuryawanshi39",
        },
        {
            name: "Piyush Mahore",
            role: "Software Developer",
            img: useBaseUrl("/img/team/piyush.jpg"),
            linkedinLink:
                "https://www.linkedin.com/in/piyush-mahore/",
            githubLink: "https://github.com/PiyushMahore",
        },
        {
            name: "Ekant Yadav",
            role: "Software Developer",
            img: useBaseUrl("/img/team/ekant.jpeg"),
            linkedinLink:
                "https://www.linkedin.com/in/ekant-yadav-53a337231/",
            githubLink: "https://github.com/Ekant2008",
        },
    ];

    return (
        <Layout
            title="About DazzleDuck SQL Server"
            description="Learn about DazzleDuck SQL Server — a high-performance, Arrow-native SQL ecosystem built on DuckDB.">
            <main className="min-h-screen px-4 sm:px-6 md:px-8 py-16 bg-linear-to-br from-white to-gray-300 dark:from-black dark:to-neutral-800">
                <div className="max-w-7xl mx-auto flex flex-col gap-10">
                    {/* INTRO */}
                    <section className="text-center max-w-3xl mx-auto">
                        <div className="text-4xl mb-5 font-semibold text-gray-900 dark:text-gray-100">
                            About{" "}
                            <span className="text-green-700 dark:text-emerald-400 font-bold">
                                DazzleDuck
                            </span>
                        </div>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            DazzleDuck is a modern, Arrow-native SQL ecosystem that transforms
                            DuckDB from an embedded engine into a scalable, remote analytics
                            platform — without sacrificing performance or simplicity.
                        </p>
                        <Link
                            to="/docs/about"
                            className="dd-button inline-block bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm text-center">
                            Learn More
                        </Link>
                    </section>

                    <div className="dd-line-thin"></div>

                    {/* VISION */}
                    <section className="flex flex-col gap-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="text-3xl mb-5 font-bold text-gray-900 dark:text-gray-100">
                                Our Vision
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                We believe analytical SQL should be fast, portable, and
                                accessible — without the operational overhead of traditional
                                database servers.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visionItems.map(({ title, desc, icon }) => (
                                <div
                                    key={title}
                                    className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-md transition-all duration-300"
                                >
                                    <div className="text-3xl mb-4 text-green-700 dark:text-emerald-400">
                                        {icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="dd-line-thin"></div>

                    {/* COMMUNITY */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-3xl mb-5 font-bold text-gray-900 dark:text-gray-100">
                                Community & Contributors
                            </div>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Built by engineers, for engineers — powered by open source.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {contributors.map(
                                ({ name, role, img, linkedinLink, mediumLink, githubLink }) => (
                                    <div
                                        key={name}
                                        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/10"
                                    >
                                        {/* Avatar */}
                                        <div className="flex justify-center mb-4">
                                            <img
                                                src={img}
                                                alt={name}
                                                className="w-24 h-24 rounded-full object-cover border-2 border-green-700 dark:border-emerald-400 shadow-md transition-all duration-300"
                                            />
                                        </div>

                                        <h4 className="font-bold text-gray-900 dark:text-gray-100">
                                            {name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            {role}
                                        </p>

                                        <div className="flex gap-4 justify-center items-center">
                                            {linkedinLink && (
                                                <Link
                                                    href={linkedinLink}
                                                    className="dd-link-blue text-lg text-blue-600 dark:text-blue-400 mt-2 flex justify-center"
                                                >
                                                    <GrLinkedin />
                                                </Link>
                                            )}

                                            {mediumLink && (
                                                <Link
                                                    href={mediumLink}
                                                    className="dd-link-gray text-lg rounded-lg text-blue-600 dark:text-blue-400 mt-2 flex justify-center"
                                                >
                                                    <SiMedium />
                                                </Link>
                                            )}

                                            {githubLink && (
                                                <Link
                                                    href={githubLink}
                                                    className="dd-link-gray text-xl text-blue-600 dark:text-blue-400 mt-2 flex justify-center rounded-xl"
                                                >
                                                    <FaGithub />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </section>

                    <div className="dd-line-thin"></div>

                    {/* CONTACT */}
                    <section className="text-center max-w-3xl mx-auto">
                        <div className="text-3xl mb-5 font-bold text-gray-900 dark:text-gray-100">
                            Get in Touch
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Have questions, ideas, or want to contribute? We’d love to hear
                            from you.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="mailto:contact@dazzleduck.io"
                                className="dd-button inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm">
                                <FaEnvelope /> Email Us
                            </Link>

                            <Link
                                href="https://github.com/dazzleduck-web/dazzleduck-sql-server"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dd-button inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm">
                                <FaGithub /> GitHub
                            </Link>

                            <Link
                                href="#"
                                rel="noopener noreferrer"
                                className="dd-button inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-6 py-2.5 rounded-xl font-semibold text-sm">
                                <FaTwitter /> Twitter
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
