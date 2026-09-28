export default function Marquee({ items = [], fast = false, outline = false }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-4 md:py-5 select-none" aria-hidden>
      <div className={`marquee-track ${fast ? 'fast' : ''} gap-8 pr-8`}>
        {[0, 1].map((half) => (
          <div key={half} className="flex gap-8 items-center shrink-0">
            {row.map((t, i) => (
              <span key={`${half}-${i}`} className={`font-display text-2xl md:text-4xl uppercase whitespace-nowrap ${outline ? 'outline-text' : ''}`}>
                {t} <span className="accent-text">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
