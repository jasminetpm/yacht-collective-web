"use client";

import { useEffect, useRef } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/yachtcollective.sg/";
const BEHOLD_FEED_ID = "Ce37EuhOQmaXU3rtwTN8";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function InstagramCarousel() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Mount the <behold-widget> custom element imperatively (avoids TS/JSX issues) */
    const container = widgetContainerRef.current;
    if (!container || container.querySelector("behold-widget")) return;

    const widget = document.createElement("behold-widget");
    widget.setAttribute("feed-id", BEHOLD_FEED_ID);
    container.appendChild(widget);

    /* Load the Behold script once per page */
    const win = window as Window & { __bhldScript?: boolean };
    if (win.__bhldScript) return;
    win.__bhldScript = true;
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
  }, []);

  return (
    <section className="bg-ocean-950 pt-20 pb-10 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-content-xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-sans tracking-[0.2em] uppercase text-champagne-400">
              Our Gallery
            </p>
            <h2 className="font-serif text-4xl font-normal text-white">
              Life Aboard
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 transition-all duration-300 hover:border-champagne-500/60 hover:bg-champagne-500/10"
            >
              <span className="text-champagne-400 transition-colors duration-300 group-hover:text-champagne-300">
                <InstagramIcon size={22} />
              </span>
              <span className="text-sm font-medium text-white/70 transition-colors duration-300 group-hover:text-white">
                @yachtcollective.sg
              </span>
              <span className="text-white/30 transition-colors duration-300 group-hover:text-champagne-400">
                ↗
              </span>
            </a>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.12em] uppercase text-champagne-400 hover:text-champagne-300 transition-colors duration-300"
          >
            Follow us
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Behold widget — mounted imperatively in useEffect */}
        <div ref={widgetContainerRef} />
      </div>
    </section>
  );
}
