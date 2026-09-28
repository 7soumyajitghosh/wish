import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    n: '01',
    title: 'Brand Films',
    desc: 'Short. Sharp. Made to share. Shot like cinema.',
    img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop',
    tag: 'Direction • Edit',
  },
  {
    n: '02',
    title: 'Web Experiences',
    desc: 'Fast sites with motion that sells. 90+ scores.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop',
    tag: 'React • WebGL',
  },
  {
    n: '03',
    title: 'Product Launches',
    desc: 'Tease. Drop. Sell out. Hype with a plan.',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=900&auto=format&fit=crop',
    tag: 'Strategy • 3D',
  },
  {
    n: '04',
    title: 'Design Systems',
    desc: 'One voice. Every screen. Built to scale.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop',
    tag: 'UI • Motion',
  },
]

export default function Features() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current
      const getX = () => -(track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      return () => { tween.scrollTrigger?.kill(); tween.kill() }
    })
    // mobile: fade cards in
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.feat-card').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, ref)
    return () => { mm.revert(); ctx.revert() }
  }, [])

  return (
    <section id="work" ref={ref} className="relative bg-coal overflow-hidden">
      <div className="md:h-screen flex flex-col justify-center py-16 md:py-0">
        <div className="px-5 md:px-10 max-w-7xl mx-auto w-full mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent mb-3">02 — Features</p>
            <h2 className="headline text-4xl md:text-6xl">Drag through <span className="outline-text">the work</span></h2>
          </div>
          <p className="hidden md:block text-cream/50 text-sm uppercase tracking-widest">Scroll →</p>
        </div>

        <div ref={trackRef} className="flex flex-col md:flex-row gap-5 px-5 md:px-10 md:w-max md:items-stretch">
          {CARDS.map((c) => (
            <article key={c.n} className="feat-card group shrink-0 w-full md:w-[44vw] lg:w-[36vw] bg-ink border border-white/10 rounded-3xl overflow-hidden" data-hover>
              <div className="distort h-[240px] md:h-[300px]">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-cream/50 mb-3">
                  <span>{c.n}</span><span>{c.tag}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl uppercase group-hover:text-accent transition-colors">{c.title}</h3>
                <p className="mt-2 text-cream/60">{c.desc}</p>
                <div className="mt-5 h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-0 group-hover:w-full bg-accent transition-all duration-700" />
                </div>
              </div>
            </article>
          ))}

          <div className="shrink-0 w-full md:w-[30vw] flex items-center justify-center border border-dashed border-white/20 rounded-3xl p-10 text-center">
            <div>
              <p className="font-display text-4xl uppercase">Your<br />project<br /><span className="accent-text">next?</span></p>
              <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} data-hover className="mt-6 bg-accent text-ink px-6 py-3 rounded-full font-bold uppercase text-sm tracking-widest">
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
