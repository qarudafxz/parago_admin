import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createEvent } from "../controllers/create.js";

const router = express.Router();

router.post("/create-event", isAuthenticated, createEvent);

export { router as eventRouter };
