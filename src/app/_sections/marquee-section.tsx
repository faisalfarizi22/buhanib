const MARQUEE_ITEMS = [
  "People Development",
  "Change Management",
  "Leadership Coaching",
  "AI Culture",
  "Team Synergy",
  "Digital Maturity",
  "Agile Mindset",
];

export function MarqueeSection() {
  return (
    <section className="py-0 border-t border-black/[0.06] overflow-hidden select-none">
      <div
        className="flex border-b border-black/[0.06]"
        style={{ animation: "marqueeLeft 30s linear infinite" }}
      >
        {[...Array(3)].map((_, rep) => (
          <div key={rep} className="flex shrink-0">
            {MARQUEE_ITEMS.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/20 shrink-0" />
                <span className="text-sm text-black/45 whitespace-nowrap tracking-wide">{cap}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
