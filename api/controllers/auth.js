import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { sendVerification } from "../middlewares/sendVerification.js";
import { Admin } from "../models/Admin.js";

export const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		const admin = await Admin.findOne({ email });

		if (admin) return res.status(401).json({ message: "Admin already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newAdmin = new Admin({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		const isUserSave = await newAdmin.save();

		const payload = {
			adminID: newAdmin._id,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		if (isUserSave) {
			await sendVerification(firstName, email, newAdmin._id, token);
		} else {
			console.log("Error registering admin to database");
		}

		return res
			.status(201)
			.json({ message: "Admin successfully created!", newAdmin, token });
	} catch (error) {
		console.err(error);
		return res.status(400).json({ message: "Error while registering admin" });
	}
};

export const verify = async (req, res) => {
	try {
		const admin = await Admin.findOne({ _id: req.params.id });
		if (!admin) return res.status(401).json({ message: "Invalid link" });

		await Admin.updateOne({ _id: req.params.id }, { isVerified: true });
	} catch (err) {}
};
