import mongoose from "mongoose";

const collectionName = "admins";

const AdminSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: String, default: "admin" },
		isVerified: { type: Boolean },
		profile: { type: String, default: "" },
		municipality: { type: String, required: true },
		eventsCreated: { type: Number, default: 0 },
		totalBookings: { type: Number, default: 0 },
		bookings: [
			{
				currentDate: { type: Date },
				bookingValue: { type: Number, default: 0 },
			},
		],
	},
	{ timestamps: true }
);

export const Admin = mongoose.model(collectionName, AdminSchema);
