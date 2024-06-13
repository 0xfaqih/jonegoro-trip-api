import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import toursRoutes from './routes/tours.js';
import blogsRoutes from './routes/blogs.js';
import souvenirsRoutes from './routes/souvenirs.js';
import accommodationsRoutes from './routes/accommodations.js';

import morganMiddleware from './middlewares/morganMiddleware.js';

const app = express();
app.use(express.json());

app.use(morganMiddleware);
app.use(cors({
  origin: ['http://localhost:3000', 'https://jonegoro-trip-dashboard.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/tours', toursRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/souvenirs', souvenirsRoutes);
app.use('/api/accommodations', accommodationsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
