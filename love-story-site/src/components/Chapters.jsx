import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STORY } from '../love.js'
gsap.registerPlugin(ScrollTrigger);
const PHOTOS = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop',
];
export default function Chapters() {
  const ref = useRef(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ch-block').forEach((el) => {
        gsap.fromTo(el.querySelectorAll('.rv'), { y: 50, opacity: 0, scale:.97 },
          { y:0, opacity:1, scale:1, duration: reduced?0:.9, ease:'power3.out', stagger:.1,
            scrollTrigger:{ trigger: el, start:'top 78%' } });
      });
      if (!reduced) {
        gsap.utils.toArray('.par').forEach((el, i) => {
          gsap.to(el, { yPercent: i%2? 12 : -12, ease:'none',
            scrollTrigger:{ trigger: el.parentElement, start:'top bottom', end:'bottom top', scrub:true } });
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref}>
      {STORY.chapters.map((c, i) => (
        <section key={c.n} id={`ch${i+1}`} className="ch-block relative px-5 md:px-10 py-20 md:py-28 border-t border-white/10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className={i%2 ? 'md:order-2' : ''}>
              <p className="rv text-xs uppercase tracking-[0.35em] text-rose mb-4">{c.n}</p>
              <h2 className="rv serif text-4xl md:text-6xl leading-tight">{c.title}</h2>
              <p className="rv mt-5 text-lg text-cream/70 leading-relaxed max-w-md">{c.text}</p>
            </div>
            <div className="relative h-[340px] md:h-[460px]">
              <div className="par distort absolute inset-0 rounded-3xl glow" data-hover>
                <img src={PHOTOS[i]} alt={c.title} loading="lazy" className="w-full h-full object-cover rounded-3xl" />
              </div>
              <div className="absolute -bottom-4 left-4 bg-cream text-ink px-5 py-2 rounded-full text-sm font-semibold rotate-[-3deg]">♥ {String(i+1).padStart(2,'0')}</div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
