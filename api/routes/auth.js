import express from "express";
import { register, verify, resendVerification } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/resend-verification", resendVerification);

router.get("/:id/verify/:token", verify);

export { router as authRouter };
