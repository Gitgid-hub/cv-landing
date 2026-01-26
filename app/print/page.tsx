import { cards, contactLine, headline } from "../data/cv";

export default function PrintPage() {
  const headlineLine = headline.replace(/\n/g, " ");

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <main className="mx-auto w-full max-w-3xl px-10 py-10">
        <header className="mb-8 space-y-3 border-b border-zinc-200 pb-6">
          <h1 className="text-3xl font-semibold">Gidon Greenblatt</h1>
          <p className="text-sm text-zinc-600">{contactLine}</p>
          <p className="text-base text-zinc-700">{headlineLine}</p>
        </header>

        <section className="space-y-6">
          {cards.map((card) => (
            <article key={`print-${card.tag}`} className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {card.tag}
              </div>
              {card.title && (
                <h2 className="text-lg font-semibold text-zinc-900">
                  {card.title}
                </h2>
              )}
              {"sections" in card && card.sections ? (
                <div className="space-y-4">
                  {card.sections.map((section) => (
                    <div key={section.title} className="space-y-1">
                      <h3 className="text-base font-semibold text-zinc-900">
                        {section.title}
                      </h3>
                      {section.lines.length > 0 && (
                        <ul className="space-y-1 text-sm text-zinc-700">
                          {section.lines.map((line) => (
                            <li key={`${section.title}-${line}`}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                card.body && (
                  <p className="whitespace-pre-line text-sm text-zinc-700">
                    {card.body}
                  </p>
                )
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
