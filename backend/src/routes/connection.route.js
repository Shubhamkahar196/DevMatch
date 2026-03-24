import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { 
    sendRequest,
    getConnections,
    getRequest,
    getSentRequest,
    reviewRequest 
} from '../controllers/connection.controller.js'

const router = express.Router();

router.post("/send/:userId", authMiddleware, sendRequest);
router.get("/", authMiddleware, getRequest);
router.post("/review/:requestId", authMiddleware, reviewRequest);
router.get("/connections", authMiddleware, getConnections);
router.get("/sent", authMiddleware, getSentRequest);

export default router;