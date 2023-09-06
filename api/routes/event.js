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
	getBookers,
	generateItineraries,
	createPlace,
	getPlaces,
} from "../controllers/event.js";

const router = express.Router();

//storage for images
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		//store our file
		cb(null, "../public/images");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});

//assign storage to upload
const upload = multer({ storage: storage });

//test route for upload
router.post("/upload", upload.single("file"), (req, res) => {
	console.log(req.file);
});
//needs to be fixed
router.post("/create-accoms/:id", createAccommodation);
router.post("/create-event", isAuthenticated, createEvent);
router.post("/generate", isAuthenticated, generateItineraries);
router.post("/add-place", isAuthenticated, createPlace);

router.get("/events/:id", isAuthenticated, getEvents);
router.get("/what-event/:id", isAuthenticated, getEventById);
router.get("/get-accomms/:id", isAuthenticated, getAllAvailableAccommodations);
router.get("/upcoming-event/:id", getUpcomingEvent);
router.get("/top-event/:id", isAuthenticated, getTopEvent);
router.get("/get-bookers/:id", getBookers);
router.get("/get-places/:id", getPlaces);

router.delete("/delete-event/:id", isAuthenticated, deleteEvent);

router.put("/check-event/:id", isAuthenticated, checkEventIfDone);

export { router as eventRouter };
