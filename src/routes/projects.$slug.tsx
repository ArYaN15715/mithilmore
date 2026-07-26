import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";

import { getProject, nextProject, type ProjectPhoto } from "@/data/projects";
import { site } from "@/data/site";
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
      { title: `${loaderData?.project.title} — ${site.name}` },
      { name: "description", content: loaderData?.project.intro ?? "" },
      { property: "og:title", content: `${loaderData?.project.title} — ${site.name}` },
      { property: "og:description", content: loaderData?.project.intro ?? "" },
      { property: "og:type", content: "article" },
    ],
  }),
  component: ProjectPage,
});

function Photo({ photo, index }: { photo: ProjectPhoto; index: number }) {
  if (photo.layout === "drawing") {
    return (
      <Reveal className="col-span-12 md:col-span-6" delay={(index % 2) * 80}>
        <div className="flex aspect-[4/3] items-center justify-center border border-border bg-bone p-6 md:p-10">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
        </div>
        <p className="label mt-3 text-foreground/45">{photo.alt}</p>
      </Reveal>
    );
  }
  if (photo.layout === "half") {
    return (
      <Reveal className="col-span-12 md:col-span-6" delay={(index % 2) * 80}>
        <div className="aspect-[4/5] overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </Reveal>
    );
  }
  if (photo.layout === "detail") {
    return (
      <Reveal className="col-span-12 md:col-span-5 md:col-start-7">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal className="col-span-12">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </Reveal>
  );
}

function ProjectPage() {
  const { project, next } = Route.useLoaderData();

  // New project page always starts at the top. The reset must go through
  // Lenis when it is active: a plain window.scrollTo gets overridden on the
  // next frame by Lenis's own remembered scroll position.
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [project.slug]);

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <Cursor />
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-[68svh] w-full overflow-hidden md:h-[84svh]">
        <img
          src={project.cover}
          alt={project.coverAlt}
          className="h-full w-full object-cover softin"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-background" />
      </section>

      {/* TITLE + META */}
      <section className="border-b border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-8 gap-y-12">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="label text-foreground/50">{project.typology} — {project.location}</span>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-balance">
              {project.title}
            </h1>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={120}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6">
              <div>
                <dt className="label text-foreground/50">Year</dt>
                <dd className="mt-1 text-sm">{project.year}</dd>
              </div>
              <div>
                <dt className="label text-foreground/50">Location</dt>
                <dd className="mt-1 text-sm">{project.location}</dd>
              </div>
              <div className="col-span-2">
                <dt className="label text-foreground/50">Role</dt>
                <dd className="mt-1 text-sm">{project.role}</dd>
              </div>
              <div className="col-span-2">
                <dt className="label text-foreground/50">Tools</dt>
                <dd className="mt-1 text-sm">{project.tools.join(" · ")}</dd>
              </div>
            </dl>
            <p className="mt-8 text-base leading-relaxed text-foreground/70">{project.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* PHOTO FLOW */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-8 gap-y-12 md:gap-y-20">
          {project.photos.map((ph, i) => (
            <Photo key={i} photo={ph} index={i} />
          ))}
        </div>

        {project.story.length > 0 && (
          <div className="mx-auto mt-20 max-w-2xl space-y-6">
            {project.story.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/70">{para}</p>
            ))}
          </div>
        )}
      </section>

      {/* NEXT PROJECT */}
      <section className="border-t border-border bg-ink px-6 py-20 text-[color:oklch(0.97_0.008_85)] md:px-10 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            data-cursor="Next"
            className="group block"
          >
            <span className="label opacity-50">Next — {next.typology}</span>
            <span className="mt-4 flex items-baseline justify-between gap-6">
              <span className="font-display text-[clamp(2.2rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] transition-opacity duration-500 group-hover:opacity-70">
                {next.title}
              </span>
              <span className="font-display text-[clamp(1.8rem,4vw,3.5rem)] transition-transform duration-500 group-hover:translate-x-3">→</span>
            </span>
            <div className="mt-8 h-px w-full bg-white/10" />
          </Link>
          <div className="mt-8 flex items-center justify-between label opacity-60">
            <Link to="/" className="transition-opacity hover:opacity-100" data-cursor="Home">← All work</Link>
            <span>{site.name}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
