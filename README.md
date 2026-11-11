# Personal Projects & Engineering Portfolio

A modern, high-performance personal portfolio website built with **Astro**, **Tailwind CSS**, and **TypeScript**, designed for deployment on **Cloudflare Pages**.

The site showcases technical case studies in data engineering, dimensional Kimball modeling, and governed artificial intelligence systems, with a near-black technology aesthetic and restrained electric-blue accents.

---

## 1. Architecture & Design Principles

- **Framework**: [Astro 4.x](https://astro.build/) configured for static output (`output: 'static'`) for maximum performance, global CDN edge caching, and zero client-side JavaScript overhead.
- **Styling**: Tailwind CSS with custom dark color tokens (`#080C14` base, `#0D131F` surface, `#131C2D` cards, `#1E293B` subtle borders, and `#3B82F6` electric blue).
- **Content Collections**: Type-safe Markdown/MDX content managed through Astro's Content Collections API and validated with Zod schemas.
- **Hosting**: Pre-configured for Cloudflare Pages (static HTML directory output to `dist/`).
- **SEO & Accessibility**: Complete OpenGraph, Twitter Cards, semantic HTML5 landmarks, responsive viewport tags, and auto-generated XML sitemap.

---

## 2. Project Structure

```
.
├── astro.config.mjs             # Astro integration and static build settings
├── tailwind.config.mjs          # Custom theme tokens, palette, and fonts
├── tsconfig.json                # TypeScript path aliases and strict configuration
├── wrangler.toml                # Cloudflare Pages deployment configuration
├── package.json                 # Project dependencies & scripts
├── public/
│   ├── favicon.svg              # Custom SVG favicon
│   └── robots.txt               # Crawler directives & sitemap location
└── src/
    ├── content/
    │   ├── config.ts            # Zod validation schema for projects collection
    │   └── projects/            # Markdown / MDX project case studies
    │       └── financial-services-analytics-platform.md
    ├── components/
    │   ├── Header.astro         # Sticky navigation with mobile menu
    │   ├── Footer.astro         # Site footer with verified external channels
    │   ├── ProjectCard.astro    # Reusable project card component
    │   ├── MetricCard.astro     # Stat callout component
    │   ├── TechBadge.astro      # Technology pill component
    │   └── ArchitectureDiagram.astro # 5-tier architecture topology visualizer
    ├── layouts/
    │   └── BaseLayout.astro     # Root layout with SEO metadata & ambient gradient
    ├── pages/
    │   ├── index.astro          # Home page (hero, featured spotlight, core domains)
    │   ├── projects/
    │   │   ├── index.astro      # Projects directory & catalog
    │   │   └── [...slug].astro  # Dynamic reusable project detail page template
    │   ├── about.astro          # Technical perspective, background & principles
    │   ├── contact.astro        # Direct communication channels and links
    │   └── 404.astro            # Custom 404 page
    └── styles/
        └── global.css           # Global Tailwind directives & dark prose typography
```

---

## 3. Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v20 LTS or higher
- npm, pnpm, or bun

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server with hot-module reloading
npm run dev
# Server will start at http://localhost:4321

# 3. Type check and build static production bundle
npm run build
# Output files are generated in ./dist/

# 4. Preview the built production output locally
npm run preview
```

---

## 4. How to Add a New Project

Adding a new project requires **no modification to application code or page templates**. The content system is fully decoupled:

1. Create a new markdown file in `src/content/projects/your-project-slug.md`.
2. Define the frontmatter conforming to `src/content/config.ts`:

```yaml
---
title: "Your Project Title"
shortDescription: "A concise 1-2 sentence summary of what the system does."
category: "Data & AI Systems" # e.g. Analytics Engineering, Machine Learning
featured: false # Set true to spotlight on homepage
order: 2 # Sort order in listings
tags:
  - "PostgreSQL"
  - "dbt"
  - "Python"
githubUrl: "https://github.com/mrsimiloluwa/your-repo"
liveUrl: "https://your-demo-url.com"
role: "Lead Analytics Engineer"
timeline: "2024"
status: "Completed"
metrics:
  - label: "Throughput"
    value: "10,000 tx/sec"
    detail: "Measured in benchmarks"
keyTakeaway: "Core design trade-off or architectural insight."
---

## 1. Project Overview
Write your project case study here using Markdown.
```

3. Run `npm run build` to verify schema validation and automatic page generation.

---

## 5. Cloudflare Pages Deployment

### Option A: Automatic Git Deployment (Recommended)

1. Push this repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and specify the build configuration:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `20` (under **Environment variables**, set `NODE_VERSION` to `20.18.0` or `20`)
4. Click **Save and Deploy**. Cloudflare Pages will build the site and provide a `*.pages.dev` domain with automatic edge SSL and instant global deployment on every `git push`.

### Option B: Direct CLI Deployment via Wrangler

You can also deploy directly from your terminal using Cloudflare Wrangler:

```bash
# Build the static site
npm run build

# Deploy the dist directory directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=personal-portfolio
```

---

## 6. Verification and Quality Checks

To verify code quality and production build integrity:

```bash
# Astro and TypeScript check
npx astro check

# Production build validation
npx astro build
```
