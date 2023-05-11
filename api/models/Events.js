import mongoose from "mongoose";

const collectionName = "events";

const EventSchema = new mongoose.Schema(
	{
		creator: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
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
		itinerary: [
			{
				date: { type: new Date() },
				day: { type: Number, required: true },
				activity: { type: String, maxlength: 100 },
				time: {
					type: new Date()
						.getTime()
						.toLocaleString({ hours: numeric, minutes: numeric, seconds: numeric }),
				},
			},
		],
		capacity: { type: Number, default: 0, required: true },
	},
	{ timestamps: true }
);

export const { EventModel } = mongoose.model(collectionName, EventSchema);
