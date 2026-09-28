import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dir, 'data.json');

const seed = { wishes: [
  { id: 'w1', name: 'Maya', msg: 'You two are pure cinema. ♥', ts: Date.now() },
  { id: 'w2', name: 'Jon', msg: 'Wishing you 1000 more sunsets.', ts: Date.now() },
], rsvps: [] };

export async function load() {
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    await save(seed);
    return structuredClone(seed);
  }
}
export async function save(db) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}
