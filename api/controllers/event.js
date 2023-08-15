import { Event } from "../models/Entities.js";
import { Admin } from "../models/Admin.js";
import { Accom } from "../models/Entities.js";

import { MongoClient, ObjectId } from "mongodb";

export const createEvent = async (req, res) => {
	const {
		creatorID,
		eventName,
		eventDesc,
		eventAddr,
		municipality,
		price,
		capacity,
		dateStart,
		dateEnd,
		nights,
		days,
		locations,
	} = req.body;

	try {
		const admin = await Admin.findOne({ _id: creatorID });

		if (!admin) {
			return res.status(401).json({ message: "Admin not found!" });
		}

		if (admin.eventsCreated > 4 && !admin.isSubscribed) {
			return res.status(401).json({
				message:
					"Number of events are only up to 5. Subscribe to Pro+ for you to create more events",
			});
		}

		if (!admin.isSubscribed && capacity > 30) {
			return res
				.status(401)
				.json({ message: "Maximum pax is 30. Subscribe to add 20 more paxes." });
		}

		const newEvent = new Event({
			creatorID,
			eventName,
			eventDesc,
			eventAddr,
			municipality,
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
			creatorID: admin?._id,
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
			.json({ newAccommodation, message: "New transportation created!" });
	} catch (err) {}
};

//getting all accommodations
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

//check if the event is done
export const checkEventIfDone = async (req, res) => {
	try {
		const event = await Event.findOne({ _id: req.params.id });

		if (!event) {
			return res.status(400).json({ message: "Event not found!" });
		}

		event.isFinished = true;

		await event.save();

		return res.status(200).json({ message: "Event set to closed" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server error" });
	}
};

//needs to improve logic

/*
	* Get the upcoming event of the admin

	@params event id
*/
export const getUpcomingEvent = async (req, res) => {
	const { id } = req.params;
	try {
		// Assuming the Event.find() method returns an array, use findOne() to get a single event.
		const events = await Event.find({ creatorID: id, isFinished: false });

		if (!events || events.length === 0) {
			return res.status(400).json({ message: "Event not found!" });
		}

		const twoDaysFromNow = new Date();
		twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

		for (const event of events) {
			const eventStartDate = new Date(event.dateStart);
			const fiveDaysFromNow = 5;
			console.log(event.dateStart);

			//check if the current event's month and year is equal to the current month and year
			if (
				eventStartDate.getYear() === twoDaysFromNow.getYear() &&
				eventStartDate.getMonth() === twoDaysFromNow.getMonth()
			) {
				//get the event days by subtracting the event start date to the current date
				let eventDays = eventStartDate.getDate() - twoDaysFromNow.getDate();
				eventDays *= -1;
				console.log(eventDays);

				//if the event days is less than or equal to 5 days from now
				//then return the event
				return fiveDaysFromNow <= eventDays
					? res.status(200).json({ message: "Upcoming event", event })
					: res.status(401).json({ message: "No nearest event this month" });
			}
		}

		res.status(401).json({ message: "No upcoming event" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server error" });
	}
};

//get the top most event that has a lot of bookings
export const getTopEvent = async (req, res) => {
	const { id } = req.params;
	try {
		const events = await Event.find({ creatorID: id });

		if (!events) {
			return res.status(400).json({ message: "Event not found!" });
		}

		//the less the capacity, the more travelers booked or avail the event
		//because the capacity will be subtracted by the number of travelers

		//then sort the events by capacity and get the first index
		const topEvent = events.sort((a, b) => {
			return a.capacity - b.capacity;
		});

		return res.status(200).json({ message: "Top event", topEvent: topEvent[0] });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server error" });
	}
};

/// query on another db
/*
	* api to retrieve the bookers in a specific event
	@param id of the event selected
	@returns a promise with a status of 200 that the bookers have finally fetched from the other collection
*/
export const getBookers = async (req, res) => {
	const initMongoClient = async () => {
		const client = await MongoClient.connect(process.env.ANOTHER_MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		return client;
	};

	try {
		const client = await initMongoClient();
		const db = client.db("paraGO");

		const bookers = db
			.collection("userbookings")
			.find(
				{ "eventDetails.eventId": req.params.id, $exist: true },
				{ projection: { _id: 0 } }
			);

		console.log(bookers);

		// check if the userbookings is properly connected
		// const bookers = await bookersCollection.find({});

		//check if there are amy ids from eventDetails.eventId

		// const bookersByEvent = bookers.filter(
		// 	(booker) => booker.eventDetails.eventId === req.params.id
		// );

		console.log(bookersByEvent);

		// find all bookers by using req.params.id as the event id
		// and compare it to the key eventDetails.eventId
		const bookersByEvent = bookers.filter(
			(booker) => booker.eventDetails.eventId === req.params.id
		);

		console.log(bookersByEvent.toArray());

		if (!bookings || bookings.length <= 0) {
			return res
				.status(404)
				.json({ bookersByEvent, message: "Bookers not found!" });
		}

		return res.status(200).json({ bookersByEvent, message: "Bookers found" });
	} catch (err) {
		console.error(err);
	}
};
