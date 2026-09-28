import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // only magnetize within 120px
      if (Math.hypot(dx, dy) < 140) {
        xTo(dx * 0.35)
        yTo(dy * 0.35)
      } else {
        xTo(0); yTo(0)
      }
    }
    const onLeave = () => { xTo(0); yTo(0) }
    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <button ref={ref} data-hover className={`will-change-transform ${className}`} {...props}>
      {children}
    </button>
  )
}
