# NOVA — Premium Cinematic Single-Page Site

Dark mode, editorial type, GSAP + Lenis + Three.js. 60fps, mobile-first, respects `prefers-reduced-motion`.

## 1. Install

```bash
npm create vite@latest premium-cinematic-site -- --template react
cd premium-cinematic-site
npm i gsap lenis three
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# then copy all files from this project over the fresh Vite template
npm install
```

> This repo already contains `package.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/*`.

## 2. Run

```bash
npm run dev
# open http://localhost:5173
```

Build check:

```bash
npm run build
npm run preview
```

## 3. Structure

```
premium-cinematic-site/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    App.jsx        # Lenis + ScrollTrigger setup + section color shifts
    index.css      # Tailwind + marquee, cursor, headline, noise
    hooks/usePrefersReducedMotion.js
    components/
      Preloader.jsx      # 0-100 counter + curtain reveal
      CustomCursor.jsx   # dot + lerped ring
      MagneticButton.jsx # magnetic hover
      Navbar.jsx
      Hero.jsx           # split-text lines + parallax fade
      HeroScene.jsx      # Three.js TorusKnot + particles, follows cursor
      Marquee.jsx
      Story.jsx          # pinned + parallax layers + scale/fade text
      Features.jsx       # horizontal scroll gallery (desktop pin, mobile stack)
      Stats.jsx          # scroll counters
      Testimonials.jsx
      CTA.jsx            # color shift to accent
      Footer.jsx         # kinetic LET'S TALK
```

## 4. Deploy on Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "cinematic site"
git branch -M main
git remote add origin https://github.com/YOU/premium-cinematic-site.git
git push -u origin main
```
2. Go to `vercel.com` → Add New → Project → Import repo.
3. Settings:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output dir: `dist`
4. Deploy. Every push auto-deploys.

CLI alternative:
```bash
npm i -g vercel
vercel
vercel --prod
```

## 5. Notes for 60fps

- `transform` / `opacity` only in ScrollTrigger tweens.
- `renderer.setPixelRatio(min(devicePixelRatio,2))`.
- `scrub:1` + `anticipatePin:1` for smooth pins.
- Custom cursor + magnetic disabled on `(pointer:coarse)` and `prefers-reduced-motion`.
- Images lazy-loaded from Unsplash. Replace with local `/public` assets for production.
