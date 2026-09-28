import { Router } from 'express';
import { load, save } from '../db.js';
const r = Router();

// POST /api/rsvp { name, attending: bool, count }
r.post('/', async (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, 60);
  const attending = Boolean(req.body?.attending);
  const count = Math.max(1, Math.min(6, Number(req.body?.count ?? 1) || 1));
  if (!name) return res.status(400).json({ error: 'name required' });
  const db = await load();
  const row = { id: 'r' + Date.now().toString(36), name, attending, count, ts: Date.now() };
  db.rsvps.push(row);
  await save(db);
  res.status(201).json(row);
});

// GET /api/rsvp/count
r.get('/count', async (req, res) => {
  const db = await load();
  const yes = db.rsvps.filter(x => x.attending).reduce((s, x) => s + x.count, 0);
  res.json({ total: db.rsvps.length, attending: yes });
});

export default r;
