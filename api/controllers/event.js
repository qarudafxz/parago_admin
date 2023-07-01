import { Event } from "../models/Entities.js";
import { Admin } from "../models/Admin.js";
import { Accom } from "../models/Entities.js";

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
		nights,
		days,
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
			nights,
			days,
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
			console.log("Event not found!");
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

//------------------------------------------------
//this is needed to be fixed
export const bookingsData = async (req, res) => {
	try {
		const date = new Date();
		const admin = await Admin.findByIdAndUpdate(req.params.id);

		const totalBook = 10;

		if (!admin) {
			console.log("Admin not found!");
			return res.status(404).json({ message: "Admin not found!" });
		}

		const newBook = {
			currentDate: date.now(),
			bookingValue: totalBook,
		};

		//dynamically add new booking data if the date is not the same
		admin?.bookings?.map((book) => {
			if (book.currentDate != date.now()) {
				admin.bookings.push(newBook);
			} else {
				//this will add the total bookings of the day
				book.bookingValue += totalBook;
			}
		});

		await admin.save();
	} catch (err) {
		console.log(bookingsData);
	}
};

//accommodations
export const createAccommodation = async (req, res) => {
	const { id } = req.params;
	const { name, gender, contactNumber, availability, service, location } =
		req.body;

	try {
		const admin = await Admin.findById(id);

		if (!admin) {
			return res.status(404).json({ message: " Admin not found" });
		}

		const newAccommodation = new Accom({
			creatorID: id,
			name,
			gender,
			contactNumber,
			availability,
			service,
			location,
		});

		await newAccommodation.save();
		return res
			.status(200)
			.json({ newAccommodation, message: "New accommodation created!" });
	} catch (err) {}
};

export const getAllAvailableAccommodations = async (req, res) => {
	const { id } = req.params;
	try {
		const accommodations = await Accom.find({ creatorID: id });
		if (!accommodations) {
			return res.status(404).json({ message: "Accommodations not found!" });
		}

		const availableAccommodations = accommodations.filter(
			(accommodation) => accommodation.availability === true
		);

		return res.status(200).json({
			availableAccommodations,
			message: "All accommodations that are available retrieved	successfully!",
		});
	} catch (e) {
		console.error(e);
		throw new Error(e);
	}
};
