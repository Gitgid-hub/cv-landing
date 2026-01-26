"use client";

import { useEffect, useState } from "react";

import { cards, contactLine, headline } from "./data/cv";

export default function Home() {
  const [photoExpanded, setPhotoExpanded] = useState(false);
  const fullText = headline;

  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    // Blink while typing
    if (!typingDone) {
      const id = setInterval(() => {
        setCursorVisible((v) => !v);
      }, 500);

      return () => clearInterval(id);
    }

    // After typing: blink 3 times then hide
    let toggles = 0;
    const id = setInterval(() => {
      toggles += 1;
      setCursorVisible((v) => !v);
      if (toggles >= 6) {
        clearInterval(id);
        setCursorVisible(false);
      }
    }, 500);

    return () => clearInterval(id);
  }, [typingDone]);

  const lines = typedText.split("\n");

  return (
    <div className="grid-bg min-h-screen text-zinc-100">
      <div
        className={`portrait-shell ${photoExpanded ? "portrait-expanded" : ""}`}
        aria-label="Profile photo"
        onMouseEnter={() => setPhotoExpanded(true)}
        onMouseLeave={() => setPhotoExpanded(false)}
      >
        <div
          className={`portrait-wrap ${
            typingDone ? "card-fade-in" : "opacity-0 translate-y-2"
          }`}
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <img
            src="/profile.png"
            alt="Gidon Greenblatt"
            className="portrait-img"
          />
          <span className="portrait-fade" aria-hidden="true" />
        </div>
      </div>
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 pb-16 pt-14">
        <header className="max-w-xl space-y-2">
          <p className="text-3xl font-semibold leading-tight text-white">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
            {cursorVisible && <span className="ml-1">|</span>}
          </p>
          <div
            className={`pt-4 text-sm text-zinc-300 ${
              typingDone ? "card-fade-in" : "opacity-0 translate-y-2"
            }`}
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            {contactLine}
          </div>
        </header>

        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <article
              key={`${card.tag}-${index}`}
              className={`group flex flex-col justify-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-white/20 ${
                typingDone ? "card-fade-in" : "opacity-0 translate-y-2"
              } ${card.tag === "EDUCATION" || card.tag === "SKILLS" ? "" : "min-h-[210px]"}`}
              style={{ "--delay": `${index * 120}ms` } as React.CSSProperties}
            >
              <span
                className={`w-fit rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${card.tagColor}`}
              >
                {card.tag}
              </span>
              {"sections" in card && card.sections ? (
                <div className="space-y-4">
                  {card.title && (
                    <h3 className="text-lg font-semibold text-white">
                      {card.title}
                    </h3>
                  )}
                  {card.sections.map((section) => (
                    <div key={section.title} className="space-y-1">
                      <h3
                        className={`font-semibold text-white ${
                          card.tag === "SKILLS" ? "text-base" : "text-lg"
                        }`}
                      >
                        {section.title}
                      </h3>
                      {section.lines.length > 0 &&
                        section.lines.map((line) => (
                          <p
                            key={`${section.title}-${line}`}
                            className="text-sm leading-6 text-zinc-400"
                          >
                            {line}
                          </p>
                        ))}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-6 text-zinc-400">
                    {card.body}
                  </p>
                </>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}