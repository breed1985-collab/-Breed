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
            [Bio paragraph goes here. Introduce who Coach B is, the
            background in human services, and the approach to coaching that
            sets her apart — direct, compassionate, no-nonsense.]
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
            [Second bio paragraph — credentials, mission, and who she serves
            best.]
          </p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic text-gold sm:text-2xl">
            [Pull-quote goes here — a sharp, memorable line in her own
            voice.]
          </blockquote>
        </FadeUp>
      </div>
    </section>
  );
}
