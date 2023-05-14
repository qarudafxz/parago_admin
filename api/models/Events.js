import mongoose from "mongoose";

const collectionName = "events";

const EventSchema = new mongoose.Schema(
	{
		creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
		eventCover: { data: Buffer, contentType: String },
		eventName: { type: String, required: true, unique: true },
		eventDesc: { type: String },
		price: { type: Number, required: true },
		capacity: { type: Number, required: true },
		dateCreated: { type: Date, default: Date.now },
		dateStart: { type: Date },
		dateEnd: { type: Date },
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
