"use client";

import { useState } from "react";
import FadeUp from "./FadeUp";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="booking" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <FadeUp>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Ready for <span className="text-gold">Real Change?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            [Short copy inviting the visitor to book a free discovery call —
            what to expect, and why now is the time.]
          </p>
          <a
            href="https://calendly.com/[your-link-here]"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-gold px-10 py-5 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-100"
          >
            Book a Discovery Call
          </a>
        </FadeUp>

        <FadeUp className="mt-20 text-left">
          <h3 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Or Send a Message
          </h3>

          {submitted ? (
            <p className="mt-8 text-center text-gold">
              [Thank-you message goes here — confirmation copy for form
              submission.]
            </p>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full border border-white/15 bg-surface px-5 py-4 text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full border border-white/15 bg-surface px-5 py-4 text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Message"
                  className="w-full border border-white/15 bg-surface px-5 py-4 text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:brightness-110 sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
