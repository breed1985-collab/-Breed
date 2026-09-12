const ITEMS = [
  "18+ Years in Human Services",
  "Certified Life & Health Coach",
  "Award-Winning Leader",
  "Author, The Girl Series",
];

export default function CredibilityStrip() {
  return (
    <section className="border-y border-white/10 bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-6 md:px-10">
        {ITEMS.map((item, i) => (
          <div key={item} className="flex items-center gap-x-6">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              {item}
            </span>
            {i < ITEMS.length - 1 && (
              <span className="hidden h-3 w-px bg-gold/60 sm:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
