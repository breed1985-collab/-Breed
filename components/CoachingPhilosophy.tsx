import FadeUp from "./FadeUp";

export default function CoachingPhilosophy() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Coaching Philosophy
          </span>
          <p className="mt-6 font-serif text-2xl italic leading-snug text-white sm:text-3xl md:text-4xl">
            &ldquo;I&apos;m not here to run your life. I&apos;m here to help
            you get honest about the one you&apos;re living, identify
            what&apos;s getting in the way, and build practical strategies
            for where you want to go next.&rdquo;
          </p>
          <p className="mt-8 text-base leading-relaxed text-gray-400 md:text-lg">
            Coach Bernadette doesn&apos;t coach from a place of perfection.
            Her approach combines education, lived experience, professional
            leadership, practical strategy, accountability, and an
            understanding of human behavior. Coaching is collaborative — it
            requires your active participation, not passive listening.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            Coaching is not therapy, mental-health treatment, or a
            replacement for professional mental-health services, and does not
            promise healing, cures, or guaranteed outcomes. It is a
            collaborative, action-oriented partnership focused on clarity,
            accountability, and practical strategy.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
