export const NAMES = { one: 'Aarav', two: 'Diya' };
export const CHAPTERS_EXTRA = [
  { n: 'Chapter 5 — The Distance', title: 'Miles meant nothing', text: 'Two cities. One timezone of the heart. Good-morning texts. Midnight calls. Love is a verb.' },
  { n: 'Chapter 6 — The Return', title: 'You ran. I cried.', text: 'Platform 3. Rain on the roof. One suitcase dropped. Home needs no words.' },
  { n: 'Chapter 7 — The Everyday', title: 'Chai, rain, Sundays', text: 'Two cups. One blanket. Your laugh from the kitchen. Forever lives in ordinary days.' },
  { n: 'Chapter 8 — The Forever', title: 'A house with your name', text: 'Morning light. Your plants. My books. Every night, the same promise.' },
];
export const LETTERS = [
  { from: 'Aarav, 2am note', text: 'If I had one wish — I would relive every ordinary Tuesday with you.' },
  { from: 'Diya, rain day', text: 'You are my calm and my chaos. My home and my adventure.' },
  { from: 'Our vow', text: 'Not perfect. Just real. Just us. Just forever.' },
];
export function hundredReasons() {
  const base = ['your laugh','your courage','midnight chai','how you forgive','your sleepy voice','rainy walks','your notes','your dreams','old songs','silly dances'];
  const out = [];
  for (let i = 1; i <= 100; i++) out.push({ n: i, text: base[(i * 7) % base.length] });
  return out;
}
