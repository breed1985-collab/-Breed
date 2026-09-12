import FadeUp from "./FadeUp";

export default function About() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <FadeUp className="relative aspect-[4/5] w-full overflow-hidden bg-surface md:order-1">
          {/* Placeholder photo — swap src for a local file in /public/images/ */}
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url(/images/about-placeholder.jpg)" }}
          />
        </FadeUp>

        <FadeUp className="flex flex-col justify-center md:order-2">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            About <span className="text-gold">Coach B</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-400 md:text-lg">
            Bernadette L. Reed is an award-winning author, Certified Health
            &amp; Life Coach, nonprofit leader, speaker, and transformational
            facilitator whose work centers on helping people move from
            survival to self-awareness, accountability, and intentional
            growth. With more than 15 years in human services, she&apos;s
            built her career serving some of New York City&apos;s most
            vulnerable populations — currently as a Program Director with
            Urban Pathways, leading programs that address homelessness,
            mental health, housing instability, and complex social needs.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
            Her journey from frontline case management to program leadership
            — grounded in a background in psychology — reinforced her belief
            that meaningful transformation happens when people are given the
            right combination of support, accountability, opportunity, and
            practical tools. Her voice, honed across coaching, speaking, and
            authorship, is compassionate, candid, humorous, and
            unapologetically real.
          </p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic text-gold sm:text-2xl">
            &ldquo;She&apos;s interested in helping people build lives they no
            longer need to escape from.&rdquo;
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
