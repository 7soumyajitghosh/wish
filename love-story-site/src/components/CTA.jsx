import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Magnetic from './Magnetic.jsx'
import { STORY } from '../love.js'
export default function CTA() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-line > span', { yPercent: 100 }, { yPercent: 0, stagger:.08, duration:.9, ease:'power4.out',
        scrollTrigger:{ trigger: ref.current, start:'top 78%' } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="px-5 md:px-10 py-24 text-center bg-gradient-to-b from-ink to-coal">
      <h2 className="serif text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
        <span className="mask cta-line"><span className="italic">{STORY.cta}</span></span>
      </h2>
      <div className="mt-8 flex justify-center gap-3">
        <Magnetic className="glow bg-rose text-white px-8 py-4 rounded-full font-semibold uppercase text-sm tracking-widest">Be part of it ♥</Magnetic>
        <Magnetic className="border border-cream/30 px-8 py-4 rounded-full text-sm uppercase tracking-widest" onClick={()=>scrollTo({top:0,behavior:'smooth'})}>Back to start</Magnetic>
      </div>
    </section>
  );
}
