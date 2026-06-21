import express from 'express';
import { chatController } from '../controllers/chat.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/:targetUserId",authMiddleware,chatController);


export default router;