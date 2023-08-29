/* eslint-disable no-undef */
import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader) {
		return res.status(403).json({ message: "Authorization header is missing" });
	}

	const token = authHeader.split(" ")[1];

	try {
		if (!token) {
			return res.status(401).json({ message: "Cannot decode token from admin" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.admin = decoded;
		return next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: "Invalid token" });
	}
};

export default isAuthenticated;

export const isSub = async (req, res, next) => {
	const { id } = req.headers;

	try {
		const admin = await Admin.findOne({ _id: id });

		if (!admin) {
			return res.status(400).json({ message: "Admin not found" });
		}

		if (!admin.isSub) {
			return res.status(400).json({ message: "Admin is not a sub" });
		}

		return next();
	} catch (err) {
		console.error(err);
	}
};
