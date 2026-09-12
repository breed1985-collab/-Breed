const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <span className="font-serif text-lg font-bold tracking-tight text-white">
            COACH B
          </span>

          <ul className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-gray-400 transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="text-xs font-semibold">
                    {social.label.charAt(0)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500 md:text-left">
          © {new Date().getFullYear()} Coach B. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
