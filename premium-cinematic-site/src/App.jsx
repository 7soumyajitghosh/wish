import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Story from './components/Story.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)

  // Lenis smooth scroll + GSAP sync
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  // Lock scroll during preload, refresh triggers after
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      ScrollTrigger.refresh()
    }
  }, [loading])

  // Section-to-section color shifts
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-bg]').forEach((sec) => {
        const bg = sec.getAttribute('data-bg')
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => gsap.to('body', { backgroundColor: bg, duration: 0.6, overwrite: 'auto' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: bg, duration: 0.6, overwrite: 'auto' }),
        })
      })
    })
    return () => ctx.revert()
  }, [loading])

  return (
    <div className="noise min-h-screen bg-ink text-cream font-body">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee items={['Brand Films', 'WebGL', 'Motion', 'Strategy', 'Design Systems', 'Launches']} />
        <div data-bg="#0A0A0B"><Story /></div>
        <Marquee items={['Scroll →', 'Horizontal Gallery', 'Pinned Stories', 'Parallax']} fast outline />
        <div data-bg="#121214"><Features /></div>
        <div data-bg="#0A0A0B"><Stats /></div>
        <div data-bg="#121214"><Testimonials /></div>
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
