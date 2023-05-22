import mongoose from "mongoose";

const collectionName = "events";

const EventSchema = new mongoose.Schema(
	{
		creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
		eventCover: { data: Buffer, contentType: String },
		eventName: { type: String, required: true, unique: true },
		eventDesc: { type: String },
		eventAddr: { type: String },
		price: { type: Number, required: true },
		capacity: { type: Number, required: true },
		dateCreated: { type: Date, default: Date.now },
		nights: { type: Number, default: 0 },
		days: { type: Number, default: 0 },
		dateStart: { type: String },
		dateEnd: { type: String },
		filePath: { type: String },
		locations: [
			{
				locName: { type: String },
				desc: { type: String },
				date: { type: String },
				eventStart: { type: String },
				eventEnd: { type: String },
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
