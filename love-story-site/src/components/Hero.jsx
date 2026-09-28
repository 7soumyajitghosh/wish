import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Hearts from './Hearts.jsx'
import Magnetic from './Magnetic.jsx'
import { NAMES, STORY } from '../love.js'
export default function Hero({ ready }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ready) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo('.h-line > span', { yPercent: 110 }, { yPercent: 0, duration: reduced?0:1.1, ease:'power4.out', stagger:.14 });
      gsap.fromTo('.h-fade', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: reduced?0:.9, stagger:.1, delay:.6 });
    }, ref);
    if (!reduced) {
      const p = gsap.to('.hero-inner', { y:-70, opacity:.3, ease:'none',
        scrollTrigger:{ trigger:ref.current, start:'top top', end:'70% top', scrub:true } });
      return () => { ctx.revert(); p.scrollTrigger?.kill(); };
    }
    return () => ctx.revert();
  }, [ready]);
  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden px-5 md:px-10 pt-24 pb-12">
      <div className="absolute -top-24 left-1/3 w-[55vw] h-[55vw] rounded-full bg-rose/20 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"><Hearts /></div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent pointer-events-none" />
      <div className="hero-inner relative z-10 max-w-6xl mx-auto w-full text-center">
        <p className="h-fade text-xs uppercase tracking-[0.4em] text-blush mb-4">{STORY.heroKicker} — {NAMES.one} ♥ {NAMES.two}</p>
        <h1 className="serif font-semibold leading-[0.95] text-[12vw] md:text-[7.5vw] text-glow">
          <span className="mask h-line"><span className="italic font-medium">{STORY.heroTitleA}</span></span>
          <span className="mask h-line"><span>{STORY.heroTitleB}</span></span>
        </h1>
        <p className="h-fade mt-5 text-cream/70 max-w-xl mx-auto">Scroll slowly. This is us.</p>
        <div className="h-fade mt-7 flex justify-center gap-3">
          <Magnetic className="glow bg-rose text-white px-7 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest" onClick={()=>document.querySelector('#ch1')?.scrollIntoView({behavior:'smooth'})}>Begin story</Magnetic>
          <Magnetic className="border border-cream/30 px-7 py-3.5 rounded-full text-sm uppercase tracking-widest hover:border-rose" onClick={()=>document.querySelector('#memories')?.scrollIntoView({behavior:'smooth'})}>Memories</Magnetic>
        </div>
      </div>
    </section>
  );
}
