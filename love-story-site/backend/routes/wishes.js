import { Router } from 'express';
import { load, save } from '../db.js';
const r = Router();

// GET /api/wishes — newest first
r.get('/', async (req, res) => {
  const db = await load();
  res.json([...db.wishes].sort((a, b) => b.ts - a.ts).slice(0, 100));
});

// POST /api/wishes { name, msg }
r.post('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, 40);
  const msg = String(req.body?.msg ?? '').trim().slice(0, 280);
  if (!name || !msg) return res.status(400).json({ error: 'name and msg required' });
  const db = await load();
  const wish = { id: 'w' + Date.now().toString(36), name, msg, ts: Date.now() };
  db.wishes.push(wish);
  await save(db);
  res.status(201).json(wish);
});

export default r;
