import FadeUp from "./FadeUp";

const TOPICS = [
  "Motivational Interviewing",
  "Leadership Development",
  "Team Building",
  "Compassion Fatigue",
  "Personal Development",
  "Behavior Change",
];

export default function Speaking() {
  return (
    <section id="speaking" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <FadeUp>
          <p className="font-serif text-3xl font-medium italic leading-snug text-white sm:text-4xl md:text-5xl">
            &ldquo;Healing and accountability can exist in the same damn
            room.&rdquo;
          </p>
        </FadeUp>

        <FadeUp className="mt-14">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Speaking Topics
          </h3>
          <ul className="mt-6 space-y-4">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="border-b border-white/10 pb-4 text-lg text-gray-300 last:border-b-0 md:text-xl"
              >
                {topic}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp>
          <a
            href="#booking"
            className="mt-12 inline-block border border-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-gold transition-all duration-200 hover:bg-gold hover:text-black"
          >
            Inquire About Speaking
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
