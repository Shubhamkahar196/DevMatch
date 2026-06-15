import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { createOrder } from '../controllers/payment.controller';
const router = express.Router();


router.post("/create-order",authMiddleware,createOrder)

export default router;