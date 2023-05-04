import mongoose from "mongoose";

export const connect = async () => {
	try {
		await mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log("MongoDB connected!"));
	} catch (err) {
		console.log(err);
	}
};
