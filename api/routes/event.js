import express from "express";
import multer from "multer";
import path from "path";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
	createEvent,
	getEvents,
	getEventById,
	deleteEvent,
	createAccommodation,
	getAllAvailableAccommodations,
	checkEventIfDone,
	getUpcomingEvent,
	getTopEvent,
} from "../controllers/event.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		//we dont want errors to occur so we put null as the first parameter
		//second parameter is the destination of the file
		cb(null, "D:\\parago_admin\\src\\images");
	},

	filename: (req, file, cb) => {
		//we dont want errors to occur so we put null as the first parameter
		//second parameter is the name of the file
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

router.post("/create-accom/:id", createAccommodation);
router.post(
	"/create-event",
	isAuthenticated,
	upload.single("image"),
	createEvent
);
router.get("/events/:id", isAuthenticated, getEvents);
router.get("/what-event/:id", isAuthenticated, getEventById);
router.get("/get-accomms/:id", getAllAvailableAccommodations);
router.get("/upcoming-event/:id", getUpcomingEvent);
router.get("/top-event/:id", getTopEvent);

router.delete("/delete-event/:id", isAuthenticated, deleteEvent);

router.put("/check-event/:id", isAuthenticated, checkEventIfDone);

export { router as eventRouter };
