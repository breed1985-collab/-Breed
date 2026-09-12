import FadeUp from "./FadeUp";

export default function GirlSeries() {
  return (
    <section
      id="girl-series"
      className="relative overflow-hidden bg-berry-wash py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        <FadeUp className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4 md:mx-0">
          {/* Book cover — swap src for a local file in /public/images/ */}
          <div
            className="aspect-[2/3] w-full bg-cover bg-center shadow-2xl shadow-black/50"
            style={{
              backgroundImage: "url(/images/girl-series-cover-placeholder.jpg)",
              backgroundColor: "#1a1a1a",
            }}
          />
          {/* Book trailer */}
          <video
            className="aspect-[2/3] w-full bg-[#1a1a1a] object-cover shadow-2xl shadow-black/50"
            src="/videos/girl-lotion-your-elbows.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </FadeUp>

        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-light">
            The Girl Series
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Girl, Lotion Your Elbows
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
            [Short description of The Girl Series — what it&apos;s about, who
            it&apos;s for, and why it matters. One or two sentences.]
          </p>
          <a
            href="https://a.co/d/0bHRHp0k"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
          >
            Shop On Amazon
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
