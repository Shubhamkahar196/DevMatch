import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteProfile, editProfile, getProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile",authMiddleware,getProfile);
router.put("/edit-profile",authMiddleware,editProfile);
router.delete("/delete-profile",authMiddleware,deleteProfile);
export default router;

