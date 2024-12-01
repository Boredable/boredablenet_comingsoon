import Head from "next/head";
import FloatingIcosahedron from "../components/FloatingIcosahedron";

export default function Home() {
  return (
    <>
      <Head>
        <title>Boredable</title>
        <meta
          name="description"
          content="A new, boring social network for adults. Coming Soon."
        />
        <meta property="og:title" content="Boredable" />
        <meta
          property="og:description"
          content="A new, boring social network for adults. Coming Soon."
        />
        <meta property="og:image" content="/images/og_preview.jpg" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <div className="relative overflow-hidden h-screen">
        <div className="site-main-wrapper">
          <main className="site-main">
            <h1 className="text-3xl lg:text-4xl font-black mb-1 text-center text-wide mt-24">
              boredable.net
            </h1>
            <p className="text-sm mb-8 text-center text-wide">Coming Soon.</p>
            <a
              className="btn"
              href="https://underlost.net/boredable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </main>
          <footer className="site-footer">
            <a
              className="hover:underline hover:underline-offset-4 font-black"
              href="https://boredable.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Copyright © Boredable.org 2024
            </a>
          </footer>
        </div>
        <FloatingIcosahedron />
      </div>
    </>
  );
}
