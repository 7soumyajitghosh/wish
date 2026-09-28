import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const show = gsap.fromTo(el, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2.4 })
    const st = ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        const y = self.scroll()
        gsap.to(el, {
          backgroundColor: y > 80 ? 'rgba(10,10,11,0.72)' : 'rgba(10,10,11,0)',
          backdropFilter: y > 80 ? 'blur(12px)' : 'blur(0px)',
          duration: 0.3,
          overwrite: 'auto',
        })
      },
    })
    return () => { show.kill(); st.kill() }
  }, [])

  const go = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-[80] border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
        <button onClick={() => go('#top')} data-hover className="font-display text-xl tracking-wide">
          NOVA<span className="accent-text">.</span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-cream/80">
          {[
            ['Story', '#story'],
            ['Work', '#work'],
            ['Proof', '#proof'],
            ['Voices', '#voices'],
          ].map(([label, href]) => (
            <button key={href} data-hover onClick={() => go(href)} className="hover:text-accent transition-colors">
              {label}
            </button>
          ))}
        </div>
        <MagneticButton onClick={() => go('#contact')} className="bg-accent text-ink text-sm font-bold uppercase tracking-widest px-5 py-2.5 rounded-full">
          Let's talk
        </MagneticButton>
      </nav>
    </header>
  )
}
