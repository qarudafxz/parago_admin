import { Event } from "../models/Events.js";
import { Admin } from "../models/Admin.js";

export const createEvent = async (req, res) => {
	const {
		creatorID,
		eventName,
		eventDesc,
		eventAddr,
		price,
		capacity,
		dateStart,
		dateEnd,
		locations,
	} = req.body;
	const admin = await Admin.findOne({ _id: creatorID });

	try {
		const newEvent = new Event({
			creatorID,
			eventName,
			eventDesc,
			eventAddr,
			price,
			capacity,
			dateStart,
			dateEnd,
			locations,
		});

		admin.eventsCreated += 1;

		await newEvent.save();
		await admin.save();

		return res
			.status(201)
			.json({ message: "Event created successfully", newEvent });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

//get all events
export const getEvents = async (req, res) => {
	try {
		const admin = await Admin.findById(req.params.id);

		if (!admin) {
			return res.status(401).json({ message: "Admin not found!" });
		}

		const creatorID = admin._id;

		const events = await Event.find({ creatorID });

		if (!events) {
			return res.status(404).json({ message: "Events not found!" });
		}

		return res.status(200).json({
			message: "Events fetched successfully",
			events,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

//get event by id
export const getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);

		if (!event) {
			return res.status(404).json({ message: "Event not found!" });
		}

		return res.status(200).json({
			message: "Event fetched successfully",
			event,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

//delete and event by id
export const deleteEvent = async (req, res) => {
	const { adminID } = req.body;

	try {
		const event = await Event.findOneAndDelete(req.params.id);
		const admin = await Admin.findById(adminID);

		if (!admin) {
			console.log("Admin not	found!");
			return res.status(401).json({ message: "Admin not found!" });
		}

		if (!event) {
			console.log("Event not found!");
			return res.status(404).json({ message: "Event not found!" });
		}

		admin.eventsCreated -= 1;

		await admin.save();
		return res.status(200).json({ message: "Event deleted successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};
