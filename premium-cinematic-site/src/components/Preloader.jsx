import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obj = { v: 0 }
    const dur = reduced ? 0.3 : 2.1

    const tween = gsap.to(obj, {
      v: 100,
      duration: dur,
      ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(obj.v)
        setCount(n)
        if (numRef.current) {
          // subtle scale pulse
          gsap.set(numRef.current, { scale: 1 + obj.v / 800 })
        }
      },
      onComplete: () => {
        const tl = gsap.timeline({ onComplete: () => onDone?.() })
        tl.to('.pre-panel', {
          yPercent: -100,
          duration: reduced ? 0.3 : 0.9,
          ease: 'power4.inOut',
          stagger: 0.08,
        })
        .set(rootRef.current, { display: 'none' })
      },
    })
    return () => { tween.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div className="pre-panel absolute inset-0 bg-accent" />
      <div className="pre-panel absolute inset-0 bg-coal flex flex-col justify-between p-6 md:p-10">
        <div className="flex justify-between text-xs tracking-[0.3em] uppercase text-muted">
          <span>Nova Studio</span>
          <span>Loading Experience</span>
        </div>
        <div className="flex items-end justify-between">
          <p className="max-w-[220px] text-sm text-muted leading-snug">
            Dark. Fast. Cinematic. We count every frame.
          </p>
          <div ref={numRef} className="headline text-[22vw] md:text-[12vw] leading-none text-cream origin-bottom-right">
            {count}<span className="accent-text text-[6vw] md:text-[3vw] align-top">%</span>
          </div>
        </div>
        <div className="h-[2px] w-full bg-white/10 overflow-hidden">
          <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  )
}
