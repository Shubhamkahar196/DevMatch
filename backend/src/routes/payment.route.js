import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createOrder } from '../controllers/payment.controller.js';
import { webhooks } from '../controllers/payment.controller.js';
import { paymentVerify } from '../controllers/payment.controller.js';

const router = express.Router();


router.post("/create",authMiddleware,createOrder)
router.post("/webhook",webhooks)
router.get("/verify",authMiddleware,paymentVerify)
export default router;