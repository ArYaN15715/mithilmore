import { Link, createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/motion/Reveal";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";
import { Marquee } from "@/components/motion/Marquee";
import { SiteHeader } from "@/components/site/SiteHeader";
import { BackgroundSection } from "@/components/sections/Background";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

import heroImg from "../assets/hero.jpg";
import portrait from "../assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mithil More — Interior Designer, Vadodara" },
      {
        name: "description",
        content:
          "Portfolio of Mithil A. More — interior designer in Vadodara, India. Space planning, design development and site execution for residential & commercial projects.",
      },
      { property: "og:title", content: "Mithil More — Interior Designer, Vadodara" },
      {
        property: "og:description",
        content:
          "Space planning, design development and site execution for residential & commercial interiors.",
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
          name: "Mithil A. More",
          jobTitle: "Interior Designer",
          email: "mailto:mithilmore97@gmail.com",
          telephone: "+91-87338-30350",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vadodara",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
          alumniOf: "The Maharaja Sayajirao University of Baroda",
          knowsLanguage: ["mr", "gu", "hi", "en"],
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

function Home() {
  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Loader />
      <Cursor />

      {/* Nav */}
      <SiteHeader />

      {/* HERO */}
      <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden border-b border-border">
        <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 pt-24 md:px-10 md:pt-28">
          <p className="label text-foreground/55 rise" style={{ animationDelay: "1.15s" }}>
            {site.title}, Vadodara
          </p>
          <h1 className="mt-4 font-display leading-[0.9] tracking-[-0.02em] text-[clamp(3.8rem,12vw,11rem)]">
            <span className="block rise" style={{ animationDelay: "1.25s" }}>Mithil</span>
            <span className="block rise pl-[0.55em]" style={{ animationDelay: "1.4s" }}>
              <em className="italic text-bronze">More</em>
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 pb-10 rise" style={{ animationDelay: "1.55s" }}>
            <p className="max-w-md text-base font-light leading-relaxed text-foreground/70 md:text-lg">
              Space planning, design development and site execution for residential and commercial interiors.
            </p>
            <a href="#work" data-cursor="View" className="group inline-flex items-center gap-4 label">
              <span className="inline-block h-px w-16 bg-current transition-all duration-500 group-hover:w-24" />
              <span>Selected&nbsp;Work</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[220px] flex-1 overflow-hidden">
          <img
            src={heroImg}
            alt="Sunlit living space with warm stone and oak furniture"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="hero-parallax absolute inset-0 h-[118%] w-full object-cover softin"
          />
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

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-ink px-6 py-28 text-[color:oklch(0.97_0.008_85)] md:px-10 md:py-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between label opacity-60 mb-16">
            <span>Ch. 04 — Correspondence</span>
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
