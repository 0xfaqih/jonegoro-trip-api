import express from 'express';
import {
  checkEmail, login, register, verifyToken, deleteAdmin,
  getUserRole,
} from '../controllers/authController.js';
import { createUser } from '../controllers/userController.js';
import { protect, isSuperAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/create-user', protect, isSuperAdmin, createUser);
router.post('/verify-token', verifyToken);
router.post('/check-email', checkEmail);
router.post('/delete-admin/:id', protect, isSuperAdmin, deleteAdmin);
router.get('/role', protect, getUserRole);

export default router;
