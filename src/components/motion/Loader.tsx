import { useEffect, useState } from "react";

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1100);
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
          <span>Interior Designer</span>
        </div>
        <div className="mt-4 h-px w-full origin-left scale-x-0 bg-foreground/70 animate-[draw_1.4s_var(--ease-studio)_forwards]" />
        <div className="mt-6 flex items-baseline justify-between">
          <span className="font-display text-3xl italic text-foreground/80">Enter</span>
          <span className="label text-foreground/40">MMXXVI</span>
        </div>
      </div>
    </div>
  );
}
