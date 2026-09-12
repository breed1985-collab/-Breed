import FadeUp from "./FadeUp";
import IncludesList from "./IncludesList";

const PACKAGES = [
  {
    name: "The Reset™",
    duration: "4-Week Private Coaching Package",
    price: "$397",
    paymentPlan: "or 2 payments of $210",
    forWhom:
      "Designed for women who know something needs to change but need support identifying where to begin.",
    includes: [
      "Four weekly 45-minute private coaching sessions",
      "Personal goals and needs assessment",
      "Personalized coaching direction",
      "Weekly action steps",
      "Reflection and journal prompts",
      "Accountability check-ins",
      "Personalized 30-day continuation plan",
    ],
    quote: "I know something needs to change. I'm ready to start.",
    cta: "Start Your Reset",
    signature: false,
  },
  {
    name: "The Reclamation™",
    duration: "8-Week Private Coaching Package",
    price: "$697",
    paymentPlan: "or 2 payments of $365",
    forWhom:
      "Designed for women who have spent so much time caring for, loving, rescuing, accommodating, or showing up for others that they've lost connection with themselves.",
    includes: [
      "Eight weekly 45-minute private coaching sessions",
      "Personalized coaching plan",
      "Self-worth and boundary development",
      "Identification of overgiving and self-abandonment patterns",
      "Emotional Currency™ concepts and exercises",
      "Practical boundary scripts",
      "Weekly reflection and action assignments",
      "Accountability check-ins",
      "Personalized 60-day continuation plan",
    ],
    quote: "I've spent enough time losing myself. I'm ready to reclaim me.",
    cta: "Begin Your Reclamation",
    signature: false,
  },
  {
    name: "Breaking Cycles™",
    duration: "12-Week Signature Private Coaching Experience",
    price: "$997",
    paymentPlan: "or 3 payments of $350",
    forWhom:
      "Designed for women who are ready to identify and interrupt patterns that no longer serve them and intentionally develop healthier behaviors, boundaries, beliefs, relationships, and decision-making practices.",
    includes: [
      "Twelve weekly 45-minute private coaching sessions",
      "Comprehensive personal pattern assessment",
      "Identification of recurring behaviors, triggers, and relationship patterns",
      "Emotional Currency™ framework and exercises",
      "Self-worth and identity development",
      "Boundary setting and implementation",
      "Exploration of overgiving, people-pleasing, and self-abandonment",
      "Emotional responsibility",
      "Intentional decision-making",
      "Personalized exercises and reflection assignments",
      "Accountability throughout the program",
      "Progress reviews",
      "Personalized 90-day maintenance and growth plan",
    ],
    quote: "I'm not just ready to feel better. I'm ready to stop repeating the cycle.",
    cta: "Break The Cycle",
    signature: true,
  },
];

export default function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Clarity. Accountability. Action. Sustainable Change.
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Private <span className="text-gold">Coaching</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Personalized support for women who want to examine their patterns,
            strengthen their boundaries, reconnect with themselves, and
            intentionally change how they show up in their lives.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-lg italic text-gray-300 md:text-xl">
            &ldquo;You don&apos;t need another person telling you what you
            should be doing. Sometimes you need the space, strategy,
            accountability, and tools to understand what&apos;s keeping you
            from doing what you already know you want to do.&rdquo;
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Coaching is offered exclusively through structured packages — not
            individual one-time sessions — because real change takes
            consistency, not a single conversation.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <FadeUp
              key={pkg.name}
              className={`flex flex-col border p-8 ${
                pkg.signature
                  ? "border-gold bg-surface"
                  : "border-white/10 bg-surface"
              }`}
            >
              {pkg.signature && (
                <span className="mb-4 inline-block w-fit bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black">
                  Signature Program
                </span>
              )}
              <h3 className="font-serif text-2xl font-bold text-white">
                {pkg.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">
                {pkg.duration}
              </p>

              <div className="mt-5">
                <span className="font-serif text-3xl font-bold text-gold">
                  {pkg.price}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {pkg.paymentPlan}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-gray-400">
                {pkg.forWhom}
              </p>

              <IncludesList items={pkg.includes} className="mt-6" />

              <p className="mt-6 border-l-2 border-gold/50 pl-4 font-serif text-sm italic text-gray-300">
                &ldquo;{pkg.quote}&rdquo;
              </p>

              <a
                href="#booking"
                className="mt-8 inline-block bg-gold px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100 md:mt-auto"
              >
                {pkg.cta}
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
