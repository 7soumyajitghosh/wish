import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroScene from './HeroScene.jsx'
import MagneticButton from './MagneticButton.jsx'

function Lines({ ready }) {
  const wrapRef = useRef(null)
  useEffect(() => {
    if (!ready) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line > span',
        { yPercent: 110 },
        { yPercent: 0, duration: reduced ? 0 : 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.1 }
      )
      gsap.fromTo('.hero-fade',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: reduced ? 0 : 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.7 }
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [ready])

  return (
    <div ref={wrapRef}>
      <h1 className="headline text-[15.5vw] md:text-[9.5vw] leading-[0.88]">
        <span className="mask hero-line"><span>We make</span></span>
        <span className="mask hero-line"><span className="outline-text">brands</span></span>
        <span className="mask hero-line"><span>move <span className="accent-text">fast.</span></span></span>
      </h1>
      <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
        <p className="hero-fade max-w-md text-cream/70 text-base md:text-lg leading-relaxed">
          Short films. Bold sites. Sharp stories. We turn attention into action. No fluff. Just craft.
        </p>
        <div className="hero-fade flex gap-3">
          <MagneticButton onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} className="bg-cream text-ink px-7 py-3.5 rounded-full font-bold uppercase text-sm tracking-widest">
            See work
          </MagneticButton>
          <MagneticButton onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="border border-cream/30 px-7 py-3.5 rounded-full font-bold uppercase text-sm tracking-widest hover:border-accent hover:text-accent transition-colors">
            Start a project
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}

export default function Hero({ ready }) {
  const secRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg-glow', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: secRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        y: -60, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: secRef.current, start: 'top top', end: '70% top', scrub: true },
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={secRef} className="relative min-h-[100svh] flex items-end overflow-hidden pt-28 pb-10 px-5 md:px-10">
      <div className="hero-bg-glow absolute -top-32 -left-32 w-[60vw] h-[60vw] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-full md:w-[55%] opacity-90 pointer-events-none">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none" />

      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5 text-[11px] md:text-xs uppercase tracking-[0.35em] text-cream/60">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Cinematic digital studio — Est. 2019
        </div>
        <Lines ready={ready} />
        <div className="mt-10 flex justify-between items-center text-xs uppercase tracking-[0.25em] text-cream/50">
          <span>Scroll to enter</span>
          <span className="hidden md:block">60fps • Lenis • WebGL</span>
          <span>● Rec</span>
        </div>
      </div>
    </section>
  )
}
