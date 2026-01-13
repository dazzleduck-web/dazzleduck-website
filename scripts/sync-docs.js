/**
 * Script to sync documentation files from external repositories.
 *
 * This script fetches md files from specified GitHub repositories
 * and saves them into the local docs directory with appropriate headers
 * to indicate they are auto-generated.
 * 
 * this script will run everytime you do any of the following commands:
 *       npm run sync-docs, 
 *       npm run start, 
 *       npm run build,
 *       npm run deploy
 */

import { execSync } from "child_process";
import fs from "fs";

const files = [
    {
        url: "https://raw.githubusercontent.com/dazzleduck-web/dazzleduck-sql-server/main/dazzleduck-sql-micrometer/README.md",
        out: "docs/dazzleduck-sql-micrometer/README.md",
        source: "https://github.com/dazzleduck-web/dazzleduck-sql-server/tree/main/dazzleduck-sql-micrometer",
        lable: "README - SQL Micrometer",
    },
    {
        url: "https://raw.githubusercontent.com/dazzleduck-web/dazzleduck-sql-server/main/dazzleduck-sql-logger/README.md",
        out: "docs/dazzleduck-sql-logger/README.md",
        source: "https://github.com/dazzleduck-web/dazzleduck-sql-server/tree/main/dazzleduck-sql-logger",
        lable: "README - SQL Logger",
    },
];

/**
 * Very simple MDX safety check.
 * Detects JSX-like generics such as:
 *   Map<String, String>
 *   <T, R>
 *   <K, V>
 *
 * These are known to break Docusaurus MDX, we can add more patterns we needed.
 */
function isMdxSafe(markdown) {
    const unsafeJsxPattern = /<[^>\n]+,\s*[^>\n]+>/;
    return !unsafeJsxPattern.test(markdown);
}

for (const f of files) {
    console.log(`Syncing ${f.out}`);

    const content = execSync(`curl -s ${f.url}`, { encoding: "utf8" });

    // Validate before overwriting
    if (!isMdxSafe(content)) {
        console.warn(`⚠️ Skipping update for ${f.out} (MDX-unsafe content detected). Keeping existing file.`);
        continue;
    }

    const header = `---
sidebar_label: "${f.lable}"
---

<!-- @docusaurus-disable-mdx -->
<!--
AUTO-GENERATED FILE
SOURCE:
${f.source}
DO NOT EDIT MANUALLY
-->

`;

    fs.writeFileSync(f.out, header + content);
}
