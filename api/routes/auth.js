import express from "express";
import {
	register,
	verify,
	resendVerification,
	login,
	googleLogin,
	getUser,
} from "../controllers/user.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

router.get("/:id/verify/:token", verify);
router.get("/admin/:id", isAuthenticated, getUser);

export { router as authRouter };
