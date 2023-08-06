import express from "express";
import {
	register,
	verify,
	resendVerification,
	login,
	googleLogin,
	getUser,
	verifyEmail,
	changePassword,
	editProfile,
	subscribeToPro,
} from "../controllers/user.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/verifyEmail", verifyEmail);

router.get("/:id/verify/:token", verify);
router.get("/admin/:id", isAuthenticated, getUser);

router.put("/change-password/:email/:token", changePassword);
router.put("/edit-profile/:id", isAuthenticated, editProfile);
router.put("/subscribe/:id", isAuthenticated, subscribeToPro);

export { router as authRouter };
