import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-big span', { yPercent: 100 }, {
        yPercent: 0, stagger: 0.06, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
      gsap.to(ref.current, {
        backgroundColor: '#D9FF3F', ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 60%', end: 'bottom 60%', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={ref} className="bg-ink px-5 md:px-10 py-24 md:py-32 transition-colors">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.35em] mb-4 opacity-60">05 — Start</p>
        <h2 className="cta-big headline text-[13vw] md:text-[7vw] leading-[0.9] mix-blend-difference">
          <span className="mask"><span>Have an idea?</span></span>
          <span className="mask"><span>Let's make it</span></span>
          <span className="mask"><span className="outline-text">loud.</span></span>
        </h2>
        <p className="mt-6 text-lg opacity-70 max-w-xl mx-auto">One call. Clear plan. Fixed price. Launch in weeks, not months.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <MagneticButton className="bg-ink text-cream px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm">
            <a href="mailto:hello@nova.studio" data-hover className="block">hello@nova.studio</a>
          </MagneticButton>
          <MagneticButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border-2 border-ink px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm">
            Back to top ↑
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
