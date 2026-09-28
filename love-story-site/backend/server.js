import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import wishes from './routes/wishes.js';
import rsvp from './routes/rsvp.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN ?? '*').split(',') }));
app.use(express.json({ limit: '32kb' }));
app.use(morgan('tiny'));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));
app.use('/api/wishes', wishes);
app.use('/api/rsvp', rsvp);

// loop-safe 404 + error handler
app.use((req, res) => res.status(404).json({ error: 'not found' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'server error' }); });

app.listen(PORT, () => console.log(`♥ backend live :${PORT}`));
