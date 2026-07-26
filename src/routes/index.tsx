import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "../assets/hero.jpg";
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import matStone from "../assets/mat-stone.jpg";
import matWood from "../assets/mat-wood.jpg";
import matBronze from "../assets/mat-bronze.jpg";
import matLinen from "../assets/mat-linen.jpg";
import portrait from "../assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mithil More — Interior Architecture & Spatial Design" },
      {
        name: "description",
        content:
          "The studio of Mithil More. Quiet, considered interiors rooted in material honesty, architectural restraint and the choreography of light.",
      },
      { property: "og:title", content: "Mithil More — Interior Architecture" },
      {
        property: "og:description",
        content:
          "Interiors composed as architecture. A studio practice devoted to material, light and stillness.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mithil More",
          jobTitle: "Interior Designer",
          url: "/",
        }),
      },
    ],
  }),
  component: Home,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  as: As = "div",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Comp = As as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.1s var(--ease-studio) ${delay}ms, transform 1.2s var(--ease-studio) ${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const target = e.target as HTMLElement | null;
      const l = target?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(l?.dataset.cursor ?? "");
    };
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 grid size-9 place-items-center rounded-full border border-foreground/40 backdrop-blur-[1px] transition-[width,height,background] duration-300"
        style={{
          width: label ? 84 : 36,
          height: label ? 84 : 36,
          background: label ? "var(--ink)" : "transparent",
          color: label ? "var(--background)" : "var(--foreground)",
          borderColor: label ? "transparent" : "color-mix(in oklab, var(--foreground) 35%, transparent)",
        }}
      >
        <span className="label" style={{ opacity: label ? 1 : 0 }}>{label}</span>
      </div>
      <div ref={dot} className="absolute left-0 top-0 size-1.5 rounded-full bg-foreground" />
    </div>
  );
}

function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-background transition-opacity duration-700"
      style={{ opacity: gone ? 0 : 1, pointerEvents: gone ? "none" : "auto" }}
    >
      <div className="w-[min(80vw,520px)] px-6">
        <div className="flex items-baseline justify-between label text-foreground/60">
          <span>Mithil More</span>
          <span>Studio</span>
        </div>
        <div className="mt-4 h-px w-full origin-left scale-x-0 bg-foreground/70 animate-[draw_1.4s_var(--ease-studio)_forwards]" />
        <div className="mt-6 flex items-baseline justify-between">
          <span className="font-display text-3xl italic text-foreground/80">Enter</span>
          <span className="label text-foreground/40">MMXXV</span>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    n: "01",
    title: "House of Quiet Light",
    place: "Alibaug, IN",
    year: "2024",
    type: "Private Residence",
    img: heroImg,
    span: "lg:col-span-8",
    tall: false,
  },
  {
    n: "02",
    title: "Refectory No. 4",
    place: "Mumbai, IN",
    year: "2024",
    type: "Dining / Hospitality",
    img: project1,
    span: "lg:col-span-4",
    tall: true,
  },
  {
    n: "03",
    title: "Linen & Ash",
    place: "Bandra, IN",
    year: "2023",
    type: "Apartment",
    img: project2,
    span: "lg:col-span-5",
    tall: false,
  },
  {
    n: "04",
    title: "The Stone Bath",
    place: "Kyoto, JP",
    year: "2023",
    type: "Guesthouse",
    img: project3,
    span: "lg:col-span-7",
    tall: true,
  },
];

const materials = [
  { name: "Travertine", origin: "Tivoli, IT", img: matStone },
  { name: "Oiled Oak", origin: "Slavonia, HR", img: matWood },
  { name: "Patinated Bronze", origin: "Milano, IT", img: matBronze },
  { name: "Belgian Linen", origin: "Kortrijk, BE", img: matLinen },
];

const process = [
  { n: "01", t: "Discover", d: "Listening to the site, the client, and the silences between the two." },
  { n: "02", t: "Concept", d: "A single line of intent from which every subsequent decision will follow." },
  { n: "03", t: "Planning", d: "Architectural drawings, spatial choreography, functional geometry." },
  { n: "04", t: "Visualisation", d: "Light studies, material stacks and full room dioramas in service of feeling." },
  { n: "05", t: "Execution", d: "Craftsmanship supervised down to the millimetre, on site, in person." },
  { n: "06", t: "Delivery", d: "Handover as ritual — the space received with its story already inside it." },
];

