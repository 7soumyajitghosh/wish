import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);
const MEMS = [
  ['First smile','https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop'],
  ['Golden hour','https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800&auto=format&fit=crop'],
  ['City lights','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop'],
  ['Slow dance','https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop'],
  ['Forever','https://images.unsplash.com/photo-1522098543979-ffc7f79a56c4?q=80&w=800&auto=format&fit=crop'],
];
export default function Memories() {
  const ref = useRef(null); const track = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const tw = gsap.to(track.current, { x: () => -(track.current.scrollWidth - innerWidth),
        ease:'none', scrollTrigger:{ trigger: ref.current, start:'top top',
          end: () => `+=${track.current.scrollWidth - innerWidth}`,
          pin:true, scrub:1, invalidateOnRefresh:true } });
      return () => { tw.scrollTrigger?.kill(); tw.kill(); };
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="memories" ref={ref} className="bg-coal border-y border-white/10 overflow-hidden">
      <div className="md:h-screen flex flex-col justify-center py-16">
        <div className="px-5 md:px-10 max-w-7xl mx-auto w-full mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-rose">Memories</p>
          <h2 className="serif text-4xl md:text-6xl">Little moments, <span className="italic text-blush">big love.</span></h2>
        </div>
        <div ref={track} className="flex flex-col md:flex-row gap-5 px-5 md:px-10 md:w-max">
          {MEMS.map(([t, src]) => (
            <figure key={t} className="shrink-0 w-full md:w-[34vw] bg-ink border border-white/10 rounded-3xl overflow-hidden" data-hover>
              <div className="distort h-[260px] md:h-[320px]"><img src={src} alt={t} loading="lazy" className="w-full h-full object-cover" /></div>
              <figcaption className="p-5 serif italic text-2xl">♥ {t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
