import FadeUp from "./FadeUp";
import IncludesList from "./IncludesList";

const MODULES = [
  {
    week: "Week 1",
    title: "The Life & Goal Audit",
    description:
      "Examine where you stand across career, finances, health, relationships, education, personal development, spirituality, and lifestyle — and separate the goals you actually want from the ones you think you're supposed to want.",
  },
  {
    week: "Week 2",
    title: "The 24-Hour Audit™",
    description:
      "Track where your time actually goes — sleep, work, commuting, caregiving, social media, entertainment, and more — to find your time leaks and the truth behind “I don't have time.”",
  },
  {
    week: "Week 3",
    title: "SMART Goals That Actually Make Sense",
    description:
      "Turn vague intentions into goals that are Specific, Measurable, Achievable, Relevant, and Time-Bound — using real examples across finances, health, career, and relationships.",
  },
  {
    week: "Week 4",
    title: "Goal Mapping & Reverse Engineering",
    description:
      "Work backward from your desired outcome: Goal → 90-Day Target → Monthly Milestones → Weekly Commitments → Daily Actions.",
  },
  {
    week: "Week 5",
    title: "Systems Over Motivation",
    description:
      "Build the habits, routines, environment, preparation, and accountability that carry you forward when motivation runs out.",
  },
  {
    week: "Week 6",
    title: "The Goal Getter Blueprint™",
    description:
      "Combine everything into your personalized 90-Day Goal Getter Plan — milestones, commitments, an accountability system, and a plan for getting back on track after setbacks.",
  },
];

const INCLUDES = [
  "Six weekly live group coaching sessions",
  "Goal Getters Workbook™",
  "Life & Goal Audit",
  "24-Hour Audit™ worksheet",
  "Time Leak Assessment",
  "SMART Goal Builder",
  "Goal Mapping exercises",
  "90-Day Goal Map",
  "Weekly Accountability Tracker",
  "Group accountability & community support",
  "Personalized Goal Getter Blueprint™",
];

export default function GoalGetters() {
  return (
    <section id="goal-getters" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Goal Getters™
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Stop Setting Goals.{" "}
            <span className="text-gold">Start Building Systems.</span>
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.1em] text-gray-500">
            6-Week Group Coaching &amp; Accountability Program
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            For people who are tired of setting goals, getting excited,
            starting strong, and eventually falling back into the same
            routines. Goal Getters™ helps you examine how you actually use
            your time, set goals that are realistic, build systems around
            them, and leave with an actionable 90-day plan.
          </p>
          <p className="mt-4 max-w-2xl font-serif text-lg italic text-gray-300 md:text-xl">
            &ldquo;Before you tell me you don&apos;t have time for your goals,
            show me your 24 hours.&rdquo;
          </p>

          <div className="mt-6">
            <span className="font-serif text-3xl font-bold text-gold">
              $297
            </span>
            <span className="ml-2 text-sm text-gray-500">
              paid in full, or 2 payments of $160, or 3 payments of $110
            </span>
          </div>
        </FadeUp>

        <FadeUp className="mt-16">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The Six Modules
          </h3>
          <div className="mt-6 space-y-6">
            {MODULES.map((mod) => (
              <div
                key={mod.week}
                className="border-b border-white/10 pb-6 last:border-b-0"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                    {mod.week}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white">
                    {mod.title}
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:ml-[4.5rem]">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="mt-16 border border-white/10 bg-background p-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Goal Getters™ Includes
          </h3>
          <IncludesList items={INCLUDES} className="mt-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0" />
        </FadeUp>

        <FadeUp className="mt-14">
          <p className="max-w-2xl font-serif text-lg italic text-gray-300 md:text-xl">
            &ldquo;You don&apos;t need another planner full of goals you never
            revisit. You need clarity, a realistic plan, systems that support
            the life you actually live, and accountability when motivation
            disappears.&rdquo;
          </p>
          <a
            href="#booking"
            className="mt-8 inline-block bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
          >
            Become A Goal Getter
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
