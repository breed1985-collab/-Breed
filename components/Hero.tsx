export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden bg-background"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hero-placeholder.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl">
          [Real talk.] <span className="text-gold">[Real change.]</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-400 md:text-xl">
          [Subhead goes here — one or two lines on who you help and the
          transformation you offer.]
        </p>
        <a
          href="#booking"
          className="mt-10 inline-block bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
        >
          Book a Discovery Call
        </a>
      </div>
    </section>
  );
}
