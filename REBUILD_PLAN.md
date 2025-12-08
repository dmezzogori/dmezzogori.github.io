# Website Rebuild Plan: davide.mezzogori.com

## Overview
Rebuild personal portfolio from HTML5 UP template to a modern **11ty (Eleventy)** static site with **Tailwind CSS**, featuring a multi-page structure with blog functionality.

## Key Decisions
| Aspect | Choice |
|--------|--------|
| **Framework** | 11ty (Eleventy) |
| **Styling** | Tailwind CSS + @tailwindcss/typography |
| **Audience** | Mixed (academic + industry) |
| **Focus** | Balanced portfolio |
| **Dark mode** | Yes, class-based with localStorage |
| **Deployment** | GitHub Actions → GitHub Pages |

---

## Project Structure

```
dmezzogori.github.io/
├── .github/workflows/deploy.yml
├── src/
│   ├── _data/
│   │   ├── site.json
│   │   ├── navigation.json
│   │   ├── publications.json
│   │   ├── projects.json
│   │   ├── teaching.json
│   │   └── social.json
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk
│   │   │   ├── page.njk
│   │   │   └── post.njk
│   │   ├── components/
│   │   │   ├── header.njk
│   │   │   ├── footer.njk
│   │   │   ├── hero.njk
│   │   │   ├── social-links.njk
│   │   │   ├── publication-card.njk
│   │   │   ├── project-card.njk
│   │   │   └── theme-toggle.njk
│   │   └── partials/head.njk
│   ├── assets/
│   │   ├── css/main.css
│   │   ├── js/main.js
│   │   └── images/ (avatar.jpg, favicon.ico)
│   ├── blog/
│   │   ├── blog.json
│   │   ├── index.njk
│   │   └── posts/
│   ├── index.njk
│   ├── research.njk
│   ├── projects.njk
│   ├── teaching.njk
│   └── contact.njk
├── eleventy.config.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── CNAME
```

---

## Page Content Summary

### 1. Home/About (`/`)
- Hero with avatar, name, tagline
- Quick stats: 35+ publications, ASN qualified, PhD supervisor
- Brief bio (Research Scientist at UniMORE, Kheperer co-founder mention)
- Highlight cards linking to other sections
- Social/academic profile icons

### 2. Research (`/research/`)
- Research interests (AI/ML for operations, logistics, simulation, RL, AS/RS, lean)
- Current projects: ECOSISTER, RL-AutoLog, SusTex, Innsbruck collaboration
- Collaborations: UniMORE, UniPR, UniPI, Innsbruck
- 5 selected publications with DOIs
- Links to Google Scholar, ORCID, Scopus, ResearchGate

### 3. Projects (`/projects/`)
**Open Source:**
- **Kwik**: REST API framework (FastAPI + SQLAlchemy), v1.0, MIT
- **Simulatte**: Discrete event simulation for logistics

**Industrial:**
- RFID Real-Time Inventory (fashion retail, patent filed)
- Entity Embeddings Demand Forecasting (haute couture)
- AI Image Tracking (ham curing industry)
- Goods-to-Pickers Optimization (E80 S.p.A.)
- Automated Assembly Line Simulation (SPAL Automotive)
- TEBAN Software Solution (Kheperer)

### 4. Teaching (`/teaching/`)
**Courses:**
- Applications of AI/ML in Operations and SCM (MSc AI Engineering, 100% owner)
- Project Management (MSc Mechanical Engineering, 12 CFU)
- PhD course: Data Analytics and Optimization

**Supervision:** Nicola Mercogliano (PhD Cycle XL)

**Academic Service:** Reviewer for top journals, TAE for INCOM 2024, Bi-Rex referee

### 5. Blog (`/blog/`)
- Paginated post listing
- Individual post pages
- Categories/tags support

### 6. Contact (`/contact/`)
- Contact form (keep FormKeep: `formkeep.com/f/12a820b1b1b0`)
- Email: davide.mezzogori@unimore.it
- Social/academic links

---

## Implementation Steps

### Phase 0: Branch & Plan Commit
1. Create feature branch `feature/11ty-rebuild`
2. Save this plan to `REBUILD_PLAN.md` in the repo
3. Commit: "Add website rebuild plan"

### Phase 1: Project Setup
1. Initialize npm and install dependencies:
   - `@11ty/eleventy`
   - `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/typography`
   - `npm-run-all`
2. Create `eleventy.config.js`, `tailwind.config.js`, `postcss.config.js`
3. Set up npm scripts for dev/build

### Phase 2: Base Layout & Components
1. Create `base.njk` layout with HTML structure
2. Create `head.njk` partial (meta, analytics, CSS)
3. Create `header.njk` (navigation, mobile menu, theme toggle)
4. Create `footer.njk` (copyright, quick links, social)
5. Implement dark mode toggle with localStorage

### Phase 3: Data Files
1. Create all JSON data files in `_data/`:
   - `site.json`, `navigation.json`, `social.json`
   - `publications.json` (5 key papers)
   - `projects.json` (open source + industrial)
   - `teaching.json` (courses, supervision)

### Phase 4: Page Implementation
1. Home page with hero and highlights
2. Research page with interests, projects, publications
3. Projects page with open source and industrial sections
4. Teaching page with courses and service
5. Contact page with form

### Phase 5: Blog Setup
1. Configure blog collection in 11ty
2. Create blog listing with pagination
3. Create post layout
4. Add welcome post

### Phase 6: Styling & Polish
1. Complete Tailwind styling
2. Dark mode theming
3. Mobile responsiveness
4. Typography refinement
5. Transitions and hover states

### Phase 7: SEO & Deployment
1. Meta tags, Open Graph
2. Create GitHub Actions workflow
3. Test deployment
4. Verify custom domain

---

## Assets to Preserve
- `/images/avatar.jpg` → `/src/assets/images/avatar.jpg`
- `/images/favicon.ico` → `/src/assets/images/favicon.ico`
- `/CNAME` (keep at root)
- Google Analytics ID: `UA-102626126-1`
- FormKeep URL: `formkeep.com/f/12a820b1b1b0`

---

## Design Guidelines
- **Style**: Modern minimalist (clean, whitespace, simple typography)
- **Colors**: Deep blue primary, slate secondary, emerald accent
- **Typography**: Inter for headings/body, JetBrains Mono for code
- **Dark mode**: Class-based toggle with system preference detection

---

## Files to Create (~36 total)
- 6 config files
- 6 data files
- 3 layout files
- 8 component files
- 7 page files
- 2 asset files (CSS, JS)
- 2 migrated images
- 2 preserved files (CNAME, README)
