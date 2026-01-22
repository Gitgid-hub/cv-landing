"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const cards = [
    {
      tag: "EDUCATION",
      tagColor: "bg-[#3b0f2b] text-[#e56aaa]",
      title: "B.Sc. in Biology, Minor in Cognitive Science — Hebrew University",
      body: "GPA 93.5\nExchange semester - University of Navarra, Spain\n2023–Present",
    },
    {
      tag: "EXPERIENCE",
      tagColor: "bg-[#122040] text-[#7fb2ff]",
      sections: [
        {
          title: "Data Analyst, Santa Inc",
          lines: [
            "Post-launch product support",
            "Product performance analysis",
            "Collaborated with US-based teammates",
            "2021–2022",
          ],
        },
        {
          title: "Cook, Chakra Restaurant",
          lines: ["High-pressure service", "Fine dining", "2023–2025"],
        },
        {
          title: "Assistant to Dr. Micah Goodman",
          lines: ["Logistics and research support", "2021"],
        },
      ],
    },
    {
      tag: "SERVICE",
      tagColor: "bg-[#3b2f0f] text-[#ffd166]",
      title: "IDF, 8200",
      sections: [
        {
          title: "Team Lead",
          lines: [
            "Led a six-person intelligence team",
            "Streamlined processes in a high-intensity environment under tight deadlines",
            "2019–2020",
          ],
        },
        {
          title: "Intelligence Analyst",
          lines: [
            "Worked in a multidisciplinary team and a 24/7 operations center",
            "Processed and relayed critical real-time intelligence for national security",
            "2017–2019",
          ],
        },
        {
          title: "Commander’s Award for Excellence — Independence Day",
          lines: ["2019"],
        },
      ],
    },
    {
      tag: "SKILLS",
      tagColor: "bg-[#0f2e1f] text-[#67f2a3]",
      sections: [
        { title: "Python & R", lines: [] },
        { title: "English (Fluent)", lines: [] },
        { title: "Spanish (B2)", lines: [] },
      ],
    },
  ];

  const fullText =
    "Hi, I’m Gidon Greenblatt,\nCurrently completing my B.Sc at the Hebrew University of Jerusalem";

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
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-8 pb-16 pt-14">
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
            gidon.greenblatt@gmail.com · 054-7344557
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