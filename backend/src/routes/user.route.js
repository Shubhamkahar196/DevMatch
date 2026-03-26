import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteProfile, editProfile, getFeed, getProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/get-profile",authMiddleware,getProfile);
router.put("/edit-profile",authMiddleware,editProfile);
router.delete("/delete-profile",authMiddleware,deleteProfile);
router.get("/feed",authMiddleware,getFeed)
export default router;

