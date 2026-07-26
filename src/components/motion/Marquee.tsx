export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div className="marquee-track flex w-max whitespace-nowrap font-display text-4xl md:text-6xl italic tracking-tight text-foreground/70">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((w) => (
              <span key={w + i} className="mx-10 inline-flex items-center gap-10">
                <span>{w}</span>
                <span className="text-bronze/60">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
