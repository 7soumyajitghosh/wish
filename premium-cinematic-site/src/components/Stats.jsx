import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { v: 120, suffix: '+', label: 'Projects shipped. No misses.' },
  { v: 98, suffix: '%', label: 'Client retention. They stay.' },
  { v: 4, suffix: 'x', label: 'Avg. conversion lift. Real growth.' },
  { v: 12, suffix: '', label: 'Design awards. Earned, not bought.' },
]

export default function Stats() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.counter').forEach((el) => {
        const target = parseFloat(el.dataset.target)
        const obj = { n: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              n: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.n) },
            })
          },
        })
      })
      gsap.fromTo('.stat-card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proof" ref={ref} className="bg-ink px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-accent mb-3">03 — Proof</p>
        <h2 className="headline text-5xl md:text-7xl max-w-3xl">Numbers talk. <span className="text-cream/40">We listen.</span></h2>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card bg-coal border border-white/10 rounded-2xl p-6 md:p-8 hover:border-accent/60 transition-colors" data-hover>
              <div className="font-display text-5xl md:text-6xl">
                <span className="counter" data-target={s.v}>0</span><span className="accent-text">{s.suffix}</span>
              </div>
              <p className="mt-3 text-cream/60 text-sm md:text-base leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
