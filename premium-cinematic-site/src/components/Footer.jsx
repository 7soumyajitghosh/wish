import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      // kinetic chars wave on hover handled via CSS + JS stagger loop
      gsap.fromTo('.foot-big', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    }, ref)

    const big = ref.current?.querySelector('.foot-big')
    const chars = ref.current?.querySelectorAll('.kinetic-char')
    const onEnter = () => {
      gsap.to(chars, { y: -14, duration: 0.25, ease: 'power2.out', stagger: { each: 0.02, yoyo: true, repeat: 1 } })
    }
    big?.addEventListener('mouseenter', onEnter)
    return () => { ctx.revert(); big?.removeEventListener('mouseenter', onEnter) }
  }, [])

  return (
    <footer ref={ref} className="bg-ink border-t border-white/10 px-5 md:px-10 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <a href="mailto:hello@nova.studio" data-hover className="foot-big block text-center headline text-[16vw] md:text-[11vw] leading-[0.85] hover:text-accent transition-colors">
          {'LET\'S TALK'.split('').map((ch, i) => (
            <span key={i} className="kinetic-char">{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </a>

        <div className="mt-12 grid md:grid-cols-4 gap-8 text-sm text-cream/60">
          <div>
            <p className="text-cream font-bold mb-3">NOVA.</p>
            <p className="max-w-[220px]">Cinematic studio for brands that refuse to blend in.</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3 text-cream/40">Menu</p>
            <div className="flex flex-col gap-2">
              {['Story', 'Work', 'Proof', 'Voices'].map((l) => (
                <a key={l} href={`#${l.toLowerCase() === 'voices' ? 'voices' : l.toLowerCase()}`} data-hover className="hover:text-accent w-fit">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3 text-cream/40">Socials</p>
            <div className="flex flex-col gap-2">
              {['Instagram', 'X / Twitter', 'LinkedIn', 'Dribbble'].map((s) => (
                <a key={s} href="#top" data-hover className="hover:text-accent w-fit">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3 text-cream/40">Contact</p>
            <a href="mailto:hello@nova.studio" data-hover className="hover:text-accent">hello@nova.studio</a>
            <p className="mt-2">+1 (415) 555-0132<br />San Francisco / Remote</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs uppercase tracking-[0.2em] text-cream/40">
          <span>© 2026 Nova Studio</span>
          <span>Made with GSAP • Lenis • Three.js</span>
          <span>Short sentences. Big impact.</span>
        </div>
      </div>
    </footer>
  )
}
