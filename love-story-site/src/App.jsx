import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Hero from './components/Hero.jsx'
import Chapters from './components/Chapters.jsx'
import Memories from './components/Memories.jsx'
import Stats from './components/Stats.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'
gsap.registerPlugin(ScrollTrigger);
function Marquee({ items }) {
  const row = [...items, ...items];
  return <div className="overflow-hidden border-y border-white/10 py-4 bg-ink"><div className="marquee-track gap-8">
    {[0,1].map(h=>(<div key={h} className="flex gap-8 shrink-0">{row.map((t,i)=>(<span key={i} className="serif italic text-2xl md:text-3xl whitespace-nowrap text-cream/80">{t} <span className="text-rose">♥</span></span>))}</div>))}
  </div></div>;
}
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t*1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    if (!loading) ScrollTrigger.refresh();
  }, [loading]);
  return (
    <div id="top" className="noise min-h-screen bg-ink text-cream font-body">
      {loading && <Preloader onDone={()=>setLoading(false)} />}
      <Cursor />
      <main>
        <Hero ready={!loading} />
        <Marquee items={['the meeting','the spark','the storms','the promise','forever']} />
        <Chapters />
        <Memories />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
