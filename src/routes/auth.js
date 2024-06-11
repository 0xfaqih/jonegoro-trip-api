import express from 'express';
import { login, register } from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';
import { protect, isSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/create-user', protect, isSuperAdmin, createUser);

export default router;
