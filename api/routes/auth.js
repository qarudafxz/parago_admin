import express from "express";
import { register, verify } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", register);
router.get("/:id/verify/:token", verify);

export { router as authRouter };
