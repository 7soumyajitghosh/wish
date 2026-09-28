import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { STORY, NAMES } from '../love.js'
export default function Footer() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const chars = ref.current.querySelectorAll('.kinetic-char');
    const enter = () => gsap.to(chars, { y:-14, duration:.25, ease:'power2.out', stagger:{ each:.02, yoyo:true, repeat:1 } });
    const big = ref.current.querySelector('.foot-big');
    big.addEventListener('mouseenter', enter);
    gsap.fromTo(big, { y:60, opacity:0 }, { y:0, opacity:1, duration:1, ease:'power3.out',
      scrollTrigger:{ trigger: ref.current, start:'top 88%' } });
    return () => big.removeEventListener('mouseenter', enter);
  }, []);
  return (
    <footer ref={ref} className="border-t border-white/10 px-5 py-14 text-center overflow-hidden">
      <a href="#top" data-hover className="foot-big serif block text-[13vw] md:text-[8vw] leading-none text-glow hover:text-blush transition-colors">
        {STORY.footer.split('').map((ch,i)=>(<span key={i} className="kinetic-char">{ch===' ' ? '\u00A0' : ch}</span>))}
      </a>
      <p className="mt-6 text-cream/50 text-sm tracking-[0.3em] uppercase">{NAMES.one} ♥ {NAMES.two} — © 2026</p>
    </footer>
  );
}
