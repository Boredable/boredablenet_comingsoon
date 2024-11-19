import localFont from "next/font/local";
import ParticlesBackground from "../components/ParticlesBackground";

// Import custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Particle Background */}
      <ParticlesBackground />

      {/* Main Content */}
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10`}
      >
        <main className="flex flex-col gap-x-8 row-start-2 items-center text-center">
          {/* Title */}
          <h1 className="text-4xl font-black mb-1 text-center">Boredable.net</h1>

          {/* Subtitle */}
          <p className="text-sm mb-8 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            Coming Soon.
          </p>

          {/* CTA Button */}
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://underlost.net/boredable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://boredable.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright © Boredable.com
          </a>
        </footer>
      </div>
    </div>
  );
}
