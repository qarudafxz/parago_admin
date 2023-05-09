import mongoose from "mongoose";

const collectionName = "events";

const EventSchema = new mongoose.Schema({
	eventName: { type: String, required: true, unique: true },
	eventDesc: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	locations: [
		{
			locName: { type: String, required: true },
			desc: { type: String, required: true },
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	],
});

export const { EventModel } = mongoose.model(collectionName, EventSchema);
