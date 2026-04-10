import { Router } from "express";
import { Signup ,login,checkEmail,resetPassword, logOut} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup",Signup);
router.post("/login",login);
router.post("/email-verify",checkEmail);
router.post("/reset-password",resetPassword)
router.post("/logout",authMiddleware,logOut);

export default router;