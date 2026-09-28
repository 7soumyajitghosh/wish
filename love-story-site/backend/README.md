# Backend
```bash
cd backend
npm install
npm run dev   # :8080
```
Env: `PORT=8080 CORS_ORIGIN=http://localhost:5173`
Deploy (Render/Railway/Vercel functions): `npm start`.
Frontend: set `VITE_API_URL=https://YOUR-backend/api` then use `<Wishes/>` in App.
Endpoints: GET /api/health, GET/POST /api/wishes, POST /api/rsvp, GET /api/rsvp/count.
