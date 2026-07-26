import { useEffect, useRef, useState } from "react";

export function Cursor() {
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
