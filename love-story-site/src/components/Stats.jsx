import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STORY } from '../love.js'
gsap.registerPlugin(ScrollTrigger);
export default function Stats() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cnt').forEach((el) => {
        const t = parseFloat(el.dataset.t); const o = { n: 0 };
        ScrollTrigger.create({ trigger: el, start:'top 88%', once:true,
          onEnter: () => gsap.to(o, { n:t, duration:1.6, ease:'power2.out', onUpdate:()=>{ el.textContent=Math.round(o.n);} }) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="px-5 md:px-10 py-20 text-center">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
        {STORY.stats.map((s) => (
          <div key={s.label} className="bg-coal border border-rose/20 rounded-3xl p-6 md:p-10 glow" data-hover>
            <div className="serif text-4xl md:text-6xl"><span className="cnt" data-t={s.v}>0</span><span className="text-rose">{s.suffix}</span></div>
            <p className="mt-2 text-cream/60 uppercase tracking-widest text-xs md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-cream/50 tracking-wide">365 days of us · 1000+ memories · 1 forever</p>
    </section>
  );
}
