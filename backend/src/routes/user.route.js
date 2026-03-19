import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { editProfile, getProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile",authMiddleware,getProfile);
router.get("/edit-profile",authMiddleware,editProfile);

export default router;

