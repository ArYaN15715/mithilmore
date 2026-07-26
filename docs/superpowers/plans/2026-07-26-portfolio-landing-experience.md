# Mithil More — Portfolio Landing Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Lovable-generated foundation into a bold, single-page landing experience (intro → about → experience/education → clickable projects) with photo-rich project detail pages, using only Mithil's real resume content.

**Architecture:** Keep the existing TanStack Start + React + Tailwind v4 stack and its motion primitives (Cursor, Reveal, Loader, parallax). Extract primitives into components, introduce a typed content data layer (`src/data/`), rebuild the landing sections in a Sawad-inspired giant-type editorial style fused with the warm interior-design palette, and add a `/projects/$slug` detail route driven entirely by the data layer.

**Tech Stack:** TanStack Start (file-based routes), React, Tailwind CSS v4 (`@theme` tokens in `src/styles.css`), TypeScript, Instrument Serif + Inter + JetBrains Mono (Google Fonts), `lenis` (smooth scroll, added in Task 9).

## Global Constraints

- Working directory for ALL tasks: `C:\Users\morek\Downloads\mithil portfolio website\lovable-foundation` (the git repo).
- **No fabricated claims anywhere.** The current codebase contains fake awards (`recognitions` array: "AD100", "ELLE Decor Interior of the Year"…), a fake testimonial section, and fake project locations (Kyoto, Colaba…). All must be deleted or clearly replaced. Sample projects that remain until Mithil supplies real photos MUST be labelled "Sample project — replace" in the data file comments and MUST NOT invent awards, clients, or publications.
- Real content only (from resume): name **Mithil A. More**, title **Interior Designer**, Vadodara, India; email `mithilmore97@gmail.com`; phone `+91 87338 30350` (raw `+918733830350`); languages Marathi, Gujarati, Hindi, English; tools AutoCAD, SketchUp, V-Ray, Lumion, Enscape, Adobe Photoshop, Adobe Illustrator, CorelDRAW; experience and education exactly as defined in Task 2.
- Fonts stay: `--font-display: "Instrument Serif"`, `--font-sans: "Inter"`, `--font-mono: "JetBrains Mono"`. Palette stays warm bone/ink with clay accent (already in `src/styles.css`).
- Existing utility classes `label` (mono uppercase) and `grain`, and CSS var `--ease-studio`, are already defined in `src/styles.css` — reuse, don't redefine.
- Verification protocol (this repo has no unit-test runner; do NOT add one): every task ends with `npx tsc --noEmit` clean, then `npm run dev` and the specific visual checks listed in the task. Where a check needs the browser, state what you observed.
- Respect `prefers-reduced-motion` for any new animation.
- All images: `alt` text, `loading="lazy"` (except hero/LCP images), explicit aspect-ratio containers.
- Commit after every task with the given message. Do not push (user pushes to GitHub/Lovable themselves).
- One-time setup folded into Task 1: `npm install` must succeed before anything else.

---

### Task 1: Extract motion primitives into components

The 650-line `src/routes/index.tsx` contains `useReveal`, `Reveal`, `Cursor`, `Loader`, and an inline marquee. Extract them so the project detail route (Task 7) can reuse them.

**Files:**
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/Cursor.tsx`
- Create: `src/components/motion/Loader.tsx`
- Create: `src/components/motion/Marquee.tsx`
- Modify: `src/routes/index.tsx` (delete the inline definitions, import from new files)

**Interfaces:**
- Consumes: existing code in `src/routes/index.tsx` (functions `useReveal`, `Reveal`, `Cursor`, `Loader` — copy them verbatim, do not rewrite logic).
- Produces (later tasks import these exact names):
  - `Reveal` — `({ children, as?, className?, delay? }) => JSX` from `@/components/motion/Reveal`
  - `Cursor` — `() => JSX` from `@/components/motion/Cursor`
  - `Loader` — `() => JSX` from `@/components/motion/Loader`
  - `Marquee` — `({ items, className? }: { items: string[]; className?: string }) => JSX` from `@/components/motion/Marquee`

- [ ] **Step 1: Install dependencies and confirm baseline builds**

Run: `npm install` then `npx tsc --noEmit`
Expected: install completes; tsc exits 0. If tsc fails BEFORE any change, record errors — they are pre-existing; do not fix unrelated ones.

- [ ] **Step 2: Create `src/components/motion/Reveal.tsx`**

Move `useReveal` and `Reveal` from `src/routes/index.tsx` verbatim into the new file. Add exports:

```tsx
import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  // ... paste body verbatim from src/routes/index.tsx
}

