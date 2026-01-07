# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for an academic researcher. Static site built with 11ty (Eleventy) v3.1.2 and Tailwind CSS v4.1.17 using a neobrutalist design system.

**Live site:** https://davide.mezzogori.com

## Build Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server at localhost:3000 (parallel CSS watch + 11ty with hot reload) |
| `npm run build` | Production build (CSS then 11ty) |
| `npm run build:css` | Build Tailwind CSS only |
| `npm run build:11ty` | Build 11ty only |

## Architecture

### Directory Structure

```
src/                    # 11ty input directory
├── _data/              # JSON data files (site.json, projects.json, publications.json, etc.)
├── _includes/
│   ├── layouts/        # base.njk → page.njk/post.njk
│   ├── components/     # Reusable Nunjucks components (header, footer, hero, cards)
│   └── partials/       # head.njk
├── assets/
│   ├── css/main.css    # Tailwind v4 + neobrutalist design system
│   └── js/main.js      # Theme toggle, palette switcher, mobile menu
├── blog/posts/         # Markdown blog posts
└── *.njk               # Page templates
_site/                  # Build output (git-ignored)
```

### Key Patterns

- **Data-driven content:** Structured data in `src/_data/*.json` drives pages (projects, publications, teaching, navigation)
- **Component-based templates:** Nunjucks includes for reusable UI elements
- **Layout inheritance:** Templates extend `base.njk` → `page.njk` or `post.njk`
- **Utility-first CSS:** Tailwind classes in templates, custom `.neo-*` classes for neobrutalist components

### 11ty Configuration (eleventy.config.js)

- **Collections:** `posts` from `src/blog/posts/*.md`
- **Filters:** `readableDate`, `isoDate`, `getPreviousCollectionItem`, `getNextCollectionItem`
- **Shortcodes:** `year` (current year)
- **Passthrough:** Images, JS, CNAME copied to output

### Design System

Six switchable color palettes via `data-palette` attribute on `<html>`:
- `default` (violet), `earthly`, `futuristic`, `harmonious`, `concrete`, `boldraw`

Custom neobrutalist utilities in `main.css`:
- `.neo-card`, `.neo-btn`, `.neo-tag`, `.neo-avatar`, `.neo-icon-box`, `.neo-input`
- Hard shadows: `4px 4px 0 0` standard, `6px 6px 0 0` on hover

Font: JetBrains Mono (monospace throughout)

## Deployment

- **GitHub Pages:** Auto-deploy via GitHub Actions on push to `main`
