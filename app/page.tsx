"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const cards = [
    {
      tag: "EXPERIENCE",
      tagColor: "bg-[#3b0f2b] text-[#e56aaa]",
      title: "Assistant to Dr. Micah Goodman",
      body: "2021",
    },
    {
      tag: "EXPERIENCE",
      tagColor: "bg-[#3b0f2b] text-[#e56aaa]",
      title: "Team Lead, Foreign Relations Section (8200)",
      body: "2019–2020 — Responsible for leading various projects.",
    },
    {
      tag: "EXPERIENCE",
      tagColor: "bg-[#3b0f2b] text-[#e56aaa]",
      title: "Intelligence Analyst, Operations Room (8200)",
      body: "2017–2019 — 24/7 foreign section operations room.",
    },
    {
      tag: "EDUCATION",
      tagColor: "bg-[#122040] text-[#7fb2ff]",
      title: "Yeshivat Maale Gilboa",
      body: "2016–2017 — Jewish and philosophy studies.",
    },
    {
      tag: "EDUCATION",
      tagColor: "bg-[#122040] text-[#7fb2ff]",
      title: "Amit Kfar Ganim High School",
      body: "2012–2016",
    },
    {
      tag: "VOLUNTEERING",
      tagColor: "bg-[#0f2e1f] text-[#67f2a3]",
      title: "Guide, Bnei Akiva",
      body: "2015–2016",
    },
    {
      tag: "VOLUNTEERING",
      tagColor: "bg-[#0f2e1f] text-[#67f2a3]",
      title: "Volunteer, Ezer Mitzion",
      body: "2016",
    },
    {
      tag: "SKILLS",
      tagColor: "bg-[#0f2e1f] text-[#67f2a3]",
      title: "Skills",
      body: "Add your skills list here.",
    },
  ];

  const fullText =
    "Hi, I’m Gidon Greenblatt,\nI’m an analyst and team lead\nwith experience in intelligence & operations";

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
          <div className="pt-4 text-sm text-zinc-300">
            gidon.greenblatt@gmail.com · 054-7344557
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group flex min-h-[210px] flex-col justify-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:border-white/20"
            >
              <span
                className={`w-fit rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${card.tagColor}`}
              >
                {card.tag}
              </span>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{card.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}