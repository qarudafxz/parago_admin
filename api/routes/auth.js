import express from "express";
import {
	register,
	verify,
	resendVerification,
	login,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);
router.post("/login", login);

router.get("/:id/verify/:token", verify);

export { router as authRouter };
