import mongoose from "mongoose";

const collectionName = "admins";

const AdminSchema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String },
		role: { type: String, default: "admin" },
		isVerified: { type: Boolean },
		isSubscribed: { type: Boolean, default: false },
		profile: { type: String, default: "" },
		municipality: { type: String },
		eventsCreated: { type: Number, default: 0 },
		totalEarnings: { type: Number, default: 0 },
		totalBookings: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Admin = mongoose.model(collectionName, AdminSchema);
