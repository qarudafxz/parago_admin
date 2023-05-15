import express from "express";
import multer from "multer";
import path from "path";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createEvent, getEvents } from "../controllers/createEvents.js";

const router = express.Router();

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		//we dont want errors to occur so we put null as the first parameter
// 		//second parameter is the destination of the file
// 		cb(null, "D:PICTURES");
// 	},

// 	filename: (req, file, cb) => {
// 		//we dont want errors to occur so we put null as the first parameter
// 		//second parameter is the name of the file
// 		console.log(file);
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	},
// });

// const upload = multer({ storage });

router.post("/create-event", isAuthenticated, createEvent);

router.get("/events/:id", isAuthenticated, getEvents);

export { router as eventRouter };