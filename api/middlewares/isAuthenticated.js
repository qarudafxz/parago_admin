export const isAuthenticated = async (req, res, next) => {
	const token = req.cookies["token"];
	//if no token, return error
	try {
		if (!token) {
			return res.status(401).json({ message: "Cannot decode token from admin" });
		}
		next();
	} catch (err) {
		console.error(err);
	}
};
