import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
export default function Preloader({ onDone }) {
  const rootRef = useRef(null); const [c, setC] = useState(0);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const o = { v: 0 };
    const t = gsap.to(o, { v: 100, duration: reduced ? .3 : 2, ease: 'power2.inOut',
      onUpdate: () => setC(Math.round(o.v)),
      onComplete: () => {
        gsap.to('.pre-panel', { yPercent: -100, duration: reduced ? .3 : .9, ease: 'power4.inOut', stagger: .08,
          onComplete: () => onDone?.() });
      }});
    return () => { t.kill() };
  }, [onDone]);
  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div className="pre-panel absolute inset-0 bg-rose" />
      <div className="pre-panel absolute inset-0 bg-ink flex flex-col items-center justify-center gap-6">
        <div className={matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : 'beat'}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="#FF4D6D"><path d="M12 21s-7.5-4.9-9.7-9.2C.7 8.6 2.6 5 6 5c2 0 3.4 1.1 4 2.2C10.6 6.1 12 5 14 5c3.4 0 5.3 3.6 3.7 6.8C19.5 16.1 12 21 12 21z"/></svg>
        </div>
        <p className="serif italic text-2xl text-cream/80">counting every heartbeat… {c}%</p>
        <div className="w-56 h-[2px] bg-white/10 overflow-hidden rounded-full"><div className="h-full bg-rose" style={{ width: `${c}%` }} /></div>
      </div>
    </div>
  );
}
