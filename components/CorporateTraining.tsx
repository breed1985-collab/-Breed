import FadeUp from "./FadeUp";

const TRAININGS = [
  {
    title: "Case Management",
    description:
      "Foundational and advanced case management training for human services and nonprofit teams, built on 15+ years of frontline and leadership experience.",
  },
  {
    title: "Motivational Interviewing",
    description:
      "Core motivational interviewing skills for teams working with complex populations — practical technique for real conversations, not just theory.",
  },
  {
    title: "MI After 5",
    description:
      "Motivational interviewing training built specifically for operational and frontline staff, delivered in a format that works with real shift schedules.",
  },
  {
    title: "Team Building",
    description:
      "Hands-on sessions that build trust, communication, and collaboration across a team — not just an afternoon of icebreakers.",
  },
  {
    title: "Atomic Habits",
    description:
      "A workshop on building the habits and systems that actually stick — for teams and individuals ready to move from intention to consistency.",
  },
  {
    title: "The Next Seat at the Table",
    description:
      "Leadership readiness training that prepares high-performing team members for their next role — before the title, not after.",
  },
];

export default function CorporateTraining() {
  return (
    <section id="corporate-training" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            For Organizations &amp; Teams
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Corporate &amp; <span className="text-gold">Group Training</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Bring Coach Bernadette in to train your team directly. Practical,
            no-fluff sessions built from 15+ years in human services
            leadership — real skills your staff can use the next day, not
            just a feel-good afternoon.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAININGS.map((training) => (
            <FadeUp
              key={training.title}
              className="border border-white/10 bg-background p-6 transition-colors hover:border-gold/50"
            >
              <h3 className="font-serif text-xl font-bold text-white">
                {training.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {training.description}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-14">
          <a
            href="#booking"
            className="inline-block border border-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-gold transition-all duration-200 hover:bg-gold hover:text-black"
          >
            Inquire About Training
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
