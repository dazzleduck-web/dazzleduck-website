# Dazzle Duck SQL Server — Website

Welcome to the **official documentation site** for the **Dazzle Duck SQL Server** project.  
This website is built using **[Docusaurus 2](https://docusaurus.io/)** and contains guides, blogs, and references for developers and contributors.

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/dazzleduck-web/dazzleduck-website.git
cd dazzleduck-website
```

---

### 2. Install Dependencies

Install using **npm** or **yarn**:

```bash
npm install
```

or

```bash
yarn install
```

---

### 3. Start the Development Server

Run the local Docusaurus development server:

```bash
npm run start
```

Then open your browser at:

```
http://localhost:3000
```

This will start the site in watch mode — edits to your docs or blog reload automatically.

---

## Project Structure

```
dazzleduck-website/
│
├── blog/                    # Blog posts and articles
│   ├── blogs.md
│   ├── blogs.md
│   ├── ....
│   ├── authors.yml
│   └── tags.yml
│
├── docs/                    # Documentation pages
│   ├── intro.md
│   ├── quick-start/
│   └── about.md
│
├── src/pages/               # React-based custom pages
│   ├── index.js             # Home page
│   └── about.js             # About page (custom)
│
├── static/                  # Static assets (images, icons, etc.)
│
├── docusaurus.config.js     # Main configuration file
├── sidebars.js              # Sidebar configuration
├── package.json             # Dependencies and scripts
└── README.md
```

---

## Available Commands

| Command          | Description                            |
|------------------|----------------------------------------|
| `npm install`    | Install needed dependencies            |
| `npm run start`  | Starts local dev server with hot reload |
| `npm run build`  | Builds the site for production         |
| `npm run serve`  | Serves the production build locally    |
| `npm run deploy` | Deploys the site to GitHub Pages       |

---

# Hosting Website

## Build the Website

To generate a static production build:

```bash
npm run build
```

This will create a folder named `build/` containing the compiled static files.

You can test the production build locally using:

```bash
npm run serve
```

Then open:
```
http://localhost:3000
```

---

# Deploy to GitHub Pages

### Before start
```
Create a new branch "Deployment" from "main" then follow the steps.
```
---

### 1. Configure `docusaurus.config.js`

Open your config file and set:

```js
url: 'https://dazzleduck.github.io',
baseUrl: '/<dazzleduck-website>/',
organizationName: 'dazzleduck-web', // Your GitHub username or org name
projectName: 'dazzleduck-website',  // Repository name
deploymentBranch: 'gh-pages',
trailingSlash: false,
```

> Make sure your repo name and organization name are correct.

---

### One‑time setup

1. Create the `gh-pages` branch:
   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   git commit --allow-empty -m "Initialize gh-pages branch"
   git push origin gh-pages
   git checkout Deployment
   ```

2. In GitHub repo settings:
   - Go to **Settings > Pages**
   - Set **Source** = `gh-pages` branch, **Folder** = `/ (root)`

---

### Deploying

From the `Deployment` branch:

```powershell
$env:GIT_USER="dazzleduck-web"
npm run deploy
```

This will:
- Build the site
- Push the contents of `build/` to the `gh-pages` branch
- Make it live at the URL below:

👉 **https://dazzleduck.github.io/dazzleduck-website/**

---

## ⚠️ Common Issues

| Issue | Solution |
|--------|-----------|
| **404 Not Found** | Check `url` and `baseUrl` in `docusaurus.config.js` and GitHub Pages settings |
| **Broken links** | Update or create missing `.md` files, or set `onBrokenLinks: 'warn'` |
| **Empty gh-pages branch** | Add a placeholder file (`README.md`) before first deploy |

---

## Customization

### Add New Documentation Page

1. Create a new Markdown file inside `docs/`
   ```bash
   docs/my-new-guide.md
   ```
2. Add frontmatter:
   ```markdown
   ---
   sidebar_label: "My New Guide"
   sidebar_position: 5
   ---
   # My New Guide

   This is my custom documentation page.
   ```

3. Add it to `sidebars.js` if needed.

---

### Add New Blog Post

1. Create a new file under `/blog`:
   ```bash
   blog/2025-11-01-new-feature-announcement.md
   ```
2. Add frontmatter:
   ```markdown
   ---
   slug: new-feature
   title: "Announcing a New Feature in Dazzle Duck"
   authors: [community]
   tags: [announcement, dazzle-duck]
   date: 2025-11-01
   ---
   ```
3. Write your blog content in Markdown — it will automatically appear in `/blog`.

---

## Troubleshooting

| Issue | Solution |
|--------|-----------|
| **Build fails with missing dependencies** | Run `npm install` again |
| **GitHub Pages not updating** | Check if `gh-pages` branch is up to date |
| **CSS not loading after deploy** | Verify `baseUrl` in `docusaurus.config.js` |

---

**Happy Querying!**  
— The Dazzle Duck Team.
