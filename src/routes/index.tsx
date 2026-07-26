import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";
import { Marquee } from "@/components/motion/Marquee";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BackgroundSection } from "@/components/sections/Background";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

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

/** Editorial rhythm for the work grid — wide/narrow alternation, repeats past 4 items. */
const workLayout = [
  { span: "lg:col-span-8", tall: false },
  { span: "lg:col-span-4", tall: true },
  { span: "lg:col-span-5", tall: false },
  { span: "lg:col-span-7", tall: true },
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
      <SiteHeader />

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
            <span>{site.title}</span>
            <span className="hidden md:inline">{site.coordinates}</span>
            <span>{site.locationShort}</span>
          </div>

          <div className="max-w-[1400px]">
            <p className="label mb-6 opacity-80 rise" style={{ animationDelay: "1.9s" }}>
              — {site.name}, {site.title}
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
                Interiors composed with intention. A quiet devotion to material, proportion and the way a space holds a life.
              </p>
              <a
                href="#work"
                data-cursor="Scroll"
                className="group inline-flex items-center gap-4 label"
              >
                <span className="inline-block h-px w-16 bg-current transition-all duration-500 group-hover:w-24" />
                <span>Selected&nbsp;Work ↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-6">
        <Marquee items={["Residential", "Commercial", "Space Planning", "Design Development", "Site Execution", "3D Visualisation"]} />
      </section>

      {/* STUDIO / INTRODUCTION */}
      <section id="studio" className="relative border-b border-border px-6 py-28 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-y-16 gap-x-8">
          <div className="col-span-12 flex items-start justify-between md:col-span-3">
            <span className="label text-foreground/50">Ch. 01 — Studio</span>
            <span className="label text-foreground/40 md:hidden">2026</span>
          </div>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="font-display text-[clamp(2rem,4.5vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-balance">
              A space has to work before it can move you. I plan it on paper,
              draw it to the millimetre, then stand on site until the built room
              keeps the drawing's <em className="italic text-bronze">promise</em>.
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
              <p className="label mt-4 text-foreground/50">{site.name} — {site.title}</p>
            </Reveal>

            <Reveal className="col-span-12 space-y-6 text-lg leading-relaxed text-foreground/75 md:col-span-4" delay={160}>
              <p>
                Mithil came to design the long way around — a commerce degree first,
                then the stronger pull of drawing. He retrained in interior design at
                The Maharaja Sayajirao University of Baroda, graduating in 2025.
              </p>
              <p>
                Since then he has worked across residential and commercial projects at
                APM Studio and now WE2 Interior Design Studio — planning spaces,
                developing designs and coordinating them on site, from working
                drawings to handover.
              </p>
              <a href="#contact" data-cursor="Write" className="inline-flex items-center gap-3 label pt-4">
                <span>Start a project</span>
                <span className="inline-block h-px w-10 bg-current" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BACKGROUND — Experience / Education / Software */}
      <BackgroundSection />

      {/* WORK — Featured Projects */}
      <section id="work" className="border-b border-border px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between md:mb-24">
            <span className="label text-foreground/50">Ch. 03 — Selected Works</span>
            <span className="label text-foreground/40">Index / {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="grid grid-cols-12 gap-x-8 gap-y-28 md:gap-y-40">
            {projects.map((p, i) => {
              const layout = workLayout[i % workLayout.length];
              return (
                <Reveal
                  key={p.slug}
                  className={`col-span-12 ${layout.span} ${i % 2 === 1 ? "md:mt-40" : ""}`}
                  delay={i * 60}
                >
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    data-cursor="View"
                    className="group block"
                  >
                    <div className={`relative w-full overflow-hidden ${layout.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                      <img
                        src={p.cover}
                        alt={p.coverAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span className="label text-bronze">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-display text-2xl md:text-4xl leading-tight tracking-[-0.01em]">
                          {p.title}
                        </h3>
                      </div>
                      <div className="hidden text-right label text-foreground/50 md:block">
                        <div>{p.typology}</div>
                        <div className="mt-1">{p.location} · {p.year}</div>
                      </div>
                    </div>
                    <div className="mt-4 hairline" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — Big pull quote */}
      <section className="relative border-b border-border bg-bone px-6 py-32 md:px-10 md:py-56">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-center justify-between label text-foreground/50">
            <span>Ch. 04 — Philosophy</span>
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
              — {site.name}
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="border-b border-border px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex items-end justify-between md:mb-24">
            <div>
              <span className="label text-foreground/50">Ch. 05 — Material Library</span>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
                A vocabulary of <em className="italic text-bronze">four</em>.
              </h2>
            </div>
            <span className="hidden label text-foreground/40 md:block">A working vocabulary</span>
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
            <span className="label opacity-60">Ch. 06 — Method</span>
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
          <span className="label text-foreground/50">Ch. 07 — Details</span>
          <span className="label text-foreground/40 italic font-display text-base">drag to traverse →</span>
        </div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:gap-10 md:px-10" data-cursor="Drag">
          {[
            { img: project4, cap: "Study — Stairwell", pl: "01" },
            { img: project2, cap: "Study — Bedroom", pl: "02" },
            { img: project3, cap: "Study — Stone", pl: "03" },
            { img: project1, cap: "Study — Dining", pl: "04" },
            { img: heroImg, cap: "Study — Light", pl: "05" },
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

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-ink px-6 py-28 text-[color:oklch(0.97_0.008_85)] md:px-10 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between label opacity-60 mb-16">
            <span>Ch. 08 — Correspondence</span>
            <span>MMXXVI</span>
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
                href={`mailto:${site.email}`}
                data-cursor="Write"
                className="group inline-flex items-baseline gap-4 font-display text-2xl md:text-4xl border-b border-white/20 pb-3 hover:border-white/60 transition-colors"
              >
                <span>{site.email}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </a>
              <p className="mt-10 max-w-md text-sm leading-relaxed opacity-70">
                {site.availability} — in Vadodara and beyond. Write a line about
                your space, and I will reply with a time to talk.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-8 label">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Chat"
                  className="inline-flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
                >
                  <span className="inline-block h-px w-8 bg-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${site.phoneRaw}`}
                  data-cursor="Call"
                  className="inline-flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
                >
                  <span className="inline-block h-px w-8 bg-current" />
                  <span>{site.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-8 label opacity-70">
              <div className="mb-3 opacity-50">Location</div>
              <div>Vadodara, Gujarat</div>
              <div>India</div>
              <div className="mt-6 opacity-50">Hours</div>
              <div>By appointment</div>
            </div>

            <div className="col-span-12 md:col-span-2 label opacity-70">
              <div className="mb-3 opacity-50">Languages</div>
              {site.languages.map((l) => (
                <div key={l}>{l}</div>
              ))}
              {site.instagram && (
                <>
                  <div className="mb-3 mt-6 opacity-50">Follow</div>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Follow"
                    className="transition-opacity hover:opacity-100"
                  >
                    Instagram
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 label opacity-50 md:flex-row md:items-center">
            <span>© MMXXVI — {site.name}</span>
            <span>Rooms that remember the light.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
