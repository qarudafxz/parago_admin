import mongoose from "mongoose";

const collectionName = "admins";

const AdminSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: String, required: true, default: "admin" },
		isVerified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const options = { collections: collectionName, db: "parago_admin" };

export const Admin = mongoose.model(
	collectionName,
	AdminSchema,
	collectionName,
	options
);
