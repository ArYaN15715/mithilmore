import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * App-tile marks for each tool, in the vein of Adobe's own two-letter product
 * glyphs. Colors are brand-adjacent so the marks read instantly; the small
 * rounded tile is the one deliberate radius exception on an otherwise sharp
 * page (it is the "app icon" metaphor).
 */
const toolMarks: Record<string, { mark: string; note: string; fg: string; bg: string }> = {
  AutoCAD: { mark: "Ac", note: "Drafting", fg: "#FFFFFF", bg: "#B02A30" },
  SketchUp: { mark: "Su", note: "Modelling", fg: "#FFFFFF", bg: "#D4402F" },
  "V-Ray": { mark: "Vr", note: "Rendering", fg: "#FFFFFF", bg: "#0A7DBE" },
  Lumion: { mark: "Lu", note: "Rendering", fg: "#FFFFFF", bg: "#0E7490" },
  Enscape: { mark: "En", note: "Rendering", fg: "#FFFFFF", bg: "#F26E21" },
  "Adobe Illustrator": { mark: "Ai", note: "Graphics", fg: "#FF9A00", bg: "#330000" },
  CorelDRAW: { mark: "Cd", note: "Graphics", fg: "#FFFFFF", bg: "#009344" },
};

const languages = [
  { native: "मराठी", name: "Marathi" },
  { native: "ગુજરાતી", name: "Gujarati" },
  { native: "हिन्दी", name: "Hindi" },
  { native: "English", name: "English" },
];

export function BackgroundSection() {
  return (
    <section id="background" className="border-b border-border px-6 pt-28 pb-16 md:px-10 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <span className="label text-foreground/50">Ch. 02 — Practice</span>
          <span className="label text-foreground/40">Experience & Education</span>
        </div>

        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="font-display text-[clamp(2rem,4.5vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-balance">
              The work behind <em className="italic text-bronze">the work</em>.
            </h2>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-foreground/70">
              The journey from concept to construction, shaped by years of
              study, studio practice, and on-site execution.
            </p>
          </div>

          {/* Experience rows */}
          <div className="col-span-12 mt-12 md:col-span-7 md:col-start-6 md:mt-0">
            <div className="label mb-2 text-foreground/40">Experience</div>
            <ol>
              {site.experience.map((e, i) => (
                <Reveal key={i} as="li" delay={i * 60}>
                  <div className="group grid grid-cols-12 gap-4 border-t border-border py-8 md:py-10" data-cursor={e.role}>
                    <span className="col-span-12 label text-foreground/50 md:col-span-3">{e.period}</span>
                    <h3 className="col-span-12 font-display text-2xl md:col-span-5 md:text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2">
                      {e.company}
                    </h3>
                    <p className="col-span-12 text-sm leading-relaxed text-foreground/60 md:col-span-4">
                      {e.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            {/* Education */}
            <div className="label mb-2 mt-16 text-foreground/40">Education</div>
            <ol>
              {site.education.map((ed, i) => (
                <Reveal key={i} as="li" delay={i * 60}>
                  <div className="grid grid-cols-12 gap-4 border-t border-border py-8 md:py-10">
                    <span className="col-span-12 label text-foreground/50 md:col-span-3">{ed.period}</span>
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="font-display text-2xl md:text-3xl leading-tight">{ed.degree}</h3>
                      <p className="label mt-2 text-foreground/50">{ed.field}</p>
                    </div>
                    <p className="col-span-12 text-sm leading-relaxed text-foreground/60 md:col-span-4">
                      {ed.school}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Software */}
        <div className="mt-24 md:mt-32">
          <div className="label mb-2 text-foreground/40">Software</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {site.tools.map((t, i) => {
              const m = toolMarks[t];
              return (
                <Reveal key={t} delay={i * 40}>
                  <div className="flex items-center gap-4 border-t border-border py-6 pr-6 md:py-7">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-md text-[13px] font-semibold tracking-tight"
                      style={{ background: m.bg, color: m.fg }}
                    >
                      {m.mark}
                    </span>
                    <span className="flex-1 font-display text-xl md:text-2xl">
                      {t.replace("Adobe ", "")}
                    </span>
                    <span className="label hidden text-foreground/40 sm:block">{m.note}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-16 md:mt-20">
          <div className="label mb-2 text-foreground/40">Languages</div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {languages.map((l, i) => (
              <Reveal key={l.name} delay={i * 40}>
                <div className="border-t border-border py-5 pr-6 md:py-6">
                  <div className="font-display text-3xl leading-tight md:text-4xl">{l.native}</div>
                  <div className="label mt-1 text-foreground/50">{l.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
