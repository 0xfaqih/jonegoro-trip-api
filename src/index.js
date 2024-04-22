import express from 'express';
import usersRoutes from './routes/users.js';
import toursRoutes from './routes/tours.js';
import morganMiddleware from './middlewares/morganMiddleware.js';

// Inisialisasi Express
const app = express();
app.use(express.json());

// Middleware
app.use(morganMiddleware);

// Rute
app.use('/api/users', usersRoutes);
app.use('/api/tours', toursRoutes);

// Pengaturan port
const PORT = process.env.PORT || 4000;

// Memulai server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
