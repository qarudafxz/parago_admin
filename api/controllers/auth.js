import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { sendVerification } from "../middlewares/sendVerification.js";
import { Admin } from "../models/Admin.js";
import { Token } from "../models/Token.js";

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

		const TOKEN = new Token({
			userId: newAdmin._id,
			token: uuidv4(),
		});

		await TOKEN.save();

		if (isUserSave) {
			await sendVerification(firstName, email, newAdmin._id, TOKEN.token);
		} else {
			console.log("Error registering admin to database");
		}

		res.cookie("token", TOKEN.token, { httpOnly: true });
		return res
			.status(201)
			.json({ message: "Admin successfully created!", newAdmin, token });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "Error while registering admin" });
	}
};

export const verify = async (req, res) => {
	try {
		const admin = await Admin.findOne({ _id: req.query.id });
		if (!admin) return res.status(401).json({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: admin._id,
			token: req.query.token,
		});

		if (!token)
			return res.status(401).json({ message: "Invalid link or expired" });

		await Admin.updateOne({ _id: req.params.id }, { isVerified: true });
		await token.remove();

		return res.status(200).json({ message: "Account verified!" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Error while verifying admin" });
	}
};

export const resendVerification = async (req, res) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email });

		if (!admin)
			return res.status(401).json({ message: "Admin does not exist" });

		if (admin.isVerified)
			return res.status(401).json({ message: "Admin already verified" });

		await sendVerification(
			admin.firstName,
			admin.email,
			admin._id,
			admin.token
		);

		return res.status(200).json({ message: "Verification link sent" });
	} catch (err) {
		return res.status(401).json({ message: "Internal server error" });
	}
};

export const googleLogin = async (req, res) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email });

		if (!admin) {
			const newAdmin = await Admin({});
		}
	} catch (err) {}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const admin = await Admin.findOne({ email });
		if (!admin)
			return res.status(401).json({ message: "Admin doesn't exist!" });

		const isMatched = await bcrypt.compare(password, admin.password);

		if (!isMatched)
			return res.status(404).json({ message: "Email or password incorrect!" });

		const payload = {
			adminID: admin._id,
		};

		if (!admin.isVerified)
			return res.status(404).json({
				message: "Email not verified. Please verify your email first!",
			});

		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: 360000,
		});

		res.cookies("token", token, {
			httpOnly: true,
			expiresIn: 360000,
		});

		res.status(200).json({ admin, message: "Admin logged in successfully!" });
	} catch (err) {}
};
