import { Router } from "express";
import { Signup ,login,checkEmail,resetPassword} from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup",Signup);
router.post("/login",login);
router.post("/email-verify",checkEmail);
router.post("/reset-password",resetPassword)

export default router;