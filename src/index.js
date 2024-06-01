import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import toursRoutes from './routes/tours.js';
import blogsRoutes from './routes/blogs.js';
import morganMiddleware from './middlewares/morganMiddleware.js';

const app = express();
app.use(express.json());

app.use(morganMiddleware);
app.use(cors({
  origin: ['http://localhost:3000', 'https://jonegoro-trip-dashboard.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/users', usersRoutes);
app.use('/api/tours', toursRoutes);
app.use('/api/blogs', blogsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
