import FadeUp from "./FadeUp";

const TESTIMONIALS = [
  {
    quote:
      "[Testimonial quote goes here — the transformation this client experienced, in their own words.]",
    name: "[Client Name]",
    title: "[Client Title / Program]",
  },
  {
    quote:
      "[Testimonial quote goes here — the transformation this client experienced, in their own words.]",
    name: "[Client Name]",
    title: "[Client Title / Program]",
  },
  {
    quote:
      "[Testimonial quote goes here — the transformation this client experienced, in their own words.]",
    name: "[Client Name]",
    title: "[Client Title / Program]",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <FadeUp>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            What People <span className="text-gold">Say</span>
          </h2>
        </FadeUp>

        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp
              key={i}
              className="min-w-[85%] shrink-0 snap-start bg-surface p-8 sm:min-w-[60%] md:min-w-0"
            >
              <span className="font-serif text-5xl leading-none text-gold">
                &ldquo;
              </span>
              <p className="mt-2 text-base leading-relaxed text-gray-300">
                {t.quote}
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gray-400">{t.title}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
