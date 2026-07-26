import { Link } from "@tanstack/react-router";

const links = [
  ["Studio", "/#studio"],
  ["Practice", "/#background"],
  ["Work", "/#work"],
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-10 md:py-8 text-[color:oklch(0.96_0.01_85)]">
        <Link to="/" className="label" data-cursor="Home">Mithil More</Link>
        <nav className="hidden gap-10 md:flex label">
          {links.map(([t, href]) => (
            <a key={href} href={href} className="hover:opacity-60 transition-opacity">{t}</a>
          ))}
        </nav>
        <a href="/#contact" className="label" data-cursor="Write">Contact →</a>
      </div>
    </header>
  );
}