const recognitions = [
  ["AD100", "Featured, 2024"],
  ["Wallpaper*", "Design Awards, Shortlist"],
  ["ELLE Decor", "Interior of the Year"],
  ["Dezeen", "Longlist, Residence"],
  ["Frame", "Editor's Pick"],
  ["Domus", "Notes on Practice"],
];

function Home() {
  const yRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!yRef.current) return;
      const y = window.scrollY;
      yRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.00012})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Loader />
      <Cursor />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-10 md:py-8 text-[color:oklch(0.96_0.01_85)]">
          <a href="#top" className="label" data-cursor="Top">Mithil More</a>
          <nav className="hidden gap-10 md:flex label">
            <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
            <a href="#studio" className="hover:opacity-60 transition-opacity">Studio</a>
            <a href="#materials" className="hover:opacity-60 transition-opacity">Materials</a>
            <a href="#process" className="hover:opacity-60 transition-opacity">Process</a>
            <a href="#journal" className="hover:opacity-60 transition-opacity">Journal</a>
          </nav>
          <a href="#contact" className="label" data-cursor="Write">Contact →</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative h-[100svh] w-full overflow-hidden">
        <div ref={yRef} className="absolute inset-0 -z-10 will-change-transform">
          <img
            src={heroImg}
            alt="Sunlit travertine living room with low oak furniture"
            width={1920}
            height={1280}
            className="h-[115%] w-full object-cover softin"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-background" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32 text-[color:oklch(0.97_0.008_85)]">
          <div className="flex items-start justify-between label opacity-80">
            <span>Studio&nbsp;Est.&nbsp;MMXVIII</span>
            <span className="hidden md:inline">N 19.07° — E 72.87°</span>
            <span>Interiors / Architecture</span>
          </div>

          <div className="max-w-[1400px]">
            <p className="label mb-6 opacity-80 rise" style={{ animationDelay: "1.9s" }}>
              — A studio practice by Mithil More
            </p>
            <h1
              className="font-display text-[clamp(3.2rem,12vw,12rem)] leading-[0.86] tracking-[-0.02em] text-balance rise"
              style={{ animationDelay: "2.1s" }}
            >
              Rooms that <em className="italic opacity-95">remember</em>
              <br />the light.
            </h1>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 rise" style={{ animationDelay: "2.35s" }}>
              <p className="max-w-md font-light leading-relaxed opacity-85">
                Interiors composed as architecture. A quiet devotion to material, proportion and the way a space holds a life.
              </p>
              <a
                href="#work"
                data-cursor="Scroll"
                className="group inline-flex items-center gap-4 label"
              >
                <span className="inline-block h-px w-16 bg-current transition-all duration-500 group-hover:w-24" />
                <span>Selected&nbsp;Work — 2018 / 2025</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-6 overflow-hidden marquee-mask">
        <div className="marquee-track flex w-max whitespace-nowrap font-display text-4xl md:text-6xl italic tracking-tight text-foreground/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {["Residential", "Hospitality", "Retail", "Adaptive Re-use", "Furniture", "Art Direction"].map((w) => (
                <span key={w + i} className="mx-10 inline-flex items-center gap-10">
                  <span>{w}</span>
                  <span className="text-bronze/60">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STUDIO / INTRODUCTION */}
      <section id="studio" className="relative border-b border-border px-6 py-28 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-y-16 gap-x-8">
          <div className="col-span-12 flex items-start justify-between md:col-span-3">
            <span className="label text-foreground/50">Ch. 01 — Studio</span>
            <span className="label text-foreground/40 md:hidden">2025</span>
          </div>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4.5vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-balance">
              I do not decorate rooms. I compose the quiet that lives inside them —
              the pause between the door and the window, the weight of stone under
              a bare foot, the hour when a wall <em className="italic text-bronze">turns golden</em>.
            </h2>
          </Reveal>

          <div className="col-span-12 mt-12 grid grid-cols-12 gap-8 md:mt-24">
            <Reveal className="col-span-12 md:col-span-4 md:col-start-4" delay={80}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={portrait}
                  alt="Portrait of Mithil More"
                  width={1200}
                  height={1504}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[15%]"
                />
              </div>
              <p className="label mt-4 text-foreground/50">Mithil More — Principal</p>
            </Reveal>

            <Reveal className="col-span-12 space-y-6 text-lg leading-relaxed text-foreground/75 md:col-span-4" delay={160}>
              <p>
                Trained between Mumbai and Milano, Mithil More founded the studio in 2018 as a devotion to the discipline of restraint — a slow practice against the noise of the discipline.
              </p>
              <p>
                Every project begins the same way: a long walk through the site at three different hours of the day, a single notebook, no camera. The building tells the studio how to answer.
              </p>
              <a href="#contact" data-cursor="Read" className="inline-flex items-center gap-3 label pt-4">
                <span>The Manifesto</span>
                <span className="inline-block h-px w-10 bg-current" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORK — Featured Projects */}
      <section id="work" className="border-b border-border px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between md:mb-24">
            <span className="label text-foreground/50">Ch. 02 — Selected Works</span>
            <span className="label text-foreground/40">Index / 04</span>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-28 md:gap-y-40">
            {projects.map((p, i) => (
              <Reveal
                key={p.n}
                className={`col-span-12 ${p.span} ${i % 2 === 1 ? "md:mt-40" : ""}`}
                delay={i * 60}
              >
                <a href="#" data-cursor="View" className="group block">
                  <div className={`relative w-full overflow-hidden ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="label text-bronze">{p.n}</span>
                      <h3 className="font-display text-2xl md:text-4xl leading-tight tracking-[-0.01em]">
                        {p.title}
                      </h3>
                    </div>
                    <div className="hidden text-right label text-foreground/50 md:block">
                      <div>{p.type}</div>
                      <div className="mt-1">{p.place} · {p.year}</div>
                    </div>
                  </div>
                  <div className="mt-4 hairline" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — Big pull quote */}
      <section className="relative border-b border-border bg-bone px-6 py-32 md:px-10 md:py-56">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-center justify-between label text-foreground/50">
            <span>Ch. 03 — Philosophy</span>
            <span>On restraint</span>
          </div>
          <Reveal>
            <p className="font-display text-[clamp(2.4rem,6vw,6.4rem)] leading-[0.98] tracking-[-0.02em] text-balance">
              Luxury is not an ornament. It is the presence of
              <em className="italic text-bronze"> intention</em> in every millimetre,
              and the confidence to leave the rest alone.
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 md:col-start-9 label text-foreground/60">
              — Note 004, Studio Journal
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="border-b border-border px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between md:mb-24">
            <div>
              <span className="label text-foreground/50">Ch. 04 — Material Library</span>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
                A vocabulary of <em className="italic text-bronze">four</em>.
              </h2>
            </div>
            <span className="hidden label text-foreground/40 md:block">Curated · 2025 season</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-4 md:gap-x-8">
            {materials.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="group cursor-pointer" data-cursor="Feel">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <div className="label text-foreground/40">0{i + 1}</div>
                      <div className="mt-2 font-display text-2xl md:text-3xl">{m.name}</div>
                    </div>
                    <span className="label text-foreground/50">{m.origin}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-b border-border bg-ink px-6 py-28 text-[color:oklch(0.96_0.01_85)] md:px-10 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between md:mb-24">
            <span className="label opacity-60">Ch. 05 — Method</span>
            <span className="label opacity-40">Six movements</span>
          </div>

          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 md:col-span-4">
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[1] tracking-[-0.02em] text-balance">
                From <em className="italic text-bronze">intuition</em> to inhabited space.
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed opacity-70">
                Every commission proceeds through the same six movements. Not a checklist — a rhythm.
              </p>
            </div>

            <ol className="col-span-12 mt-12 md:col-span-7 md:col-start-6 md:mt-0">
              {process.map((s, i) => (
                <Reveal key={s.n} delay={i * 40}>
                  <li className="group grid grid-cols-12 gap-4 border-t border-white/10 py-8 md:py-10">
                    <span className="col-span-2 label opacity-50">{s.n}</span>
                    <h3 className="col-span-10 md:col-span-4 font-display text-3xl md:text-5xl italic transition-transform duration-500 group-hover:translate-x-2">
                      {s.t}
                    </h3>
                    <p className="col-span-12 md:col-span-6 text-sm leading-relaxed opacity-70">
                      {s.d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* HORIZONTAL GALLERY */}
      <section className="border-b border-border py-28 md:py-40">
        <div className="mx-auto mb-12 flex max-w-[1600px] items-end justify-between px-6 md:mb-16 md:px-10">
          <span className="label text-foreground/50">Ch. 06 — Details</span>
          <span className="label text-foreground/40 italic font-display text-base">drag to traverse →</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:gap-10 md:px-10" data-cursor="Drag">
          {[
            { img: project4, cap: "Interior — Stairwell", pl: "Kyoto" },
            { img: project2, cap: "Interior — Bedroom", pl: "Bandra" },
            { img: project3, cap: "Detail — Stone Wash", pl: "Alibaug" },
            { img: project1, cap: "Interior — Refectory", pl: "Colaba" },
            { img: heroImg, cap: "Interior — Reading", pl: "Alibaug" },
          ].map((g, i) => (
            <div key={i} className="snap-start shrink-0 w-[78vw] md:w-[42vw] lg:w-[32vw]">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={g.img} alt={g.cap} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 flex items-baseline justify-between label text-foreground/60">
                <span>{g.cap}</span>
                <span>{g.pl}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-b border-border bg-bone px-6 py-28 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-y-16 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <span className="label text-foreground/50">Ch. 07 — Words</span>
          </div>
          <Reveal className="col-span-12 md:col-span-9">
            <blockquote className="font-display text-[clamp(1.8rem,3.6vw,3.4rem)] leading-[1.1] tracking-[-0.01em] text-balance">
              “We asked for a house. He gave us a way of living in one.
              Two years later, the rooms still <em className="italic text-bronze">surprise us</em> with light we had not noticed before.”
            </blockquote>
            <div className="mt-10 flex items-center gap-4 label text-foreground/60">
              <span className="h-px w-16 bg-foreground/30" />
              <span>Anaya & Rohan Sethi — House of Quiet Light, 2024</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="border-b border-border px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between">
            <span className="label text-foreground/50">Ch. 08 — Recognition</span>
            <span className="label text-foreground/40">Press · Awards · Exhibitions</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {recognitions.map(([name, note], i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="flex items-baseline justify-between border-t border-border py-8">
                  <span className="font-display text-2xl md:text-3xl">{name}</span>
                  <span className="label text-foreground/50 text-right">{note}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-ink px-6 py-28 text-[color:oklch(0.97_0.008_85)] md:px-10 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between label opacity-60 mb-16">
            <span>Ch. 09 — Correspondence</span>
            <span>MMXXV</span>
          </div>

          <Reveal>
            <h2 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-[-0.02em] text-balance">
              Let us begin
              <br /><em className="italic text-bronze/90">quietly</em>.
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <a
                href="mailto:studio@mithilmore.com"
                data-cursor="Write"
                className="group inline-flex items-baseline gap-4 font-display text-2xl md:text-4xl border-b border-white/20 pb-3 hover:border-white/60 transition-colors"
              >
                <span>studio@mithilmore.com</span>
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </a>
              <p className="mt-10 max-w-md text-sm leading-relaxed opacity-70">
                The studio accepts a limited number of commissions each year. Residences, hospitality and long-form
                collaborations with makers.
              </p>
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-8 label opacity-70">
              <div className="mb-3 opacity-50">Studio</div>
              <div>Ground Floor</div>
              <div>Colaba Causeway</div>
              <div>Mumbai 400005 · IN</div>
              <div className="mt-6 opacity-50">Hours</div>
              <div>Tue — Fri</div>
              <div>By appointment</div>
            </div>

            <div className="col-span-12 md:col-span-2 label opacity-70">
              <div className="mb-3 opacity-50">Follow</div>
              <div>Instagram</div>
              <div>Are.na</div>
              <div>Journal</div>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 label opacity-50 md:flex-row md:items-center">
            <span>© MMXXV — Mithil More Studio</span>
            <span>Rooms that remember the light.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
