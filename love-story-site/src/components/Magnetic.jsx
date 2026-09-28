import { useEffect, useRef } from 'react'
import gsap from 'gsap'
export default function Magnetic({ children, className='', ...p }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: .4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: .4, ease: 'power3' });
    const mv = (e) => { const b = el.getBoundingClientRect();
      const dx = e.clientX-(b.left+b.width/2), dy = e.clientY-(b.top+b.height/2);
      if (Math.hypot(dx,dy)<140){ xTo(dx*.35); yTo(dy*.35);} else { xTo(0); yTo(0);} };
    addEventListener('mousemove', mv, { passive: true });
    return () => removeEventListener('mousemove', mv);
  }, []);
  return <button ref={ref} data-hover className={className} {...p}>{children}</button>;
}
