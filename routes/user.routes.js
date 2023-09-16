import express from 'express';
import { getAllUsers, getProfile, updateUser, getUserById, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/profile/:id', getUserById);
router.get('/profile', verifyToken, getProfile);
router.patch('/profile', verifyToken, updateUser);
router.patch('/profile/:id', verifyToken, verifyAdmin, updateUser);
router.delete('/profile/:id', verifyToken, verifyAdmin, deleteUser);

export default router;