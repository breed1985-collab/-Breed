import FadeUp from "./FadeUp";

const BOOKS = [
  {
    title: "Girl, Lotion Your Elbows",
    description:
      "[Short description of Girl, Lotion Your Elbows — what it's about, who it's for, and why it matters. One or two sentences.]",
    coverSrc: "/images/girl-lotion-your-elbows-cover.png",
    videoSrc: "/videos/girl-lotion-your-elbows.mp4",
    amazonUrl: "https://a.co/d/0bHRHp0k",
  },
  {
    title: "Girl, F*ck It",
    description:
      "A journal for the woman who is tired of overthinking, overgiving, people-pleasing, waiting for permission, and pretending she's okay with what she's clearly outgrown. Less overthinking, more faith. Less pleasing, more peace. Less waiting, more living.",
    coverSrc: "/images/girl-fck-it-cover.png",
    videoSrc: null,
    amazonUrl: "https://a.co/d/0g6d5k20",
  },
];

export default function GirlSeries() {
  return (
    <section
      id="girl-series"
      className="relative overflow-hidden bg-berry-wash py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <FadeUp>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-berry-light">
            The Girl Series
          </span>
        </FadeUp>

        <div className="mt-12 space-y-24">
          {BOOKS.map((book) => (
            <div
              key={book.title}
              className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
            >
              <FadeUp
                className={`mx-auto grid w-full max-w-sm gap-4 md:mx-0 ${
                  book.videoSrc ? "grid-cols-2" : "grid-cols-1 max-w-xs"
                }`}
              >
                {/* Book cover — swap src for a local file in /public/images/ */}
                <div
                  className="aspect-[2/3] w-full bg-cover bg-center shadow-2xl shadow-black/50"
                  style={{
                    backgroundImage: `url(${book.coverSrc})`,
                    backgroundColor: "#1a1a1a",
                  }}
                />
                {book.videoSrc && (
                  <video
                    className="aspect-[2/3] w-full bg-[#1a1a1a] object-cover shadow-2xl shadow-black/50"
                    src={book.videoSrc}
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
              </FadeUp>

              <FadeUp>
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  {book.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
                  {book.description}
                </p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
                >
                  Shop On Amazon
                </a>
              </FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
