import express from "express";
import {
	register,
	verify,
	resendVerification,
	login,
	googleLogin,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

router.get("/:id/verify/:token", verify);

export { router as authRouter };
