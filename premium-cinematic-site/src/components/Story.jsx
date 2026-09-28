import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // Pinned storytelling
      if (!reduced) {
        gsap.to('.story-pin-inner', {
          scale: 0.96, ease: 'none',
          scrollTrigger: { trigger: '.story-pin', start: 'top top', end: '+=80%', pin: true, scrub: true },
        })
      }
      // Text fade + scale on enter
      gsap.utils.toArray('.story-reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: reduced ? 0 : 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
      // Parallax layers
      if (!reduced) {
        gsap.to('.parallax-slow', {
          yPercent: -18, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.to('.parallax-fast', {
          yPercent: 14, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="story" ref={ref} className="relative bg-ink">
      <div className="story-pin min-h-[90vh] flex items-center px-5 md:px-10 py-20">
        <div className="story-pin-inner max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
          <div>
            <p className="story-reveal text-xs uppercase tracking-[0.35em] text-accent mb-6">01 — The story</p>
            <h2 className="story-reveal headline text-5xl md:text-7xl">
              Attention is scarce. <br /><span className="text-cream/40">We make it stick.</span>
            </h2>
            <p className="story-reveal mt-6 text-cream/70 text-lg leading-relaxed max-w-md">
              We cut noise. We keep signal. Every frame earns its place. Every word earns the click.
            </p>
            <p className="story-reveal mt-4 text-cream/50 leading-relaxed max-w-md">
              Small team. Senior craft. Fast process. You talk to makers, not managers.
            </p>
          </div>
          <div className="relative h-[420px] md:h-[540px]">
            <div className="parallax-slow distort absolute top-0 right-0 w-[78%] h-[68%] rounded-2xl" data-hover>
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop" alt="Live event lights" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
            </div>
            <div className="parallax-fast distort absolute bottom-0 left-0 w-[62%] h-[52%] rounded-2xl border border-white/10" data-hover>
              <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop" alt="Cinema production" className="w-full h-full object-cover rounded-2xl" loading="lazy" />
            </div>
            <div className="absolute -bottom-4 right-4 bg-accent text-ink px-5 py-3 rounded-full font-bold text-sm uppercase tracking-widest rotate-[-4deg]">
              Real sets. Real light.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
