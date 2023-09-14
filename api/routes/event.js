import express from "express";

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
	cancelBooking,
	generateItineraries,
	createPlace,
	getPlaces,
} from "../controllers/event.js";

const router = express.Router();

//needs to be fixed
router.post("/create-accoms/:id", createAccommodation);
router.post("/create-event", isAuthenticated, createEvent);
router.post("/generate", isAuthenticated, generateItineraries);
router.post("/add-place", isAuthenticated, createPlace);

router.get("/events/:id", isAuthenticated, getEvents);
router.get("/what-event/:id", isAuthenticated, getEventById);
router.get("/get-accomms/:id", isAuthenticated, getAllAvailableAccommodations);
router.get("/upcoming-event/:id", getUpcomingEvent);
router.get("/top-event/:id", getTopEvent);
router.get("/get-bookers/:id", getBookers);
router.get("/get-places/:id", getPlaces);

router.delete("/delete-event/:id", isAuthenticated, deleteEvent);
router.delete("/cancel-booking/:id", isAuthenticated, cancelBooking);

router.put("/check-event/:id", isAuthenticated, checkEventIfDone);

export { router as eventRouter };
