import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const key = new THREE.DirectionalLight(0xd9ff3f, 2.2)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x7a7aff, 1.2)
    rim.position.set(-4, -2, 2)
    scene.add(rim)

    // Object: distorted torus knot + particles
    const geo = new THREE.TorusKnotGeometry(1.15, 0.34, 220, 36)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x1a1a00,
      roughness: 0.25,
      metalness: 0.9,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wire overlay in accent
    const wire = new THREE.Mesh(
      geo.clone(),
      new THREE.MeshBasicMaterial({ color: 0xd9ff3f, wireframe: true, transparent: true, opacity: 0.18 })
    )
    wire.scale.setScalar(1.02)
    scene.add(wire)

    // Particles ring
    const pGeo = new THREE.BufferGeometry()
    const N = 350
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 2.4 + Math.random() * 2.2
      const a = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(a) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pos[i * 3 + 2] = Math.sin(a) * r
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xd9ff3f, size: 0.02, transparent: true, opacity: 0.7 }))
    scene.add(points)

    let tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      cx += (tx - cx) * 0.05
      cy += (ty - cy) * 0.05

      if (!reduced) {
        mesh.rotation.x = t * 0.25 + cy * 0.4
        mesh.rotation.y = t * 0.35 + cx * 0.6
        wire.rotation.copy(mesh.rotation)
        points.rotation.y = t * 0.05
        mesh.position.x = cx * 0.5
        mesh.position.y = -cy * 0.4 + Math.sin(t * 1.2) * 0.12
        wire.position.copy(mesh.position)
      } else {
        mesh.rotation.set(0.4, 0.6, 0)
        wire.rotation.copy(mesh.rotation)
      }
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      geo.dispose(); mat.dispose(); pGeo.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 [&>canvas]:w-full [&>canvas]:h-full" aria-hidden />
}
