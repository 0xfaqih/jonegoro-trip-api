import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import toursRoutes from './routes/tours.js';
import morganMiddleware from './middlewares/morganMiddleware.js';
// Inisialisasi Express
const app = express();
app.use(express.json());

// Middleware
app.use(morganMiddleware);
app.use(cors({
  origin: ['http://localhost:3000', 'https://jonegoro-trip-dashboard.vercel.app'], // Domain frontend yang diizinkan
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
}));

// Rute
app.use('/api/users', usersRoutes);
app.use('/api/tours', toursRoutes);

// Pengaturan port
const PORT = process.env.PORT || 4000;

// Memulai server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
