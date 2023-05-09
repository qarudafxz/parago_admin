import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
	const token = req.cookies["token"];

	//if no token, return error
	if (!token) {
		return res.status(401).json({ message: "Admin not authorized!" });
	}
	try {
		const decode = await jwt.decode(token, process.env.JWT_SECRET);

		if (!decode)
			return res
				.status(401)
				.json({ message: "Cannot decode token from admin" });

		req.admin = decode.adminID;

		next();
	} catch (err) {
		console.error(err);
		throw new Error();
	}
};
