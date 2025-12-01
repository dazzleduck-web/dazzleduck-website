import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dazzle Duck',
  tagline: 'Dazzleduck faster and flexible',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dazzleduck-web.github.io', // Your GitHub Pages URL
  baseUrl: '/dazzleduck-website/', // The repository name, preceded by a slash
  deploymentBranch: "gh-pages", // Deployment branch for GitHub Pages
  onBrokenMarkdownLinks: 'warn',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dazzleduck-web', // Usually your GitHub org/user name.
  projectName: 'dazzleduck-website', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Dazzle Duck',
        logo: {
          alt: 'Dazzle Duck Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: 'about', label: 'About', position: 'left' },
          {
            href: 'https://github.com/dazzleduck-web/dazzleduck-sql-server',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'About',
                to: '/docs/about',
              },
              {
                label: 'Quick Start',
                to: '/docs/quick-start/quickstart',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: '/',
              },
              {
                label: 'Discord',
                href: '/',
              },
              {
                label: 'X',
                href: '/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dazzleduck-web/dazzleduck-sql-server',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DazzleDuck Web, Built with ❤️.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'java',       // Your main language
          'bash',       // For terminal commands (Linux/Mac)
          'powershell', // For Windows terminal commands
          'sql',        // Since you are building a SQL engine
          'json',       // For config files
          'yaml',       // For config files
          'docker',     // If you have docker setups
        ],
      },
    }),
};

export default config;
