import express from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", register);

export { router as authRouter };
