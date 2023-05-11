import { EventModel } from "../models/Events.js";

export const createEvent = async (req, res) => {
	try {
	} catch (err) {
		console.error(err);
		return res.status(404).json({ message: "Internal server error" });
	}
};
  