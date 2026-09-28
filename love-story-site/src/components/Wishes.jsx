import { useEffect, useState } from 'react';
const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
export default function Wishes() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const loadW = () => fetch(`${API}/api/wishes`).then(r => r.json()).then(setList).catch(() => {});
  useEffect(() => { loadW(); }, []);
  const send = async (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    await fetch(`${API}/api/wishes`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, msg }) });
    setName(''); setMsg(''); loadW();
  };
  return (
    <section className="px-5 md:px-10 py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-rose">Wishes wall</p>
        <h2 className="serif text-4xl md:text-5xl">Leave a wish ♥</h2>
        <form onSubmit={send} className="mt-6 flex flex-col md:flex-row gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="bg-coal border border-white/15 rounded-full px-5 py-3 flex-1 outline-none focus:border-rose" maxLength={40} />
          <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your wish…" className="bg-coal border border-white/15 rounded-full px-5 py-3 flex-[2] outline-none focus:border-rose" maxLength={280} />
          <button className="bg-rose px-7 py-3 rounded-full font-semibold">Send</button>
        </form>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {list.map(w => (
            <div key={w.id} className="bg-coal border border-white/10 rounded-2xl p-5">
              <p className="serif italic text-lg">“{w.msg}”</p>
              <p className="mt-2 text-sm text-cream/50">— {w.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
