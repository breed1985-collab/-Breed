import FadeUp from "./FadeUp";

const OFFERS = [
  {
    title: "1-on-1 Coaching",
    description:
      "[One-line description of the personal coaching offer and who it's for.]",
  },
  {
    title: "Group Facilitation & Training",
    description:
      "[One-line description of the group facilitation and training offer.]",
  },
  {
    title: "Corporate Motivational Interviewing Workshops",
    description:
      "[One-line description of the corporate workshop offer and outcomes.]",
  },
];

function IconPlaceholder() {
  return (
    <div className="flex h-12 w-12 items-center justify-center border border-gold/50 text-gold">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    </div>
  );
}

export default function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <FadeUp>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Work With <span className="text-gold">Me</span>
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <FadeUp
              key={offer.title}
              className="flex flex-col border border-white/10 p-8 transition-colors hover:border-gold/50"
            >
              <IconPlaceholder />
              <h3 className="mt-6 font-serif text-xl font-bold text-white">
                {offer.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                {offer.description}
              </p>
              <a
                href="#booking"
                className="mt-6 inline-block w-fit text-sm font-semibold uppercase tracking-wide text-gold transition-colors hover:text-gold-light"
              >
                Learn more →
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
