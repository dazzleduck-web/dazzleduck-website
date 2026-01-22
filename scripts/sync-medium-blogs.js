import fs from "fs";
import path from "path";
import Parser from "rss-parser";
import TurndownService from "turndown";
import { compile } from "@mdx-js/mdx";

/**
 * -----------------------------
 * CONFIG
 * -----------------------------
 */
const BLOG_DIR = "blog";

/**
 * Multiple Medium sources
 */
const MEDIUM_SOURCES = [
    {
        author: "tanejagagan",
        feed: "https://medium.com/feed/@tanejagagan",
        targets: [
            "supercharge-spark-cluster-with-arrow-flight-server",
            "scaling-duckdb-a-modern-architecture-for-analytical-data-applications",
            "detecting-similar-sql-queries-using-duckdb",
        ],
    },

    // Example: add another Medium user
    // {
    //     author: "someuser",
    //     feed: "https://medium.com/feed/@someuser",
    //     targets: [
    //         "my-other-post",
    //     ],
    // },
];

/**
 * -----------------------------
 * SETUP
 * -----------------------------
 */
const parser = new Parser({
    customFields: {
        item: ["content:encoded"],
    },
});

const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
});

/**
 * Preserve images from Medium
 */
turndown.addRule("mediumImages", {
    filter: "img",
    replacement: (_, node) => {
        const src =
            node.getAttribute("data-src") ||
            node.getAttribute("src");
        const alt = node.getAttribute("alt") || "image";
        return src ? `![${alt}](${src})` : "";
    },
});

/**
 * -----------------------------
 * MDX SAFETY (SANITIZATION)
 * -----------------------------
 */
function makeMdxSafe(markdown) {
    const parts = markdown.split(/```/g);

    return parts
        .map((part, i) => {
            if (i % 2 === 1) return part;

            return part
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/{/g, "&#123;")
                .replace(/}/g, "&#125;");
        })
        .join("```");
}

/**
 * -----------------------------
 * MDX SAFETY (DETECTION)
 * -----------------------------
 */
async function isMdxSafe(mdxContent) {
    try {
        await compile(mdxContent, {
            jsx: false,
            outputFormat: "program",
        });
        return true;
    } catch (err) {
        return err;
    }
}

/**
 * -----------------------------
 * MAIN
 * -----------------------------
 */
async function run() {
    if (!fs.existsSync(BLOG_DIR)) {
        fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    for (const source of MEDIUM_SOURCES) {
        console.log(`\n🚀 Fetching Medium feed: @${source.author}`);
        const feed = await parser.parseURL(source.feed);

        for (const item of feed.items) {
            if (!source.targets.some(s => item.link.includes(s))) {
                continue;
            }

            console.log(`✔ Processing: ${item.title}`);

            const html = item["content:encoded"];
            if (!html) {
                console.warn(`⚠ No content for ${item.title}, skipping`);
                continue;
            }

            const rawMarkdown = makeMdxSafe(turndown.turndown(html));
            const markdown = addTruncateMarker(rawMarkdown);
            const slug = source.targets.find(s => item.link.includes(s));

            const date = new Date(item.isoDate || item.pubDate)
                .toISOString()
                .split("T")[0];

            const frontmatter = `---
title: "${item.title.replace(/"/g, '\\"')}"
date: "${date}"
authors: ["gagan-taneja"]
tags: ["DuckDB", "Arrow", "Analytics"]
hide_table_of_contents: true
---

`;

            const finalContent = frontmatter + markdown;

            const mdxCheck = await isMdxSafe(finalContent);
            if (mdxCheck !== true) {
                console.warn(
                    `⚠️ Skipping ${slug}.mdx — MDX-unsafe content detected\n` +
                    `   Reason: ${mdxCheck.message.split("\n")[0]}`
                );
                continue;
            }

            const outPath = path.join(BLOG_DIR, `${slug}.mdx`);
            fs.writeFileSync(outPath, finalContent);

            console.log(`📝 Saved: ${outPath}`);
        }
    }

    console.log("\n✨ Medium sync complete.");
}

run().catch(err => {
    console.error("❌ Sync failed:", err);
    process.exit(1);
});

function addTruncateMarker(markdown) {
    // If truncate already exists, do nothing
    if (markdown.includes("truncate")) {
        return markdown;
    }

    // Insert truncate before the first level-2 heading
    const headingMatch = markdown.match(/\n##\s+/);

    if (!headingMatch) {
        // Fallback: insert after first paragraph
        const parts = markdown.split(/\n\s*\n/);
        if (parts.length < 2) return markdown;

        return [
            parts[0],
            "{/* truncate */}",
            ...parts.slice(1),
        ].join("\n\n");
    }

    const index = headingMatch.index;

    return (
        markdown.slice(0, index) +
        "\n\n{/* truncate */}\n\n" +
        markdown.slice(index)
    );
}
