import express from "express";
import {
	register,
	verify,
	resendVerification,
	login,
} from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);
router.post("/login", isAuthenticated, login);

router.get("/:id/verify/:token", verify);

export { router as authRouter };
