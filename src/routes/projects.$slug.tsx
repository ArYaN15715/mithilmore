import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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

function Photo({
  photo,
  index,
  onOpen,
}: {
  photo: ProjectPhoto;
  index: number;
  onOpen: (p: ProjectPhoto) => void;
}) {
  if (photo.layout === "drawing") {
    return (
      <Reveal className="col-span-12 md:col-span-6" delay={(index % 2) * 80}>
        <button
          type="button"
          onClick={() => onOpen(photo)}
          data-cursor="Zoom"
          aria-label={`Zoom: ${photo.alt}`}
          className="block w-full cursor-zoom-in"
        >
          <div className="flex aspect-[4/3] items-center justify-center border border-border bg-bone p-6 transition-colors duration-500 hover:bg-background md:p-10">
            <img src={photo.src} alt={photo.alt} loading="lazy" className="max-h-full max-w-full object-contain" />
          </div>
        </button>
        <p className="label mt-3 text-foreground/45">{photo.alt}</p>
      </Reveal>
    );
  }
  // Renders keep their native aspect ratio: no crop slots. Half/detail only
  // control how much of the grid width the image takes.
  const span =
    photo.layout === "half"
      ? "col-span-12 md:col-span-6"
      : photo.layout === "detail"
        ? "col-span-12 md:col-span-8 md:col-start-4"
        : "col-span-12";
  return (
    <Reveal className={span} delay={photo.layout === "half" ? (index % 2) * 80 : 0}>
      <button
        type="button"
        onClick={() => onOpen(photo)}
        data-cursor="Zoom"
        aria-label={`Zoom: ${photo.alt}`}
        className="block w-full cursor-zoom-in overflow-hidden"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </button>
    </Reveal>
  );
}

function Lightbox({ photo, onClose }: { photo: ProjectPhoto; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const panRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Start a zoomed view centered instead of at the top-left corner
  useEffect(() => {
    const el = panRef.current;
    if (zoomed && el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
    }
  }, [zoomed]);

  return (
    <div
      className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="label absolute right-6 top-6 z-10 text-[color:oklch(0.97_0.008_85)] opacity-80 transition-opacity hover:opacity-100 md:right-10 md:top-8"
      >
        Close ✕
      </button>
      <div
        ref={panRef}
        onClick={onClose}
        className={
          zoomed
            ? "h-full w-full overflow-auto"
            : "flex h-full w-full items-center justify-center p-6 md:p-12"
        }
      >
        <img
          src={photo.src}
          alt={photo.alt}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(!zoomed);
          }}
          className={
            zoomed
              ? "block max-w-none cursor-zoom-out"
              : "max-h-[85vh] max-w-[92vw] cursor-zoom-in object-contain"
          }
        />
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-baseline justify-between gap-6 md:inset-x-10">
        <span className="label text-[color:oklch(0.97_0.008_85)]/70">{photo.alt}</span>
        <span className="label hidden shrink-0 text-[color:oklch(0.97_0.008_85)]/50 md:inline">
          {zoomed ? "Click image to fit · scroll to pan" : "Click image to zoom"}
        </span>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project, next } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<ProjectPhoto | null>(null);

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
            <Photo key={i} photo={ph} index={i} onOpen={setLightbox} />
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

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
