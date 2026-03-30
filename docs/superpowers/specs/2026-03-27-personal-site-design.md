# Personal Site — Design Spec

## Context

Ben Hansen needs a personal brand/showcase site that presents his professional work (QA Graphics, BASidekick, OpenCrate BMS), GitHub activity, education, skills, and personal interests (hiking, family, tech) in one cohesive place. The site should feel minimal and modern but memorable — not another generic portfolio.

## Design Direction: Topographic

Warm, light, organic aesthetic built around subtle topographic contour lines — a nod to Ben's hiking interest and engineering background. Earth-tone palette with scroll-driven animations and micro-interactions as the differentiator.

### Visual Identity

- **Background:** `#fafaf9` (warm off-white) with faint SVG topo contour lines at ~4% opacity
- **Primary text:** `#1c1917` (warm near-black)
- **Secondary text:** `#57534e` / `#78716c` / `#a8a29e` (stone scale)
- **Borders/dividers:** `#e7e5e4` / `#d6d3d1`
- **Cards:** white `#fff` with `#e7e5e4` border, subtle shadow on hover
- **Accents:** Rust orange `#dea584` and sky blue `#3178c6` (from GitHub language colors, used sparingly)
- **Typography:** Serif (Georgia or similar) for headings/name, system sans for body, monospace for data/stats
- **Section labels:** 10px uppercase with wide letter-spacing, stone color

### Interactions

- Topo contour lines shift subtly on mouse movement (parallax)
- Content sections fade+float up on scroll entry (Framer Motion)
- GitHub stat numbers count up when scrolled into view
- Language bar fills left-to-right on scroll
- Skill tags stagger-fade in
- Project cards lift with shadow on hover
- Life photo cards zoom subtly on hover

## Site Structure (Single Page)

All content on one scrollable page. Pill navigation at the top smooth-scrolls to sections.

### 1. Hero
- Name in serif (large): "Ben Hansen"
- Subtitle (uppercase, spaced): "ENGINEER · DESIGNER · BUILDER"
- Short bio paragraph (~2 sentences)
- Pill navigation: Work, Projects, Life, Skills

### 2. Work
- **Currently:** QA Graphics — Senior Graphic Outsourcing Design (brief description)
- **Side Projects:** Two cards side-by-side
  - BASidekick — AI companion for BAS professionals, links to basidekick.com
  - OpenCrate BMS — open-source BMS in pure Rust, links to GitHub repo

### 3. GitHub (Infographic Stats)
- Three stat cards in a row: Repositories, Contributions, Languages (numbers animate on scroll)
- Language breakdown bar with labeled percentages below
- Data fetched from GitHub API at build time using Next.js ISR (revalidates periodically)

### 4. Life
- Three photo cards in a grid:
  - Hiking — trail photos
  - Family — wife and son
  - Tech Enjoyer — workspace/gear
- Cards have image top, title + caption bottom
- Hover zoom on images

### 5. Skills & Experience
- Grouped into 2x2 grid:
  - Building Automation: JCI SCT/MUI/Metasys, Tridium Niagara 4, BAS Design
  - Design: Adobe Illustrator, Photoshop, MS Office
  - Development: Rust, TypeScript, Open Source
  - Interests: AI/ML Applications, Building Systems, Automation
- Displayed as pill/tag elements

### 6. Education
- Single card: Iowa State University, BA Mechanical Engineering, 2011

### 7. Footer
- Social links: GitHub, LinkedIn, BASidekick, Email
- Copyright line
- Topo contours fade out at page bottom

## Tech Stack

- **Framework:** Next.js (App Router, single-page site)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (scroll triggers, hover states, count-up numbers)
- **Deployment:** Vercel
- **Data:** GitHub API fetched at build time with ISR revalidation
- **Fonts:** Serif for display (Georgia or a Google Font like Playfair Display), system sans for body, monospace for stats
- **Background:** SVG topo contours, fixed position, low opacity

## Non-Goals

- No blog/CMS system (can be added later)
- No dark mode toggle (warm light theme is the brand)
- No authentication or dynamic server features
- No AI SDK integration (this is a static showcase site)
- Content text is placeholder — Ben will adjust copy after structure is built

## Verification

1. `npm run dev` — site loads at localhost, all sections visible
2. Scroll through — animations trigger correctly (fade-in, count-up, stagger)
3. Mouse movement over hero — topo contours shift subtly
4. Hover project cards and life cards — lift/zoom effects
5. Pill nav clicks smooth-scroll to correct sections
6. Build succeeds (`npm run build`) with no errors
7. Deploy to Vercel — site loads on production URL
8. GitHub stats populate (or gracefully fall back if API unavailable)
9. Responsive: test at mobile (375px), tablet (768px), desktop (1280px)
