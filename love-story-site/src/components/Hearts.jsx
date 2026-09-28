import { useEffect, useRef } from 'react'
import * as THREE from 'three'
function heartTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d');
  x.clearRect(0,0,64,64); x.fillStyle = '#fff'; x.font = '48px serif';
  x.textAlign='center'; x.textBaseline='middle'; x.fillText('♥',32,34);
  const t = new THREE.CanvasTexture(c); return t;
}
export default function Hearts() {
  const ref = useRef(null);
  useEffect(() => {
    const mount = ref.current; const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, 1, .1, 100); cam.position.z = 8;
    const ren = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    ren.setPixelRatio(Math.min(devicePixelRatio, 2)); mount.appendChild(ren.domElement);
    const tex = heartTexture();
    const N = 90; const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N*3); const seed = [];
    for (let i=0;i<N;i++){ pos[i*3]=(Math.random()-.5)*12; pos[i*3+1]=(Math.random()-.5)*8; pos[i*3+2]=(Math.random()-.5)*4; seed.push(Math.random()*10); }
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    const mat = new THREE.PointsMaterial({ size:.45, map:tex, transparent:true, depthWrite:false,
      color:new THREE.Color('#FF6D8D'), opacity:.9 });
    const pts = new THREE.Points(geo, mat); scene.add(pts);
    let tx=0, ty=0, cx=0, cy=0;
    const mv=(e)=>{ tx=(e.clientX/innerWidth-.5)*2; ty=(e.clientY/innerHeight-.5)*2; };
    addEventListener('mousemove', mv, { passive:true });
    const rs=()=>{ const w=mount.clientWidth||1,h=mount.clientHeight||1; ren.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); };
    rs(); addEventListener('resize', rs);
    let raf=0; const clock=new THREE.Clock();
    const tick=()=>{ const t=clock.getElapsedTime();
      cx+=(tx-cx)*.04; cy+=(ty-cy)*.04;
      const p=geo.attributes.position.array;
      for(let i=0;i<N;i++){ p[i*3+1]+= reduced?0 : Math.sin(t+seed[i])*.003; p[i*3]+= cx*.004; }
      geo.attributes.position.needsUpdate=true;
      pts.rotation.y = cx*.4 + (reduced?0:t*.03); pts.rotation.x = cy*.25;
      ren.render(scene,cam); raf=requestAnimationFrame(tick); };
    tick();
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('mousemove',mv); removeEventListener('resize',rs);
      geo.dispose(); mat.dispose(); tex.dispose(); ren.dispose(); mount.removeChild(ren.domElement); };
  }, []);
  return <div ref={ref} className="absolute inset-0 [&>canvas]:w-full [&>canvas]:h-full" aria-hidden />;
}
