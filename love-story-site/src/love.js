export const NAMES = { one: 'Aarav', two: 'Diya' }; // <-- change to your names
export const STORY = {
  heroKicker: 'a love story',
  heroTitleA: "Some stories don't begin.",
  heroTitleB: 'They find you.',
  chapters: [
    { n: 'Chapter 1 — The Meeting', title: 'It was an ordinary day', text: `Until ${NAMES.one} met ${NAMES.two}. One look, one smile, and the world went quiet.` },
    { n: 'Chapter 2 — The Spark', title: 'Late-night talks', text: 'Shared silences. Laughter that made hours disappear. Somewhere between "hello" and "don\'t go," we fell.' },
    { n: 'Chapter 3 — The Storms', title: "Love isn't always soft", text: 'There were distances, doubts, and days we almost let go. But every time, we chose each other again.' },
    { n: 'Chapter 4 — The Promise', title: 'Not perfect, just real', text: 'Hand in hand, through every season, we promise to stay.' },
  ],
  stats: [
    { v: 365, suffix: '', label: 'days of us' },
    { v: 1000, suffix: '+', label: 'memories' },
    { v: 1, suffix: '', label: 'forever' },
  ],
  cta: 'Our story is still being written. Come, be part of it.',
  footer: 'Forever starts here. ♥',
};
