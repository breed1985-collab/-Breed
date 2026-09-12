import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

// Centralized font declarations — swap fonts here only, no hunting through components.
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coach B | Life Coach & Motivational Speaker",
  description:
    "[Meta description goes here] — Coach B helps clients create real, lasting change through 1-on-1 coaching, group facilitation, and corporate speaking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="font-sans bg-background text-white antialiased">
        {children}
      </body>
    </html>
  );
}
