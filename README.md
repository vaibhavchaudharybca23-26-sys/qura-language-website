# Qura Language — Official Developer Platform & Website

The official website and developer documentation platform for **Qura Language**, an evolving general-purpose programming language and native ahead-of-time (AOT) compiler developed under **Qura Technologies**.

- **Website Status:** Production-ready developer platform
- **Compiler Release:** v0.1.0-alpha (Windows x86_64 Developer Preview)
- **Software License:** Apache-2.0
- **Compiler Architecture:** Cranelift native machine code generator

---

## 1. Information Architecture & Routes

The website implements a comprehensive, interconnected developer experience:

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Hero with live code preview, design pillars, compiler pipeline diagram, verified examples switcher, quick-start, latest release card, and CTAs. |
| `/docs` | **Documentation Hub** | Multi-category sidebar with live filter, breadcrumbs, previous/next buttons, deep anchor linking, and four structured documentation categories: *Getting Started*, *Language Fundamentals*, *Compiler & Tooling*, and *Reference*. |
| `/docs/error-codes` | **Diagnostics Index** | Full index of compiler diagnostic error codes (`E0001` through `E0109`) with descriptions and caret examples. |
| `/syntax` | **Syntax Explorer** | Interactive syntax reference comparing correct usage against rejected code snippets with exact compiler error codes. |
| `/learn` | **Learn Qura (12 Lessons)** | Progressive 12-step guided tutorial with objectives, prerequisites, complete runnable snippets, verified outputs, and common pitfalls. |
| `/examples` | **Examples Library** | Browsable canonical programs (`hello_world.qura`, `hello_math.qura`, `factorial.qura`, `collatz.qura`) with verified exit codes and direct links to GitHub source files. |
| `/download` | **Download Hub** | Direct download for `qura-v0.1.0-alpha-windows-x64.zip` (1.59 MB) and `qura-lang-0.1.0.vsix`, SHA-256 checksum verification command, and step-by-step Windows setup guide. |
| `/playground` | **Interactive Playground** | Editor preview with token-based syntax highlighting, preset selector, code structure analyzer, and transparent notice of Cranelift ahead-of-time native compilation. |
| `/developers` | **Developer Platform** | Architectural breakdown of the seven workspace crates, building from source (`cargo build --release`), running tests (`cargo test`), and diagnostic environment overrides. |
| `/community` | **Community & Open Source** | Contribution paths, bug reporting, feature proposals, and responsible disclosure instructions via GitHub. |
| `/roadmap` | **Project Roadmap** | Transparent milestone progression from Milestone 1 to Milestone 10 with filterable status labels (*Implemented*, *In Progress*, *Planned*, *Under Consideration*). |
| `/changelog` | **Changelog & Releases** | Release history for `v0.1.0-alpha` detailing compiler capabilities and preview scope. |
| `/about` | **About Qura** | Purpose, organizational identity, maintainer attribution, and engineering principles. |
| `/license` | **Software License** | Apache License, Version 2.0 full terms and third-party notices. |
| `/trademarks` | **Trademark Guidelines** | Project name and brand usage policy preserving official origin. |
| `/security` | **Security Policy** | Private vulnerability reporting via GitHub Advisories. |
| `/contributing` | **Contributing Guide** | Pull request guidelines, formatting standards, and test expectations. |

---

## 2. Key Interactive Features

- **Global Instant Search (`Ctrl+K` / `⌘K`):** Real-time client-side search index indexing all docs, syntax topics, tutorials, examples, and CLI commands with full keyboard navigation (`↑`/`↓`/`Enter`).
- **Working Light / Dark Theme:** Theme toggle persisting selection in `localStorage` and syncing with system preference.
- **Authentic Qura Syntax Highlighting:** Custom tokenizer faithfully reflecting `qura.tmLanguage.json` TextMate grammar with copy-to-clipboard feedback.
- **Responsive Mobile Navigation:** Full mobile drawer navigation with search trigger and download CTA.
- **SEO & Social Sharing:** Custom SVG vector logos, favicon, OpenGraph metadata, `robots.txt`, and XML sitemap (`sitemap.xml`).

---

## 3. Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing:** Wouter (lightweight declarative routing)
- **Icons:** Lucide React + custom SVG icons
- **Testing:** Vitest

---

## 4. Local Development & Build Commands

### Install Dependencies
```powershell
npm install
```

### Start Development Server
```powershell
npm run dev
```

### Run Automated Test Suite
```powershell
npm test
```

### Build Production Bundle
```powershell
npm run build
```

### Preview Production Build Locally
```powershell
npm run preview
```

The production output is generated in the `dist/` directory, ready to deploy to any modern static hosting provider.

---

## 5. Deployment Guide

The website is an optimized single-page static application (SPA).

- **GitHub Pages:** Deploy the `dist/` directory or configure a GitHub Actions workflow with `actions/deploy-pages`.
- **Vercel / Netlify / Cloudflare Pages:**
  - Build command: `npm run build`
  - Output directory: `dist`
  - Node.js version: 20+

---

## 6. License

Copyright 2026 Vaibhav Chaudhary and Qura Technologies contributors.
Licensed under the [Apache License, Version 2.0](LICENSE).
