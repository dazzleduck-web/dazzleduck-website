// @ts-check

/**
 * Custom sidebar configuration for DazzleDuck documentation.
 *
 * This sidebar is explicitly ordered to reflect:
 * 1. Conceptual onboarding
 * 2. Core server modules
 * 3. Supporting/infra modules
 * 4. UI & tooling
 *
 * This avoids relying on filesystem order and makes the docs
 * production-ready and easier to navigate.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docSidebar: [
    // ------------------------------------------------------------------
    // Getting Started
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'about',
        {
          type: 'category',
          label: 'Quick Start',
          items: [
            'quick-start/quickstart',
            'quick-start/installation',
            'quick-start/configuration',
          ],
        },
      ],
    },

    // ------------------------------------------------------------------
    // Core Server
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Core Server',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'DazzleDuck HTTP Server',
          items: [
            'dazzleduck-sql-http/overview',
            'dazzleduck-sql-http/architecture',
            'dazzleduck-sql-http/installation',
            'dazzleduck-sql-http/configuration',
            'dazzleduck-sql-http/api-reference',
          ],
        },
        {
          type: 'category',
          label: 'DazzleDuck Arrow Flight SQL',
          items: [
            'dazzleduck-sql-flight/overview',
            'dazzleduck-sql-flight/installation',
            'dazzleduck-sql-flight/authentication',
            'dazzleduck-sql-flight/jdbc',
            'dazzleduck-sql-flight/ingestion',
          ],
        },
      ],
    },

    // ------------------------------------------------------------------
    // Data & Execution Internals
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Execution & Ingestion',
      items: [
        {
          type: 'category',
          label: 'DazzleDuck SQL Commons',
          items: [
            'dazzleduck-sql-commons/overview',
            'dazzleduck-sql-commons/connectionPool',
            'dazzleduck-sql-commons/transformation',
            'dazzleduck-sql-commons/fingerprint',
            'dazzleduck-sql-commons/partition-pruning',
            'dazzleduck-sql-commons/ingestion-utils',
          ],
        },
        {
          type: 'category',
          label: 'DazzleDuck SQL Logger',
          items: [
            'dazzleduck-sql-logger/overview',
            'dazzleduck-sql-logger/architecture',
            'dazzleduck-sql-logger/setup',
            'dazzleduck-sql-logger/configuration',
            'dazzleduck-sql-logger/internals',
            'dazzleduck-sql-logger/README',
          ],
        },
      ],
    },

    // ------------------------------------------------------------------
    // Observability
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'Observability',
      items: [
        {
          type: 'category',
          label: 'DazzleDuck SQL Micrometer',
          items: [
            'dazzleduck-sql-micrometer/overview',
            'dazzleduck-sql-micrometer/setup',
            'dazzleduck-sql-micrometer/schema',
            'dazzleduck-sql-micrometer/querying',
            'dazzleduck-sql-micrometer/README',
          ],
        },
      ],
    },

    // ------------------------------------------------------------------
    // UI & Tooling
    // ------------------------------------------------------------------
    {
      type: 'category',
      label: 'UI & Tooling',
      items: [
        {
          type: 'category',
          label: 'DazzleDuck Arrow JS UI',
          items: [
            'dazzleduck-arrow-js-ui/overview',
            'dazzleduck-arrow-js-ui/architecture',
            'dazzleduck-arrow-js-ui/setup',
            'dazzleduck-arrow-js-ui/usage',
            'dazzleduck-arrow-js-ui/charts',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