export function Reveal({ children, as: As = "div", className = "", delay = 0 }: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  // ... paste body verbatim from src/routes/index.tsx
}
```

- [ ] **Step 3: Create `Cursor.tsx` and `Loader.tsx` the same way**

Each file: paste the component verbatim from `index.tsx`, add `export`, keep all refs/effects identical. `Cursor.tsx` keeps the `data-cursor` label behavior.

- [ ] **Step 4: Create `src/components/motion/Marquee.tsx`**

Replace the hard-coded marquee strip with a reusable component (keep the existing `marquee-mask` CSS class and animation utilities already used in `index.tsx` — copy the exact inner markup pattern currently in the marquee `<section>`):

```tsx
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="label text-foreground/50 flex items-center gap-10">
            {t} <span aria-hidden className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

If `marquee-track` animation keyframes don't exist in `src/styles.css`, add:

```css
@keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-track { animation: marquee-scroll 28s linear infinite; }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
```

- [ ] **Step 5: Update `src/routes/index.tsx` imports; delete inline definitions**

```tsx
import { Reveal } from "@/components/motion/Reveal";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";
import { Marquee } from "@/components/motion/Marquee";
```

Replace the inline marquee `<section>` content with `<Marquee items={["Space Planning", "Site Execution", "Design Development", "Project Coordination", "3D Visualisation", "Working Drawings"]} />` inside the existing section wrapper.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` → exit 0. Run `npm run dev`, open the local URL: page renders identically to before (hero, cursor ring follows mouse on desktop, loader plays once, marquee scrolls with the new skill terms).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "refactor: extract Cursor/Reveal/Loader/Marquee motion primitives"
```

---

### Task 2: Typed content data layer (real resume content)

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces (exact, used by Tasks 3–8):
  - `site` object and types `ExperienceItem`, `EducationItem` from `@/data/site`
  - `Project`, `ProjectPhoto` types, `projects: Project[]`, `getProject(slug: string): Project | undefined`, `nextProject(slug: string): Project` from `@/data/projects`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  field: string;
  period: string;
};

export const site = {
  name: "Mithil A. More",
  firstName: "Mithil",
  title: "Interior Designer",
  location: "Vadodara, India",
  email: "mithilmore97@gmail.com",
  phoneDisplay: "+91 87338 30350",
  phoneRaw: "+918733830350",
  whatsapp: "https://wa.me/918733830350",
  instagram: "", // fill when Mithil provides handle; empty string hides the link
  profile:
    "I design innovative, functional spaces — from first space plan to final site execution. My practice sits where drawing meets building: space planning, design development and project coordination, carried through with observation, creativity and care.",
  availability: "Available for residential & commercial projects",
  languages: ["Marathi", "Gujarati", "Hindi", "English"],
  tools: [
    "AutoCAD",
    "SketchUp",
    "V-Ray",
    "Lumion",
    "Enscape",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "CorelDRAW",
  ],
  experience: [
    {
      company: "WE2 Interior Design Studio",
      role: "Interior Designer",
      period: "Jan 2026 — Present",
      summary:
        "Managing site execution, project coordination and design implementation.",
    },
    {
      company: "APM Studio",
      role: "Interior Designer",
      period: "Jul 2025 — Dec 2025",
      summary:
        "Space planning, design development and site coordination for residential & commercial projects.",
    },
    {
      company: "APM Studio",
      role: "Design Intern",
      period: "Feb 2025 — Apr 2025",
      summary:
        "Assisted the design team with working drawings, space planning and documentation.",
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      school: "The Maharaja Sayajirao University of Baroda",
      degree: "Bachelor of Science (FCSC)",
      field: "Interior Design",
      period: "2022 — 2025",
    },
    {
      school: "The Maharaja Sayajirao University of Baroda",
      degree: "Bachelor of Commerce",
      field: "Accounting & Financial Management",
      period: "2015 — 2018",
    },
  ] satisfies EducationItem[],
};
```

- [ ] **Step 2: Create `src/data/projects.ts`**

Uses the four existing placeholder images. Every sample is explicitly marked. Photos array reuses the available assets so the detail page has a working flow until real photos arrive.

```ts
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import hero from "../assets/hero.jpg";

export type ProjectPhoto = {
  src: string;
  alt: string;
  /** full = full-bleed single, half = 2-up pair slot, detail = small offset crop */
  layout: "full" | "half" | "detail";
};

export type Project = {
  slug: string;
  title: string;
  typology: string;
  location: string;
  year: string;
  role: string;
  tools: string[];
  /** 2–4 sentence intro shown under the detail-page title */
  intro: string;
  /** optional further paragraphs */
  story: string[];
  cover: string;
  coverAlt: string;
  photos: ProjectPhoto[];
};

