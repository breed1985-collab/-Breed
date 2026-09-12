import FadeUp from "./FadeUp";

const PROGRAMS = [
  {
    name: "Goal Getters™",
    bestFor:
      "People who know WHAT they want but need structure, planning, time management, systems, and accountability to accomplish it.",
  },
  {
    name: "The Reset™",
    bestFor:
      "Women who know something needs to change and need help identifying where to begin.",
  },
  {
    name: "The Reclamation™",
    bestFor:
      "Women who want to reconnect with themselves after patterns of overgiving, people-pleasing, or prioritizing everyone else.",
  },
  {
    name: "Breaking Cycles™",
    bestFor:
      "Women ready for longer-term support identifying and changing recurring personal and relationship patterns.",
  },
];

export default function ProgramFinder() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <FadeUp>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Not Sure Which <span className="text-gold">Program</span> Is
            Right For You?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            We can talk about the goal all day. Eventually, we have to build a
            life that supports it. Here&apos;s a simple way to think about it.
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROGRAMS.map((program) => (
            <FadeUp
              key={program.name}
              className="border border-white/10 bg-background p-6"
            >
              <h3 className="font-serif text-xl font-bold text-gold">
                {program.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Best for {program.bestFor}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-12 text-center">
          <p className="text-base text-gray-400">
            Still not sure? Complete a brief coaching inquiry and we&apos;ll
            help you find the right fit.
          </p>
          <a
            href="#booking"
            className="mt-6 inline-block bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
          >
            Find Your Program
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
