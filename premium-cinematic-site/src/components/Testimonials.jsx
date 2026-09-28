import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTES = [
  { q: 'Fast. Fearless. The site paid for itself in a week.', who: 'Maya R. — DTC Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { q: 'They cut our story to half the words. Twice the sales.', who: 'Jon K. — SaaS CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { q: 'Motion that feels like film. Our launch broke records.', who: 'Aria S. — Music Label', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
]

export default function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.t-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, rotate: i % 2 ? 2 : -2, opacity: 0 },
          {
            y: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="voices" ref={ref} className="bg-coal border-y border-white/10 px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-accent mb-3">04 — Voices</p>
        <h2 className="headline text-5xl md:text-7xl">Loved by <span className="outline-text">bold teams</span></h2>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {QUOTES.map((t) => (
            <figure key={t.who} className="t-card bg-ink border border-white/10 rounded-3xl p-7 flex flex-col justify-between min-h-[260px] hover:border-accent/50 transition-colors" data-hover>
              <blockquote className="text-xl md:text-2xl leading-snug font-medium">“{t.q}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <img src={t.img} alt={t.who} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <span className="text-sm text-cream/60">{t.who}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
