import { Event } from "../models/Events.js";
import { Admin } from "../models/Admin.js";

export const createEvent = async (req, res) => {
	const { creatorID, eventName, eventDesc, price, capacity } = req.body;
	try {
		const admin = await Admin.findOne({ _id: creatorID });

		if (!admin) return res.status(401).json({ message: "Admin not found!" });

		if (!admin.isVerified)
			return res
				.status(401)
				.json({ message: "Admin not verified yet to do such action", admin });

		const newEvent = new Event({
			creatorID: admin._id,
			eventName,
			eventDesc,
			price,
			capacity,
		});

		await newEvent.save();

		admin.eventsCreated.push(newEvent);

		return res
			.status(201)
			.json({ message: "Event created successfully", newEvent });
	} catch (err) {
		console.error(err);
		return res.status(404).json({ message: "Internal server error" });
	}
};
