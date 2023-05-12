import mongoose from "mongoose";

const collectionName = "events";

const EventSchema = new mongoose.Schema(
	{
		creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
		eventName: { type: String, required: true, unique: true },
		eventDesc: { type: String, required: true },
		price: { type: Number, required: true },
		capacity: { type: Number, required: true },
		locations: [
			{
				locName: { type: String },
				desc: { type: String },
				lat: { type: Number },
				lng: { type: Number },
			},
		],
		itinerary: [
			{
				date: { type: Date },
				day: { type: Number },
				activity: { type: String, maxlength: 100 },
				time: {
					type: Date,
				},
			},
		],
	},
	{ timestamps: true }
);

export const Event = mongoose.model(collectionName, EventSchema);
