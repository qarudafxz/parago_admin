import mongoose from "mongoose";

const collectionName = "tokens";

const TokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "admins",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

export const Token = mongoose.model(collectionName, TokenSchema);
