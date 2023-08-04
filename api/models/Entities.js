import mongoose from "mongoose";

const eventCollectionName = "events";
const tourismCollectionName = "tourism";
const accomCollectionName = "accom";

const EventSchema = new mongoose.Schema(
	{
		creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
		eventCover: { data: Buffer, contentType: String },
		eventName: { type: String, required: true, unique: true },
		eventDesc: { type: String },
		eventAddr: { type: String },
		price: { type: Number, required: true },
		municipality: { type: String, required: true },
		capacity: { type: Number, required: true },
		dateCreated: { type: Date, default: Date.now },
		nights: { type: Number, default: 0 },
		days: { type: Number, default: 0 },
		dateStart: { type: String },
		dateEnd: { type: String },
		isFinished: { type: Boolean, default: false },
		filePath: { type: String },
		locations: [
			{
				locName: { type: String },
				locDesc: { type: String },
				type: { type: String },
				desc: { type: String },
				date: { type: String },
				eventStart: { type: String },
				eventEnd: { type: String },
			},
		],
	},
	{ timestamps: true }
);

export const Event = mongoose.model(eventCollectionName, EventSchema);

const TourismSchema = new mongoose.Schema({
	creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
	name: { type: String, required: true, unique: true },
	contactNumber: { type: Number, required: true },
	availability: { type: Boolean, default: true },
});

export const Tourism = mongoose.model(tourismCollectionName, TourismSchema);

//this model is for the accommodations
const AccomSchema = new mongoose.Schema({
	creatorID: { type: mongoose.Schema.Types.ObjectId, refs: "admins" },
	name: { type: String, required: true },
	gender: { type: String, required: true },
	contactNumber: { type: Number, required: true },
	availability: { type: Boolean },
	service: { type: String, required: true },
	location: { type: String, default: "" },
});

export const Accom = mongoose.model(accomCollectionName, AccomSchema);

// bookers
const bookerCollectionName = "bookers";

const BookerSchema = new mongoose.Schema({
	bookerID: { type: mongoose.Schema.Types.ObjectId, refs: "users" },
	eventID: { type: mongoose.Schema.Types.ObjectId, refs: "events" },
	bookerName: { type: String },
	bookerLastName: { type: String },
	bookerEmail: { type: String },
	bookerContact: { type: Number },
});

export const Booker = mongoose.model(bookerCollectionName, BookerSchema);