// ─────────────────────────────────────────────────────────────
// SAMPLE PROJECTS — structure is final, content is placeholder.
// Mithil: replace titles, locations, text and photos with your
// real work. See CONTENT.md for exactly how. Do not publish
// with sample data.
// ─────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "sample-residence-01",
    title: "Sample Residence 01",
    typology: "Residential",
    location: "Vadodara",
    year: "2025",
    role: "Space planning · Design development · Site coordination",
    tools: ["AutoCAD", "SketchUp", "V-Ray"],
    intro:
      "Sample copy — replace with 2–4 sentences on the brief, the constraint that shaped the plan, and what the finished space feels like.",
    story: [],
    cover: project1,
    coverAlt: "Sample interior — replace with project photo",
    photos: [
      { src: project1, alt: "Sample photo — replace", layout: "full" },
      { src: project2, alt: "Sample photo — replace", layout: "half" },
      { src: project3, alt: "Sample photo — replace", layout: "half" },
      { src: hero, alt: "Sample photo — replace", layout: "full" },
      { src: project4, alt: "Sample photo — replace", layout: "detail" },
    ],
  },
  {
    slug: "sample-commercial-01",
    title: "Sample Commercial 01",
    typology: "Commercial",
    location: "Vadodara",
    year: "2025",
    role: "Design development · Working drawings",
    tools: ["AutoCAD", "SketchUp", "Lumion"],
    intro:
      "Sample copy — replace with 2–4 sentences about this project.",
    story: [],
    cover: project2,
    coverAlt: "Sample interior — replace with project photo",
    photos: [
      { src: project2, alt: "Sample photo — replace", layout: "full" },
      { src: project4, alt: "Sample photo — replace", layout: "half" },
      { src: project1, alt: "Sample photo — replace", layout: "half" },
    ],
  },
  {
    slug: "sample-residence-02",
    title: "Sample Residence 02",
    typology: "Residential",
    location: "Vadodara",
    year: "2024",
    role: "Space planning · 3D visualisation",
    tools: ["SketchUp", "Enscape", "Photoshop"],
    intro: "Sample copy — replace with 2–4 sentences about this project.",
    story: [],
    cover: project3,
    coverAlt: "Sample interior — replace with project photo",
    photos: [
      { src: project3, alt: "Sample photo — replace", layout: "full" },
      { src: hero, alt: "Sample photo — replace", layout: "full" },
    ],
  },
  {
    slug: "sample-academic-01",
    title: "Sample Academic Project",
    typology: "Academic",
    location: "MSU Baroda",
    year: "2024",
    role: "Concept · Drawings · Model",
    tools: ["AutoCAD", "V-Ray", "Illustrator"],
    intro: "Sample copy — replace with 2–4 sentences about this project.",
    story: [],
    cover: project4,
    coverAlt: "Sample interior — replace with project photo",
    photos: [
      { src: project4, alt: "Sample photo — replace", layout: "full" },
      { src: project2, alt: "Sample photo — replace", layout: "detail" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` → exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/data && git commit -m "feat: typed content data layer with real resume content"
```

---

### Task 3: Site header + Sawad-style hero

Giant two-line display type ("INTERIOR / DESIGNER"), staggered line reveal after the loader, portrait with parallax, meta row, marquee strip. Header becomes a shared component (project pages need it too).

**Files:**
- Create: `src/components/site/SiteHeader.tsx`
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/routes/index.tsx` (replace inline header + hero sections)
- Modify: `src/styles.css` (hero reveal keyframes)

**Interfaces:**
- Consumes: `site` from `@/data/site`; `Marquee` from Task 1; existing assets `../assets/hero.jpg`, `../assets/portrait.jpg`.
- Produces: `SiteHeader` — `() => JSX` from `@/components/site/SiteHeader` (links: `/#work`, `/#about`, `/#background`, `/#materials`, `/#process`, `/#contact` so they work from any route); `Hero` — `() => JSX` from `@/components/sections/Hero`.

- [ ] **Step 1: Create `SiteHeader.tsx`**

```tsx
import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

const links = [
  ["Work", "/#work"],
  ["About", "/#about"],
  ["Background", "/#background"],
  ["Materials", "/#materials"],
  ["Process", "/#process"],
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-10 md:py-8 text-[color:oklch(0.96_0.01_85)]">
        <Link to="/" className="label" data-cursor="Home">{site.name}</Link>
        <nav className="hidden gap-10 md:flex label">
          {links.map(([t, href]) => (
            <a key={href} href={href} className="transition-opacity hover:opacity-60">{t}</a>
          ))}
        </nav>
        <a href="/#contact" className="label" data-cursor="Write">Contact →</a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add hero reveal keyframes to `src/styles.css`**

```css
@keyframes hero-line-up {
  from { transform: translateY(110%); }
  to { transform: translateY(0); }
}
.hero-line { display: block; overflow: hidden; }
.hero-line > span {
  display: block;
  transform: translateY(110%);
  animation: hero-line-up 1.1s var(--ease-studio) forwards;
}
@media (prefers-reduced-motion: reduce) {
  .hero-line > span { transform: none; animation: none; }
}
```

- [ ] **Step 3: Create `src/components/sections/Hero.tsx`**

Layout: 100svh section; giant stacked type crossing over a right-side portrait; bottom meta row; keeps the existing parallax pattern (scroll listener translating the image wrapper — copy the `yRef` technique from `index.tsx` into this component).

```tsx
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import heroImg from "../../assets/hero.jpg";

export function Hero() {
  const yRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onScroll = () => {
      if (!yRef.current) return;
      const y = window.scrollY;
      yRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.00012})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden pt-28 md:pt-36">
      {/* Giant type */}
      <div className="relative z-10 px-6 md:px-10">
        <h1 className="font-display leading-[0.86] tracking-[-0.02em] text-[clamp(3.4rem,13.5vw,12.5rem)] uppercase">
          <span className="hero-line"><span style={{ animationDelay: "80ms" }}>Interior</span></span>
          <span className="hero-line pl-[0.6em]"><span className="italic text-accent" style={{ animationDelay: "220ms" }}>Designer</span></span>
        </h1>
        <p className="hero-line mt-6 max-w-md text-sm leading-relaxed text-foreground/70 md:mt-8 md:text-base">
          <span style={{ animationDelay: "380ms" }}>
            {site.name} — designing and executing thoughtful residential & commercial spaces from {site.location}.
          </span>
        </p>
      </div>

      {/* Portrait / hero image, right side, under the type */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[46vw] md:w-[38vw]">
        <div ref={yRef} className="h-[112%] w-full will-change-transform">
          <img src={heroImg} alt="Interior designed by Mithil More" className="h-full w-full object-cover" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-background/12" aria-hidden />
      </div>

      {/* Meta row */}
      <div className="relative z-10 flex items-end justify-between px-6 pb-8 md:px-10 md:pb-10">
        <div className="label text-foreground/60">
          <span className="block">{site.availability}</span>
          <span className="mt-1 block">{site.location}</span>
        </div>
        <a href="/#work" className="label text-foreground/60 transition-opacity hover:opacity-60" data-cursor="Scroll">
          Scroll ↓
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into `src/routes/index.tsx`**

Replace the inline `<header>…</header>` and hero `<section id="top">…</section>` with `<SiteHeader />` and `<Hero />`. Keep the `<Marquee …>` section directly below the hero (from Task 1). Remove the now-unused `yRef` scroll effect from `Home` (it moved into `Hero`).

- [ ] **Step 5: Verify**

`npx tsc --noEmit` → 0. Dev server: loader plays → hero lines slide up staggered → "DESIGNER" renders italic in clay accent; image parallaxes on scroll; meta row shows availability + Vadodara; nav links jump to sections; with DevTools emulation of `prefers-reduced-motion: reduce`, lines are static.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Sawad-style giant-type hero and shared site header"
```

---

### Task 4: About section (profile, stats, languages, portrait)

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/routes/index.tsx` (replace the `#studio` section, update `id` to `about`)

**Interfaces:**
- Consumes: `site` from `@/data/site`; `Reveal` from Task 1; `../../assets/portrait.jpg`.
- Produces: `AboutSection` — `() => JSX` from `@/components/sections/About`.

- [ ] **Step 1: Create `About.tsx`**

Editorial statement in display type, portrait right, fact strip below (based-in / languages / focus). No invented numbers — an early-career designer's credibility is specificity, not fake stats.

```tsx
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import portrait from "../../assets/portrait.jpg";

export function AboutSection() {
  return (
    <section id="about" className="relative border-b border-border px-6 py-28 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-8 gap-y-14">
        <Reveal className="col-span-12 md:col-span-2">
          <span className="label text-foreground/50">01 — About</span>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-6" delay={80}>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.6rem)] leading-[1.08] tracking-[-0.015em] text-balance">
            {site.profile}
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-foreground/65 md:text-base">
            Trained first in commerce, then rebuilt in design — a route that left
            me fluent in both the drawing and the budget behind it. Today I work
            across residential and commercial projects: planning the space,
            developing the design, and standing on site until it is built right.
          </p>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-3 md:col-start-10" delay={160}>
          <div className="aspect-[3/4] overflow-hidden">
            <img src={portrait} alt={`${site.name}, interior designer`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
          </div>
        </Reveal>

        <Reveal className="col-span-12" delay={220}>
          <dl className="grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            <div>
              <dt className="label text-foreground/50">Based in</dt>
              <dd className="mt-2 text-sm md:text-base">{site.location}</dd>
            </div>
            <div>
              <dt className="label text-foreground/50">Focus</dt>
              <dd className="mt-2 text-sm md:text-base">Residential & Commercial Interiors</dd>
            </div>
            <div>
              <dt className="label text-foreground/50">Languages</dt>
              <dd className="mt-2 text-sm md:text-base">{site.languages.join(" · ")}</dd>
            </div>
            <div>
              <dt className="label text-foreground/50">Currently</dt>
              <dd className="mt-2 text-sm md:text-base">{site.experience[0].company}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `index.tsx`** — replace the whole `#studio` section with `<AboutSection />`. Search for any remaining `#studio` anchor references and update to `#about`.

- [ ] **Step 3: Verify** — tsc 0; visual: statement in serif, portrait hover-zooms, 4 fact columns collapse to 2 on mobile width.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: about section with real profile, facts and portrait"
```

---

### Task 5: Background section — experience rows, education, software grid

Sawad's signature move ("12 YEARS OF EXPERIENCE" hover rows) adapted honestly: giant "BACKGROUND" heading, interactive experience rows that invert on hover, education entries, and the 8-software grid.

**Files:**
- Create: `src/components/sections/Background.tsx`
- Modify: `src/routes/index.tsx` (insert after `<AboutSection />`)

**Interfaces:**
- Consumes: `site`, `ExperienceItem`, `EducationItem` from `@/data/site`; `Reveal` from Task 1.
- Produces: `BackgroundSection` — `() => JSX` from `@/components/sections/Background`.

- [ ] **Step 1: Create `Background.tsx`**

```tsx
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function BackgroundSection() {
  return (
    <section id="background" className="border-b border-border bg-bone px-6 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <span className="label text-foreground/50">02 — Background</span>
          <h2 className="mt-6 font-display uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.6rem,8vw,7.5rem)]">
            Experience <span className="italic text-accent">&</span> Study
          </h2>
        </Reveal>

        {/* Experience rows */}
        <div className="mt-16 border-t border-border">
          {site.experience.map((e, i) => (
            <Reveal key={i} delay={i * 90}>
              <div
                className="group grid grid-cols-12 items-baseline gap-x-8 gap-y-2 border-b border-border px-2 py-8 transition-colors duration-500 hover:bg-ink hover:text-[color:oklch(0.96_0.01_85)] md:py-10"
                data-cursor={e.company}
              >
                <span className="label col-span-12 opacity-50 md:col-span-2">{e.period}</span>
                <h3 className="col-span-12 font-display text-2xl leading-tight md:col-span-4 md:text-3xl">{e.company}</h3>
                <span className="col-span-12 text-sm opacity-70 md:col-span-2">{e.role}</span>
                <p className="col-span-12 text-sm leading-relaxed opacity-60 md:col-span-4">{e.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <div className="mt-20 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-2">
            <span className="label text-foreground/50">Education</span>
          </Reveal>
          {site.education.map((ed, i) => (
            <Reveal key={i} className="col-span-12 md:col-span-5" delay={i * 100}>
              <div className="border-t border-border pt-6">
                <span className="label text-foreground/50">{ed.period}</span>
                <h3 className="mt-3 font-display text-xl md:text-2xl">{ed.degree}</h3>
                <p className="mt-1 text-sm text-foreground/70">{ed.field}</p>
                <p className="mt-3 text-sm text-foreground/55">{ed.school}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Software grid */}
        <div className="mt-20 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-2">
            <span className="label text-foreground/50">Software</span>
          </Reveal>
          <div className="col-span-12 grid grid-cols-2 gap-px border border-border bg-border md:col-span-10 md:grid-cols-4">
            {site.tools.map((t, i) => (
              <Reveal key={t} delay={i * 50} className="bg-bone">
                <div className="flex h-24 items-center justify-center px-4 transition-colors duration-400 hover:bg-background md:h-28" data-cursor="Tool">
                  <span className="label text-foreground/75">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `index.tsx`** after `<AboutSection />`; add `Background` to the header nav order check (already linked as `/#background` from Task 3).

- [ ] **Step 3: Verify** — tsc 0; visual: 3 experience rows (WE2, APM, APM intern) invert to dark ink on hover with cursor label showing company name; 2 education cards; 8 software cells in a hairline grid.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: background section — experience rows, education, software grid"
```

---

### Task 6: Projects section — clickable index

**Files:**
- Create: `src/components/sections/Work.tsx`
- Modify: `src/routes/index.tsx` (replace the existing `#work` section)

**Interfaces:**
- Consumes: `projects` from `@/data/projects`; `Reveal` from Task 1; `Link` from `@tanstack/react-router`.
- Produces: `WorkSection` — `() => JSX` from `@/components/sections/Work`. Cards navigate to `/projects/$slug` (route created in Task 7 — build this task first; the link target type-checks only after Task 7 regenerates the route tree, so run Task 7 before final verification if TS complains about the route path).

- [ ] **Step 1: Create `Work.tsx`**

Editorial staggered grid (avoid the equal-card template look): alternating wide/narrow cards, index numbers, typology + year meta, hover zoom + cursor "View".

```tsx
import { Link } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";

export function WorkSection() {
  return (
    <section id="work" className="border-b border-border px-6 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <span className="label text-foreground/50">03 — Selected Work</span>
          <h2 className="mt-6 font-display uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.6rem,8vw,7.5rem)]">
            Projects
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-20">
          {projects.map((p, i) => {
            const wide = i % 2 === 0;
            return (
              <Reveal
                key={p.slug}
                delay={(i % 2) * 120}
                className={
                  wide
                    ? "col-span-12 md:col-span-7"
                    : "col-span-12 md:col-span-5 md:mt-24"
                }
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                  data-cursor="View"
                >
                  <div className={`overflow-hidden ${wide ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
                    <img
                      src={p.cover}
                      alt={p.coverAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <h3 className="font-display text-2xl leading-none md:text-3xl">
                      <span className="label mr-3 align-middle text-foreground/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.title}
                    </h3>
                    <span className="label text-foreground/50">
                      {p.typology} · {p.year}
                    </span>
                  </div>
                  <p className="label mt-2 text-foreground/45">{p.location}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `index.tsx`** — replace the entire existing `#work` section with `<WorkSection />`. Delete the old inline project array if one exists in `index.tsx`.

- [ ] **Step 3: Verify (full check after Task 7)** — tsc may flag the `/projects/$slug` path until Task 7 creates it; visual after both tasks: 4 cards in staggered rhythm, hover zooms image and cursor reads "View".

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: clickable projects index driven by data layer"
```

---

### Task 7: Project detail route `/projects/$slug`

**Files:**
- Create: `src/routes/projects.$slug.tsx`

**Interfaces:**
- Consumes: `getProject`, `nextProject`, `Project`, `ProjectPhoto` from `@/data/projects`; `SiteHeader` from Task 3; `Reveal`, `Cursor` from Task 1; `Link`, `notFound` from `@tanstack/react-router`.
- Produces: route `/projects/$slug` used by Task 6 links.

- [ ] **Step 1: Create the route file**

Anatomy per research: full-bleed hero → title + meta grid → short intro → photo flow (layout variants) → next-project link.

```tsx
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getProject, nextProject, type ProjectPhoto } from "@/data/projects";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Cursor } from "@/components/motion/Cursor";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title} — Mithil More` },
      { name: "description", content: loaderData?.project.intro ?? "" },
      { property: "og:title", content: `${loaderData?.project.title} — Mithil More` },
    ],
  }),
  component: ProjectPage,
});

function Photo({ photo }: { photo: ProjectPhoto }) {
  if (photo.layout === "detail") {
    return (
      <div className="col-span-12 md:col-span-5 md:col-start-7">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }
  if (photo.layout === "half") {
    return (
      <div className="col-span-12 md:col-span-6">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }
  return (
    <div className="col-span-12">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project, next } = Route.useLoaderData();
  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Cursor />
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[72svh] w-full overflow-hidden md:h-[86svh]">
        <img src={project.cover} alt={project.coverAlt} className="h-full w-full object-cover" fetchPriority="high" />
      </section>

      {/* Title + meta */}
      <section className="border-b border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-8 gap-y-10">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="label text-foreground/50">{project.typology} — {project.location}</span>
            <h1 className="mt-4 font-display uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(2.6rem,7vw,6.5rem)]">
              {project.title}
            </h1>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={120}>
            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div><dt className="label text-foreground/50">Year</dt><dd className="mt-1 text-sm">{project.year}</dd></div>
              <div><dt className="label text-foreground/50">Location</dt><dd className="mt-1 text-sm">{project.location}</dd></div>
              <div className="col-span-2"><dt className="label text-foreground/50">Role</dt><dd className="mt-1 text-sm">{project.role}</dd></div>
              <div className="col-span-2"><dt className="label text-foreground/50">Tools</dt><dd className="mt-1 text-sm">{project.tools.join(" · ")}</dd></div>
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-foreground/70 md:text-base">{project.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Photo flow */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-8 gap-y-12 md:gap-y-20">
          {project.photos.map((ph, i) => (
            <Reveal key={i} className="contents"><Photo photo={ph} /></Reveal>
          ))}
        </div>
        {project.story.length > 0 && (
          <div className="mx-auto mt-20 max-w-2xl space-y-6">
            {project.story.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/70 md:text-base">{para}</p>
            ))}
          </div>
        )}
      </section>

      {/* Next project */}
      <section className="border-t border-border bg-ink px-6 py-20 text-[color:oklch(0.96_0.01_85)] md:px-10 md:py-28">
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="group mx-auto block max-w-[1600px]" data-cursor="Next">
          <span className="label opacity-50">Next project</span>
          <span className="mt-4 flex items-baseline justify-between">
            <span className="font-display uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.2rem,7vw,6rem)] transition-opacity group-hover:opacity-70">
              {next.title}
            </span>
            <span className="font-display text-[clamp(2rem,5vw,4rem)] transition-transform duration-500 group-hover:translate-x-3">→</span>
          </span>
        </Link>
        <div className="mx-auto mt-12 max-w-[1600px] border-t border-white/10 pt-6">
          <Link to="/" className="label opacity-60 transition-opacity hover:opacity-100">← All work</Link>
        </div>
      </section>
    </div>
  );
}
```

Note: if `Reveal` with `className="contents"` breaks the grid (Reveal renders a div with transforms — `display: contents` ignores transforms), wrap differently: put `Photo` directly and drop the `Reveal` wrapper for the photo flow, adding `Reveal` inside `Photo`'s column div instead. Acceptance is the visual check, not the exact wrapper.

- [ ] **Step 2: Verify**

`npm run dev` (regenerates `routeTree.gen.ts`), then `npx tsc --noEmit` → 0. Visual: from home, click each of the 4 project cards → detail page: full-bleed hero, meta grid, intro, photo flow with mixed layouts, dark next-project footer cycles through projects; `/projects/does-not-exist` shows the not-found page; browser tab title = "Sample Residence 01 — Mithil More".

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: photo-rich project detail route with next-project navigation"
```

---

### Task 8: Contact + footer rebuild; remove all fabricated content

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/routes/index.tsx` (replace `#contact` section; DELETE testimonial section, `recognitions` array and its section, and the fake-location details carousel captions)

**Interfaces:**
- Consumes: `site` from `@/data/site`; `Reveal`, `Marquee` from Task 1.
- Produces: `ContactSection` — `() => JSX` from `@/components/sections/Contact`.

- [ ] **Step 1: Create `Contact.tsx`**

Giant type CTA + three real channels (email, WhatsApp, phone). No form backend exists — `mailto:` and WhatsApp deep link are the reliable static-site channels (a Formspree form can be added later without redesign).

```tsx
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-6 py-28 text-[color:oklch(0.97_0.008_85)] md:px-10 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <span className="label opacity-50">04 — Contact</span>
          <h2 className="mt-8 font-display uppercase leading-[0.88] tracking-[-0.02em] text-[clamp(3rem,11vw,11rem)] text-balance">
            Let’s shape<br />
            <span className="italic text-accent">your space</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <a href={`mailto:${site.email}`} data-cursor="Email"
               className="label border border-white/25 px-8 py-5 text-center transition-colors hover:bg-white hover:text-ink">
              {site.email}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" data-cursor="WhatsApp"
               className="label border border-white/25 px-8 py-5 text-center transition-colors hover:bg-white hover:text-ink">
              WhatsApp →
            </a>
            <a href={`tel:${site.phoneRaw}`} data-cursor="Call"
               className="label px-2 py-5 opacity-70 transition-opacity hover:opacity-100">
              {site.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end">
          <div className="label opacity-50">
            <span className="block">{site.name} — {site.title}</span>
            <span className="mt-1 block">{site.location}</span>
          </div>
          <div className="label flex gap-8 opacity-50">
            {site.instagram && (
              <a href={site.instagram} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-100">Instagram</a>
            )}
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Purge fabricated content from `index.tsx`**

Delete entirely: the `recognitions` const and the section rendering it; the testimonial section (`{/* TESTIMONIAL */}`); update the details-carousel captions (Kyoto/Bandra/Alibaug/Colaba place names) to neutral true captions (`"Material study"`, `"Render — sample"`, etc.) or delete the carousel if it reads as filler. Search the file for `AD100`, `ELLE`, `Wallpaper`, `Dezeen`, `Kyoto`, `Colaba`, `Alibaug`, `Bandra` — zero matches must remain.

- [ ] **Step 3: Wire `<ContactSection />`** in place of the old contact section. Final landing order: `SiteHeader, Loader, Cursor → Hero → Marquee → AboutSection → BackgroundSection → WorkSection → materials (existing) → process (existing) → ContactSection`.

- [ ] **Step 4: Verify**

`npx tsc --noEmit` → 0. `grep -inE "AD100|ELLE|Wallpaper|Dezeen|Kyoto|Colaba|Alibaug|Bandra" src/routes/index.tsx` → no output. Visual: dark contact block with giant "LET'S SHAPE YOUR SPACE", email button opens mail client, WhatsApp opens wa.me/918733830350, phone link dials.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section with real channels; remove fabricated awards/testimonials"
```

---

### Task 9: Motion polish — smooth scroll + route transitions

**Files:**
- Modify: `package.json` (add `lenis`)
- Create: `src/components/motion/SmoothScroll.tsx`
- Modify: `src/routes/__root.tsx` (mount SmoothScroll, enable view transitions)

**Interfaces:**
- Consumes: `lenis` npm package (^1.x).
- Produces: `SmoothScroll` — `({ children }: { children: React.ReactNode }) => JSX`.

- [ ] **Step 1: Install**

Run: `npm install lenis`
Expected: added to dependencies without peer-dep errors.

- [ ] **Step 2: Create `SmoothScroll.tsx`**

```tsx
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 3: Mount in `__root.tsx`** — wrap the router `<Outlet />` (or the root layout's children — match the file's existing structure) with `<SmoothScroll>…</SmoothScroll>`. Add cross-route fade by appending to `src/styles.css`:

```css
@media not (prefers-reduced-motion: reduce) {
  ::view-transition-old(root) { animation: 260ms ease-out both fade-out-vt; }
  ::view-transition-new(root) { animation: 320ms ease-in both fade-in-vt; }
  @keyframes fade-out-vt { to { opacity: 0; } }
  @keyframes fade-in-vt { from { opacity: 0; } }
}
```

and set `defaultViewTransition: true` on the router in `src/router.tsx` (TanStack Router option; if the installed version doesn't support it, use `defaultPreload: "intent"` only and skip view transitions — note which path was taken).

- [ ] **Step 4: Verify** — tsc 0; scrolling is inertial/smooth on desktop; anchor links still land on correct sections; home ↔ project navigation cross-fades; with reduced motion emulated, native scroll returns.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: lenis smooth scroll and cross-route fade transitions"
```

---

### Task 10: SEO/a11y/perf pass + content drop-in guide

**Files:**
- Modify: `src/routes/index.tsx` (head() meta refresh)
- Create: `CONTENT.md` (repo root)

- [ ] **Step 1: Update landing `head()`**

In `src/routes/index.tsx` set: title `"Mithil More — Interior Designer, Vadodara"`; description `"Portfolio of Mithil A. More — interior designer in Vadodara, India. Space planning, design development and site execution for residential & commercial projects."`; matching `og:` tags; JSON-LD Person updated with `jobTitle: "Interior Designer"`, `email`, `telephone`, `address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressCountry: "IN" }`.

- [ ] **Step 2: A11y/perf sweep (checklist, fix violations found)**

- Every `img` has meaningful `alt`; hero images `fetchPriority="high"`, all others `loading="lazy"`.
- Landing has exactly one `h1` (hero); project pages: `h1` = project title.
- All interactive elements reachable by keyboard (links only — no div-onClick anywhere).
- `npm run build` succeeds; note the built client JS size from output.

- [ ] **Step 3: Write `CONTENT.md`**

```markdown
# How to put YOUR content into this site

## 1. Your photos
- Portrait: replace `src/assets/portrait.jpg` (vertical, ~1200×1600).
- Hero image: replace `src/assets/hero.jpg` with your best interior photo
  (landscape, ~2400px wide, export JPG quality 80).

## 2. Your projects (the important one)
Open `src/data/projects.ts`. Each project is one object. For each real project:
1. Put its photos in `src/assets/projects/<slug>/` (e.g. `src/assets/projects/akota-residence/01.jpg`).
   Export at 2000px on the long edge, JPG quality 80. Name in shoot order: 01.jpg, 02.jpg…
2. Import them at the top of `projects.ts`:
   `import akota01 from "../assets/projects/akota-residence/01.jpg";`
3. Fill the object: slug (kebab-case, used in the URL), title (name it after the
   place — "Akota Residence"), typology (Residential/Commercial/Academic),
   location, year, role (what YOU did), tools, intro (2–4 sentences), photos
   (pick layout: "full" for hero-quality wide shots, "half" for pairs,
   "detail" for close-ups).
4. Delete the sample projects when your real ones are in.

## 3. Contact & socials
`src/data/site.ts` — set `instagram` to your full profile URL to make the
footer link appear. Everything else (email/phone/WhatsApp) is already real.

## 4. Publish
Commit and push to GitHub — Lovable picks it up, or connect the repo to
Vercel/Netlify. Run `npm run build` locally first to confirm it compiles.
```

- [ ] **Step 4: Final verify** — `npm run build` exit 0; `npx tsc --noEmit` exit 0; click through: hero → about → background → projects → detail → next-project loop → contact links.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: SEO/a11y pass and content drop-in guide"
```

---

## Self-Review

- **Spec coverage:** intro/landing hero → Task 3; about with work-ex + education → Tasks 4–5; clickable projects with description + all photos → Tasks 6–7; "10x better" → giant-type direction, hover-invert rows, motion system, detail-route anatomy from research, honest-content purge, smooth scroll, SEO (Tasks 3, 5, 8, 9, 10). ✓
- **Placeholder scan:** sample project data is an explicit user-content contract documented in CONTENT.md, not a plan placeholder; all plan steps contain concrete code/commands. ✓
- **Type consistency:** `site`/`Project`/`ProjectPhoto`/`getProject`/`nextProject` defined once in Task 2 and consumed with identical signatures in Tasks 3–8. `Reveal`/`Cursor`/`Loader`/`Marquee` names stable from Task 1. ✓
