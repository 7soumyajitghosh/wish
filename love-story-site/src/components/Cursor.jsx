import { useEffect, useRef } from 'react'
export default function Cursor() {
  const d = useRef(null); const r = useRef(null);
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('custom-cursor-on');
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my, raf = 0;
    const move = (e) => { mx = e.clientX; my = e.clientY;
      d.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      r.current.classList.toggle('is-hover', !!e.target.closest?.('a,button,[data-hover]')); };
    const loop = () => { rx += (mx-rx)*.16; ry += (my-ry)*.16;
      r.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop); };
    addEventListener('mousemove', move, { passive: true }); raf = requestAnimationFrame(loop);
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor-on'); };
  }, []);
  return (<><div id="cursor-dot" ref={d} /><div id="cursor-ring" ref={r} /></>);
}
