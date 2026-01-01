# Davide Mezzogori - Personal Website

[![Deploy to GitHub Pages](https://github.com/dmezzogori/dmezzogori.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/dmezzogori/dmezzogori.github.io/actions/workflows/deploy.yml)
[![Eleventy](https://img.shields.io/badge/Eleventy-3.1.2-black?logo=eleventy)](https://www.11ty.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Personal portfolio website showcasing my research, open-source projects, industrial collaborations, teaching activities, and blog.

**Live site:** [davide.mezzogori.com](https://davide.mezzogori.com)

## Tech Stack

- **Static Site Generator**: [11ty (Eleventy)](https://www.11ty.dev/) v3.1.2
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.1.17 with typography plugin
- **Templating**: Nunjucks
- **Deployment**: GitHub Pages via GitHub Actions
- **Container**: Docker + Nginx (optional)

## Prerequisites

- Node.js 20+
- npm

## Development

```bash
git clone https://github.com/dmezzogori/dmezzogori.github.io.git
cd dmezzogori.github.io
npm install
npm start
```

The site runs at `http://localhost:3000` with hot reload enabled.

## Build Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run build:css` | Build CSS only |
| `npm run build:11ty` | Build 11ty only |

## Deployment

### GitHub Pages

Automatic deployment via GitHub Actions on push to `main` branch.

### Docker (Optional)

```bash
docker compose -f docker-compose.prod.yml up -d
```

The containerized site runs at `http://localhost:8080`.
